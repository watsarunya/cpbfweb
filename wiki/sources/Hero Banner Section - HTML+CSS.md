---
type: source
title: "Hero Banner Section - HTML+CSS"
created: 2026-07-18
updated: 2026-07-18
sources: ["raw/Hero Banner Section - HTML+CSS (จากผู้ใช้).md"]
tags: ["wireframe", "css", "html", "hero"]
---

## ที่มา

ผู้ใช้สั่ง "ปรับ section บนสุด ดังนี้ Section 1: Hero Banner" พร้อมส่ง markup HTML + CSS เต็มสำหรับ hero section ใหม่มาแทนที่ section `.hero` เดิม (rev.1-4, พื้นน้ำเงิน + blob/sticker/float-chip collage style) — บันทึกต้นฉบับไว้ที่ `raw/Hero Banner Section - HTML+CSS (จากผู้ใช้).md`

## สรุปเนื้อหา

**HTML**: section ใหม่ `.hero-section` (`id="home"`) แทนที่ section เดิมทั้งหมด — decorative dot/pill 4 อัน, header (eyebrow "CP B&F Company Limited", h1 "Crafted for every business", description ภาษาไทย, ปุ่ม "ดูบริการของเรา"/"ติดต่อเรา"), `.hero-gallery` แบบ polaroid gallery 4 รูปเอียงสลับกัน (`.hero-photo--one/two/three/four`) พร้อม caption ภาษาอังกฤษ

**CSS**: token/base/button ใหม่ซ้ำกับที่มีอยู่แล้วใน `design/style.css` เกือบทั้งหมด + CSS component เต็มสำหรับ `.hero-section`/`.hero-gallery`/`.hero-photo`/`.hero-decoration` พร้อม responsive, accessibility, reduced-motion

## จุดที่ต้องปรับก่อนใช้งานจริง (ตัดสินใจระหว่าง implement)

1. **รูปสินค้า 4 ไฟล์มีอยู่จริงแล้ว**: ต่างจาก section อื่นๆ ก่อนหน้านี้ (About/Shop) ที่ยังไม่มีรูปจริง — ตรวจสอบ `raw/assets/image/` พบว่า `hero-business-01.png` ถึง `hero-business-04.png` มีอยู่จริงแล้ว (เพิ่มเข้ามาก่อนคำสั่งนี้) จึงใช้ `<img>` ตามต้นฉบับได้เลย ไม่ต้องใช้ emoji placeholder
2. **แก้ path รูป**: ต้นฉบับใช้ `src="assets/image/hero-business-0X.png"` (relative ต่อตำแหน่งไฟล์ที่ไม่มีอยู่จริงเมื่อเทียบกับ `design/homepage-wireframe.html`) → แก้เป็น `../raw/assets/image/hero-business-0X.png` ให้ตรงกับ path จริงและสอดคล้องกับรูปแบบที่ section อื่น (เช่น `Hero banner.png` เดิม) ใช้อยู่แล้ว
3. **ไม่ overwrite `:root` tokens/Base reset/`.btn-primary`/`.btn-accent` ที่มีอยู่แล้ว**: CSS ที่ส่งมา redefine ค่าเหล่านี้ซ้ำเกือบทั้งหมด (ค่าตรงกันทุกจุดกับ `design/style.css` ปัจจุบัน ยกเว้น `.btn-primary`/`.btn-accent` ต่าง `min-height` เล็กน้อย 50px vs 48px ซึ่งไม่ต่างจนต้องเปลี่ยน) → ไม่แตะ ใช้ของเดิมทั้งหมด ตามหลักการเดิมตั้งแต่ rev.10
4. **token ใหม่ที่ไม่ซ้ำ**: เพิ่ม `--hero-container-width:1500px` และ `--hero-shadow` เข้า `:root` (ค่าต่างจาก `--container-width`/`--shadow-card` เดิมจริง ไม่ใช่ token ซ้ำซ้อน) ตามรูปแบบเดียวกับที่เคยเพิ่ม `--about-container-width`/`--about-shadow` ให้ section About Us — ส่วน `--hero-polaroid-bg:#fffdf3` ใช้ค่าตรงๆ ในกฎ CSS แทน (ใช้ครั้งเดียว ไม่ผูก token เหมือนสี cream ของ shop card)
5. **ลบ CSS/HTML hero เดิม (rev.1-4) ทั้งหมด**: `.hero`/`.hero h1`/`.hero p`/`.hero-ctas`/`.hero-art`/`.blob`/`.sticker`/`.hero-features`/`.product-stack`/`.hero-banner-img`/`.float-chip`/`.tag-pill`/`.seal-badge`/`.marker` ถูกลบออกจาก inline `<style>` — **ยกเว้น** `.btn-solid` และ `.doodle` ที่ยังใช้อยู่ใน `.cta-banner` ท้ายหน้า จึงคงไว้ (ไม่แตะ)
6. **id เปลี่ยนจาก `id="hero"` เป็น `id="home"`**: ตามที่ผู้ใช้ระบุใน markup ตรงๆ — ตรวจสอบแล้วไม่มี nav link อื่นอ้างอิง `#hero` เดิม จึงไม่กระทบ
7. **ปุ่ม CTA**: "ดูบริการของเรา" ลิงก์ไป `#our-business` (มีอยู่จริง, section Our Business), "ติดต่อเรา" ลิงก์ไป `#contact-us` (มีอยู่จริง, section Contact Us) — ตรวจสอบแล้วทั้ง 2 id มีอยู่จริงในหน้า

## ผลลัพธ์ implement

ดูที่ [[Wireframe หน้าแรก (Redesign cpbf.co.th)]] § rev.14
