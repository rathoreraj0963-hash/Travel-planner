/**
 * File: frontend/src/styles/App.css
 * Layout styles for App shell (header, main, footer)
 */

.app-main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  min-height: calc(100vh - 140px);
}

.app-footer {
  text-align: center;
  padding: 1.5rem;
  font-size: 0.8rem;
  color: var(--muted);
  border-top: 1px solid var(--cream-dark);
  background: var(--cream-dark);
}

/* ─── Header ─────────────────────────────────────────────────────────────── */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2.5rem;
  background: var(--ink);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 12px rgba(0,0,0,.25);
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
}

.header-logo-icon {
  width: 36px;
  height: 36px;
  background: var(--gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.header-logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: var(--cream);
  letter-spacing: 0.02em;
}

.header-logo-text span {
  color: var(--gold);
}

.header-tagline {
  font-size: 0.78rem;
  color: var(--muted);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
# ✈️ WanderMind — Multi-Agent Travel Itinerary Planner

A full-stack AI travel planner using an **Event-Driven + Function-Oriented Multi-Agent Architecture**.

---

## 🏗️ System Architecture

```
User Input (Form)
       │
       ▼
  [ Validate Input ]  ◄── Middleware: validateInput.js
       │
       ▼
  [ Dispatch Agents in Parallel ]  ── Promise.all()
  ┌────────────────────────────┐
  │  ✈ Flight Agent            │  flightService.js
  │  🏨 Hotel Agent            │  hotelService.js
  │  🍽 Food Agent             │  foodService.js
  └────────────────────────────┘
       │
       ▼
  [ 💰 Budget Optimization Agent ]  ── budgetService.js
       │  (recalculates if over budget)
       ▼
  [ Build Daily Schedule ]
       │
       ▼
  [ Save to MongoDB ]
       │
       ▼
  [ Return Itinerary to Frontend ]
```

---

## 📂 Project Structure

```
/travel-planner
├── /frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── index.js
│   │   ├── App.js                   ← Root: state + view router
│   │   ├── styles/
│   │   │   ├── global.css           ← Design system variables
│   │   │   └── App.css              ← Layout styles
│   │   └── components/
│   │       ├── Header.js            ← Sticky nav bar
│   │       ├── Form.js              ← Trip input form
│   │       ├── Form.css
│   │       ├── LoadingScreen.js     ← Agent pipeline visualizer
│   │       ├── LoadingScreen.css
│   │       ├── Itinerary.js         ← Results display
│   │       └── Itinerary.css
│   └── package.json
│
├── /backend
│   ├── server.js                    ← Express app + MongoDB boot
│   ├── package.json
│   ├── .env.example
│   ├── middleware/
│   │   └── validateInput.js         ← Request validation middleware
│   ├── routes/
│   │   └── itineraryRoutes.js       ← REST endpoints
│   ├── controllers/
│   │   └── itineraryController.js   ← Agent orchestrator
│   └── services/
│       ├── flightService.js         ← ✈ Flight Agent (mock API)
│       ├── hotelService.js          ← 🏨 Hotel Agent (mock API)
│       ├── foodService.js           ← 🍽 Food Agent (mock API)
│       └── budgetService.js         ← 💰 Budget Optimization Agent
│
└── /models
    ├── User.js
    ├── Itinerary.js                 ← Main document (embeds all)
    ├── Flight.js
    ├── Hotel.js
    ├── Food.js
    └── Budget.js
```

---

## ⚙️ Tech Stack

| Layer      | Technology              |
|------------|------------------------|
| Frontend   | React 18, Axios        |
| Backend    | Node.js, Express 4     |
| Database   | MongoDB + Mongoose     |
| APIs       | Mock (no real keys)    |
| Fonts      | Playfair Display, DM Sans |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB running locally (or Atlas URI)

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment

```bash
cd backend
cp .env.example .env
# Edit .env: set MONGO_URI if needed
```

### 3. Run

```bash
# Terminal 1 — Backend
cd backend
npm run dev        # uses nodemon for hot-reload

# Terminal 2 — Frontend
cd frontend
npm start          # opens http://localhost:3000
```

---

## 🌐 API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| POST   | `/api/itinerary/generate`   | Run multi-agent pipeline |
| GET    | `/api/itinerary`            | List all itineraries     |
| GET    | `/api/itinerary/:id`        | Get one itinerary        |
| DELETE | `/api/itinerary/:id`        | Delete itinerary         |
| GET    | `/api/health`               | Health check             |

### Sample Request Body

```json
{
  "userName": "Alex",
  "destination": "Tokyo",
  "startDate": "2025-06-01",
  "endDate": "2025-06-08",
  "budget": 2500,
  "preferences": ["culture", "food"]
}
```

---

## 🧠 Agent Details

| Agent          | File               | Role                                          |
|----------------|--------------------|-----------------------------------------------|
| Flight Agent   | flightService.js   | Returns ranked mock flights for destination   |
| Hotel Agent    | hotelService.js    | Returns accommodation options with nightly rate |
| Food Agent     | foodService.js     | Generates meal plan (3 meals × N days)        |
| Budget Agent   | budgetService.js   | Optimizes selections to stay within budget    |

All agents run in **parallel** via `Promise.all()`. The Budget Agent receives their outputs and iteratively downgrades selections if the total exceeds the user's budget.

---

## 🗄️ Database Schema (ER Summary)

```
User ──< Itinerary
Itinerary embeds: Flight, Hotel[], Food[], Budget
```

---

## 🎨 Design System

- **Palette**: Deep Teal (#0d5c63), Warm Cream (#f5efe6), Gold (#c9963a), Ink (#1a1208)
- **Typography**: Playfair Display (headings) + DM Sans (body)
- **Animations**: CSS fade-up, globe spin, progress bar, step indicators

---

## 📌 Extending to Production

1. Replace mock service functions with real API calls (Amadeus, Booking.com, Yelp)
2. Add JWT authentication for user accounts
3. Add email itinerary delivery (Nodemailer / SendGrid)
4. Deploy: Vercel (frontend) + Railway/Render (backend) + MongoDB Atlas

---

*Built with the Multi-Agent Event-Driven + Function-Oriented Architecture pattern.*
