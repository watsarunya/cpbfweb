/* cms/social-links.js — จัดการ Footer > Social: ข้อความใต้โลโก้ (footer_settings) + ไอคอนโซเชียลสูงสุด
   6 อัน (social_links) — ดู cms/schema-social-links.sql — บันทึกทั้งหมดพร้อมกันทีเดียวผ่านปุ่มที่
   sticky bottom bar (pattern เดียวกับ cms/page-editor.html) */
(function () {
  var MAX_ITEMS = 6;
  var listEl = document.getElementById('socialList');
  var emptyState = document.getElementById('socialEmptyState');
  var cardTemplate = document.getElementById('socialCardTemplate');
  var addBtn = document.getElementById('addSocialBtn');
  var saveBtn = document.getElementById('saveAllBtn');
  var socialCountEl = document.getElementById('socialCount');

  var descriptionThInput = document.getElementById('descriptionTh');
  var descriptionEnInput = document.getElementById('descriptionEn');
  var descriptionThCount = document.getElementById('descriptionThCount');
  var descriptionEnCount = document.getElementById('descriptionEnCount');

  var settingsRowId = null; // id ของแถว footer_settings ที่มีอยู่แล้ว (ควรมีเสมอเพราะ migration seed ไว้ให้)
  var items = []; // { id|null, label, icon_url, link_url, is_active }
  var pendingDeleteIds = [];

  function updateCharCount(input, countEl) {
    countEl.textContent = String(input.value.length);
  }

  function render() {
    listEl.innerHTML = '';
    emptyState.hidden = items.length > 0;
    socialCountEl.textContent = items.length;
    addBtn.hidden = items.length >= MAX_ITEMS;

    items.forEach(function (item, index) {
      listEl.appendChild(buildCard(item, index));
    });
  }

  function buildCard(item, index) {
    var frag = cardTemplate.content.cloneNode(true);
    var card = frag.querySelector('.cms-social-card');

    var upBtn = card.querySelector('[data-action="up"]');
    var downBtn = card.querySelector('[data-action="down"]');
    upBtn.disabled = index === 0;
    downBtn.disabled = index === items.length - 1;
    upBtn.addEventListener('click', function () { moveItem(index, -1); });
    downBtn.addEventListener('click', function () { moveItem(index, 1); });

    var dropzone = card.querySelector('[data-role="dropzone"]');
    var fileInput = card.querySelector('[data-role="file-input"]');
    var urlInput = card.querySelector('[data-role="url-input"]');
    urlInput.value = item.icon_url || '';
    window.cmsBindImageUpload({
      dropzone: dropzone,
      fileInput: fileInput,
      urlInput: urlInput,
    });
    // ⚠️ cmsBindImageUpload ตั้งค่า urlInput.value ให้ตรงๆ หลังอัปโหลดสำเร็จ (ไม่ใช่ผู้ใช้พิมพ์เอง) การตั้งค่า
    // .value ผ่าน JS แบบนี้ไม่ trigger 'input' event ตามธรรมชาติของ browser เลย — ฟัง 'input' อย่างเดียวจะพลาด
    // ค่าที่เพิ่งอัปโหลดไป (เจอบั๊กจริง: อัปโหลดไอคอนสำเร็จ พรีวิวขึ้นถูกต้อง แต่กด "บันทึก" แล้วขึ้น error
    // ว่ายังไม่ได้อัปโหลดไอคอน เพราะ item.icon_url ไม่เคยถูกอัปเดตเลย) — เก็บ reference ของ input ไว้ใน item
    // แทน แล้วไปอ่านค่าจริงจาก DOM ตรงๆ อีกที (syncIconUrls()) ก่อน validate/save ทุกครั้งแทนที่จะพึ่ง event
    item._urlInputEl = urlInput;

    var labelInput = card.querySelector('[data-role="label-input"]');
    labelInput.value = item.label || '';
    labelInput.addEventListener('input', function () {
      item.label = labelInput.value;
    });

    var linkInput = card.querySelector('[data-role="link-input"]');
    linkInput.value = item.link_url || '';
    linkInput.addEventListener('input', function () {
      item.link_url = linkInput.value.trim();
    });

    var toggle = card.querySelector('[data-action="toggle-active"]');
    toggle.classList.toggle('is-on', item.is_active);
    toggle.setAttribute('aria-label', item.is_active ? 'ปิดใช้งาน' : 'เปิดใช้งาน');
    toggle.addEventListener('click', function () {
      item.is_active = !item.is_active;
      toggle.classList.toggle('is-on', item.is_active);
      toggle.setAttribute('aria-label', item.is_active ? 'ปิดใช้งาน' : 'เปิดใช้งาน');
    });

    card.querySelector('[data-action="delete"]').addEventListener('click', function () {
      if (!window.confirm('ลบช่องทาง "' + (item.label || 'นี้') + '" ออกจากรายการ?')) return;
      if (item.id) pendingDeleteIds.push(item.id);
      items.splice(items.indexOf(item), 1);
      render();
    });

    return card;
  }

  function moveItem(index, delta) {
    var target = index + delta;
    if (target < 0 || target >= items.length) return;
    var tmp = items[index];
    items[index] = items[target];
    items[target] = tmp;
    render();
  }

  function addItem() {
    if (items.length >= MAX_ITEMS) return;
    items.push({ id: null, label: '', icon_url: '', link_url: '', is_active: true });
    render();
  }

  async function loadData() {
    var [{ data: settings, error: settingsError }, { data: socials, error: socialsError }] = await Promise.all([
      window.cmsSupabase.from('footer_settings').select('*').eq('key', 'footer').maybeSingle(),
      window.cmsSupabase.from('social_links').select('*').order('sort_order', { ascending: true }),
    ]);

    if (settingsError || !settings) {
      window.cmsToast('โหลดข้อมูล footer ไม่สำเร็จ: ' + (settingsError ? settingsError.message : 'ไม่พบข้อมูล'), 'error');
    } else {
      settingsRowId = settings.id;
      descriptionThInput.value = settings.description_th || '';
      descriptionEnInput.value = settings.description_en || '';
      updateCharCount(descriptionThInput, descriptionThCount);
      updateCharCount(descriptionEnInput, descriptionEnCount);
    }

    if (socialsError) {
      window.cmsToast('โหลดไอคอนโซเชียลไม่สำเร็จ: ' + socialsError.message, 'error');
    } else {
      items = (socials || []).map(function (row) {
        return {
          id: row.id,
          label: row.label,
          icon_url: row.icon_url,
          link_url: row.link_url,
          is_active: row.is_active,
        };
      });
    }

    render();
  }

  // อ่านค่าไอคอนล่าสุดจาก DOM ตรงๆ (ดูหมายเหตุที่ item._urlInputEl ใน buildCard() — กันพลาดค่าที่เพิ่ง
  // อัปโหลดเสร็จซึ่งไม่ trigger 'input' event)
  function syncIconUrls() {
    items.forEach(function (item) {
      if (item._urlInputEl) item.icon_url = item._urlInputEl.value.trim();
    });
  }

  async function saveAll() {
    syncIconUrls();

    var missing = items.some(function (item) {
      return !item.label.trim() || !item.icon_url.trim() || !item.link_url.trim();
    });
    if (missing) {
      window.cmsToast('กรุณากรอกชื่อช่องทาง/อัปโหลดไอคอน/ระบุลิงก์ให้ครบทุกช่องทางก่อนบันทึก', 'error');
      return;
    }

    saveBtn.disabled = true;
    saveBtn.textContent = 'กำลังบันทึก...';

    // 1) บันทึกข้อความ footer_settings
    if (settingsRowId) {
      var { error: settingsError } = await window.cmsSupabase
        .from('footer_settings')
        .update({
          description_th: descriptionThInput.value.slice(0, 100),
          description_en: descriptionEnInput.value.slice(0, 100),
        })
        .eq('id', settingsRowId);

      if (settingsError) {
        saveBtn.disabled = false;
        saveBtn.textContent = 'บันทึก';
        window.cmsToast('บันทึกข้อความ footer ไม่สำเร็จ: ' + settingsError.message, 'error');
        return;
      }
    }

    // 2) ลบรายการที่ถูกกดลบไว้ก่อนเสมอ (กันชนโควตาสูงสุด 6 รายการตอน insert รายการใหม่)
    if (pendingDeleteIds.length > 0) {
      var { error: deleteError } = await window.cmsSupabase
        .from('social_links')
        .delete()
        .in('id', pendingDeleteIds);

      if (deleteError) {
        saveBtn.disabled = false;
        saveBtn.textContent = 'บันทึก';
        window.cmsToast('ลบช่องทางเดิมไม่สำเร็จ: ' + deleteError.message, 'error');
        return;
      }
      pendingDeleteIds = [];
    }

    // 3) update รายการเดิม + insert รายการใหม่ ตามลำดับปัจจุบันในหน้าจอ
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var patch = {
        label: item.label.trim(),
        icon_url: item.icon_url.trim(),
        link_url: item.link_url.trim(),
        is_active: item.is_active,
        sort_order: i,
      };

      if (item.id) {
        var { error: updateError } = await window.cmsSupabase.from('social_links').update(patch).eq('id', item.id);
        if (updateError) {
          saveBtn.disabled = false;
          saveBtn.textContent = 'บันทึก';
          window.cmsToast('บันทึก "' + item.label + '" ไม่สำเร็จ: ' + updateError.message, 'error');
          return;
        }
      } else {
        var { data: inserted, error: insertError } = await window.cmsSupabase
          .from('social_links')
          .insert(patch)
          .select('id')
          .single();
        if (insertError) {
          saveBtn.disabled = false;
          saveBtn.textContent = 'บันทึก';
          window.cmsToast('เพิ่ม "' + item.label + '" ไม่สำเร็จ: ' + insertError.message, 'error');
          return;
        }
        item.id = inserted.id;
      }
    }

    saveBtn.disabled = false;
    saveBtn.textContent = 'บันทึก';
    window.cmsToast('บันทึกข้อมูลสำเร็จ', 'success');
  }

  descriptionThInput.addEventListener('input', function () { updateCharCount(descriptionThInput, descriptionThCount); });
  descriptionEnInput.addEventListener('input', function () { updateCharCount(descriptionEnInput, descriptionEnCount); });
  addBtn.addEventListener('click', addItem);
  saveBtn.addEventListener('click', saveAll);

  document.addEventListener('DOMContentLoaded', async function () {
    var session = await window.cmsRequireAuth();
    if (!session) return;
    await loadData();
  });
})();
