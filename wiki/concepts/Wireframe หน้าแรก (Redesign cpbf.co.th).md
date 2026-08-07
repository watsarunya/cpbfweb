---
type: concept
title: "Wireframe หน้าแรก (Redesign cpbf.co.th)"
created: 2026-07-17
updated: 2026-07-20
sources: ["[[โครงการ Redesign เว็บไซต์ cpbf.co.th]]", "[[Design Assets - Logo และ Hero Banner]]", "[[CI Guideline และ Reference Design]]", "[[ข่าวและกิจกรรม - รูปภาพและเนื้อหาข่าว]]", "[[Shop Online - รายการสินค้า 5 รายการ]]", "[[Our Services - เนื้อหาบริการ 4 รายการ]]", "[[style.css - Global Style Variables]]", "[[News & Contact Section - HTML+CSS]]", "[[Our Business Section - HTML+CSS]]", "[[About Us Section - HTML+CSS]]", "[[Online Shop Section - HTML+CSS]]", "[[Hero Banner Section - HTML+CSS]]"]
tags: ["project", "redesign", "cpbf", "wireframe"]
---

## ไฟล์ mockup

`design/homepage-wireframe.html` — เปิดดูได้โดยตรงในเบราว์เซอร์ (ไม่ต้องรัน dev server)

## โครงสร้างหน้า (ตาม [[โครงการ Redesign เว็บไซต์ cpbf.co.th]] § Site Map)

หมายเหตุ: ตัดตัวอักษรกำกับ a-e ออกจากชื่อ section แล้ว (rev. 2026-07-17) ใช้ป้าย eyebrow ภาษาอังกฤษสั้นๆ แทน (ABOUT / BUSINESS / SERVICES / SHOP / NEWS)

| ส่วน | เนื้อหาใน mockup |
|---|---|
| Header/Nav (redesign, rev.15) | (rev.15) แทนที่ header เดิม (พื้นขาว + sticky + ปุ่มข้อความ) ด้วย `.site-header` overlay ทับพื้นหลัง Hero Banner section แรกเท่านั้น (`position:absolute`, ไม่ sticky ทั่วหน้าอีกต่อไป ⚠️) — โลโก้ทางการซ้าย (ลิงก์ `#home`, ⚠️ ขยายขนาดจาก 40px เป็น 56px ตามคำขอ rev.15.1), เมนูชิดขวา 5 รายการ (เกี่ยวกับเรา→`#about-us`, ธุรกิจของเรา→`#our-business`, บริการของเรา→`#our-business` ⚠️ ใช้ anchor เดียวกับธุรกิจของเราเพราะถูกยุบรวมไปแล้วตั้งแต่ rev.11, ช้อปปิ้งออนไลน์→`#online-shop`, ข่าวสารและกิจกรรม→`#news-events`), ไอคอนขวาสุด 3 อัน (🌐 เปลี่ยนภาษา default "TH", 👤 เข้าสู่ระบบ, 🛒 ตะกร้าสินค้า — ทั้งหมดเป็น static placeholder ยังไม่มี JS จริง) — **ปรับเพิ่ม (rev.15.1)**: เปลี่ยนพื้นหลังจากโปร่งใสเป็นสีขาวตัน (`--bg-main`) ตามคำขอ จึงเปลี่ยนสีตัวอักษร/ไอคอนจากขาวเป็นเข้ม (`--font-title`) ให้ contrast กับพื้นขาวแทน, ขยาย `.hero-section` padding-top จาก 76px เป็น 96px กัน header สูงขึ้น (จากโลโก้ใหญ่ขึ้น) ทับเนื้อหา hero CSS อยู่ใน `design/style.css` (ใช้ชุดสี non-CI) |
| Hero Banner (redesign, rev.14, ปรับเพิ่ม rev.16/rev.17/rev.18/rev.19) | (rev.14) แทนที่ hero เดิม (rev.1-4, พื้นน้ำเงิน + blob/sticker/float-chip collage) ด้วย section ใหม่ `.hero-section` (`id="home"`, เปลี่ยนจาก `id="hero"` เดิม) — h1 "Crafted for every business", description ภาษาไทย CSS อยู่ใน `design/style.css` (ใช้ชุดสี non-CI เหมือน About/News/Contact/Our Business/Online Shop) — **ปรับเพิ่ม (rev.16)**: ลบ border ตกแต่ง (`.hero-section::before` inset border), ลบ eyebrow "CP B&F Company Limited", ลบปุ่ม "ดูบริการของเรา"+"ติดต่อเรา" ทั้งคู่, ลบ **polaroid gallery 4 รูป** (`hero-business-01.png`-`04.png`) ออกทั้งหมด แทนที่ด้วยแบนเนอร์ภาพเดียว `.hero-banner` (`raw/assets/image/hero-business.png` — ⚠️ เป็นภาพโปรโมทสินค้า "Thai Specialty Coffee" แบรนด์ "ATO Chiang Rai" ไม่ใช่ภาพของ CP B&F เอง ผู้ใช้ยืนยันให้ใช้ตามที่ส่งมาโดยตรง) — **ปรับเพิ่ม (rev.17)**: ยุบ `.hero-banner` ภาพเดียวออก แล้วแยกสลาย asset ในภาพ ref เดิมออกเป็น layer ข้อความ/ไอคอน/รูปภาพแยกกัน (`.hero-showcase`) พร้อม **parallax animation ตาม mouse/scroll** (JS ตัวแรกของไฟล์นี้) ใช้รูปสินค้าไดคัท `raw/assets/image/New Project.png`, พื้นหลังเปลี่ยนเป็นสีทึบ `var(--primary)` (`#1B5EF9`) — **ปรับเพิ่ม (rev.18)**: จัดตำแหน่ง/ขนาด font/layout ใหม่ทั้งหมดด้วย **absolute positioning (%) อิงพิกัดจริงที่วัดได้จากภาพ ref `hero-business.png` (1376×702px)** ผ่านการวิเคราะห์พิกเซลด้วย Python/Pillow แทน flexbox เดิม เพื่อให้ตรงกับต้นฉบับตามที่ผู้ใช้ขอ "100%" ลบ `.hero-decoration` (จุด/pill สีสัน 4 ชิ้นจาก rev.1-4 เดิม) ออกเพราะไม่มีในภาพ ref — **ปรับเพิ่ม (rev.19)**: ห่อ `.hero-showcase` ด้วย `.hero-slider` (`.hero-slider__track` + `.hero-slider__slide` ใช้ scroll-snap เหมือนแพทเทิร์น `.shop-section__slider`) เพื่อรองรับหลายแบนเนอร์เลื่อนได้ เพิ่ม slide ใหม่เป็นลำดับแรก (index number "01", เนื้อหา/รูปสินค้าเดียวกับ slide เดิมทั้งหมดตามที่ผู้ใช้ระบุให้ใช้ชั่วคราว) ส่วน slide เดิม (index "02") ขยับเป็นลำดับสอง เพิ่มปุ่มเลื่อน `.hero-slider__nav` (prev/next) และแก้ parallax script จาก `querySelector` เป็น `querySelectorAll` เพื่อให้ parallax ทำงานได้ทุก slide |
| About Us (redesign, rev.12, ตัดการ์ดกระดาษ rev.28, พื้นหลัง rev.33) | (rev.12) แทนที่ photo panel เดิม (rev.5) ด้วยการ์ดกระดาษ `.about-card` (`id="about-us"`) — ป้าย "About Us", eyebrow "Our Story", h2 "CP B&F Company Limited", คำอธิบาย 2 ย่อหน้า (ประวัติบริษัท: ก่อตั้ง 2016, เครือเจริญโภคภัณฑ์ ⚠️ ข้อมูลใหม่ยังไม่มี source อื่นยืนยัน), ปุ่ม "อ่านเพิ่มเติม" (ใช้ class ร่วม `.btn-accent`), ป้ายกลม "CP B&F" มุมล่างขวา — ยังเป็นภาษาอังกฤษเหมือน rev.5 เดิม — **rev.28: ตัดการ์ดกระดาษออกทั้งหมด** เหลือ plain text (ดูรายละเอียด § About Us section rev.28) — **rev.33: เพิ่ม `background-color:#EBEAE7`** ให้ `.about-section` ตามภาพ ref ที่ผู้ใช้ระบุ CSS อยู่ใน `design/style.css` |
| Our Business (ยุบรวม, rev.11, restyle rev.32, rev.34) | (rev.11) ยุบรวม section "ธุรกิจของเรา" (bento เดิม) + "Our Services" (stagger card เดิม, rev.8) เป็น section เดียว `id="our-business"` — h2 "Our Business" + intro สั้น, เนื้อหาบริการจริงเดิมจาก [[Our Services - เนื้อหาบริการ 4 รายการ]] (Coffee Roasting/OEM น้ำดื่ม/บริการผลิตเครื่องดื่มครบวงจร/บริการรับจัดเลี้ยง) ⚠️ ตัด stats-strip (4 สถิติ) ที่เคยอยู่ใน Our Services เดิมออกไปด้วย — **rev.32: restyle ตามภาพ ref ใหม่** จากการ์ดกล่อง stagger เป็นแถบไอคอนวงกลมสี CI (blue/yellow/red) คั่นเส้นแนวตั้ง 4 คอลัมน์ ตัดปุ่ม/เลขลำดับออก พื้นหลัง section เป็นครีม `#FBF7EF` — **rev.34: ตัด eyebrow "What we do" ออก, พื้นหลังเปลี่ยนเป็นขาว `#ffffff`** CSS อยู่ใน `design/style.css` |
| Online Shop (redesign, rev.13) | (rev.13) แทนที่ slider เดิม (rev.7) ด้วยดีไซน์การ์ดใหม่ `.shop-section` (`id="online-shop"`) — eyebrow "Shop online", h2 "Online shop" (title ตามที่ผู้ใช้ระบุตรงๆ), description สั้น, การ์ดสินค้าจริง 5 รายการเดิมจาก [[Shop Online - รายการสินค้า 5 รายการ]] (ไม่ใช้สินค้าสมมุติ 4 รายการจากตัวอย่างที่ส่งมา), badge แสดงหมวดหมู่จริงแทน badge การตลาดสมมุติ, ปุ่ม "สั่งซื้อ" เดียว (⚠️ ตัดปุ่ม "+ เพิ่มลงตะกร้า" เดิมออก) — **ปรับเพิ่ม**: กลับไปเป็น slider แสดง 4 การ์ด default เลื่อนดูใบที่ 5 ได้เหมือน rev.7 เดิม (`.shop-section__slider` + `.shop-nav`) แต่คงดีไซน์การ์ดใหม่ไว้, ปุ่ม "ดูสินค้าทั้งหมด" ท้าย section CSS อยู่ใน `design/style.css` |
| ข่าวสารและกิจกรรม | (rev.10) redesign ใหม่ทั้งหมดเป็น `.news-section`/`.news-grid`/`.news-card` (BEM, CSS อยู่ใน `design/style.css`) การ์ดกลาง (Kaset Fair) เป็น `--featured` เอียง/ยกสูงกว่าใบอื่น ใช้**รูปและเนื้อหาข่าวจริง**จาก [[ข่าวและกิจกรรม - รูปภาพและเนื้อหาข่าว]] (Beanie Coffee เปิดตัว / Kaset Fair / ตรุษจีน 2568) เหมือนเดิม แต่เปลี่ยนโครงสร้างการ์ด/ปุ่ม "ดูข่าวทั้งหมด" ตาม CSS reference ใหม่ที่ผู้ใช้ส่งมา |
| Contact Us (ใหม่) | (rev.10) section ใหม่ทั้งหมด — panel ซ้ายพื้นเหลือง "Let's create something great!", กลาง CTA text, ขวาพื้นชมพู `.contact-panel` รายการติดต่อ (Email/Telephone/Website/Location ⚠️ ยังเป็น placeholder ยกเว้น Website ที่ใช้โดเมนจริง `www.cpbf.co.th`) + ปุ่ม, footer bar tagline คู่ + ปุ่ม "Let's work together!" |
| Footer | ระบุว่าเป็น mockup สำหรับ review เท่านั้น |

คำอธิบายแต่ละ section (200-500 ตัวอักษรตามที่ผู้ใช้กำหนด) สังเคราะห์จากข้อมูลใน [[cpbf.co.th (บริษัท)]] — ยังไม่มี source ยืนยันพันธกิจ/วิสัยทัศน์จริงของบริษัท ข้อความส่วน "เกี่ยวกับเรา" จึงเป็น**ฉบับร่างที่ผมเขียนขึ้นให้สมเหตุสมผลกับธุรกิจ** ต้องให้ผู้ใช้ตรวจทานก่อนใช้งานจริง

## Layout/มู้ดตาม reference (rev.4 — ล้อ raw/assets/ref/ จริงจัง)

rev.1-3 ยังใช้โครงสร้าง section ธรรมดา (การ์ดขนาดเท่ากันเป็นแถว, พื้นหลังขาวล้วน) ซึ่งไม่ตรงกับมู้ดใน [[CI Guideline และ Reference Design]] § ภาพ reference จริงๆ — ภาพทั้ง 5 (Natalie Brunswick, Vlada Remizova, Mariana, IT-Kids, Solar Pop) มีจุดร่วมชัดเจนคือ **สไตล์ portfolio/collage แบบ bold**: ตัวอักษรหัวข้อใหญ่มาก, sticker/seal badge หมุนเอียงทับภาพ, doodle (ดาว/ลูกศรลายมือ), tag pill ขอบหนามุมมน, การ์ดขนาดไม่เท่ากันแบบ bento ไม่ใช่ grid สม่ำเสมอ, กล่องเส้นประ (dashed callout), แถบตัวเลขสถิติ, และแบนเนอร์ CTA พื้นสีตันก่อน footer

rev.4 ปรับ `design/homepage-wireframe.html` ให้ตรงมู้ดนี้มากขึ้น:
- **Hero**: เพิ่ม tag pill "★ OEM • CATERING • CAFÉ" มุมบนซ้าย, ขยาย h1 เป็น 52px พร้อม highlight คำว่า "OEM" แบบ marker สีเหลือง, เพิ่ม doodle ✳/✦ ลอยรอบข้อความ, เพิ่ม seal-badge วงกลมหมุนเอียง "มาตรฐานคุณภาพ OEM" ทับมุมภาพ hero banner
- **About**: เพิ่มกล่องเส้นประ (dashed-callout) พร้อม kicker + ปุ่ม CTA ล้อ "before you scroll any further" จาก ref Natalie Brunswick
- **ธุรกิจของเรา**: เปลี่ยนจาก grid-4 การ์ดเท่ากัน → **bento grid** การ์ด OEM Manufacturing ใหญ่ 2×2 พื้นสี primary ทึบ + การ์ดเล็ก 3 ใบสีตัน (เหลือง/cyan/ชมพู) หมุนเอียงสลับ ล้อสไตล์ IT-Kids/Solar Pop
- **บริการของเรา**: เพิ่ม stats-strip 4 ช่อง (4 สายธุรกิจ / 100% ควบคุมคุณภาพ / 24/7 สั่งซื้อออนไลน์ / OEM มาตรฐานสากล) ล้อ "Experience by the numbers" จาก ref Solar Pop
- **ช้อปสินค้า**: เพิ่ม mini-tag sticker หมุนเอียง "ขายดี"/"ใหม่" บนการ์ดเมล็ดกาแฟและ Hey! Bev
- **ก่อน footer**: เพิ่ม section ใหม่ `.cta-banner` พื้นแดงตัน มุมโค้งหนา + blob วงกลมมุม + doodle ✳ + หัวข้อใหญ่ + ปุ่ม CTA ล้อ "LET'S BUILD Something Amazing!" จาก ref Solar Pop

## About section rev.5 — redesign ตามภาพ ref ที่ผู้ใช้ส่งมาโดยตรง

> ⚠️ **แทนที่แล้วโดย rev.12** (ดู § About Us section rev.12 ด้านล่าง) — เก็บ record นี้ไว้เป็นประวัติการออกแบบ

ผู้ใช้ส่งภาพ ref ใหม่ (composite ของ IT-Kids photo panel ด้านบน + Solar Pop "what I do" icon row ด้านล่าง) พร้อมสั่งให้ redesign section เกี่ยวกับเราตามนี้ตรงๆ, ใช้ title/description เป็นภาษาอังกฤษ, สีและฟอนต์ตาม CI

