/* cart.js — ตะกร้าสินค้าจริง เก็บใน localStorage ใช้ร่วมกันทุกหน้า
   โครงสร้าง item: { id, name, price, image, qty, url } */
(function () {
  var STORAGE_KEY = 'cpbf-cart';

  function getCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent('cartUpdated', { detail: { cart: cart } }));
  }

  function slugify(text) {
    return (text || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9ก-๙]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'item-' + Date.now();
  }

  function addToCart(item, qty) {
    qty = Math.max(1, parseInt(qty, 10) || 1);
    var cart = getCart();
    var existing = cart.find(function (c) { return c.id === item.id; });
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: item.id,
        name: item.name || 'สินค้า',
        price: parseFloat(item.price) || 0,
        image: item.image || '',
        qty: qty,
        url: item.url || '#',
      });
    }
    saveCart(cart);
    return cart;
  }

  function removeFromCart(id) {
    var cart = getCart().filter(function (c) { return c.id !== id; });
    saveCart(cart);
    return cart;
  }

  function updateQty(id, qty) {
    qty = parseInt(qty, 10) || 0;
    var cart = getCart();
    if (qty <= 0) {
      cart = cart.filter(function (c) { return c.id !== id; });
    } else {
      var item = cart.find(function (c) { return c.id === id; });
      if (item) item.qty = qty;
    }
    saveCart(cart);
    return cart;
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartCount() {
    return getCart().reduce(function (sum, c) { return sum + c.qty; }, 0);
  }

  function getCartTotal() {
    return getCart().reduce(function (sum, c) { return sum + c.qty * c.price; }, 0);
  }

  function updateCartBadgeUI() {
    var count = getCartCount();
    document.querySelectorAll('.site-header__cart-badge').forEach(function (badge) {
      badge.textContent = String(count);
      badge.hidden = count === 0;
    });
    document.querySelectorAll('.site-header__cart').forEach(function (link) {
      var label = count === 1 ? '1 ชิ้น' : count + ' ชิ้น';
      link.setAttribute('aria-label', 'ตะกร้าสินค้า (' + label + ')');
      link.setAttribute('data-en-aria-label', 'Shopping cart (' + count + (count === 1 ? ' item' : ' items') + ')');
    });
  }

  function parsePrice(text) {
    if (!text) return 0;
    var cleaned = text.replace(/[^\d.]/g, '');
    return parseFloat(cleaned) || 0;
  }

  function flashButton(btn, label) {
    if (!btn) return;
    // ไม่ disable ปุ่ม เพื่อให้กดเพิ่มจำนวนซ้ำๆ ได้ทันที (เช่น กด 3 ครั้งติดกันเพื่อเพิ่ม 3 ชิ้น)
    // แค่โชว์ข้อความ/สียืนยันชั่วคราว แล้วคืนค่าเดิม — ใช้ตัวนับกันข้อความเดิมโดน timeout เก่าที่ค้างอยู่ทับ
    var original = btn.dataset.originalLabel || btn.textContent;
    btn.dataset.originalLabel = original;
    btn.textContent = label || '✓ เพิ่มแล้ว';
    btn.classList.add('is-added');

    var myToken = (btn.dataset.flashToken = String(Date.now() + Math.random()));
    setTimeout(function () {
      if (btn.dataset.flashToken !== myToken) return; // มีการกดซ้ำระหว่างนี้ ให้ timeout ล่าสุดเป็นคนคืนค่า
      btn.textContent = btn.dataset.originalLabel;
      btn.classList.remove('is-added');
    }, 900);
  }

  /* ผูก event ให้ปุ่ม "Add to cart" ทุกอันในหน้ารายการสินค้า (.shop-card) โดยดึงข้อมูลจาก DOM รอบๆ ปุ่มเอง
     ไม่ต้องแก้ HTML การ์ดสินค้าเพิ่ม เพราะใช้ class ที่มีอยู่แล้ว (.shop-card__name/__price/__image) */
  function bindShopCardButtons() {
    document.querySelectorAll('.shop-card__add-btn').forEach(function (btn) {
      if (btn.dataset.cartBound) return;
      btn.dataset.cartBound = 'true';
      btn.addEventListener('click', function () {
        var card = btn.closest('.shop-card');
        if (!card) return;
        var nameEl = card.querySelector('.shop-card__name');
        var priceEl = card.querySelector('.shop-card__price');
        var imgEl = card.querySelector('.shop-card__image');
        var linkEl = card.querySelector('.shop-card__image-link');
        var name = nameEl ? nameEl.textContent.trim() : 'สินค้า';

        addToCart({
          id: slugify(name),
          name: name,
          price: parsePrice(priceEl ? priceEl.textContent : ''),
          image: imgEl ? imgEl.getAttribute('src') : '',
          url: linkEl ? linkEl.getAttribute('href') : '#',
        }, 1);

        flashButton(btn);
      });
    });
  }

  window.cpbfCart = {
    getCart: getCart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateQty: updateQty,
    clearCart: clearCart,
    getCartCount: getCartCount,
    getCartTotal: getCartTotal,
    parsePrice: parsePrice,
    slugify: slugify,
    flashButton: flashButton,
  };

  document.addEventListener('DOMContentLoaded', function () {
    updateCartBadgeUI();
    bindShopCardButtons();
  });

  document.addEventListener('cartUpdated', updateCartBadgeUI);

  // เผื่อ shop-card ถูกสร้างทีหลังด้วย JS อื่น (เช่น filter/re-render) — เปิดให้เรียกซ้ำได้
  window.cpbfCart.bindShopCardButtons = bindShopCardButtons;
})();
