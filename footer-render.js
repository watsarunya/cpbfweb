/* footer-render.js — โมดูลกลาง: สร้างคอลัมน์ลิงก์ของ footer (ผลิตภัณฑ์ของเรา/บริการของเรา/บริษัท ฯลฯ)
   จาก Supabase (ตาราง menu_items — ตัวเดียวกับที่ nav-render.js ใช้สร้าง header nav) แทนที่คอลัมน์ static
   เดิมที่ hardcode ไว้ ให้ footer เปลี่ยนตามการจัดการเมนู (cms/index.html) โดยอัตโนมัติ:
   - เมนูหลักที่ถูกลบ/ปิดใช้งาน (is_active=false) จะหายไปจาก footer ด้วย (query กรอง is_active=true เหมือน
     nav-render.js อยู่แล้ว)
   - เมนูหลักใหม่ที่เพิ่มเข้ามาจะโผล่ใน footer อัตโนมัติโดยไม่ต้องแก้โค้ด
   - เมนูหลักที่ "มี" เมนูย่อย → แยกเป็นคอลัมน์ของตัวเอง (หัวข้อ = ชื่อเมนูหลัก, ลิงก์ = เมนูย่อยแต่ละอัน)
   - เมนูหลักที่ "ไม่มี" เมนูย่อย → รวมกันอยู่ใต้คอลัมน์ "บริษัท" (Company)
   - ถ้ากลุ่ม "บริษัท" มีเกิน 5 เมนู → แบ่งเป็นหลายคอลัมน์ (คอลัมน์ละไม่เกิน 5 อัน หัวข้อ "บริษัท" ซ้ำทุกคอลัมน์)
   ถ้าดึงไม่สำเร็จ (เน็ตหลุด/ตั้งค่าไม่ครบ) จะคงคอลัมน์ static เดิมไว้ ไม่พังทั้งหน้า (pattern เดียวกับ
   nav-render.js) ต้องโหลดหลัง cms/supabase-client.js */
(function () {
  var COMPANY_GROUP_CHUNK_SIZE = 5;
  var LANG_KEY = 'cpbf-lang';

  function currentLang() {
    return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'th';
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (attrs[key] === undefined || attrs[key] === null || attrs[key] === '') return;
        node.setAttribute(key, attrs[key]);
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function bilingualText(node, th, en) {
    node.setAttribute('data-th', th);
    node.setAttribute('data-en', en);
    node.textContent = currentLang() === 'en' ? en : th;
  }

  function linkAttrs(item) {
    var attrs = { href: item.url || '#' };
    if (item.open_new_tab) {
      attrs.target = '_blank';
      attrs.rel = 'noopener';
    }
    return attrs;
  }

  function buildColumn(headingTh, headingEn, links) {
    var heading = el('h3', { class: 'site-footer__heading' });
    bilingualText(heading, headingTh, headingEn);

    var column = el('div', { class: 'site-footer__column' }, [heading]);
    links.forEach(function (item) {
      var a = el('a', linkAttrs(item));
      bilingualText(a, item.name_th, item.name_en);
      column.appendChild(a);
    });
    return column;
  }

  async function renderFooterColumns() {
    var footerTop = document.getElementById('siteFooterTop');
    if (!footerTop || !window.cmsSupabase) return;

    var { data, error } = await window.cmsSupabase
      .from('menu_items')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('footer-render.js: โหลดเมนูจาก Supabase ไม่สำเร็จ ใช้คอลัมน์ static เดิมแทน', error);
      return;
    }

    var byParent = {};
    data.forEach(function (item) {
      var key = item.parent_id || 'root';
      if (!byParent[key]) byParent[key] = [];
      byParent[key].push(item);
    });

    var roots = byParent.root || [];
    var columns = [];
    var companyItems = [];

    roots.forEach(function (item) {
      var children = byParent[item.id] || [];
      if (children.length > 0) {
        columns.push(buildColumn(item.name_th, item.name_en, children));
      } else {
        companyItems.push(item);
      }
    });

    for (var i = 0; i < companyItems.length; i += COMPANY_GROUP_CHUNK_SIZE) {
      columns.push(buildColumn('บริษัท', 'Company', companyItems.slice(i, i + COMPANY_GROUP_CHUNK_SIZE)));
    }

    footerTop.querySelectorAll('.site-footer__column').forEach(function (el) { el.remove(); });
    columns.forEach(function (column) { footerTop.appendChild(column); });

    document.dispatchEvent(new CustomEvent('navRendered'));
  }

  document.addEventListener('DOMContentLoaded', renderFooterColumns);
})();
