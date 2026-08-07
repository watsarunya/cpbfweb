/* products-render.js — โมดูลกลาง: ดึงสินค้า/หมวดหมู่จริงจาก Supabase (products/product_categories)
   และ render เป็น .shop-card component เดียวกับที่ products.html/online_shop.html/product-detail.html ใช้อยู่แล้ว
   ใช้ร่วมกันทุกหน้า (ต้องโหลดหลัง cms/supabase-client.js และก่อน cart.js) */
(function () {
  var BG_CYCLE = ['var(--ci-blue)', 'var(--ci-yellow)', 'var(--accent-pink)'];

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
  }

  function formatBaht(amount) {
    return '฿' + Number(amount || 0).toLocaleString('th-TH', { maximumFractionDigits: 2 });
  }

  async function fetchCategories() {
    var { data, error } = await window.cmsSupabase
      .from('product_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (error) {
      console.error('โหลดหมวดหมู่สินค้าไม่สำเร็จ:', error.message);
      return [];
    }
    return data || [];
  }

  /* opts: { categoryId, limit, offset, excludeId, orderBy, ascending } */
  async function fetchProducts(opts) {
    opts = opts || {};
    var query = window.cmsSupabase
      .from('products')
      .select('*, category:product_categories(name_th, name_en, slug)')
      .eq('is_active', true)
      .order(opts.orderBy || 'sort_order', { ascending: opts.ascending !== false });

    if (opts.categoryId) query = query.eq('category_id', opts.categoryId);
    if (opts.excludeId) query = query.neq('id', opts.excludeId);
    if (opts.limit != null) {
      var from = opts.offset || 0;
      query = query.range(from, from + opts.limit - 1);
    }

    var { data, error } = await query;
    if (error) {
      console.error('โหลดสินค้าไม่สำเร็จ:', error.message);
      return [];
    }
    return data || [];
  }

  function shuffleArray(arr) {
    var copy = arr.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  // ใช้เฉพาะฝั่งเว็บหลัก (product-detail.html) เท่านั้น — กรอง is_active=true เสมอ เพื่อไม่ให้เข้าถึงสินค้าที่
  // ปิดใช้งานผ่าน URL ตรงได้ (product-detail.html จะพาไป 404 ต่อเมื่อได้ null กลับมา) — ฝั่ง CMS (cms/products.js)
  // โหลดสินค้าจาก items array ที่ query แยกไม่ผ่านฟังก์ชันนี้ ไม่กระทบกัน (แอดมินยังแก้ไข/เปิดใช้งานสินค้าที่
  // ปิดอยู่ได้ตามปกติ)
  async function fetchProductById(id) {
    var { data, error } = await window.cmsSupabase
      .from('products')
      .select('*, category:product_categories(name_th, name_en, slug)')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();
    if (error) {
      console.error('โหลดข้อมูลสินค้าไม่สำเร็จ:', error.message);
      return null;
    }
    return data;
  }

  function buildCard(product, index) {
    var bg = BG_CYCLE[(index || 0) % BG_CYCLE.length];
    var article = document.createElement('article');
    article.className = 'shop-card';
    article.id = 'product-' + product.id;
    article.dataset.category = product.category ? product.category.slug : '';

    var isOutOfStock = Number(product.stock) <= 0;

    article.innerHTML =
      '<a href="product-detail.html?id=' + encodeURIComponent(product.id) + '" class="shop-card__image-link" aria-label="ดูสินค้า ' + escapeHtml(product.name_th) + '">' +
        '<div class="shop-card__visual" style="--product-bg: ' + bg + ';">' +
          '<img src="' + escapeHtml(product.image) + '" alt="' + escapeHtml(product.name_th) + '" class="shop-card__image">' +
          '<span class="shop-card__quickview">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/></svg>' +
            'Quick View' +
          '</span>' +
        '</div>' +
      '</a>' +
      '<div class="shop-card__content">' +
        '<h3 class="shop-card__name">' + escapeHtml(product.name_th) + '</h3>' +
        '<span class="shop-card__price">' + formatBaht(product.price) + '</span>' +
        '<div class="shop-card__actions">' +
          '<button type="button" class="shop-card__add-btn" aria-label="เพิ่ม ' + escapeHtml(product.name_th) + ' ลงตะกร้า"' + (isOutOfStock ? ' disabled' : '') + '>' + (isOutOfStock ? 'สินค้าหมด' : 'Add to cart') + '</button>' +
          '<a href="https://line.me/R/oaMessage/@' + (window.CPBF_LINE_OA_ID || 'cpbf') + '/" target="_blank" rel="noopener" class="shop-card__line-btn" aria-label="สั่งซื้อ ' + escapeHtml(product.name_th) + ' ผ่าน LINE">' +
            '<span class="shop-card__line-icon-wrap"><img src="raw/assets/icons/line-ar21.svg" alt="" class="shop-card__line-icon" /></span>' +
            'Shop with LINE' +
          '</a>' +
        '</div>' +
      '</div>';

    return article;
  }

  function renderGrid(container, products) {
    container.innerHTML = '';
    products.forEach(function (p, i) { container.appendChild(buildCard(p, i)); });
  }

  function parsePrice(text) {
    return parseFloat(String(text).replace(/[^0-9.]/g, '')) || 0;
  }

  /* ผูก event ปุ่ม Add to cart (ผ่าน cpbfCart ที่มีอยู่แล้ว) + ปุ่ม Shop with LINE ให้การ์ดที่สร้างด้วย JS
     (จำเป็นต้องเรียกซ้ำหลัง render เพราะ script การ์ด Add-to-cart/LINE เดิมในแต่ละหน้าผูกตอน DOMContentLoaded
     ซึ่งมาก่อนที่การ์ดจากฐานข้อมูลจะถูกสร้างเสร็จ) */
  function bindCardActions(container) {
    if (window.cpbfCart) window.cpbfCart.bindShopCardButtons();

    (container || document).querySelectorAll('.shop-card__line-btn').forEach(function (btn) {
      if (btn.dataset.lineBound) return;
      btn.dataset.lineBound = 'true';
      btn.addEventListener('click', function (e) {
        var card = btn.closest('.shop-card');
        if (!card) return;
        var nameEl = card.querySelector('.shop-card__name');
        var priceEl = card.querySelector('.shop-card__price');
        var linkEl = card.querySelector('.shop-card__image-link');
        if (!nameEl || !priceEl || !window.openLineOrder) return;

        e.preventDefault();
        var price = parsePrice(priceEl.textContent);
        var productUrl = linkEl ? linkEl.href : window.location.href;
        var message = [
          'สนใจสั่งซื้อสินค้าดังนี้ค่ะ/ครับ',
          '',
          '1. ' + nameEl.textContent.trim(),
          '   จำนวน: 1 x ' + formatBaht(price) + ' = ' + formatBaht(price),
          '   ลิงก์: ' + productUrl,
          '',
          'รวมทั้งหมด: ' + formatBaht(price)
        ].join('\n');

        window.openLineOrder(message, [{ name: nameEl.textContent.trim(), qty: 1, price: price, url: productUrl }]);
      });
    });
  }

  window.cpbfProducts = {
    fetchCategories: fetchCategories,
    fetchProducts: fetchProducts,
    fetchProductById: fetchProductById,
    buildCard: buildCard,
    renderGrid: renderGrid,
    bindCardActions: bindCardActions,
    formatBaht: formatBaht,
    escapeHtml: escapeHtml,
    shuffleArray: shuffleArray,
  };
})();
