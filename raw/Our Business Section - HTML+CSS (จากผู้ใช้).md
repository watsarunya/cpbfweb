---
type: raw-source
title: "Our Business Section - HTML+CSS (จากผู้ใช้)"
captured: 2026-07-17
---

> หมายเหตุ: ไฟล์นี้บันทึกเนื้อหา HTML+CSS ที่ผู้ใช้พิมพ์ส่งเข้ามาในแชทเพื่อสั่ง (1) ลบ section "ธุรกิจของเรา" (BUSINESS, `id="business"`) และ (2) ปรับ section "Our Services" (`id="services"`) ใหม่ตาม markup ที่ส่งมา — เป็นการสรุปโครงสร้าง/เนื้อหาต้นฉบับที่ผู้ใช้ส่งมา ไม่ใช่ transcript ตัวอักษรต่อตัวอักษร 100%

## คำสั่งผู้ใช้

1. "ลบ section BUSINESS ธุรกิจของเรา"
2. "ปรับ section Our Services เป็นตามนี้" ตามด้วย markup HTML สำหรับ section ใหม่ (คอมเมนต์ในต้นฉบับระบุ "Section 3: Our Business") พร้อม stylesheet เต็ม

## Section 3: Our Business (HTML ต้นฉบับ — โครงสร้าง)

`<section class="business-section" id="our-business">` ประกอบด้วย:
- `.business-section__header`: eyebrow "What we do", `<h2 class="web-title business-section__title">Our Business</h2>`, `<p class="web-description business-section__intro">เราพร้อมสนับสนุนผู้ประกอบการตั้งแต่การพัฒนาผลิตภัณฑ์ กระบวนการผลิต ไปจนถึงการส่งมอบสินค้าและบริการอย่างครบวงจร</p>`
- `.business-grid` — การ์ด 4 ใบ (`.business-card` + theme modifier `--primary`/`--yellow`/`--accent`/`--white`) แต่ละใบมีไอคอน (☕/💧/🥤/🍽), `.business-card__content` (เลขลำดับ 01-04, ชื่อ, คำอธิบาย, ปุ่ม "ดูรายละเอียด")
- **เนื้อหา 4 การ์ดที่ผู้ใช้ส่งมาตรงกับบริการจริง 4 รายการที่มีอยู่แล้วในระบบ** (Coffee Roasting Service, OEM น้ำดื่ม, บริการผลิตเครื่องดื่มครบวงจร, บริการรับจัดเลี้ยง — เดิมอยู่ใน section "Our Services" rev.8) เพียงแต่เปลี่ยนกรอบการนำเสนอเป็น "Our Business" — ลิงก์ปุ่มในต้นฉบับใช้ route สมมุติ `/services/coffee-roasting`, `/services/oem-water`, `/services/beverage-production`, `/services/catering` (ยังไม่มีหน้าจริงในโปรเจกต์ static mockup นี้)

## CSS ที่ผู้ใช้ส่งมา ("Global Variables" + "Section 3: Our Business")

- `@import` Google Fonts (Inter + Kanit) — ซ้ำกับที่มีอยู่แล้วใน `design/style.css`
- `:root` ชุดใหม่ที่ผู้ใช้ส่งมาเป็น**ส่วนย่อยของ token ที่มีอยู่แล้ว** ใน `design/style.css` (ชื่อ token ซ้ำกันเกือบทั้งหมด) แต่มีจุดต่าง: `--border-color: rgb(51 51 51 / 12%)` ต่างจากค่าเดิม `#e1e4ea`, ไม่มี `--primary-dark` (มีอยู่แล้วในไฟล์เดิม), เพิ่ม token ใหม่เฉพาะ business (`--business-font`, `--business-container`, `--business-card-radius: 34px`, `--business-card-gap: 24px`, `--business-card-shadow`)
- Global reset ซ้ำกับที่มีอยู่แล้ว (`*`, `html`, `body`, `img`, `a`, form elements)
- Redefine `.web-title`/`.web-description`/`.highlight-text` ด้วยค่าที่**ง่ายกว่า/ไม่ตรงกับของเดิม** (เช่น `.web-title{font-size:2.5rem}` แบบ fixed แทน `clamp()` responsive ที่ใช้อยู่ใน `design/style.css` ตั้งแต่ rev.9-10)
- Redefine `.btn-primary`/`.btn-accent` — ค่าเกือบเหมือนของเดิมทุกประการ
- CSS component เต็มสำหรับ "Section 3: Our Business" (`.business-section`, `::before`/`::after` decorative shape, `.business-section__container/__header/__eyebrow/__title/__intro`, `.business-grid`, `.business-card` พร้อม `nth-child` stagger/rotation transform รายใบ + hover override, theme variant 4 แบบ, `.business-card__icon`/`__content`/`__number`/`__title`/`__description`/`__button`/`--light`), accessibility focus-visible, responsive breakpoint 1100px/767px/390px, `prefers-reduced-motion`

## หมายเหตุการนำไปใช้งาน (ดูรายละเอียดเต็มใน wiki)

ดู [[Our Business Section - HTML+CSS]] (wiki/sources) และ [[Wireframe หน้าแรก (Redesign cpbf.co.th)]] § rev.11 สำหรับการตัดสินใจปรับก่อนใช้งานจริงในหน้า (ยุบรวม section ธุรกิจของเรา + Our Services เดิมเป็น section เดียว, ไม่ overwrite utility class ที่มีอยู่แล้ว, เพิ่มเฉพาะ token ใหม่ที่ยังไม่มี ฯลฯ)
