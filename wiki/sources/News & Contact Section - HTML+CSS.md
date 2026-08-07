---
type: source
title: "News & Contact Section - HTML+CSS"
created: 2026-07-17
updated: 2026-07-17
sources: ["raw/News & Contact Section - HTML+CSS (จากผู้ใช้).md"]
tags: ["wireframe", "css", "html"]
---

## ที่มา

ผู้ใช้พิมพ์ส่ง markup HTML สำหรับ section ใหม่ 2 อัน (News & Event, Contact Us) พร้อม stylesheet เต็มตามหลัง ("โดยใช้ css นี้") เข้ามาในแชท เพื่อสั่งเพิ่มเข้า `design/homepage-wireframe.html` — บันทึกต้นฉบับไว้ที่ `raw/News & Contact Section - HTML+CSS (จากผู้ใช้).md`

## สรุปเนื้อหา

**HTML**: 2 section ใหม่ — `.news-section` (BEM class, การ์ด 3 ใบแบบ `.news-grid`/`.news-card`, การ์ดกลางมี `--featured` stagger) และ `.contact-section` (grid 3 คอลัมน์ intro/cta/panel + footer bar)

**CSS**: ขยายชุด design token เดิมจาก [[style.css - Global Style Variables]] (rev.9) เพิ่ม token ใหม่จำนวนมาก, global reset, redefine `.web-title`/`.web-description`/ปุ่ม ให้เต็มขึ้น, CSS component เต็มสำหรับทั้ง 2 section ใหม่, responsive breakpoint และ accessibility rules

## จุดที่ต้องปรับก่อนใช้งานจริง (ตัดสินใจระหว่าง implement)

1. **เนื้อหาข่าวเป็น placeholder ทั่วไป** (ไม่ใช่ข่าวจริงของ CP B&F, path รูปสมมุติที่ไม่มีอยู่จริง) → **แทนที่ด้วยข่าวจริง 3 รายการที่มีอยู่แล้วในระบบ** จาก [[ข่าวและกิจกรรม - รูปภาพและเนื้อหาข่าว]] (Beanie Coffee เปิดตัว / Kaset Fair / ตรุษจีน 2568) พร้อมรูปจริง `raw/assets/News/new1.jpeg`, `news2.jpeg`, `new3.jpeg` — เหตุผล: หลีกเลี่ยงการใช้ข้อมูลสมมุติทั้งที่มีข้อมูลจริงอยู่แล้ว (ตามกฎ CLAUDE.md ข้อ 4.1 "อย่าประดิษฐ์ข้อมูล")
2. **ข้อมูลติดต่อเป็น placeholder** (`hello@example.com`, `02-000-0000`, `www.example.com`, `Bangkok, Thailand`) — ยังไม่มีข้อมูลติดต่อจริงของ CP B&F ในระบบ wiki เลย จึง**เก็บ email/phone/ที่อยู่ไว้เป็น placeholder ตามเดิม** แต่**เปลี่ยน Website จาก `www.example.com` เป็น `www.cpbf.co.th`** เพราะเป็นโดเมนจริงที่รู้อยู่แล้ว (ไม่ใช่การเดา — คือเว็บไซต์ที่กำลัง redesign อยู่นี้เอง)
3. **class name `.news-grid`/`.news-card` ชนกับ CSS เดิม**ในบล็อก `<style>` inline ของ `homepage-wireframe.html` (จาก rev.6/6.1 ที่นิยาม `.news-grid`/`.news-card` ไว้คนละแบบ) → ลบ CSS เก่าที่ไม่ใช้แล้วออก เหลือ comment อ้างอิงว่าย้ายไปอยู่ `design/style.css` แทน
4. **route ลิงก์สมมุติ** `/contact`, `/news` → เปลี่ยนเป็น anchor ภายในหน้า `#contact-us`, `#news-events` เพราะเป็น static mockup หน้าเดียว ยังไม่มีหน้าจริงให้ลิงก์ไป
5. หัวข้อ section คงภาษาไทยเดิม "ข่าวสารและกิจกรรม" (ไม่ได้แปลตามต้นฉบับที่ใช้ "News & Event") ให้สอดคล้องกับชื่อ section เดิมของหน้า

ผลลัพธ์ implement เต็มดูที่ [[Wireframe หน้าแรก (Redesign cpbf.co.th)]] § News & Contact section rev.10
