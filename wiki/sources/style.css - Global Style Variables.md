---
type: source
title: "style.css - Global Style Variables"
created: 2026-07-17
updated: 2026-07-17
sources: []
tags: ["css", "design-system"]
---

## ต้นฉบับ

- `raw/style.css - Global Style Variables (จากผู้ใช้).md` — CSS ที่ผู้ใช้ส่งมาในแชท (2026-07-17) พร้อมคำสั่ง "create body style.css ของเว็บไซต์" — สร้างไฟล์จริงที่ `design/style.css`

## สรุปเนื้อหา

ไฟล์ CSS ระดับ global กำหนด:

- **ตัวแปรสี (`:root`):** `--primary-color:#135AF7`, `--accent-pink:#E91E63`, `--vibrant-yellow:#FFFDE7`, `--bg-main:#FFFFFF`, `--bg-card:#FFFDE7`, `--font-title:#333333`, `--font-desc:#666666`, `--font-light:#FFFFFF`
- **`body`** พื้นฐาน: พื้นหลังขาว, ฟอนต์ `'Inter','Kanit',sans-serif`
- **Typography utility:** `.web-title` (2.5rem, weight 800), `.web-description` (1.1rem, สีเทา), `.highlight-text` (ไฮไลต์เหลือง `#FFEB3B`)
- **Button utility:** `.btn-primary` (พื้น primary-color, hover เข้มขึ้นเป็น `#0A46D3`), `.btn-accent` (พื้น accent-pink, hover เข้มขึ้นเป็น `#C2185B`) — ทั้งคู่ pill-shape (`border-radius:50px`) พร้อม shadow และ hover lift (`translateY(-2px)`)

## ⚠️ ขัดแย้งกับ CI ทางการที่มีอยู่แล้ว

- `--primary-color:#135AF7` คือสีเดิม (placeholder) ที่ [[Wireframe หน้าแรก (Redesign cpbf.co.th)]] เคยใช้ก่อน rev.3 แล้วถูกแทนที่ด้วยสี CI ทางการ `#1B5EF9` (ยืนยันจาก [[CI Guideline และ Reference Design]]) — ไฟล์นี้จึงดึงกลับไปใช้สีเดิมที่ไม่ใช่ CI ทางการ
- `--accent-pink:#E91E63`, `--vibrant-yellow`/`--bg-card:#FFFDE7`, ไฮไลต์ `#FFEB3B` ไม่มีอยู่ใน CI palette ทางการที่บันทึกไว้ใน [[cpbf.co.th (บริษัท)]] § Brand System ทางการ (Primary `#1B5EF9`, Secondary 7 สี, Support เหลือง `#FFE02F`/แดง `#FF242A`/ชมพู `#E975CD`/เขียว `#8CFE83`, Neutral 4 สี)
- ยังไม่ได้ผูกไฟล์นี้เข้ากับ `design/homepage-wireframe.html` ด้วย `<link rel="stylesheet">` เพราะสีขัดกับที่ใช้อยู่ในหน้านั้น — รอผู้ใช้ยืนยันทิศทางสี
