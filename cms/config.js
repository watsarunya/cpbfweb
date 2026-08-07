/* cms/config.js — ใส่ค่าจาก Supabase Dashboard > Project Settings > API
   SUPABASE_URL   = Project URL (เช่น https://xxxxxxxx.supabase.co)
   SUPABASE_ANON_KEY = anon public key (ขึ้นต้นด้วย "eyJ...")
   ⚠️ ใช้ได้เฉพาะ "anon public" key เท่านั้น ห้ามใช้ "service_role" key ในไฟล์นี้เด็ดขาด
      (ไฟล์นี้รันบนเบราว์เซอร์ผู้ใช้ ใครก็เปิดดูค่าได้ — service_role key ต้องไม่ปรากฏในโค้ดฝั่ง client) */

window.CMS_CONFIG = {
  SUPABASE_URL: 'https://gafvtbkmizxorqpmezna.supabase.co',
  SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhZnZ0YmttaXp4b3JxcG1lem5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MDcxOTcsImV4cCI6MjEwMDM4MzE5N30.P1jjAGkyZ9ya07_Be40Vv5UluyeFszGjCujGAV6eN6Q',
};
