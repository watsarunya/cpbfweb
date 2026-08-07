---
type: source
title: "Online Shop Section - HTML+CSS"
created: 2026-07-18
updated: 2026-07-18
sources: ["raw/Online Shop Section - HTML+CSS (จากผู้ใช้).md"]
tags: ["wireframe", "css", "html", "shop"]
---

## ที่มา

ผู้ใช้สั่ง "ปรับ Section SHOP ONLINE เป็น Title : Online shop และใช้ข้อมูลสินค้าตามเดิม แต่ดีไซน์เปลี่ยนเป็นตามนี้" พร้อมส่ง markup HTML + CSS เต็มสำหรับ section "Online Shop" ใหม่มาแทนที่ section "SHOP ONLINE" เดิม (rev.7: slider แสดง 4 การ์ด เลื่อนดูใบที่ 5) — บันทึกต้นฉบับไว้ที่ `raw/Online Shop Section - HTML+CSS (จากผู้ใช้).md`

## สรุปเนื้อหา

**HTML**: section ใหม่ `.shop-section` (`id="online-shop"`) แทนที่ section เดิมทั้งหมด — header (eyebrow "Shop online", h2 "Online shop" ตามที่ผู้ใช้ระบุ title ตรงๆ, description), `.shop-grid` แบบ card-grid (ไม่ใช่ slider แบบเดิมอีกต่อไป) ของ `.shop-card` พร้อมกล่องรูปสี variant, badge, ชื่อ, description, ราคา, ปุ่ม "สั่งซื้อ", ปุ่ม "ดูสินค้าทั้งหมด" ท้าย section

**CSS**: token/component ใหม่ซ้ำกับที่มีอยู่แล้วใน `design/style.css` เกือบทั้งหมด + CSS component เต็มสำหรับ `.shop-section`/`.shop-grid`/`.shop-card`/`.shop-card__*` พร้อม decorative pseudo-elements, responsive, accessibility

## จุดที่ต้องปรับก่อนใช้งานจริง (ตัดสินใจระหว่าง implement)

