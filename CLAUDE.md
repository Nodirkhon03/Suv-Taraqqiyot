# SUV-Taraqqiyot LLC — Project Context

## Company
- Full name: "SUV-TARAQQIYOT" LLC
- Founded: 2001, on the basis of NPO Wolfram
- Industry: Hydrogeological well drilling + water supply construction
- Location: Tashkent, Uzbekistan (Mirzo Ulugbek district, Alisher Navoi MSG,
  Khusan Shams street, 18 building)
- STI number: 203 681 239
## Annual Capacity (real numbers from presentation)
- Water pipelines: up to 200 km/year (diameter 32–1200 mm)
- Wells drilled: ~120 per year (depth 30–700 m)
- Water distribution units: up to 50 per year (300–30,000 m³/day)
- Water intake stations: over 5,000 m³ volume
- Water towers: up to 50 per year (10–75 m³)
## Certifications (all three active)
- O'z DSt ISO 9001:2015 — Quality Management System
- O'z DSt ISO 14001:2019 — Environmental Management System
- O'z DSt ISO 45001:2020 — Occupational Health & Safety Management System
- All issued by AVVISO CERT LLC

## Website Goal
Corporate credibility website for government agencies, engineering
consultants, international development orgs, and industrial clients.
Tone: professional, technical, trustworthy. NOT a startup or marketing site.

## Tech Stack
- Framework: Next.js 14 App Router
- Styling: TailwindCSS (custom config below)
- i18n: next-intl (4 languages: en, ru, uz, tr)
- Email: Nodemailer via API route
- Deployment: Vercel
- Animations: Framer Motion (subtle only)

## Color System (NEVER deviate from these)
--navy:    #0B2B43   (primary — headers, buttons, branding)
--blue:    #2C86C7   (secondary — highlights, UI accents)  
--cyan:    #24B5C6   (accent — used sparingly)
--sand:    #D8C7A2   (warm accent — earthworks metaphor)
--white:   #FFFFFF
--gray-50: #F8FAFC
--gray-100: #F1F5F9
--gray-600: #475569
--gray-900: #0F172A

## Typography
- Headings: Inter, font-weight 700, tight letter-spacing (-0.02em)
- Body: Inter, font-weight 400, line-height 1.7
- Labels/tags: 0.75rem, uppercase, letter-spacing 0.08em, weight 500
- Scale: use Tailwind text-sm through text-6xl

## Layout Rules
- Max container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Section padding: py-16 lg:py-24
- Card style: rounded-2xl border border-gray-100 shadow-sm bg-white
- Mobile-first. All layouts start at 375px.

## Component Conventions
- Glass header: bg-white/80 backdrop-blur-md border-b border-gray-100/50
- Primary button: bg-[#0B2B43] text-white px-6 py-3 rounded-xl hover:bg-[#2C86C7] transition
- Tags/pills: text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700
- Section label: text-xs uppercase tracking-widest text-[#2C86C7] font-medium

## Quality Standards
- Lighthouse target: 95+ all metrics
- WCAG 2.1 AA accessibility
- Perfect on mobile (375px), tablet (768px), desktop (1280px)
- All images: width, height, alt, loading="lazy"
- No console errors or warnings

## Languages
- en: English 
- ru: Russian  
- uz: Uzbek (default)
- tr: Turkish
- Translation files: /messages/{locale}.json

## File Structure
/app/[locale]/          ← locale-prefixed routes
/components/            ← shared components
/messages/              ← translation JSON files
/public/images/         ← all images
/lib/                   ← utilities and data
