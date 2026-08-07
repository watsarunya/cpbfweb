/* line-login.js — สั่งซื้อผ่าน LINE โดยใช้ LINE LIFF (shareTargetPicker) เท่านั้น
   (⚠️ 2026-08-07: เปลี่ยนสถาปัตยกรรมทั้งหมดตามที่ผู้ใช้ขอ — เอา LINE Login (OAuth) + การ push ออเดอร์ผ่าน
   Supabase Edge Function (send-line-order/line-login-exchange) ออกทั้งหมด ไม่ใช้แล้ว เพราะข้อความที่ระบบ
   push เองได้จะแสดงเป็น "ส่งโดย OA" เสมอ ไม่มีทางแสดงเป็นข้อความที่ลูกค้าส่งเองได้จริงตามกฎ LINE — LIFF's
   shareTargetPicker() เป็นกลไกเดียวที่ LINE อนุญาตให้เว็บไซต์ "ส่งข้อความแทนผู้ใช้" ได้จริง เพราะเป็นแอป
   LINE เองที่เปิด target picker ให้ลูกค้าเลือกปลายทาง (เช่นแชทกับ OA ของเรา) แล้ว**ลูกค้าเป็นคนกดส่งเอง**
   ข้อความจึงปรากฏเป็นข้อความที่ลูกค้าส่งจริงในแชทของตัวเอง — ดู https://developers.line.biz/en/docs/liff/

   ⚠️ 2026-08-07 (แก้เพิ่ม): shareTargetPicker() ใช้ได้จริงเฉพาะตอนหน้าเว็บถูกเปิดอยู่ใน LINE's in-app
   browser เท่านั้น (liff.isInClient() === true) — ทดสอบจริงบน iPhone แล้วยืนยันว่า เปิดผ่าน Safari ตรงๆ
   (ไม่ผ่าน LINE app) liff.isApiAvailable('shareTargetPicker') คืน false เสมอ แม้จะเปิด "shareTargetPicker"
   toggle ไว้ใน LINE Developers Console แล้วก็ตาม (ไม่ใช่ปัญหาการตั้งค่า เป็นข้อจำกัดของ environment จริง) —
   แก้โดย: ถ้าเปิดจากนอกแอป LINE (isInClient()===false) จะ redirect ไปที่ LIFF URL
   (https://liff.line.me/<LIFF_ID>) พร้อมข้อความคำสั่งซื้อแนบไปใน query param แทน ซึ่งจะเปิดแอป LINE ขึ้นมา
   โหลดหน้านี้ซ้ำใน context ที่ถูกต้อง (Endpoint URL ของ LIFF app ตั้งเป็นหน้าแรกของเว็บ) แล้ว auto-resume
   เรียก shareTargetPicker ต่อทันทีตอนโหลดเสร็จ (ดู DOMContentLoaded listener ท้ายไฟล์)
   ⚠️ trade-off ที่ยอมรับ: รอบ redirect นี้เปลี่ยนหน้า/บริบทเบราว์เซอร์ไปเป็นของ LINE's in-app browser ซึ่งไม่
   แชร์ localStorage กับ Safari/Chrome เดิม (คนละ storage sandbox) ทำให้ไม่สามารถเคลียร์ตะกร้าสินค้าที่อยู่ใน
   หน้าเดิมได้จากฝั่งนี้ — เคลียร์ตะกร้าได้เฉพาะกรณีที่ shareTargetPicker ทำงานสำเร็จโดยไม่ต้อง redirect เลย
   (คือกรณีที่เปิดเว็บผ่าน LINE in-app browser ตั้งแต่แรกอยู่แล้ว)

   ข้อจำกัดอื่นที่มากับกลไกนี้ (ยอมรับเป็น trade-off ตามที่ผู้ใช้เลือก):
   - ใช้ได้เฉพาะอุปกรณ์มือถือเท่านั้น (LIFF shareTargetPicker ไม่รองรับ desktop browser) — ฝั่ง desktop
     จะโชว์ modal ขอโทษแทนตามที่ผู้ใช้ระบุ ไม่มีทางสั่งซื้อผ่าน LINE จาก desktop ได้อีกต่อไป
   - ไม่มีทางรู้ฝั่งเราเลยว่าลูกค้าเลือกส่งไปที่ไหนจริง (ปลายทางเป็น target picker ของ LINE เอง ไม่ได้บังคับ
     ว่าต้องเป็นแชทกับ @cpbf) หรือลูกค้าเป็นเพื่อนกับ OA จริงหรือยัง (ไม่มีการ verify ฝั่ง server อีกต่อไป)
   - ไม่มีการเก็บ LINE profile/userId ของลูกค้าไว้ฝั่งเราเลย (ไม่จำเป็นต้องรู้ เพราะไม่ได้ push เองแล้ว)

   ต้องโหลดหลัง LIFF SDK (<script src="https://static.line-scdn.net/liff/edge/2/sdk.js">) และก่อน
   products-render.js/cart.js/inline script ใดๆ ที่เรียก window.openLineOrder */
