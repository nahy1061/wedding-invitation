# 📜 Project Context & Master State — Nikkah & Wedding Invitation

> **Last Updated:** September 19, 2026  
> **Repository:** `https://github.com/nahy1061/wedding-invitation.git`  
> **Branch:** `main`  
> **Location:** `E:\Desktop\project learning\nikkah-invitation`

---

## 🎯 1. Project Vision & Philosophy

- **Concept:** A digital Nikkah & wedding invitation designed as a **living piece of physical haute-couture stationery**, rather than a standard webpage or generic app.
- **Key Reference Aesthetic:** Modeled after luxury physical stationery folios (inspired by **Zareqia** & bespoke luxury stationery houses):
  - Full-screen vertical gatefold folio covering the entire phone screen (100vw, 100dvh).
  - Rich emerald damask silk/velvet texture.
  - Ornate die-cut scalloped Baroque gold foil plaque seal with **`TAP TO OPEN`**.
  - 3D double doors swinging open in real perspective to reveal a warm cream/ivory letterpress invitation card.
  - Atmospheric ambient acoustic strings/oud background melody with soft volume easing and discreet mute controls.
  - Clean, uncluttered typography and spacious negative space.

---

## 💍 2. Configured Wedding Event Details

All central wedding details are managed in [`src/config/weddingData.ts`](./src/config/weddingData.ts):

| Field | Configured Value |
| :--- | :--- |
| **Bride** | **Hafsa Salman** |
| **Groom** | **Abdul Rehman** |
| **Date** | **Saturday, October 3, 2026** |
| **Islamic Hijri Date** | **20 Rabi' al-Awwal 1448 AH** |
| **Timing** | **7:00 PM – 10:00 PM** |
| **Venue** | **Hall 2 (2nd Floor), NESCOM Officers Mess** |
| **Address** | **Sector H-11, Islamabad, Pakistan** |
| **Google Maps URL** | `https://maps.google.com/?q=NESCOM+Officers+Mess+H-11+Islamabad` |
| **Spiritual Verses** | Arabic *Bismillah* + *"And We created you in pairs"* (*Surah An-Naba 78:8*) + *Surah Ar-Rum 30:21* |
| **Background Music** | Classical acoustic strings & oud instrumental melody |

---

## 📁 3. File Structure & Component Breakdown

```
nikkah-invitation/
├── CONTEXT.md                            # Complete master project context (this file)
├── DOCUMENTATION.md                      # Detailed architectural documentation
├── README.md                             # Quick-start & feature summary
├── index.html                            # Root HTML with title & OpenGraph social metadata
├── package.json                          # Dependencies & scripts
├── vite.config.ts                        # Vite configuration with @tailwindcss/vite
├── src/
│   ├── App.tsx                           # Master controller (gatefold cover vs inner card state, audio)
│   ├── index.css                         # Tailwind v4 theme tokens, paper textures, and typography
│   ├── main.tsx                          # React entry point
│   ├── assets/
│   │   └── images/
│   │       ├── bg1.jpg                   # Rich emerald damask silk pattern (currently active)
│   │       ├── bg2.png                   # Dark forest floral & wildflower wallpaper
│   │       ├── bg3.jpg                   # Intricate filigree lace wallpaper
│   │       └── bg4.jpg                   # Alternative emerald texture
│   ├── components/
│   │   └── gatefold/
│   │       ├── GatefoldCover.tsx         # Full-screen 3D gatefold doors & 3D Baroque gold seal
│   │       ├── CreamInnerCard.tsx        # Warm cream letterpress inner card with paced animation
│   │       └── GatefoldAudioPlayer.tsx   # Glassmorphic top-right audio toggle
│   ├── config/
│   │   └── weddingData.ts                # Centralized wedding information schema & defaults
│   └── utils/
│       ├── calendar.ts                   # Google Calendar and Apple .ics generators
│       └── urlHelper.ts                  # Dynamic query parameter reader (`?to=Guest+Name`)
```

---

## 🎨 4. Key Components & Implementation Details

### A. The Gatefold Cover (`GatefoldCover.tsx`)
- **Background Image Location:** Imported at **Line 3** (`import bg1 from '../../assets/images/bg1.jpg'`).
- **Left Panel (Lines 44–48):** Background set with `backgroundImage: url(${bg1})`, `backgroundPosition: left center`.
- **Right Panel (Lines 76–80):** Background set with `backgroundImage: url(${bg1})`, `backgroundPosition: right center`.
- **Center Seam (Line 90):** Vertical gold hairline seam down the center.
- **Baroque Gold Plaque Seal (Lines 94–220):** 
  - Multi-layer SVG with metallic gold gradient stops (`#FFF4D9` → `#D4AF37` → `#96741D`).
  - Specular bevel lighting filter (`feSpecularLighting`).
  - Text: **`TAP TO OPEN`** framed with top and bottom filigree flourishes.
- **Animation on Tap:** Tapping the plaque smoothly triggers the left door (`rotateY(-105deg)`) and right door (`rotateY(105deg)`) to swing open in 3D perspective without any confetti.

### B. The Inner Card (`CreamInnerCard.tsx`)
- **Card Material:** 350gsm warm cream/ivory handmade cotton paper texture (`#FAF6EF`).
- **Paced Entrance:** Elements cascade in with smooth staggered delays.
- **Sections:**
  1. Arabic *Bismillah* & *"And We created you in pairs"*.
  2. *"Nikkah Ceremony"* in clean serif tracking.
  3. **Hafsa Salman & Abdul Rehman** in glowing serif typography with a gold script ampersand.
  4. **Date & Time Section:** *Saturday, October 3, 2026* • *7:00 PM – 10:00 PM* (*20 Rabi' al-Awwal 1448 AH*).
  5. **Venue Section:** *Hall 2 (2nd Floor), NESCOM Officers Mess, Sector H-11, Islamabad*.
  6. **Interactive Enclosures:**
     - **Add to Calendar:** 1-tap Google Calendar event with timing & venue pre-configured.
     - **Venue Directions:** 1-tap Google Maps directions directly to *NESCOM Officers Mess, H-11 Islamabad*.

### C. Audio Engineering (`GatefoldAudioPlayer.tsx`)
- Starts playing ambient acoustic music automatically upon the user unsealing/tapping the gatefold cover.
- Features a glassmorphic top-right volume toggle with live soundwave animation.

### D. Dynamic URL Personalization (`urlHelper.ts`)
- If a guest opens a link with `?to=Uncle+Tariq+%26+Family`, their name is dynamically displayed in a pill on the envelope and greeting card.

---

## 🛠️ 5. Technology Stack & Packages

- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation:** Framer Motion (Hardware-accelerated 3D transforms)
- **Icons:** Lucide React (`Calendar`, `MapPin`, `Volume2`, `VolumeX`, `RotateCcw`)
- **Typography:** *Italiana*, *Cinzel*, *Cormorant Garamond*, *Amiri*, *Alex Brush*, *Montserrat*

---

## 🚀 6. Running & Development Commands

```powershell
# Start local dev server
npm run dev

# Build for production
npm run build

# Git Sync
git add .
git commit -m "your commit message"
git push origin main
```
