-- CP B&F CMS — seed หน้า newsroom (ข่าวสารและกิจกรรม) เข้า Page Management แบบ "เสริม" (additive) เหมือน
-- online_shop.html — ผู้ใช้ขอให้ newsroom.html เพิ่ม KV Banner ได้ ซึ่ง KV Banner render ผ่าน "static proxy"
-- page_sections row (ดูหมายเหตุใน page-render.js/banners.js's ensureKvProxySection) ต้องมีแถวใน pages table
-- ให้ผูกด้วยก่อนถึงจะสร้าง proxy row ได้ — newsroom.html เองไม่ได้ย้ายเนื้อหาจริง (รายการบทความ/filter tiles)
-- เข้ามาใน page_sections เลย เพราะมี news-render.js ผูกอยู่จริง (เหมือน online_shop.html's สินค้า/ตะกร้า)
--
-- ⚠️ พบว่ามี KV banner แถวเดียวอยู่แล้วจริงสำหรับ newsroom.html (banners.id=8b444cf8-2770-4c5a-ae1d-
-- 0cee23d20e99, active) ที่แอดมินเคยเพิ่มผ่าน cms/banners.html มาก่อนแล้ว แต่ไม่เคยแสดงผลจริงเลย เพราะ (1)
-- newsroom.html เองไม่มี #pageSectionsContainer/page-render.js ให้ render ลงไป และ (2) ensureKvProxySection()
-- หา pages row ของ newsroom ไม่เจอ (ยังไม่เคย seed) เลย silently return โดยไม่สร้าง proxy row ให้เลยตั้งแต่แรก
-- — ไฟล์นี้เลย backfill proxy row ให้ banner ตัวที่มีอยู่แล้วนี้ด้วยเลยในตัว (นอกเหนือจาก pages row หลัก)
--
-- ต้องรัน schema-pages.sql ให้ครบก่อน ไม่งั้น insert นี้จะ error (คอลัมน์ไม่ครบ)
-- ปลอดภัยรันซ้ำได้ (ลบ pages row เดิม cascade ไป page_sections ก่อน insert ใหม่ทุกครั้ง)

do $$
declare
  v_menu_item_id uuid;
  v_page_id uuid;
begin
  select id into v_menu_item_id from menu_items where url = 'newsroom.html' limit 1;
  if v_menu_item_id is null then
    raise exception 'ไม่พบเมนู url=newsroom.html ใน menu_items table';
  end if;

  -- ลบเพจเดิมถ้าเคย seed มาก่อน (cascade ลบ page_sections ของเพจนี้ไปด้วยอัตโนมัติ) กันซ้ำถ้ารันไฟล์นี้ซ้ำ
  delete from pages where page_key = 'newsroom';

  insert into pages (page_key, slug, menu_item_id, title_th, title_en, is_standalone, is_active)
  values (
    'newsroom', 'newsroom', v_menu_item_id,
    'ข่าวสารและกิจกรรม', 'Newsroom', false, true
  )
  returning id into v_page_id;

  -- backfill proxy section ให้ KV banner ที่มีอยู่แล้วจริงของ newsroom.html (ถ้ามี — เผื่อกรณีลบ banner นั้น
  -- ไปแล้วก่อนรันไฟล์นี้ก็ไม่ error อะไร แค่ไม่สร้างอะไรเพิ่ม)
  insert into page_sections (page_id, anchor_id, layout, body_th, is_active, sort_order)
  select v_page_id, 'kv-banner-' || b.id, 'custom-html', '<!-- static-proxy -->', true, 0
  from banners b
  where b.page_url = 'newsroom.html' and b.section = 'kv';
end $$;
