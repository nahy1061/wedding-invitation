# 💍 Luxury Nikkah Digital Gatefold Invitation

A digital Nikkah invitation modeled directly after luxury physical stationery folios: full-screen sage green vertical gatefold with sculpted 3D embossed botanicals, an ornate scalloped gold plaque (*"TAP TO OPEN"*), 3D double door reveal animation, and an elegant warm cream letterpress inner card.

---

## ✨ Features

- 🌿 **Full-Screen Edge-to-Edge Gatefold Folio (`GatefoldCover.tsx`):**
  - Fills 100% of the mobile screen (100vw, 100dvh).
  - Rich olive/sage green textured paper with embossed 3D botanical leaves.
  - Hairline gold vertical dividing seam.
  - Die-cut scalloped Baroque gold plaque with **"TAP TO OPEN"** and filigree flourishes.

- 🚪 **3D Double Door Reveal Animation:**
  - Tapping the plaque triggers golden sparkle bursts (`canvas-confetti`).
  - Left and right panels swing open outwards in 3D perspective (`rotateY(-105deg)` & `rotateY(105deg)`).
  - Ambient instrumental music fades in smoothly.

- 📜 **Warm Cream Inner Card (`CreamInnerCard.tsx`):**
  - Staggered cascade entrance animation.
  - Warm cream/ivory handmade paper with gold hairline borders and corner accents.
  - Classical Arabic *Bismillah* & *"And We created you in pairs"* (*Surah An-Naba 78:8*).
  - Main Heading: **"Nikkah Ceremony"**.
  - **Abdul Rehman & Hafsa Salman** in spacious serif typography.
  - Clean, minimal sections for Date (*Saturday, October 3, 2026* • *7:00 PM – 10:00 PM* • *20 Rabi' al-Awwal 1448 AH*) and Venue (*Hall 2, 2nd Floor, NESCOM Officers Mess, Sector H-11, Islamabad*).
  - Enclosure tags: **Add to Calendar** & **Venue Directions (Google Maps)**.

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` to test the full-screen gatefold unboxing, sound, and inner card!
