/* legal-render.js — โมดูลกลาง: ดึงเนื้อหาหน้ากฎหมาย (นโยบายความเป็นส่วนตัว/ข้อกำหนดการใช้งาน) จริงจาก
   Supabase (ตาราง legal_pages, จัดการผ่าน cms/legal-editor.html) มา render ใน privacy-policy.html/
   terms-of-use.html — เช่นเดียวกับ page-render.js เนื้อหา rich text render เฉพาะภาษาไทยเท่านั้น
   (ข้อจำกัดที่ตั้งใจแบบเดียวกับ page_sections — คอลัมน์ content_en เก็บไว้รอวันที่ระบบ i18n รองรับ dynamic
   content จริง) ต้องโหลดหลัง cms/supabase-client.js */
(function () {
  function formatThaiDateTime(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' }) +
      ' เวลา ' + d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
  }

  function formatEnglishDateTime(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) +
      ' at ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  async function init() {
    var container = document.getElementById('legalPageContainer');
    if (!container) return;
    var pageKey = container.dataset.pageKey;

    var { data, error } = await window.cmsSupabase
      .from('legal_pages')
      .select('*')
      .eq('page_key', pageKey)
      .maybeSingle();

    if (error || !data) {
      console.error('โหลดเนื้อหาหน้ากฎหมายไม่สำเร็จ:', error && error.message);
      window.location.replace('404.html');
      return;
    }

    var titleEl = document.getElementById('legalPageTitle');
    if (titleEl) {
      titleEl.textContent = data.title_th;
      if (data.title_en) {
        titleEl.setAttribute('data-en', data.title_en);
      } else {
        titleEl.removeAttribute('data-en');
      }
    }

    var metaEl = document.getElementById('legalPageMeta');
    if (metaEl) {
      metaEl.textContent = 'อัปเดตล่าสุด: ' + formatThaiDateTime(data.updated_at);
      metaEl.setAttribute('data-en', 'Last updated: ' + formatEnglishDateTime(data.updated_at));
    }

    var bodyEl = document.getElementById('legalPageBody');
    if (bodyEl) {
      var sanitize = window.DOMPurify ? window.DOMPurify.sanitize.bind(window.DOMPurify) : function (h) { return h; };
      bodyEl.innerHTML = sanitize(data.content_th || '');
    }

    document.dispatchEvent(new CustomEvent('navRendered'));
  }

  document.addEventListener('DOMContentLoaded', init);
})();
