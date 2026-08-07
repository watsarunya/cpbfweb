/**
 * site-search.js
 * ค้นหาสินค้าแบบ live จากช่อง search ที่ header — ใช้ร่วมกันทุกหน้า (เหมือน cart.js/nav-render.js)
 *
 * ดึงจากตาราง products จริงใน Supabase โดยตรง (ต้องโหลดหลัง cms/supabase-client.js) แทนการ scrape
 * online_shop.html แบบเดิม (เลิกใช้ได้เพราะ online_shop.html เปลี่ยนมา render การ์ดสินค้าด้วย JS จาก
 * ฐานข้อมูลแล้ว ไม่มี .shop-card อยู่ใน static HTML ให้ fetch+parse อีกต่อไป — ดู products-render.js)
 */

(function () {
  var MIN_CHARS = 1;
  var MAX_RESULTS = 8;

  function normalize(text) {
    return String(text || '').toLowerCase().trim();
  }

  function escapeLikePattern(text) {
    return text.replace(/[%_\\]/g, '\\$&');
  }

  async function searchProducts(query) {
    var q = normalize(query);
    if (!q || !window.cmsSupabase) return [];

    var pattern = '%' + escapeLikePattern(q) + '%';
    var results = await Promise.all([
      window.cmsSupabase.from('products').select('id, name_th, price, image').eq('is_active', true).ilike('name_th', pattern).limit(MAX_RESULTS),
      window.cmsSupabase.from('products').select('id, name_th, price, image').eq('is_active', true).ilike('name_en', pattern).limit(MAX_RESULTS),
    ]);

    var seen = {};
    var merged = [];
    results.forEach(function (r) {
      (r.data || []).forEach(function (p) {
        if (seen[p.id]) return;
        seen[p.id] = true;
        merged.push(p);
      });
    });

    return merged.slice(0, MAX_RESULTS).map(function (p) {
      return {
        name: p.name_th,
        nameLower: normalize(p.name_th),
        price: '฿' + Number(p.price || 0).toLocaleString('th-TH'),
        image: p.image || '',
        url: 'product-detail.html?id=' + encodeURIComponent(p.id),
      };
    });
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function highlightMatch(name, query) {
    var q = normalize(query);
    var nameLower = normalize(name);
    var idx = nameLower.indexOf(q);
    if (idx === -1 || !q) return escapeHtml(name);

    var before = escapeHtml(name.slice(0, idx));
    var match = escapeHtml(name.slice(idx, idx + q.length));
    var after = escapeHtml(name.slice(idx + q.length));
    return before + '<mark>' + match + '</mark>' + after;
  }

  function initSearchWidget(wrap) {
    var input = wrap.querySelector('.site-header__search-input');
    if (!input) return;

    var resultsBox = document.createElement('div');
    resultsBox.className = 'site-header__search-results';
    resultsBox.hidden = true;
    wrap.appendChild(resultsBox);

    var debounceTimer = null;
    var activeIndex = -1;
    var currentResults = [];
    var requestToken = 0;

    function closeResults() {
      resultsBox.hidden = true;
      resultsBox.innerHTML = '';
      activeIndex = -1;
      currentResults = [];
    }

    function renderResults(results, query) {
      currentResults = results;
      activeIndex = -1;

      if (!results.length) {
        resultsBox.innerHTML = '<p class="site-header__search-empty">ไม่พบสินค้าที่ตรงกับ "' + escapeHtml(query) + '"</p>';
        resultsBox.hidden = false;
        return;
      }

      var html = '<p class="site-header__search-results-label">สินค้า</p>';
      results.forEach(function (p, i) {
        html += '' +
          '<a href="' + p.url + '" class="site-header__search-result" data-result-index="' + i + '">' +
            '<span class="site-header__search-result-thumb">' +
              (p.image ? '<img src="' + escapeHtml(p.image) + '" alt="" loading="lazy" />' : '') +
            '</span>' +
            '<span class="site-header__search-result-name">' + highlightMatch(p.name, query) + '</span>' +
          '</a>';
      });
      resultsBox.innerHTML = html;
      resultsBox.hidden = false;
    }

    function updateActiveHighlight() {
      var items = resultsBox.querySelectorAll('.site-header__search-result');
      items.forEach(function (item, i) {
        item.classList.toggle('is-active', i === activeIndex);
      });
    }

    input.addEventListener('input', function () {
      var query = input.value;
      clearTimeout(debounceTimer);

      if (normalize(query).length < MIN_CHARS) {
        closeResults();
        return;
      }

      debounceTimer = setTimeout(function () {
        var myToken = ++requestToken;
        searchProducts(query).then(function (results) {
          if (myToken !== requestToken) return; // มีการพิมพ์ต่อระหว่างรอ ผลลัพธ์เก่านี้ล้าสมัยแล้ว ทิ้งไป
          renderResults(results, query);
        });
      }, 150);
    });

    input.addEventListener('keydown', function (e) {
      if (resultsBox.hidden || !currentResults.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, currentResults.length - 1);
        updateActiveHighlight();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        updateActiveHighlight();
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && currentResults[activeIndex]) {
          e.preventDefault();
          window.location.href = currentResults[activeIndex].url;
        }
      } else if (e.key === 'Escape') {
        closeResults();
      }
    });

    input.addEventListener('focus', function () {
      if (normalize(input.value).length >= MIN_CHARS && currentResults.length) {
        resultsBox.hidden = false;
      }
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) closeResults();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.site-header__search').forEach(initSearchWidget);
  });
})();
