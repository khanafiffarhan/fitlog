# 🏋️ FitLog

**A modern workout library & daily training planner.**

FitLog helps you discover exercises, build a focused daily plan (max 5 lifts), track progress, and save favorites — all in a clean, dark-themed interface.

---
LIVE LINK : https://fitlognew.netlify.app/

## ✨ Key Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | **Exercise Library** | 12 carefully selected compound & isolation lifts covering every major muscle group, with beautiful anime-style visuals. |
| 2 | **Smart Daily Plan** | Add up to 5 exercises to “Today’s Plan”. Cap enforced with friendly toasts so you stay focused. |
| 3 | **Save for Later** | Bookmark any exercise to revisit later. Separate “Saved” tab keeps your favorites organized. |
| 4 | **Detailed Exercise Pages** | Full breakdown: equipment, difficulty, sets/reps, duration, calories, rating + step-by-step instructions. |
| 5 | **Live Stats & Sorting** | Instant totals for exercises, minutes & calories. Sort your plan by duration, calories, rating or name. |

---
  **✨ dependencies"**

    "lucide-react": "^1.48.0",
    "next": "16.3.5",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-toastify": "^11.1.0"

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Context + localStorage persistence
- **Notifications**: react-toastify
- **Icons**: Lucide React
- **API**: Custom FitLog Workers API

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/fitlog.git

# Install dependencies
npm install

# Run the development server
npm run dev
Open http://localhost:3000 in your browser.

📁 Project Structure
textapp/
├── page.tsx                 # Exercise Library (grid)
├── exercise/[id]/page.tsx  # Exercise Detail
├── my-plan/page.tsx         # Today's Plan & Saved
├── layout.tsx               # Root layout + providers
components/
├── Navbar.tsx
├── Footer.tsx
context/
└── WorkoutContext.tsx       # Plan & Saved state

🎨 Design Highlights

Dark theme with lime accent (#c8ff24)
Fully responsive (mobile hamburger menu)
Smooth loading states & toast notifications
Sticky navbar + clean footer


Train hard. Log honest.

© 2026 FitLog
textYou can copy this directly into your `README.md`.  
It looks clean on GitHub with proper headings, tables, and emojis.
