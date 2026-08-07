---
type: source
title: "CI Guideline และ Reference Design"
created: 2026-07-17
updated: 2026-07-17
source: "ไฟล์ที่ผู้ใช้วางไว้ที่ raw/assets/CI/ และ raw/assets/ref/"
tags: ["cpbf", "design", "brand-guideline", "ci"]
---

## บริบท

ผู้ใช้วางไฟล์ Corporate Identity (CI) ทางการของ CP B&F ไว้ที่ `raw/assets/CI/` (ไฟล์ working file .ai/.psd, ฟอนต์, สี, โลโก้, VBL usage PDF จำนวนมาก) และภาพอ้างอิงสไตล์เว็บไซต์ที่ `raw/assets/ref/` (5 ไฟล์ .jpg)

ไฟล์ในโฟลเดอร์นี้ **จำนวนมากเป็นไฟล์งานภายใน** (.ai, .psd, screenshot ของ mood board, สต็อกภาพที่ designer เคยใช้อ้างอิง) ไม่ใช่ CI ทางการทั้งหมด — สรุปเฉพาะไฟล์ที่ให้ข้อมูลยืนยันได้จริงด้านล่าง

## ยืนยันชื่อบริษัทตามกฎหมาย

จาก `CP B&F_Font ENG & TH/Font TH/บริษัท ซีพี บีแอนด์เอฟ (ไทยแลนด์) จำกัด Certificate.jpg` (หนังสือรับรองการใช้งานฟอนต์ FC Gimmick ลงวันที่ 20 ก.ย. 2567):

> **ชื่อนิติบุคคลเต็ม: บริษัท ซีพี บีแอนด์เอฟ (ไทยแลนด์) จำกัด** (CP B&F (Thailand) Co., Ltd.)

ยังพบไฟล์ certificate อีกใบชื่อ "บริษัท วานิลลา แอนด์ เฟรนด์ จำกัด" ในโฟลเดอร์เดียวกัน — ⚠️ ยังไม่ทราบความสัมพันธ์กับ CP B&F (อาจเป็นชื่อเดิม/บริษัทในเครือ/เอเจนซี่ที่ขอลิขสิทธิ์ฟอนต์แทน) ไม่ฟันธง

## สีทางการ (จาก CP B&F_Color palettes/)

**Digital:**
- Primary — Positive Blue `#1B5EF9`
- Secondary (7 สี โทนน้ำเงิน-ฟ้า): `#1336CC`, `#5F8EFE`, `#5A72DB`, `#6FF1FF`, `#86CEE4`, `#3FC7FF`, `#27AAE1`
- Support: เหลือง `#FFE02F`, แดง `#FF242A`, ชมพู `#E975CD`, เขียว `#8CFE83`
- Neutral: `#333333`, `#666666`, `#C8C8C8`, `#EEEEEE`

**Print:** Primary = CPB&F Pantone 2388* (CMYK 100/60/0/0) — ใกล้เคียง digital primary

⚠️ นี่คือชุดสีทางการที่ถูกต้อง — **แทนที่ชุดสีที่เคยสมมุติไว้ก่อนหน้านี้** (primary `#135AF7`, accent เหลือง/ชมพู/ส้ม/มินต์ ที่คิดขึ้นเองใน [[Wireframe หน้าแรก (Redesign cpbf.co.th)]] rev.1-2)

## โลโก้ทางการ

ไฟล์ล่าสุด: `CP B&F_Logo AW/logo_Digital/AW_CPB&F logo RGB updated_29-10-24.png` (อัปเดต 29 ต.ค. 2567, พื้นหลังโปร่งใส) — เป็น wordmark "CPB&F" ตัวอักษร "CP" สีน้ำเงินเรียบ ต่อด้วยตรา (badge) รูปหยดน้ำสีน้ำเงินที่มี "B&F" สีขาวอยู่ข้างใน เครื่องหมาย & ถูกออกแบบเป็นทรงหยดน้ำเช่นกัน — ดีไซน์เดียวกับ `raw/assets/image/logo.webp` ที่ ingest ไว้ก่อนหน้า (ไม่ขัดแย้งกัน เป็นไฟล์คุณภาพสูงกว่า/เวอร์ชันทางการกว่า ควรใช้ไฟล์นี้แทน)

