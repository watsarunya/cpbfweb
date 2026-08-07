/* banner-render.js — ดึง Hero Banner (แยกตามเพจ) จาก Supabase (จัดการผ่าน cms/banners.html) มา render
   กฎ: ถ้าเพจปัจจุบันไม่มีแบนเนอร์ที่ active อยู่เลย (หรือดึงข้อมูลไม่สำเร็จ) ให้ซ่อน section ทั้งหมดไปเลย
   ไม่ใช้ fallback แบบ static เหมือนเดิมอีกต่อไป เพราะ requirement ใหม่คือ "ไม่มีแบนเนอร์ = ไม่มี section"
   ⚠️ KV Banner ย้ายไป render ผ่าน page-render.js แล้ว (ไม่ auto-run ที่นี่อีกต่อไป) เพราะ KV Banner ต้อง
   จัดลำดับเทียบกับ page_sections ได้ (ผ่าน "static proxy" anchor_id='kv-banner') ซึ่งต้องรู้ตำแหน่งที่ถูกต้อง
   ก่อน insert DOM — buildKvSection() ยังอยู่ที่นี่ (เก็บ markup builder ไว้ที่เดียว) แค่ expose ผ่าน
   window.cpbfBanners ให้ page-render.js เรียกใช้แทนที่จะ duplicate โค้ด */
