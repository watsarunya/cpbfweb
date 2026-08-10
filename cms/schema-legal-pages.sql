-- cms/schema-legal-pages.sql — ระบบจัดการหน้า Footer (นโยบายความเป็นส่วนตัว / ข้อกำหนดการใช้งาน)
-- รันใน Supabase SQL Editor ก่อนใช้งาน cms/legal-editor.html และ privacy-policy.html/terms-of-use.html
-- ปลอดภัยรันซ้ำได้ (create table/index ใช้ "if not exists", policy ใช้ "drop if exists" ก่อน create เสมอ,
-- insert ใช้ "on conflict do nothing")

create table if not exists legal_pages (
  id uuid primary key default gen_random_uuid(),
  page_key text unique not null check (page_key in ('privacy-policy', 'terms-of-use')),
  title_th text not null,
  title_en text,
  content_th text not null default '',
  content_en text default '',
  version integer not null default 1,
  updated_at timestamptz not null default now(),
  updated_by_email text
);

-- เก็บ snapshot ของเนื้อหา "ก่อนแก้ไข" ทุกครั้งที่บันทึกใหม่ — append-only ห้ามแก้/ลบ
create table if not exists legal_page_versions (
  id uuid primary key default gen_random_uuid(),
  legal_page_id uuid not null references legal_pages(id) on delete cascade,
  page_key text not null,
  version integer not null,
  title_th text,
  title_en text,
  content_th text,
  content_en text,
  updated_at timestamptz not null default now(),
  updated_by_email text
);

create index if not exists legal_page_versions_legal_page_id_idx on legal_page_versions (legal_page_id, version desc);

alter table legal_pages enable row level security;
alter table legal_page_versions enable row level security;

-- public: อ่านได้อย่างเดียว (หน้า privacy-policy.html/terms-of-use.html ดึงเนื้อหาปัจจุบันไปแสดง)
-- authenticated (แอดมิน CMS): อ่าน/เขียนได้เต็มที่ — pattern เดียวกับตารางอื่นทั้งหมดในระบบ
-- drop-if-exists ก่อน create ทุกอัน เพื่อให้รันซ้ำได้ปลอดภัย (create policy เฉยๆ ไม่มี "if not exists"
-- รองรับใน Postgres เวอร์ชันที่ Supabase ใช้ — รันซ้ำโดยไม่ drop ก่อนจะ error "policy already exists")
drop policy if exists "public read legal_pages" on legal_pages;
create policy "public read legal_pages" on legal_pages for select using (true);

drop policy if exists "authenticated write legal_pages" on legal_pages;
create policy "authenticated write legal_pages" on legal_pages for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read legal_page_versions" on legal_page_versions;
create policy "public read legal_page_versions" on legal_page_versions for select using (true);

drop policy if exists "authenticated write legal_page_versions" on legal_page_versions;
create policy "authenticated write legal_page_versions" on legal_page_versions for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into legal_pages (page_key, title_th, title_en, content_th, content_en)
values
  ('privacy-policy', 'นโยบายความเป็นส่วนตัว', 'Privacy Policy', '<p>เนื้อหานโยบายความเป็นส่วนตัว — แก้ไขได้ผ่าน CMS &gt; จัดการ Footer</p>', '<p>Privacy policy content — editable via CMS &gt; Footer Management</p>'),
  ('terms-of-use', 'ข้อกำหนดการใช้งาน', 'Terms of Use', '<p>เนื้อหาข้อกำหนดการใช้งาน — แก้ไขได้ผ่าน CMS &gt; จัดการ Footer</p>', '<p>Terms of use content — editable via CMS &gt; Footer Management</p>')
on conflict (page_key) do nothing;
