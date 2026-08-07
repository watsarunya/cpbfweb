/* line-login.js — สั่งซื้อผ่าน LINE โดยใช้ LINE LIFF (shareTargetPicker) เท่านั้น
   (⚠️ 2026-08-07: เปลี่ยนสถาปัตยกรรมทั้งหมดตามที่ผู้ใช้ขอ — เอา LINE Login (OAuth) + การ push ออเดอร์ผ่าน
   Supabase Edge Function (send-line-order/line-login-exchange) ออกทั้งหมด ไม่ใช้แล้ว เพราะข้อความที่ระบบ
   push เองได้จะแสดงเป็น "ส่งโดย OA" เสมอ ไม่มีทางแสดงเป็นข้อความที่ลูกค้าส่งเองได้จริงตามกฎ LINE — LIFF's
   shareTargetPicker() เป็นกลไกเดียวที่ LINE อนุญาตให้เว็บไซต์ "ส่งข้อความแทนผู้ใช้" ได้จริง เพราะเป็นแอป
   LINE เองที่เปิด target picker ให้ลูกค้าเลือกปลายทาง (เช่นแชทกับ OA ของเรา) แล้ว**ลูกค้าเป็นคนกดส่งเอง**
   ข้อความจึงปรากฏเป็นข้อความที่ลูกค้าส่งจริงในแชทของตัวเอง — ดู https://developers.line.biz/en/docs/liff/

   ข้อจำกัดที่มากับกลไกนี้ (ยอมรับเป็น trade-off ตามที่ผู้ใช้เลือก):
   - ใช้ได้เฉพาะอุปกรณ์มือถือเท่านั้น (LIFF shareTargetPicker ไม่รองรับ desktop browser) — ฝั่ง desktop
     จะโชว์ modal ขอโทษแทนตามที่ผู้ใช้ระบุ ไม่มีทางสั่งซื้อผ่าน LINE จาก desktop ได้อีกต่อไป
   - ไม่มีทางรู้ฝั่งเราเลยว่าลูกค้าเลือกส่งไปที่ไหนจริง (ปลายทางเป็น target picker ของ LINE เอง ไม่ได้บังคับ
     ว่าต้องเป็นแชทกับ @cpbf) หรือลูกค้าเป็นเพื่อนกับ OA จริงหรือยัง (ไม่มีการ verify ฝั่ง server อีกต่อไป)
   - ไม่มีการเก็บ LINE profile/userId ของลูกค้าไว้ฝั่งเราเลย (ไม่จำเป็นต้องรู้ เพราะไม่ได้ push เองแล้ว)

   ต้องโหลดหลัง LIFF SDK (<script src="https://static.line-scdn.net/liff/edge/2/sdk.js">) และก่อน
   products-render.js/cart.js/inline script ใดๆ ที่เรียก window.openLineOrder */