(function () {
  var LIFF_ID = '2010917401-2AUsfj2L';
  var LIFF_URL = 'https://liff.line.me/' + LIFF_ID;
  var SHARE_PARAM = 'lineShareMsg';

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

  /* เรียกได้ก็ต่อเมื่อ liff.isInClient() === true เท่านั้น (เปิดอยู่ใน LINE's in-app browser จริง) —
     shareTargetPicker ใช้ไม่ได้เลยนอกบริบทนี้ (ดูหมายเหตุด้านบนไฟล์) */
  async function runShareTargetPicker(message, clearCartOnSuccess) {
    if (!liff.isApiAvailable('shareTargetPicker')) {
      showResultModal(
        'เกิดข้อผิดพลาด',
        'อุปกรณ์นี้ไม่รองรับการส่งข้อความผ่าน LINE โดยตรง กรุณาแชทกับเราโดยตรงที่ @cpbf แทน',
        true
      );
      return { success: false, error: 'shareTargetPicker not available' };
    }

    try {
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

      if (clearCartOnSuccess && window.cpbfCart) {
        window.cpbfCart.clearCart();
      }

      showResultModal('ส่งคำสั่งซื้อสำเร็จ', 'ทีมงานของเราได้รับคำสั่งซื้อของคุณแล้ว และจะรีบติดต่อกลับโดยเร็วที่สุด');
      return { success: true };
    } catch (err) {
      console.error('ส่งคำสั่งซื้อผ่าน LINE ไม่สำเร็จ:', err);
      showResultModal(
        'เกิดข้อผิดพลาด',
        'ไม่สามารถเปิดหน้าต่างส่งข้อความ LINE ได้: ' + (err && err.message ? err.message : String(err)) + ' — กรุณาลองใหม่อีกครั้ง หรือแชทกับเราโดยตรงที่ @cpbf',
        true
      );
      return { success: false, error: String(err) };
    }
  }

  /* เรียกจากปุ่ม "สั่งซื้อผ่าน LINE" ทุกจุดในเว็บ (cart.html/index.html/online_shop.html/
     product-detail.html/products-render.js) — desktop โชว์ modal ขอให้ใช้มือถือแทนเสมอ (ตามที่ผู้ใช้ขอ)
     มือถือที่เปิดผ่าน LINE in-app browser อยู่แล้วจะเรียก shareTargetPicker ได้ทันที — มือถือที่เปิดผ่าน
     Safari/Chrome ปกติ (ไม่ผ่าน LINE app) จะ redirect ไปเปิด LINE app ก่อน (ดูหมายเหตุด้านบนไฟล์) คืนค่า
     เป็น Promise ของ {success} ให้ผู้เรียกใช้ตัดสินใจต่อได้ (เช่น cart.html ใช้ตัดสินใจว่าจะเคลียร์ตะกร้าไหม) */
  async function openLineOrder(message, items, options) {
    options = options || {};

    if (!isMobileDevice()) {
      showResultModal('กรุณาดำเนินการผ่านโทรศัพท์มือถือ', 'ขออภัยในความไม่สะดวก');
      return { success: false, desktopBlocked: true };
    }

    try {
      await ensureLiffReady();
    } catch (err) {
      console.error('liff.init() ล้มเหลว:', err);
      showResultModal('เกิดข้อผิดพลาด', 'เชื่อมต่อ LINE ไม่สำเร็จ: ' + (err && err.message ? err.message : String(err)), true);
      return { success: false, error: String(err) };
    }

    if (liff.isInClient()) {
      return runShareTargetPicker(message, options.clearCartOnSuccess);
    }

    // เปิดผ่าน Safari/Chrome ปกติ ไม่ใช่ LINE in-app browser — shareTargetPicker ใช้ตรงๆ ไม่ได้ ต้อง
    // redirect ไปที่ LIFF URL ให้ LINE app เปิดหน้านี้ซ้ำในบริบทที่ถูกต้องก่อน (แนบข้อความไปใน query param
    // เพราะ localStorage/sessionStorage ไม่ถูกแชร์ข้าม browser context นี้)
    var target = LIFF_URL + '?' + SHARE_PARAM + '=' + encodeURIComponent(message);
    window.location.href = target;
    return { success: false, redirected: true };
  }

  /* auto-resume: ถ้าเพิ่งถูก redirect กลับมาจาก openLineOrder() ให้เรียก shareTargetPicker ต่อทันทีอัตโนมัติ
     — ⚠️ ห้ามอ่าน ?lineShareMsg= จาก location.search ตรงๆ ก่อนเรียก liff.init() เด็ดขาด เพราะ LIFF ห่อ query
     string เดิมไว้ใน ?liff.state=<encoded> ระหว่าง redirect ผ่าน liff.line.me เสมอ (ยืนยันจาก browser test
     จริง) ต้องรอ liff.init() แกะ liff.state กลับมาเป็น ?lineShareMsg=... ปกติก่อน (เป็นพฤติกรรมอัตโนมัติของ
     LIFF SDK เอง) ถึงจะอ่านเจอ — เช็คแบบหยาบๆ ก่อนว่า URL น่าจะมีอะไรให้ resume ไหม (กัน liff.init() รันฟรี
     ทุกหน้าที่ไม่เกี่ยวข้องเลย) แล้วค่อยเรียก liff.init() จริงถ้าเข้าเงื่อนไข
     ⚠️ ไม่เคลียร์ตะกร้าในเส้นทางนี้ เพราะเป็นคนละ browser context กับหน้าตะกร้าเดิม (ดูหมายเหตุด้านบนไฟล์) */
  document.addEventListener('DOMContentLoaded', async function () {
    var looksResumable = window.location.search.indexOf(SHARE_PARAM + '=') !== -1
      || window.location.search.indexOf('liff.state=') !== -1;
    if (!looksResumable) return;

    try {
      await ensureLiffReady();
    } catch (err) {
      console.error('liff.init() ล้มเหลว (auto-resume):', err);
      return;
    }

    var msg = new URLSearchParams(window.location.search).get(SHARE_PARAM);
    // ลบ query param ออกจาก URL ทันทีกันกด refresh แล้วเรียกซ้ำโดยไม่ตั้งใจ
    window.history.replaceState({}, '', window.location.pathname + window.location.hash);
    if (!msg) return;

    if (!liff.isInClient()) return; // ไม่ได้เปิดผ่าน LINE app จริงๆ (เช่น เปิดลิงก์ตรงๆ) — ไม่ทำอะไรเงียบๆ

    await runShareTargetPicker(msg, false);
  });

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
