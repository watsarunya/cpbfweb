// supabase/functions/line-login-exchange/index.ts
// แลก authorization code จาก LINE Login (OAuth 2.1) เป็น LINE profile จริง (userId/displayName/pictureUrl)
// ต้องทำฝั่ง server เท่านั้นเพราะต้องใช้ Channel secret ของ LINE Login channel ซึ่งห้ามอยู่ฝั่ง client เด็ดขาด
// เรียกจาก line-callback.html ผ่าน line-login.js's handleLineCallback()

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LINE_LOGIN_CHANNEL_ID = Deno.env.get("LINE_LOGIN_CHANNEL_ID")!;
const LINE_LOGIN_CHANNEL_SECRET = Deno.env.get("LINE_LOGIN_CHANNEL_SECRET")!;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS_HEADERS });
  }

  try {
    const { code, redirect_uri } = await req.json();
    if (!code || !redirect_uri) {
      return json({ ok: false, error: "missing code/redirect_uri" }, 400);
    }

    const tokenRes = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
        client_id: LINE_LOGIN_CHANNEL_ID,
        client_secret: LINE_LOGIN_CHANNEL_SECRET,
      }),
    });

    const tokenJson = await tokenRes.json();
    if (!tokenRes.ok) {
      console.error("LINE token exchange failed:", tokenJson);
      return json({ ok: false, error: tokenJson.error_description || "แลก token กับ LINE ไม่สำเร็จ" }, 500);
    }

    const profileRes = await fetch("https://api.line.me/v2/profile", {
      headers: { "Authorization": `Bearer ${tokenJson.access_token}` },
    });
    const profileJson = await profileRes.json();
    if (!profileRes.ok) {
      console.error("LINE profile fetch failed:", profileJson);
      return json({ ok: false, error: "ดึงข้อมูลโปรไฟล์ LINE ไม่สำเร็จ" }, 500);
    }

    return json({
      ok: true,
      userId: profileJson.userId,
      displayName: profileJson.displayName,
      pictureUrl: profileJson.pictureUrl || "",
    });
  } catch (e) {
    return json({ ok: false, error: String(e) }, 400);
  }
});
