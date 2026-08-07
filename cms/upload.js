/* cms/upload.js — อัปโหลดรูปภาพขึ้น Supabase Storage (bucket "cms-uploads") ใช้ร่วมกันทุกหน้าใน cms/
   ใช้ได้กับทั้ง Menu Management (icon/image) และ Banner Management (image TH/EN) */
(function () {
  var BUCKET = 'cms-uploads';
  var MAX_SIZE_MB = 5;
  var ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

  // Hero/KV Banner รองรับ .mp4 (วิดีโอพื้นหลัง) เพิ่มจากรูปภาพ — จำกัดไว้เฉพาะจุดที่ส่ง opts.allowVideo=true
  // เข้ามาเท่านั้น (ดู cmsBindImageUpload ด้านล่าง) ไม่ได้เปิดให้ทุกจุดอัปโหลดที่ใช้ cmsUploadImage() ร่วมกัน
  // เพราะจุดอื่น (เมนู/สินค้า/บทความ/พื้นหลัง section) ไม่ได้ขอรองรับวิดีโอ — ลิมิตขนาดสูงกว่ารูปภาพปกติ
  // (วิดีโอไฟล์เล็กที่สุดก็มักใหญ่กว่ารูปภาพหลาย MB อยู่แล้ว)
  var ALLOWED_VIDEO_TYPES = ['video/mp4'];
  var MAX_VIDEO_SIZE_MB = 20;

  function safeExt(filename) {
    var m = /\.([a-zA-Z0-9]+)$/.exec(filename || '');
    return m ? m[1].toLowerCase() : 'jpg';
  }

  function randomId() {
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  }

  /* คืนค่า { url, error } — ใช้ผ่าน await window.cmsUploadImage(file, opts) — opts.allowVideo=true เพื่อรับ
     ไฟล์ .mp4 ด้วย (ดูหมายเหตุที่ ALLOWED_VIDEO_TYPES ด้านบน) */
  window.cmsUploadImage = async function (file, opts) {
    opts = opts || {};
    if (!file) return { error: 'ไม่พบไฟล์' };

    var isVideo = ALLOWED_VIDEO_TYPES.indexOf(file.type) !== -1;
    var allowedTypes = opts.allowVideo ? ALLOWED_TYPES.concat(ALLOWED_VIDEO_TYPES) : ALLOWED_TYPES;
    if (allowedTypes.indexOf(file.type) === -1) {
      return {
        error: opts.allowVideo
          ? 'รองรับเฉพาะไฟล์รูปภาพ (JPG, PNG, WEBP, GIF, SVG) หรือวิดีโอ (MP4)'
          : 'รองรับเฉพาะไฟล์รูปภาพ (JPG, PNG, WEBP, GIF, SVG)',
      };
    }
    var maxSizeMb = isVideo ? MAX_VIDEO_SIZE_MB : MAX_SIZE_MB;
    if (file.size > maxSizeMb * 1024 * 1024) {
      return { error: 'ไฟล์ใหญ่เกินไป (สูงสุด ' + maxSizeMb + 'MB)' };
    }

    var path = randomId() + '.' + safeExt(file.name);
    var { error } = await window.cmsSupabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      return { error: 'อัปโหลดไม่สำเร็จ: ' + error.message };
    }

    var { data } = window.cmsSupabase.storage.from(BUCKET).getPublicUrl(path);
    return { url: data.publicUrl };
  };

  /* ผูก UI แบบสำเร็จรูป: file input + text input (URL) ที่มีอยู่แล้ว + dropzone (คลิก/ลากไฟล์จาก desktop
     มาวางได้จริง — ไม่ใช่แค่ดีไซน์) เรียกใช้ครั้งเดียวตอน DOMContentLoaded โดยส่ง element ที่เกี่ยวข้องเข้ามา
     (opts.dropzone เป็น optional — ถ้าไม่ส่งมาก็ยังใช้ fileInput ตรงๆ ได้เหมือนเดิม)

     ⚠️🔧 ปรับ 2026-08-04: มีรูปแล้ว dropzone จะโชว์รูปนั้นเต็มพื้นที่แทนไอคอน/ข้อความอัปโหลง พร้อมปุ่ม "✕"
     มุมขวาบนสำหรับลบ (คลิกที่รูปเองยังเปิด file picker เพื่อเปลี่ยนรูปใหม่ได้ปกติ) — dropzone ต้องมี
     <img class="cms-dropzone__preview"> และ <button class="cms-dropzone__remove"> วางไว้ในนั้นด้วยเสมอ
     (ดูตัวอย่าง markup ใน cms/index.html/banners.html/news-articles.html/page-editor.html) — opts.preview
     (element <img> แยกต่างหากนอก dropzone) ยังรองรับไว้เพื่อ backward-compat เฉยๆ ไม่ได้ใช้แล้วในหน้าไหน */
  window.cmsBindImageUpload = function (opts) {
    var fileInput = opts.fileInput;
    var urlInput = opts.urlInput;
    var preview = opts.preview;
    var statusEl = opts.statusEl;
    var dropzone = opts.dropzone;
    var allowVideo = !!opts.allowVideo;
    var dzPreview = dropzone ? dropzone.querySelector('.cms-dropzone__preview') : null;
    var dzPreviewVideo = dropzone ? dropzone.querySelector('.cms-dropzone__preview-video') : null;
    var dzRemoveBtn = dropzone ? dropzone.querySelector('.cms-dropzone__remove') : null;

    // .mp4 (Hero/KV Banner เท่านั้น — ดู opts.allowVideo) โชว์เป็น <video> เล่นวนแทน <img> — เช็คจากนามสกุล
    // ไฟล์ใน URL เอง (เหตุผลเดียวกับ banner-render.js's isVideoUrl() ฝั่งเว็บหลัก)
    function isVideoUrl(url) {
      return /\.mp4(\?.*)?(#.*)?$/i.test(url || '');
    }

    function updatePreview() {
      var val = urlInput.value.trim();
      var isVideo = allowVideo && isVideoUrl(val);
      if (preview) {
        if (val) {
          preview.src = val;
          preview.hidden = false;
        } else {
          preview.hidden = true;
        }
      }
      // ⚠️ ใช้ el.style.display แบบระบุค่าตรงๆ ('none'/'block') แทน .hidden ตรงนี้โดยตั้งใจ — .cms-dropzone.
      // has-image .cms-dropzone__preview ใน CSS มี specificity สูงกว่า [hidden] ของ browser (บั๊กแพทเทิร์น
      // เดียวกับที่เจอมาแล้วหลายครั้ง เช่น .cms-icon-btn[hidden]/.cms-field[hidden] — ดู CLAUDE.md) inline
      // style ชนะเสมอไม่ว่า specificity เท่าไหร่ ก็เลยไม่พึ่ง CSS fallback เลยทั้งสอง element ระบุชัดทั้งคู่
      if (dzPreview) {
        dzPreview.src = isVideo ? '' : (val || '');
        dzPreview.style.display = (val && !isVideo) ? 'block' : 'none';
      }
      if (dzPreviewVideo) {
        dzPreviewVideo.src = isVideo ? val : '';
        dzPreviewVideo.style.display = isVideo ? 'block' : 'none';
      }
      if (dropzone) dropzone.classList.toggle('has-image', !!val);
    }

    if (urlInput) {
      urlInput.addEventListener('input', updatePreview);
      updatePreview();
    }

    if (dzRemoveBtn) {
      dzRemoveBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        urlInput.value = '';
        updatePreview();
      });
    }

    async function handleFile(file) {
      if (!file) return;

      if (statusEl) statusEl.textContent = 'กำลังอัปโหลด...';
      var result = await window.cmsUploadImage(file, { allowVideo: allowVideo });
      if (fileInput) fileInput.value = '';

      if (result.error) {
        if (statusEl) statusEl.textContent = result.error;
        if (window.cmsToast) window.cmsToast(result.error, 'error');
        return;
      }

      urlInput.value = result.url;
      updatePreview();
      if (statusEl) statusEl.textContent = 'อัปโหลดสำเร็จ';
      setTimeout(function () {
        if (statusEl) statusEl.textContent = '';
      }, 2500);
    }

    if (fileInput) {
      fileInput.addEventListener('change', function () {
        var file = fileInput.files && fileInput.files[0];
        handleFile(file);
      });
    }

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', function () { fileInput.click(); });

      ['dragenter', 'dragover'].forEach(function (evt) {
        dropzone.addEventListener(evt, function (e) {
          e.preventDefault();
          dropzone.classList.add('is-dragover');
        });
      });
      ['dragleave', 'dragend'].forEach(function (evt) {
        dropzone.addEventListener(evt, function () {
          dropzone.classList.remove('is-dragover');
        });
      });
      dropzone.addEventListener('drop', function (e) {
        e.preventDefault();
        dropzone.classList.remove('is-dragover');
        var file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        handleFile(file);
      });
    }

    return { updatePreview: updatePreview };
  };

  /* Toolbar กลางสำหรับ Quill rich text editor ทุกจุดในระบบ (สินค้า/บทความ/section ของเพจ) — ให้ครบ:
     ขนาดตัวอักษรตามระบบ H1/H2/H3/ปกติ, สีตัวอักษร, จัดตำแหน่ง (ซ้าย/กลาง/ขวา), แทรกรูป, ลิงก์
     ใช้ร่วมกับ window.cmsBindQuillImageUpload() ด้านล่างเสมอ ไม่งั้นปุ่มแทรกรูปจะ prompt() ให้พิมพ์ URL เอง
     ตามพฤติกรรม default ของ Quill แทนที่จะอัปโหลดไฟล์จริงขึ้น Supabase Storage เหมือนรูปอื่นๆ ในระบบ */
  window.CMS_QUILL_TOOLBAR = [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ color: [] }],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ];

  // จำกัด format ที่ editor ยอมรับไว้แค่เท่าที่มีปุ่มใน toolbar ด้านบน — กันปัญหาคัดลอกข้อความจากที่อื่น
  // (Word/Google Docs/เว็บอื่น) แล้วมี format ติดมาด้วยที่ไม่ได้ตั้งใจ โดยเฉพาะ "background" (สีพื้นหลังของ
  // ตัวอักษร) ซึ่ง Quill รองรับ format นี้อยู่แล้วในตัวแม้ไม่มีปุ่มในหน้า toolbar ก็ตาม พอวางข้อความที่มี
  // background-color ติดมา (พบบ่อยเวลาก็อปจากเอกสารอื่น) จะโดนแปลงเป็น format นี้อัตโนมัติ แล้วโผล่ทับ
  // พื้นหลัง (bg_image) ของ section เอง — ใส่ `formats` ที่นี่ให้ Quill กรอง format ที่ไม่ได้อยู่ในลิสต์นี้
  // ออกทั้งหมด ทั้งตอนพิมพ์เองและตอนวาง (paste) จากที่อื่น
  // ⚠️ 'width' (ใช้ปรับขนาดรูปภาพ — ดู bindQuillImageResize() ด้านล่าง) **ห้ามใส่ในลิสต์นี้** แม้จะดูเข้าท่า
  // ก็ตาม — ทดสอบแล้วว่า Quill 2.x จะ throw "Cannot register 'width' specified in formats config" ทันทีตอน
  // new Quill() เพราะ `formats:` option ต้องเป็นชื่อ format/blot ที่ "ลงทะเบียน" อยู่ใน registry จริงๆ เท่านั้น
  // (เช่น attributor หรือ blot แยกต่างหาก) แต่ 'width' เป็นแค่ attribute ภายในของ Image blot เอง (ไม่ใช่
  // format ที่ลงทะเบียนแยก) — ไม่ต้องใส่ก็ใช้งานได้ปกติอยู่แล้ว เพราะ quill.formatText(idx, 1, 'width', v)
  // เรียกลงไปที่ Image blot's format() ตรงๆ ไม่ผ่านการเช็ค registry ที่ถูกจำกัดโดย option นี้เลย
  window.CMS_QUILL_FORMATS = ['header', 'bold', 'italic', 'underline', 'color', 'align', 'list', 'link', 'image'];

  // ปุ่ม "แทรกรูป" ใน toolbar อัปโหลดไฟล์จริงขึ้น Supabase Storage แล้วแทรกที่ตำแหน่ง cursor แทนการ
  // prompt() ให้พิมพ์ URL เอง — เรียกครั้งเดียวหลังสร้าง Quill instance เสร็จ (new Quill(...))
  window.cmsBindQuillImageUpload = function (quill) {
    quill.getModule('toolbar').addHandler('image', function () {
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.addEventListener('change', async function () {
        var file = input.files && input.files[0];
        if (!file) return;
        var range = quill.getSelection(true);
        var result = await window.cmsUploadImage(file);
        if (result.error) {
          if (window.cmsToast) window.cmsToast(result.error, 'error');
          return;
        }
        quill.insertEmbed(range.index, 'image', result.url, 'user');
        quill.setSelection(range.index + 1);
      });
      input.click();
    });
    bindQuillImageResize(quill);
  };

  /* คลิกรูปในเนื้อหา editor แล้วโชว์ toolbar ลอย (ซ้าย/กลาง/ขวา/เต็มความกว้าง/รีเซ็ต) + จุดลากมุมขวาล่าง
     สำหรับปรับขนาดอิสระ — ใช้ format 'width' ของ Image blot เดิมของ Quill (setAttribute จริงบน <img>) สำหรับ
     ขนาด และ format 'align' เดิม (ปุ่มเดียวกับ toolbar หลัก ใช้กับ heading/paragraph อยู่แล้ว) กับบรรทัดที่มี
     รูปอยู่สำหรับตำแหน่ง — ไม่ต้องเขียน Parchment format ใหม่เอง ผูกอัตโนมัติทุกจุดที่เรียก
     cmsBindQuillImageUpload() อยู่แล้ว (สินค้า/บทความ/section เพจ) ไม่ต้องแก้ไฟล์อื่นเพิ่ม */
  function bindQuillImageResize(quill) {
    var activeImg = null;

    var toolbar = document.createElement('div');
    toolbar.className = 'cms-img-toolbar';
    toolbar.hidden = true;
    toolbar.innerHTML =
      '<button type="button" data-align="left" title="ชิดซ้าย">⬅</button>' +
      '<button type="button" data-align="center" title="กึ่งกลาง">⬌</button>' +
      '<button type="button" data-align="right" title="ชิดขวา">➡</button>' +
      '<button type="button" data-align="full" title="เต็มความกว้าง">⛶</button>' +
      '<button type="button" data-action="reset" title="รีเซ็ตขนาด">↺</button>';
    document.body.appendChild(toolbar);

    var handle = document.createElement('div');
    handle.className = 'cms-img-resize-handle';
    handle.hidden = true;
    handle.title = 'ลากเพื่อปรับขนาด';
    document.body.appendChild(handle);

    function imageIndex(img) {
      var blot = window.Quill.find(img);
      return blot ? quill.getIndex(blot) : null;
    }

    function positionControls() {
      if (!activeImg || !activeImg.isConnected) {
        hideControls();
        return;
      }
      var rect = activeImg.getBoundingClientRect();
      toolbar.style.top = Math.max(4, rect.top - 40) + 'px';
      toolbar.style.left = rect.left + 'px';
      handle.style.top = rect.bottom - 9 + 'px';
      handle.style.left = rect.right - 9 + 'px';
    }

    function showControls(img) {
      activeImg = img;
      toolbar.hidden = false;
      handle.hidden = false;
      positionControls();
    }

    function hideControls() {
      activeImg = null;
      toolbar.hidden = true;
      handle.hidden = true;
    }

    quill.root.addEventListener('click', function (e) {
      if (e.target.tagName === 'IMG') {
        showControls(e.target);
      } else {
        hideControls();
      }
    });

    document.addEventListener('click', function (e) {
      if (!activeImg) return;
      if (e.target === activeImg || toolbar.contains(e.target) || handle.contains(e.target)) return;
      hideControls();
    }, true);

    window.addEventListener('scroll', function () { positionControls(); }, true);
    window.addEventListener('resize', positionControls);

    toolbar.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn || !activeImg) return;
      var idx = imageIndex(activeImg);
      if (idx == null) return;

      if (btn.dataset.action === 'reset') {
        quill.formatText(idx, 1, 'width', false, 'user');
      } else if (btn.dataset.align === 'full') {
        quill.formatText(idx, 1, 'width', '100%', 'user');
        quill.formatLine(idx, 1, 'align', false, 'user');
      } else {
        quill.formatLine(idx, 1, 'align', btn.dataset.align === 'left' ? false : btn.dataset.align, 'user');
      }
      setTimeout(positionControls, 0);
    });

    handle.addEventListener('mousedown', function (e) {
      e.preventDefault();
      if (!activeImg) return;
      var img = activeImg;
      var startX = e.clientX;
      var startWidth = img.getBoundingClientRect().width;

      function onMove(ev) {
        var newWidth = Math.max(40, Math.round(startWidth + (ev.clientX - startX)));
        img.setAttribute('width', String(newWidth));
        positionControls();
      }
      function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        var idx = imageIndex(img);
        if (idx != null) quill.formatText(idx, 1, 'width', img.getAttribute('width'), 'user');
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  }
})();
