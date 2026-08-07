// supabase/functions/send-line-order/index.ts
// รับรายการสั่งซื้อจากเว็บไซต์ (ทุกช่องทาง: cart.html/index.html/online_shop.html/product-detail.html
// ผ่าน line-login.js) แล้ว push ข้อความแจ้งเตือนผ่าน LINE Messaging API เข้า 2 ที่พร้อมกัน:
//
// 1. แชทจริงของลูกค้าเอง (to: lineUserId) — ลูกค้าเห็นในแอป LINE ของตัวเองว่าสั่งซื้อไปแล้ว
// 2. กลุ่มแอดมิน/ทีมงาน (to: LINE_ADMIN_GROUP_ID) — แอดมินทุกคนในกลุ่มเห็นออเดอร์เดียวกันพร้อมกัน (Flex
//    Message แสดงชื่อ+รูปโปรไฟล์ของลูกค้าที่สั่ง เพราะข้อความที่ push เข้ากลุ่มได้ในนามบัญชี OA เท่านั้น
//    ไม่สามารถทำให้ข้อความ "มาจาก" ลูกค้าจริงๆ ได้ตามข้อจำกัดของ LINE — ใส่ชื่อ+รูปในเนื้อหาแทน)
//
// แจ้งกลุ่มก็ต่อเมื่อ push เข้าแชทลูกค้าสำเร็จเท่านั้น (customerOk === true) เพราะการ push เข้าแชทลูกค้า
// สำเร็จ = พิสูจน์แล้วว่าลูกค้าเป็นเพื่อนกับ OA จริง (ข้อจำกัดของ Messaging API push — ส่งได้เฉพาะคนที่เป็น
// เพื่อนแล้วเท่านั้น) บังคับให้ทุกออเดอร์ที่แอดมินเห็นมีแชทจริงของลูกค้ารองรับเสมอ ถ้ายังไม่เพิ่มเพื่อน (หรือ
// ไม่มี lineUserId แนบมาเลย) ฟังก์ชันนี้จะไม่ push อะไรเลยทั้งคู่ (adminOk เป็น null = ไม่ได้พยายามส่ง)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LINE_CHANNEL_ACCESS_TOKEN = Deno.env.get("LINE_CHANNEL_ACCESS_TOKEN")!;
const LINE_ADMIN_GROUP_ID = Deno.env.get("LINE_ADMIN_GROUP_ID")!;

const CORS_HEADERS = { "Access-Control-Allow-Origin": "*" };

type OrderItem = { name: string; qty: number; price: number; url: string };

function buildItemLines(items: OrderItem[]) {
  let total = 0;
  const lines: string[] = [];
  items.forEach((item, i) => {
    const lineTotal = item.price * item.qty;
    total += lineTotal;
    lines.push(`${i + 1}. ${item.name}`);
    lines.push(`   จำนวน: ${item.qty} x ฿${item.price.toLocaleString("th-TH")} = ฿${lineTotal.toLocaleString("th-TH")}`);
    lines.push(`   ลิงก์: ${item.url}`);
    lines.push("");
  });
  return { lines, total };
}

// deno-lint-ignore no-explicit-any
async function pushLineMessages(to: string, messages: any[]): Promise<boolean> {
  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ to, messages }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`LINE push failed (to=${to}):`, errText);
    return false;
  }
  return true;
}

function pushLineMessage(to: string, text: string): Promise<boolean> {
  return pushLineMessages(to, [{ type: "text", text }]);
}

