/* social-render.js — โมดูลกลาง: ดึง "รายละเอียด" ใต้โลโก้ + ไอคอนโซเชียลจริงจาก Supabase (ตาราง
   footer_settings/social_links, จัดการผ่าน cms/social-links.html) มาแทนที่เนื้อหา static เดิมในทุกหน้าเว็บ
   — ไอคอนโซเชียล render ได้ 2 จุด ใช้ข้อมูลชุดเดียวกัน (fetch ครั้งเดียว): footer (#siteFooterSocial) และ
   ส่วน "Follow us on social media" ของหน้า contact.html (#contactSocialIcons — ถ้าไม่มี container นี้ในหน้า
   จะข้ามไปเงียบๆ) — เดิม contact.html มีไอคอนสีตามแบรนด์ (FB สีฟ้า/IG gradient/Line เขียว/TikTok ดำ) hardcode
   แยกจาก footer แบบหนึ่งชุด ผู้ใช้ขอให้อ้างอิงข้อมูลเดียวกับ footer ตามที่ตั้งค่าไว้ใน CMS แทน — ตาราง
   social_links ไม่มีคอลัมน์เก็บสีต่อแบรนด์ จึงเปลี่ยนมาใช้วงกลมเรียบ (ขอบบาง) ครอบรูปไอคอนที่แอดมินอัปโหลด
   เอง (`.contact-social__icon--dynamic`) แทนสีเฉพาะแบรนด์เดิม — ถ้าดึงไม่สำเร็จ (เน็ตหลุด/ตั้งค่าไม่ครบ) จะคง
   static fallback เดิมไว้ทั้งสองจุด ไม่พังทั้งหน้า (pattern เดียวกับ nav-render.js) ต้องโหลดหลัง
   cms/supabase-client.js */
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

  function buildIconLink(item, className) {
    return '<a href="' + escapeHtml(item.link_url) + '" target="_blank" rel="noopener" class="' + className + '" aria-label="' + escapeHtml(item.label) + '">' +
      '<img src="' + escapeHtml(item.icon_url) + '" alt="" width="20" height="20" loading="lazy" />' +
      '</a>';
  }

  async function renderSocialIcons() {
    var footerContainer = document.getElementById('siteFooterSocial');
    var contactContainer = document.getElementById('contactSocialIcons');
    if (!footerContainer && !contactContainer) return;

    var { data, error } = await window.cmsSupabase
      .from('social_links')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('โหลดไอคอนโซเชียลไม่สำเร็จ:', error.message);
      return;
    }

    var items = data || [];

    if (footerContainer) {
      footerContainer.innerHTML = items.map(function (item) {
        return buildIconLink(item, 'site-footer__social-icon');
      }).join('');
    }
    if (contactContainer) {
      // ใช้ class คนละชุดกับ footer (.contact-social__icon แทน .site-footer__social-icon) — ของเดิมเป็น
      // วงกลมสีตามแบรนด์ (FB ฟ้า/IG gradient/Line เขียว/TikTok ดำ) แต่ social_links ไม่มีคอลัมน์เก็บสีต่อ
      // แบรนด์ เปลี่ยนเป็นวงกลมเรียบขอบบางครอบไอคอนที่แอดมินอัปโหลดแทน (ดู .contact-social__icon--dynamic
      // ใน style.css)
      contactContainer.innerHTML = items.map(function (item) {
        return buildIconLink(item, 'contact-social__icon contact-social__icon--dynamic');
      }).join('');
    }
  }

  document.addEventListener('DOMContentLoaded', async function () {
    await Promise.all([renderDescription(), renderSocialIcons()]);
    document.dispatchEvent(new CustomEvent('navRendered'));
  });
})();
