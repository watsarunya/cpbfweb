---
type: raw-source
title: "News & Contact Section - HTML+CSS (จากผู้ใช้)"
captured: 2026-07-17
---

> หมายเหตุ: ไฟล์นี้บันทึกเนื้อหา HTML+CSS ที่ผู้ใช้พิมพ์ส่งเข้ามาในแชทเพื่อสั่งเพิ่ม section "News & Event" และ "Contact Us" ลงใน `design/homepage-wireframe.html` (กลายเป็น rev.10) เป็นการสรุปโครงสร้าง/เนื้อหาต้นฉบับที่ผู้ใช้ส่งมา ไม่ใช่ transcript ตัวอักษรต่อตัวอักษร 100% (ข้อความแชทดิบไม่ได้ถูกเก็บแยกเป็นไฟล์ ณ เวลาที่ส่ง) แต่สรุปครบทุกจุดสำคัญของเนื้อหาต้นฉบับ

## คำสั่งผู้ใช้

"เพิ่ม" ตามด้วย markup HTML สำหรับ 2 section ใหม่ (News & Event, Contact Us) แล้วตามด้วย "โดยใช้ css นี้" พร้อม stylesheet เต็ม

## Section 6: News & Event (HTML ต้นฉบับ — โครงสร้าง)

`<section class="news-section" id="news-events">` ประกอบด้วย:
- `.news-section__header`: eyebrow "Latest update", `<h2 class="web-title news-section__title">News & Event</h2>`, `<p class="web-description news-section__description">...</p>`, ปุ่ม "ดูข่าวทั้งหมด" (`.btn-primary`)
- `.news-grid` — การ์ด 3 ใบ (การ์ดที่ 2 มี class เพิ่ม `news-card--featured`) แต่ละใบมี `.news-card__image-link` > `.news-card__image-wrapper` (รูป + `.news-card__tag`) และ `.news-card__content` (meta วันที่/เวลา, `.news-card__title`, `.news-card__description`, `.news-card__link` มีลูกศร)
- **เนื้อหาตัวอย่างที่ผู้ใช้ส่งมาเป็น placeholder ทั่วไป ไม่ใช่ข่าวจริงของ CP B&F**: หัวข้อประมาณ "เปิดตัวบริการ OEM น้ำดื่มครบวงจร", "Coffee Roasting Workshop", "เทรนด์เครื่องดื่มที่ผู้ประกอบการควรรู้" พร้อม path รูปสมมุติ `assets/images/news-01.jpg` ฯลฯ และวันที่สมมุติ — **ไม่มีไฟล์รูปเหล่านี้อยู่จริงในโปรเจกต์**

## Section 7: Contact Us (HTML ต้นฉบับ — โครงสร้าง)

`<section class="contact-section" id="contact-us">` ประกอบด้วย `.contact-section__main` (grid 3 คอลัมน์):
- `.contact-section__intro` (แผงซ้ายพื้นเหลือง): eyebrow "Start your project", `<h2 class="contact-section__title">Let's create<span>something great!</span></h2>`, description, เส้นตกแต่ง
- `.contact-section__cta` (กลาง): ข้อความ CTA + ลูกศร
- `.contact-panel` (ขวาพื้นชมพู): label, title, `.contact-list` 4 รายการ — **Email `hello@example.com`, Telephone `02-000-0000`, Website `www.example.com`, Location `Bangkok, Thailand` (ทั้งหมดเป็นข้อมูล placeholder ตัวอย่าง ไม่ใช่ข้อมูลจริงของ CP B&F)**, ปุ่ม CTA
- `.contact-section__footer`: bottom bar มี tagline 2 ข้อความ, เส้นแบ่ง, ปุ่ม "Let's work together!"
- ลิงก์ในต้นฉบับใช้ route สมมุติ `/contact`, `/news` (ยังไม่มีหน้าจริงในโปรเจกต์ static mockup นี้)

## CSS ที่ผู้ใช้ส่งมา ("โดยใช้ css นี้")

CSS ฉบับเต็มถูกคัดลอกลงไฟล์จริง `design/style.css` แบบ verbatim แล้ว (ดู [[News & Contact Section - HTML+CSS]] ใน wiki/sources) สรุปโครงสร้าง:
- `@import` Google Fonts (Inter + Kanit)
- ขยาย `:root` design tokens จากเดิม (rev.9) เพิ่ม `--primary-hover`, `--primary-dark`, `--primary-soft`, `--accent-pink-hover`, `--accent-pink-soft`, `--highlight-yellow`, `--bg-card`, `--font-desc`, `--font-light`, `--border-color`, `--container-width`, `--card-radius`, `--pill-radius`, shadow tokens
- Global reset (`*`, `html`, `body`, `img`, `a`, form elements)
- `.section-container`, redefine `.web-title`/`.web-description`, `.section-eyebrow`/`--dark`, redefine `.btn-primary`/`.btn-accent` (เต็มกว่าเดิมใน rev.9)
- CSS เต็มของ `.news-section`/`.news-grid`/`.news-card` (BEM) พร้อม decorative blob `::before`/`::after`, featured card stagger
- CSS เต็มของ `.contact-section`/`.contact-panel`/`.contact-list` พร้อม decorative shape/clip-path
- Accessibility focus-visible, responsive breakpoint 1100px/767px, `prefers-reduced-motion`

⚠️ **ไม่มี `.highlight-text` ใน CSS ชุดนี้** (เคยมีใน style.css เดิม rev.9) — เก็บ rule เดิมไว้ไม่ให้หาย เมื่อรวมเข้า `design/style.css`

## หมายเหตุการนำไปใช้งาน (ดูรายละเอียดเต็มใน wiki)

ดู [[News & Contact Section - HTML+CSS]] (wiki/sources) และ [[Wireframe หน้าแรก (Redesign cpbf.co.th)]] § rev.10 สำหรับการตัดสินใจปรับเนื้อหาก่อนนำไปใช้จริงในหน้า (แทนที่ข่าว placeholder ด้วยข่าวจริง, แทนที่โดเมนสมมุติด้วยโดเมนจริง ฯลฯ)
