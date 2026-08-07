/* line-login.js — LINE Login (OAuth) กลาง สำหรับผูก LINE userId จริงของลูกค้าเข้ากับการสั่งซื้อผ่าน LINE
   เพื่อให้ข้อความที่ push เข้าไปเป็น "แชทเดียวกัน" ที่ทั้งลูกค้า (ในแอป LINE ของตัวเอง) และแอดมิน (ใน LINE
   Official Account Manager) เห็นตรงกัน — แทนที่ notifyAdminAuto เดิมที่ push แจ้งไปหาแอดมินคนเดียวเท่านั้น

   ใช้แทนโค้ด isMobileDevice/notifyAdminAuto/openLineOrder ที่เคย copy-paste แยกกัน 4 ที่ (cart.html/
   index.html/online_shop.html/product-detail.html) ให้เหลือจุดเดียว — ต้องโหลดก่อน products-render.js/
   cart.js และก่อน inline script ใดๆ ในแต่ละหน้าที่เรียก window.openLineOrder

   ⚠️ กฎสำคัญ: localStorage['cpbf-line-profile'] (getLineProfile()) มีค่า **ก็ต่อเมื่อยืนยันแล้วว่าลูกค้า
   เพิ่มเพื่อน OA จริง** เท่านั้น (ยืนยันได้จากการ push เข้าแชทลูกค้าสำเร็จจริง — ข้อจำกัดของ Messaging API
   push คือส่งได้เฉพาะคนที่เป็นเพื่อนแล้วเท่านั้น) — ไม่ใช่แค่ "login LINE สำเร็จ" — เพราะแบบนี้ presence ของ
   profile ในเบราว์เซอร์ถึงจะแปลว่า "สั่งซื้อได้ทันทีไม่ต้องถามซ้ำ" ได้จริงตามที่ต้องการ:
   - ถ้ายังไม่มี profile (ไม่ว่าเพราะไม่เคย login เลย หรือ login แล้วแต่ยังไม่ได้เพิ่มเพื่อน) → กด "สั่งซื้อ
     ผ่าน LINE" จะ redirect ไป LINE Login **ใหม่ทุกครั้ง** (ขอสิทธิ์ → เพิ่มเพื่อน) จนกว่าจะเพิ่มเพื่อนสำเร็จจริง
   - พอเพิ่มเพื่อนสำเร็จครั้งแรก (push ผ่าน) ถึงจะ save profile ไว้ — ครั้งต่อๆ ไปในเบราว์เซอร์เดิมข้าม
     login/เพิ่มเพื่อนไปสั่งซื้อได้ทันที
   - เปลี่ยนเบราว์เซอร์/ล้างแคช = ไม่มี profile อีก → ต้อง login ใหม่เสมอ แต่ถ้าเคยเพิ่มเพื่อนไว้จริงบนฝั่ง
     LINE แล้ว การ push จะสำเร็จทันทีไม่ต้องเพิ่มเพื่อนซ้ำ (เพราะ friend status เป็นของจริงฝั่ง LINE ไม่ใช่
     แค่ cache ฝั่งเรา) — ถ้าไม่เคยเพิ่มจริงก็ต้องเพิ่มใหม่
   - ถ้าไม่ยืนยัน (ไม่เพิ่มเพื่อน) จะไม่ส่งออเดอร์ให้แอดมินเลย และไม่เคลียร์ตะกร้า (เหมือนไม่เคยกดสั่งซื้อ) */
