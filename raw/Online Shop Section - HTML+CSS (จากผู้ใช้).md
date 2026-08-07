---
type: raw-source
title: "Online Shop Section - HTML+CSS (จากผู้ใช้)"
captured: 2026-07-18
---

> หมายเหตุ: ไฟล์นี้บันทึกเนื้อหา HTML+CSS ที่ผู้ใช้พิมพ์ส่งเข้ามาในแชทเพื่อสั่ง "ปรับ Section SHOP ONLINE เป็น Title : Online shop และใช้ข้อมูลสินค้าตามเดิม แต่ดีไซน์เปลี่ยนเป็นตามนี้" — เป็นการสรุปโครงสร้าง/เนื้อหาต้นฉบับที่ผู้ใช้ส่งมา ไม่ใช่ transcript ตัวอักษรต่อตัวอักษร 100%

## คำสั่งผู้ใช้

"ปรับ Section SHOP ONLINE เป็น Title : Online shop และใช้ข้อมูลสินค้าตามเดิม แต่ดีไซน์เปลี่ยนเป็นตามนี้" ตามด้วย markup HTML สำหรับ section ใหม่ (คอมเมนต์ในต้นฉบับระบุ "Section 5: Online Shop") พร้อม stylesheet เต็ม

## Section 5: Online Shop (HTML ต้นฉบับ — โครงสร้าง)

`<section class="shop-section" id="online-shop">` ประกอบด้วย `.shop-section__container`:

- Header: eyebrow "Shop online", `<h2 class="web-title shop-section__title">Our Products, Delivered to You</h2>`, description สั้น
- `.shop-grid` — grid 4 คอลัมน์ของ `.shop-card` (ตัวอย่างในต้นฉบับ 4 ใบ เป็นสินค้าสมมุติ: Signature Coffee Blend / Cold Brew Coffee / Premium Drinking Water / Special Gift Set พร้อม path รูป `assets/images/product-*.jpg` ที่ไม่มีอยู่จริงในโปรเจกต์) แต่ละใบมี `.shop-card__image-wrapper` (สี variant --pink/--yellow/--blue/--cream), `.shop-card__badge` (ป้ายการตลาดสมมุติ เช่น "Best seller"/"Popular"/"New"/"Special edition"), category, title, description, price, ปุ่ม "สั่งซื้อ →"
- ปุ่ม "ดูสินค้าทั้งหมด" ท้าย grid ใช้ `.btn-primary`

## CSS ที่ผู้ใช้ส่งมา ("Global Variables" + "Section 5: Online Shop")

- `@import` Google Fonts (Inter + Kanit) — ซ้ำกับที่มีอยู่แล้วใน `design/style.css`
- `:root` ชุดใหม่มี token ที่ซ้ำกับที่มีอยู่แล้วเกือบทั้งหมด: `--shop-border`≈`--border-color`, `--shop-container-width:1440px`≈`--container-width`, `--shop-card-radius:28px`≈`--card-radius`, `--shop-font`≈`--font-family`, `--shop-shadow`≈`--shadow-card`
- Redefine `.web-title`/`.web-description`/`.btn-primary` ด้วยค่าที่ง่ายกว่า/ไม่ตรงกับของเดิม (เช่น fixed font-size แทน `clamp()` responsive ที่ใช้อยู่ใน `design/style.css` ตั้งแต่ rev.9-11)
- CSS component เต็มสำหรับ "Section 5: Online Shop" (`.shop-section` พร้อม `::before`/`::after` decorative blur circle background), `.shop-section__container/__header/__eyebrow/__title/__description`, `.shop-grid` (4-col), `.shop-card` + `__image-link/__image-wrapper` (4 color variant)/`__image`/`__badge` (+ `--primary`/`--accent` variant)/`__content/__category/__title/__description/__footer/__price/__price-label/__button`, `.shop-section__action/__view-all`, focus-visible accessibility, responsive breakpoint 1200px/900px/767px/390px, `prefers-reduced-motion`

## หมายเหตุการนำไปใช้งาน (ดูรายละเอียดเต็มใน wiki)

ดู [[Online Shop Section - HTML+CSS]] (wiki/sources) และ [[Wireframe หน้าแรก (Redesign cpbf.co.th)]] § rev.13 สำหรับการตัดสินใจปรับก่อนใช้งานจริงในหน้า — ที่สำคัญที่สุดคือคำสั่ง "ใช้ข้อมูลสินค้าตามเดิม" หมายถึงใช้สินค้าจริง 5 SKU ที่มีอยู่แล้วใน [[Shop Online - รายการสินค้า 5 รายการ]] แทนสินค้าสมมุติ 4 รายการในตัวอย่าง HTML ที่ส่งมา (ไม่ overwrite utility class ที่มีอยู่แล้ว, เพิ่มเฉพาะ CSS component ใหม่, ตัด badge การตลาดสมมุติที่ไม่มีข้อมูลจริงรองรับ, ตัดปุ่ม "+ เพิ่มลงตะกร้า" ที่มีอยู่เดิม)
