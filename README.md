# TryMe — Modern E-Commerce Application

**TryMe** is a full-featured e-commerce single-page application (SPA) built with **React 19**, **React Router v7**, **Vite**, and **Axios**, backed by a Node.js/Express REST API.

---

## 🌟 Key Features

* **Product Catalog & Browsing:** Browse products with real-time ratings, price formatting (in cents), quantity selectors, and product images.
* **Instant Product Search:** Filter products dynamically via search query parameters (`/?search=...`) connected directly to the backend search API.
* **Cart Management:** Real-time cart state management allowing users to add items, update quantities, delete items, and calculate items total.
* **Checkout & Shipping:** Review order items, select from dynamic delivery speed options (Free, $4.99, $9.99), and calculate pre-tax totals, 10% tax estimates, and final order totals.
* **Order History:** View completed orders with order IDs, timestamps, item summaries, and dynamic re-ordering ("Add to Cart" / Buy Again).
* **Live Package Tracking:** Dynamic tracking page calculating shipment progress, estimated arrival dates, and delivery status (`Preparing`, `Shipped`, `Delivered`) via backend order tracking APIs.

---

## 🛠️ Technology Stack

### Frontend
* **Core Library:** React 19 (`react`, `react-dom`)
* **Routing:** React Router v7 (`react-router`)
* **Build Tool & Server:** Vite 6 (`vite`)
* **HTTP Client:** Axios (`axios`)
* **Date Utilities:** Day.js (`dayjs`)
* **Testing:** Vitest + React Testing Library (`vitest`, `@testing-library/react`, `@testing-library/user-event`, `jsdom`)
* **Styling:** Vanilla CSS modular styling system

### Backend (REST API Service)
* **Runtime & Server:** Node.js, Express.js
* **Database & ORM:** SQLite (`database.sqlite`) via Sequelize ORM with `sql.js`

---

## 🏗️ Architecture Overview

The application follows a client-server architecture:
* **Frontend SPA:** Built as a single-page React application hosted via Vite.
* **API Proxying:** Vite dev server proxies `/api` and `/images` requests to the local Express backend running on `http://localhost:3000`.
* **Data Flow:** React components handle UI rendering and user interactions, while API calls are handled via `axios` targeting REST endpoints (`/api/products`, `/api/cart-items`, `/api/delivery-options`, `/api/payment-summary`, `/api/orders`).

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v22+ recommended)
* **npm** (v10+ recommended)

### Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/aniCtrl/ecommerce-web-Project.git
   cd ecommerce-web-Project
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd ecommerce-backend-ai-main
   npm install
   cd ..
   ```

4. **Run the Backend Server:**
   ```bash
   cd ecommerce-backend-ai-main
   npm run dev
   ```
   *The server runs on `http://localhost:3000`.*

5. **Run the Frontend Application:**
   In a separate terminal window at the root project directory:
   ```bash
   npm run dev
   ```
   *Open `http://localhost:5173` in your browser.*

---

## 🧪 Testing & Build

### Running Tests
To run unit and component integration tests:
```bash
npx vitest run
```

### Production Build
To create a production build bundle:
```bash
npm run build
```
The compiled static assets will be output to the `dist/` directory.

---

## 📄 License
ISC License
