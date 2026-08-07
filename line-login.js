/* line-login.js — LINE Login (OAuth) กลาง สำหรับผูก LINE userId จริงของลูกค้าเข้ากับการสั่งซื้อผ่าน LINE
   เพื่อให้ข้อความที่ push เข้าไปเป็นแชทเดียวกับที่ลูกค้าเห็นในแอป LINE ของตัวเอง (แอดมินดูออเดอร์ได้จาก LINE
   Official Account Manager โดยตรง เพราะเป็นแชทของลูกค้าจริง ไม่ใช่กลไกแจ้งเตือนแยกต่างหาก)

   ใช้แทนโค้ด isMobileDevice/notifyAdminAuto/openLineOrder ที่เคย copy-paste แยกกัน 4 ที่ (cart.html/
   index.html/online_shop.html/product-detail.html) ให้เหลือจุดเดียว — ต้องโหลดก่อน products-render.js/
   cart.js และก่อน inline script ใดๆ ในแต่ละหน้าที่เรียก window.openLineOrder

   ⚠️ กฎสำคัญ: localStorage['cpbf-line-profile'] (getLineProfile()) มีค่า **ก็ต่อเมื่อยืนยันแล้วว่าลูกค้า
   เพิ่มเพื่อน OA จริง** เท่านั้น (ยืนยันได้จากการ push เข้าแชทลูกค้าสำเร็จจริง — ข้อจำกัดของ Messaging API
   push คือส่งได้เฉพาะคนที่เป็นเพื่อนแล้วเท่านั้น) — ไม่ใช่แค่ "login LINE สำเร็จ" — เพราะแบบนี้ presence ของ
   profile ในเบราว์เซอร์ถึงจะแปลว่า "ข้าม LINE Login ไปเห็นหน้ายืนยันคำสั่งซื้อได้ทันที" ได้จริงตามที่ต้องการ:
   - ถ้ายังไม่มี profile (ไม่ว่าเพราะไม่เคย login เลย หรือ login แล้วแต่ยังไม่ได้เพิ่มเพื่อน) → กด "สั่งซื้อ
     ผ่าน LINE" จะ redirect ไป LINE Login **ใหม่ทุกครั้ง** (ขอสิทธิ์ → เพิ่มเพื่อน) จนกว่าจะเพิ่มเพื่อนสำเร็จจริง
   - พอเพิ่มเพื่อนสำเร็จครั้งแรก (push ผ่าน) ถึงจะ save profile ไว้ — ครั้งต่อๆ ไปในเบราว์เซอร์เดิมข้าม
     login/เพิ่มเพื่อนไปเห็นหน้ายืนยันคำสั่งซื้อได้ทันที (ยังต้องกดยืนยันเองเสมอ ดูหมายเหตุข้อ "ยืนยันก่อนส่ง" ด้านล่าง)
   - เปลี่ยนเบราว์เซอร์/ล้างแคช = ไม่มี profile อีก → ต้อง login ใหม่เสมอ แต่ถ้าเคยเพิ่มเพื่อนไว้จริงบนฝั่ง
     LINE แล้ว การ push จะสำเร็จทันทีไม่ต้องเพิ่มเพื่อนซ้ำ (เพราะ friend status เป็นของจริงฝั่ง LINE ไม่ใช่
     แค่ cache ฝั่งเรา) — ถ้าไม่เคยเพิ่มจริงก็ต้องเพิ่มใหม่
   - ถ้าไม่ยืนยัน (ไม่เพิ่มเพื่อน) จะไม่เคลียร์ตะกร้า (เหมือนไม่เคยกดสั่งซื้อ)

   ⚠️ ยืนยันก่อนส่งเสมอ (เพิ่ม 2026-08-07 ตามที่ผู้ใช้ขอ): ไม่ว่าจะกดสั่งซื้อจากหน้าไหน (product card ใดๆ /
   หน้า cart) หรือเพิ่งผ่าน LINE Login มาใหม่ๆ ก็ตาม **จะไม่ push ออเดอร์เข้า LINE OA ทันทีอัตโนมัติเด็ดขาด**
   ต้องแสดงหน้าสรุปรายการสินค้า + ปุ่ม "ยืนยันการสั่งซื้อ" ให้ผู้ใช้กดเองก่อนเสมอ — กรณี login ใหม่ (ยังไม่มี
   profile) จะไปแสดงที่ line-callback.html (มี UI ของตัวเอง), กรณีมี profile อยู่แล้ว (ข้าม LINE Login ได้)
   จะแสดงในโมดัล #lineOrderModal ที่มีอยู่ในหน้าเดิม (cart.html/index.html/online_shop.html/
   product-detail.html) ทันที ไม่ต้อง redirect ไปไหน — ทั้งสองที่ใช้กลไก push เดียวกัน (pushOrder) */
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

  var CHECK_ICON = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M8 12.3l2.6 2.6L16 9.3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var WARNING_ICON = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 3.5 21.5 20h-19L12 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 10v4M12 16.5h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

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
      // sessionStorage ใช้ไม่ได้ — ยัง login ต่อได้ แค่กลับมาแล้วจะไม่มีออเดอร์ค้างให้ยืนยันต่อ
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
     customerOk === true คือหลักฐานเดียวที่ยืนยันได้ว่าลูกค้าเป็นเพื่อนกับ OA แล้วจริง */
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

  /* ตัวจริงที่ push ออเดอร์เข้า LINE — เรียกได้ก็ต่อเมื่อผู้ใช้กด "ยืนยันการสั่งซื้อ" แล้วเท่านั้น (ทั้งจาก
     #lineOrderModal บนหน้าเดิม หรือจากหน้า line-callback.html) ไม่มี UI logic ในนี้เลย แค่ยิง API + ตัดสินใจ
     save/clear profile cache + เตรียม lineUrl สำหรับปุ่ม "หรือแชทกับเราต่อทาง LINE" — ผู้เรียกจัดการ UI เอง */
  async function pushOrder(message, items, profile) {
    var result = await sendOrder(items, profile);
    var customerOk = !!(result && result.customerOk === true);

    if (!customerOk) {
      clearLineProfile();
      return { success: false };
    }

    saveLineProfile(profile);

    var lineUrl = 'https://line.me/R/oaMessage/@cpbf/?' + encodeURIComponent(message);

    if (isMobileDevice()) {
      window.open(lineUrl, '_blank', 'noopener');
      return { success: true, lineUrl: lineUrl, autoOpened: true };
    }

    return { success: true, lineUrl: lineUrl, autoOpened: false };
  }

  function renderModalItemSummary(listEl, totalEl, items) {
    listEl.innerHTML = '';
    var total = 0;
    (items || []).forEach(function (item) {
      var lineTotal = item.price * item.qty;
      total += lineTotal;
      var li = document.createElement('li');
      li.textContent = item.name + ' × ' + item.qty + ' — ฿' + lineTotal.toLocaleString('th-TH');
      listEl.appendChild(li);
    });
    totalEl.textContent = 'รวมทั้งหมด: ฿' + total.toLocaleString('th-TH');
  }

  /* แสดงหน้าสรุปคำสั่งซื้อ + ปุ่ม "ยืนยันการสั่งซื้อ" ใน #lineOrderModal ของหน้าปัจจุบัน (cart.html/
     index.html/online_shop.html/product-detail.html) แล้วรอจนกว่าผู้ใช้จะกดยืนยัน (หรือปิด modal เอง) —
     คืน Promise ที่ resolve เมื่อจบ flow นี้เท่านั้น (ไม่ resolve ทันที ต่างจาก sendOrder/pushOrder) */
  function confirmViaModal(message, items, profile) {
    var modal = document.getElementById('lineOrderModal');
    if (!modal) {
      // ไม่ควรเกิดขึ้นกับหน้าที่มีปุ่ม "สั่งซื้อผ่าน LINE" จริง (ทุกหน้าที่มีปุ่มนี้มี #lineOrderModal อยู่แล้ว)
      // แต่กันไว้เผื่อหน้าใหม่ในอนาคตลืมใส่ — fallback ส่งตรงไม่มีหน้ายืนยัน ดีกว่าไม่ทำอะไรเลย
      return pushOrder(message, items, profile);
    }

    var icon = document.getElementById('lineOrderModalIcon');
    var title = document.getElementById('lineOrderModalTitle');
    var desc = document.getElementById('lineOrderModalDesc');
    var summaryWrap = document.getElementById('lineOrderModalSummary');
    var itemList = document.getElementById('lineOrderModalItemList');
    var totalEl = document.getElementById('lineOrderModalTotal');
    var confirmBtn = document.getElementById('lineOrderModalConfirmBtn');
    var friendBtn = document.getElementById('lineOrderModalFriendBtn');
    var actionsWrap = document.getElementById('lineOrderModalActionsWrap');
    var directLink = document.getElementById('lineOrderModalDirectLink');

    // reset กลับเป็น state "ตรวจสอบคำสั่งซื้อ" เสมอทุกครั้งที่เปิด (เผื่อเปิดซ้ำหลังปิดไปตอนแสดงผลลัพธ์รอบก่อน)
    icon.innerHTML = CHECK_ICON;
    icon.className = 'line-order-modal__icon';
    title.textContent = 'ตรวจสอบคำสั่งซื้อของคุณ';
    desc.textContent = 'กดยืนยันเพื่อส่งคำสั่งซื้อนี้เข้า LINE ของเรา';
    renderModalItemSummary(itemList, totalEl, items);
    summaryWrap.hidden = false;
    friendBtn.hidden = true;
    actionsWrap.hidden = true;
    confirmBtn.disabled = false;
    confirmBtn.textContent = 'ยืนยันการสั่งซื้อ';
    modal.hidden = false;

    return new Promise(function (resolve) {
      var settled = false;

      function cleanup() {
        confirmBtn.removeEventListener('click', onConfirm);
        closeEls.forEach(function (el) { el.removeEventListener('click', onCancel); });
        document.removeEventListener('keydown', onKeydown);
      }

      function finish(result) {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(result);
      }

      function onCancel() {
        modal.hidden = true;
        finish({ success: false, cancelled: true });
      }

      function onKeydown(e) {
        if (e.key === 'Escape' && !modal.hidden) onCancel();
      }

      async function onConfirm() {
        confirmBtn.disabled = true;
        confirmBtn.textContent = 'กำลังส่งคำสั่งซื้อ...';

        var result = await pushOrder(message, items, profile);
        summaryWrap.hidden = true;

        if (result.success) {
          icon.innerHTML = CHECK_ICON;
          title.textContent = 'สั่งซื้อสำเร็จ';
          desc.textContent = 'ทีมงานของเราได้รับคำสั่งซื้อของคุณแล้ว และจะรีบติดต่อกลับโดยเร็วที่สุด';
          if (result.lineUrl && !result.autoOpened) {
            directLink.href = result.lineUrl;
            actionsWrap.hidden = false;
          }
        } else {
          icon.innerHTML = WARNING_ICON;
          icon.classList.add('line-order-modal__icon--warning');
          title.textContent = 'ยังไม่ได้รับคำสั่งซื้อของคุณ';
          desc.textContent = 'ต้องเพิ่มเราเป็นเพื่อนใน LINE ก่อน ทีมงานถึงจะเห็นคำสั่งซื้อของคุณได้ — กดปุ่มด้านล่างเพื่อเพิ่มเพื่อน แล้วกลับมากดสั่งซื้ออีกครั้ง';
          friendBtn.hidden = false;
        }

        // ไม่ปิด modal อัตโนมัติ — ให้ผู้ใช้เห็นผลลัพธ์ก่อนแล้วปิดเอง (ปุ่ม X/backdrop/Escape)
        finish(result);
      }

      var closeEls = Array.prototype.slice.call(modal.querySelectorAll('[data-close]'));
      confirmBtn.addEventListener('click', onConfirm);
      closeEls.forEach(function (el) { el.addEventListener('click', onCancel); });
      document.addEventListener('keydown', onKeydown);
    });
  }

  /* เรียกจากปุ่ม "สั่งซื้อผ่าน LINE" ทุกจุดในเว็บ (cart.html/index.html/online_shop.html/
     product-detail.html/products-render.js) — ถ้ายังไม่มี profile ที่ยืนยันแล้ว (ดูหมายเหตุด้านบนไฟล์) จะ
     redirect ไป LINE Login ก่อนเสมอ แล้วไปยืนยันคำสั่งซื้อต่อที่ line-callback.html — ถ้ามี profile อยู่แล้ว
     จะแสดงหน้ายืนยันใน #lineOrderModal ของหน้าปัจจุบันทันที (ไม่ redirect ไปไหน) คืนค่าเป็น Promise ของ
     {success, redirected, lineUrl, autoOpened, cancelled} ให้ผู้เรียกใช้ตัดสินใจต่อได้ (เช่น cart.html ใช้
     ตัดสินใจว่าจะเคลียร์ตะกร้าไหม) */
  async function openLineOrder(message, items, options) {
    options = options || {};
    var profile = getLineProfile();
    if (!profile) {
      startLineLogin({ message: message, items: items, clearCartOnSuccess: options.clearCartOnSuccess });
      return { success: false, redirected: true };
    }
    return confirmViaModal(message, items, profile);
  }

  /* อ่านคำสั่งซื้อที่ค้างไว้ก่อน redirect ไป LINE Login (ถ้ามี) — แค่ "ดู" ไม่ส่งออเดอร์จริง ต้องรอผู้ใช้
     กด "ยืนยันการสั่งซื้อ" ที่ line-callback.html ก่อนเสมอ (เรียก confirmPendingOrder ต่อ) */
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

    var result = await pushOrder(pending.message, pending.items, profile);

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
     (client secret ของ LINE Login channel อยู่ฝั่ง server เท่านั้น ไม่มีวันส่งมาที่นี่) — คืนแค่ profile +
     pendingOrder (ถ้ามี) ให้ line-callback.html แสดงสรุปออเดอร์ + ปุ่ม "ยืนยันการสั่งซื้อ" เอง ไม่ push
     ออเดอร์อัตโนมัติที่นี่เลย — ไม่ save profile ที่นี่โดยตรงเช่นกัน (save เฉพาะตอน pushOrder ยืนยันว่า push
     เข้าแชทลูกค้าสำเร็จจริงเท่านั้น — ดูหมายเหตุด้านบนไฟล์) */
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

  window.cpbfLineOrder = {
    openLineOrder: openLineOrder,
    getLineProfile: getLineProfile,
    handleLineCallback: handleLineCallback,
    confirmPendingOrder: confirmPendingOrder,
  };
  window.openLineOrder = openLineOrder; // alias เดิมที่โค้ดอื่น (products-render.js ฯลฯ) เรียกตรงๆ
})();
