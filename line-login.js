/* line-login.js — สั่งซื้อผ่าน LINE โดยใช้ LINE LIFF เพื่อยืนยันตัวตน+สถานะเพื่อน แล้วพาลูกค้าไปยังหน้าแชท
   LINE OA @cpbf โดยตรงพร้อมข้อความคำสั่งซื้อ (ลูกค้ากดส่งเอง) — ไม่มีการ push ข้อความจากฝั่งเราเองเลย

   (⚠️ 2026-08-07: เปลี่ยนสถาปัตยกรรมทั้งหมดตามที่ผู้ใช้ขอ — เอา LINE Login (OAuth) + การ push ออเดอร์ผ่าน
   Supabase Edge Function (send-line-order/line-login-exchange) ออกทั้งหมด ไม่ใช้แล้ว เพราะข้อความที่ระบบ
   push เองได้จะแสดงเป็น "ส่งโดย OA" เสมอ ไม่มีทางแสดงเป็นข้อความที่ลูกค้าส่งเองได้จริงตามกฎ LINE)

   ⚠️ 2026-08-07 (แก้เพิ่มรอบ 2): เดิมลองใช้ liff.shareTargetPicker() ก่อน — ทดสอบจริงพบว่าใช้ได้เฉพาะตอนหน้า
   เว็บเปิดอยู่ใน LINE's in-app browser เท่านั้น (isInClient()===true) เปิดผ่าน Safari ตรงๆ
   isApiAvailable('shareTargetPicker') คืน false เสมอ แก้ด้วยการ redirect ผ่าน LIFF URL
   (https://liff.line.me/<LIFF_ID>) ให้ LINE app เปิดหน้านี้ซ้ำในบริบทที่ถูกต้องก่อนเสมอ (กลไกนี้ยังใช้อยู่
   ไม่เปลี่ยน) — **แต่หลัง isInClient() เปลี่ยนจาก shareTargetPicker เป็นวิธีนี้แทนตามที่ผู้ใช้ขอ**:
   1. เช็คสถานะเพื่อนด้วย liff.getFriendship() — ถ้ายังไม่เพิ่มเพื่อน บังคับให้เพิ่มก่อน (โชว์ modal พร้อม
      ปุ่มเพิ่มเพื่อน ไม่ไปต่อจนกว่าจะเพิ่มแล้วกดสั่งซื้อใหม่อีกครั้ง)
   2. ถ้าเป็นเพื่อนอยู่แล้ว → เปิด https://line.me/R/oaMessage/@cpbf/?<ข้อความ> ตรงๆ (deep link พาไปหน้า
      แชทกับ @cpbf โดยตรง ไม่ใช่หน้าเลือกปลายทางแบบ shareTargetPicker) ข้อความจะถูกกรอกไว้ล่วงหน้าในกล่อง
      พิมพ์ ลูกค้ากดส่งเองในแชทนั้นเลย — ทำงานได้เพราะตอนนี้เราอยู่ใน LINE's in-app browser แล้วจริงๆ

   ข้อจำกัดที่มากับกลไกนี้ (ยอมรับเป็น trade-off ตามที่ผู้ใช้เลือก):
   - ใช้ได้เฉพาะอุปกรณ์มือถือเท่านั้น (LIFF ไม่รองรับ desktop browser) — ฝั่ง desktop โชว์ modal ขอโทษแทน
   - ไม่มีทางรู้ฝั่งเราเลยว่าลูกค้ากดส่งข้อความจริงในแชทหรือไม่ (แค่พาไปหน้าแชทพร้อมข้อความพร้อมส่งเท่านั้น
     การกดส่งจริงเป็นการกระทำสุดท้ายที่ลูกค้าทำเองใน UI ของ LINE เอง ไม่มี callback กลับมาบอกเราได้)
   - ไม่มีการเก็บ LINE profile/userId ของลูกค้าไว้ฝั่งเราเลย

   ต้องโหลดหลัง LIFF SDK (<script src="https://static.line-scdn.net/liff/edge/2/sdk.js">) และก่อน
   products-render.js/cart.js/inline script ใดๆ ที่เรียก window.openLineOrder */