การเปลี่ยนแปลง:
- **Photo panel**: กล่องพื้นหลัง `var(--skyblue)` (#3FC7FF, เลือกจากพาเลตทางการแทนสีเขียวมะนาวในภาพ ref เพราะไม่มีสีเขียวมะนาวใน CI) มุมโค้งหนา, รูป `Hero banner.png` ครอบบน blob สีชมพู + doodle ดาว 2 จุด (ล้อ sparkle ในภาพ ref)
- **Headline ภาษาอังกฤษ**: "FULL-SERVICE OEM PARTNER FOR FOOD & BEVERAGE BRANDS" ตัวใหญ่ 38px Bricolage Grotesque คำสุดท้ายไฮไลต์สีแดง (`var(--red)`) ล้อการไฮไลต์คำสีชมพูในภาพ ref
- **Description ภาษาอังกฤษ**: ย่อหน้าสั้นอธิบายธุรกิจ (sourcing → shelf)
- **"What we do" row**: 4 ไอคอนวงกลมสี (เหลือง/azure/แดง/เขียวจากพาเลตทางการ) + label ตัวพิมพ์ใหญ่ + คำอธิบายสั้น + เส้นแบ่งแนวตั้งระหว่างช่อง + SVG doodle ลูกศรโค้งมุมขวาบน ล้อ arrow doodle ในภาพ ref
- เนื้อหา "what we do" ใช้ 4 สายธุรกิจเดิม (OEM Manufacturing, Catering, Product Retail, Café) แต่เขียนใหม่เป็นภาษาอังกฤษสั้นกระชับสไตล์ label

⚠️ **หมายเหตุความไม่สม่ำเสมอ**: ตอนนี้ section เกี่ยวกับเราเป็นภาษาอังกฤษ แต่ section อื่น (Business/Services/Shop/News/Nav) ยังเป็นภาษาไทยทั้งหมด — ต้องตัดสินใจว่าจะทำทั้งหน้าเป็น bilingual, ทำทั้งหน้าเป็นอังกฤษ, หรือแปล section นี้กลับเป็นไทย (ดู checklist ด้านล่าง)

## News section rev.6 — ข่าวจริงจาก raw/assets/News

ผู้ใช้ส่ง ref ใหม่ (การ์ดข่าวแบบ image thumbnail + title + description ตัดคำ + ปุ่ม "อ่านเพิ่มเติม") พร้อมสั่งเนื้อหาข่าว 3 รายการตรงๆ และให้ใช้รูปจริงจาก `raw/assets/News`

การเปลี่ยนแปลง:
- **หัวข้อ section**: เหลือแค่ eyebrow "NEWS" + h2 "ข่าวสารและกิจกรรม" — **ลบ description ย่อหน้ายาวออก** ตามคำสั่ง ("Description = ไม่ต้องมี"), เพิ่มปุ่ม "ดูทั้งหมด" จัดชิดขวาแถวเดียวกับหัวข้อ (`.news-head-row`)
- **การ์ดข่าว**: เปลี่ยนจาก thumbnail gradient placeholder → รูปจริง 3 ไฟล์ (`new1.jpeg`, `news2.jpeg`, `new3.jpeg` จาก [[ข่าวและกิจกรรม - รูปภาพและเนื้อหาข่าว]]), เพิ่ม tag badge (NEWS/EVENT) พื้นสี primary, title 2 บรรทัด, description ตัดอัตโนมัติ 3 บรรทัดด้วย CSS `-webkit-line-clamp:3` ลงท้าย "...", ปุ่ม "เพิ่มเติม →" ท้ายการ์ด (ชิดล่างด้วย `margin-top:auto`)
- เนื้อหาข่าวทั้ง 3 (title + description) ใช้ตามที่ผู้ใช้ให้มาตรงตัวคำต่อคำ รวมทั้งตัวอักษร bold Unicode "𝗕𝗲𝗮𝗻𝗶𝗲 𝗖𝗼𝗳𝗳𝗲𝗲" ในข่าว 1 (ไม่แปลง/ไม่แก้)
- ⚠️ พบข้อมูลใหม่จากเนื้อหาข่าว (ชื่อแบรนด์ Beanie Coffee, ชื่อ CEO) — บันทึกเพิ่มใน [[cpbf.co.th (บริษัท)]] § สินค้าที่วางขาย และ § บุคลากร (ใหม่)

**rev.6.1 — ปรับสไตล์การ์ดตามภาพ ref เพิ่มเติมที่ผู้ใช้ส่งมา** (การ์ดข่าวสไตล์ flat color-block คล้าย "What is going on with us"): ลบเส้นขอบหนา + hard-shadow แบบ sticker (ที่ใช้ในส่วนอื่นของหน้า) ออกจากการ์ดข่าวโดยเฉพาะ, เปลี่ยนเป็นการ์ดไร้เส้นขอบ มุมโค้งมน 26px ต่อเนื่องเป็นก้อนเดียวระหว่างรูปกับกล่องคำบรรยาย, พื้นหลังกล่องคำบรรยายเป็นสีตันสลับกันตาม CI (การ์ด 1 = primary น้ำเงิน, การ์ด 2 = แดง, การ์ด 3 = เหลือง; ตัวหนังสือขาวบนพื้นน้ำเงิน/แดง, ตัวหนังสือ ink บนพื้นเหลือง), ลบ tag badge (NEWS/EVENT) ออกเพราะภาพ ref ไม่มี, ปุ่ม "เพิ่มเติม" เปลี่ยนเป็นลิงก์ขีดเส้นใต้สีเดียวกับตัวหนังสือแทนปุ่มทึบ

## Shop section rev.7 — สินค้าจริง 5 รายการ + slider

> ⚠️ **แทนที่แล้วโดย rev.13** (ดู § Online Shop section rev.13 ด้านล่าง) — เก็บ record นี้ไว้เป็นประวัติการออกแบบ

ผู้ใช้ส่งรายการสินค้าจริง 5 รายการ (ชื่อ, URL บางรายการ, description, ราคา) พร้อม CSS reference สไตล์ "Mellow" catalog card (soft-tint background, category pill badge, ปุ่ม secondary/primary คู่กัน) และสั่งให้ title = "SHOP ONLINE" แสดง 4 การ์ด พร้อมช่องทางดูเพิ่มเติม เมื่อถามยืนยันว่าจะเลือก 4 จาก 5 อย่างไร ผู้ใช้ตอบว่า **"default 4 product และรองรับการ slide เพื่อดูเพิ่มเติม"**

การเปลี่ยนแปลง:
- **หัวข้อ**: เปลี่ยนจาก "🛒 ช้อปสินค้า" + description ย่อหน้ายาว → "SHOP ONLINE" ตัวใหญ่กลางหน้า (`.shop-section-title`, uppercase, สี primary) ไม่มี description ตามรูปแบบ reference CSS ที่ผู้ใช้ส่งมา
- **โครงสร้างการ์ด**: ตัดองค์ประกอบเฉพาะแบรนด์ต้นแบบ (รูปทรงถ้วยตกแต่ง `::before`/`::after`, sparkle SVG, รูป flavor overlay) ออก เพราะไม่เกี่ยวกับสินค้าจริงของ CP B&F เก็บเฉพาะโครงสร้างหลัก: กล่อง `.product-thumb` พื้นหลัง tint สีตาม CI + `.product-cat` pill badge มุมซ้ายบน, `.product-info` (ชื่อ, description ตัด 3 บรรทัด, ราคา), แถวปุ่มคู่ `.btn-more` (outline, ลิงก์ไปหน้าสินค้าจริงถ้ามี URL) + `.add-cart` (ปุ่มทึบ primary)
- **Slider**: เปลี่ยน `.shop-grid` จาก grid 4 คอลัมน์คงที่ → `grid-auto-flow:column` + `overflow-x:auto` + `scroll-snap-type:x` (การ์ดกว้าง 25% ต่อใบ = เห็น 4 ใบพร้อมกัน, เลื่อนดูใบที่ 5 ได้), ซ่อน scrollbar, เพิ่มปุ่มลูกศร `.shop-nav` (prev/next) ทรง sticker เดิม (border หนา + hard-shadow) ยืนอยู่ซ้าย-ขวาของ slider ใช้ inline `onclick` เรียก `scrollBy()` แทนการเพิ่ม `<script>` แยก
- **เนื้อหาสินค้า 5 รายการ**: ตามลำดับที่ผู้ใช้ให้มา (Instant Konjac Jelly → CP B&F Beverage Creamer → Coffee Flower Honey → House Blend Coffee → HEY! BEV รสทับทิม) จาก [[Shop Online - รายการสินค้า 5 รายการ]] — ราคา/description ตรงตามที่ผู้ใช้ระบุ, URL จริงใช้เฉพาะ 3 รายการที่มี (1, 4, 5)
- ⚠️ ไม่มีรูปสินค้าจริงใน `raw/assets/` สำหรับ 5 SKU นี้ (ตรวจสอบ `raw/assets/image/` แล้วไม่พบ) จึงยังใช้ emoji เป็น placeholder เหมือนเดิม — ไม่ได้ดาวน์โหลดรูปจาก URL ภายนอกเพราะต้องขออนุญาตผู้ใช้ก่อน
- ⚠️ description บางรายการที่ผู้ใช้ส่งมาถูกตัดด้วย "..." ในข้อความต้นฉบับ — ใช้เท่าที่มี

## Services section rev.8 — "Our Services" การ์ดใหญ่ stagger

ผู้ใช้ส่งเนื้อหาบริการ 4 รายการเต็ม (OEM น้ำดื่ม, Coffee Roasting Service, บริการผลิตเครื่องดื่มครบวงจร, บริการรับจัดเลี้ยง) พร้อม CSS reference สไตล์ `.services-section` (การ์ดพื้น primary ตันขนาดใหญ่ stagger เอียง/เลื่อนสลับ, พื้นหลัง section อ่อน, หัวข้อใหญ่ uppercase) และสั่ง Title = "Our Services"

การเปลี่ยนแปลง:
- **หัวข้อ**: เปลี่ยนจาก "บริการของเรา" + description ย่อหน้ายาว → "Our Services" ตัวใหญ่ uppercase (`.services-title`) ไม่มี description ตาม reference ที่ส่งมา (รูปแบบเดียวกับที่ทำใน Shop rev.7 และ News rev.6)
- **พื้นหลัง section**: เปลี่ยนจาก dark gradient (`navy→primary`) เป็นพื้นอ่อน `var(--paper)` ตัวหนังสือ ink ตาม reference — ปรับ `.stat-chip` ใน stats-strip เดิมให้ contrast เข้ากับพื้นอ่อน (เดิมออกแบบมาสำหรับพื้นเข้ม)
- **การ์ดบริการ**: เปลี่ยนจาก `.service-pill` เล็ก (ไอคอนวงกลม + ชื่อสั้น 4 คำ) → `.service-card` ใหญ่ (min-height 320px) พื้น primary ตัน มีชื่อ+คำอธิบายเต็มตามเนื้อหาที่ผู้ใช้ส่งมา จัดเรียงแบบ stagger (ใบที่ 2 หมุนเอียง 4deg + เลื่อนลง, ใบอื่นเลื่อนขึ้น/ลงเล็กน้อย) พร้อม hover state (พื้นเข้มขึ้นเป็น navy + เงาเข้มขึ้น + เลื่อนตำแหน่ง) และ responsive breakpoint 1023px/767px ตาม reference
- เนื้อหาบริการทั้ง 4 (ชื่อ + คำอธิบายเต็ม) ใช้ตามที่ผู้ใช้ให้มาคำต่อคำ จาก [[Our Services - เนื้อหาบริการ 4 รายการ]]
- ⚠️ ชื่อบริการ 2 รายการเปลี่ยนจาก "OEM เมล็ดกาแฟ"/"OEM เครื่องดื่ม" (เดิม) เป็น "Coffee Roasting Service"/"บริการผลิตเครื่องดื่มครบวงจร" (ใหม่) — ปรับ [[cpbf.co.th (บริษัท)]] § บริการ ให้ตรงกันแล้ว (ไม่ใช่ความขัดแย้งจริง เป็นการอธิบายบริการเดิมให้ละเอียดขึ้น)

## style.css — ไฟล์ global stylesheet แยกต่างหาก (สร้างใหม่ 2026-07-17, ผูกเข้ากับ mockup แล้ว rev.9)

ผู้ใช้ส่ง CSS block พร้อมสั่ง "create body style.css ของเว็บไซต์" — สร้างไฟล์ `design/style.css` ตามเนื้อหาที่ให้มา verbatim จาก [[style.css - Global Style Variables]] ประกอบด้วยตัวแปรสี (`:root`), `body` พื้นฐาน, utility class `.web-title`/`.web-description`/`.highlight-text`, ปุ่ม `.btn-primary`/`.btn-accent`

⚠️ **สีขัดแย้งกับ CI ทางการที่เคยยืนยันไปแล้ว**: `--primary-color:#135AF7` คือสี placeholder เดิมที่เคยถูกแทนที่ด้วยสี CI ทางการ `#1B5EF9` ไปแล้วตั้งแต่ rev.3 (ดู § การใช้ UI Style Guide จริงด้านล่าง), และ `--accent-pink:#E91E63`, `--vibrant-yellow:#FFFDE7` ไม่มีอยู่ใน CI palette ทางการที่บันทึกไว้ใน [[cpbf.co.th (บริษัท)]] § Brand System ทางการ — **ถามผู้ใช้แล้ว ผู้ใช้ยืนยันให้เก็บสีชุดนี้ไว้ตามที่ส่งมา** (ตั้งใจเป็นทิศทางสีใหม่ ไม่ใช่ความผิดพลาด) จึงไม่แก้ค่าตัวแปรใดๆ ใน `style.css`

**rev.9 (ผูกไฟล์เข้ากับ mockup)**: เพิ่ม `<link rel="stylesheet" href="style.css">` ใน `<head>` ของ `design/homepage-wireframe.html` ก่อนบล็อก `<style>` เดิม (inline style เดิมโหลดทีหลังจึงยัง override `body`/สีของหน้าเดิมได้ตาม cascade — รูปลักษณ์หน้าปัจจุบันไม่เปลี่ยน) ตรวจสอบแล้วว่าไม่มีชื่อ class ชนกัน (`.btn-primary`, `.btn-accent`, `.web-title`, `.web-description`, `.highlight-text` ไม่เคยถูกใช้ในไฟล์เดิม) และตัวแปร `--primary-color` ของ style.css ไม่ชนกับ `--primary` ที่หน้าเดิมใช้อยู่ (คนละชื่อตัวแปร) ผลคือ utility class ใหม่ (เช่น `.btn-primary`/`.btn-accent`) พร้อมใช้งานได้แล้วแต่ยังไม่ถูกนำไปแปะใช้ใน markup ส่วนไหนของหน้า

## News & Contact section rev.10 — เพิ่ม section ใหม่ Contact Us + redesign News

ผู้ใช้ส่ง markup HTML + CSS เต็มสำหรับ 2 section ใหม่จาก [[News & Contact Section - HTML+CSS]] (`.news-section` แบบ BEM ใหม่ + `.contact-section` ใหม่ทั้งหมด — ดูรายละเอียดต้นฉบับที่ `raw/News & Contact Section - HTML+CSS (จากผู้ใช้).md`)

การเปลี่ยนแปลง:
- **`design/style.css`**: รวม CSS token ชุดใหม่ (เพิ่ม `--primary-hover`, `--primary-dark`, `--primary-soft`, `--accent-pink-hover`, `--accent-pink-soft`, `--highlight-yellow`, `--bg-card`, `--font-desc`, `--font-light`, `--border-color`, `--container-width`, `--card-radius`, `--pill-radius`, shadow tokens) เข้ากับ token เดิมจาก rev.9, เพิ่ม global reset, redefine `.web-title`/`.web-description`/`.btn-primary`/`.btn-accent` ให้เต็มขึ้น, เพิ่ม CSS component เต็มสำหรับ `.news-section`/`.news-grid`/`.news-card__*` และ `.contact-section`/`.contact-panel`/`.contact-list__*`, accessibility focus-visible, responsive breakpoint 1100px/767px, `prefers-reduced-motion` — **เก็บ `.highlight-text` เดิมไว้** (ไม่มีอยู่ใน CSS ชุดใหม่ที่ผู้ใช้ส่งมา แต่มีอยู่ใน rev.9 เดิม ไม่อยากให้หายไปเงียบๆ)
- **ลบ CSS เดิมของ News section ออกจาก inline `<style>`** ใน `homepage-wireframe.html` (เดิมนิยาม `.news-grid`/`.news-card` ไว้คนละแบบตั้งแต่ rev.6/6.1) เพราะชื่อ class ชนกับของใหม่ใน `style.css` — ถ้าไม่ลบ inline style (โหลดทีหลัง) จะ override ทับดีไซน์ใหม่ เหลือ comment สั้นๆ อ้างอิงว่าย้ายไปอยู่ style.css แล้ว
- **News section**: แทนที่ markup เดิมทั้งหมดด้วยโครงสร้างใหม่ (`id="news-events"`, การ์ดกลางมี `.news-card--featured` เอียง 1.5deg + ยกสูงกว่าใบอื่น) — **ใช้เนื้อหาข่าวจริงเดิม 3 รายการ** (Beanie Coffee เปิดตัว / Kaset Fair / ตรุษจีน 2568, รูปจริง `new1.jpeg`/`news2.jpeg`/`new3.jpeg`) **แทนเนื้อหา placeholder ที่ผู้ใช้ส่งมา** (ข่าว OEM/Workshop/เทรนด์สมมุติ, path รูปที่ไม่มีอยู่จริง) — เหตุผล: มีข้อมูลข่าวจริงอยู่แล้วในระบบ ไม่ควรใช้ของสมมุติทับ ตามกฎ CLAUDE.md ห้ามประดิษฐ์ข้อมูล — คงหัวข้อภาษาไทยเดิม "ข่าวสารและกิจกรรม" (ไม่แปลเป็น "News & Event" ตามต้นฉบับ)
- **Contact Us section (ใหม่ทั้งหมด)**: เพิ่ม `id="contact-us"` ก่อน `<footer>` (หลัง `.cta-banner` เดิมจาก rev.4 ซึ่งยังคงอยู่ไม่ได้ลบ) ตามโครงสร้างที่ผู้ใช้ส่งมา — เปลี่ยนข้อมูลติดต่อ "Website" จาก `www.example.com` (placeholder) เป็น `www.cpbf.co.th` (โดเมนจริงที่ทราบแน่ชัด) ส่วน Email/Telephone/Location **ยังคงเป็น placeholder** เพราะไม่มีข้อมูลจริงในระบบ wiki — เปลี่ยน route ลิงก์สมมุติ `/contact`/`/news` เป็น anchor ภายในหน้า `#contact-us`/`#news-events`

⚠️ **ประเด็นที่ยังไม่ได้ถามผู้ใช้ตรงๆ** (ตัดสินใจเชิง editorial ระหว่าง implement ตามหลักการเดิมของโปรเจกต์):
- แทนเนื้อหาข่าว placeholder ด้วยข่าวจริง — ยังไม่ได้ยืนยันกับผู้ใช้ตรงๆ ว่าต้องการแบบนี้ (ต่างจาก rev.6 ที่ผู้ใช้ระบุเนื้อหาข่าวเองตรงๆ)
- เปลี่ยน Website เป็น `www.cpbf.co.th`
- ตอนนี้มี 2 CTA-like element ต่อกัน (`.cta-banner` จาก rev.4 "💬 ติดต่อเราเลย" + `.contact-section` ใหม่จาก rev.10) — อาจจะซ้ำซ้อน ต้องพิจารณาว่าจะรวม/ตัดออกอันไหน
- **สีของ section ใหม่ (News/Contact) ใช้ระบบตัวแปรจาก `style.css`** (`--primary-color:#135af7`, `--accent-pink`, `--vibrant-yellow`) ซึ่งต่างจาก section เดิมอื่นๆ ในหน้าที่ยังใช้สี CI ทางการ (`--primary:#1B5EF9` ระบบตัวแปรเดิมใน inline style) — ทำให้หน้าเว็บตอนนี้มีภาษาสีไม่สม่ำเสมอ (คล้ายปัญหาภาษาไม่สม่ำเสมอที่เคย flag ไว้ตั้งแต่ rev.5)

## Business/Services section rev.11 — ยุบรวม "ธุรกิจของเรา" + "Our Services" เป็น "Our Business"

ผู้ใช้สั่ง (1) ลบ section "ธุรกิจของเรา" (`id="business"`) และ (2) ปรับ section "Our Services" (`id="services"`) ใหม่ตาม markup HTML+CSS ที่ส่งมาจาก [[Our Business Section - HTML+CSS]] (ต้นฉบับคอมเมนต์ว่า "Section 3: Our Business")

การเปลี่ยนแปลง:
- **ลบ section "ธุรกิจของเรา" (`id="business"`) ทั้งหมด** — bento grid เดิม (OEM Manufacturing การ์ดใหญ่ + Catering/Product/Café การ์ดเล็ก) ถูกลบออกจาก HTML และ CSS (`.bento`/`.bento-card`/`.bento-icon`) ถูกลบออกจาก inline `<style>` เหลือ comment อ้างอิง
- **แทนที่ section "Our Services" (`id="services"`) ด้วย section ใหม่ "Our Business" (`id="our-business"`)** — ตีความว่าเป็นการยุบรวม 2 section เดิมเป็น 1 section เดียว เพราะ markup ใหม่ใช้ชื่อ/กรอบนำเสนอ "ธุรกิจ" (business) แต่เนื้อหาการ์ดตรงกับ 4 บริการเดิมทุกตัวอักษรจาก [[Our Services - เนื้อหาบริการ 4 รายการ]] — **ยังไม่ได้ยืนยันการตีความนี้กับผู้ใช้ตรงๆ**
- **CSS**: เพิ่ม "Section 8: Our Business" ใน `design/style.css` (`.business-section`/`.business-grid`/`.business-card__*` แบบ BEM, การ์ด 4 ใบมี theme variant + stagger transform รายใบ) — **ไม่ได้ overwrite** `.web-title`/`.web-description`/`.highlight-text`/`.btn-primary`/`.btn-accent`/`:root` tokens ที่มีอยู่แล้ว (ผู้ใช้ส่ง CSS ชุดที่ redefine ค่าเหล่านี้ใหม่แบบง่ายกว่าเดิม เช่น `.web-title` แบบ fixed font-size แทน `clamp()` — เก็บของเดิมไว้ตามหลักการที่ใช้มาตั้งแต่ rev.10) เพิ่ม CSS component เฉพาะของ section นี้เท่านั้น
- **eyebrow**: ใช้ class ร่วม `.section-eyebrow` (แทน `business-section__eyebrow` เฉพาะที่ผู้ใช้ส่งมา) ให้สอดคล้องกับ News/Contact section
- **ปุ่ม "ดูรายละเอียด"**: เปลี่ยน route สมมุติ (`/services/coffee-roasting` ฯลฯ) เป็น anchor `#our-business` เพราะยังไม่มีหน้ารายละเอียดบริการจริง
- **nav**: รวมลิงก์ `#business`/`#services` (2 รายการเดิม) เหลือลิงก์เดียว `#our-business` label "ธุรกิจของเรา"
- ⚠️ **ตัด `.stats-strip` (4 สถิติ: สายธุรกิจหลัก/ควบคุมคุณภาพ/สั่งซื้อออนไลน์/OEM มาตรฐานสากล)** ที่เคยอยู่ใน section "Our Services" เดิม (rev.8) ออกไปด้วย เพราะ markup ใหม่ที่ผู้ใช้ส่งมาไม่มีองค์ประกอบนี้ — ยังไม่ได้ถามผู้ใช้ตรงๆ ว่าตั้งใจตัดทิ้งหรือไม่

⚠️ **ประเด็นที่ยังไม่ได้ถามผู้ใช้ตรงๆ**:
- การตีความว่า "ปรับ Our Services" หมายถึงการยุบรวมกับ "ธุรกิจของเรา" เป็น section เดียว (ไม่ใช่แค่ปรับดีไซน์ Our Services โดยคง "ธุรกิจของเรา" ไว้ต่างหาก)
- การตัด stats-strip ทิ้งไปพร้อมกัน

## About Us section rev.12 — แทนที่ photo panel เดิมด้วยการ์ดกระดาษ

ผู้ใช้สั่ง "เปลี่ยน section about เป็นตามนี้" พร้อม markup HTML+CSS ที่ส่งมาจาก [[About Us Section - HTML+CSS]] (ต้นฉบับคอมเมนต์ว่า "Section 2: About Us")

การเปลี่ยนแปลง:
- **ลบ section "เกี่ยวกับเรา" เดิม (rev.5) ทั้งหมด** — photo panel (`.about-panel`/`.about-photo`/`.about-copy`) + "what we do" icon row (`.whatwedo-row`/`.whatwedo-item`/`.circle-badge`) ถูกลบออกจาก HTML และ CSS ถูกลบออกจาก inline `<style>` เหลือ comment อ้างอิง
- **แทนที่ด้วย section ใหม่ `.about-section` (`id="about-us"`)** — การ์ดกระดาษ `.about-card` พร้อมป้าย "About Us" (pink pill หมุน -2deg), eyebrow "Our Story" (ใช้ class ร่วม `.section-eyebrow` เหมือน section อื่น), h2 "CP B&F Company Limited", คำอธิบาย 2 ย่อหน้า, ปุ่ม "อ่านเพิ่มเติม", ป้ายกลม "CP B&F" มุมล่างขวา (หมุน 8deg)
- ⚠️ **เนื้อหาข้อเท็จจริงใหม่**: ย่อหน้าคำอธิบายระบุก่อตั้งปี 2016 เป็นส่วนหนึ่งของเครือเจริญโภคภัณฑ์ (Charoen Pokphand Group) — ข้อมูลนี้ไม่เคยมีใน wiki มาก่อน บันทึกเพิ่มใน [[cpbf.co.th (บริษัท)]] § ประวัติ แล้ว (ยึดตามหลักที่เคยทำกับข้อมูลข่าว/CEO ใน rev.6) แต่ยังไม่มี source อื่นยืนยันซ้ำ
- **CSS**: เพิ่ม "Section 9: About Us" ใน `design/style.css` (`.about-section`/`.about-card`/`.about-card__*` แบบ BEM พร้อม decorative pseudo-elements) — **ไม่ได้ overwrite** `.web-title`/`.web-description`/`:root` tokens ที่มีอยู่แล้ว (ผู้ใช้ส่ง CSS ชุดที่ redefine ค่าเหล่านี้ใหม่แบบง่ายกว่าเดิมอีกครั้ง) เพิ่มเฉพาะ token ใหม่ที่ยังไม่มี (`--about-container-width`, `--about-card-radius`, `--about-shadow`)
- **ปรับตามภาพ screenshot จริงที่ผู้ใช้ส่งมา (2026-07-18)**: ตัด `.about-card__highlights`/`.about-highlight` (3 สถิติ) ออกทั้งหมดเพราะไม่ปรากฏในภาพ, เพิ่มปุ่ม "อ่านเพิ่มเติม" ท้ายคำอธิบาย ใช้ class ร่วม `.btn-accent` (สี `var(--accent-pink)` = `#e91e63` ตรงกับที่ผู้ใช้ระบุพอดี ไม่ต้องสร้าง class สีใหม่), ขยาย `.about-card__content` เป็น `max-width: 100%` ให้ข้อความ wrap เต็มความกว้างการ์ดตามภาพ
- ⚠️ **สีเปลี่ยนจาก CI ทางการเป็นชุดสี `design/style.css`**: section เดิม (rev.5) ใช้ตัวแปร CI (`var(--skyblue)` ฯลฯ) จาก inline `<style>` ส่วน section ใหม่นี้ใช้ `--primary-color`/`--accent-pink`/`--bg-card` จาก `design/style.css` เหมือน News/Contact/Our Business (rev.10-11) — ทำให้ section ส่วนใหญ่ของหน้า (ยกเว้น hero + footer) ใช้ชุดสีเดียวกันแล้ว (สม่ำเสมอมากขึ้นภายในกลุ่มนี้) แต่ยังต่างจาก CI ทางการที่ hero ใช้อยู่
- **nav**: เปลี่ยน `<a href="#about">` เป็น `<a href="#about-us">` ให้ตรงกับ `id` ใหม่
- **ภาษา**: content ใหม่ยังเป็นภาษาอังกฤษเหมือน rev.5 เดิม (ไม่เปลี่ยนทิศทางภาษา) — ประเด็น "ภาษาไม่สม่ำเสมอทั้งหน้า" จาก rev.5 ยังคงอยู่เหมือนเดิม

## About Us section rev.28 — ตัดการ์ดกระดาษออกทั้งหมด เหลือ plain text เน้น wording

ผู้ใช้สั่ง (ส่งภาพ ref ประกอบ สไตล์ apéritif brand — พื้นหลังเรียบ, heading serif ใหญ่กึ่งกลาง, ย่อหน้าอธิบายกึ่งกลาง, ปุ่มลิงก์ข้อความเล็กใต้ย่อหน้า): "Change Section About us ไม่ต้องมี BG ไม่ต้องมี Label OUR STORY เน้น show wording มีปุ่มสำหรับกดอ่านเพิ่มเติม"

การเปลี่ยนแปลง (rollback การ์ดกระดาษของ rev.12 เกือบทั้งหมด):
- **HTML** (`design/homepage-wireframe.html`): ลบ `<span class="about-card__label">About Us</span>` (ป้าย pink pill), `<span class="section-eyebrow about-card__eyebrow">Our Story</span>` (eyebrow "Our Story" ตามที่ผู้ใช้ระบุชัดเจน), `<div class="about-card__divider"></div>` (แถบคั่นตกแต่ง), `<span class="about-card__badge">CP B&F</span>` (ป้ายกลมมุมล่างขวา) — เหลือแค่ h2 title + คำอธิบาย 2 ย่อหน้า + ปุ่ม "อ่านเพิ่มเติม" (`.btn-accent`, คงไว้ตามคำสั่ง "มีปุ่มสำหรับกดอ่านเพิ่มเติม")
- **CSS** (`design/style.css`): ลบพื้นหลัง section ทั้งหมดตามคำสั่ง "ไม่ต้องมี BG" — `.about-section` ตัด `background-color: var(--primary-color)` (สีน้ำเงิน) + `overflow:hidden`, ลบ `::before` (ลายจุด radial-gradient สีขาวโปร่งใส) และ `::after` (blob สีชมพูเบลอ) ทั้งคู่ทิ้ง — ตัดกล่องการ์ด `.about-card` ทั้งหมด: ลบ `background-color: var(--bg-card)`, `box-shadow`, ขอบหยักแบบแสตมป์ (`::before`/`::after` วงกลม repeat-x), `:hover` transform — เปลี่ยน `.about-card` เป็น flex container กึ่งกลาง, `.about-card__content` จำกัด `max-width:720px` + `text-align:center`
- **ลบ dead code**: `.about-card__label`, `.about-card__badge` (ทุก breakpoint), `.about-card__divider`, media query override `.about-card{padding:64px 40px 56px}` ที่ 1023px — และ token ที่ไม่มีใครใช้แล้วใน `:root`: `--about-card-radius`, `--about-shadow` (เดิมสร้างไว้ตอน rev.12 เฉพาะใช้กับกล่องการ์ดที่เพิ่งลบไป) — ตัดอ้างอิง `.about-card`/`.about-card:hover` ออกจาก `@media (prefers-reduced-motion: reduce)` block ด้วยเพราะ property ที่เคย override (`transition`/`transform`) ไม่มีอยู่แล้ว
- **การตีความ/judgment call ที่ไม่ได้ระบุตรงๆ ในคำสั่ง** (นอกเหนือจาก "ไม่ต้องมี BG"/"ไม่ต้องมี Label OUR STORY" ที่ระบุชัดเจน): (1) ลบป้าย "About Us" (pink pill) และป้ายกลม "CP B&F" ด้วย แม้ผู้ใช้ระบุแค่ "Label OUR STORY" — เหตุผลคือทั้งสองป้ายถูกออกแบบมาเป็น decoration overlay บนขอบการ์ด เมื่อไม่มีกล่องการ์ด/BG แล้วป้ายจะลอยดูแปลก ไม่สอดคล้องกับภาพ ref ที่ไม่มีป้ายใดๆ เลย และขัดกับเจตนา "เน้น show wording" — ยังไม่ได้ถามยืนยันตรงๆ กับผู้ใช้ (2) ลบ `.about-card__divider` (แถบคั่นตกแต่ง) เพราะเป็นองค์ประกอบตกแต่งที่ไม่ปรากฏในภาพ ref และไม่ใช่ "wording" (3) เปลี่ยน text-align จาก left (เดิม) เป็น center ตามภาพ ref ที่ส่งมา แม้ข้อความสั่งไม่ได้ระบุเรื่อง alignment ตรงๆ — ตีความว่าภาพ ref คือส่วนหนึ่งของคำสั่ง
- ⚠️ ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริงว่า layout ใหม่ (กึ่งกลาง, ไม่มีกล่อง) แสดงผลตามภาพ ref จริงหรือไม่ — ยังไม่ได้ยืนยันเรื่องการลบป้าย "About Us"/"CP B&F" กับผู้ใช้
- ตรวจสอบด้วย Python: CSS brace สมดุล (269/269, ลดจากเดิม 284 เพราะลบ rule/pseudo-element หลายจุด), HTML tag สมดุลทุกตัว (`html.parser` stack-based)

## Products section rev.29 — เปลี่ยน Online Shop slider เป็น product grid + view more

ผู้ใช้สั่ง "change section product" พร้อมส่ง markup HTML+CSS+JavaScript ฉบับสมบูรณ์สำหรับ section "Products" ใหม่ (grid การ์ดสินค้า 8 ใบ, ปุ่ม quantity stepper, ปุ่ม "Add to cart", ปุ่ม toggle "View more/View less") และระบุเพิ่มเติมท้ายข้อความ: "สีอ้างอิงตาม CI", "รูปสินค้าสุ่มใช้จาก raw/assets/image/New Project.png, New Project1.png, New Project2.png", "รายละเอียดสินค้าสุ่มใช้จากของเดิมไปก่อน"

การเปลี่ยนแปลง (แทนที่ section "SHOP ONLINE" ของ rev.13 ทั้งหมด):
- **HTML** (`design/homepage-wireframe.html`): เปลี่ยน nav link `#online-shop` → `#products` — แทนที่ `<section class="shop-section" id="online-shop">` ทั้ง block ด้วย `<section class="product-section" id="products">` — `.product-heading` (eyebrow "OUR PRODUCTS" / h2 "What's in Season" / description ภาษาอังกฤษ คงคำเดิมตามที่ผู้ใช้ส่งมาแบบ literal ไม่แปลไทย) — `.product-grid#productGrid` มีการ์ด `.product-card` **5 ใบ** (ไม่ใช่ 8 ใบตาม template ต้นฉบับ)
- **ไม่ fabricate สินค้าเพิ่ม**: ของเดิม (rev.13 Online Shop) มีสินค้าจริงแค่ 5 รายการ ("รายละเอียดสินค้าสุ่มใช้จากของเดิม" หมายถึงชุดนี้) ผู้ใช้ให้ template ที่มี 8 การ์ด (4 แสดง + 4 ซ่อนใน "view more") แต่เนื่องจากไม่มีข้อมูลสินค้าจริงเกิน 5 รายการ จึงใช้แค่ 5 การ์ด: 4 ใบแรกแสดงตรง, ใบที่ 5 (HEY! BEV รสทับทิม) ใส่ class `product-card--additional` ซ่อนไว้ใน "view more" กลุ่มเดียว — ไม่ได้แต่งชื่อ/ราคา/คำอธิบายสินค้าใหม่ที่ไม่มีอยู่จริง
- **ข้อมูลสินค้า 5 รายการ** (ชื่อ/คำอธิบาย/ราคา/ลิงก์ ทั้งหมดสืบมาจาก [[Online Shop Section - HTML+CSS]] rev.13 เดิม): Instant Konjac Jelly (330.00 บาท, ลิงก์จริง cpbf.co.th/en/products/77), CP B&F Beverage Creamer (130.00 บาท, ลิงก์ placeholder `#products`), Coffee Flower Honey (160.00 บาท, ลิงก์ placeholder), House Blend 100% Pure Roasted Coffee (340.00 บาท, ลิงก์จริง cpbf.co.th/th/products/103), HEY! BEV รสทับทิม (129.00 บาท, ลิงก์จริง cpbf.co.th/th/products/93, การ์ด additional)
- **รูปสินค้า**: หมุนเวียนใช้ `New Project.png`/`New Project1.png`/`New Project2.png` ตามที่ผู้ใช้ระบุ ("สุ่มใช้จาก") — alt text ทุกภาพระบุชัดว่า "(ภาพตัวอย่างชั่วคราว)" เพื่อไม่ให้เข้าใจผิดว่าเป็นภาพสินค้าจริง
- **ลิงก์จริง vs ปุ่ม Add to cart**: template ที่ผู้ใช้ส่งมากำหนดปุ่ม `.product-card__button` เป็น `type="button"` (ไม่ใช่ลิงก์ไปหน้าสั่งซื้อ) — คงพฤติกรรมนี้ตามต้นฉบับ แต่ย้ายลิงก์สั่งซื้อจริง (cpbf.co.th) ไปไว้ที่ `.product-card__image-link` (คลิกรูปสินค้า) แทน เพื่อไม่ให้ลิงก์จริงหายไปจากดีไซน์
- **สี**: `--product-bg` ต่อการ์ด (inline `style`) อ้างอิง design token เดิมแทนการ hardcode สีใหม่ (`var(--accent-pink-soft)`, `var(--vibrant-yellow)`, `var(--primary-soft)`, และ `#f3ede0` cream ที่ไม่มี token เดิมจึงคงค่า hex ตามของเก่า) — คงกลุ่มสีเดิมของแต่ละสินค้าจาก rev.13 ไว้เพื่อความต่อเนื่อง
- **CSS token ("สีอ้างอิงตาม CI")**: `:root` เดิมมี `--primary-color: #135af7` ใกล้เคียงสี CI จริง `#1B5EF9` อยู่แล้ว จึง alias token ใหม่จาก template แทนที่จะประกาศซ้ำ/ใช้สีทองที่ template กำหนดมาเอง: `--product-accent: var(--primary-color)`, `--product-accent-hover: var(--primary-hover)`, `--text-primary: var(--font-title)`, `--text-secondary: var(--font-desc)`, `--border-light: var(--border-color)` — เพิ่ม token ใหม่จริงแค่ 1 ตัวที่ไม่มีของเดิมเทียบเท่า: `--bg-product-section: #f4f3f1` — ไม่เพิ่ม `--text-muted`/`--shadow-soft`/`--shadow-strong` ที่ template ประกาศไว้ใน `:root` ของตัวเองเพราะไม่ถูกใช้จริงใน CSS rule ใดๆ ของ template นั้น — ข้าม `* { box-sizing: border-box; }` เพราะไซต์มี global reset นี้อยู่แล้ว
- **CSS** (`design/style.css`): แทนที่ทั้ง block "Section 10: Online Shop" (`.shop-section`, `.shop-card`, `.shop-nav`, `.shop-grid` slider ฯลฯ) ด้วย "Section 10: Products" — `.product-section`, `.product-container`, `.product-heading*`, `.product-grid` (static grid 4 คอลัมน์ ไม่ใช่ scroll-slider แบบเดิม), `.product-card*` (รวม `.product-card--additional{display:none}` + `.product-grid.is-expanded .product-card--additional{display:flex}`), `.quantity-button*`/`.quantity-input`, `.product-view-more`/`.product-view-more__button` (แก้ class ให้ตรงกับ markup จริงที่ปุ่มอยู่ใน wrapper div), `@keyframes productFadeIn`, responsive breakpoint 1199px (2 คอลัมน์)/767px/420px (1 คอลัมน์) — อัปเดต `@media (prefers-reduced-motion: reduce)` ตัดอ้างอิง `.shop-card`/`.shop-card__button` ออก เพิ่ม `.product-card`/`.product-card__button`/`.product-view-more__icon` (transition:none, transform:none, animation:none)
- **JavaScript** (`design/homepage-wireframe.html`): เพิ่ม `<script>` ใหม่ต่อจาก Hero Parallax script เดิม ก่อน `</body>` — ผูก event `viewMoreButton` toggle class `is-expanded` บน `#productGrid` + สลับ label "View more"/"View less" + `aria-expanded` + scroll-into-view ตอนยุบ, ผูกปุ่ม `.quantity-button--minus`/`--plus` แต่ละการ์ดคำนวณ min/max จาก attribute ของ `.quantity-input`
- ตรวจสอบด้วย Python: CSS brace สมดุล (262/262), HTML tag สมดุลทุกตัว (`html.parser` stack-based, ไม่มี error)
- ⚠️ ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริง (ทั้ง layout, JS toggle, quantity stepper)
- ⚠️ รูปสินค้าเป็นภาพชั่วคราวหมุนเวียน 3 ไฟล์ ไม่ใช่ภาพสินค้าจริง — รอผู้ใช้ให้ภาพจริงมาแทน
- ⚠️ มีแค่ 5 การ์ด (ของจริง) ไม่ใช่ 8 การ์ดตาม template ต้นฉบับ — ยังไม่ได้ยืนยันกับผู้ใช้ว่าต้องการแบบนี้หรือมีสินค้าเพิ่มเติมที่จะให้ข้อมูลตามมาทีหลัง

## Products section rev.30 — restyle ตามภาพ ref apéritif brand "What's in Season"

ผู้ใช้ส่งภาพ screenshot ของดีไซน์ apéritif-brand (ต้นแบบเดียวกับที่ผู้ใช้อ้างอิงตอนส่ง markup ของ rev.29) พร้อมข้อความ "ต้องการให้ปรับ section shop online เป็นตาม design นี้" — ภาพแสดง: heading "What's in Season" ฟอนต์ serif ขนาดใหญ่กึ่งกลาง, การ์ดสินค้าไม่มีกล่อง/เงา/ขอบ (โปร่งไม่มี background), รูปขวดวางอยู่หน้ารูปทรงโค้งประตู (arch) สีตันด้านหลัง (สีต่างกันต่อสินค้า), ชื่อสินค้าฟอนต์ serif กึ่งกลาง, คำอธิบายสั้นสีเทากึ่งกลาง (ไม่มีบรรทัดราคาแยก), quantity stepper แบบเรียบ (ปุ่ม −/+ ไม่มีกรอบวงกลม), ปุ่ม "ADD TO CART • $39.99" เต็มความกว้างการ์ด สีทอง/มัสตาร์ด มุมมนเล็กน้อย (ไม่ใช่ pill เต็ม)

การเปลี่ยนแปลง (`design/style.css` เท่านั้น ไม่แตะ HTML/JS ของ rev.29):
- **ฟอนต์**: เพิ่ม `@import` Google Fonts "Playfair Display" (weight 500/600/700) + token ใหม่ `--font-serif: "Playfair Display", serif` — ใช้กับ `.product-heading__title` และ `.product-card__name` เท่านั้น (ส่วนอื่นของเว็บยังเป็น IBM Plex Sans Thai ตาม rev.25 เดิม)
- **ตัดกล่องการ์ดออกทั้งหมด**: `.product-card` ลบ `background-color`/`border`/`box-shadow`/`border-radius`/`overflow:hidden` ทิ้ง เปลี่ยนเป็น `display:flex; flex-direction:column; align-items:center; text-align:center;` (โปร่งใส กึ่งกลางทุกจุด)
- **รูปทรง arch หลังรูปสินค้า**: `.product-card__visual` เปลี่ยนจากพื้นหลังสี่เหลี่ยมเต็มกรอบ เป็น container โปร่งใสขนาดคงที่ (`max-width:220px; height:260px`) วางรูปสินค้าชิดล่างกึ่งกลาง (`align-items:flex-end`) แล้วสร้างรูปทรงโค้งประตูด้วย `::before` (`width:82%; height:78%; border-radius:999px 999px 0 0;` ใช้สี `--product-bg` เดิมของแต่ละสินค้าจาก rev.29 ไม่เปลี่ยนชุดสี) วางไว้หลังรูปด้วย `z-index:0` (รูปสินค้า `z-index:1`)
- **ซ่อนบรรทัดราคาแยก**: `.product-card__price { display:none; }` เพราะภาพ ref ไม่มีบรรทัดราคาแยก แสดงแค่ในปุ่มเหมือนเดิม (element ใน HTML ยังอยู่ แค่ไม่แสดงผล ไม่ได้ลบออกจาก DOM)
- **Quantity stepper**: `.quantity-button` ตัดกรอบวงกลม/พื้นหลังออก เหลือปุ่มตัวอักษรเปล่าสีเทา เปลี่ยนสีตอน hover แทน (ล้อความเรียบของภาพ ref), `.quantity-input` ลดขนาดกรอบ
- **ปุ่ม Add to cart**: เปลี่ยนจาก `border-radius: var(--pill-radius)` (99px, เต็ม pill) เป็น `border-radius:6px` (มุมมนเล็กน้อยตามภาพ ref), ขยายเป็น `width:100%` เต็มความกว้างการ์ด (เดิม `white-space:nowrap` แคบตามเนื้อหา), เพิ่ม `text-transform:uppercase` + `letter-spacing:0.06em` ให้ตรงกับ "ADD TO CART" ตัวพิมพ์ใหญ่มีระยะห่างตัวอักษรในภาพ ref
- **hover**: ย้าย hover effect จากการ์ดทั้งใบ (translateY+shadow) มาเป็นรูปสินค้าขยายเล็กน้อยแทน (`.product-card__image-link:hover .product-card__image { transform:scale(1.04); }`) เพราะการ์ดไม่มีกล่อง/เงาให้ยกแล้ว
- **Mobile**: ตัด override `.product-heading{text-align:left}` ที่ 767px ออก (ของเดิม rev.29) เพื่อให้ยังกึ่งกลางทุกขนาดจอตามภาพ ref
- **อัปเดต `@media (prefers-reduced-motion: reduce)`**: ย้ายรายการจาก `.product-card`/`.product-card:hover` เป็น `.product-card__image`/`.product-card__image-link:hover .product-card__image` (เพราะ hover effect ย้ายจุดแล้ว) เพิ่ม `.quantity-button` เข้า transition:none list
- **การตีความ/judgment call ที่ไม่ได้ระบุตรงๆ**: (1) สีปุ่ม "Add to cart" คงไว้เป็น `var(--product-accent)` (alias `--primary-color` ตาม CI จาก rev.29) แทนที่จะเปลี่ยนเป็นสีทอง/มัสตาร์ดตามภาพ ref ตรงๆ เพราะยึดคำสั่งก่อนหน้า "สีอ้างอิงตาม CI" ไว้เป็นหลัก — ตีความว่าคำสั่งรอบนี้ "ปรับเป็นตาม design นี้" หมายถึง layout/typography/shape เท่านั้น ยังไม่ได้ยืนยันกับผู้ใช้ว่าต้องการสีทองตามภาพจริงๆ ด้วยหรือไม่ (2) จำนวนคอลัมน์ grid (4 คอลัมน์) และจำนวนการ์ดที่แสดง (5 การ์ดจริง ไม่ fabricate) ยังคงตามเดิมจาก rev.29 ไม่เปลี่ยน เพราะภาพ ref เป็น screenshot ที่อาจถูก crop (เห็นแค่ 3 คอลัมน์) ไม่ใช่ข้อกำหนดจำนวนคอลัมน์ชัดเจน
- ตรวจสอบด้วย Python: CSS brace สมดุล (263/263, +1 จากเดิม 262 ตรงกับ `::before` rule ที่เพิ่ม)
- ⚠️ ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริง (Claude in Chrome ไม่เชื่อมต่อ) — โดยเฉพาะรูปทรง arch ว่าสัดส่วน/ตำแหน่งตรงกับภาพ ref แค่ไหน

## Products section rev.30.1 — ปรับ visual/description/ปุ่ม ตามคำสั่งเพิ่มเติม

ผู้ใช้สั่งต่อเนื่องจาก rev.30 (ข้อความสั้น 5 ข้อ): "product-card__visual ไม่ต้องกำหนด Height, max-width = 300px, product description max 2 lines ตัดคำ auto, style button add to cart ใช้เหมือนปุ่ม primary, ไม่ต้องมี product-heading__description, ตัด label Our product"

การเปลี่ยนแปลง (`design/style.css` + `design/homepage-wireframe.html`):
- **`.product-card__visual`**: ลบ `height: 260px;` ออกตามคำสั่ง (ไม่กำหนด height อีกต่อไป — สูงตามเนื้อหา/รูปสินค้าจริง), เปลี่ยน `max-width` จาก `220px` เป็น `300px`
- **`.product-card__description`**: เพิ่ม CSS line-clamp ให้ตัดคำอัตโนมัติที่ 2 บรรทัด — `display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;` (เดิมเป็น `max-width:32ch` อย่างเดียว ไม่มีการตัดบรรทัดจริง)
- **ปุ่ม "Add to cart" (`.product-card__button`)**: เปลี่ยนให้ใช้สไตล์เดียวกับปุ่ม primary ของเว็บ (`.btn-primary` ที่ `design/style.css:164-193`) — `border-radius` จาก `6px` เป็น `var(--pill-radius)` (pill เต็ม), เพิ่ม `min-height:48px`, `padding:0.75rem 1.5rem`, `box-shadow:0 4px 14px rgb(19 90 247 / 30%)`, hover เพิ่ม `transform:translateY(-2px)` เหมือนปุ่ม primary ทุกจุด, ตัด `text-transform:uppercase`/`letter-spacing` ออก (ปุ่ม primary ไม่มี) — สี/พื้นหลังคงเป็น `var(--product-accent)` เดิม (ไม่เปลี่ยน ยังไม่มีคำสั่งให้เปลี่ยนสี) — คงไว้ `width:100%` เดิม (ปุ่ม primary ปกติเป็น inline-flex แต่การ์ดสินค้าต้องการเต็มความกว้าง)
- **ตัด `.product-heading__description`**: ลบ `<p class="product-heading__description">...</p>` ออกจาก HTML ทั้งหมด (ย่อหน้าอธิบายใต้ h2 "What's in Season") และลบ CSS rule `.product-heading__description` ที่ไม่มีใครใช้แล้วออกจาก `design/style.css`
- **ตัด label "Our product"**: ลบ `<span class="product-heading__eyebrow">OUR PRODUCTS</span>` ออกจาก HTML และลบ CSS rule `.product-heading__eyebrow` ที่ไม่มีใครใช้แล้วออกจาก `design/style.css` — เหลือ `.product-heading` มีแค่ h2 title เดียว
- อัปเดต `@media (prefers-reduced-motion: reduce)`: เพิ่ม `.product-card__button:hover` เข้ากลุ่ม `transform:none` (เดิมมีแค่ `transition:none` ยังไม่มี transform:none ครอบ เพราะเพิ่งเพิ่ม `translateY(-2px)` รอบนี้)
- ตรวจสอบด้วย Python: CSS brace สมดุล (261/261, ลดจากเดิม 263 เพราะลบ `.product-heading__eyebrow`/`.product-heading__description` ออก), HTML tag สมดุลทุกตัว (`html.parser` stack-based, ไม่มี error จริง — void element เช่น `img`/`br`/`meta` แบบ self-closing ตรวจแยกต่างหาก)
- ⚠️ ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริง — โดยเฉพาะผลของการตัด `height` ออกจาก `.product-card__visual` ว่ารูปทรง arch (`::before`, สูง 78% ของ container) จะยังได้สัดส่วนดีหรือไม่เมื่อ container ไม่มี height คงที่แล้ว (สูงตามเนื้อหาแทน)

## Products section rev.30.2 — จำกัดชื่อสินค้า 1 บรรทัด, ฟอนต์ IBM Plex Sans Thai ทั้งหมด, จัดปุ่มระดับเดียวกัน

ผู้ใช้สั่งต่อเนื่อง 3 ข้อ: "Product title Max 1 Line", "ใช้ IBM Plex Sans Thai ทั้งหมด", "ปุ่ม add to cart ต้องอยู่ในระดับเดียวกันทั้งหมด"

การเปลี่ยนแปลง (`design/style.css` เท่านั้น):
- **ชื่อสินค้าจำกัด 1 บรรทัด**: `.product-card__name` เพิ่ม `white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%;` (ตัดคำอัตโนมัติด้วย "..." ถ้าชื่อยาวเกินความกว้างการ์ด แทนที่จะขึ้นบรรทัดใหม่)
- **เลิกใช้ฟอนต์ serif "Playfair Display"**: ลบ `@import` Google Fonts "Playfair Display" ที่เพิ่มไว้ตั้งแต่ rev.30 ออกทั้งหมด, ลบ token `--font-serif` ออกจาก `:root` (ไม่มีใครใช้แล้ว), เปลี่ยน `.product-heading__title` และ `.product-card__name` จาก `font-family:var(--font-serif)` เป็น `font-family:var(--font-family)` (IBM Plex Sans Thai ตาม rev.25) — เพิ่ม `font-weight` จาก `600` เป็น `700` ทั้งคู่เพื่อคงความหนา/เด่นของหัวข้อไว้ในฟอนต์ตัวใหม่ที่ไม่มี serif ช่วยเน้นแล้ว
- **จัดปุ่ม "Add to cart" ให้อยู่ระดับเดียวกันทุกการ์ด**: `.product-card` เพิ่ม `height:100%` (การ์ดยืดเต็มความสูงแถวของ grid, ความสูงแถวถูกกำหนดโดยการ์ดที่สูงที่สุดในแถวเดิมอยู่แล้ว), `.product-card__quantity` เพิ่ม `margin-top:auto` (ดันกลุ่ม quantity stepper + ปุ่มลงไปชิดขอบล่างของการ์ดเสมอ ไม่ว่าชื่อ/คำอธิบายด้านบนจะสั้นหรือยาวกว่ากันแค่ไหน)
- ตรวจสอบด้วย Python: CSS brace สมดุล (261/261 เท่าเดิม — ลบ 1 `@import` rule + 1 token แต่ไม่กระทบ brace count เพราะ `@import` ไม่มี `{}`), HTML tag สมดุลทุกตัว
- ⚠️ ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริง — โดยเฉพาะว่าการจัดปุ่มระดับเดียวกันด้วย `margin-top:auto` ทำงานตรงตามที่ต้องการหรือไม่เมื่อรวมกับผลจาก rev.30.1 ที่ตัด height คงที่ออกจาก `.product-card__visual` (ความสูงรูปสินค้าแต่ละใบอาจไม่เท่ากันแล้ว)

## Contact & Footer section rev.31 — ใช้สีทางการ CI ตาม Ref "Mariana"

ผู้ใช้ส่งภาพ ref เดิม ("Mariana" — 1 ใน 5 ภาพ reference จาก [[CI Guideline และ Reference Design]] ที่เคย ingest ไว้ตั้งแต่ต้นโปรเจกต์) พร้อมสั่ง "ปรับ Section สุดท้ายและ Footer ตาม Ref นี้ ใช้สีตาม CI" — ตรวจสอบพบว่า layout ของ `.contact-section` (rev.10) สร้างจากภาพ ref เดียวกันนี้อยู่แล้ว (3 คอลัมน์: intro/CTA/contact-panel + bottom bar) จึงตีความคำสั่งเป็น **recolor เท่านั้น ไม่แตะ layout/HTML**

**การเปลี่ยนแปลง (`design/style.css` เท่านั้น ไม่แตะ HTML):**
- เพิ่ม token สี CI ใหม่ใน `:root`: `--ci-blue:#1B5EF9`, `--ci-yellow:#FFE02F`, `--ci-red:#FF242A`, `--shadow-ci-red` (ไม่เพิ่ม `--ci-pink` ซ้ำเพราะ `--accent-pink` ปัจจุบัน `#E975CD` ตรงกับสี CI ทางการอยู่แล้วตั้งแต่ rev.26)
- `.contact-section` (พื้นหลังกรอบนอก), `.contact-section__footer` (bottom bar), `footer` (copyright bar) — เปลี่ยนจาก `var(--primary-color)` เป็น `var(--ci-blue)`
- `.contact-section__intro`, `.contact-section__cta`, `.contact-section__cta::after` (พื้นเหลืองซ้าย/กลาง) — เปลี่ยนจาก `var(--vibrant-yellow)` (`#FFFDE7` ครีมอ่อน) เป็น `var(--ci-yellow)` (`#FFE02F` เหลืองสดตรงกับภาพ ref)
- `.contact-panel` (พื้นหลังขวา — ใน ref เป็นสีแดง/ส้ม ไม่ใช่ชมพู), `.contact-panel__label`, `.contact-panel__button` — เปลี่ยนจาก `var(--accent-pink)` เป็น `var(--ci-red)` พร้อม box-shadow ใหม่ `--shadow-ci-red` และ hover shadow โทนแดงเข้ม (จุดเปลี่ยนสีที่เห็นชัดที่สุด)
- `.contact-section__footer-button span` (ไอคอนดาว ✦ ในปุ่ม "Let's work together!") — เปลี่ยนจาก `var(--accent-pink)` เป็น `var(--ci-yellow)` ให้ตรงกับสีดาวเหลืองในภาพ ref
- `.contact-section__intro::after` (วงกลมตกแต่งโปร่งแสงมุมขวาล่าง) — เปลี่ยนจาก `var(--primary-color)` เป็น `var(--ci-blue)` เพื่อความสอดคล้อง (ไม่มีในภาพ ref แต่เป็น decorative flourish เดิมจาก rev.10 ไม่ตัดออกเพราะไม่ใช่คำสั่ง)
- **`<footer>` เดิมไม่มี CSS เลย** (ใช้ default ของ browser, พื้นขาว ตัวหนังสือดำ ชิดซ้าย) — เพิ่ม CSS ใหม่ทั้งหมด: พื้นหลัง `--ci-blue` ต่อเนื่องจาก `.contact-section__footer` ด้านบนให้ดูเป็นแถบเดียวกันตามภาพ ref (ตัวหนังสือลิขสิทธิ์อยู่ในแถบน้ำเงินเดียวกับปุ่ม ไม่ใช่แถบขาวแยก), ตัวหนังสือขาวโปร่งแสง 70% กึ่งกลาง

**ไม่ได้แตะ**: `.contact-section__intro::before` (วงกลมตกแต่งชมพู มุมซ้ายบน) — สีเดิม `var(--accent-pink)` = `#E975CD` ตรงกับ CI pink อยู่แล้วตั้งแต่ rev.26 ไม่ต้องเปลี่ยน

ตรวจสอบด้วย Python: CSS brace สมดุล (262/262, +1 จาก 261 เพราะเพิ่ม rule `footer{}` ใหม่), HTML tag สมดุลทุกตัว (ไม่มีการแก้ HTML รอบนี้) — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง (Claude in Chrome ไม่เชื่อมต่อในรอบนี้)

### rev.31.1 follow-up — ปรับ padding ตามคำสั่งเพิ่มเติม + เปลี่ยน notation สี

ผู้ใช้สั่งต่อเนื่อง 4 ข้อ: "section contact us padding = 0", "class=\"contact-section__footer\" padding บนล่าง = 20px", "var(--ci-yellow) change to RGB 255 224 47", "var(--ci-red) change to #FF242A"

- `.contact-section` — `padding: 50px` (จาก rev.20 ที่เคยปรับให้เท่ากันทุก section ทั้งหน้า) → `padding: 0` ตามคำสั่งตรงตัว ทำให้ section นี้เป็นข้อยกเว้นจาก convention เดิมของ rev.20 เป็นจุดแรก
- `.contact-section__footer` — `padding: 34px clamp(32px, 6vw, 96px)` → เปลี่ยนค่าบน/ล่างเป็น `20px` เหลือ `padding: 20px clamp(32px, 6vw, 96px)` (ซ้าย/ขวายังคง responsive เดิม ไม่ได้สั่งให้เปลี่ยน) — ปรับ mobile override (`≤767px`) ให้สอดคล้องกันด้วย: `34px 20px` → `20px` เท่ากันทุกด้าน
- `--ci-yellow` — เปลี่ยน notation จาก `#FFE02F` เป็น `rgb(255 224 47)` (ค่าสีเดียวกันทุกประการ แค่เปลี่ยนรูปแบบเขียนตามที่ผู้ใช้ระบุ)
- `--ci-red` — ผู้ใช้ระบุ `#FF242A` ซึ่งตรงกับค่าเดิมที่ตั้งไว้ตั้งแต่ rev.31 อยู่แล้ว ไม่มีการเปลี่ยนแปลง

ตรวจสอบด้วย Python: CSS brace สมดุล (262/262 เท่าเดิม — แก้แค่ value ไม่เพิ่ม/ลบ rule) — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง

## Our Business section rev.32 — restyle เป็นแถบไอคอนคั่นเส้นตาม Ref

ผู้ใช้ส่งภาพ ref ใหม่ (4 คอลัมน์ไอคอนวงกลมสี เหลือง/ฟ้า/แดง/เหลือง + หัวข้อตัวหนาพิมพ์ใหญ่ + คำอธิบายสั้น คั่นด้วยเส้นแนวตั้ง พื้นหลังครีม) พร้อมสั่ง "change design section our-business to be Reference design" — ตีความเป็น **rebuild layout section `.business-section` (`id="our-business"`) ใหม่ทั้งหมดให้ตรงกับภาพ ref** เปลี่ยนจากการ์ดกล่อง 4 ใบแบบ stagger เดิม (rev.11) เป็นแถบไอคอน 4 คอลัมน์คั่นเส้นแนวตั้งแบบ flat — **คงเนื้อหาจริงเดิมทั้งหมด** (4 บริการ: Coffee Roasting/OEM น้ำดื่ม/บริการผลิตเครื่องดื่มครบวงจร/บริการรับจัดเลี้ยง จาก [[Our Services - เนื้อหาบริการ 4 รายการ]]) ไม่ fabricate เนื้อหาใหม่ตามภาพ ref (ซึ่งเป็นตัวอย่าง generic "Brand Identity/Web Design/UI-UX Design/Social Design")

**HTML (`design/homepage-wireframe.html`)**: ตัด wrapper `.business-card__content`, `.business-card__number` (เลข 01-04), และปุ่ม "ดูรายละเอียด" (`.business-card__button`) ออกจากทั้ง 4 การ์ด — เหลือแค่ icon (emoji เดิม ☕💧🥤🍽), h3 title, p description เรียงตรงตามภาพ ref (ไม่มีปุ่ม/ตัวเลขในภาพ ref)

**CSS (`design/style.css`)**: เขียนใหม่ทั้ง "Business Card" block —
- `.business-section` เพิ่ม `background-color:#FBF7EF` (ครีมอ่อนตามภาพ ref — สีใหม่ที่ไม่เคยมี token ใน `:root` มาก่อน ใช้ hex ตรงเพราะเป็นสีเฉพาะจุดนี้จุดเดียว)
- `.business-grid` — จาก `gap:24px` ไม่มี column divider เป็น `gap:32px` และใช้ `.business-card + .business-card{border-left:1px solid var(--border-color)}` สร้างเส้นคั่นแนวตั้งระหว่างคอลัมน์ตามภาพ ref
- `.business-card` — ตัด `min-height:420px`, `padding:34px 28px`, `border-radius:34px`, `box-shadow`, และ **transform stagger ทั้งหมด** (`nth-child(2/3/4)` เลื่อนขึ้นลง/หมุนเอียง + hover lift ที่มีมาตั้งแต่ rev.11) ออกทั้งหมด — เหลือ flex column ธรรมดาไม่มีกล่อง/เงา/พื้นหลังของตัวเอง
- `.business-card__icon` — จาก badge โปร่งแสงเล็ก (56px, `rgb(255 255 255/20%)`) เป็นวงกลมทึบสีใหญ่ขึ้น (72px) ใช้ **token CI ที่มีอยู่แล้วจาก rev.31** (`--ci-blue`/`--ci-yellow`/`--ci-red`) แทนสี custom palette เดิม — mapping ตาม class เดิม: `--primary`→ci-blue, `--yellow`→ci-yellow, `--accent`→ci-red, `--white`→ci-yellow (ซ้ำ ตามภาพ ref ที่มี 2 วงกลมเหลืองหัว-ท้าย) — **judgment call**: ใช้ token CI แทนสี custom เพราะให้สีสดตรงกับภาพ ref มากกว่า (`--accent-pink` เดิมเป็นชมพูไม่ใช่แดง)
- `.business-card__title` — ตัด `.business-card__number` label เลขลำดับออก, เปลี่ยนเป็น `text-transform:uppercase`, ลดขนาดจาก `1.375rem`→`1.125rem` (เนื้อหาจริงยาวกว่าตัวอย่างในภาพ ref มาก)
- `.business-card__description` — ตัด `flex-grow`/`margin-bottom:28px` (เดิมดันปุ่มลงล่างสุด, ตอนนี้ไม่มีปุ่มแล้ว) เหลือ margin 0, ลด opacity เป็น 0.75 (จางลงตามภาพ ref)
- ลบ CSS ปุ่ม `.business-card__button` และ variant `--accent`/`--light` ทั้งหมด (ไม่มีปุ่มในภาพ ref แล้ว)
- media query `≤1100px` (2 คอลัมน์): ตัด `.business-card:nth-child(3)` ออกจาก border ซ้าย (เพราะขึ้นแถวใหม่ ไม่ควรมีเส้นคั่น) แทนการ reset transform เดิมที่ไม่มีอีกแล้ว
- media query `≤767px` (1 คอลัมน์): ตัด border-left ออกทั้งหมดแทน (แนวตั้งไม่มีความหมายเมื่อซ้อนเป็นแถวเดียว)
- ทำความสะอาด `@media (prefers-reduced-motion: reduce)` — ลบ selector ที่อ้างถึง `.business-card__button` และ `.business-card:nth-child(x):hover` ที่ไม่มีอยู่แล้วออกจากทั้ง 2 กลุ่ม (transition/transform none)

**ไม่ได้แตะ**: `.business-section__header` (eyebrow "What we do" + h2 "Our Business" + intro) — ภาพ ref ไม่มี header เทียบเท่า จึงคงของเดิมไว้ทั้งหมด

ตรวจสอบด้วย Python: CSS brace สมดุล (245/245, ลดจาก 262 เพราะลบ rule การ์ด/ปุ่ม/nth-child หลายจุดออกไปมากกว่าที่เพิ่มใหม่), HTML tag สมดุลทุกตัว — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง (Claude in Chrome ไม่เชื่อมต่อในรอบนี้), ⚠️ สีวงกลมไอคอนใช้ CI จริง (สด) ต่างจากภาพ ref ที่เป็นโทนพาสเทลนุ่มกว่า — ยังไม่ยืนยันกับผู้ใช้ว่าต้องการสดเท่า CI จริงหรือควรลดความสด

## Global button restyle + About Us background rev.33 — ปุ่ม CTA เป็น text-link ขีดเส้นใต้ทั้งหน้า

ผู้ใช้ส่งคำสั่ง 2 ส่วนพร้อมภาพ ref ใหม่ (หัวข้อฟอนต์ serif + คำอธิบาย + ปุ่ม text-link ขีดเส้นใต้ตัวพิมพ์ใหญ่ "SEE WHAT'S INSIDE" ไม่มีพื้นหลัง/pill):

> "Update Section — BG color = #EBEAE7 — Btn ในแต่ละ section ให้ใช้ style ตามภาพที่แนบทั้งหมด"

คำสั่งกำกวม 2 จุด (section ไหนได้ BG ใหม่, "ในแต่ละ section...ทั้งหมด" หมายถึง global หรือเฉพาะ section เดียว) จึงใช้ `AskUserQuestion` ถามผู้ใช้ตรงๆ ก่อนแก้โค้ด — ผู้ใช้ตอบ: BG `#EBEAE7` → **About Us**, สไตล์ปุ่ม → **ทุกปุ่มทั้งหน้า (global)**

**CSS (`design/style.css`)**:
- `.about-section` เพิ่ม `background-color:#ebeae7`
- Restyle ปุ่ม CTA จริง 5 จุดทั้งหน้าเป็นสไตล์เดียวกัน (ตัด pill/shadow/background ออกหมด เหลือตัวหนังสือขีดเส้นใต้): `border-bottom:2px solid currentcolor`, `background:none`, `padding:0`, `border:0`, `text-transform:uppercase`, `letter-spacing:0.08em`, `font-size:0.8125rem`, `font-weight:700`, hover เปลี่ยนจาก `transform:translateY(-2px)+shadow` เป็น `opacity:0.7` ธรรมดา:
  - `.btn-primary`/`.btn-accent` (ปุ่มร่วม) — สี `var(--font-title)` ใช้ที่ News "ดูทั้งหมด" และ About Us "อ่านเพิ่มเติม"
  - `.product-card__button` (×5 การ์ดสินค้า "Add to cart") — สี `var(--product-accent)`, เปลี่ยนจาก `width:100%` เป็น `width:fit-content` (ตรวจแล้วว่า `.product-card{align-items:center}` ยังจัดกึ่งกลางได้)
  - `.contact-panel__button` — สี `var(--font-light)` (ขาว, คงไว้เพื่อ contrast บนพื้นแดง)
  - `.contact-section__footer-button` ("Let's work together!") — สี `var(--font-light)` (ขาว, contrast บนพื้นฟ้า), ไอคอนดาว `span` คงสี `--ci-yellow` เดิม
- media query `≤767px`: ตัด `.contact-panel__button{width:100%}` ออก (ไม่มีความหมายกับ text-link แล้ว), เปลี่ยน `.contact-section__footer-button` จาก `width:100%;justify-self:stretch` เป็น `justify-self:center`
- ทำความสะอาด `@media (prefers-reduced-motion:reduce)` — ลบปุ่มทั้ง 5 ออกจากกลุ่ม `transform:none` (กลายเป็น dead code เพราะปุ่มไม่ใช้ transform แล้ว เหลือแค่ opacity transition) เหลือเฉพาะ `.news-card`/`.product-card__image-link` ที่ยังใช้ transform จริง

**judgment call (ขอบเขตคำว่า "ปุ่ม")**: ตีความว่า "ปุ่ม" หมายถึงปุ่ม CTA จริงที่ตรงกับภาพ ref (ลิงก์ข้อความเน้นการกระทำ) เท่านั้น — **ไม่แตะ** ปุ่ม UI เชิงฟังก์ชัน: ไอคอน header (login/cart/language), ปุ่ม +/- นับจำนวนสินค้า, ปุ่มลูกศร prev/next ของ hero slider, ปุ่ม view-more ของ product grid — เพราะภาพ ref แสดงลิงก์ CTA ไม่ใช่ control ทั่วไป

ตรวจสอบด้วย Python: CSS brace สมดุล (244/244, ลดจาก 245), HTML tag สมดุลทุกตัว (ไม่มีการแก้ HTML รอบนี้) — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง

## Our Business/Our Partners/Products rev.34 — ตัด label, ย้าย section, เปลี่ยน title/spacing

ผู้ใช้สั่ง 3 ส่วนพร้อมกัน:

1. **Our Business**: BG color = `#ffffff`, ไม่ต้องมี label "What we do"
2. **Our Partners**: ย้ายไปไว้ล่าง section Product, แก้ title "พันธมิตรของเรา" → "Our Partners", ไม่ต้องมี label section
3. **Products**: แก้ title "What's in Season" → "Ready to Shop?", ลด margin-bottom ของ `.product-heading` เหลือ `30px`

**HTML (`design/homepage-wireframe.html`)**:
- `.business-section__header` ตัด `<span class="section-eyebrow">What we do</span>` ออก เหลือ h2+intro
- ย้าย `<section class="partners-section" id="our-partners">` ทั้งบล็อก (รวม comment) จากตำแหน่งเดิม (ระหว่าง Our Business กับ Products) ไปไว้หลัง `.product-section` ปิด ก่อน `.news-section` — ลำดับ section ใหม่: hero → about → business → **product → partners** → news → contact
- `.partners-section__header` ตัด `<span class="section-eyebrow">Our Partners</span>` ออก, เปลี่ยนข้อความ h2 จาก "พันธมิตรของเรา" เป็น "Our Partners" ตรงตามที่สั่ง
- `.product-heading__title` เปลี่ยนข้อความจาก "What's in Season" เป็น "Ready to Shop?"

**CSS (`design/style.css`)**:
- `.business-section` เปลี่ยน `background-color` จาก `#fbf7ef` (rev.32) เป็น `#ffffff`
- `.product-heading` เปลี่ยน `margin: 0 auto 56px` เป็น `margin: 0 auto 30px` — ปรับ mobile override (`≤767px`) จาก `margin-bottom:40px` เป็น `30px` ด้วย เพื่อไม่ให้ spacing มือถือมากกว่า desktop (judgment call เพื่อความสอดคล้อง)
- `.partners-section__header` ไม่ต้องแก้ (ไม่มี style เฉพาะของ eyebrow ให้ cleanup)

ตรวจสอบด้วย Python: CSS brace สมดุล (244/244 เท่าเดิม — แก้แค่ value ไม่เพิ่ม/ลบ rule), HTML tag สมดุลทุกตัว, ลำดับ `<section>` ตรวจแล้วเป็น `hero-section, about-section, business-section, product-section, partners-section, news-section, contact-section` ตามที่ต้องการ — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง

## Header font size consistency + Product card 1 บรรทัด + View more button rev.35

ผู้ใช้สั่ง 3 ส่วน:

1. **header ทุก section ต้อง consistency กัน font size = 2.5rem**
2. **heading แต่ละ product card แสดงสูงสุด 1 บรรทัดตัดคำอัตโนมัติ**
3. **ปุ่ม View more ใช้ style เดียวกับ `.about-card__button`**

**ข้อ 1 — header font size**: ตรวจสอบทุก h2 ในหน้าพบว่า `.web-title` (ใช้ร่วม About Us/Our Business/Our Partners/News) และ `.contact-section__title` ถูกตั้งเป็น `2.5rem` คงที่แล้วตั้งแต่ rev.24 — **มีจุดเดียวที่ตกหล่น**: `.product-heading__title` (Products section) ยังใช้ `font-size: clamp(2.25rem, 4vw, 3rem)` แบบ responsive เดิม (ไม่เคยถูกแก้ตอน rev.24 เพราะตอนนั้น Products section ยังไม่มี, เพิ่มเข้ามาทีหลังใน rev.29) — แก้เป็น `font-size: 2.5rem` คงที่ ให้ตรงกับ header อื่นทั้งหมด

**ข้อ 2 — product card heading 1 บรรทัด**: ตรวจสอบ `.product-card__name` พบว่า**ทำไว้แล้วตั้งแต่ rev.30.2** (`white-space:nowrap` + `text-overflow:ellipsis` + `overflow:hidden`) — ไม่มีอะไรต้องแก้เพิ่ม (ยืนยันด้วยการอ่านโค้ดจริง ไม่ได้เดา)

**ข้อ 3 — ปุ่ม View more**: `.about-card__button` เป็นแค่ modifier (`margin-top:8px`) ที่ใช้ควบคู่กับ `.btn-accent` (สไตล์ text-link ขีดเส้นใต้จาก rev.33) — restyle `.product-view-more__button` (CSS เดิม: pill เต็ม border+background ตัน+hover เปลี่ยนพื้นหลัง) ให้ใช้สไตล์เดียวกับ `.btn-accent`: `border-bottom:2px solid currentcolor`, `background:none`, `padding:0`, `border:0`, `text-transform:uppercase`, `letter-spacing:0.08em`, `font-size:0.8125rem`, hover จาก `background-color` เปลี่ยนเป็น `opacity:0.7` — คงไอคอน chevron + `rotate(180deg)` เมื่อ `aria-expanded="true"` ไว้เหมือนเดิม (ไม่ใช่ส่วนที่ผู้ใช้ขอให้เปลี่ยน)

ตรวจสอบด้วย Python: CSS brace สมดุล (244/244 เท่าเดิม — แก้แค่ property/value ไม่เพิ่ม/ลบ rule), HTML tag สมดุลทุกตัว (ไม่มีการแก้ HTML รอบนี้) — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง

## Products section — ปุ่ม Add to cart แบบวงกลม + max-width เท่ากัน + สี CI rev.36

ผู้ใช้ส่งภาพ ref (การ์ดราคา "฿410" ข้อความหนา + ปุ่มวงกลม "+" สีอ่อนด้านขวา) พร้อมสั่ง 5 ส่วน:

1. **ตัดส่วน quantity stepper (+/-) ออก**
2. **แสดงราคา + ปุ่ม Add to cart ตามภาพ ref** (ราคาข้อความธรรมดา + ปุ่มวงกลม)
3. **max-width แต่ละ product card ต้องเท่ากัน**
4. **ปุ่ม View more ไม่ต้องมีสัญลักษณ์ chevron (V)**
5. **product bg เรียงสี**: `#1b5ef9` → `#ffe02f` → `#e975cd` → `#1b5ef9`

**HTML (`design/homepage-wireframe.html`)**:
- ทั้ง 5 การ์ด (Instant Konjac Jelly, CP B&F Beverage Creamer, Coffee Flower Honey, House Blend, HEY! BEV รสทับทิม): ตัด `.product-card__quantity` (ปุ่ม −/+ และ `.quantity-input`) และ `.product-card__button` (ปุ่ม "Add to cart" แบบ text-link + ราคาซ้ำ) ออกทั้งหมด แทนที่ด้วย `.product-card__actions` ใหม่ = `<span class="product-card__price">฿{ราคา}</span>` (ตัดทศนิยม/คำว่า "บาท" ออก ใช้สัญลักษณ์ ฿ ตามภาพ ref) + `<button class="product-card__add-button">` วงกลมมีไอคอน + (SVG plus)
- `.product-card__visual` inline `--product-bg` ปรับเป็น `var(--ci-blue)` (การ์ด 1, 4), `var(--ci-yellow)` (การ์ด 2), `var(--accent-pink)` (การ์ด 3) ตามลำดับที่สั่ง `#1b5ef9→#ffe02f→#e975cd→#1b5ef9` — ตัวแปรเหล่านี้ตรงกับ token CI ที่มีอยู่แล้ว (`--ci-blue: #1b5ef9`, `--ci-yellow: rgb(255 224 47)` = `#ffe02f`, `--accent-pink: #e975cd`) จึงใช้ token เดิมแทนการ hardcode hex ใหม่ — การ์ดที่ 5 (ซ่อนไว้, HEY! BEV) ผู้ใช้ไม่ได้ระบุสี จึงไล่ pattern ต่อเป็น `var(--ci-yellow)` (judgment call เพื่อความต่อเนื่องของ pattern)
- `.product-view-more__button`: ตัด `<svg class="product-view-more__icon">` (ไอคอน chevron) ออก เหลือแค่ label ข้อความ "View more/View less"
- JS: ตัด event listener ของ quantity stepper (`.product-card__quantity` minus/plus) ออกทั้งบล็อกเพราะ markup ไม่มีแล้ว เหลือแค่ view-more toggle (สลับ class `is-expanded` + label text)

**CSS (`design/style.css`)**:
- `.product-card` เพิ่ม `max-width: 300px; margin: 0 auto;` ให้ทุกการ์ดกว้างเท่ากันแน่นอน (เดิมกว้างตาม grid track `1fr` ซึ่งเท่ากันอยู่แล้วบน desktop แต่จะกว้างเกินบนมือถือ 1 คอลัมน์ — เพิ่ม cap ให้สอดคล้องกับ `.product-card__visual` ที่มี `max-width: 300px` อยู่แล้ว)
- ลบ `.product-card__quantity`, `.quantity-button`, `.quantity-button:hover`, `.quantity-input`, `.quantity-input::-webkit-*-spin-button`, `.product-card__button`, `.product-card__button:hover` (ไม่ใช้แล้ว)
- เพิ่ม `.product-card__actions` (flex, justify-content: space-between), `.product-card__price` (เปิดใช้ใหม่จาก `display:none` เดิม, ตัวหนา 1.5rem), `.product-card__add-button` (วงกลม 44×44px, `border-radius:50%`, `background-color: var(--primary-soft)`, ไอคอน + สีเดียวกับ `--text-primary`, hover เปลี่ยนเป็น `var(--border-light)`)
- ลบ `.product-view-more__icon` และ `.product-view-more__button[aria-expanded="true"] .product-view-more__icon` (ไม่มีไอคอนแล้ว)
- ปรับ `@media (prefers-reduced-motion: reduce)` แทนที่ `.product-card__button`, `.quantity-button`, `.product-view-more__icon` ด้วย `.product-card__add-button` ให้ตรงกับ class ใหม่

ตรวจสอบด้วย Python: CSS brace สมดุล 238/238 (มีเพิ่ม/ลบ rule สุทธิ), HTML tag สมดุลทุกตัว (แก้ script ตรวจ false-positive ของ self-closing void tag เช่น `<img/>`/`<br/>` ให้ handle `handle_startendtag` แยก), ลำดับ `<section>` ไม่เปลี่ยน — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง

## Add to cart สีน้ำเงิน + About Us bg ใหม่ + Hero scallop edge rev.37

ผู้ใช้ส่งภาพ ref พร้อมสั่ง 3 ส่วน:

1. **สีปุ่ม Add to cart ก่อน hover ใช้ `#1b5ef9` font/icon color `#ffffff`**
2. **bg color section About Us จาก `#ebeae7` → `#f4f3f1`**
3. **ขอบล่าง Hero Banner section เป็น Scallop/Stamp Edge ตามภาพตัวอย่าง**

**CSS (`design/style.css`)**:
- `.about-section` (ข้อ 2): `background-color` จาก `#ebeae7` → `#f4f3f1`
- `.product-card__add-button` (ข้อ 1): `background-color` จาก `var(--primary-soft)` → `var(--ci-blue)` (`#1b5ef9`), `color` จาก `var(--text-primary)` → `#ffffff`; hover ปรับจาก `var(--border-light)` → `var(--primary-hover)` (judgment call — ไม่มีสี hover ระบุมา เลือก token น้ำเงินเข้มขึ้นที่มีอยู่แล้วให้สื่อ state hover ชัดเจน)
- `.hero-section::after` (ข้อ 3, เพิ่มใหม่): ทำขอบหยักครึ่งวงกลม (scallop/stamp) ด้วย pseudo-element สูง 16px วางที่ `bottom: 0` ของ `.hero-section` แล้วใช้ `background-image: radial-gradient(circle 16px at 16px 16px, #f4f3f1 15px, transparent 16px)` ร่วมกับ `background-size: 32px 16px; background-repeat: repeat-x;` — เทคนิค: circle รัศมี 16px ศูนย์กลางอยู่ที่ขอบล่างพอดี (tile สูง = รัศมี) ทำให้เห็นแค่ครึ่งบนของวงกลมโผล่เป็นรอยบากขึ้นมาจากขอบล่าง Hero; สีวงกลม = `#f4f3f1` (สีพื้นหลัง `.about-section` ที่อยู่ถัดจาก Hero ทันทีแบบไม่มีช่องว่าง — เพื่อให้เห็นเป็น "รอยบาก" ที่โชว์สีของ section ถัดไปลอดออกมาจริง ไม่ใช่แค่วางสีลอยๆ); ใช้ `z-index: 3` ให้อยู่เหนือ `.hero-section__container` (z-index:2) และภาพ slide เพื่อให้ตัดผ่านเนื้อหาด้านล่างสุดของ Hero ได้จริง
  - พิจารณาเทคนิคอื่นก่อนตัดสินใจ: `mask-image`/`-webkit-mask-image` บน `.hero-section` เอง (ตัด notch โปร่งใสให้ทะลุเห็นพื้นหลัง body) ถูกปัดตกเพราะมีปัญหาเรื่อง cross-browser (`-webkit-mask-image` ค่า default เป็น luminance-based ต่างจาก `mask-image` ที่เป็น alpha-based ต้องกำหนด `mask-mode` เพิ่ม) และซับซ้อนกว่าโดยไม่จำเป็น — เลือกวิธี pseudo-element ทาสีวงกลมทับแทน เพราะ section ถัดไปมีสีพื้นทึบเรียบ (`#f4f3f1`) ที่รู้ค่าแน่นอนอยู่แล้ว รองรับเบราว์เซอร์กว้างกว่าและ debug ง่ายกว่า

ตรวจสอบด้วย Python: CSS brace สมดุล 239/239, HTML tag สมดุลทุกตัว (0 errors) — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง (Claude in Chrome extension ยังไม่เชื่อมต่อในช่วงที่ทำงานนี้ — ควรเปิดดูจริงเพื่อยืนยันขนาด/ตำแหน่งรอยหยักก่อนใช้งานจริง)

**rev.37.1 follow-up**: ผู้ใช้สั่ง "ตรง Curve scallop/stamp ต้อง flip กลับมาอีกฝั่งนึ่ง" — เดิม `.hero-section::after` ทำให้สีของ `.about-section` (`#f4f3f1`) โผล่เป็นปุ่มโค้งขึ้นมา "กัด" เข้าไปใน Hero (แอ่งเว้าจากมุมมอง Hero) ผู้ใช้ต้องการให้กลับด้าน คือปุ่มโค้งสีของ Hero เองห้อยลงมาทับขอบบนของ About Us แทน (แบบขอบหยัก/ชายผ้าคลาสสิก) —
- ลบ `.hero-section::after` เดิมทิ้งทั้งหมด ย้าย logic ไปเป็น `.about-section::before` แทน (วางที่ `top:0` ของ `.about-section` เพราะ `.about-section` ไม่มี `overflow:hidden` เหมือน `.hero-section` — ถ้าทำ pseudo-element ยื่นออกนอกกรอบ `.hero-section` ที่มี `overflow:hidden` จะถูกตัดขาดหายไป)
- กลับทิศ radial-gradient: จุดศูนย์กลางวงกลมย้ายจาก `16px 16px` (ล่างสุดของแถบ) เป็น `16px 0` (บนสุดของแถบ) ทำให้เห็นครึ่งวงกลม*ล่าง*แทนครึ่งบน → ปุ่มโค้งห้อยลงจากขอบบน `.about-section` (คือตำแหน่งรอยต่อกับ Hero พอดี) แทนที่จะโผล่ขึ้นจากขอบล่าง Hero
- สีวงกลมเปลี่ยนจาก `#f4f3f1` (สี About Us) เป็น `var(--ci-blue)` (สี Hero) — ให้ตรงกับตรรกะใหม่ที่ปุ่มโค้งเป็นส่วนหนึ่งของ Hero ที่ยื่นลงมา
- **บั๊กที่พบระหว่างทาง**: `.hero-section { background: var(--primary); }` ใช้ CSS variable `--primary` ที่**ไม่มีการประกาศอยู่จริงใน `:root`** เลย (มีแต่ `--primary-color`, `--primary-hover`, `--primary-dark`, `--primary-soft`) เป็นบั๊กค้างมาตั้งแต่ rev.17 (log เดิมตอนนั้นระบุเจตนาว่าจะใช้สี `#1B5EF9` ซึ่งตรงกับ `--ci-blue` ไม่ใช่ `--primary-color`) — แก้เป็น `background: var(--ci-blue);` ตรงๆ เพื่อให้สีพื้นหลัง Hero จริงตรงกับสีที่ตั้งใจไว้และตรงกับสีปุ่มโค้งใหม่ (ไม่งั้นปุ่มโค้งจะเป็นสีน้ำเงินแต่ตัว Hero เองไม่มีพื้นหลังจริง จะดูขัดกัน)

ตรวจสอบด้วย Python: CSS brace สมดุล 239/239 (เท่าเดิม, ลบ 1 rule เพิ่ม 1 rule) — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง

**rev.37.2 follow-up**: ผู้ใช้สั่ง "เอา Curve scallop/stamp ออก ไม่สวย" — ลบ `.about-section::before` (scallop/stamp แบบ flip จาก rev.37.1) ออกทั้งหมด กลับไปเป็นขอบตรงธรรมดาระหว่าง Hero กับ About Us เหมือนก่อน rev.37 (ยังคงการแก้บั๊ก `background: var(--primary)` → `var(--ci-blue)` ของ `.hero-section` ไว้ตามเดิม เพราะเป็นบั๊กจริงไม่เกี่ยวกับ scallop) — แก้พร้อมกับ rev.38 (footer redesign) ในรอบเดียวกัน ตรวจสอบรวมด้วย Python ท้าย § rev.38 ด้านล่าง

## Site Footer rev.38 — redesign เต็มรูปแบบตามภาพ ref (พื้นเทาอ่อน, wordmark ใหญ่, bottom bar)

ผู้ใช้ส่งภาพ ref แบรนด์กาแฟ "MORNCOFFEE" พร้อมสั่ง "ปรับ footer เป็นตาม ref นี้" — เดิม `<footer>` มีแค่ข้อความ copyright บรรทัดเดียวพื้นน้ำเงิน CI (rev.31) เปลี่ยนเป็น structure ใหม่ทั้งหมดตาม ref (3 คอลัมน์ด้านบน → wordmark ใหญ่เต็มความกว้าง → bottom bar):

**เนื้อหาที่ปรับให้เข้ากับ CP B&F** (ref เป็นร้านกาแฟมี "Opening Hours"/"Events"/"Merch" ซึ่งไม่ตรงกับธุรกิจ B2B ของ CP B&F) — ใช้ judgment call แทนที่เนื้อหาด้วยข้อมูลจริงที่มีอยู่แล้วในระบบแทนการ fabricate:
- คอลัมน์ 1 "Contacts": reuse ข้อมูลติดต่อ placeholder เดิมจาก `.contact-list` (email/เบอร์โทร/ที่ตั้ง Bangkok, Thailand — ⚠️ ยังเป็น placeholder ยังไม่มีข้อมูลจริง)
- คอลัมน์ 2 "Our Business" + "Website": แทนที่ "Opening Hours/Events" ของ ref ด้วยสายธุรกิจจริง 4 อย่างจาก [[cpbf.co.th (บริษัท)]] § สายธุรกิจ (OEM Manufacturing / Catering Service / Product / Café) + โดเมนจริง `www.cpbf.co.th`
- คอลัมน์ 3 (ขวา): เมนู footer nav reuse anchor จริงจาก `.site-header__nav` (เกี่ยวกับเรา/ธุรกิจของเรา/ช้อปปิ้งออนไลน์/ข่าวสาร), badge วงกลม "Social Media" สีเหลือง CI + ไอคอนวงกลม Facebook/Instagram สีน้ำเงิน CI (SVG inline, ⚠️ ลิงก์ social ยังเป็น `#` placeholder ไม่มี handle จริง) — **ตัด scallop/stamp trim ของ badge ออกโดยตั้งใจ** (ไม่ใช้เทคนิคเดียวกับที่ผู้ใช้เพิ่งสั่งเอาออกจาก Hero Banner ใน rev.37.2 เพื่อไม่ให้ซ้ำปัญหาเดิม) เหลือแค่วงกลมเอียงเล็กน้อยธรรมดา
- Wordmark ใหญ่ "CP B&F" สีน้ำเงิน CI เต็มความกว้าง container (`clamp(3.5rem, 13vw, 11rem)`) แทนคำว่า "MORNCOFFEE" ของ ref — **⚠️ ไม่ได้ใส่ภาพประกอบ/illustration ฝังในตัวอักษรเหมือน ref เพราะไม่มี asset จริงที่เหมาะสม** (ต่างจาก text ธรรมดาล้วน)
- Bottom bar: คงข้อความ copyright + disclaimer "Wireframe mockup สำหรับ internal review เท่านั้น" เดิมไว้ (ไม่ลบทิ้ง) เพิ่มปี 2026 นำหน้า, เพิ่มลิงก์ "Privacy Policy | Terms & Conditions" ตาม ref (⚠️ เป็น placeholder `#` ยังไม่มีหน้าจริง)

**CSS**: ลบ `footer { background-color: var(--ci-blue); ... }` (rev.31) ออกทั้งหมด แทนที่ด้วย `.site-footer` (พื้น `#f4f3f1` เดียวกับ About Us เพื่อความสอดคล้องของโทนสี), `.site-footer__top` (grid 3 คอลัมน์), `.site-footer__heading/__address/__text/__link/__nav/__social/__social-badge/__social-icon/__wordmark/__bottom/__legal` ใหม่ทั้งหมด — เพิ่ม responsive breakpoint ที่ `@media (max-width:1100px)` (grid 3→2 คอลัมน์ ย้าย nav+social ลงแถวเต็มความกว้าง) และ `@media (max-width:767px)` (grid เหลือ 1 คอลัมน์, bottom bar เรียงแนวตั้ง) ตาม pattern เดิมของไฟล์

ตรวจสอบด้วย Python: CSS brace สมดุล 264/264, HTML tag สมดุลทุกตัว (0 errors) — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง (Claude in Chrome ไม่เชื่อมต่อตลอด session นี้), ⚠️ ยังไม่ยืนยันเนื้อหาคอลัมน์ Contacts/Our Business/social handle กับผู้ใช้

**rev.38.1 follow-up**: ผู้ใช้สั่งเพิ่ม 2 ข้อ — (1) `.site-footer__wordmark` font-size จาก `clamp(3.5rem, 13vw, 11rem)` เปลี่ยนเป็นค่าคงที่ `7rem` ทุกจอ (ข้อความ "CP B&F" ตรงกับที่ผู้ใช้ต้องการอยู่แล้ว ไม่ต้องแก้ข้อความ), (2) section Contact Us — ให้เอาส่วนที่แสดงในภาพ screenshot ที่ผู้ใช้ส่งมา (บล็อก "LET'S CREATE SOMETHING GREAT!" + "Have a project in mind?" + panel แดง "CONTACT US"/Email/Telephone/Website/Location/ปุ่ม "ติดต่อเรา") ออกทั้งหมด แต่ **คง** `.contact-section__footer` (บาร์ล่าง "Passionate about quality..."+ปุ่ม "Let's work together!") ไว้ — ลบ `<div class="contact-section__main">` ทั้งก้อนออกจาก HTML (`.contact-section__intro`/`.contact-section__cta`/`.contact-panel`+ลูกทั้งหมด), ตาม convention เดิม (rev.21) ลบ CSS ที่กลายเป็น dead code ตามไปด้วยทั้งหมด (`.contact-section__main/__intro(::before/::after)/__title/__description/__decorative-line(::after)/__cta(::after)/__cta-text(strong)/__arrow`, `.contact-panel/__label/__title/__button(:hover)`, `.contact-list/__item/__icon/__label` + hover, `.section-eyebrow--dark` — ⚠️ `.section-eyebrow` เฉยๆ ยังใช้อยู่ที่ News section เก็บไว้) รวมถึง responsive override ที่ผูกกับ class เหล่านี้ใน `@media (max-width:1100px)`/`@media (max-width:767px)` และตัด `.contact-panel__button` ออกจาก selector list ใน `@media (prefers-reduced-motion:reduce)`
ตรวจสอบด้วย Python: CSS brace สมดุล 226/226, HTML tag สมดุลทุกตัว (0 errors), Grep ยืนยันไม่มี class ที่ลบเหลือค้างทั้งใน HTML และ CSS — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง

**rev.38.2 follow-up**: ผู้ใช้สั่ง "แก้ไขคำว่า CP B&F ที่ footer เป็นคำว่า 'CP B&F Company Limited'" — เปลี่ยนข้อความ `.site-footer__wordmark` จาก `CP B&F` เป็น `CP B&F Company Limited` ตรงๆ (ไม่แตะ font-size ที่เพิ่งล็อกไว้ `7rem` ใน rev.38.1) — ⚠️ ข้อความยาวขึ้นมากที่ font-size คงที่ `7rem` มีความเสี่ยงล้นความกว้าง container/wrap เป็นหลายบรรทัดบนจอเล็ก ยังไม่ได้ตรวจด้วยเบราว์เซอร์จริงเพื่อยืนยัน
ตรวจสอบด้วย Python: HTML tag สมดุลทุกตัว (0 errors) — ไม่มีการแก้ CSS รอบนี้

## Online Shop section rev.13 — ดีไซน์การ์ดใหม่ (คง slider เดิม)

ผู้ใช้สั่ง "ปรับ Section SHOP ONLINE เป็น Title : Online shop และใช้ข้อมูลสินค้าตามเดิม แต่ดีไซน์เปลี่ยนเป็นตามนี้" พร้อม markup HTML+CSS ที่ส่งมาจาก [[Online Shop Section - HTML+CSS]] (ต้นฉบับคอมเมนต์ว่า "Section 5: Online Shop")

การเปลี่ยนแปลง:
- **ลบ section "SHOP ONLINE" เดิม (rev.7) ทั้งหมด** — slider (`.shop-slider-wrap`/`.shop-grid` auto-flow/`.shop-nav` ลูกศร) + การ์ด `.product-card`/`.product-thumb`/`.product-info`/`.product-actions` ถูกลบออกจาก HTML และ CSS ถูกลบออกจาก inline `<style>` เหลือ comment อ้างอิง
- **แทนที่ด้วย section ใหม่ `.shop-section` (`id="online-shop"`)** — header (eyebrow "Shop online" + h2 "Online shop" ตาม title ที่ผู้ใช้ระบุตรงๆ + description) และการ์ด `.shop-card` ดีไซน์ใหม่ (image-wrapper สี variant, badge, ราคา, ปุ่ม "สั่งซื้อ")
- **ปรับเพิ่ม (2026-07-18) — "ขอเป็น default 4 และ slide เหมือนเดิม"**: ผู้ใช้ขอให้กลับไปแสดง 4 การ์ดเป็นค่าเริ่มต้นพร้อมเลื่อนดูใบที่ 5 แบบ slider เหมือน rev.7 เดิม (การ implement รอบแรกเปลี่ยนเป็น card-grid แสดงสินค้าทั้ง 5 พร้อมกัน ซึ่งไม่ตรงกับที่ผู้ใช้ต้องการ) — แก้โดย**คง ดีไซน์การ์ดใหม่ของ rev.13 ไว้ทั้งหมด** เปลี่ยนเฉพาะ layout: ครอบ `.shop-grid` ด้วย `.shop-section__slider` + ปุ่มลูกศร `.shop-nav.prev`/`.shop-nav.next` (inline `onclick` เรียก `scrollBy()`, `id="shopGrid"` เหมือน rev.7 เดิม), เปลี่ยน `.shop-grid` จาก static grid เป็น `grid-auto-flow:column`+`grid-auto-columns:calc(25% - 18px)`+`overflow-x:auto`+`scroll-snap-type:x mandatory` (เห็น 4 การ์ดพร้อมกัน เลื่อนดูใบที่ 5 ได้), ปรับ responsive breakpoint (1200px/767px) เป็นปรับความกว้างการ์ดแทน grid-column ตายตัว
- **"ใช้ข้อมูลสินค้าตามเดิม"**: แทนสินค้าสมมุติ 4 รายการในตัวอย่าง HTML (Signature Coffee Blend ฯลฯ, path รูปที่ไม่มีอยู่จริง) ด้วยสินค้าจริง 5 รายการเดิมจาก [[Shop Online - รายการสินค้า 5 รายการ]] (Instant Konjac Jelly, CP B&F Beverage Creamer, Coffee Flower Honey, House Blend 100% Pure Roasted Coffee, HEY! BEV รสทับทิม) ตามคำสั่งผู้ใช้ตรงๆ — grid ขยายจาก 4 เป็น 5 การ์ด
- **badge**: ตัด badge การตลาดสมมุติ (Best seller/Popular/New/Special edition) ที่ไม่มีข้อมูลจริงรองรับออก ใช้ badge แสดงหมวดหมู่สินค้าจริงแทน (วัตถุดิบ/เครื่องดื่ม/เมล็ดกาแฟ/Hey! Bev) สลับสี primary/accent
- ⚠️ **ปุ่ม "+ เพิ่มลงตะกร้า" ที่มีใน rev.7 เดิมถูกตัดออก** — ดีไซน์ใหม่เหลือปุ่มเดียวต่อการ์ด ("สั่งซื้อ →") ยังไม่ได้ยืนยันกับผู้ใช้ตรงๆ ว่าตั้งใจตัดฟังก์ชันเพิ่มลงตะกร้าทิ้ง
- **รูปสินค้า**: ยังไม่มีรูปจริง 5 SKU เหมือน rev.7 เดิม ใช้ emoji เดิม (🍮🥛🍯☕🥤) แทน `<img>` ที่ต้นฉบับกำหนด
- **CSS**: เพิ่ม "Section 10: Online Shop" ใน `design/style.css` (`.shop-section`/`.shop-grid`/`.shop-card__*` แบบ BEM) — **ไม่ได้ overwrite** `.web-title`/`.web-description`/`.btn-primary`/`:root` tokens ที่มีอยู่แล้ว (ผู้ใช้ส่ง CSS ชุดที่ redefine ค่าเหล่านี้ใหม่แบบง่ายกว่าเดิมอีกครั้ง) **ไม่เพิ่ม token ใหม่เลย** เพราะ token ที่ส่งมาซ้ำซ้อนกับที่มีอยู่แล้วทั้งหมด (`--shop-border`≈`--border-color`, `--shop-container-width`≈`--container-width`, `--shop-card-radius`≈`--card-radius`, `--shop-font`≈`--font-family`, `--shop-shadow`≈`--shadow-card`) ใช้สี variant กล่องรูปจาก token ที่มีอยู่แล้ว (`--accent-pink-soft`/`--vibrant-yellow`/`--primary-soft`) + สี cream ใหม่ครั้งเดียว
- **nav**: เปลี่ยน `<a href="#shop">` เป็น `<a href="#online-shop">` ให้ตรงกับ `id` ใหม่
- **ปุ่ม "ดูสินค้าทั้งหมด"**: ใช้ `.btn-primary` เดิม ลิงก์ไป anchor `#online-shop` (ยังไม่มีหน้ารายการสินค้าเต็มจริง)

⚠️ **ประเด็นที่ยังไม่ได้ถามผู้ใช้ตรงๆ**:
- การตัดปุ่ม "+ เพิ่มลงตะกร้า" ทิ้ง (มีอยู่ใน rev.7 เดิม ไม่มีในดีไซน์ใหม่)
- การตัด badge การตลาดสมมุติออกแล้วแทนด้วย badge หมวดหมู่แทน (ตีความเองตามหลักห้ามประดิษฐ์ข้อมูล)

## Hero Banner section rev.14 — polaroid gallery แทน collage เดิม

ผู้ใช้สั่ง "ปรับ section บนสุด ดังนี้ Section 1: Hero Banner" พร้อม markup HTML+CSS ที่ส่งมาจาก [[Hero Banner Section - HTML+CSS]]

การเปลี่ยนแปลง:
- **ลบ section hero เดิม (rev.1-4) ทั้งหมด** — `.hero` (พื้นน้ำเงิน grid 2 คอลัมน์) + `.hero-art`/`.blob`/`.sticker`/`.hero-features`/`.product-stack`/`.hero-banner-img`/`.float-chip`/`.tag-pill`/`.seal-badge`/`.marker` ถูกลบออกจาก HTML และ CSS ถูกลบออกจาก inline `<style>` — **ยกเว้น** `.btn-solid` และ `.doodle` ที่ยังใช้อยู่ใน `.cta-banner` ท้ายหน้า จึงคงไว้
- **แทนที่ด้วย section ใหม่ `.hero-section` (`id="home"`, เปลี่ยนจาก `id="hero"` เดิม)** — header (eyebrow "CP B&F Company Limited" + h1 "Crafted for every business" + description ภาษาไทย + ปุ่ม 2 อัน) และ `.hero-gallery` แบบ polaroid gallery 4 รูปเอียงสลับกัน
- **รูปสินค้า**: ต่างจาก section อื่นก่อนหน้า (About/Shop) section นี้**มีรูปจริงอยู่แล้ว** — `hero-business-01.png` ถึง `04.png` มีอยู่จริงใน `raw/assets/image/` จึงใช้ `<img>` ตามต้นฉบับได้เลย (แก้ path จาก `assets/image/...` เป็น `../raw/assets/image/...` ให้ตรงกับตำแหน่งไฟล์จริง) แทนที่ `Hero banner.png` เดี่ยวเดิม (ภาพสต็อก placeholder "BRAND")
- **CSS**: เพิ่ม "Section 11: Hero Banner" ใน `design/style.css` (`.hero-section`/`.hero-gallery`/`.hero-photo`/`.hero-decoration` แบบ BEM) — **ไม่ได้ overwrite** `:root` tokens/Base reset/`.btn-primary`/`.btn-accent` ที่มีอยู่แล้ว (ผู้ใช้ส่ง CSS ชุดที่ redefine ค่าเหล่านี้ซ้ำอีกครั้ง ค่าตรงกันเกือบทั้งหมด) เพิ่ม token ใหม่เฉพาะที่ไม่ซ้ำ (`--hero-container-width:1500px`, `--hero-shadow`) ตามรูปแบบเดียวกับ `--about-container-width`/`--about-shadow`
- **id/nav**: เปลี่ยน `id="hero"` เป็น `id="home"` ตามที่ผู้ใช้ระบุตรงๆ — ตรวจสอบแล้วไม่มี nav link อ้างอิง `#hero` เดิม จึงไม่กระทบ
- **ปุ่ม CTA**: "ดูบริการของเรา" → `#our-business`, "ติดต่อเรา" → `#contact-us` (ทั้ง 2 id มีอยู่จริงในหน้า)

## Hero Banner section rev.16 — ตัด eyebrow/ปุ่ม/border ออก แทน gallery ด้วยแบนเนอร์เดียว

ผู้ใช้สั่งผ่านแชท (ไม่มี markup แนบมา แต่แนบภาพ "Thai Specialty Coffee" banner จาก brand "ATO Chiang Rai"):
> แก้ไข Section แรก — ไม่ต้องมี border ของ Section / ไม่ต้องมีข้อความ CP B&F Company Limited / ไม่ต้องมีปุ่ม ดูบริการของเรา / ไม่ต้องมีปุ่มติดต่อเรา / ลบ 4 รูปภาพออก และใส่เป็นแบนเนอร์ภาพนี้แทน

การเปลี่ยนแปลง:
- **ลบ `.hero-section::before`** (inset border 2px สีขาวโปร่งแสง ที่ล้อมกรอบ section) ออกทั้งหมด
- **ลบ eyebrow "CP B&F Company Limited"** (`.hero-section__eyebrow`) และ CSS ที่เกี่ยวข้องออก
- **ลบปุ่ม CTA ทั้ง 2 อัน** ("ดูบริการของเรา" → `#our-business`, "ติดต่อเรา" → `#contact-us`) และ `.hero-section__actions` ออก
- **ลบ polaroid gallery 4 รูปเดิม** (`.hero-gallery`/`.hero-photo`/`hero-business-01.png`-`04.png`) ออกทั้งหมด แทนที่ด้วย `.hero-banner` แบนเนอร์ภาพเดียว ใช้ `raw/assets/image/hero-business.png` (ไฟล์ที่ผู้ใช้บันทึกไว้ในโฟลเดอร์นี้เอง ตาม path ที่ผู้ใช้ระบุ)
- ⚠️ **ภาพแบนเนอร์ที่ใช้เป็นภาพโปรโมทสินค้า "Thai Specialty Coffee" ของแบรนด์ "ATO Chiang Rai"** ไม่ใช่ภาพผลิตภัณฑ์/ทีมงานของ CP B&F เอง — ผู้ใช้ยืนยันให้ใช้ภาพนี้ตรงๆ ตามที่ส่งมา ยังไม่ชัดเจนว่าเป็นภาพชั่วคราวสำหรับทดสอบ layout หรือภาพที่ตั้งใจใช้จริง ควรตรวจสอบกับผู้ใช้อีกครั้งก่อนขึ้นเว็บจริง
- **CSS**: ลบ `.hero-photo*`/`.hero-gallery` ทั้งหมดใน `design/style.css` § Section 11 (รวม responsive breakpoints ที่ 1100px/767px/390px และ reduced-motion block) แทนที่ด้วย `.hero-banner`/`.hero-banner__image` (ภาพเดียว เต็มความกว้าง, border-radius 20px, ใช้ `--hero-shadow` token เดิม)
- ตรวจสอบโครงสร้างด้วย Python script หลังแก้: HTML tag สมดุลทุกตัว, CSS brace สมดุล (268/268)

## Hero Banner section rev.17 — แยกสลายเป็น layer ข้อความ/ไอคอน/รูปภาพ พร้อม parallax animation

ผู้ใช้สั่งผ่านแชท (อ้างอิงภาพแบนเนอร์ rev.16 เป็น "ref" ให้แยกสลาย ไม่ใช่ใช้ทั้งภาพอีกต่อไป):
> แก้ไข section แรก อีกครั้งใช้แบนเนอร์ raw/assets/image/hero-business.png นี้ ref โดยทำให้ asset ในภาพ เช่น ข้อความ และรูปภาพแยกออกจากกัน ให้มี animation ขยับได้ โดยใช้ภาพสินค้าที่ไดคัทเป็นภาพนี้ raw/assets/image/New Project.png / BG #1B5RF0

**จุดที่ถามยืนยันก่อนทำ (AskUserQuestion)**:
- สี BG ที่ระบุ `#1B5RF0` ไม่ใช่ hex code ที่ถูกต้อง (ตัว "R" ไม่ใช่ hex digit) — เสนอ 3 ตัวเลือก (`#1B5EF9` สีน้ำเงิน CI ทางการ / `#1B5FF0` ตีความใกล้เคียงตัวสะกด / `#135AF7` สี primary สมมุติเดิมก่อนใช้ CI) — **ผู้ใช้เลือก `#1B5EF9`**
- รูปแบบ animation ที่ต้องการ (คำว่า "ขยับได้" ตีความได้หลายแบบ) — เสนอ 3 ตัวเลือก (Floating loop ลอยขึ้นลงอัตโนมัติ / Scroll-reveal ปรากฏตอน scroll เข้ามา / Parallax ตาม mouse/scroll) — **ผู้ใช้เลือก "Parallax ตาม mouse/scroll"**

การเปลี่ยนแปลง:
- **ยุบ `.hero-banner` (ภาพเดียวจาก rev.16) ออกทั้งหมด** แทนที่ด้วย `.hero-showcase` — โครงสร้างใหม่ที่แยกองค์ประกอบภาพ ref (`hero-business.png`) ออกเป็น DOM element อิสระที่ขยับได้แยกกัน แทนที่จะเป็นภาพแบนราบภาพเดียว:
  - `.hero-showcase__index` — เลข "02" + เส้นคั่น (ล้อ index number ในภาพ ref)
  - `.hero-showcase__caption` — ข้อความ "Chiang Rai Specialty Arabica / Single Origin from Chiang Rai"
  - `.hero-showcase__title` — "Thai / Specialty / Coffee" (3 บรรทัดแยก span)
  - `.hero-showcase__description` — คำอธิบายรสชาติกาแฟ (ล้อข้อความในภาพ ref)
  - `.hero-showcase__badges` — 2 ป้าย pill ("Aromatic & Light", "Region: Chiang Rai") พร้อมไอคอน "+"
  - `.hero-showcase__product` — รูปสินค้าไดคัท ใช้ `raw/assets/image/New Project.png` (ยืนยันแล้วว่าเป็นไฟล์ PNG 325×544 มี alpha channel จริง = ไดคัทพื้นหลังโปร่งใสจริง)
  - `.hero-showcase__features` (แถวล่าง 3 รายการ) — 🌱 Natural Process / ⛰ Altitude 1,200-1,500 MASL / ☕ Variety: Catimor (ใช้ emoji icon ตามธรรมเนียมเดิมของไฟล์นี้ ไม่ใช่ SVG)
  - ⚠️ **ไม่ได้สร้างกราฟิกลวดลายเจดีย์/วัด (temple silhouette) ที่ปรากฏในภาพ ref** เพราะไม่มี asset แยกให้ — ตัดสินใจไม่ประดิษฐ์ภาพขึ้นเองแทนตาม CLAUDE.md
- **BG**: เปลี่ยน `.hero-section` background จาก gradient overlay บน `--primary-color` (ชุดสี non-CI เดิม) เป็นสีทึบ `var(--primary)` (`#1B5EF9`) — **reuse CSS variable ที่มีอยู่แล้ว** ใน inline `<style>` ของ `homepage-wireframe.html` (`:root { --primary:#1B5EF9; }` ใช้อยู่แล้วกับ footer) แทนการ hardcode ค่าใหม่ซ้ำ เพราะค่าตรงกับที่ผู้ใช้เลือกเป๊ะ
- **Parallax JS (ใหม่ — script แรกในไฟล์นี้)**: เพิ่ม `<script>` ก่อน `</body>` — ใช้ `data-hero-parallax` เป็น stage หลัก, แต่ละ element ที่ต้องขยับมี `data-depth="0.15"` ถึง `"0.6"` กำหนดความแรงของการขยับ, ฟัง `mousemove`/`mouseleave` ภายใน stage คำนวณตำแหน่ง mouse normalize เป็น -1..1 แล้วคูณ depth, ฟัง `scroll` (passive) เพิ่ม offset ตามตำแหน่ง scroll ของ section, ใช้ `translate3d()` เพื่อ performance — **เคารพ `prefers-reduced-motion: reduce`** (เช็คตอนต้นสคริปต์แล้ว early-return ถ้า user ตั้งค่าลด motion ไว้ ไม่ผูก event listener เลย) — เพิ่ม CSS `transition: transform 0.2s ease-out` บน `[data-depth]` ทุกตัวเพื่อความ smooth ระหว่างขยับ (ไม่ได้ขอตรงๆ แต่จำเป็นเพื่อไม่ให้ parallax กระตุก)
- **CSS**: ลบ `.hero-section__header`/`.hero-section__title`/`.hero-section__description`/`.hero-banner`/`.hero-banner__image` (จาก rev.16) ออกทั้งหมด เพิ่มระบบ CSS ใหม่ `.hero-showcase` + BEM sub-elements ทั้งหมด (~20 rule blocks) อัปเดต responsive breakpoints (1100px/767px/390px เดิมอ้างอิง class ที่ถูกลบไปแล้ว) ให้ชี้ไป `.hero-showcase__*` แทน (`.hero-showcase__main` เปลี่ยนเป็น column บนจอเล็ก, `.hero-showcase__top`/`.hero-showcase__caption` ปรับ text-align, `.hero-showcase__title`/`.hero-showcase__product` ลดขนาด, `.hero-showcase__features` wrap)
- ตรวจสอบโครงสร้างด้วย Python script หลังแก้: CSS brace สมดุล (293/293), HTML tag สมดุลทุกตัว (รวม `<script>`/`<ul>`/`<li>` ใหม่), grep ยืนยันไม่มี class เดิมที่ถูกลบเหลือค้างในทั้งสองไฟล์
- ⚠️ **เนื้อหายังคงเป็นสื่อโปรโมทสินค้า "Thai Specialty Coffee" แบรนด์ "ATO Chiang Rai"** เหมือน rev.16 (แค่เปลี่ยนวิธีนำเสนอจากภาพแบนราบเป็น layer แยก) — ยังไม่ใช่เนื้อหา/แบรนด์ของ CP B&F เอง ต้องตรวจสอบกับผู้ใช้ก่อนขึ้นเว็บจริง

## Hero Banner section rev.18 — จัดตำแหน่ง/ขนาด font ให้ตรงกับภาพ ref 100% ด้วย absolute positioning

ผู้ใช้สั่งผ่านแชท:
> Lay out ขนาด font ตำแหน่งการจัดวางต่าง ๆ ต้องตรงกับตัวอย่างนี้ raw/assets/image/hero-business.png 100%

เดิม rev.17 จัดวาง `.hero-showcase` ด้วย flexbox (`__top`/`__main`/`__copy`/`__visual` wrapper) ซึ่งเป็นการตีความตำแหน่งแบบประมาณ ไม่ได้อิงพิกัดจริงจากภาพ ref — เมื่อผู้ใช้ขอความแม่นยำระดับ "100%" จึงต้อง**วัดพิกัดจริงจากไฟล์ภาพ**แทนการกะด้วยสายตา

**วิธีวัด**: ไม่มี ImageMagick (`magick`/`convert`) ในเครื่อง จึงติดตั้ง `pillow` + `numpy` ผ่าน `pip3` แล้วเขียนสคริปต์ Python วิเคราะห์ `raw/assets/image/hero-business.png` (ยืนยันขนาดจริง **1376×702px** ด้วย `sips`):
- เก็บตัวอย่างสี BG จากมุมภาพ (`arr[5,5]`) แล้วคำนวณ diff mask (`|pixel - bg| > 40`) เพื่อแยกพิกเซล "ตัวอักษร/กราฟิก" ออกจากพื้นหลัง
- ฟังก์ชัน `row_bands()`/`col_bands()` จัดกลุ่มแถว/คอลัมน์พิกเซลที่ไม่ใช่พื้นหลัง (มี gap threshold กันบรรทัดติดกัน) เป็น bounding box แล้วแปลงเป็น % ของขนาดภาพ
- ครอบ/ขยายภาพบางส่วนด้วย `Image.crop()`/`resize(LANCZOS)` ดูตรวจสอบด้วยตาอีกชั้น (เช่นพบว่าตำแหน่งเลข "02" จริงๆ อยู่กึ่งกลางแนวตั้งกับบรรทัด "COFFEE" ของ title ไม่ใช่ใกล้ caption ด้านบนตามที่ตีความผิดไว้ใน rev.17)

**พิกัดที่วัดได้ (% ของ 1376×702px)**:
- Title "THAI/SPECIALTY/COFFEE": left ~11.9%, top 7.8%→49.7% (3 บรรทัด, บรรทัดที่ 2-3 ขยายเข้าไปซ้อนใต้รูปสินค้า สี white 22% opacity ล้อภาพ ref ที่ตัวอักษรถูกรูปสินค้าทับบางส่วน)
- "02" index number + เส้นคั่น: x 3.2%–8.7%, y 40.3%–47.15% (แนวตั้งตรงกับบรรทัด "COFFEE")
- Caption (มุมขวาบน, ชิดขวา): x ~74.7%–95%, y 7.98%–19.8%
- Description (4 บรรทัด, ชิดซ้ายเท่า title): x 11.9%–35.8%, y 55.1%–69.4%
- Badges (มุมขวา, 2 อัน เรียงซ้อน): x ~74–96%, badge1 y 56.55–61.5%, badge2 y 64–69%
- Product bag image: กว้างประมาณ x 31%–67%, y 8%–80% เอียงเล็กน้อย อยู่ทับ (z-index สูงกว่า) title text
- แถวล่าง 3 feature: y ~86–96%, กระจายเท่าๆ กันตามแนวนอน (icon center ~18.5% / 42.6% / 70.2%)
- ⚠️ ลวดลายขอบล่าง (scalloped/dotted border) และกราฟิกเจดีย์/วัดขวาภาพ — **ยังไม่ implement** (ไม่มี asset แยก/ซับซ้อนเกินขอบเขตนี้ ตรงตามหลักไม่ประดิษฐ์ข้อมูลใน CLAUDE.md เหมือน rev.17)

**สถาปัตยกรรมใหม่**:
- เปลี่ยน `.hero-showcase` จาก flexbox → `position: relative` + `aspect-ratio: 1376 / 702` (ล็อกสัดส่วนกล่องให้ตรงกับภาพ ref เป๊ะ) + `container-type: inline-size` (เปิด container query)
- ลบ wrapper div `__top`/`__main`/`__copy`/`__visual` ออกทั้งหมด ทำให้ทุก element ที่เคยอยู่ในนั้นกลายเป็น child ตรงของ `.hero-showcase` แล้ววาง `position: absolute` ด้วยค่า `top`/`left`/`right`/`width` เป็น % ตามพิกัดที่วัดได้ด้านบน — คง `data-depth` เดิมทุกตัวไว้ (parallax jS จาก rev.17 ไม่ต้องแก้)
- Font-size ใช้หน่วย **container query (`cqw`)** ผสม `clamp()` เช่น `clamp(2rem, 9cqw, 6.5rem)` เพื่อให้ตัวอักษรสเกลตามความกว้างกล่องเอง (ไม่ใช่ viewport) พร้อมกันขนาดเล็ก/ใหญ่เกินไป
- Z-index: title `z-index:1` อยู่ **หลัง** รูปสินค้า `z-index:2` (ตรงกับภาพ ref ที่ตัวอักษรถูกถุงกาแฟบังบางส่วน) ส่วนอื่น (caption/index/description/badges/features) ใช้ `z-index:4` อยู่บนสุด
- **ลบ `.hero-decoration` ทั้ง 4 ชิ้น** (`--dot-1`, `--dot-2`, `--pill-1`, `--pill-2` จาก rev.1-4 เดิม) ออกจาก HTML+CSS เพราะไม่มีองค์ประกอบเทียบเท่าในภาพ ref — ขัดกับเป้าหมาย "100%"
- Media query เดิม (1100px/767px/390px) อ้างอิง class ที่ถูกลบไปแล้ว จึงลดรูปใหม่เหลือปรับ `padding` ของ `.hero-section` เท่านั้น (aspect-ratio + %/cqw ทำให้ responsive อยู่แล้วในตัว โดยไม่ต้องเขียน breakpoint แยกสำหรับ layout)
- ตรวจสอบโครงสร้างหลังแก้: CSS brace สมดุล (267/267), HTML tag สมดุลทุกตัว (section/header/nav/ul/li/div/button/a/script), grep ยืนยันไม่มี class ที่ถูกลบ (`hero-decoration`, `hero-showcase__top/__main/__copy/__visual`) ค้างอยู่ในทั้งสองไฟล์
- ⚠️ **ไม่สามารถตรวจสอบผลด้วยการเปิดเบราว์เซอร์จริงได้ในรอบนี้** (เครื่องมือ Claude in Chrome ไม่ได้เชื่อมต่อ) — ตรวจได้แค่ระดับโครงสร้าง (tag/brace balance) และคำนวณพิกัดจากภาพ ref เท่านั้น แนะนำให้ผู้ใช้เปิดไฟล์ดูด้วยตาเพื่อยืนยัน/ปรับละเอียดเพิ่มเติม
- เนื้อหายังคงเป็นสื่อโปรโมท "Thai Specialty Coffee"/"ATO Chiang Rai" เหมือนเดิม (ยังไม่ใช่ของ CP B&F) — carry-over จาก rev.16/17

**ปรับเพิ่ม (rev.18.1)**: ผู้ใช้ feedback ว่ารูปสินค้า (`.hero-showcase__product`) ขนาดใหญ่เกินไปจนทับ `.hero-showcase__description` (ย่อหน้าคำอธิบายรสชาติ ด้านล่างซ้าย) และขอให้ขยับให้อยู่กึ่งกลางแนวนอนของหน้าจอ:
- ลดขนาดจาก `width:36%` เป็น `width:26%` และปรับ `top` จาก `8%` เป็น `9%` — คำนวณความสูงจริงจากอัตราส่วนภาพต้นฉบับ (`New Project.png` 325×544 → h/w ≈ 1.674) ได้ความสูงใหม่ ≈43.5% ของกล่อง ทำให้ขอบล่างของรูปอยู่ที่ y≈52.5% ซึ่งอยู่เหนือ `.hero-showcase__description` ที่เริ่มที่ y=55% (มีระยะห่างกันชน ~2.5%) และไม่ชนแนวนอนกับ `.hero-showcase__badges` (เริ่มที่ x=70%, ขอบขวารูปใหม่อยู่ที่ x=63%)
- จัดกึ่งกลางแนวนอนด้วย `left:37%` (คำนวณจาก `50% - width/2 = 50% - 13%`) — **เลือกใช้ % แทน `left:50%; transform:translateX(-50%)`** เพราะ element นี้มี `data-depth="0.6"` (parallax จาก rev.17) ซึ่ง JS จะ set `element.style.transform = translate3d(...)` ทับ inline style ทุกครั้งที่ mousemove/scroll — ถ้าใช้ transform สำหรับ centering จะถูกล้างหายระหว่างขยับเมาส์ (จะกระโดดออกจากกึ่งกลาง) จึงใช้ percentage-based `left` แทนเพื่อไม่ให้ขัดกับ parallax (⚠️ `transform:rotate(-2deg)` ที่มีอยู่เดิมยังคงมีปัญหานี้อยู่ก่อนแล้วตั้งแต่ rev.17 คือจะถูกล้างระหว่าง parallax เช่นกัน — ไม่ใช่ regression ใหม่จากรอบนี้ แต่ยังไม่ได้แก้)
- ตรวจสอบด้วย Python script: CSS brace สมดุล (267/267)

## Hero Banner section rev.19 — เพิ่ม slider รองรับหลายแบนเนอร์ เลื่อนได้

ผู้ใช้สั่งผ่านแชท:
> แบนเนอร์ section แรกลองรับการแสดงหลายแบนเนอร์ ต้องสามารถเลื่อนได้
> ช่วยเพิ่มแบนเนอร์รูปแบบเดียวกันกับภาพปัจจุบัน ใช้ asset ข้อความเดียวกันก่อนได้เลยแต่เปลี่ยนภาพ ถุงกาแฟเป็นภาพนี้ raw/assets/image/New Project.png
> และเปลี่ยนจาก 02 เป็น 01

**การตีความ**: `raw/assets/image/New Project.png` เป็นรูปสินค้าที่ `.hero-showcase__product` ใช้อยู่แล้วตั้งแต่ rev.17 — คำสั่งผู้ใช้จึงหมายถึง "ใช้เนื้อหา/รูปเดิมซ้ำเป็น placeholder ของแบนเนอร์ใหม่ไปก่อน" ตัวแปรหลักที่ต่างกันจริงคือ**ลำดับ index number** (01 ก่อน, 02 เดิมเลื่อนเป็นลำดับสอง) — ยังไม่ได้ถามผู้ใช้ยืนยันลำดับ slide (01 มาก่อนหรือหลัง 02) แต่ตีความตรงตามที่สั่ง ("เปลี่ยนจาก 02 เป็น 01") ว่าหมายถึงแบนเนอร์ใหม่นี้คือลำดับ 01

**สถาปัตยกรรม**:
- ห่อ `.hero-showcase` (เดิม 1 ตัว) ด้วยโครงสร้าง slider ใหม่ 3 ชั้น: `.hero-slider` (wrapper, `position:relative`) → `.hero-slider__track` (`id="heroSliderTrack"`, `display:flex; overflow-x:auto; scroll-snap-type:x mandatory`) → `.hero-slider__slide` (`flex:0 0 100%; scroll-snap-align:start`) แต่ละ slide ครอบ `.hero-showcase[data-hero-parallax]` เดิมไว้ 1 ตัว — **ใช้แพทเทิร์นเดียวกับ `.shop-section__slider`/`.shop-grid`** ที่มีอยู่แล้วใน Online Shop section (rev.13) เพื่อความสม่ำเสมอของโค้ด แทนที่จะประดิษฐ์ carousel แบบใหม่
- Slide 1 (ใหม่): เนื้อหาเหมือน slide เดิมทุกอย่าง (caption/title/description/badges/features/รูป `New Project.png`) เปลี่ยนแค่ `.hero-showcase__index-number` เป็น `01`
- Slide 2 (เดิม): ย้ายมาเป็นลำดับสอง ไม่เปลี่ยนแปลงเนื้อหา (`02`)
- ปุ่มเลื่อน `.hero-slider__nav--prev`/`.hero-slider__nav--next` (ปุ่มกลม 44px คล้าย `.shop-nav`) ใช้ inline `onclick` เรียก `heroSliderTrack.scrollBy({left: ±t.clientWidth, behavior:'smooth'})` — ใช้ `clientWidth` ของ track (ไม่ hardcode พิกเซลแบบ `.shop-nav` ที่ scroll ทีละ 320px) เพราะแต่ละ slide กว้างเต็ม container พอดี 1 slide/ครั้ง ต้อง scroll ตามความกว้างจริงที่เปลี่ยนตาม breakpoint
- **แก้ parallax script**: เดิม (rev.17) ใช้ `document.querySelector('[data-hero-parallax]')` (เลือกแค่ตัวแรกตัวเดียว) — ถ้าไม่แก้จะทำให้ parallax ทำงานเฉพาะ slide 1 เท่านั้น จึงเปลี่ยนเป็น `document.querySelectorAll('[data-hero-parallax]')` แล้ว `forEach` วน setup mousemove/mouseleave/scroll listener แยกอิสระให้ทุก stage (ทุก slide มี parallax ของตัวเอง ไม่ปนกัน)
- ตรวจสอบโครงสร้างหลังแก้ด้วย Python: CSS brace สมดุล (275/275), HTML tag สมดุลทุกตัวใช้ `html.parser` เช็ค stack-based ไม่พบ mismatch/unclosed tag
- ⚠️ **ไม่สามารถตรวจสอบผลด้วยการเปิดเบราว์เซอร์จริงได้ในรอบนี้** (Claude in Chrome ไม่ได้เชื่อมต่อ) — ยังไม่ได้ทดสอบพฤติกรรม scroll-snap/ปุ่มเลื่อน/parallax หลาย slide จริงบนเบราว์เซอร์ แนะนำให้ผู้ใช้เปิดไฟล์ทดสอบเอง
- ⚠️ ยังไม่มี dot indicator บอกว่าอยู่ slide ไหน (ตามแพทเทิร์น `.shop-nav` เดิมก็ไม่มีเช่นกัน) — ถ้าต้องการเพิ่มทีหลังทำได้
- เนื้อหา slide ใหม่ยังเป็นสื่อโปรโมท "Thai Specialty Coffee"/"ATO Chiang Rai" ซ้ำกับ slide เดิมทุกตัวอักษร ตามที่ผู้ใช้ระบุให้ใช้ชั่วคราว ("ใช้ asset ข้อความเดียวกันก่อนได้เลย") — ยังไม่ใช่เนื้อหาสุดท้าย

**ปรับเพิ่ม (rev.19.1)**: ผู้ใช้สั่งแก้เฉพาะ slide 01 (ไม่แตะ slide 02): "แก้ไขภาพถุงกาแฟในภาพแรก 01 เป็นภาพนี้ raw/assets/image/New Project1.png" และ "แก้ไขข้อความจาก Chiang rai เป็น Chiang Mai"
- เปลี่ยน `.hero-showcase__product-image` ของ slide 01 จาก `New Project.png` เป็น `New Project1.png` (ยืนยันไฟล์มีอยู่จริงด้วย `sips` — ขนาด 325×504px เทียบกับ `New Project.png` เดิม 325×544px อัตราส่วนต่างกันเล็กน้อย แต่ CSS ใช้ `width:%` + height auto อยู่แล้วจึงปรับสเกลตามภาพเองโดยไม่ต้องแก้ค่าตำแหน่ง/ขนาด)
- แทนที่ข้อความ "Chiang Rai" ทุกจุดภายใน slide 01 เท่านั้น (caption 2 จุด, description 1 จุด, badge "Region:" 1 จุด) เป็น "Chiang Mai" — slide 02 (เดิม) ไม่แตะต้อง ยังคงเป็น "Chiang Rai" เหมือนเดิมทุกจุด (เนื้อหาทั้งสอง slide จึงต่างกันแล้วในรอบนี้ ไม่ใช่ placeholder ซ้ำกัน 100% อีกต่อไป)
- ตรวจสอบด้วย Python script: HTML tag สมดุลทุกตัว (stack-based ผ่าน `html.parser`), CSS brace สมดุล (275/275, ไม่ได้แก้ CSS ในรอบนี้)
- ⚠️ ยังไม่ยืนยันว่า "Chiang Mai" ถูกต้องตามข้อมูลจริง (แหล่งกาแฟ/origin) หรือแค่ทดสอบความแตกต่างของ 2 slide เท่านั้น

## ปรับ padding/margin ทุก section ให้เท่ากัน rev.20

ผู้ใช้สั่งผ่านแชท:
> ทุก section ไม่ต้องมี margin
> แต่ละ section padding ต้องเท่ากัน คือ
> บน-ล่าง-ซ้าย-ขวา =50 เท่ากันทั้งหมด

**การตีความ**: "ทุก section" หมายถึง element ที่ห่อด้วย tag `<section>` ทั้งหมดในหน้า — สำรวจแล้วพบ 7 จุด: `.hero-section`, `.about-section`, `.business-section`, `.shop-section`, `.news-section`, `.cta-banner`, `.contact-section` (ตัว `.cta-banner` แม้ชื่อ class ไม่ตรงแพทเทิร์น `-section` แต่ HTML ใช้ tag `<section class="cta-banner">` จึงนับรวมด้วย)

**การเปลี่ยนแปลง** (ใน `design/style.css` 6 จุด + inline `<style>` ใน `design/homepage-wireframe.html` 1 จุดสำหรับ `.cta-banner`):
- `.hero-section`: `padding: 96px 28px 48px` → `padding: 50px`
- `.about-section`: `padding: 96px 32px 112px` → `padding: 50px`
- `.business-section`: `padding: 96px 32px 112px` → `padding: 50px`
- `.shop-section`: `padding: 96px 32px 112px` → `padding: 50px`
- `.news-section`: `padding: 96px 32px 112px` → `padding: 50px`
- `.contact-section`: เดิมไม่มี `padding`/`margin` ประกาศไว้เลย (การเว้นระยะทำผ่าน `.contact-section__main`/panel ย่อยแทน) → เพิ่ม `padding: 50px` ตามคำสั่งให้ตรงกับ section อื่น
- `.cta-banner` (inline style, rev.4): ลบ `margin:16px 32px 56px` ออกทั้งหมด, เปลี่ยน `padding:56px 44px` → `padding:50px`

ไม่มี section ใดมี `margin` ประกาศไว้อยู่แล้วยกเว้น `.cta-banner` ตัวเดียว (ซึ่งลบออกแล้วตามคำสั่ง) — องค์ประกอบภายใน section (เช่น `.business-section__header{margin:0 auto 56px}`, `.cta-banner h2{margin:0 0 8px}`) เป็น margin ของ **element ย่อยภายใน** ไม่ใช่ margin ของตัว section เอง จึงตีความว่าไม่อยู่ในขอบเขตคำสั่งนี้ (คำสั่งพูดถึงระดับ section ไม่ใช่ทุก margin ในไฟล์) — ไม่ได้แตะต้อง

ตรวจสอบด้วย Python: CSS brace สมดุล (275/275, ไม่เพิ่ม/ลด rule เพียงแก้ค่า property), HTML tag สมดุลทุกตัว (`html.parser` stack-based)

⚠️ **ผลข้างเคียงที่ต้องแจ้งผู้ใช้**:
- `.hero-section` padding-top เดิมถูกขยายจาก 76px เป็น 96px ใน **rev.15.1** โดยเจตนาเพื่อกัน `.site-header` (สูง ~92px, `position:absolute` ซ้อนทับ hero) ไม่ให้ทับ eyebrow/h1 — ตอนนี้ลดเหลือ `padding:50px` (< ความสูง header) **มีความเสี่ยงที่ header จะทับเนื้อหาบนสุดของ hero slide ได้** ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริง (Claude in Chrome ไม่เชื่อมต่อ) — ควรเปิดไฟล์ทดสอบเพื่อยืนยัน
- section หลายจุด (เช่น News เดิม bottom 112px, About เดิม bottom 112px) เคยมี spacing ล่างที่มากกว่าบนโดยตั้งใจ (เผื่อระยะห่างจาก section ถัดไป) ตอนนี้ทุกด้านเท่ากันหมดที่ 50px — ระยะห่างระหว่าง section โดยรวมจะแน่นขึ้นกว่าเดิมมาก โดยเฉพาะช่วงรอยต่อ section
- `.cta-banner` เสีย margin เดิม (`16px 32px 56px`) ที่เคยใช้แยกระยะห่างจาก `.contact-section` ก่อนหน้า/หลัง — ตอนนี้ไม่มี margin เลย อาจทำให้ `.cta-banner` ชิดติดกับ section ข้างเคียงจนดูแน่นเกินไป
- ยังไม่ได้ทดสอบด้วยเบราว์เซอร์จริงว่าผลลัพธ์ทางสายตาเป็นอย่างไร แนะนำให้ผู้ใช้เปิดไฟล์ดูโดยตรง

## CTA Banner section rev.21 — ลบ section ออกทั้งหมด

ผู้ใช้ส่งภาพ screenshot ของ `.cta-banner` (พื้นแดง "พร้อมสั่งซื้อหรือร่วมงานกับเรา หรือยัง? 🚀" + ปุ่ม "ติดต่อเราเลย") พร้อมสั่ง: "ลบ Section นี้ออก"

**การเปลี่ยนแปลง**:
- ลบ `<section class="cta-banner">...</section>` ทั้งก้อนออกจาก `design/homepage-wireframe.html` (เดิมอยู่ระหว่าง Online Shop section กับ Contact Us section, ก่อน `id="contact-us"`)
- ลบ CSS ที่เกี่ยวข้องออกจาก inline `<style>` block ทั้งหมด: `.cta-banner`, `.cta-banner::before`, `.cta-banner h2`, `.cta-banner p`, `.cta-banner .btn-solid`
- ลบ `.btn-solid` และ `.doodle` (utility class 2 ตัวที่ใช้เฉพาะใน `.cta-banner` เท่านั้น หลังตรวจสอบแล้วว่าไม่มี element อื่นในหน้าเรียกใช้ class นี้อีก) ออกด้วย เพื่อไม่ให้เหลือ CSS ที่ตายแล้ว (dead code)
- ตรวจสอบด้วย Python: HTML tag สมดุลทุกตัว (`html.parser` stack-based), inline `<style>` brace สมดุล (24/24 หลังลบ — เดิมมีมากกว่านี้เพราะลบ rule ออกไปหลายตัว)
- แก้ปัญหา checklist เดิม "**CTA ซ้ำซ้อน**" (`.cta-banner` rev.4 ซ้ำซ้อนกับ `.contact-section` rev.10) ที่เคย flag ไว้ตั้งแต่ rev.10 — ตอนนี้เหลือ CTA เดียวคือ `.contact-section` ก่อน footer
- ⚠️ ผลข้างเคียงจาก **rev.20** ที่เคย flag ว่า `.cta-banner` เสีย margin แยกระยะจาก section ข้างเคียง — **ไม่เกี่ยวข้องอีกต่อไป** เพราะ section นี้ถูกลบไปทั้งหมดแล้ว
- ⚠️ ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริงว่าระยะห่างระหว่าง Online Shop section กับ Contact Us section (ที่ตอนนี้ติดกันโดยตรง ไม่มี CTA คั่นกลางอีกแล้ว) ดูเหมาะสมหรือไม่

## Our Partners section rev.22 — section ใหม่ เหนือ Online Shop

ผู้ใช้ส่งภาพ reference (โลโก้สื่อ/สำนักพิมพ์แบบแถวนอน สไตล์ "As seen in:" เช่น Today, Bustle, Real Simple, House Beautiful, Wired, Good Morning America, Chicago Tribune, OK!) พร้อมสั่ง: "เพิ่ม section 'Our partners' บน Section online shop ref ตามภาพที่ส่งให้ โดยใช้โลโก้ทั้งหมดจาก `raw/assets/image/Cients`"

**⚠️ ข้อสังเกตสำคัญที่ต้องแจ้งผู้ใช้ (content mismatch)**: หลังเปิดดูไฟล์จริงทั้ง 12 ไฟล์ใน `raw/assets/image/Cients/` (ชื่อไฟล์เป็น UUID ไม่มีความหมาย จึงต้องเปิดดูภาพทีละไฟล์เพื่อระบุแบรนด์) พบว่าโลโก้ทั้งหมดเป็น**แบรนด์เครื่องชงกาแฟ/อุปกรณ์กาแฟและเครื่องดื่ม** ไม่ใช่โลโก้สื่อ/สำนักพิมพ์แบบที่อยู่ในภาพ ref ที่ผู้ใช้ส่งมา:
1. `3454e7de-...png` = Saeco
2. `58b83742-...png` = Casadio (Bologna 1950)
3. `74882093-...png` = Evoca Group
4. `80659744-...png` = Hiway
5. `953342fd-...png` = Rancilio ("coffeeing the World")
6. `a22cdfc0-...png` = Gaggia Milano
7. `a878086b-...png` = Nuova Simonelli ("The coffee machines you can trust")
8. `b504b5fc-...png` = TCN (中吉)
9. `c184192e-...png` = EGRO ("Built for excellence")
10. `c7a4cbaf-...png` = NECTA
11. `ca154dd5-...png` = Dr.Coffee ("Exploring coffee secrets")
12. `ed52d5f7-...png` = Cunill (Desde 1957)

**การตีความ**: เนื่องจากผู้ใช้ระบุชัดเจนว่าให้ "ใช้โลโก้ทั้งหมดจาก raw/assets/image/Cients" จึงตีความว่าภาพ ref ที่ส่งมาเป็นแค่ตัวอย่าง**เลย์เอาต์/สไตล์** (แถวโลโก้แนวนอน โทน grayscale, มี heading เล็กๆ กำกับ) ไม่ใช่เนื้อหาที่ต้องตรงตัวเป๊ะ — จึงสร้าง section โดยใช้โลโก้จริงทั้ง 12 ไฟล์จากโฟลเดอร์ที่ระบุ ไม่ได้ประดิษฐ์/สลับเป็นโลโก้สื่อตามภาพ ref เพื่อไม่ให้ขัดกับกฎห้ามประดิษฐ์ข้อมูลที่ไม่มีในต้นฉบับ

**การเปลี่ยนแปลง**:
- เพิ่ม `<section class="partners-section" id="our-partners">` ใน `design/homepage-wireframe.html` ตำแหน่งระหว่าง Our Business section กับ Online Shop section (ตามคำสั่ง "บน Section online shop") — มี eyebrow "Our Partners", h2 "พันธมิตรของเรา", ตามด้วยแถวโลโก้ `<img>` ทั้ง 12 ไฟล์ (path `../raw/assets/image/Cients/<uuid>.png`, `alt` ใส่ชื่อแบรนด์ที่ระบุได้จริงตามรายการข้างต้น)
- เพิ่ม CSS section ใหม่ `.partners-section`/`__header`/`__logos`/`__logo` ใน `design/style.css` (ก่อน `.shop-section` block) — padding 50px (ตาม convention rev.20), แถวโลโก้ `display:flex` wrap กึ่งกลาง, โลโก้ grayscale + opacity 0.6 แล้ว hover คืนสี (แนวทางสไตล์ "As seen in:" ตามภาพ ref), มี `@media` ย่อขนาดโลโก้บนจอเล็ก
- ตรวจสอบด้วย Python: `style.css` brace สมดุล (283/283, เพิ่มจาก 275 = +8 ตรงกับ rule ใหม่ที่เพิ่ม), HTML tag สมดุลทุกตัว, ตรวจว่าไฟล์ภาพทั้ง 12 มีอยู่จริงตาม path ที่อ้างอิง (ครบทุกไฟล์)

⚠️ **caveats**:
- เนื้อหาโลโก้ไม่ตรงกับภาพ ref ที่ผู้ใช้ส่งมา (ดูรายละเอียดด้านบน) — ควรให้ผู้ใช้ยืนยันว่าต้องการใช้โลโก้พันธมิตร/ซัพพลายเออร์เครื่องชงกาแฟจริงตามที่มีในโฟลเดอร์ หรือจริงๆ ต้องการ "as seen in" แบบสื่อ/สำนักพิมพ์ (ซึ่งต้องขอไฟล์โลโก้ชุดใหม่)
- ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริงว่าเลย์เอาต์/ระยะห่างของแถวโลโก้ตรงกับภาพ ref มากน้อยแค่ไหน (เครื่องมือ Claude in Chrome ไม่เชื่อมต่อในรอบนี้)
- ชื่อแบรนด์ที่ระบุใน `alt` เป็นการอ่านจากตัวอักษร/โลโก้ในภาพเอง ไม่มี source เอกสารยืนยันว่า CP B&F เป็นพันธมิตร/ตัวแทนจำหน่ายจริงกับแบรนด์เหล่านี้ — เป็นเพียงการตั้งชื่อไฟล์ให้สื่อความหมายเท่านั้น
- ชื่อโฟลเดอร์ต้นฉบับสะกดว่า `Cients` (ไม่ใช่ `Clients`) คงไว้ตามต้นฉบับใน `raw/` โดยไม่แก้ไข

## Header/Navbar section rev.15 — transparent overlay + เมนู 5 รายการ

ผู้ใช้สั่งปรับ Header Menu bar 6 ข้อ (ผ่านแชท ไม่มี markup แนบมา): (1) ปรับรายการเมนูให้มี 5 รายการตามที่ระบุ (2) เมนูชิดขวา (3) โลโก้ซ้าย (4) ไอคอน Login/Shopping cart/Translate language (default TH) (5) navbar โปร่งใสวางทับพื้นหลัง section แรก

การเปลี่ยนแปลง:
- **ลบ header เดิมทั้งหมด** — `.logo`/`nav ul`/`.nav-cta`/`.cart-btn`/`.login-btn` (พื้นขาว, `border-bottom`, `position:sticky`, ใช้ CI tokens `--ink`/`--yellow`) ถูกลบออกจาก inline `<style>` และ HTML
- **แทนที่ด้วย `.site-header` ใหม่** — โครงสร้าง `.site-header__container` (flex, `justify-content:space-between`) แบ่งเป็น 3 ส่วน: `.site-header__logo` (ซ้ายสุด, ลิงก์ไป `#home`), `.site-header__nav` (เมนู 5 รายการ ชิดขวา), `.site-header__actions` (ไอคอน 3 อัน ขวาสุดถัดจากเมนู)
- **เมนู 5 รายการ**: เกี่ยวกับเรา→`#about-us`, ธุรกิจของเรา→`#our-business`, บริการของเรา→`#our-business`, ช้อปปิ้งออนไลน์→`#online-shop`, ข่าวสารและกิจกรรม→`#news-events` — ⚠️ **"ธุรกิจของเรา" กับ "บริการของเรา" ชี้ไป anchor เดียวกัน** เพราะ section "Our Services" เดิมถูกยุบรวมเข้ากับ "ธุรกิจของเรา" เป็น section เดียว `id="our-business"` ไปแล้วตั้งแต่ rev.11 — ตีความเองว่าทั้งสองเมนูควรชี้ไปหา section เดียวกันนี้ ยังไม่ได้ถามผู้ใช้ตรงๆ ว่าต้องการแยก section จริงหรือไม่
- **ไอคอน 3 อัน** (`.site-header__icon-btn`, ปุ่มวงกลมโปร่งแสงขาว): 🌐 เปลี่ยนภาษา (แสดงข้อความ "TH" ตาม default ที่ผู้ใช้ระบุ), 👤 เข้าสู่ระบบ, 🛒 ตะกร้าสินค้า — ⚠️ ทั้งหมดเป็น static placeholder (icon เป็น emoji ตามธรรมเนียมเดิมของไฟล์นี้ เช่น icon บริการ/ติดต่อ) ยังไม่มี JS สลับภาษา/login/cart จริง เพราะทั้งไฟล์เป็น static wireframe ไม่มี JS logic อยู่แล้ว
- **Transparent overlay**: เปลี่ยนจาก `position:sticky` (ค้างบนสุดตลอดการ scroll ทุก section) เป็น `position:absolute; top:0` (ซ้อนทับเฉพาะพื้นหลัง Hero Banner section แรกเท่านั้น ตามที่ผู้ใช้ระบุตรงๆ ว่า "วางทับ bg ของ Section แรก") — **⚠️ ผลข้างเคียง**: เมื่อ scroll ผ่าน hero ไปแล้วจะไม่มี nav bar ค้างอยู่ด้านบนอีกต่อไป (ต่างจากพฤติกรรม sticky เดิม) หากต้องการ nav บาร์ค้างตลอดทั้งหน้าด้วย ต้องแจ้งเพิ่มเติม — สีตัวอักษร/ไอคอนเปลี่ยนเป็นขาว (`var(--font-light)`) ให้ contrast กับพื้นหลัง gradient น้ำเงินของ hero (`var(--primary-color)`)
- **Responsive**: ซ่อนเมนู `.site-header__nav` ที่ breakpoint ≤900px (ยังไม่มี hamburger menu เพราะไม่มี JS ในไฟล์นี้) เหลือแค่โลโก้ + ไอคอน
- **CSS**: เพิ่ม "Section 12: Header / Navbar" ท้าย `design/style.css` ก่อน Reduced Motion block — ไม่ได้เพิ่ม token ใหม่ (reuse `--container-width`/`--font-light`/`--font-family` ที่มีอยู่แล้ว)

**ปรับเพิ่ม (rev.15.1, 2026-07-20)**: ผู้ใช้ขอ "เพิ่ม BG #ffffff ให้ Header และขยายขนาดโลโก้"
- เปลี่ยน `.site-header` จาก `background: transparent` เป็น `background: var(--bg-main)` (สีขาวตัน, reuse token เดิม ไม่ hardcode `#fff` ใหม่)
- เปลี่ยนสีตัวอักษรเมนู (`.site-header__nav a`) และไอคอน (`.site-header__icon-btn`) จากขาว (`--font-light`) เป็นเข้ม (`--font-title`) พร้อม hover state ใหม่ (ตัวอักษรเปลี่ยนเป็น `--primary-color`, ไอคอนพื้นเปลี่ยนเป็น `--primary-color` ตัวอักษรขาว) — จำเป็นต้องเปลี่ยนเพื่อให้อ่านออกบนพื้นขาว (เดิม contrast กับพื้นหลัง hero สีน้ำเงิน)
- ขยายโลโก้จาก `height:40px` เป็น `height:56px`
- **ผลข้างเคียงที่ต้องแก้ตาม**: header สูงขึ้น (~92px จาก logo ใหญ่ขึ้น) เกิน `.hero-section` padding-top เดิม (76px) จึงขยาย padding-top เป็น 96px กันไม่ให้ header ทับ eyebrow/h1 ของ hero

## การใช้ UI Style Guide จริงในหน้านี้ (อัปเดต rev.3 — ใช้สีทางการจาก CI แล้ว)

- Primary `#1B5EF9` (Positive Blue ทางการ, เดิมสมมุติ `#135AF7`) ใช้กับ hero background, ปุ่ม add-to-cart, section บริการ
- สี Secondary/Support ทางการจาก [[CI Guideline และ Reference Design]] แทนที่ชุดสีสมมุติเดิมทั้งหมด: cyan `#6FF1FF`, เหลือง `#FFE02F`, ชมพู `#E975CD`, เขียว `#8CFE83`, navy `#1336CC` (ใช้เป็น dark section gradient แทนสีเทาเข้มเดิม)
- Neutral `#333333`/`#666666`/`#EEEEEE` ทางการ แทน `#111827` เดิม
- การ์ด/badge ใช้ทรง "หยดน้ำ" ไม่สมมาตร (`border-radius:28px 28px 28px 6px` / `50% 50% 50% 8px`) ล้อไอคอนแบรนด์ Drop ใน CI แทนมุมโค้งสมมาตรเดิม
- box-shadow แบบทึบ (hard shadow) + border หนา ยังคงไว้ (สไตล์ pop-art/sticker ตรงกับ mood reference ใน [[CI Guideline และ Reference Design]])
- Layout การ์ดธุรกิจยังเอียงสลับเพื่อความรู้สึก "ไม่สมมาตร" ตาม brief
- Font: IBM Plex Sans Thai (เนื้อหาไทย) + **Bricolage Grotesque** (หัวข้อ/eyebrow ภาษาอังกฤษ, ฟอนต์ English ทางการจาก CI) — ยังไม่ได้ใช้ FC Gimmick (ฟอนต์ไทยทางการสำหรับหัวเรื่อง) เพราะต้อง self-host ไฟล์ฟอนต์

## จุดที่ต้องตัดสินใจต่อ

- [x] ~~ยืนยันชุดสี accent~~ — ใช้ชุดสีทางการจาก CI แล้ว (rev.3) ไม่ใช่สีสมมุติอีกต่อไป
- [x] ~~โลโก้จริงของบริษัท~~ — ใช้ไฟล์โลโก้ทางการล่าสุด `AW_CPB&F logo RGB updated_29-10-24.png` แล้ว (rev.3)
- [x] ~~`Hero banner.png` เป็นภาพสต็อก placeholder ("BRAND")~~ — แทนที่ด้วย polaroid gallery รูปจริง 4 รูปแล้ว (rev.14) จากนั้นแทนที่อีกครั้งด้วยแบนเนอร์เดียว (rev.16, ดูรายการถัดไป)
- [ ] **เนื้อหา hero ปัจจุบัน (rev.16-17) เป็นสื่อโปรโมทสินค้า "Thai Specialty Coffee" แบรนด์ "ATO Chiang Rai"** — ไม่ใช่ภาพ/ข้อความผลิตภัณฑ์/แบรนด์ของ CP B&F เอง (rev.17 แยกสลายเป็น layer ข้อความ+รูป `raw/assets/image/New Project.png` แล้ว แต่เนื้อหายังเป็นของแบรนด์อื่นเหมือนเดิม) ผู้ใช้สั่งให้ใช้ตรงๆ แต่ยังไม่ยืนยันว่าเป็นเนื้อหาชั่วคราวสำหรับทดสอบ layout หรือเนื้อหาที่ตั้งใจใช้จริงในเว็บ
- [ ] **rev.17 เพิ่ม JavaScript (`<script>`) เข้าไฟล์นี้เป็นครั้งแรก** (parallax) — เดิมไฟล์ทั้งหมดเป็น static wireframe ไม่มี JS logic เลย ควรแจ้งผู้ใช้ว่า mockup ไม่ static 100% อีกต่อไป
- [ ] **กราฟิกลวดลายเจดีย์/วัด (temple silhouette) ในภาพ ref `hero-business.png` ไม่ได้ทำใน rev.17** เพราะไม่มี asset แยกให้ — ถ้าต้องการให้ตรงกับ ref เป๊ะ ต้องส่งไฟล์กราฟิกนี้มาเพิ่ม
- [ ] พิจารณา self-host ฟอนต์ FC Gimmick เพื่อความ authentic 100% ตาม CI (ตอนนี้ใช้ IBM Plex Sans Thai + Bricolage Grotesque แทน)
- [x] ~~รูปภาพข่าวยังใช้ gradient placeholder~~ — ใช้รูปข่าวจริง 3 ไฟล์จาก `raw/assets/News` แล้ว (rev.6)
- [ ] **การ์ดสินค้าใน section ช้อปสินค้ายังใช้ emoji placeholder** — เนื้อหา/ราคาเป็นของจริงแล้ว (rev.7) แต่ยังไม่มีรูปสินค้าจริง 5 SKU ใน `raw/assets/` รอผู้ใช้ส่งรูปหรืออนุญาตดาวน์โหลดจาก URL สินค้า
- [ ] **ตรวจทานคำอธิบาย "เกี่ยวกับเรา" (พันธกิจ/วิสัยทัศน์)** — เป็นข้อความร่างที่ผมเขียนขึ้น ยังไม่มี source ยืนยันจากบริษัทจริง
- [ ] ยังไม่ได้เปิดอ่าน VBL Usage PDF (กฎการใช้โลโก้/clear space) เพราะไฟล์ใหญ่เกิน 100MB — ควรตรวจสอบภายหลังหากมี tool อื่น
- [ ] จะทำ wireframe หน้าอื่นต่อไหม (เช่น หน้า Shop listing, หน้า Product detail, หน้า Checkout ตาม [[โครงการ Redesign เว็บไซต์ cpbf.co.th]] § E-commerce Flow)
- [ ] **ภาษาไม่สม่ำเสมอ** — section เกี่ยวกับเรา (rev.5) เป็นอังกฤษ ส่วนอื่นเป็นไทย ต้องตัดสินใจทิศทางภาษาทั้งหน้า
- [ ] **สีไม่สม่ำเสมอ (ใหม่ rev.10, ขยายเพิ่ม rev.14)** — section News/About/Our Business/Online Shop/**Hero (rev.14)** ใช้ระบบสีจาก `style.css` (`#135af7`/`#e91e63`/`#fffde7`) — **อัปเดต rev.31**: ผู้ใช้สั่งให้ Contact section + Footer ใช้สี CI ทางการโดยเฉพาะแล้ว (`--ci-blue`/`--ci-yellow`/`--ci-red`) จึงเป็น 2 จุด (footer + contact-section) ที่ใช้ CI ทางการตอนนี้ ส่วนที่เหลือยังใช้ระบบสี `style.css` เดิม — ยังไม่ได้ถามว่าจะรวมเป็นระบบเดียวทั้งหน้าหรือปล่อยแยกกันต่อไปตามที่ผู้ใช้สั่งเจาะจงเป็นจุดๆ
- [ ] **ข้อมูลติดต่อจริงของ CP B&F** — section Contact Us (rev.10) ยังใช้ email/เบอร์โทร/ที่อยู่แบบ placeholder ทั้งหมด ต้องขอข้อมูลจริงจากผู้ใช้
- [x] ~~CTA ซ้ำซ้อน — `.cta-banner` (rev.4) กับ `.contact-section` (rev.10) อยู่ติดกันก่อน footer~~ — ผู้ใช้สั่งลบ `.cta-banner` ออกทั้งหมดแล้ว (rev.21) เหลือ `.contact-section` เป็น CTA เดียวก่อน footer
- [ ] **ยืนยันการแทนเนื้อหาข่าว placeholder ด้วยข่าวจริง (rev.10)** — ตัดสินใจเองระหว่าง implement ยังไม่ได้ถามผู้ใช้ตรงๆ ว่าต้องการแบบนี้หรือไม่
- [ ] **ยืนยันการยุบรวม "ธุรกิจของเรา" + "Our Services" เป็น "Our Business" (rev.11)** — ตีความเองว่าคำสั่ง "ปรับ section Our Services" หมายถึงแทนที่ด้วย markup ใหม่ที่ใช้ชื่อ/กรอบ "Our Business" ยังไม่ได้ถามผู้ใช้ตรงๆ
- [ ] **สถิติ stats-strip ที่เคยอยู่ใน Our Services เดิมถูกตัดออก (rev.11)** — markup ใหม่ไม่มีองค์ประกอบนี้ ยังไม่ได้ยืนยันว่าตั้งใจตัดทิ้ง
- [ ] **ยืนยันข้อมูลปีก่อตั้ง 2016 และการเป็นส่วนหนึ่งของเครือเจริญโภคภัณฑ์ (rev.12)** — เพิ่มลงหน้า [[cpbf.co.th (บริษัท)]] แล้วโดยยึดตาม content ที่ผู้ใช้ส่งมา แต่ยังไม่มี source อื่น (เช่นเอกสารบริษัท) ยืนยันซ้ำ
- [ ] **สีของ section About Us เปลี่ยนจาก CI ทางการเป็นชุดสี `design/style.css` (rev.12)** — ต่างจาก rev.5 เดิมที่ใช้ตัวแปร CI ทำให้ยิ่งเข้าเงื่อนไข "สีไม่สม่ำเสมอ" ข้างต้นชัดเจนขึ้น (แต่สม่ำเสมอกับ News/Contact/Our Business กลุ่มเดียวกัน) — **อัปเดต**: hero ก็เปลี่ยนไปใช้ชุดสีเดียวกันแล้ว (rev.14), header/nav ก็เปลี่ยนตามด้วย (rev.15, แม้จะ transparent ก็ reuse token `--font-light`/`--primary-color` ของ non-CI system) **ตอนนี้เหลือเฉพาะ footer เพียงจุดเดียวที่ยังใช้ตัวแปรสี CI ทางการ (`--ink`/`--yellow` ฯลฯ) ในไฟล์** ควรถามผู้ใช้ว่าต้องการให้ footer เปลี่ยนตามไปด้วยเพื่อความสม่ำเสมอทั้งหน้าหรือไม่ — **อัปเดต rev.31**: ตรงข้ามกับที่คาดไว้ ผู้ใช้สั่งให้ contact-section เข้าร่วมกลุ่ม CI ทางการแทน (ไม่ใช่ให้ footer เปลี่ยนไปใช้ระบบ `style.css`) ตอนนี้ footer + contact-section ใช้ CI ทางการร่วมกัน
- [ ] **ปุ่ม "+ เพิ่มลงตะกร้า" ถูกตัดออกจาก section ช้อปสินค้า (rev.13)** — ดีไซน์ใหม่เหลือปุ่ม "สั่งซื้อ" ปุ่มเดียวต่อการ์ด ยังไม่ได้ยืนยันว่าตั้งใจตัดฟังก์ชันเพิ่มลงตะกร้าทิ้งหรือไม่ (ปุ่มตะกร้าที่ header ยังคงอยู่)
- [ ] **การ์ดสินค้าใน section ช้อปสินค้า (rev.13) ใช้ badge หมวดหมู่แทน badge การตลาด** — ตัวอย่างที่ผู้ใช้ส่งมามี badge "Best seller"/"Popular" ฯลฯ แต่ไม่มีข้อมูลจริงรองรับ จึงตีความเป็น badge หมวดหมู่แทน ควรยืนยันกับผู้ใช้
- [ ] **เมนู "ธุรกิจของเรา" และ "บริการของเรา" ใน header (rev.15) ชี้ไป anchor เดียวกัน `#our-business`** — เพราะ 2 section เดิมถูกยุบรวมเป็นหนึ่งไปแล้วตั้งแต่ rev.11 ยังไม่ได้ถามผู้ใช้ตรงๆ ว่าต้องการแยก section จริงหรือยอมรับให้ชี้ไปที่เดียวกัน
- [ ] **Header (rev.15) เปลี่ยนจาก sticky เป็น absolute overlay เฉพาะ hero section แรก** — ตีความคำว่า "วางทับ bg ของ Section แรก" ตรงตัว ทำให้เมื่อ scroll ผ่าน hero แล้วไม่มี nav bar ค้างอยู่บนสุดอีกต่อไป ควรยืนยันกับผู้ใช้ว่าต้องการพฤติกรรมนี้ หรือต้องการ nav แบบ sticky/fixed ตลอดทั้งหน้าด้วย (ต้องใช้ JS เพิ่มถ้าต้องการเปลี่ยนพื้นหลังตอน scroll ผ่าน hero)
- [ ] **ไอคอน Login/Cart/Language ใน header (rev.15) เป็น static placeholder ไม่มีฟังก์ชันจริง** — ทั้งไฟล์เป็น static wireframe ไม่มี JS logic อยู่แล้ว, เมนูมือถือ (≤900px) ยังไม่มี hamburger menu เพราะต้องใช้ JS เปิด/ปิด
- [ ] **rev.18 ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริง** — เครื่องมือ Claude in Chrome ไม่เชื่อมต่อในรอบนี้ ตรวจได้แค่ระดับโครงสร้าง (tag/brace balance) และคำนวณพิกัดจากภาพ ref เท่านั้น แนะนำให้ผู้ใช้เปิดไฟล์ดูด้วยตาเพื่อยืนยัน/ปรับละเอียดเพิ่มเติม
- [ ] **rev.18 ใช้ `aspect-ratio` ล็อกสัดส่วน `.hero-showcase` ให้ตรงกับภาพ ref เป๊ะทุกขนาดจอ** — ข้อดีคือตำแหน่ง/สัดส่วนตรงกับ ref 100% แต่ข้อเสียคือบนจอมือถือแคบมากตัวอักษรอาจแน่น/เล็กกว่าการออกแบบ mobile-first ทั่วไป (เพราะ priority คือความตรงกับ ref มากกว่าการ reflow) ควรยืนยันกับผู้ใช้ว่ายอมรับ tradeoff นี้หรือไม่
- [ ] **rev.19 slide 01 ใหม่ใช้เนื้อหา/รูปซ้ำกับ slide 02 เดิมทุกตัวอักษร** — ผู้ใช้ระบุให้ใช้ชั่วคราว ("ใช้ asset ข้อความเดียวกันก่อนได้เลย") ยังไม่มีเนื้อหา/รูปสินค้าจริงสำหรับแบนเนอร์ที่สอง รอผู้ใช้ส่งเนื้อหาจริงมาแทนที่
- [ ] **rev.19 ยังไม่ได้ถามยืนยันลำดับ slide** — ตีความคำสั่ง "เปลี่ยนจาก 02 เป็น 01" ว่าแบนเนอร์ใหม่คือลำดับแรก (01) และแบนเนอร์เดิมขยับเป็นลำดับสอง (02) ยังไม่ได้ถามผู้ใช้ตรงๆ ว่าตีความถูกต้องหรือไม่
- [ ] **rev.19 ไม่มี dot indicator บอกตำแหน่ง slide ปัจจุบัน** — มีแค่ปุ่ม prev/next (ตามแพทเทิร์น `.shop-nav` เดิมที่ก็ไม่มี dot เช่นกัน) และยังไม่ได้ทดสอบ scroll-snap/parallax หลาย slide บนเบราว์เซอร์จริง (Claude in Chrome ไม่เชื่อมต่อ)
- [ ] **rev.20 ลด `.hero-section` padding-top จาก 96px (ตั้งใจกัน header ทับ ตาม rev.15.1) เหลือ 50px เท่าทุกด้าน** — มีความเสี่ยงสูงที่ `.site-header` (สูง ~92px, ซ้อนทับแบบ `position:absolute`) จะทับเนื้อหาบนสุดของ hero อีกครั้ง ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริง ควรเปิดไฟล์ดูก่อนใช้งานจริง
- [ ] **rev.20 ทำให้ระยะห่างระหว่าง section ทั้งหน้าแน่นขึ้นมาก** (จากเดิม padding บน/ล่างสูงสุดถึง 112px เหลือ 50px ทุกด้าน) และ `.cta-banner` เสีย margin เดิมที่เคยแยกระยะจาก section ข้างเคียง — ยังไม่ได้ยืนยันภาพผลลัพธ์จริงกับผู้ใช้
- [ ] **rev.22 เนื้อหาโลโก้ section "Our Partners" ไม่ตรงกับภาพ ref ที่ผู้ใช้ส่งมา** — ภาพ ref เป็นโลโก้สื่อ/สำนักพิมพ์ ("As seen in:") แต่ไฟล์จริงใน `raw/assets/image/Cients` เป็นโลโก้แบรนด์เครื่องชงกาแฟ/อุปกรณ์กาแฟ 12 แบรนด์ (Saeco, Casadio, Evoca Group, Hiway, Rancilio, Gaggia Milano, Nuova Simonelli, TCN, EGRO, NECTA, Dr.Coffee, Cunill) ตีความว่าภาพ ref เป็นแค่ตัวอย่างเลย์เอาต์ ยังไม่ได้ถามผู้ใช้ตรงๆ ว่าตีความถูกต้องหรือไม่
- [ ] **rev.22 ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริง** — ตรวจได้แค่ระดับโครงสร้าง (tag/brace balance) และยืนยันว่าไฟล์ภาพมีอยู่จริงตาม path เท่านั้น
- [ ] **rev.25 ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริงว่าฟอนต์ IBM Plex Sans Thai โหลด/แสดงผลถูกต้องทุกจุด** — เปลี่ยน `--font-family` + Google Fonts import แล้วในระดับโค้ด แต่ตรวจได้แค่ tag/brace balance เท่านั้น

## ประวัติการแก้ไข

- 2026-07-17 (rev.1): อัปเดตโลโก้ (ไอคอน+wordmark), อัปเดต hero banner (feature chips + product visual), ลบตัวอักษรกำกับ a-e ออกจากทุก section, เพิ่มคำอธิบายเต็ม 200-500 ตัวอักษรให้ทั้ง 5 เมนู
- 2026-07-17 (rev.2): แทนที่โลโก้ placeholder ด้วย `logo.webp` จริง (ยืนยันชื่อบริษัท CP B&F), แทนที่ visual วงกลมสินค้าด้วย `Hero banner.png` จริง (ภาพสต็อก)
- 2026-07-17 (rev.3): แทนที่ชุดสีสมมุติทั้งหมดด้วยสีทางการจาก CI (`CP B&F_Color palettes/`), เปลี่ยนโลโก้เป็นไฟล์ทางการล่าสุด, เพิ่มฟอนต์ Bricolage Grotesque สำหรับหัวข้อภาษาอังกฤษ, ปรับทรงการ์ด/badge ให้ล้อไอคอน "หยดน้ำ" ของแบรนด์, เปลี่ยน services section เป็น gradient navy-primary แทนสีเทาเข้ม, เพิ่มชื่อนิติบุคคลเต็มใน footer
- 2026-07-17 (rev.4): ปรับ layout ให้ล้อมู้ด `raw/assets/ref/` จริงจัง (rev.3 ปรับแค่สี/โลโก้ ยังไม่ปรับ layout) — เพิ่ม tag pill/marker highlight/doodle/seal-badge ใน hero, เพิ่ม dashed-callout ใน about, เปลี่ยนการ์ดธุรกิจเป็น bento grid ขนาดไม่เท่ากัน, เพิ่ม stats-strip ใน services, เพิ่ม mini-tag sticker บนการ์ดสินค้า, เพิ่ม CTA banner พื้นแดง+blob ก่อน footer
- 2026-07-17 (rev.5): redesign section เกี่ยวกับเราใหม่ทั้งหมดตามภาพ ref ที่ผู้ใช้ส่งมาโดยตรง (photo panel สีฟ้า `var(--skyblue)` + blob ชมพู + headline ภาษาอังกฤษไฮไลต์แดง + "what we do" icon row 4 ช่องพร้อม divider และ SVG doodle ลูกศรโค้ง) — เปลี่ยนเนื้อหา section นี้เป็นภาษาอังกฤษตามคำสั่งผู้ใช้ (ส่วนอื่นยังเป็นไทย)
- 2026-07-17 (rev.6): redesign section ข่าวสารและกิจกรรมใหม่ทั้งหมดตาม ref ที่ผู้ใช้ส่งมา — ลบ description ใต้หัวข้อออก, เพิ่มปุ่ม "ดูทั้งหมด", แทนที่การ์ดตัวอย่างด้วยรูปจริง 3 ไฟล์จาก `raw/assets/News` + เนื้อหาข่าวจริง 3 รายการ (Beanie Coffee เปิดตัว / Kaset Fair / ตรุษจีน 2568), เพิ่ม description ตัด 3 บรรทัดอัตโนมัติ + ปุ่ม "เพิ่มเติม" ต่อการ์ด
- 2026-07-17 (rev.6.1): ปรับสไตล์การ์ดข่าวตามภาพ ref เพิ่มเติม — เปลี่ยนจากการ์ดขอบหนา+hard-shadow เป็นการ์ด flat color-block ไร้เส้นขอบ (พื้นหลังสีตันสลับ primary/แดง/เหลืองตาม CI), ลบ tag badge NEWS/EVENT, เปลี่ยนปุ่ม "เพิ่มเติม" เป็นลิงก์ขีดเส้นใต้
- 2026-07-17 (rev.7): redesign section ช้อปสินค้าเป็น "SHOP ONLINE" — แทนที่การ์ดหมวดหมู่ placeholder (7 ใบ) ด้วยสินค้าจริง 5 รายการจาก [[Shop Online - รายการสินค้า 5 รายการ]] พร้อมราคา/description/ลิงก์จริง, เปลี่ยน layout เป็น slider เลื่อนดู (เห็น 4 ใบพร้อมกัน เลื่อนดูใบที่ 5), การ์ดสไตล์ soft-tint พร้อม category pill ล้อ CSS reference ที่ผู้ใช้ส่งมา (ตัดองค์ประกอบเฉพาะแบรนด์ต้นแบบออก)
- 2026-07-17 (rev.8): redesign section บริการของเราเป็น "Our Services" — เปลี่ยนพื้นหลัง section จากเข้มเป็นอ่อน, แทนที่การ์ด pill เล็ก 4 ใบด้วยการ์ดใหญ่พื้น primary ตัน stagger เอียง/เลื่อนสลับพร้อมชื่อ+คำอธิบายเต็มจาก [[Our Services - เนื้อหาบริการ 4 รายการ]], เพิ่ม responsive breakpoint ตาม CSS reference ที่ผู้ใช้ส่งมา (breakpoint แรกในหน้าทั้งหมด)
- 2026-07-17 (rev.9): สร้างไฟล์ `design/style.css` ใหม่ (ตัวแปรสี, utility class ปุ่ม/ตัวหนังสือ) จาก [[style.css - Global Style Variables]] และผูกเข้ากับ `design/homepage-wireframe.html` ด้วย `<link rel="stylesheet">` — ผู้ใช้ยืนยันให้เก็บสีชุดใหม่ (`#135AF7`/`#E91E63`/`#FFFDE7`) ไว้ตามที่ส่งมาแม้จะต่างจาก CI ทางการ ไม่ได้แก้ไขค่าใดๆ
- 2026-07-17 (rev.10): เพิ่ม section ใหม่ "Contact Us" และ redesign section "ข่าวสารและกิจกรรม" ทั้งหมดตาม markup/CSS ที่ผู้ใช้ส่งมาจาก [[News & Contact Section - HTML+CSS]] — รวม CSS token/component ชุดใหม่เข้า `design/style.css` (คง `.highlight-text` เดิมไว้), ลบ CSS เดิมของ News section ออกจาก inline `<style>` (ชื่อ class ชนกับของใหม่), แทนเนื้อหาข่าว placeholder ด้วยเนื้อหาข่าวจริงเดิม 3 รายการ, เปลี่ยน Website ใน Contact panel เป็นโดเมนจริง `www.cpbf.co.th` (Email/เบอร์โทร/ที่อยู่ยังเป็น placeholder)
- 2026-07-17 (rev.11): ลบ section "ธุรกิจของเรา" (bento เดิม) ทิ้งทั้งหมด และแทนที่ section "Our Services" ด้วย section ใหม่ "Our Business" (`id="our-business"`) ตาม markup/CSS ที่ผู้ใช้ส่งมาจาก [[Our Business Section - HTML+CSS]] — ยุบรวม 2 section เดิมเป็น 1 section เดียว, เนื้อหาการ์ด 4 ใบใช้ข้อมูลบริการจริงเดิมจาก [[Our Services - เนื้อหาบริการ 4 รายการ]], เพิ่ม CSS ใหม่เข้า `design/style.css` โดยไม่ overwrite utility class ที่มีอยู่แล้ว, ลบ `.stats-strip` เดิมออกไปด้วย, รวม nav link เหลือ `#our-business` รายการเดียว
- 2026-07-17 (rev.12): ลบ section "เกี่ยวกับเรา" เดิม (photo panel + what-we-do row, rev.5) ทิ้งทั้งหมด และแทนที่ด้วย section ใหม่ "About Us" (`.about-section`/`.about-card`, `id="about-us"`) ตาม markup/CSS ที่ผู้ใช้ส่งมาจาก [[About Us Section - HTML+CSS]] — เพิ่มเนื้อหาข้อเท็จจริงใหม่ (ก่อตั้งปี 2016, เครือเจริญโภคภัณฑ์) ลงหน้า [[cpbf.co.th (บริษัท)]] § ประวัติ, เพิ่ม CSS ใหม่เข้า `design/style.css` โดยไม่ overwrite utility class ที่มีอยู่แล้ว, เปลี่ยนสี section นี้จาก CI ทางการเป็นชุดสี `design/style.css` (เหมือน News/Contact/Our Business), อัปเดต nav link `#about` → `#about-us` — **rev.12 follow-up (2026-07-18)**: ปรับตามภาพ screenshot จริงที่ผู้ใช้ส่งมา ตัด highlights grid (3 สถิติ) ออก + เพิ่มปุ่ม "อ่านเพิ่มเติม" สี `#e91e63` (ใช้ `.btn-accent` เดิม) + ขยาย content width
- 2026-07-18 (rev.13): ลบ section "SHOP ONLINE" แบบ slider เดิม (rev.7) ทิ้งทั้งหมด และแทนที่ด้วย section ใหม่ "Online Shop" (`.shop-section`/`.shop-grid`/`.shop-card`, `id="online-shop"`) ตาม markup/CSS ที่ผู้ใช้ส่งมาจาก [[Online Shop Section - HTML+CSS]] — เปลี่ยน title เป็น "Online shop" ตามที่ผู้ใช้ระบุตรงๆ, ใช้ข้อมูลสินค้าจริง 5 SKU เดิมจาก [[Shop Online - รายการสินค้า 5 รายการ]] แทนสินค้าสมมุติ 4 รายการในตัวอย่าง, ตัด badge การตลาดสมมุติเป็น badge หมวดหมู่จริง, ตัดปุ่ม "+ เพิ่มลงตะกร้า" ออก (⚠️ ยังไม่ยืนยัน), เพิ่ม CSS ใหม่เข้า `design/style.css` โดยไม่ overwrite utility class/token ที่มีอยู่แล้ว, อัปเดต nav link `#shop` → `#online-shop` — **rev.13 follow-up (2026-07-18)**: ผู้ใช้ขอ "default 4 และ slide เหมือนเดิม" กลับไปใช้ slider แสดง 4 การ์ด เลื่อนดูใบที่ 5 เหมือน rev.7 เดิม (`.shop-section__slider`+`.shop-nav`) แต่คงดีไซน์การ์ดใหม่ของ rev.13 ไว้ทั้งหมด
- 2026-07-18 (rev.14): ลบ section hero เดิม (rev.1-4, พื้นน้ำเงิน + blob/sticker/float-chip collage) ทิ้งทั้งหมด และแทนที่ด้วย section ใหม่ "Hero Banner" (`.hero-section`, `id="home"` เปลี่ยนจาก `id="hero"` เดิม) ตาม markup/CSS ที่ผู้ใช้ส่งมาจาก [[Hero Banner Section - HTML+CSS]] — h1 "Crafted for every business", polaroid gallery 4 รูปจริง (`hero-business-01.png`-`04.png` มีอยู่แล้วใน `raw/assets/image/`) แทน `Hero banner.png` เดี่ยวเดิม, เพิ่ม CSS ใหม่เข้า `design/style.css` โดยไม่ overwrite `:root` tokens/Base reset/`.btn-primary`/`.btn-accent` ที่มีอยู่แล้ว (เพิ่มเฉพาะ token ใหม่ที่ไม่ซ้ำ `--hero-container-width`/`--hero-shadow`), คง `.btn-solid`/`.doodle` เดิมไว้เพราะยังใช้ใน `.cta-banner` ท้ายหน้า
- 2026-07-20 (rev.15): ผู้ใช้สั่งปรับ Header Menu bar ผ่านแชท (6 ข้อ ไม่มี markup แนบมา) — ลบ header เดิม (พื้นขาว, sticky, ปุ่มข้อความ "เข้าสู่ระบบ"/"🛒 ตะกร้า (0)") ทั้งหมด แทนที่ด้วย `.site-header` ใหม่: โลโก้ซ้าย, เมนู 5 รายการชิดขวา (เกี่ยวกับเรา/ธุรกิจของเรา/บริการของเรา/ช้อปปิ้งออนไลน์/ข่าวสารและกิจกรรม — ⚠️ "ธุรกิจของเรา"+"บริการของเรา" ชี้ไป `#our-business` เดียวกันเพราะถูกยุบรวมไปแล้วตั้งแต่ rev.11), ไอคอน 3 อัน (🌐 เปลี่ยนภาษา default "TH", 👤 login, 🛒 cart — static placeholder), เปลี่ยนจาก `position:sticky` เป็น `position:absolute` transparent overlay ทับเฉพาะพื้นหลัง Hero Banner section แรก (⚠️ ไม่ค้างบนสุดตลอดการ scroll เหมือนเดิมอีกต่อไป), สีตัวอักษร/ไอคอนเป็นขาวให้ contrast กับพื้นหลัง hero, เพิ่ม "Section 12: Header / Navbar" ท้าย `design/style.css` (reuse token เดิมทั้งหมด ไม่เพิ่ม token ใหม่) — **rev.15.1 follow-up (2026-07-20)**: ผู้ใช้ขอ "เพิ่ม BG #ffffff ให้ Header และขยายขนาด[ข้อความท้ายอ่านไม่ออก]" ถามยืนยันผ่าน AskUserQuestion ผู้ใช้ตอบว่าต้องการขยาย "โลโก้" — เปลี่ยน `.site-header` เป็นพื้นขาวตัน (`var(--bg-main)`, reuse token เดิม), ขยายโลโก้จาก 40px เป็น 56px, เปลี่ยนสีตัวอักษรเมนู/ไอคอนจากขาว (`--font-light`) เป็นเข้ม (`--font-title`) พร้อม hover state ใหม่เพื่อให้อ่านออกบนพื้นขาว (จำเป็นต้องเปลี่ยนตาม ไม่ใช่ scope creep), ขยาย `.hero-section` padding-top จาก 76px เป็น 96px กัน header สูงขึ้นทับเนื้อหา hero
- 2026-07-20 (rev.16): ผู้ใช้สั่งแก้ section แรก (Hero) ผ่านแชท — ลบ `.hero-section::before` border ตกแต่งออก, ลบ eyebrow "CP B&F Company Limited" ออก, ลบปุ่ม "ดูบริการของเรา"+"ติดต่อเรา" ทั้งคู่ออก, ลบ polaroid gallery 4 รูปเดิม (`hero-business-01.png`-`04.png`) ออกทั้งหมด แทนที่ด้วยแบนเนอร์ภาพเดียว `.hero-banner` ใช้ `raw/assets/image/hero-business.png` (ผู้ใช้แปะภาพในแชทแล้วระบุ path ให้บันทึกเอง) — ⚠️ ภาพเป็นสื่อโปรโมทสินค้า "Thai Specialty Coffee" แบรนด์ "ATO Chiang Rai" ไม่ใช่เนื้อหาของ CP B&F เอง ผู้ใช้ยืนยันให้ใช้ตรงๆ, ลบ CSS ที่เกี่ยวข้องทั้งหมดใน `design/style.css` (รวม responsive/reduced-motion) ตรวจสอบด้วย Python script: CSS brace สมดุล (268/268), HTML tag สมดุลทุกตัว
- 2026-07-20 (rev.17): ผู้ใช้สั่งแก้ section แรก (Hero) อีกครั้ง ผ่านแชท — อ้างอิงภาพ `hero-business.png` (rev.16) เป็น "ref" ให้แยกสลาย asset (ข้อความ/รูปภาพ) ออกจากกันเป็น layer พร้อม animation ขยับได้ ใช้รูปสินค้าไดคัท `raw/assets/image/New Project.png`, ระบุ BG `#1B5RF0` (hex ไม่ถูกต้อง) — ถาม AskUserQuestion 2 ข้อ: (1) สี BG ที่ถูกต้อง ผู้ใช้เลือก `#1B5EF9` (2) รูปแบบ animation ผู้ใช้เลือก "Parallax ตาม mouse/scroll" — ยุบ `.hero-banner` ออก แทนที่ด้วย `.hero-showcase` (index/caption/title/description/badges/product/features แยก element พร้อม `data-depth`), เปลี่ยน BG เป็น `var(--primary)` (reuse token CI เดิม), เพิ่ม `<script>` parallax ตัวแรกในไฟล์นี้ (mousemove/scroll, เคารพ `prefers-reduced-motion`), อัปเดต responsive breakpoints ให้ตรงกับ class ใหม่ — ⚠️ ไม่ได้ทำกราฟิกเจดีย์/วัดจากภาพ ref เพราะไม่มี asset แยก, เนื้อหายังเป็นสื่อโปรโมทแบรนด์ "ATO Chiang Rai" เหมือนเดิม — ตรวจสอบด้วย Python script: CSS brace สมดุล (293/293), HTML tag สมดุลทุกตัว, grep ยืนยันไม่มี class เดิมค้าง
- 2026-07-20 (rev.18): ผู้ใช้สั่งให้จัดตำแหน่ง/ขนาด font/layout ของ Hero ให้ตรงกับภาพ ref `hero-business.png` "100%" — วัดพิกัดจริงจากภาพ (1376×702px) ด้วย Python/Pillow/numpy (background-diff mask + row/column band detection) แทนการกะสายตา, เปลี่ยน `.hero-showcase` จาก flexbox (rev.17) เป็น `position:relative` + `aspect-ratio:1376/702` + `container-type:inline-size`, วาง element ย่อยทั้งหมดด้วย `position:absolute` (%) ตามพิกัดที่วัดได้ (title/index/caption/description/badges/product/features), ใช้ `clamp()` + หน่วย `cqw` กำหนด font-size ให้สเกลตามความกว้างกล่อง, คง z-index title อยู่หลังรูปสินค้าให้ตรงกับ ref, ลบ wrapper div `__top`/`__main`/`__copy`/`__visual` และลบ `.hero-decoration` (จุด/pill 4 ชิ้นจาก rev.1-4) ที่ไม่มีในภาพ ref ออกทั้งหมด, ลดรูป media query ให้เหลือปรับ padding เท่านั้น — ตรวจสอบด้วย Python script: CSS brace สมดุล (267/267), HTML tag สมดุลทุกตัว, grep ยืนยันไม่มี class เดิมค้าง — ⚠️ ไม่สามารถตรวจสอบด้วยเบราว์เซอร์จริงได้ (Claude in Chrome ไม่เชื่อมต่อ), ไม่ได้ทำลวดลายขอบล่าง/กราฟิกเจดีย์เหมือนเดิม, เนื้อหายังเป็นสื่อโปรโมทแบรนด์ "ATO Chiang Rai" เหมือนเดิม
- 2026-07-20 (rev.18.1): ผู้ใช้ feedback ว่ารูปสินค้าใหญ่เกินไปจนทับ `.hero-showcase__description` — ลด `.hero-showcase__product` จาก `width:36%`→`26%`, `top:8%`→`9%`, จัดกึ่งกลางแนวนอนด้วย `left:37%` (คำนวณจาก `50% - width/2`, เลือกใช้ % แทน `transform:translateX(-50%)` เพราะจะถูก parallax JS (`data-depth`) เขียนทับ inline `transform` ระหว่าง mousemove) — ตรวจสอบแล้วไม่ทับ `.hero-showcase__description` (y ห่างกัน ~2.5%) และไม่ทับ `.hero-showcase__badges` — ตรวจสอบด้วย Python script: CSS brace สมดุล (267/267)
- 2026-07-20 (rev.19): ผู้ใช้สั่งให้ Hero section รองรับหลายแบนเนอร์ เลื่อนได้ — ห่อ `.hero-showcase` ด้วยโครงสร้าง slider ใหม่ `.hero-slider`/`.hero-slider__track`/`.hero-slider__slide` (scroll-snap, ล้อแพทเทิร์นเดียวกับ `.shop-section__slider`/`.shop-grid` ที่มีอยู่แล้ว), เพิ่ม slide ใหม่เป็นลำดับแรก (`.hero-showcase__index-number` = "01", เนื้อหา/รูปสินค้า `New Project.png` เดียวกับ slide เดิมทั้งหมดตามที่ผู้ใช้ระบุให้ใช้ชั่วคราว) ส่วน slide เดิมขยับเป็นลำดับสอง ("02"), เพิ่มปุ่ม `.hero-slider__nav` (prev/next, สไตล์คล้าย `.shop-nav`) ใช้ `scrollBy({left:±track.clientWidth})`, แก้ parallax `<script>` (rev.17) จาก `document.querySelector('[data-hero-parallax]')` (ตัวเดียว) เป็น `document.querySelectorAll(...)` + `forEach` เพื่อให้ parallax ทำงานอิสระทุก slide — ตรวจสอบด้วย Python: CSS brace สมดุล (275/275), HTML tag สมดุลทุกตัว (`html.parser` stack-based, ไม่พบ mismatch) — ⚠️ ไม่สามารถตรวจสอบด้วยเบราว์เซอร์จริงได้ (Claude in Chrome ไม่เชื่อมต่อ), เนื้อหา slide ใหม่ซ้ำกับ slide เดิมทุกตัวอักษร (placeholder ชั่วคราว), ไม่มี dot indicator
- 2026-07-20 (rev.19.1): ผู้ใช้สั่งแก้เฉพาะ slide 01 — เปลี่ยนรูปสินค้าเป็น `New Project1.png` (325×504px), เปลี่ยนข้อความ "Chiang Rai" ทุกจุด (caption/description/badge) เป็น "Chiang Mai" — slide 02 ไม่แตะต้อง ยังเป็น "Chiang Rai"/`New Project.png` เดิม — ตรวจสอบด้วย Python: HTML tag สมดุล, CSS brace สมดุล (275/275)
- 2026-07-20 (rev.20): ปรับ padding/margin ทุก `<section>` ให้เท่ากันทั้งหน้าตามคำสั่งผู้ใช้ — ลบ `margin` ออกจาก `.cta-banner` (จุดเดียวที่มี margin), เปลี่ยน `padding` ของ 7 section (`hero`/`about`/`business`/`shop`/`news`/`contact`/`cta-banner`) เป็น `50px` เท่ากันทุกด้าน (เดิมส่วนใหญ่ `96px 32px 112px` หรือไม่มี padding เลยกรณี `.contact-section`) — ⚠️ เสี่ยง header ทับ hero (ลด padding-top จาก 96px ที่เคยตั้งใจกันไว้ rev.15.1) และระยะห่างระหว่าง section แน่นขึ้นมาก ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริง
- 2026-07-20 (rev.21): ผู้ใช้สั่งลบ `.cta-banner` section ออกทั้งหมด (ส่ง screenshot มาให้ดู) — ลบ `<section class="cta-banner">` ออกจาก HTML, ลบ CSS ที่เกี่ยวข้องออกจาก inline `<style>` ทั้งหมด (`.cta-banner`/`::before`/`h2`/`p`/`.btn-solid` ภายใน), ลบ `.btn-solid`/`.doodle` (dead code หลังตรวจว่าไม่มีที่อื่นใช้แล้ว) — แก้ปัญหา checklist "CTA ซ้ำซ้อน" ที่ค้างมาตั้งแต่ rev.10 — ตรวจสอบด้วย Python: HTML tag สมดุล, inline style brace สมดุล (24/24)
- 2026-07-20 (rev.22): ผู้ใช้สั่งเพิ่ม section "Our Partners" เหนือ Online Shop section (ส่งภาพ ref สไตล์ "As seen in:" โลโก้สื่อ + สั่งให้ใช้โลโก้ทั้งหมดจาก `raw/assets/image/Cients`) — เปิดดูภาพจริงทั้ง 12 ไฟล์ (ชื่อไฟล์เป็น UUID) พบว่าเป็นโลโก้แบรนด์เครื่องชงกาแฟ/อุปกรณ์กาแฟ (Saeco, Casadio, Evoca Group, Hiway, Rancilio, Gaggia Milano, Nuova Simonelli, TCN, EGRO, NECTA, Dr.Coffee, Cunill) ไม่ตรงกับภาพ ref ที่เป็นโลโก้สื่อ — ตีความภาพ ref เป็นตัวอย่างเลย์เอาต์เท่านั้น เพิ่ม `<section class="partners-section" id="our-partners">` ใน HTML (ระหว่าง Our Business กับ Online Shop) พร้อม eyebrow/h2 + แถวโลโก้ 12 ไฟล์ (`alt` ระบุชื่อแบรนด์ตามที่อ่านได้จริง), เพิ่ม CSS `.partners-section`/`__header`/`__logos`/`__logo` ใหม่ใน `design/style.css` (padding 50px ตาม convention rev.20, โลโก้ grayscale+opacity hover คืนสี) — ตรวจสอบด้วย Python: CSS brace สมดุล (283/283, +8 จากเดิม), HTML tag สมดุลทุกตัว, ยืนยันไฟล์ภาพทั้ง 12 มีอยู่จริงตาม path — ⚠️ flag เนื้อหาโลโก้ไม่ตรงกับภาพ ref ให้ผู้ใช้ทราบ ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริง
- 2026-07-20 (rev.23): ผู้ใช้สั่ง "ทุก section margin-bottom =0" — เพิ่ม `margin-bottom: 0;` แบบระบุชัดเจนเข้าไปในกฎ CSS ระดับ base ของ `<section>` ทั้ง 7 จุด (`.hero-section`, `.about-section`, `.business-section`, `.partners-section`, `.shop-section`, `.news-section`, `.contact-section`) ใน `design/style.css` — ก่อนหน้านี้ไม่มี section ใดประกาศ margin ไว้เลย (ค่า default ของ browser สำหรับ `<section>` คือ 0 อยู่แล้ว) จึงเป็นการระบุให้ชัดเจนเพื่อกันความคลุมเครือ ไม่ได้เปลี่ยนพฤติกรรมภาพจริง — ตรวจสอบด้วย Python: CSS brace สมดุล (283/283 เท่าเดิม เพราะไม่มีการเพิ่ม/ลบ rule ใหม่ แค่เพิ่ม property)
- 2026-07-20 (rev.24): ผู้ใช้สั่ง "Title h2 ปรับ font size เป็น 2.5 rem" — เปลี่ยน `font-size` ของ h2 title ทั้ง 6 จุดในหน้าเป็นค่าคงที่ `2.5rem` เท่ากันทุกจอ: `.web-title` (shared class ใช้ 5 จุด — About Us/Our Business/Our Partners/Online Shop/News, เดิม `clamp(2.75rem, 6vw, 5.75rem)`) และ `.contact-section__title` (unique class เฉพาะ Contact Us, เดิม `clamp(3.25rem, 7vw, 7rem)` + mobile override `clamp(3rem, 16vw, 5rem)` ก็เปลี่ยนเป็น `2.5rem` ให้สอดคล้องกัน) — เปลี่ยนจากระบบ responsive `clamp()` เดิมเป็นค่าคงที่ตามคำสั่งตรงตัว ไม่ได้แตะ `<h1>` (`.hero-showcase__title` ของ hero banner ซึ่งเป็น h1 ไม่ใช่ h2) — ตรวจสอบด้วย Python: CSS brace สมดุล (283/283 เท่าเดิม)
- 2026-07-20 (rev.25): ผู้ใช้สั่ง "set style all font in website is IBM Plex Sans Thai" — รวมฟอนต์ทั้งหน้าเป็น IBM Plex Sans Thai ตัวเดียว: เปลี่ยน `--font-family` ใน `:root` ของ `design/style.css` จาก `"Inter", "Kanit", sans-serif` เป็น `"IBM Plex Sans Thai", sans-serif` (กระทบทุก element ที่ใช้ `var(--font-family)` รวม `body`, `.shop-card__title/__description`, `.hero-section`, `.site-header`), เปลี่ยน `@import` Google Fonts บนสุดของไฟล์จาก Inter/Kanit เป็น IBM Plex Sans Thai (weight 400-800), เปลี่ยนกฎ inline `<style>` ใน `design/homepage-wireframe.html` (`h1,h2,.section-head span`) จาก `'Bricolage Grotesque','IBM Plex Sans Thai'` เหลือแค่ `'IBM Plex Sans Thai'` เท่านั้น (ตัด Bricolage Grotesque ออกทั้งหมดเพราะไม่ตรงคำสั่ง "all font"), อัปเดต `<link>` Google Fonts ใน `<head>` เพิ่ม weight 800 (เดิมมีแค่ 400-700, ไฟล์มี `font-weight:800` ใช้จริง 13 จุด) และตัด `family=Bricolage+Grotesque` ออกจาก URL — ตรวจสอบด้วย Python: CSS brace สมดุล (283/283 เท่าเดิม), HTML tag สมดุลทุกตัว — ⚠️ ยังไม่ได้ตรวจสอบด้วยเบราว์เซอร์จริงว่าฟอนต์โหลด/แสดงผลถูกต้อง
- 2026-07-20 (rev.26): ผู้ใช้สั่ง "change #e91e63 to #e975cd" — เปลี่ยนค่า `--accent-pink` ใน `:root` ของ `design/style.css` จาก `#e91e63` เป็น `#e975cd` (จุดเดียวในทั้งโปรเจกต์ที่ hardcode สีนี้ ทุก element อื่นอ้างผ่าน `var(--accent-pink)` อยู่แล้วจึงเปลี่ยนตามอัตโนมัติ — ไม่ได้แตะ `--accent-pink-hover`/`--accent-pink-soft` เพราะผู้ใช้ระบุแค่ค่าเดียวนี้) — สังเกตว่า `#e975cd` ตรงกับสี `--pink:#E975CD` ในชุด CI ทางการ (`CP B&F_Color palettes/Digital`) ที่ประกาศไว้ใน inline `<style>` ของ `design/homepage-wireframe.html` พอดี ทำให้ accent-pink ของระบบสี style.css สอดคล้องกับ CI มากขึ้น 1 จุด — ตรวจสอบด้วย Python: CSS brace สมดุล (283/283 เท่าเดิม)
- 2026-07-20 (rev.27): ผู้ใช้สั่ง "Our Partners update height to 100px show max limit 1 line if over can slid for view more" — ปรับ layout โลโก้ section "Our Partners" (rev.22) เป็นแถวเดียว เลื่อนดูได้เมื่อล้น: `.partners-section__logo` เปลี่ยน `height` จาก `40px` เป็น `100px` (mobile `≤767px` จาก `30px` เป็น `70px` รักษาสัดส่วนลดลงคล้ายเดิม), เพิ่ม `flex-shrink: 0` กันโลโก้บีบเล็กลงเวลาแถวแน่น — `.partners-section__logos` เปลี่ยนจาก `flex-wrap: wrap` (หลายบรรทัด กึ่งกลาง) เป็น `flex-wrap: nowrap` + `overflow-x: auto` + `justify-content: flex-start` (แถวเดียว เลื่อนแนวนอนได้เมื่อล้น จัดชิดซ้ายแทนกึ่งกลางเพื่อไม่ให้โลโก้ฝั่งซ้ายโดนตัดตอน scroll), ซ่อน scrollbar ด้วย `scrollbar-width: none` + `::-webkit-scrollbar{display:none}` ตามแพทเทิร์นเดียวกับ `.shop-grid` (rev.7/13) ที่มีอยู่แล้วในไฟล์ — ตรวจสอบด้วย Python: CSS brace สมดุล (284/284, +1 จากเดิม 283 ตรงกับ `::-webkit-scrollbar` rule ที่เพิ่ม)
- 2026-07-20 (rev.28): ผู้ใช้สั่ง (ส่งภาพ ref สไตล์ apéritif brand) "Change Section About us ไม่ต้องมี BG ไม่ต้องมี Label OUR STORY เน้น show wording มีปุ่มสำหรับกดอ่านเพิ่มเติม" — ตัดการ์ดกระดาษ `.about-card` ของ rev.12 ออกเกือบทั้งหมด: ลบพื้นหลัง section (สีน้ำเงิน + ลายจุด + blob ชมพูเบลอ), ลบกล่องการ์ด (bg/shadow/ขอบหยัก), ลบป้าย "About Us"/"Our Story"/ป้ายกลม "CP B&F"/แถบคั่น (2 ป้าย+แถบคั่นเป็น judgment call ไม่ได้ระบุตรงๆ), เหลือ h2+2 ย่อหน้า+ปุ่ม "อ่านเพิ่มเติม" จัดกึ่งกลาง (`max-width:720px`), ลบ dead code token `--about-card-radius`/`--about-shadow` — ตรวจสอบด้วย Python: CSS brace สมดุล (269/269, ลดจาก 284), HTML tag สมดุลทุกตัว
- 2026-07-20 (rev.29): ผู้ใช้สั่ง "change section product" พร้อม markup HTML+CSS+JS ฉบับสมบูรณ์ + "สีอ้างอิงตาม CI"/"รูปสินค้าสุ่มใช้จาก New Project.png/1/2"/"รายละเอียดสินค้าสุ่มใช้จากของเดิมไปก่อน" — แทนที่ section "Online Shop" slider ของ rev.13 ด้วย section ใหม่ "Products" (`.product-section`, `id="products"`, nav link `#online-shop`→`#products`): product grid static 4 คอลัมน์ (ไม่ใช่ slider แบบเดิม) + quantity stepper + ปุ่ม "Add to cart" + ปุ่ม toggle "View more/View less", ใช้สินค้าจริง 5 รายการเดิมจาก rev.13 เท่านั้น (ไม่ fabricate ให้ครบ 8 ใบตาม template — ใบที่ 5 "HEY! BEV รสทับทิม" ซ่อนใน "view more"), รูปสินค้าหมุนเวียน `New Project.png`/`1`/`2` (alt ระบุ "ภาพตัวอย่างชั่วคราว"), ย้ายลิงก์สั่งซื้อจริง (cpbf.co.th) ไปที่ `.product-card__image-link` เพราะปุ่ม "Add to cart" เป็น `type="button"` ตาม template, สี token ใหม่ alias ทับของเดิมแทนใช้สีทองจาก template (`--product-accent`→`var(--primary-color)` ใกล้เคียง CI `#1B5EF9`) เพิ่ม token ใหม่จริงแค่ `--bg-product-section`, เพิ่ม `<script>` JS ที่สองใน `homepage-wireframe.html` (view-more toggle + quantity +/- clamp), อัปเดต `@media (prefers-reduced-motion: reduce)` ตัด `.shop-card*` เพิ่ม `.product-card*` — ตรวจสอบด้วย Python: CSS brace สมดุล (262/262), HTML tag สมดุลทุกตัว — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง, ⚠️ มีแค่ 5 การ์ดไม่ใช่ 8 ตาม template, ⚠️ รูปสินค้ายังเป็น placeholder ชั่วคราว
- 2026-07-20 (rev.30): ผู้ใช้ส่งภาพ ref apéritif brand "What's in Season" สั่ง "ต้องการให้ปรับ section shop online เป็นตาม design นี้" — restyle CSS ของ Products section (rev.29) เท่านั้น ไม่แตะ HTML/JS: ตัดกล่องการ์ด (bg/border/shadow/radius) ออกทั้งหมดเหลือโปร่งใสกึ่งกลาง, เปลี่ยนรูปสินค้าจากพื้นหลังสี่เหลี่ยมเต็มกรอบเป็นรูปทรงโค้งประตู (arch, `border-radius:999px 999px 0 0`) วางไว้หลังรูปสินค้าด้วย `::before` (ใช้สี `--product-bg` เดิมของแต่ละสินค้า ไม่เปลี่ยนชุดสี), เพิ่มฟอนต์ serif "Playfair Display" (token ใหม่ `--font-serif`) ให้ heading+ชื่อสินค้า, ซ่อนบรรทัดราคาแยก (`display:none`, ราคาแสดงในปุ่มอย่างเดียวตามภาพ ref), ปุ่ม "Add to cart" เปลี่ยนจาก pill เต็มเป็นมุมมนเล็กน้อย (`6px`) + เต็มความกว้างการ์ด + ตัวพิมพ์ใหญ่มีระยะห่างตัวอักษร, ย้าย hover effect จากการ์ดทั้งใบมาที่รูปสินค้าขยายเล็กน้อยแทน, ตัด mobile override text-align:left ออกให้กึ่งกลางทุกจอ — **judgment call**: คงสีปุ่มเป็น CI blue (`var(--product-accent)`) ไม่เปลี่ยนเป็นสีทอง/มัสตาร์ดตามภาพ ref ตรงๆ เพราะยึดคำสั่งก่อนหน้า "สีอ้างอิงตาม CI" เป็นหลัก ยังไม่ยืนยันกับผู้ใช้, คงจำนวนคอลัมน์/การ์ด 5 ใบเดิมไม่เปลี่ยนตาม screenshot ที่อาจถูก crop — ตรวจสอบด้วย Python: CSS brace สมดุล (263/263, +1) — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง (Claude in Chrome ไม่เชื่อมต่อ)
- 2026-07-20 (rev.30.1): ผู้ใช้สั่งต่อเนื่อง 5 ข้อ: "product-card__visual ไม่ต้องกำหนด Height, max-width = 300px, product description max 2 lines ตัดคำ auto, style button add to cart ใช้เหมือนปุ่ม primary, ไม่ต้องมี product-heading__description, ตัด label Our product" — `.product-card__visual` ลบ `height:260px` ออก + `max-width` 220px→300px, `.product-card__description` เพิ่ม `-webkit-line-clamp:2` ตัดคำอัตโนมัติ 2 บรรทัด, ปุ่ม "Add to cart" เปลี่ยนให้ตรงสไตล์ `.btn-primary` ทุกจุด (pill radius, min-height 48px, box-shadow, hover translateY(-2px)) ยกเว้นสี (คงเดิม) และ width:100%, ลบ `<p class="product-heading__description">`+CSS rule ออกทั้งหมด, ลบ `<span class="product-heading__eyebrow">OUR PRODUCTS</span>`+CSS rule ออกทั้งหมด (เหลือ `.product-heading` มีแค่ h2 เดียว) — ตรวจสอบด้วย Python: CSS brace สมดุล (261/261, ลดจาก 263 เพราะลบ 2 rule), HTML tag สมดุลทุกตัว — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง โดยเฉพาะผลของการตัด height ออกจาก `.product-card__visual` ต่อสัดส่วนรูปทรง arch
- 2026-07-20 (rev.30.2): ผู้ใช้สั่งต่อเนื่อง 3 ข้อ: "Product title Max 1 Line", "ใช้ IBM Plex Sans Thai ทั้งหมด", "ปุ่ม add to cart ต้องอยู่ในระดับเดียวกันทั้งหมด" — `.product-card__name` เพิ่ม `white-space:nowrap`+`text-overflow:ellipsis`+`overflow:hidden` จำกัด 1 บรรทัด, ลบฟอนต์ serif "Playfair Display" ออกทั้งหมด (`@import`, token `--font-serif`) เปลี่ยน `.product-heading__title`/`.product-card__name` เป็น `var(--font-family)` (IBM Plex Sans Thai) + เพิ่ม font-weight เป็น 700 ชดเชย, จัดปุ่ม "Add to cart" ให้อยู่ระดับเดียวกันทุกการ์ดด้วย `.product-card{height:100%}` + `.product-card__quantity{margin-top:auto}` (ดันกลุ่ม stepper+ปุ่มลงชิดล่างเสมอ) — ตรวจสอบด้วย Python: CSS brace สมดุล (261/261 เท่าเดิม), HTML tag สมดุลทุกตัว — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง
- 2026-07-20 (rev.31): ผู้ใช้ส่งภาพ ref "Mariana" (1 ใน 5 ภาพ reference เดิมจาก [[CI Guideline และ Reference Design]]) สั่ง "ปรับ Section สุดท้ายและ Footer ตาม Ref นี้ ใช้สีตาม CI" — พบว่า `.contact-section` (rev.10) สร้างจากภาพ ref เดียวกันนี้อยู่แล้วทั้ง layout จึงตีความเป็น recolor เท่านั้น: เพิ่ม token `--ci-blue`(`#1B5EF9`)/`--ci-yellow`(`#FFE02F`)/`--ci-red`(`#FF242A`)/`--shadow-ci-red` ใน `:root`, เปลี่ยนพื้นหลัง `.contact-section`/`.contact-section__footer`/`footer` จาก `var(--primary-color)` เป็น `var(--ci-blue)`, เปลี่ยน `.contact-section__intro`/`.contact-section__cta`(+`::after`) จาก `var(--vibrant-yellow)` (ครีมอ่อน) เป็น `var(--ci-yellow)` (เหลืองสด), เปลี่ยน `.contact-panel`/`.contact-panel__label`/`.contact-panel__button` จาก `var(--accent-pink)` เป็น `var(--ci-red)` (จุดเปลี่ยนเด่นสุด — ref เป็นสีแดง/ส้ม ไม่ใช่ชมพู) พร้อม shadow ใหม่, เปลี่ยนไอคอนดาวปุ่ม footer จาก accent-pink เป็น ci-yellow, **เพิ่ม CSS ให้ `<footer>` เป็นครั้งแรก** (เดิมไม่มีสไตล์เลย ใช้ default ของ browser) ให้พื้นหลัง ci-blue ต่อเนื่องจาก `.contact-section__footer` เป็นแถบเดียวกันตามภาพ ref, ตัวหนังสือลิขสิทธิ์ขาวโปร่งแสงกึ่งกลาง — ไม่แตะ HTML/layout เลย ไม่แตะวงกลมตกแต่งชมพู `.contact-section__intro::before` (ตรงกับ CI pink อยู่แล้วตั้งแต่ rev.26) — ตรวจสอบด้วย Python: CSS brace สมดุล (262/262, +1 จาก rule `footer{}` ใหม่), HTML tag สมดุลทุกตัว (ไม่แก้ HTML) — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง
- 2026-07-20 (rev.31.1): ผู้ใช้สั่งต่อเนื่อง 4 ข้อ: "section contact us padding = 0", "class=\"contact-section__footer\" padding บนล่าง = 20px", "var(--ci-yellow) change to RGB 255 224 47", "var(--ci-red) change to #FF242A" — `.contact-section` ตัด `padding:50px` (จาก rev.20) ออกเป็น `padding:0` (จุดยกเว้นแรกจาก convention rev.20 ที่ปรับทุก section เท่ากัน), `.contact-section__footer` เปลี่ยน padding บน/ล่างจาก `34px` เป็น `20px` (ซ้าย/ขวาคง responsive เดิม `clamp(32px,6vw,96px)`) พร้อมปรับ mobile override (`≤767px`) ให้เท่ากันทุกด้านเป็น `20px` ตาม (judgment call เพื่อความสอดคล้อง), `--ci-yellow` เปลี่ยน notation จาก `#FFE02F` เป็น `rgb(255 224 47)` (ค่าสีเดียวกัน แค่เปลี่ยนรูปแบบเขียน), `--ci-red` ตรวจแล้วตรงกับ `#FF242A` เดิมอยู่แล้วตั้งแต่ rev.31 ไม่มีการเปลี่ยนแปลง — ตรวจสอบด้วย Python: CSS brace สมดุล (262/262 เท่าเดิม ไม่เพิ่ม/ลด rule) — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง
- 2026-07-20 (rev.32): ผู้ใช้ส่งภาพ ref ใหม่ (4 คอลัมน์ไอคอนวงกลมสีเหลือง/ฟ้า/แดง/เหลือง + หัวข้อตัวหนา + คำอธิบายสั้น คั่นเส้นแนวตั้ง พื้นครีม) สั่ง "change design section our-business to be Reference design" — rebuild layout `.business-section` (`id="our-business"`) ทั้งหมดจากการ์ดกล่อง stagger เดิม (rev.11) เป็นแถบไอคอนคั่นเส้น: HTML ตัด `.business-card__number`/`.business-card__button`/wrapper `__content` ออก คงเนื้อหาจริง 4 บริการเดิมทั้งหมด (ไม่ fabricate ตามเนื้อหา generic ในภาพ ref) — CSS: `.business-section` เพิ่มพื้นครีม `#FBF7EF`, `.business-grid` เพิ่ม `border-left` คั่นคอลัมน์ผ่าน `.business-card + .business-card`, `.business-card` ตัด box/shadow/radius/transform-stagger ทั้งหมดออกเหลือ flex column เปล่า, `.business-card__icon` ขยาย 56px→72px เปลี่ยนจากโปร่งแสงเป็นวงกลมทึบสี CI (`--ci-blue`/`--ci-yellow`/`--ci-red`, judgment call ใช้ token CI ที่มีจาก rev.31 แทน custom palette เดิม), ลบ CSS ปุ่ม/เลขลำดับ, cleanup reduced-motion overrides ที่อ้าง selector ที่ลบไปแล้ว — ตรวจสอบด้วย Python: CSS brace สมดุล (245/245, ลดจาก 262), HTML tag สมดุลทุกตัว — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง, ⚠️ สีไอคอนสด (CI จริง) ต่างจากโทนพาสเทลในภาพ ref ยังไม่ยืนยันกับผู้ใช้
- 2026-07-20 (rev.33): ผู้ใช้สั่ง 2 ส่วนพร้อมภาพ ref ใหม่ (serif heading + ปุ่ม text-link ขีดเส้นใต้ "SEE WHAT'S INSIDE") — "Update Section BG color = #EBEAE7, Btn ในแต่ละ section ให้ใช้ style ตามภาพที่แนบทั้งหมด" — คำสั่งกำกวม จึงถามผู้ใช้ด้วย `AskUserQuestion` ก่อนแก้: BG ใหม่ → About Us, สไตล์ปุ่ม → ทุกปุ่มทั้งหน้า (global) — CSS: `.about-section` เพิ่ม `background-color:#ebeae7`, restyle ปุ่ม CTA จริง 5 จุด (`.btn-primary`/`.btn-accent`/`.product-card__button`/`.contact-panel__button`/`.contact-section__footer-button`) จาก pill/shadow เป็นตัวหนังสือขีดเส้นใต้ (`border-bottom:2px solid currentcolor`, ไม่มี background/padding/shadow, hover เปลี่ยนจาก transform เป็น opacity), cleanup mobile media query + reduced-motion override ที่อ้างถึง transform ที่ไม่มีแล้ว — judgment call: ไม่แตะปุ่ม UI เชิงฟังก์ชัน (header icon/quantity stepper/slider nav/view-more) เพราะภาพ ref หมายถึงลิงก์ CTA เท่านั้น — ตรวจสอบด้วย Python: CSS brace สมดุล (244/244, ลดจาก 245), HTML tag สมดุลทุกตัว — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง
- 2026-07-20 (rev.34): ผู้ใช้สั่ง 3 ส่วนพร้อมกัน — (1) Our Business: BG `#ffffff` + ตัด label "What we do", (2) Our Partners: ย้ายไปไว้ล่าง section Product + เปลี่ยน title "พันธมิตรของเรา"→"Our Partners" + ตัด label section, (3) Products: เปลี่ยน title "What's in Season"→"Ready to Shop?" + ลด margin-bottom ของ `.product-heading` เหลือ `30px` — HTML: ตัด `.business-section__header` eyebrow ออก, ย้ายบล็อก `<section class="partners-section">` ทั้งหมดไปหลัง `.product-section` ก่อน `.news-section` (ลำดับใหม่: hero→about→business→product→partners→news→contact), ตัด `.partners-section__header` eyebrow ออก+เปลี่ยนข้อความ h2, เปลี่ยนข้อความ `.product-heading__title` — CSS: `.business-section` background `#fbf7ef`→`#ffffff`, `.product-heading` margin-bottom `56px`→`30px` (ปรับ mobile override `40px`→`30px` ด้วยเพื่อความสอดคล้อง) — ตรวจสอบด้วย Python: CSS brace สมดุล (244/244 เท่าเดิม), HTML tag สมดุลทุกตัว, ยืนยันลำดับ `<section>` ใหม่ถูกต้อง — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง
- 2026-07-20 (rev.35): ผู้ใช้สั่ง 3 ส่วน — (1) header ทุก section ต้อง consistency font-size = `2.5rem`, (2) heading การ์ดสินค้าแสดงสูงสุด 1 บรรทัดตัดคำอัตโนมัติ, (3) ปุ่ม View more ใช้ style เดียวกับ `.about-card__button` — ตรวจพบ `.product-heading__title` (Products) เป็นจุดเดียวที่ยังใช้ `clamp(2.25rem,4vw,3rem)` ตกหล่นจาก rev.24 (เพราะ Products section เพิ่งมีทีหลังใน rev.29) แก้เป็น `2.5rem` คงที่ — ตรวจสอบ `.product-card__name` พบว่าทำ 1 บรรทัด+ellipsis ไว้แล้วตั้งแต่ rev.30.2 ไม่ต้องแก้เพิ่ม — restyle `.product-view-more__button` จาก pill เต็ม (border+background+hover เปลี่ยนสี) เป็นสไตล์ text-link ขีดเส้นใต้เดียวกับ `.btn-accent`/`.about-card__button` (`border-bottom:2px solid currentcolor`, `background:none`, hover `opacity:0.7`) คงไอคอน chevron+rotate ไว้เหมือนเดิม — ตรวจสอบด้วย Python: CSS brace สมดุล (244/244 เท่าเดิม), HTML tag สมดุลทุกตัว (ไม่มีการแก้ HTML รอบนี้) — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง
- 2026-07-20 (rev.36): ผู้ใช้ส่งภาพ ref (ราคา "฿410" ตัวหนา + ปุ่มวงกลม "+") สั่ง 5 ส่วน — (1) ตัด quantity stepper (+/-) ออก, (2) แสดงราคา+ปุ่ม Add to cart ตามภาพ ref, (3) max-width การ์ดสินค้าต้องเท่ากัน, (4) ปุ่ม View more ตัดสัญลักษณ์ chevron ออก, (5) เรียงสี product bg `#1b5ef9→#ffe02f→#e975cd→#1b5ef9` — HTML: ตัด `.product-card__quantity`+`.product-card__button` ทั้ง 5 การ์ด แทนที่ด้วย `.product-card__actions` ใหม่ (ราคา `฿{จำนวนเต็ม}` + ปุ่มวงกลม `.product-card__add-button` ไอคอน SVG plus), เปลี่ยน `--product-bg` เป็น `var(--ci-blue)`/`var(--ci-yellow)`/`var(--accent-pink)` ตามลำดับที่สั่ง (ตัวแปร CI ที่มีอยู่แล้วตรงกับ hex ที่ผู้ใช้ระบุพอดี, การ์ดที่ 5 ซ่อนไว้ไม่ได้ระบุสีจึงไล่ pattern ต่อเป็น yellow — judgment call), ตัด `<svg class="product-view-more__icon">` ออกจากปุ่ม View more, ตัด JS quantity stepper listener ออกทั้งบล็อก — CSS: `.product-card` เพิ่ม `max-width:300px;margin:0 auto`, ลบ `.product-card__quantity`/`.quantity-button`/`.quantity-input`/`.product-card__button` (ไม่ใช้แล้ว), เพิ่ม `.product-card__actions`/`.product-card__price`/`.product-card__add-button` (วงกลม 44px, `background-color:var(--primary-soft)`), ลบ `.product-view-more__icon` rules, อัปเดต reduced-motion media query ให้ตรงกับ class ใหม่ — ตรวจสอบด้วย Python: CSS brace สมดุล 238/238, HTML tag สมดุลทุกตัว (แก้ script ตรวจให้รองรับ self-closing void tag) — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง
- 2026-07-20 (rev.37): ผู้ใช้ส่งภาพ ref สั่ง 3 ส่วน — (1) สีปุ่ม Add to cart ก่อน hover `#1b5ef9` font/icon `#ffffff`, (2) bg `.about-section` จาก `#ebeae7`→`#f4f3f1`, (3) ขอบล่าง Hero Banner เป็น Scallop/Stamp Edge — CSS: `.about-section` background-color เปลี่ยนตรงๆ, `.product-card__add-button` เปลี่ยน `background-color`→`var(--ci-blue)`+`color`→`#ffffff`+hover→`var(--primary-hover)` (judgment call สี hover), เพิ่ม `.hero-section::after` ใหม่ทำรอยหยักครึ่งวงกลมด้วย `radial-gradient` repeating (รัศมี 16px, สีวงกลม `#f4f3f1` ตรงกับ bg `.about-section` ที่อยู่ถัดไปแบบไม่มีช่องว่าง เพื่อให้ดูเหมือนรอยบากทะลุเห็น section ถัดไปจริง) แทนแนวทาง `mask-image` ที่ซับซ้อนกว่าและมีปัญหา cross-browser (luminance vs alpha mask) — ตรวจสอบด้วย Python: CSS brace สมดุล 239/239, HTML tag สมดุลทุกตัว — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง (Claude in Chrome ไม่เชื่อมต่อ, ควรเปิดดูจริงยืนยันขนาด/ตำแหน่งรอยหยัก) — **rev.37.1 (flip)**: กลับทิศรอยหยักเป็น `.about-section::before` ห้อยลงจาก Hero สีน้ำเงินแทน (เดิม `.hero-section::after` โผล่ขึ้นสีเทา) พร้อมแก้บั๊ก `.hero-section` ใช้ `var(--primary)` ที่ไม่มีอยู่จริงเป็น `var(--ci-blue)` — **rev.37.2 (ตัดออก)**: ผู้ใช้เห็นว่าไม่สวย สั่งลบ scallop/stamp ทิ้งทั้งหมด กลับไปเป็นขอบตรงธรรมดา (คงการแก้บั๊ก `--primary` ไว้)
- 2026-07-20 (rev.38): ผู้ใช้ส่งภาพ ref แบรนด์กาแฟ "MORNCOFFEE" สั่ง "ปรับ footer เป็นตาม ref นี้" — redesign `<footer>` ทั้งหมดจากบรรทัด copyright เดียวพื้นน้ำเงิน (rev.31) เป็น 3 คอลัมน์ (Contacts / Our Business+Website / nav+social badge) + wordmark "CP B&F" ตัวใหญ่เต็มความกว้าง + bottom bar (copyright+legal links) — เนื้อหาปรับให้ตรงกับ CP B&F จริงแทนเนื้อหาร้านกาแฟใน ref (Our Business ใช้สายธุรกิจจริง 4 อย่างจาก [[cpbf.co.th (บริษัท)]] แทน "Opening Hours/Events", Contacts reuse placeholder เดิม, ตัด scallop trim ของ social badge ออกโดยตั้งใจตามที่เพิ่งถูกสั่งเอาออกจาก Hero ใน rev.37.2, ไม่ทำ illustration ฝังตัวอักษรเพราะไม่มี asset) — ตรวจสอบด้วย Python: CSS brace สมดุล 264/264, HTML tag สมดุลทุกตัว — ⚠️ ยังไม่ตรวจด้วยเบราว์เซอร์จริง, ⚠️ เนื้อหา Contacts/Our Business/social handle ยังไม่ยืนยันกับผู้ใช้ — **rev.38.1**: (1) `.site-footer__wordmark` font-size จาก `clamp()` เปลี่ยนเป็นค่าคงที่ `7rem`, (2) ลบส่วน `.contact-section__main` ของ Contact Us section ออกทั้งหมด (intro/cta/contact-panel+รายการติดต่อ+ปุ่ม "ติดต่อเรา") ตามที่ผู้ใช้ระบุจากภาพ screenshot คงเหลือแค่ `.contact-section__footer` (บาร์ "Let's work together!") ไว้ — ลบ CSS dead code ที่ผูกกับส่วนที่ถูกลบทั้งหมด (รวม responsive+reduced-motion) ตรวจสอบด้วย Python: CSS brace สมดุล 226/226, HTML tag สมดุลทุกตัว, Grep ยืนยันไม่มี class ค้าง — **rev.38.2**: เปลี่ยนข้อความ `.site-footer__wordmark` จาก "CP B&F" เป็น "CP B&F Company Limited" ตามคำสั่งตรงๆ (ไม่แตะ font-size `7rem`) ⚠️ ข้อความยาวขึ้นที่ font-size คงที่มีความเสี่ยงล้น/ตัดบรรทัดบนจอเล็ก ยังไม่ตรวจด้วยเบราว์เซอร์จริง

## หน้าที่เกี่ยวข้อง

- [[โครงการ Redesign เว็บไซต์ cpbf.co.th]]
- [[cpbf.co.th (บริษัท)]]
