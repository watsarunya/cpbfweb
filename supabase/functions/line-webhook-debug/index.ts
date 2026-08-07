// supabase/functions/line-webhook-debug/index.ts
// ⚠️ ชั่วคราวเท่านั้น — ใช้ดัก LINE userId จริงของแอดมิน (ไม่ตรวจสอบ x-line-signature เพราะไม่ได้ใช้งาน
// จริงถาวร แค่ต้องการอ่าน userId จาก event ที่ LINE ส่งเข้ามาชั่วครั้งเดียว) ลบทิ้งได้หลังจากได้ userId แล้ว
//
// วิธีใช้:
// 1. Deploy ฟังก์ชันนี้ (ต้องปิด JWT verification ของฟังก์ชันนี้ด้วย ไม่งั้น LINE เรียกเข้ามาไม่ได้เลย
//    เพราะ LINE ไม่ส่ง Supabase JWT มาด้วย — ใช้ `supabase functions deploy line-webhook-debug
//    --no-verify-jwt` ถ้า deploy ผ่าน CLI หรือหา toggle "Enforce JWT Verification" ในหน้าตั้งค่าฟังก์ชัน
//    บน Dashboard แล้วปิดไว้)
// 2. เอา URL ของฟังก์ชันนี้ (https://<project>.supabase.co/functions/v1/line-webhook-debug) ไปตั้งเป็น
//    Webhook URL ใน LINE Developers Console > Messaging API channel (ตัวเดียวกับ @cpbf) > Messaging API
//    tab > Webhook settings > เปิด "Use webhook" แล้วกด "Verify" (ควรขึ้นสำเร็จ)
// 3. ส่งข้อความอะไรก็ได้หา @cpbf จากแอป LINE ของตัวเอง 1 ครั้ง
// 4. เปิด Supabase Dashboard > Edge Functions > line-webhook-debug > Logs อ่าน userId ที่ log ไว้

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("ok", { status: 200 });
  }

  try {
    const body = await req.json();
    const events = body.events || [];
    if (events.length === 0) {
      console.log("LINE webhook: verify ping (ไม่มี event จริง — ปกติสำหรับตอนกด Verify ใน console)");
    }
    for (const event of events) {
      console.log(
        "LINE webhook event:",
        JSON.stringify({
          type: event.type,
          userId: event.source && event.source.userId,
          sourceType: event.source && event.source.type,
        }),
      );
    }
  } catch (e) {
    console.error("parse error:", e);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
