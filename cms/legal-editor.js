/* cms/legal-editor.js — จัดการหน้ากฎหมายทีละหน้า (นโยบายความเป็นส่วนตัว / ข้อกำหนดการใช้งาน)
   หน้าเดียวใช้ซ้ำสำหรับทั้ง 2 เมนู แยกด้วย query string ?key=privacy-policy|terms-of-use
   (pattern เดียวกับ cms/page-editor.html?id=<uuid> — เนื้อหา/โครงสร้างเหมือนกันทุกประการ ต่างแค่ข้อมูล)
   ต่อกับตาราง legal_pages/legal_page_versions — ดู cms/schema-legal-pages.sql */
(function () {
  var PAGES_TABLE = 'legal_pages';
  var VERSIONS_TABLE = 'legal_page_versions';
  var VALID_KEYS = ['privacy-policy', 'terms-of-use'];

  var pageKey = new URLSearchParams(window.location.search).get('key');
  if (VALID_KEYS.indexOf(pageKey) === -1) {
    window.location.href = 'pages.html';
    return;
  }

  var row = null; // แถวปัจจุบันจาก legal_pages
  var historyCount = 0;
  var quillTh = null;
  var quillEn = null;

  var breadcrumbEl = document.getElementById('legalPageBreadcrumb');
  var titleEl = document.getElementById('legalPageTitle');
  var metaBottomEl = document.getElementById('legalPageMetaBottom');
  var versionCountEl = document.getElementById('versionCount');
  var saveBtn = document.getElementById('saveBtn');
  var historyOverlay = document.getElementById('legalHistoryModalOverlay');
  var historyTitle = document.getElementById('legalHistoryModalTitle');
  var historyBody = document.getElementById('legalHistoryModalBody');

  function formatDateTime(iso) {
    if (!iso) return '–';
    var d = new Date(iso);
    return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'short', day: 'numeric' }) +
      ' ' + d.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  }

  function buildMetaText(r) {
    var who = r.updated_by_email || 'ไม่ทราบผู้แก้ไข';
    return 'อัปเดตล่าสุด: ' + formatDateTime(r.updated_at) + ' โดย ' + who + ' • เวอร์ชัน ' + r.version;
  }

  function applyMeta() {
    var text = buildMetaText(row);
    metaBottomEl.textContent = text;
    versionCountEl.textContent = historyCount;
  }

  function markActiveSidebarLink() {
    var link = document.querySelector('.cms-nav__item[data-legal-key="' + pageKey + '"]');
    if (link) link.classList.add('is-active');
  }

  async function fetchHistoryCount(legalPageId) {
    var { count, error } = await window.cmsSupabase
      .from(VERSIONS_TABLE)
      .select('id', { count: 'exact', head: true })
      .eq('legal_page_id', legalPageId);
    if (error) return 0;
    return count || 0;
  }

  async function loadPage() {
    var { data, error } = await window.cmsSupabase
      .from(PAGES_TABLE)
      .select('*')
      .eq('page_key', pageKey)
      .maybeSingle();

    if (error || !data) {
      window.cmsToast('โหลดข้อมูลไม่สำเร็จ: ' + (error ? error.message : 'ไม่พบข้อมูล'), 'error');
      return;
    }

    row = data;
    breadcrumbEl.textContent = row.title_th;
    titleEl.textContent = row.title_th + ' / ' + (row.title_en || '');
    document.title = row.title_th + ' — CP B&F CMS';

    quillTh = new Quill(document.getElementById('editorTh'), {
      theme: 'snow',
      formats: window.CMS_QUILL_FORMATS,
      modules: { toolbar: window.CMS_QUILL_TOOLBAR },
    });
    quillTh.clipboard.dangerouslyPasteHTML(row.content_th || '');
    window.cmsBindQuillImageUpload(quillTh);

    quillEn = new Quill(document.getElementById('editorEn'), {
      theme: 'snow',
      formats: window.CMS_QUILL_FORMATS,
      modules: { toolbar: window.CMS_QUILL_TOOLBAR },
    });
    quillEn.clipboard.dangerouslyPasteHTML(row.content_en || '');
    window.cmsBindQuillImageUpload(quillEn);

    historyCount = await fetchHistoryCount(row.id);
    applyMeta();
  }

  async function save() {
    if (!row) return;

    // ดึง session สดๆ ตอนกดบันทึกเสมอ (ไม่ใช้ค่าที่ cache ไว้ตอนโหลดหน้า) กันปัญหาอีเมลผู้แก้ไขไม่ถูกต้อง
    // ถ้า session ถูกต่ออายุ/เปลี่ยนระหว่างเปิดหน้าค้างไว้นาน
    var { data: { session } } = await window.cmsSupabase.auth.getSession();
    if (!session || !session.user || !session.user.email) {
      window.cmsToast('ไม่พบอีเมลผู้ใช้ในเซสชันปัจจุบัน กรุณาล็อกอินใหม่แล้วลองอีกครั้ง', 'error');
      return;
    }
    var editorEmail = session.user.email;

    saveBtn.disabled = true;
    saveBtn.textContent = 'กำลังบันทึก...';

    // 1) เก็บเนื้อหา "ก่อนแก้ไขรอบนี้" ไว้เป็นประวัติก่อนเสมอ (append-only)
    var { error: versionError } = await window.cmsSupabase.from(VERSIONS_TABLE).insert({
      legal_page_id: row.id,
      page_key: row.page_key,
      version: row.version,
      title_th: row.title_th,
      title_en: row.title_en,
      content_th: row.content_th,
      content_en: row.content_en,
      updated_at: row.updated_at,
      updated_by_email: row.updated_by_email,
    });

    if (versionError) {
      saveBtn.disabled = false;
      saveBtn.textContent = 'บันทึก';
      window.cmsToast('บันทึกประวัติเวอร์ชันไม่สำเร็จ: ' + versionError.message, 'error');
      return;
    }

    // 2) อัปเดตเนื้อหาปัจจุบัน + version+1 + ผู้แก้ไข/เวลาล่าสุด
    var patch = {
      content_th: quillTh.root.innerHTML,
      content_en: quillEn.root.innerHTML,
      version: row.version + 1,
      updated_at: new Date().toISOString(),
      updated_by_email: editorEmail,
    };

    var { error: updateError } = await window.cmsSupabase
      .from(PAGES_TABLE)
      .update(patch)
      .eq('id', row.id);

    saveBtn.disabled = false;
    saveBtn.textContent = 'บันทึก';

    if (updateError) {
      window.cmsToast('บันทึกไม่สำเร็จ: ' + updateError.message, 'error');
      return;
    }

    // ใช้ค่าที่เพิ่งเขียนไปตรงๆ แทนการ select กลับมาใหม่ (กันเคสที่ round-trip อ่านค่าไม่ทันหรือถูก
    // cache ค้าง ทำให้อีเมลผู้แก้ไข/เวอร์ชันที่แสดงผลไม่ตรงกับที่บันทึกจริง)
    row = Object.assign({}, row, patch);
    historyCount += 1;
    applyMeta();
    window.cmsToast('บันทึกข้อมูลสำเร็จ', 'success');
  }

  async function openHistory() {
    if (!row) return;
    historyTitle.textContent = 'ประวัติเวอร์ชัน — ' + row.title_th;
    historyBody.innerHTML = '<p class="cms-section-hint">กำลังโหลด...</p>';
    historyOverlay.hidden = false;

    var { data, error } = await window.cmsSupabase
      .from(VERSIONS_TABLE)
      .select('*')
      .eq('legal_page_id', row.id)
      .order('version', { ascending: false });

    if (error) {
      historyBody.innerHTML = '<p class="cms-error-text">โหลดประวัติไม่สำเร็จ: ' + error.message + '</p>';
      return;
    }

    if (!data || data.length === 0) {
      historyBody.innerHTML = '<p class="cms-empty">ยังไม่มีประวัติการแก้ไข — เวอร์ชันปัจจุบันคือเวอร์ชันแรก</p>';
      return;
    }

    historyBody.innerHTML = '';
    data.forEach(function (v) {
      var item = document.createElement('div');
      item.className = 'cms-legal-history-item';

      var head = document.createElement('div');
      head.className = 'cms-legal-history-item__head';
      head.innerHTML =
        '<strong>เวอร์ชัน ' + v.version + '</strong>' +
        '<span>' + formatDateTime(v.updated_at) + ' โดย ' + (v.updated_by_email || 'ไม่ทราบผู้แก้ไข') + '</span>';

      var toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'cms-btn';
      toggleBtn.textContent = 'ดูเนื้อหา';

      var contentWrap = document.createElement('div');
      contentWrap.className = 'cms-legal-history-item__content';
      contentWrap.hidden = true;
      var sanitize = window.DOMPurify ? window.DOMPurify.sanitize.bind(window.DOMPurify) : function (h) { return h; };
      contentWrap.innerHTML =
        '<p class="cms-section-hint">TH</p><div class="cms-legal-history-item__body">' + sanitize(v.content_th || '') + '</div>' +
        '<p class="cms-section-hint">EN</p><div class="cms-legal-history-item__body">' + sanitize(v.content_en || '') + '</div>';

      toggleBtn.addEventListener('click', function () {
        contentWrap.hidden = !contentWrap.hidden;
        toggleBtn.textContent = contentWrap.hidden ? 'ดูเนื้อหา' : 'ซ่อนเนื้อหา';
      });

      head.appendChild(toggleBtn);
      item.appendChild(head);
      item.appendChild(contentWrap);
      historyBody.appendChild(item);
    });
  }

  function closeHistory() {
    historyOverlay.hidden = true;
  }

  document.getElementById('historyBtn').addEventListener('click', openHistory);
  document.getElementById('legalHistoryModalClose').addEventListener('click', closeHistory);
  historyOverlay.addEventListener('click', function (e) {
    if (e.target === historyOverlay) closeHistory();
  });
  saveBtn.addEventListener('click', save);

  document.addEventListener('DOMContentLoaded', async function () {
    var session = await window.cmsRequireAuth();
    if (!session) return;

    markActiveSidebarLink();
    await loadPage();
  });
})();
