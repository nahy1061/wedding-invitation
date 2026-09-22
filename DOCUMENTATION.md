# ✨ Haute Couture Nikkah Stationery — Technical Documentation

Welcome to the internal engineering and product documentation for the **Abdul Rehman & Hafsa Nikkah Digital Stationery** experience.

---

## 📖 Table of Contents
1. [Design Philosophy: "Living Stationery, Not a Website"](#design-philosophy)
2. [Color Palette & Design Tokens](#color-palette--design-tokens)
3. [Component Hierarchy](#component-hierarchy)
4. [Tactile Unboxing & Animation Engine](#tactile-unboxing--animation-engine)
5. [Audio Engineering](#audio-engineering)
6. [Calendar & Maps Integration](#calendar--maps-integration)
7. [Personalization via URL Params](#personalization-via-url-params)

---

## 1. Design Philosophy

The invitation is intentionally crafted without conventional website elements (no navigation bars, sidebars, form feeds, or floating drawers). It mimics the physical experience of receiving a luxury stationery suite:
1. **Outer Mailing Envelope:** Linen textured with an antique wax seal monogrammed "H & A".
2. **The Unsealing:** Tapping the wax seal triggers an unboxing sequence (wax crack, pearl dust particles, 3D flap flip, paper rising).
3. **The Deckle-Edge Card:** 350gsm handmade warm ivory cotton rag paper with blind-debossed typography and delicate gold foil lines.
4. **The Enclosure Tags:** Gilded stationery tags for "Add to Calendar" and "Venue Directions".

---

## 2. Color Palette & Design Tokens

- **Studio Canvas:** Warm Alabaster (`#f5f0e8`, `#ebe3d5`)
- **Stationery Paper:** Warm Ivory (`#fdfbf7`, `#f7f3ec`, `#eee8de`)
- **Outer Envelope:** Rich Raw Taupe / Linen (`#3d3630`, `#2e2823`)
- **Matte Champagne Foil:** Soft Gilded Bronze (`#dfcaa8`, `#c5a880`, `#9d815d`)
- **Letterpress Ink:** Warm Charcoal & Sepia Muted (`#2c2724`, `#6e645a`, `#8e8271`)
- **Antique Wax Seal:** Deep Ruby Burgundy (`#8f281f`, `#751b14`, `#470f0b`)

### Typography
- **Headings & Names:** *Italiana* and *Cormorant Garamond* (Light, spacious tracking)
- **Arabic Calligraphy:** *Amiri*
- **Script Accents:** *Alex Brush*
- **Body & Details:** *Montserrat*

---

## 3. Component Hierarchy

```
src/
├── components/
│   └── stationery/
│       ├── BotanicalArt.tsx        # Hairline botanical branches, crests, and hairline borders
│       ├── MinimalAudioControl.tsx # Discreet luxury brass audio toggle with pulse waves
│       ├── StationeryEnvelope.tsx  # Photorealistic 3D envelope with animated wax seal
│       └── StationeryCard.tsx      # 350gsm deckle-edge card with event details & enclosure tags
├── config/
│   └── weddingData.ts              # Single centralized configuration for wedding details
├── utils/
│   └── urlHelper.ts                # Extracts `?to=Guest+Name` for dynamic lettering
├── App.tsx                         # Master orchestrator
└── index.css                       # Tailwind v4 theme tokens, letterpress deboss, and paper textures
```

---

## 4. Tactile Unboxing & Animation Engine
- Built with **Framer Motion** + CSS 3D perspective transforms (`rotateX: 180deg`).
- Hardware accelerated 60-120fps with sub-millisecond layout reflows.
- `canvas-confetti` renders subtle pearl & gold dust sparkles centered on the wax seal coordinates.

---

## 5. Calendar & Maps Integration
- **Google Maps:** Direct deep link targeting `NESCOM Officers Mess, Sector H-11, Islamabad`.
- **Google Calendar:** Auto-generates a one-tap calendar event for **Saturday, Oct 3, 2026, 7:00 PM – 10:00 PM PKT**.
