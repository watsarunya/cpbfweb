/* news-render.js — โมดูลกลาง: ดึงบทความ/หมวดหมู่จริงจาก Supabase (news_articles/news_categories)
   และ render เป็น .blog-card component เดียวกับที่ index.html/newsroom.html/news-detail.html ใช้อยู่แล้ว
   ใช้ร่วมกันทุกหน้า (ต้องโหลดหลัง cms/supabase-client.js) */
(function () {
  var LANG_KEY = 'cpbf-lang';

  function currentLang() {
    return localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'th';
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text == null ? '' : String(text);
    return div.innerHTML;
  }

  function formatThaiDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  async function fetchCategories() {
    var { data, error } = await window.cmsSupabase
      .from('news_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (error) {
      console.error('โหลดหมวดหมู่บทความไม่สำเร็จ:', error.message);
      return [];
    }
    return data || [];
  }

  /* opts: { categoryId, limit, offset, excludeId, orderBy, ascending } */
  async function fetchArticles(opts) {
    opts = opts || {};
    var query = window.cmsSupabase
      .from('news_articles')
      .select('*, category:news_categories(name_th, name_en, slug)')
      .eq('is_active', true)
      .order(opts.orderBy || 'created_at', { ascending: opts.ascending === true });

    if (opts.categoryId) query = query.eq('category_id', opts.categoryId);
    if (opts.excludeId) query = query.neq('id', opts.excludeId);
    if (opts.limit != null) {
      var from = opts.offset || 0;
      query = query.range(from, from + opts.limit - 1);
    }

    var { data, error } = await query;
    if (error) {
      console.error('โหลดบทความไม่สำเร็จ:', error.message);
      return [];
    }
    return data || [];
  }

  // ใช้เฉพาะฝั่งเว็บหลัก (news-detail.html) เท่านั้น — กรอง is_active=true เสมอ เพื่อไม่ให้เข้าถึงบทความที่
  // ปิดใช้งานผ่าน URL ตรงได้ (news-detail.html จะพาไป 404 ต่อเมื่อได้ null กลับมา) — ฝั่ง CMS
  // (cms/news-articles.js) โหลดบทความจาก items array ที่ query แยกไม่ผ่านฟังก์ชันนี้ ไม่กระทบกัน (แอดมินยัง
  // แก้ไข/เปิดใช้งานบทความที่ปิดอยู่ได้ตามปกติ)
  async function fetchArticleById(id) {
    var { data, error } = await window.cmsSupabase
      .from('news_articles')
      .select('*, category:news_categories(name_th, name_en, slug)')
      .eq('id', id)
      .eq('is_active', true)
      .maybeSingle();
    if (error) {
      console.error('โหลดข้อมูลบทความไม่สำเร็จ:', error.message);
      return null;
    }
    return data;
  }

  function buildCard(article) {
    var url = 'news-detail.html?id=' + encodeURIComponent(article.id);
    var el = document.createElement('article');
    el.className = 'blog-card';
    el.dataset.category = article.category ? article.category.slug : '';

    var lang = currentLang();
    var title = lang === 'en' ? (article.title_en || article.title_th) : article.title_th;
    var excerpt = lang === 'en' ? (article.excerpt_en || article.excerpt_th) : article.excerpt_th;

    el.innerHTML =
      '<a href="' + url + '" class="blog-card__image-link" aria-label="อ่าน ' + escapeHtml(title) + '">' +
        '<img src="' + escapeHtml(article.image) + '" alt="' + escapeHtml(title) + '" class="blog-card__image" />' +
      '</a>' +
      '<div class="blog-card__body">' +
        '<p class="blog-card__meta">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' +
          formatThaiDate(article.created_at) +
        '</p>' +
        '<h3 class="blog-card__title"><a href="' + url + '">' + escapeHtml(title) + '</a></h3>' +
        '<p class="blog-card__desc">' + escapeHtml(excerpt) + '</p>' +
        '<a href="' + url + '" class="blog-card__readmore"><span data-en="Read more">อ่านเพิ่มเติม</span> <span aria-hidden="true">→</span></a>' +
      '</div>';

    // สลับหัวข้อ/คำโปรยได้ตอนเปลี่ยนภาษาแบบไม่ต้องรีเฟรชหน้า (i18n.js) — ใส่เฉพาะจุดที่มี _en กรอกไว้จริง
    var titleLink = el.querySelector('.blog-card__title a');
    if (article.title_en) {
      titleLink.setAttribute(lang === 'en' ? 'data-th' : 'data-en', lang === 'en' ? article.title_th : article.title_en);
    }
    var descEl = el.querySelector('.blog-card__desc');
    if (article.excerpt_en) {
      descEl.setAttribute(lang === 'en' ? 'data-th' : 'data-en', lang === 'en' ? article.excerpt_th : article.excerpt_en);
    }

    return el;
  }

  function renderGrid(container, articles) {
    container.innerHTML = '';
    articles.forEach(function (a) { container.appendChild(buildCard(a)); });
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

  window.cpbfNews = {
    fetchCategories: fetchCategories,
    fetchArticles: fetchArticles,
    fetchArticleById: fetchArticleById,
    buildCard: buildCard,
    renderGrid: renderGrid,
    formatThaiDate: formatThaiDate,
    escapeHtml: escapeHtml,
    shuffleArray: shuffleArray,
  };
})();