(function () {
  function currentLang() {
    return localStorage.getItem('cpbf-lang') === 'en' ? 'en' : 'th';
  }

  // เพจ standalone (promo.html?slug=...) ทุกอันใช้ไฟล์ "promo.html" ไฟล์เดียวกันหมด ต้องรวม slug เข้าไป
  // ในคีย์ page_url ด้วย ไม่งั้นทุกเพจ standalone จะแชร์ Hero Banner ชุดเดียวกันหมดโดยไม่ตั้งใจ — คีย์นี้ต้อง
  // ตรงกับที่ cms/banners.js สร้างตอนแอดมินเลือกเพจ standalone จาก dropdown เป๊ะๆ (encodeURIComponent(slug))
  function currentPage() {
    var name = window.location.pathname.split('/').pop() || 'index.html';
    if (name === 'promo.html') {
      var slug = new URLSearchParams(window.location.search).get('slug') || '';
      if (slug) return name + '?slug=' + encodeURIComponent(slug);
    }
    return name;
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        if (attrs[key] === undefined || attrs[key] === null || attrs[key] === '') return;
        node.setAttribute(key, attrs[key]);
      });
    }
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function bilingualText(node, th, en) {
    node.setAttribute('data-th', th || '');
    node.setAttribute('data-en', en || th || '');
    node.textContent = currentLang() === 'en' ? (en || th || '') : (th || en || '');
  }

  function alignClass(prefix, align) {
    var a = ['left', 'right', 'center'].indexOf(align) !== -1 ? align : 'left';
    return prefix + '--align-' + a;
  }

  // Hero/KV Banner รองรับ .mp4 (วิดีโอพื้นหลัง) นอกจาก jpg/jpeg/png/gif แล้ว — เช็คจากนามสกุลไฟล์ในตัว url
  // เอง (ไม่มี Content-Type ให้เช็คตอน render เพราะเป็นแค่ string URL) แล้วสร้าง <video> แทน <img> โดยใช้
  // class เดียวกัน (`hero-showcase__bg-image`/`kv-banner__image`) เพราะ CSS ที่มีอยู่แล้ว (position:absolute;
  // object-fit:cover ฯลฯ) เป็น generic class selector ไม่ได้ผูกกับ tag `img` โดยเฉพาะ ใช้กับ `video` ได้ทันที
  // โดยไม่ต้องเพิ่ม CSS ใหม่ — วิดีโอเล่นวนอัตโนมัติแบบไม่มีเสียง (autoplay ในเบราว์เซอร์ต้อง muted เสมอ)
  function isVideoUrl(url) {
    return /\.mp4(\?.*)?(#.*)?$/i.test(url || '');
  }

  function buildMediaEl(url, altText, className) {
    if (isVideoUrl(url)) {
      var video = document.createElement('video');
      video.className = className;
      video.src = url || '';
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('aria-hidden', 'true');
      return video;
    }
    return el('img', { src: url, class: className, alt: altText || '' });
  }

  function buildHeroSlide(banner) {
    var srcUrl = currentLang() === 'en' ? (banner.image_en || banner.image_th) : (banner.image_th || banner.image_en);
    var img = buildMediaEl(srcUrl, banner.title_th || banner.title_en || '', 'hero-showcase__bg-image');
    // ⚠️🔧 แก้บั๊ก 2026-08-04: เดิมใช้ data-th/data-en (เฉยๆ ไม่มี suffix) ซึ่งเป็น convention ของ i18n.js
    // สำหรับสลับ .textContent เท่านั้น (ดู applyTextSwap ใน i18n.js) — ตั้งบน <img>/<video> แล้วไม่มีผลอะไร
    // เลยเพราะ textContent ของ media element ไม่ได้ render เป็นภาพ ทำให้สลับภาษาแล้ว Hero Banner ไม่เปลี่ยน
    // รูปตาม — แก้โดยใช้ data-th-src/data-en-src แทน (pattern เดียวกับ data-th-alt/data-en-alt ที่
    // nav-render.js ใช้อยู่แล้วถูกต้อง) คู่กับ handler ใหม่ใน i18n.js ที่สลับ attribute `src` โดยเฉพาะ
    img.setAttribute('data-th-src', banner.image_th || '');
    img.setAttribute('data-en-src', banner.image_en || banner.image_th || '');

    var heading = el('h2', { class: 'hero-showcase__heading' });
    bilingualText(heading, banner.title_th, banner.title_en);

    var description = null;
    if (banner.description_th || banner.description_en) {
      description = el('p', { class: 'hero-showcase__description' });
      bilingualText(description, banner.description_th, banner.description_en);
    }

    var cta = null;
    if (banner.button_text) {
      var ctaLabel = document.createElement('span');
      ctaLabel.textContent = banner.button_text;
      var arrow = document.createElement('span');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '→';
      cta = el('a', { href: banner.link_url || '#', class: 'hero-showcase__cta' }, [ctaLabel, arrow]);
    }

    var overlay = el('div', { class: 'hero-showcase__overlay' }, [heading, description, cta]);
    // หน้าอื่นที่ไม่ใช่หน้าแรกใช้ Hero Banner เตี้ยกว่า (ขนาดรูปแนะนำ 1440×450px แทน 1440×600px ของหน้าแรก)
    // ดู .hero-showcase--compact ใน style.css
    var isHomePage = currentPage() === 'index.html';
    var showcaseClass = 'hero-showcase ' + alignClass('hero-showcase', banner.text_align) + (isHomePage ? '' : ' hero-showcase--compact');
    var showcase = el('div', { class: showcaseClass }, [
      img,
      el('span', { class: 'hero-showcase__scrim', 'aria-hidden': 'true' }),
      overlay,
    ]);
    return el('div', { class: 'hero-slider__slide' }, [showcase]);
  }

  function buildKvSection(banner) {
    var kvSrcUrl = currentLang() === 'en' ? (banner.image_en || banner.image_th) : (banner.image_th || banner.image_en);
    var img = buildMediaEl(kvSrcUrl, banner.title_th || banner.title_en || '', 'kv-banner__image');
    // ดูหมายเหตุแก้บั๊ก 2026-08-04 ใน buildHeroSlide() ด้านบน — ใช้ data-th-src/data-en-src เหตุผลเดียวกัน
    img.setAttribute('data-th-src', banner.image_th || '');
    img.setAttribute('data-en-src', banner.image_en || banner.image_th || '');

    var title = el('h2', { class: 'kv-banner__title' });
    bilingualText(title, banner.title_th, banner.title_en);

    var contentChildren = [title];
    if (banner.description_th || banner.description_en) {
      var desc = el('p', { class: 'kv-banner__description' });
      bilingualText(desc, banner.description_th, banner.description_en);
      contentChildren.push(desc);
    }
    if (banner.button_text) {
      var btn = el('a', { href: banner.link_url || '#', class: 'kv-banner__button' });
      btn.textContent = banner.button_text;
      contentChildren.push(btn);
    }

    var content = el('div', { class: 'kv-banner__content' }, contentChildren);
    return el('section', { class: 'kv-banner ' + alignClass('kv-banner', banner.text_align) }, [
      img,
      el('div', { class: 'kv-banner__overlay', 'aria-hidden': 'true' }),
      content,
    ]);
  }

  async function renderHero() {
    var section = document.getElementById('heroSection') || document.querySelector('.hero-section');
    var track = document.getElementById('heroSliderTrack');
    if (!section || !track) return;

    if (!window.cmsSupabase) {
      section.hidden = true;
      return;
    }

    var { data, error } = await window.cmsSupabase
      .from('banners')
      .select('*')
      .eq('section', 'hero')
      .eq('page_url', currentPage())
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.warn('banner-render.js: โหลด Hero Banner ไม่สำเร็จ ซ่อน section', error);
      section.hidden = true;
      return;
    }

    track.innerHTML = '';
    data.forEach(function (banner) {
      track.appendChild(buildHeroSlide(banner));
    });

    section.hidden = false;
    window.initHeroSlider();
    document.dispatchEvent(new CustomEvent('navRendered')); // ให้ i18n.js apply ภาษาซ้ำกับ element ใหม่
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHero();
  });

  window.cpbfBanners = {
    buildKvSection: buildKvSection,
    currentPage: currentPage,
  };
})();