1. **"ใช้ข้อมูลสินค้าตามเดิม" — แทนสินค้าสมมุติในตัวอย่างด้วยสินค้าจริง 5 SKU**: HTML ตัวอย่างที่ผู้ใช้ส่งมามีแค่ 4 การ์ด เป็นสินค้าสมมุติ (Signature Coffee Blend, Cold Brew Coffee, Premium Drinking Water, Special Gift Set) พร้อม path รูปที่ไม่มีอยู่จริง — ตามคำสั่งผู้ใช้ตรงๆ ("ใช้ข้อมูลสินค้าตามเดิม") จึงใช้สินค้าจริง 5 รายการที่มีอยู่แล้วจาก [[Shop Online - รายการสินค้า 5 รายการ]] (Instant Konjac Jelly, CP B&F Beverage Creamer, Coffee Flower Honey, House Blend 100% Pure Roasted Coffee, HEY! BEV รสทับทิม) แทน ไม่ใช้สินค้าตัวอย่างในต้นฉบับ — grid ปรับจาก 4 เป็น 5 การ์ด (แถวที่ 2 เหลือ 1 ใบ ที่ breakpoint desktop 4 คอลัมน์)
2. **Title**: ใช้ "Online shop" ตามที่ผู้ใช้ระบุตรงๆ ในคำสั่ง (ไม่ใช้ข้อความ "Our Products, Delivered to You" จากตัวอย่าง HTML)
3. **ไม่มีรูปสินค้าจริง**: เหมือน rev.7 เดิม ยังไม่มีรูปสินค้าจริง 5 SKU ใน `raw/assets/` — ใช้ emoji เดิม (🍮🥛🍯☕🥤) วางใน `.shop-card__image` แทน `<img>` ที่ต้นฉบับกำหนด (path รูปที่ผู้ใช้ส่งมาก็ไม่มีอยู่จริงเช่นกัน)
4. **badge การตลาดสมมุติ (Best seller/Popular/New/Special edition) ถูกตัดออก**: ไม่มีข้อมูลจริงว่าสินค้าใดขายดี/เป็นสินค้าใหม่ ตามหลัก CLAUDE.md ห้ามประดิษฐ์ข้อมูล — ใช้ badge แสดงหมวดหมู่สินค้าแทน (วัตถุดิบ/เครื่องดื่ม/เมล็ดกาแฟ/Hey! Bev ตามข้อมูลจริงเดิม) สลับสี `--primary`/`--accent`
5. **ปุ่ม "+ เพิ่มลงตะกร้า" ที่มีอยู่ใน rev.7 เดิมถูกตัดออก**: ดีไซน์ใหม่มีปุ่มเดียวต่อการ์ด ("สั่งซื้อ →") — ⚠️ เป็นการเปลี่ยนแปลงฟังก์ชันจากเดิม ยังไม่ได้ยืนยันกับผู้ใช้ตรงๆ ว่าตั้งใจตัดปุ่มเพิ่มลงตะกร้าทิ้ง (ปุ่มตะกร้าที่ header ยังคงอยู่)
6. **ลิงก์ปุ่ม "สั่งซื้อ"**: ใช้ URL จริงเมื่อมี (3 รายการ: Konjac Jelly, House Blend, HEY! BEV) และ anchor `#online-shop` เมื่อไม่มี URL จริง (Beverage Creamer, Coffee Flower Honey) — ตามรูปแบบเดียวกับ rev.7 เดิม
7. **ไม่ overwrite `.web-title`/`.web-description`/`.btn-primary` ที่มีอยู่แล้ว**: CSS ที่ส่งมา redefine เป็นเวอร์ชัน fixed-size ง่ายกว่า → ไม่ใช้ตามหลักการเดิมตั้งแต่ rev.10 (คงของเดิมไว้) ใช้เฉพาะ CSS component ใหม่เฉพาะของ section นี้ และใช้ `.btn-primary` เดิมสำหรับปุ่ม "ดูสินค้าทั้งหมด"
8. **token ใหม่ที่ส่งมาซ้ำซ้อนกับที่มีอยู่แล้วทั้งหมด** → ไม่เพิ่ม token ใหม่เลย (`--shop-border`≈`--border-color`, `--shop-container-width`≈`--container-width`, `--shop-card-radius`≈`--card-radius`, `--shop-font`≈`--font-family`, `--shop-shadow`≈`--shadow-card` — ใช้ตัวแปรเดิมทั้งหมดแทน)
9. **สี image-wrapper variant**: ใช้ token สีอ่อนที่มีอยู่แล้ว (`--accent-pink-soft` = pink, `--vibrant-yellow` = yellow, `--primary-soft` = blue) + เพิ่มสี cream ใหม่ (`#f3ede0`, ค่าตรงๆ ไม่ผูก token เพราะใช้ครั้งเดียว)
10. **eyebrow**: ใช้ class ร่วม `.section-eyebrow` ที่มีอยู่แล้ว ตามแนวทางเดียวกับ section อื่น
11. **nav link**: เปลี่ยน `<a href="#shop">` เป็น `<a href="#online-shop">` ให้ตรงกับ `id` ใหม่ของ section
12. **ปุ่ม "ดูสินค้าทั้งหมด"**: ใช้ anchor `#online-shop` (ยังไม่มีหน้ารายการสินค้าเต็มจริง)

## ปรับตามคำขอเพิ่มเติมของผู้ใช้ (2026-07-18)

ผู้ใช้สั่งเพิ่ม "ขอเป็น default 4 และ slide เหมือนเดิม" — ให้กลับไปแสดง 4 การ์ดเป็นค่าเริ่มต้นพร้อมเลื่อนดูใบที่ 5 แบบ slider เหมือน rev.7 เดิม แต่ **คงดีไซน์การ์ดใหม่ (rev.13) ไว้** (ไม่ใช่การ revert กลับไปใช้ `.product-card` เดิม):

- ครอบ `.shop-grid` ด้วย `.shop-section__slider` (`position:relative`) + ปุ่มลูกศร `.shop-nav.prev`/`.shop-nav.next` (ใช้ inline `onclick` เรียก `scrollBy()` เหมือน rev.7 เดิม, `id="shopGrid"`)
- เปลี่ยน `.shop-grid` จาก `grid-template-columns: repeat(4, 1fr)` (static grid) → `grid-auto-flow:column` + `grid-auto-columns:calc(25% - 18px)` + `overflow-x:auto` + `scroll-snap-type:x mandatory` (เห็น 4 การ์ดพร้อมกัน เลื่อนดูใบที่ 5 ได้) ซ่อน scrollbar
- ปรับ responsive breakpoint จาก grid-column ตายตัว (2-col/1-col) เป็นปรับความกว้างการ์ดต่อ breakpoint แทน (1200px: เห็น ~2 ใบ, 767px: เห็น ~1 ใบ) เพื่อให้ slider ยังทำงานได้ทุกขนาดจอ

ผลลัพธ์ implement เต็มดูที่ [[Wireframe หน้าแรก (Redesign cpbf.co.th)]] § rev.13