(function () {
  var LIFF_ID = '2010917401-2AUsfj2L';

  var CHECK_ICON = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M8 12.3l2.6 2.6L16 9.3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var WARNING_ICON = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 3.5 21.5 20h-19L12 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4M12 16.5h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  var liffInitPromise = null;
  function ensureLiffReady() {
    if (!window.liff) {
      return Promise.reject(new Error('โหลด LINE LIFF SDK ไม่สำเร็จ'));
    }
    if (!liffInitPromise) {
      liffInitPromise = liff.init({ liffId: LIFF_ID });
    }
    return liffInitPromise;
  }

  /* แสดงผลลัพธ์ (สำเร็จ/ยกเลิก/ขอโทษ desktop/error) ใน #lineOrderModal ของหน้าปัจจุบัน — modal นี้เป็นแค่
     กล่องข้อความล้วนๆ ไม่มีปุ่มยืนยัน/สรุปรายการอีกต่อไป (ไม่จำเป็น เพราะ LIFF's shareTargetPicker เองคือ
     ขั้นตอนที่ลูกค้ายืนยัน+ส่งด้วยตัวเองอยู่แล้ว) ปิดด้วยปุ่ม X/backdrop/Escape ตามปกติ */
  function showResultModal(title, desc, isWarning) {
    var modal = document.getElementById('lineOrderModal');
    if (!modal) {
      window.alert(title + '\n' + desc);
      return;
    }
    var icon = document.getElementById('lineOrderModalIcon');
    var titleEl = document.getElementById('lineOrderModalTitle');
    var descEl = document.getElementById('lineOrderModalDesc');

    icon.innerHTML = isWarning ? WARNING_ICON : CHECK_ICON;
    icon.className = 'line-order-modal__icon' + (isWarning ? ' line-order-modal__icon--warning' : '');
    titleEl.textContent = title;
    descEl.textContent = desc;
    modal.hidden = false;
  }

  /* เรียกจากปุ่ม "สั่งซื้อผ่าน LINE" ทุกจุดในเว็บ (cart.html/index.html/online_shop.html/
     product-detail.html/products-render.js) — desktop โชว์ modal ขอให้ใช้มือถือแทนเสมอ (ตามที่ผู้ใช้ขอ)
     มือถือเปิด LIFF's shareTargetPicker ให้ลูกค้าเลือกปลายทางแล้วกดส่งข้อความคำสั่งซื้อด้วยตัวเอง คืนค่าเป็น
     Promise ของ {success} ให้ผู้เรียกใช้ตัดสินใจต่อได้ (เช่น cart.html ใช้ตัดสินใจว่าจะเคลียร์ตะกร้าไหม) */
  async function openLineOrder(message, items, options) {
    options = options || {};

    if (!isMobileDevice()) {
      showResultModal('กรุณาดำเนินการผ่านโทรศัพท์มือถือ', 'ขออภัยในความไม่สะดวก');
      return { success: false, desktopBlocked: true };
    }

    try {
      await ensureLiffReady();

      if (!liff.isApiAvailable('shareTargetPicker')) {
        throw new Error('อุปกรณ์/เบราว์เซอร์นี้ไม่รองรับการส่งข้อความผ่าน LINE โดยตรง');
      }

      var result = await liff.shareTargetPicker([{ type: 'text', text: message }]);
      var sent = !!(result && result.status === 'success');

      if (!sent) {
        showResultModal(
          'ยังไม่ได้ส่งคำสั่งซื้อ',
          'คุณยังไม่ได้เลือกส่งข้อความคำสั่งซื้อเข้า LINE — กดปุ่ม "สั่งซื้อผ่าน LINE" อีกครั้งเพื่อลองใหม่',
          true
        );
        return { success: false };
      }

      if (options.clearCartOnSuccess && window.cpbfCart) {
        window.cpbfCart.clearCart();
      }

      showResultModal('ส่งคำสั่งซื้อสำเร็จ', 'ทีมงานของเราได้รับคำสั่งซื้อของคุณแล้ว และจะรีบติดต่อกลับโดยเร็วที่สุด');
      return { success: true };
    } catch (err) {
      console.error('ส่งคำสั่งซื้อผ่าน LINE ไม่สำเร็จ:', err);
      showResultModal(
        'เกิดข้อผิดพลาด',
        'ไม่สามารถเปิดหน้าต่างส่งข้อความ LINE ได้ กรุณาลองใหม่อีกครั้ง หรือแชทกับเราโดยตรงที่ @cpbf',
        true
      );
      return { success: false, error: String(err) };
    }
  }

  /* ผูกปุ่มปิด/backdrop/Escape ของ #lineOrderModal อัตโนมัติถ้าหน้านั้นมี modal นี้อยู่ */
  document.addEventListener('DOMContentLoaded', function () {
    var modal = document.getElementById('lineOrderModal');
    if (!modal) return;

    modal.querySelectorAll('[data-close]').forEach(function (el) {
      el.addEventListener('click', function () { modal.hidden = true; });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) modal.hidden = true;
    });
  });

  window.cpbfLineOrder = {
    openLineOrder: openLineOrder,
  };
  window.openLineOrder = openLineOrder; // alias เดิมที่โค้ดอื่น (products-render.js ฯลฯ) เรียกตรงๆ
})();
