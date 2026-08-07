---
type: source
title: "About Us Section - HTML+CSS"
created: 2026-07-17
updated: 2026-07-17
sources: ["raw/About Us Section - HTML+CSS (จากผู้ใช้).md"]
tags: ["wireframe", "css", "html"]
---

## ที่มา

ผู้ใช้สั่ง "เปลี่ยน section about เป็นตามนี้" พร้อมส่ง markup HTML + CSS เต็มสำหรับ section "About Us" ใหม่มาแทนที่ section "เกี่ยวกับเรา" เดิม (rev.5: photo panel + what-we-do row ภาษาอังกฤษ) — บันทึกต้นฉบับไว้ที่ `raw/About Us Section - HTML+CSS (จากผู้ใช้).md`

## สรุปเนื้อหา

**HTML**: 1 section ใหม่ `.about-section` (`id="about-us"`) แทนที่ section เดิมทั้งหมด — `.about-card` (การ์ดกระดาษพร้อมขอบหยักตกแต่ง) ประกอบด้วยป้าย "About Us", eyebrow "Our Story", หัวข้อ "CP B&F Company Limited", คำอธิบาย 2 ย่อหน้า (ประวัติบริษัท), highlight 3 สถิติ (ปีก่อตั้ง/เครือ/สายธุรกิจ), ป้ายกลม "CP B&F" มุมล่างขวา

**CSS**: token/reset/typography ส่วนใหญ่ซ้ำกับที่มีอยู่แล้วใน `design/style.css` + token ใหม่เฉพาะ about (`--about-container-width`, `--about-card-radius`, `--about-shadow`) + CSS component เต็มสำหรับ `.about-section`/`.about-card`/`.about-card__*`/`.about-highlight` พร้อม decorative pseudo-elements, responsive, accessibility

## จุดที่ต้องปรับก่อนใช้งานจริง (ตัดสินใจระหว่าง implement)

1. **เนื้อหาข้อเท็จจริงใหม่เกี่ยวกับบริษัท**: ย่อหน้าคำอธิบายระบุว่าบริษัทก่อตั้งปี 2016 และเป็นส่วนหนึ่งของเครือเจริญโภคภัณฑ์ (Charoen Pokphand Group) — **ข้อมูลนี้ไม่เคยปรากฏใน wiki มาก่อน** (ไม่มีใน [[cpbf.co.th (บริษัท)]] เดิม) ถือเป็นข้อมูลใหม่ที่ผู้ใช้ส่งมาโดยตรง จึงบันทึกเป็นข้อมูลยืนยันแล้ว (ตามหลักที่เคยทำกับข่าว/CEO ใน rev.6) แต่ **ยังไม่มี source อื่นยืนยันซ้ำ** — ควรตรวจสอบกับผู้ใช้อีกครั้งหากต้องใช้งานจริง (นำไปเพิ่มในหน้า [[cpbf.co.th (บริษัท)]] § ประวัติ)
2. **ใช้สีชุด `design/style.css` (non-CI)**: CSS ที่ส่งมาใช้ `--primary-color`/`--accent-pink`/`--bg-card` (ชุดสีที่ผู้ใช้ยืนยันไว้ตั้งแต่ rev.9) แทนที่จะเป็นตัวแปร CI ทางการ (`--skyblue` ฯลฯ) ที่ section เดิม (rev.5) เคยใช้ → ทำให้ section About Us ที่ implement ใหม่นี้เปลี่ยนจากใช้ CI ทางการ (`homepage-wireframe.html` inline `<style>`) ไปใช้ชุดสีใหม่ใน `design/style.css` เหมือน News/Contact/Our Business (rev.10-11) **⚠️ ทำให้ทุก section ของหน้ายกเว้น hero/footer ใช้สีชุดเดียวกันหมดแล้ว (สม่ำเสมอมากขึ้น) แต่ยังต่างจาก CI ทางการที่ hero section ยังใช้อยู่**
3. **ไม่ overwrite `.web-title`/`.web-description` ที่มีอยู่แล้ว**: CSS ที่ส่งมา redefine เป็นเวอร์ชัน fixed-size ง่ายกว่า → ไม่ใช้ตามหลักการเดิมตั้งแต่ rev.10 (คง `clamp()` responsive เดิมไว้) ใช้เฉพาะ CSS component ใหม่เฉพาะของ section นี้
4. **token ใหม่ที่ส่งมาซ้ำซ้อนกับที่มีอยู่แล้ว** → ไม่ overwrite เพิ่มเฉพาะ token ที่ยังไม่มี (`--about-container-width`, `--about-card-radius`, `--about-shadow`; ข้าม `--about-font` เพราะมี `--font-family` ทำหน้าที่เดียวกันอยู่แล้ว)
5. **eyebrow**: ใช้ class ร่วม `.section-eyebrow` ที่มีอยู่แล้ว (เพิ่ม `.about-card__eyebrow` เป็น class เสริมเผื่อต้อง override ตำแหน่งเฉพาะจุดในอนาคต) ตามแนวทางเดียวกับ News/Contact/Our Business
6. **nav link**: เปลี่ยน `<a href="#about">` เป็น `<a href="#about-us">` ให้ตรงกับ `id` ใหม่ของ section
7. **ลิงก์/route**: markup เดิมไม่มีปุ่ม CTA ใน section นี้ (ต่างจาก Our Business ที่มีปุ่ม "ดูรายละเอียด") จึงไม่มีประเด็น route สมมุติ

## ปรับแก้ตามภาพ screenshot จริงที่ผู้ใช้ส่งมา (2026-07-18)

ผู้ใช้ส่งภาพ screenshot ของการ render จริง (ไม่มี highlights grid ปรากฏ) พร้อมสั่ง "ปรับให้เป็นแบบนี้และเพิ่มปุ่ม 'อ่านเพิ่มเติม' สี #e91e63":

- **ตัด `.about-card__highlights`/`.about-highlight` (3 สถิติ) ออกทั้งหมด** — ไม่ปรากฏในภาพ screenshot ที่ผู้ใช้ส่งมา (ลบทั้ง HTML และ CSS ที่เกี่ยวข้อง รวม responsive override)
- **เพิ่มปุ่ม "อ่านเพิ่มเติม"** ท้ายย่อหน้าคำอธิบาย — ใช้ class ร่วม `.btn-accent` ที่มีอยู่แล้ว (สี `var(--accent-pink)` = `#e91e63` ตรงกับที่ผู้ใช้ระบุพอดี) แทนการสร้าง class สีใหม่ซ้ำซ้อน, ลิงก์เป็น anchor `#about-us` (ยังไม่มีหน้ารายละเอียดจริง)
- **ขยาย `.about-card__content` เป็น `max-width: 100%`** (เดิม 760px) — เพื่อให้ย่อหน้าข้อความ wrap กว้างเต็มการ์ดตามสัดส่วนในภาพ screenshot

ผลลัพธ์ implement เต็มดูที่ [[Wireframe หน้าแรก (Redesign cpbf.co.th)]] § rev.12
