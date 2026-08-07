/* subscribe.js — ผูกฟอร์มสมัครรับข่าวสารที่ footer (.site-footer__newsletter-form) ให้บันทึกอีเมล
   ลงตาราง subscribers ใน Supabase จริง (ต้องรันหลัง cms/config.js + cms/supabase-client.js) */
(function () {
  function setStatus(el, message, state) {
    el.textContent = message;
    el.className = 'site-footer__newsletter-status' + (state ? ' is-' + state : '');
  }

  function bindForm(form) {
    var input = form.querySelector('input[type="email"]');
    var button = form.querySelector('button[type="submit"]');
    if (!input || !button || form.dataset.subscribeBound) return;
    form.dataset.subscribeBound = 'true';

    var status = document.createElement('p');
    status.className = 'site-footer__newsletter-status';
    form.appendChild(status);

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!email) return;

      if (!window.cmsSupabase) {
        setStatus(status, 'สมัครไม่สำเร็จ กรุณาลองใหม่อีกครั้ง', 'error');
        return;
      }

      button.disabled = true;
      setStatus(status, '', '');

      var { error } = await window.cmsSupabase.from('subscribers').insert({ email: email });

      button.disabled = false;

      if (error) {
        if (error.code === '23505') {
          setStatus(status, 'อีเมลนี้สมัครรับข่าวสารไว้แล้ว', 'info');
        } else {
          setStatus(status, 'สมัครไม่สำเร็จ กรุณาลองใหม่อีกครั้ง', 'error');
        }
        return;
      }

      form.reset();
      setStatus(status, 'สมัครรับข่าวสารเรียบร้อยแล้ว ขอบคุณค่ะ', 'success');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.site-footer__newsletter-form').forEach(bindForm);
  });
})();
