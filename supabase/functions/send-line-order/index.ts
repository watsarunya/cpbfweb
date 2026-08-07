// supabase/functions/send-line-order/index.ts
// รับรายการสั่งซื้อจากเว็บไซต์ (ทุกช่องทาง: cart.html/index.html/online_shop.html/product-detail.html
// ผ่าน line-login.js) แล้ว push ข้อความแจ้งเตือนผ่าน LINE Messaging API
//
// อัปเดต: เดิม push แจ้งไปหาแอดมิน (LINE_ADMIN_USER_ID) เสมอไม่ว่าลูกค้าจะเป็นเพื่อนกับ OA หรือไม่ — ตอนนี้
// เปลี่ยนเป็น **push แจ้งแอดมินก็ต่อเมื่อ push เข้าแชทจริงของลูกค้าสำเร็จเท่านั้น** (ตามที่ผู้ใช้ขอ: ถ้า
// ลูกค้ายังไม่เพิ่มเพื่อน ไม่ต้องส่งออเดอร์ให้แอดมินเลย) — เหตุผล: การ push เข้าแชทลูกค้าสำเร็จ = พิสูจน์แล้ว
// ว่าลูกค้าเป็นเพื่อนกับ OA จริง (ข้อจำกัดของ Messaging API push — ส่งได้เฉพาะคนที่เป็นเพื่อนแล้วเท่านั้น)
// บังคับให้ทุกออเดอร์ที่แอดมินเห็นมีแชทจริงรองรับเสมอ ไม่มีเคส "แอดมินเห็นแจ้งเตือนแต่หาแชทลูกค้าไม่เจอ" อีก
// ต่อไป — ถ้าลูกค้ายังไม่เพิ่มเพื่อน (หรือไม่มี lineUserId แนบมาเลย) ฟังก์ชันนี้จะไม่ push อะไรเลยทั้งคู่
// (adminOk จะเป็น null คือ "ไม่ได้พยายามส่ง" ไม่ใช่ "ส่งไม่สำเร็จ")

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LINE_CHANNEL_ACCESS_TOKEN = Deno.env.get("LINE_CHANNEL_ACCESS_TOKEN")!;
const LINE_ADMIN_USER_ID = Deno.env.get("LINE_ADMIN_USER_ID")!;

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

async function pushLineMessage(to: string, text: string): Promise<boolean> {
  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      to,
      messages: [{ type: "text", text }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`LINE push failed (to=${to}):`, errText);
    return false;
  }
  return true;
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
    const { items, lineUserId, lineDisplayName } = await req.json();
    // items: [{name, qty, price, url}]

    const { lines, total } = buildItemLines(items);
    const totalLine = `รวมทั้งหมด: ฿${total.toLocaleString("th-TH")}`;

    // ลอง push เข้าแชทจริงของลูกค้าก่อนเสมอ — สำเร็จได้ก็ต่อเมื่อลูกค้าเป็นเพื่อนกับ OA แล้วเท่านั้น
    // (ข้อจำกัดของ Messaging API push) ใช้ผลลัพธ์นี้เป็นตัวตัดสินว่าจะแจ้งแอดมินหรือไม่
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

    // แจ้งแอดมินก็ต่อเมื่อพิสูจน์แล้วว่าลูกค้าเป็นเพื่อนกับ OA จริง (customerOk === true) — ถ้ายังไม่เพิ่ม
    // เพื่อน (หรือไม่มี lineUserId มาเลย) จะไม่แจ้งแอดมินเลยตามที่ผู้ใช้ขอ (adminOk เป็น null = ไม่ได้พยายามส่ง)
    let adminOk: boolean | null = null;
    if (customerOk === true) {
      const adminHeader = lineDisplayName
        ? `🛒 มีออเดอร์ใหม่จากเว็บไซต์! (คุณ ${lineDisplayName})`
        : "🛒 มีออเดอร์ใหม่จากเว็บไซต์!";
      const adminMessage = [adminHeader, "", ...lines, totalLine].join("\n");
      adminOk = await pushLineMessage(LINE_ADMIN_USER_ID, adminMessage);
    }

    if (customerOk !== true) {
      return new Response(JSON.stringify({ ok: false, error: "ลูกค้ายังไม่ได้เพิ่มเพื่อน LINE — ไม่ได้แจ้งแอดมิน", adminOk, customerOk }), {
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
