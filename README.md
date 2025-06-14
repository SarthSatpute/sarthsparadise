
# 📡 Sarth's Paradise — Virtual Gather Space

**Sarth's Paradise** is an interactive multiplayer virtual space inspired by platforms like Gather.town. It lets users move freely in a 2D map, interact via **proximity-based video chat**, join **private areas**, and collaborate naturally in a customizable environment.

---

## 🚀 Features

- **Tile-Based Movement** — Smooth 2D avatar navigation.
- **Proximity Video Chat** — Automatic video/audio with nearby users.
- **Private Spaces** — Isolated zones for confidential conversations.
- **Real-Time Multiplayer** — Fast, synced player state with **Socket.IO**.
- **Customizable Maps** — Design your own virtual rooms.
- **Modern Tech Stack** — Built with **TypeScript**, **Next.js**, **Supabase**, **Socket.IO**, **Pixi.js**, **Agora**, and **TailwindCSS**.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript + Next.js** | Frontend framework & server |
| **Socket.IO** | Real-time multiplayer networking |
| **Supabase** | Auth & database |
| **Pixi.js** | 2D rendering for smooth movement |
| **Agora** | Video/audio calls |
| **TailwindCSS** | Modern UI styling |

---

## 📌 How to Run Locally

1️⃣ **Clone the repository**

```bash
git clone https://github.com/SarthSatpute/sarthsparadise.git
cd sarthsparadise
````

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Configure environment variables**

Create a `.env.local` file with your **Supabase** and **Agora** keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_AGORA_APP_ID=your_agora_app_id
```

4️⃣ **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---


## 🏆 Highlights

* Designed and implemented a real-time multiplayer system.
* Integrated proximity-based video calls for realistic interactions.
* Smooth 2D movement with **Pixi.js**.
* Custom maps & private zones for flexible use.

---



```