พบไอคอน "หยดน้ำ" (Drop) เดี่ยวๆ แยกไว้ที่ `CP B&F_Logo AW/Option Drop Icon/Drop-01.png` ถึง `Drop-11.png` — เป็นรูปทรงเรขาคณิตประจำแบรนด์ (มุมมน 3 มุม + 1 มุมแหลม) ใช้เป็น decorative shape ในดีไซน์ได้

## ฟอนต์ทางการ (จาก CP B&F_Font ENG & TH/)

- **ภาษาไทย (หัวเรื่อง/branding):** FC Gimmick [Non-commercial] — มี Certificate อนุญาตให้บริษัทใช้งานได้ (มีหลายน้ำหนัก Thin–Black) — ⚠️ เป็นไฟล์ .otf ไม่มีบน Google Fonts ต้อง self-host ถ้าจะใช้จริงบนเว็บ
- **ภาษาไทย (เนื้อหา/memo):** IBM Plex Sans Thai Looped (มีไฟล์ zip ในโฟลเดอร์ "Font TH For Memo")
- **English (หัวเรื่อง):** Bricolage Grotesque (มีทุกน้ำหนัก, มีบน Google Fonts ใช้งานง่ายกว่า FC Gimmick)
- ฟอนต์เสริมที่เห็นใน mood board งานเก่า: Montserrat, Nunito Bold, Myriad Pro, Euclid Circular A — ไม่ชัดเจนว่าเป็นฟอนต์บังคับหรือแค่ใช้ในงานเฉพาะกิจ

**การตัดสินใจสำหรับ wireframe:** ใช้ IBM Plex Sans Thai (ตามบรีฟเดิม ใกล้เคียง IBM Plex Sans Thai Looped ที่สุดและใช้งานผ่าน Google Fonts ได้ทันที) เป็นฟอนต์เนื้อหาไทยหลัก และเพิ่ม Bricolage Grotesque สำหรับหัวข้อ/คำภาษาอังกฤษ (ตาม CI จริง) — ยังไม่ได้ใช้ FC Gimmick เพราะต้อง self-host ไฟล์ฟอนต์ ต้องตัดสินใจเพิ่มถ้าต้องการความ authentic 100%

## Reference images (raw/assets/ref/, 5 ไฟล์ .jpg)

เป็นภาพตัวอย่างดีไซน์เว็บไซต์/พอร์ตโฟลิโอสไตล์ pop-art / bold-color-block ที่ไม่เกี่ยวกับ CP B&F โดยตรง (เป็นผลงานของ studio อื่น เช่น "Solar Pop Studio", "Mariana", "IT-Kids", เว็บจิตวิทยาภาษารัสเซีย, เว็บ parenting) — ใช้เป็น **mood/style reference** เท่านั้น ยืนยันทิศทาง "ตัวหนังสือใหญ่ตัวหนา + บล็อกสีสด + sticker/badge + layout ไม่สมมาตร" ที่ใช้อยู่แล้วใน wireframe เดิมสอดคล้องกับทิศทางนี้

## จุดที่ยังไม่ได้เปิดอ่านละเอียด (ข้อมูลเยอะมาก ข้ามไว้)

- ไฟล์ VBL Usage PDF (2 ไฟล์ ใหญ่เกิน 100MB อ่าน text ไม่ได้) — อาจมีกฎการใช้โลโก้/clear space/สิ่งที่ห้ามทำ ที่ยังไม่ได้ตรวจสอบ
- ไฟล์ .ai/.psd ทั้งหมด (เปิดไม่ได้ตรงๆ ด้วย tool นี้)
- `CP B&F_Powerpoint Guideline/`, `Animation CP B&F/`, `CP B&F_Logo AW/20240912_CP B&F_Portfolio&Architecture.pdf`

## หน้าที่เกี่ยวข้อง

- [[cpbf.co.th (บริษัท)]]
- [[Design Assets - Logo และ Hero Banner]]
- [[Wireframe หน้าแรก (Redesign cpbf.co.th)]]