// Flex Message bubble สำหรับกลุ่มแอดมิน — โชว์รูป+ชื่อลูกค้าที่สั่งเป็น hero image/หัวการ์ด
function buildAdminGroupFlexMessage(
  displayName: string,
  pictureUrl: string,
  itemLines: string[],
  totalLine: string,
) {
  const bodyContents: Record<string, unknown>[] = [
    { type: "text", text: "🛒 มีออเดอร์ใหม่จากเว็บไซต์!", weight: "bold", size: "lg", wrap: true },
    {
      type: "text",
      text: displayName ? `จาก: ${displayName}` : "จาก: ลูกค้า LINE",
      size: "sm",
      color: "#666666",
      margin: "sm",
    },
    { type: "separator", margin: "md" },
    {
      type: "text",
      text: itemLines.join("\n"),
      wrap: true,
      size: "sm",
      margin: "md",
    },
    { type: "text", text: totalLine, weight: "bold", size: "md", margin: "md" },
  ];

  const bubble: Record<string, unknown> = {
    type: "bubble",
    body: { type: "box", layout: "vertical", contents: bodyContents },
  };

  if (pictureUrl) {
    bubble.hero = {
      type: "image",
      url: pictureUrl,
      size: "full",
      aspectRatio: "1:1",
      aspectMode: "cover",
    };
  }

  return {
    type: "flex",
    altText: displayName ? `🛒 ออเดอร์ใหม่จากคุณ ${displayName}` : "🛒 มีออเดอร์ใหม่จากเว็บไซต์",
    contents: bubble,
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        ...CORS_HEADERS,
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  try {
    const { items, lineUserId, lineDisplayName, linePictureUrl } = await req.json();
    // items: [{name, qty, price, url}]

    const { lines, total } = buildItemLines(items);
    const totalLine = `รวมทั้งหมด: ฿${total.toLocaleString("th-TH")}`;

    // ลอง push เข้าแชทจริงของลูกค้าก่อนเสมอ — สำเร็จได้ก็ต่อเมื่อลูกค้าเป็นเพื่อนกับ OA แล้วเท่านั้น
    // (ข้อจำกัดของ Messaging API push) ใช้ผลลัพธ์นี้เป็นตัวตัดสินว่าจะแจ้งกลุ่มแอดมินหรือไม่
    let customerOk: boolean | null = null;
    if (lineUserId) {
      const customerMessage = [
        "ขอบคุณสำหรับคำสั่งซื้อค่ะ/ครับ 🙏",
        "",
        "ทีมงาน CP B&F ได้รับรายการสั่งซื้อของคุณแล้ว:",
        "",
        ...lines,
        totalLine,
        "",
        "ทีมงานจะรีบติดต่อกลับโดยเร็วที่สุดค่ะ/ครับ",
      ].join("\n");
      customerOk = await pushLineMessage(lineUserId, customerMessage);
    }

    // แจ้งกลุ่มแอดมินก็ต่อเมื่อพิสูจน์แล้วว่าลูกค้าเป็นเพื่อนกับ OA จริง (customerOk === true) — ถ้ายังไม่เพิ่ม
    // เพื่อน (หรือไม่มี lineUserId มาเลย) จะไม่แจ้งกลุ่มเลย (adminOk เป็น null = ไม่ได้พยายามส่ง) — ข้อความที่
    // เข้ากลุ่มเป็น Flex Message แสดงชื่อ+รูปโปรไฟล์ลูกค้าที่สั่ง ให้แอดมินทุกคนในกลุ่มเห็นตรงกันว่าใครสั่ง
    let adminOk: boolean | null = null;
    if (customerOk === true) {
      const flexMessage = buildAdminGroupFlexMessage(lineDisplayName || "", linePictureUrl || "", lines, totalLine);
      adminOk = await pushLineMessages(LINE_ADMIN_GROUP_ID, [flexMessage]);
    }

    if (customerOk !== true) {
      return new Response(JSON.stringify({ ok: false, error: "ลูกค้ายังไม่ได้เพิ่มเพื่อน LINE — ไม่ได้แจ้งกลุ่มแอดมิน", adminOk, customerOk }), {
        status: 200,
        headers: CORS_HEADERS,
      });
    }

    return new Response(JSON.stringify({ ok: true, adminOk, customerOk }), {
      status: 200,
      headers: CORS_HEADERS,
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 400,
      headers: CORS_HEADERS,
    });
  }
});
