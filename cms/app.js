/* cms/app.js — auth guard + shared topbar/sidebar behavior สำหรับทุกหน้าที่ต้อง login ก่อน */
(function () {
  // ย่อ/ขยาย sidebar — apply สถานะที่จำไว้ทันที (ก่อน DOMContentLoaded) กันเห็นเมนูกระพริบเต็ม/ย่อ
  // สลับกันตอนโหลดหน้าใหม่ทุกครั้ง (เว็บนี้เป็น static multi-page ไม่มี SPA state คงอยู่ข้ามหน้า)
  var SIDEBAR_COLLAPSE_KEY = 'cms-sidebar-collapsed';
  var sidebarEl = document.querySelector('.cms-sidebar');
  if (sidebarEl && localStorage.getItem(SIDEBAR_COLLAPSE_KEY) === '1') {
    sidebarEl.classList.add('is-collapsed');
  }

  // อัปเดตแถวเดียวแบบ "keepalive" — ใช้ raw fetch() พร้อม {keepalive:true} แทน window.cmsSupabase.from().update()
  // ตรงๆ เพื่อกันปัญหา request ค้าง (pending) ถูก browser ยกเลิกทันทีถ้าผู้ใช้รีเฟรช/ปิดแท็บก่อน response กลับมา
  // (เจอจริงกับปุ่ม toggle เปิด/ปิดใช้งานที่หน้ารายการสินค้า/บทความ — UI ฟลิปให้ทันทีแบบ optimistic ทำให้ดู
  // เหมือนบันทึกเสร็จแล้ว ทั้งที่ request จริงยังไม่ถึงเซิร์ฟเวอร์ พอรีเฟรชเร็วเกินไปค่าที่ตั้งเลยไม่ถูกบันทึกจริง)
  // ใช้ได้เฉพาะ payload เล็กๆ เท่านั้น (เช่น toggle 1 ฟิลด์) เพราะ keepalive request มีลิมิต 64KB รวมทุก request
  // ที่ค้างอยู่พร้อมกัน — ห้ามใช้กับการอัปโหลดรูปภาพหรือฟอร์มที่มี rich text ยาวๆ (ยังใช้
  // window.cmsSupabase.from().update() ปกติสำหรับจุดนั้นต่อไป)
  window.cmsUpdateWithKeepalive = async function (table, id, patch) {
    try {
      var { data: { session } } = await window.cmsSupabase.auth.getSession();
      if (!session) return { error: { message: 'ไม่พบ session กรุณาล็อกอินใหม่' } };

      var res = await fetch(
        window.CMS_CONFIG.SUPABASE_URL + '/rest/v1/' + table + '?id=eq.' + encodeURIComponent(id),
        {
          method: 'PATCH',
          keepalive: true,
          headers: {
            apikey: window.CMS_CONFIG.SUPABASE_ANON_KEY,
            Authorization: 'Bearer ' + session.access_token,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify(patch),
        }
      );
      if (!res.ok) {
        var text = await res.text().catch(function () { return ''; });
        return { error: { message: text || ('HTTP ' + res.status) } };
      }
      return { error: null };
    } catch (err) {
      return { error: { message: err.message || String(err) } };
    }
  };

  window.cmsRequireAuth = async function () {
    const { data: { session } } = await window.cmsSupabase.auth.getSession();
    if (!session) {
      window.location.href = 'login.html';
      return null;
    }
    var emailEl = document.getElementById('cmsUserEmail');
    var avatarEl = document.getElementById('cmsUserInitial');
    if (emailEl) emailEl.textContent = session.user.email;
    if (avatarEl) avatarEl.textContent = (session.user.email || '?').charAt(0).toUpperCase();
    maybeShowSetPasswordPrompt(session);
    return session;
  };

  // แอดมินที่เพิ่งถูกสร้างด้วยรหัสผ่านสุ่ม (ดู cms/admins.js) จะมี user_metadata.must_set_password = true
  // — เสนอให้ตั้งรหัสผ่านใหม่เองหลัง login ครั้งแรก (และทุกครั้งถัดไปจนกว่าจะตั้งจริง) แต่ไม่บังคับ กด "ข้ามไปก่อน"
  // ได้ — ถ้าข้าม จะไม่รบกวนซ้ำอีกในเซสชันเบราว์เซอร์เดียวกัน (sessionStorage) แต่จะกลับมาถามใหม่ตอน login รอบหน้า
  var SKIP_PASSWORD_PROMPT_KEY = 'cms-skip-password-prompt';

  function maybeShowSetPasswordPrompt(session) {
    if (!session.user.user_metadata || !session.user.user_metadata.must_set_password) return;
    if (sessionStorage.getItem(SKIP_PASSWORD_PROMPT_KEY) === '1') return;

    var overlay = document.createElement('div');
    overlay.className = 'cms-modal-overlay';
    overlay.innerHTML =
      '<div class="cms-modal">' +
        '<div class="cms-modal__header">' +
          '<h2>ตั้งรหัสผ่านใหม่</h2>' +
          '<button type="button" class="cms-modal__close" aria-label="ปิด">✕</button>' +
        '</div>' +
        '<form>' +
          '<div class="cms-modal__body">' +
            '<p class="cms-section-hint">บัญชีนี้ยังใช้รหัสผ่านที่ระบบสุ่มให้ตอนสร้างอยู่ — ตั้งรหัสผ่านใหม่ของคุณเองได้เลย หรือข้ามไปก่อนก็ได้</p>' +
            '<div class="cms-field">' +
              '<label for="newPasswordField">รหัสผ่านใหม่</label>' +
              '<input type="password" id="newPasswordField" autocomplete="new-password" minlength="8" required />' +
            '</div>' +
            '<div class="cms-field">' +
              '<label for="newPasswordConfirmField">ยืนยันรหัสผ่านใหม่</label>' +
              '<input type="password" id="newPasswordConfirmField" autocomplete="new-password" minlength="8" required />' +
            '</div>' +
            '<p class="cms-error-text" id="newPasswordError"></p>' +
          '</div>' +
          '<div class="cms-modal__footer">' +
            '<button type="button" class="cms-btn" id="skipPasswordBtn">ข้ามไปก่อน</button>' +
            '<button type="submit" class="cms-btn cms-btn--primary">ตั้งรหัสผ่านใหม่</button>' +
          '</div>' +
        '</form>' +
      '</div>';
    document.body.appendChild(overlay);

    function close() {
      overlay.remove();
    }
    function skip() {
      sessionStorage.setItem(SKIP_PASSWORD_PROMPT_KEY, '1');
      close();
    }

    overlay.querySelector('.cms-modal__close').addEventListener('click', skip);
    overlay.querySelector('#skipPasswordBtn').addEventListener('click', skip);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) skip(); });

    overlay.querySelector('form').addEventListener('submit', async function (e) {
      e.preventDefault();
      var errorEl = overlay.querySelector('#newPasswordError');
      errorEl.textContent = '';
      var pw = overlay.querySelector('#newPasswordField').value;
      var pwConfirm = overlay.querySelector('#newPasswordConfirmField').value;

      if (pw.length < 8) {
        errorEl.textContent = 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร';
        return;
      }
      if (pw !== pwConfirm) {
        errorEl.textContent = 'รหัสผ่านทั้งสองช่องไม่ตรงกัน';
        return;
      }

      var submitBtn = overlay.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'กำลังบันทึก...';

      var { error } = await window.cmsSupabase.auth.updateUser({
        password: pw,
        data: { must_set_password: false },
      });

      submitBtn.disabled = false;
      submitBtn.textContent = 'ตั้งรหัสผ่านใหม่';

      if (error) {
        errorEl.textContent = 'ตั้งรหัสผ่านไม่สำเร็จ: ' + error.message;
        return;
      }
      close();
      if (window.cmsToast) window.cmsToast('ตั้งรหัสผ่านใหม่เรียบร้อยแล้ว', 'success');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var logoutBtn = document.getElementById('cmsLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async function () {
        await window.cmsSupabase.auth.signOut();
        window.location.href = 'login.html';
      });
    }

    // Avatar dropdown (มุมขวาบน) — คลิกเปิด/ปิดเมนู "ออกจากระบบ", คลิกนอกเมนูหรือกด Escape ปิดอัตโนมัติ
    var avatarBtn = document.getElementById('cmsAvatarBtn');
    var avatarDropdown = document.getElementById('cmsAvatarDropdown');
    if (avatarBtn && avatarDropdown) {
      var closeDropdown = function () {
        avatarDropdown.classList.remove('is-open');
        avatarBtn.setAttribute('aria-expanded', 'false');
      };
      avatarBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = avatarDropdown.classList.toggle('is-open');
        avatarBtn.setAttribute('aria-expanded', String(isOpen));
      });
      document.addEventListener('click', function (e) {
        if (!avatarDropdown.classList.contains('is-open')) return;
        if (avatarDropdown.contains(e.target) || avatarBtn.contains(e.target)) return;
        closeDropdown();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeDropdown();
      });
    }

    var sidebarToggle = document.getElementById('cmsSidebarToggle');
    if (sidebarEl && sidebarToggle) {
      sidebarToggle.addEventListener('click', function () {
        var collapsed = sidebarEl.classList.toggle('is-collapsed');
        localStorage.setItem(SIDEBAR_COLLAPSE_KEY, collapsed ? '1' : '0');
      });
    }
  });

  window.cmsToast = function (message, type) {
    var wrap = document.getElementById('cmsToastWrap');
    if (!wrap) return;
    var item = document.createElement('div');
    item.className = 'cms-toast__item' + (type ? ' is-' + type : '');
    item.textContent = message;
    wrap.appendChild(item);
    setTimeout(function () {
      item.remove();
    }, 3200);
  };
})();
