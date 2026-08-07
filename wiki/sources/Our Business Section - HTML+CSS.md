---
type: source
title: "Our Business Section - HTML+CSS"
created: 2026-07-17
updated: 2026-07-17
sources: ["raw/Our Business Section - HTML+CSS (จากผู้ใช้).md"]
tags: ["wireframe", "css", "html"]
---

## ที่มา

ผู้ใช้สั่ง (1) ลบ section "ธุรกิจของเรา" (`id="business"`, bento grid) และ (2) ปรับ section "Our Services" (`id="services"`) ใหม่ตาม markup HTML + CSS เต็มที่ส่งมา (คอมเมนต์ต้นฉบับระบุ "Section 3: Our Business") — บันทึกต้นฉบับไว้ที่ `raw/Our Business Section - HTML+CSS (จากผู้ใช้).md`

## สรุปเนื้อหา

**HTML**: 1 section ใหม่ `.business-section` (`id="our-business"`) แทนที่ทั้งสอง section เดิม — header (eyebrow/title/intro) + `.business-grid` การ์ด 4 ใบ (BEM, theme modifier 4 แบบ) เนื้อหาการ์ดตรงกับบริการจริง 4 รายการเดิม

**CSS**: token/reset/typography/button ที่ผู้ใช้ส่งมาเป็นส่วนใหญ่ซ้ำกับที่มีอยู่แล้วใน `design/style.css` (มีจุดต่างเล็กน้อยในค่า `--border-color` และ token ที่ขาดหาย) + CSS component เต็มสำหรับ `.business-section`/`.business-grid`/`.business-card__*` พร้อม stagger transform, responsive, accessibility

## จุดที่ต้องปรับก่อนใช้งานจริง (ตัดสินใจระหว่าง implement)

1. **ตีความคำสั่งว่าเป็นการยุบรวม 2 section เดิมเป็น 1 section ใหม่**: markup ที่ผู้ใช้ส่งมาใช้ class `business-section` (ไม่ใช่ `services`) แต่คำสั่งข้อ 2 บอกว่า "ปรับ section Our Services" — เนื้อหาการ์ดตรงกับ 4 บริการเดิมทุกตัวอักษร จึงตีความว่า: ลบ section "ธุรกิจของเรา" (bento) ตามคำสั่งข้อ 1 ทิ้งไปเลย, และแทนที่ section "Our Services" เดิมด้วย markup ใหม่นี้ (ซึ่งใช้กรอบนำเสนอ/ชื่อ "Our Business" แทน) — **ยังไม่ได้ยืนยันการตีความนี้กับผู้ใช้ตรงๆ**
2. **เนื้อหาการ์ดใช้ของจริงเดิม**: คำอธิบายบริการทั้ง 4 คัดลอกมาจาก [[Our Services - เนื้อหาบริการ 4 รายการ]] ตรงตัว (ไม่ใช่เนื้อหาใหม่) — ไม่ต้องแทนที่ด้วยข้อมูลอื่น
3. **ลิงก์ปุ่ม "ดูรายละเอียด" เป็น route สมมุติ** (`/services/coffee-roasting` ฯลฯ) → เปลี่ยนเป็น anchor ภายในหน้า `#our-business` เพราะเป็น static mockup หน้าเดียว ยังไม่มีหน้ารายละเอียดบริการจริง
4. **`:root` token ใหม่ที่ส่งมาซ้ำซ้อนกับที่มีอยู่แล้ว** ใน `design/style.css` (rev.9-10) → ไม่ overwrite ทับ เพิ่มเฉพาะ token ที่ยังไม่มี (skip `--business-font`/`--business-container` เพราะมี `--font-family`/`--container-width` อยู่แล้วที่ทำหน้าที่เดียวกัน)
5. **`.web-title`/`.web-description`/`.highlight-text`/`.btn-primary`/`.btn-accent` ที่ส่งมาเป็นเวอร์ชันง่ายกว่า/ไม่ตรงกับที่มีอยู่แล้ว** (เช่น `.web-title` แบบ fixed font-size แทน `clamp()` responsive) → **ไม่ overwrite** ตามหลักการเดิมตั้งแต่ rev.10 ที่เก็บ utility class ที่มีอยู่แล้วไว้ (ป้องกันไม่ให้ section อื่นที่ใช้ class เดียวกันเสียหาย) — ใช้เฉพาะ CSS component ใหม่เฉพาะของ section นี้ (`.business-section`, `.business-grid`, `.business-card__*`)
6. **eyebrow span**: ต้นฉบับใช้ class เฉพาะ `business-section__eyebrow` แต่หน้าอื่น (News/Contact) ใช้ class ร่วม `.section-eyebrow` ที่มีอยู่แล้ว → เปลี่ยนมาใช้ `.section-eyebrow` ร่วมกันเพื่อความสม่ำเสมอ (ตามที่ News/Contact section ทำ)
7. **`.stats-strip`/`.stat-chip`** ที่เคยอยู่ใน section "Our Services" เดิม (4 สถิติ: สายธุรกิจหลัก/ควบคุมคุณภาพ/สั่งซื้อออนไลน์/OEM มาตรฐานสากล) **ไม่มีอยู่ใน markup ใหม่ที่ผู้ใช้ส่งมา** → ถูกตัดออกไปพร้อมกับการยุบรวม section (ยังไม่ได้ยืนยันกับผู้ใช้ว่าตั้งใจตัดสถิติชุดนี้ทิ้งหรือไม่)
8. **nav link**: เดิมมี 2 ลิงก์แยก `#business` "ธุรกิจของเรา" และ `#services` "บริการของเรา" → รวมเหลือลิงก์เดียวชี้ไป `#our-business` ใช้ label "ธุรกิจของเรา" (ตรงกับหัวข้อ section ใหม่มากกว่า)

ผลลัพธ์ implement เต็มดูที่ [[Wireframe หน้าแรก (Redesign cpbf.co.th)]] § rev.11