(function () {
  var LIFF_ID = '2010917401-2AUsfj2L';
  var LIFF_URL = 'https://liff.line.me/' + LIFF_ID;
  var SHARE_PARAM = 'lineShareMsg';
  var OA_CHAT_URL = 'https://line.me/R/oaMessage/@cpbf/?';
  var ADD_FRIEND_URL = 'https://line.me/R/ti/p/@cpbf';

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

  /* แสดงผลลัพธ์ใน #lineOrderModal ของหน้าปัจจุบัน — actionHref/actionLabel ใส่ได้เพื่อโชว์ปุ่มลิงก์เพิ่มเติม
     (เช่นปุ่ม "เพิ่มเพื่อน") ไม่ใส่ก็แค่ข้อความล้วนๆ ปิดด้วยปุ่ม X/backdrop/Escape ตามปกติ */
  function showResultModal(title, desc, isWarning, actionHref, actionLabel) {
    var modal = document.getElementById('lineOrderModal');
    if (!modal) {
      window.alert(title + '\n' + desc);
      return;
    }
    var icon = document.getElementById('lineOrderModalIcon');
    var titleEl = document.getElementById('lineOrderModalTitle');
    var descEl = document.getElementById('lineOrderModalDesc');
    var actionEl = document.getElementById('lineOrderModalAction');

    icon.innerHTML = isWarning ? WARNING_ICON : CHECK_ICON;
    icon.className = 'line-order-modal__icon' + (isWarning ? ' line-order-modal__icon--warning' : '');
    titleEl.textContent = title;
    descEl.textContent = desc;

    if (actionEl) {
      if (actionHref) {
        actionEl.href = actionHref;
        actionEl.textContent = actionLabel || '';
        actionEl.hidden = false;
      } else {
        actionEl.hidden = true;
      }
    }

    modal.hidden = false;
  }

  /* เรียกได้ก็ต่อเมื่อ liff.isInClient() === true เท่านั้น (เปิดอยู่ใน LINE's in-app browser จริง) — เช็ค
     สถานะเพื่อนก่อนเสมอ ถ้ายังไม่เพิ่มเพื่อนจะบล็อกไม่พาไปหน้าแชท (บังคับให้เพิ่มเพื่อนก่อน) ถ้าเป็นเพื่อน
     แล้วเปิดหน้าแชทกับ @cpbf ตรงๆ พร้อมข้อความคำสั่งซื้อกรอกไว้ล่วงหน้าให้ลูกค้ากดส่งเอง */
  async function goToOaChat(message, clearCartOnSuccess) {
    var friendship;
    try {
      friendship = await liff.getFriendship();
    } catch (err) {
      console.error('เช็คสถานะเพื่อนไม่สำเร็จ:', err);
      // เช็คไม่ได้ (เช่น scope ไม่พอ/ปัญหาชั่วคราว) — ปล่อยผ่านไปเปิดแชทเลยดีกว่าบล็อกลูกค้าไปเฉยๆ
      friendship = { friendFlag: true };
    }

    if (!friendship.friendFlag) {
      showResultModal(
        'กรุณาเพิ่มเราเป็นเพื่อนก่อน',
        'ต้องเพิ่ม LINE OA ของเราเป็นเพื่อนก่อนถึงจะสั่งซื้อผ่าน LINE ได้ กดปุ่มด้านล่างเพื่อเพิ่มเพื่อน แล้วกลับมากดสั่งซื้ออีกครั้ง',
        true,
        ADD_FRIEND_URL,
        'เพิ่มเราเป็นเพื่อนใน LINE'
      );
      return { success: false, needsFriend: true };
    }

    if (clearCartOnSuccess && window.cpbfCart) {
      window.cpbfCart.clearCart();
    }

    window.location.href = OA_CHAT_URL + encodeURIComponent(message);
    return { success: true };
  }

  /* เรียกจากปุ่ม "สั่งซื้อผ่าน LINE" ทุกจุดในเว็บ (cart.html/index.html/online_shop.html/
     product-detail.html/products-render.js) — desktop โชว์ modal ขอให้ใช้มือถือแทนเสมอ (ตามที่ผู้ใช้ขอ)
     มือถือที่เปิดผ่าน LINE in-app browser อยู่แล้วจะเช็คเพื่อน+พาไปหน้าแชทได้ทันที — มือถือที่เปิดผ่าน
     Safari/Chrome ปกติ (ไม่ผ่าน LINE app) จะ redirect ไปเปิด LINE app ก่อน คืนค่าเป็น Promise ของ {success}
     ให้ผู้เรียกใช้ตัดสินใจต่อได้ (เช่น cart.html ใช้ตัดสินใจว่าจะเคลียร์ตะกร้าไหม) */
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
      return goToOaChat(message, options.clearCartOnSuccess);
    }

    // เปิดผ่าน Safari/Chrome ปกติ ไม่ใช่ LINE in-app browser — ต้อง redirect ไปที่ LIFF URL ให้ LINE app
    // เปิดหน้านี้ซ้ำในบริบทที่ถูกต้องก่อน (แนบข้อความไปใน query param เพราะ localStorage/sessionStorage
    // ไม่ถูกแชร์ข้าม browser context นี้)
    var target = LIFF_URL + '?' + SHARE_PARAM + '=' + encodeURIComponent(message);
    window.location.href = target;
    return { success: false, redirected: true };
  }

  /* auto-resume: ถ้าเพิ่งถูก redirect กลับมาจาก openLineOrder() ให้เช็คเพื่อน+พาไปหน้าแชทต่อทันทีอัตโนมัติ
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

    await goToOaChat(msg, false);
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
