// supabase/functions/send-line-order/index.ts
// รับรายการสั่งซื้อจากเว็บไซต์ (ทุกช่องทาง: cart.html/index.html/online_shop.html/product-detail.html
// ผ่าน line-login.js) แล้ว push ข้อความยืนยันเข้าแชทจริงของลูกค้าเอง (to: lineUserId) เท่านั้น
//
// ⚠️ 2026-08-07: เอาการแจ้งกลุ่มแอดมิน (LINE_ADMIN_GROUP_ID, Flex Message) ออกแล้วตามที่ผู้ใช้ขอ — สาเหตุ
// คือ LINE ไม่อนุญาตให้บอท/OA ส่งข้อความเข้ากลุ่มโดยแสดงเป็นชื่อ/บัญชีจริงของลูกค้าได้เลย (ข้อจำกัดของ
// แพลตฟอร์ม กันการปลอมตัว) ข้อความที่บอทส่งเข้ากลุ่มจะขึ้นเป็น "ส่งโดย OA" เสมอ ทำได้แค่ใส่ชื่อ/รูปลูกค้าไว้
// ในเนื้อหาข้อความเท่านั้น ไม่ใช่ "เหมือนลูกค้าส่งเอง" จริงๆ — ผู้ใช้เลือกใช้วิธีที่ให้ผลตรงตามที่ต้องการ
// (แชทดูเหมือนลูกค้าส่งเองจริง 100% ตามกฎ LINE) แทน: ให้แอดมินทุกคนเข้า LINE Official Account Manager
// (ระบบ shared inbox ของ LINE เอง) แล้วดูแชทของลูกค้าแต่ละคนโดยตรง — แชทนั้นเป็นของลูกค้าจริง 100% (เห็น
// ชื่อ/รูปโปรไฟล์จริงตาม native ของ LINE เอง) ไม่ต้องมีกลไกเพิ่มเติมฝั่งเราเลย แค่แอดมินต้องถูกเพิ่มเป็น
// ผู้ดูแล (operator) ของ OA ใน LINE Official Account Manager ก่อน (ตั้งค่าฝั่ง LINE ไม่ใช่โค้ด)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LINE_CHANNEL_ACCESS_TOKEN = Deno.env.get("LINE_CHANNEL_ACCESS_TOKEN")!;

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
    const { items, lineUserId } = await req.json();
    // items: [{name, qty, price, url}]

    const { lines, total } = buildItemLines(items);
    const totalLine = `รวมทั้งหมด: ฿${total.toLocaleString("th-TH")}`;

    // push เข้าแชทจริงของลูกค้าเท่านั้น — สำเร็จได้ก็ต่อเมื่อลูกค้าเป็นเพื่อนกับ OA แล้วเท่านั้น (ข้อจำกัด
    // ของ Messaging API push) ใช้ผลลัพธ์นี้เป็นตัวบอก caller (line-login.js) ว่าควร save profile/เคลียร์
    // ตะกร้าหรือไม่ — แอดมินดูออเดอร์ได้จาก LINE Official Account Manager โดยตรง (แชทเดียวกับที่ push ไปนี้
    // เอง ไม่ต้องมีกลไกแจ้งเตือนแยกอีกจุด)
    let customerOk = false;
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

    if (!customerOk) {
      return new Response(JSON.stringify({ ok: false, error: "ลูกค้ายังไม่ได้เพิ่มเพื่อน LINE", customerOk }), {
        status: 200,
        headers: CORS_HEADERS,
      });
    }

    return new Response(JSON.stringify({ ok: true, customerOk }), {
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
