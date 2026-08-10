/* social-render.js — โมดูลกลาง: ดึง "รายละเอียด" ใต้โลโก้ + ไอคอนโซเชียลของ footer จริงจาก Supabase
   (ตาราง footer_settings/social_links, จัดการผ่าน cms/social-links.html) มาแทนที่เนื้อหา static เดิม
   ในทุกหน้าเว็บ — ถ้าดึงไม่สำเร็จ (เน็ตหลุด/ตั้งค่าไม่ครบ) จะคง static fallback เดิมไว้ ไม่พังทั้งหน้า
   (pattern เดียวกับ nav-render.js) ต้องโหลดหลัง cms/supabase-client.js */
(function () {
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
  }

  async function renderDescription() {
    var el = document.getElementById('siteFooterBrandText');
    if (!el) return;

    var { data, error } = await window.cmsSupabase
      .from('footer_settings')
      .select('*')
      .eq('key', 'footer')
      .maybeSingle();

    if (error || !data) {
      console.error('โหลดข้อความ footer ไม่สำเร็จ:', error && error.message);
      return;
    }

    el.textContent = data.description_th || '';
    if (data.description_en) {
      el.setAttribute('data-en', data.description_en);
    } else {
      el.removeAttribute('data-en');
    }
  }

  async function renderSocialIcons() {
    var container = document.getElementById('siteFooterSocial');
    if (!container) return;

    var { data, error } = await window.cmsSupabase
      .from('social_links')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('โหลดไอคอนโซเชียลไม่สำเร็จ:', error.message);
      return;
    }
    if (!data || data.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = data.map(function (item) {
      return '<a href="' + escapeHtml(item.link_url) + '" target="_blank" rel="noopener" class="site-footer__social-icon" aria-label="' + escapeHtml(item.label) + '">' +
        '<img src="' + escapeHtml(item.icon_url) + '" alt="" width="20" height="20" loading="lazy" />' +
        '</a>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', async function () {
    await Promise.all([renderDescription(), renderSocialIcons()]);
    document.dispatchEvent(new CustomEvent('navRendered'));
  });
})();