(function () {
  var LINE_LOGIN_CHANNEL_ID = '2010917401';
  // ใช้โดเมนปัจจุบันเสมอ (ไม่ hardcode cpbf.co.th) เพื่อให้ทำงานได้ทั้งบนโดเมนจริงและโดเมนสำรอง
  // (เช่น https://cpbf.vercel.app ระหว่างที่ยังตั้งค่า DNS ของ cpbf.co.th ไม่เสร็จ) — ⚠️ ทุกโดเมนที่ใช้จริง
  // ต้องถูกเพิ่มเป็น Callback URL ใน LINE Developers Console > LINE Login channel ด้วย ไม่งั้น LINE จะปฏิเสธ
  // redirect_uri ที่ไม่ตรงกับที่ลงทะเบียนไว้ทันที
  var LINE_CALLBACK_URL = window.location.origin + '/line-callback.html';
  var LINE_LOGIN_EXCHANGE_ENDPOINT = 'https://gafvtbkmizxorqpmezna.supabase.co/functions/v1/line-login-exchange';
  var SEND_LINE_ORDER_ENDPOINT = 'https://gafvtbkmizxorqpmezna.supabase.co/functions/v1/send-line-order';

  var PROFILE_KEY = 'cpbf-line-profile';
  var PENDING_ORDER_KEY = 'cpbf-pending-line-order';
  var OAUTH_STATE_KEY = 'cpbf-line-oauth-state';

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  function getLineProfile() {
    try {
      var raw = localStorage.getItem(PROFILE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveLineProfile(profile) {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      // localStorage ปิดใช้งาน/เต็ม — ข้ามไป จะถาม login ใหม่ในรอบถัดไปแทน ไม่ทำให้หน้าเว็บพัง
    }
  }

  function clearLineProfile() {
    try {
      localStorage.removeItem(PROFILE_KEY);
    } catch (e) { /* noop */ }
  }

  function randomState() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function startLineLogin(pendingOrder) {
    var state = randomState();
    try {
      sessionStorage.setItem(OAUTH_STATE_KEY, state);
      sessionStorage.setItem(PENDING_ORDER_KEY, JSON.stringify({
        message: pendingOrder.message,
        items: pendingOrder.items,
        clearCartOnSuccess: !!pendingOrder.clearCartOnSuccess,
        returnUrl: window.location.href,
      }));
    } catch (e) {
      // sessionStorage ใช้ไม่ได้ — ยัง login ต่อได้ แค่กลับมาแล้วจะไม่ resume คำสั่งซื้อให้อัตโนมัติ
    }

    var params = new URLSearchParams({
      response_type: 'code',
      client_id: LINE_LOGIN_CHANNEL_ID,
      redirect_uri: LINE_CALLBACK_URL,
      state: state,
      scope: 'profile openid',
      bot_prompt: 'normal',
    });
    window.location.href = 'https://access.line.me/oauth2/v2.1/authorize?' + params.toString();
  }

  /* ส่งออเดอร์ไป Edge Function แล้วคืนผลลัพธ์จริง ({ok, customerOk}) หรือ null ถ้าเชื่อมต่อไม่สำเร็จ
     customerOk === true คือหลักฐานเดียวที่ยืนยันได้ว่าลูกค้าเป็นเพื่อนกับ OA แล้วจริง — แอดมินดูออเดอร์ได้
     จาก LINE Official Account Manager โดยตรง (แชทเดียวกับที่ push ไปนี้เอง ไม่มีกลไกแจ้งเตือนแยกอีกจุด) */
  function sendOrder(items, profile) {
    if (!items || !items.length) return Promise.resolve(null);
    var body = { items: items, lineUserId: profile.userId };
    return fetch(SEND_LINE_ORDER_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(function (res) {
      return res.json().catch(function () { return null; });
    }).catch(function (err) {
      console.error('ส่งออเดอร์ไม่สำเร็จ:', err);
      return null;
    });
  }

  /* ดำเนินการสั่งซื้อจริง — ส่งออเดอร์ก่อนเสมอ แล้วเช็คว่าลูกค้าเป็นเพื่อนกับ OA จริงไหมจากผลลัพธ์ (customerOk)
     ถ้าไม่เป็นเพื่อน: ไม่แจ้งแอดมิน (ฝั่ง Edge Function จัดการเองแล้ว), ไม่เปิด LINE, ไม่เคลียร์ตะกร้า, ล้าง
     profile ที่ cache ไว้ (เผื่อเคยยืนยันไว้ก่อนแล้วแต่ unfriend ภายหลัง) เพื่อบังคับให้รอบหน้า login ใหม่
     ถ้าเป็นเพื่อนจริง: save profile ไว้ใช้ข้าม login ครั้งต่อไป แล้วเปิด LINE ตามปกติ (มือถือเปิด deep link
     ตรงๆ, desktop โชว์ modal ถ้าหน้านั้นมี #lineOrderModal ถ้าไม่มี fallback เป็น window.open)
     คืนค่า {success, lineUrl, autoOpened} ให้ผู้เรียกใช้ตัดสินใจต่อ (เช่น จะเคลียร์ตะกร้าไหม) */
  async function completeLineOrder(message, items, profile) {
    var result = await sendOrder(items, profile);
    var customerOk = !!(result && result.customerOk === true);

    if (!customerOk) {
      clearLineProfile();
      return { success: false };
    }

    saveLineProfile(profile);

    var lineUrl = 'https://line.me/R/oaMessage/@cpbf/?' + encodeURIComponent(message);
    var mobile = isMobileDevice();

    if (mobile) {
      window.open(lineUrl, '_blank', 'noopener');
      return { success: true, lineUrl: lineUrl, autoOpened: true };
    }

    var modal = document.getElementById('lineOrderModal');
    if (!modal) {
      window.open(lineUrl, '_blank', 'noopener');
      return { success: true, lineUrl: lineUrl, autoOpened: true };
    }

    var directLink = document.getElementById('lineOrderModalDirectLink');
    if (directLink) directLink.href = lineUrl;
    modal.hidden = false;
    return { success: true, lineUrl: lineUrl, autoOpened: false };
  }

  /* เรียกจากปุ่ม "สั่งซื้อผ่าน LINE" ทุกจุดในเว็บ (cart.html/index.html/online_shop.html/
     product-detail.html/products-render.js) — ถ้ายังไม่มี profile ที่ยืนยันแล้ว (ดูหมายเหตุด้านบนไฟล์) จะ
     redirect ไป LINE Login ก่อนเสมอ แล้วค่อย resume คำสั่งซื้อนี้ที่ line-callback.html — คืนค่าเป็น Promise
     ของ {success, redirected, lineUrl, autoOpened} ให้ผู้เรียกใช้ตัดสินใจต่อได้ (เช่น cart.html ใช้ตัดสินใจ
     ว่าจะเคลียร์ตะกร้าไหม — ดู options.clearCartOnSuccess) */
  async function openLineOrder(message, items, options) {
    options = options || {};
    var profile = getLineProfile();
    if (!profile) {
      startLineLogin({ message: message, items: items, clearCartOnSuccess: options.clearCartOnSuccess });
      return { success: false, redirected: true };
    }
    return completeLineOrder(message, items, profile);
  }

  /* อ่านคำสั่งซื้อที่ค้างไว้ก่อน redirect ไป LINE Login (ถ้ามี) — แค่ "ดู" ไม่ส่งออเดอร์จริง ต้องรอผู้ใช้
     กด "ยืนยันการสั่งซื้อ" ที่ line-callback.html ก่อนเสมอ (เรียก confirmPendingOrder ต่อ) ตามที่ผู้ใช้ขอ:
     login เสร็จแล้วไม่ควร push ออเดอร์เข้า LINE OA ทันทีอัตโนมัติ ต้องให้ลูกค้ากดยืนยันอีกครั้งก่อน */
  function peekPendingOrder() {
    var raw;
    try {
      raw = sessionStorage.getItem(PENDING_ORDER_KEY);
    } catch (e) {
      raw = null;
    }
    if (!raw) return null;
    try {
      var pending = JSON.parse(raw);
      return pending && pending.message ? pending : null;
    } catch (e) {
      return null;
    }
  }

  /* เรียกตอนผู้ใช้กด "ยืนยันการสั่งซื้อ" ใน line-callback.html จริงๆ เท่านั้น — ส่งออเดอร์ที่ peekPendingOrder()
     อ่านไว้ก่อนหน้านี้ แล้วเคลียร์ออกจาก sessionStorage (ไม่ว่าผลจะสำเร็จหรือไม่ กันกดยืนยันซ้ำได้ออเดอร์ซ้ำ) */
  async function confirmPendingOrder(pending, profile) {
    try {
      sessionStorage.removeItem(PENDING_ORDER_KEY);
    } catch (e) { /* noop */ }

    var result = await completeLineOrder(pending.message, pending.items, profile);

    if (result.success && pending.clearCartOnSuccess && window.cpbfCart) {
      window.cpbfCart.clearCart();
    }

    return {
      returnUrl: pending.returnUrl,
      success: result.success,
      lineUrl: result.lineUrl,
      autoOpened: result.autoOpened,
    };
  }

  /* ใช้เฉพาะใน line-callback.html — แลก code จาก LINE เป็น profile จริงผ่าน Edge Function
     (client secret ของ LINE Login channel อยู่ฝั่ง server เท่านั้น ไม่มีวันส่งมาที่นี่) — ⚠️ ไม่ push
     ออเดอร์อัตโนมัติที่นี่แล้ว (เดิมเคย resume/push ทันที) เปลี่ยนเป็นแค่คืน pendingOrder ให้
     line-callback.html แสดงสรุปออเดอร์ + ปุ่ม "ยืนยันการสั่งซื้อ" ให้ผู้ใช้กดยืนยันเองก่อนเสมอ (เรียก
     confirmPendingOrder ต่อตอนกด) — ไม่ save profile ที่นี่โดยตรงเช่นกัน (save เฉพาะตอน completeLineOrder
     ยืนยันว่า push เข้าแชทลูกค้าสำเร็จจริงเท่านั้น — ดูหมายเหตุด้านบนไฟล์) */
  async function handleLineCallback() {
    var params = new URLSearchParams(window.location.search);
    var code = params.get('code');
    var error = params.get('error');
    var returnedState = params.get('state');

    if (error) {
      return { ok: false, cancelled: true };
    }
    if (!code) {
      return { ok: false, cancelled: false, error: 'ไม่พบ code จาก LINE ในลิงก์นี้' };
    }

    var expectedState = null;
    try {
      expectedState = sessionStorage.getItem(OAUTH_STATE_KEY);
      sessionStorage.removeItem(OAUTH_STATE_KEY);
    } catch (e) {
      expectedState = null;
    }
    if (expectedState && returnedState !== expectedState) {
      return { ok: false, cancelled: false, error: 'state ไม่ตรงกัน กรุณาลองเข้าสู่ระบบใหม่อีกครั้ง' };
    }

    var res;
    try {
      res = await fetch(LINE_LOGIN_EXCHANGE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, redirect_uri: LINE_CALLBACK_URL }),
      });
    } catch (networkErr) {
      return { ok: false, cancelled: false, error: 'เชื่อมต่อเซิร์ฟเวอร์ไม่สำเร็จ: ' + networkErr.message };
    }

    var json;
    try {
      json = await res.json();
    } catch (parseErr) {
      return { ok: false, cancelled: false, error: 'เซิร์ฟเวอร์ตอบกลับไม่ถูกต้อง (' + res.status + ')' };
    }

    if (!res.ok || !json.ok) {
      return { ok: false, cancelled: false, error: json.error || 'เข้าสู่ระบบ LINE ไม่สำเร็จ' };
    }

    var profile = { userId: json.userId, displayName: json.displayName, pictureUrl: json.pictureUrl || '' };
    var pendingOrder = peekPendingOrder();

    return {
      ok: true,
      profile: profile,
      pendingOrder: pendingOrder,
    };
  }

  /* ผูกปุ่มปิด/backdrop/Escape ของ #lineOrderModal อัตโนมัติถ้าหน้านั้นมี modal นี้อยู่ (เดิม copy-paste
     เป็น DOMContentLoaded listener แยกกัน 4 ที่ — รวมมาไว้ที่นี่ที่เดียว) */
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
    getLineProfile: getLineProfile,
    handleLineCallback: handleLineCallback,
    confirmPendingOrder: confirmPendingOrder,
  };
  window.openLineOrder = openLineOrder; // alias เดิมที่โค้ดอื่น (products-render.js ฯลฯ) เรียกตรงๆ
})();
