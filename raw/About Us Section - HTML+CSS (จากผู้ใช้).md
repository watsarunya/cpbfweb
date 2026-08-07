---
type: raw-source
title: "About Us Section - HTML+CSS (จากผู้ใช้)"
captured: 2026-07-17
---

> หมายเหตุ: ไฟล์นี้บันทึกเนื้อหา HTML+CSS ที่ผู้ใช้พิมพ์ส่งเข้ามาในแชทเพื่อสั่ง "เปลี่ยน section about เป็นตามนี้" — เป็นการสรุปโครงสร้าง/เนื้อหาต้นฉบับที่ผู้ใช้ส่งมา ไม่ใช่ transcript ตัวอักษรต่อตัวอักษร 100%

## คำสั่งผู้ใช้

"เปลี่ยน section about เป็นตามนี้" ตามด้วย markup HTML สำหรับ section ใหม่ (คอมเมนต์ในต้นฉบับระบุ "Section 2: About Us") พร้อม stylesheet เต็ม

## Section 2: About Us (HTML ต้นฉบับ — โครงสร้าง)

`<section class="about-section" id="about-us">` ประกอบด้วย `.about-section__container` > `.about-card` (การ์ดกระดาษขนาดใหญ่ ตกแต่งขอบบน-ล่างแบบฉีก/หยักด้วย `::before`/`::after`):

- `.about-card__label` — ป้ายกลม/pill สีชมพู "About Us" วางแบบ absolute มุมซ้ายบน หมุน -2deg
- `.about-card__content`: eyebrow "Our Story", `<h2 class="web-title about-card__title">CP B&amp;F Company Limited</h2>`, เส้นแบ่ง (`.about-card__divider`), ย่อหน้าคำอธิบาย 2 ย่อหน้าเป็นภาษาอังกฤษ — **เนื้อหาใหม่ที่ผู้ใช้ส่งมา**: ก่อตั้งปี 2016 เป็นส่วนหนึ่งของเครือเจริญโภคภัณฑ์ (Charoen Pokphand Group) เป็นผู้เชี่ยวชาญด้านเครื่องดื่มและอาหารให้ร้านอาหาร/โรงแรม/คาเฟ่/ร้านค้าปลีก เน้นการดำเนินงานที่เป็นมิตรต่อสิ่งแวดล้อมและมาตรฐานการผลิตระดับสากล
- `.about-card__highlights` — grid 3 คอลัมน์ของ `.about-highlight` (สถิติ): "2016 / Established", "CP / Charoen Pokphand Group", "F&amp;B / Beverage & Food Specialist"
- `.about-card__badge` — ป้ายกลมมุมขวาล่าง "CP B&amp;F" หมุน 8deg

## CSS ที่ผู้ใช้ส่งมา ("Global Variables" + "Section 2: About Us")

- `@import` Google Fonts (Inter + Kanit) — ซ้ำกับที่มีอยู่แล้วใน `design/style.css`
- `:root` ชุดใหม่ที่ผู้ใช้ส่งมาเป็นส่วนย่อยของ token ที่มีอยู่แล้วใน `design/style.css` (ชื่อ token ซ้ำกันเกือบทั้งหมด เช่น `--primary-color`, `--accent-pink`, `--bg-card`) แต่เพิ่ม token ใหม่เฉพาะ about (`--about-font`, `--about-container-width: 1240px`, `--about-card-radius: 10px`, `--about-shadow`)
- Redefine `.web-title`/`.web-description` ด้วยค่าที่ง่ายกว่า/ไม่ตรงกับของเดิม (เช่น `.web-title{font-size:2.5rem}` แบบ fixed แทน `clamp()` responsive ที่ใช้อยู่ใน `design/style.css` ตั้งแต่ rev.9-11)
- CSS component เต็มสำหรับ "Section 2: About Us" (`.about-section` พร้อม `::before` dot-pattern background และ `::after` pink blur circle decoration, `.about-section__container`, `.about-card` พร้อม `::before`/`::after` scalloped paper-edge, `.about-card__label`, `.about-card__eyebrow`/`__title`/`__divider`/`__description`, `.about-card__highlights`/`.about-highlight__number`/`__text`, `.about-card__badge`, hover transition), responsive breakpoint 1023px/767px/390px, `prefers-reduced-motion`

## หมายเหตุการนำไปใช้งาน (ดูรายละเอียดเต็มใน wiki)

ดู [[About Us Section - HTML+CSS]] (wiki/sources) และ [[Wireframe หน้าแรก (Redesign cpbf.co.th)]] § rev.12 สำหรับการตัดสินใจปรับก่อนใช้งานจริงในหน้า (ไม่ overwrite utility class ที่มีอยู่แล้ว, เพิ่มเฉพาะ token ใหม่ที่ยังไม่มี, การใช้สีชุด `design/style.css` แทน CI ทางการ, เนื้อหาข้อเท็จจริงใหม่เรื่องปีก่อตั้ง/เครือ CP ที่ต้องยืนยัน ฯลฯ)
