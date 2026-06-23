# 👑 Urban Maharaja — Luxury Royal Indian Fine Dining

Urban Maharaja is a state-of-the-art web application built to represent a luxury, premium Indian fine dining establishment. It comprises a gorgeous, responsive, glassmorphism user interface for patrons to explore royal culinary experiences, book dining tables, subscribe to exclusive newsletter updates, and query the restaurant. Additionally, it features a comprehensive, secure administrative portal with real-time push notification feeds and self-persisting configurations.

---

## 🏛️ Architectural Layout

The project is structured as a Monorepo:
* **Root**: Consists of workspace configuration scripts to concurrently boot frontend and backend environments.
* **Client (Frontend)**: A React 19 web application built using Vite 8 and styled with TailwindCSS 4, featuring highly polished micro-animations and layouts.
* **Server (Backend)**: An Express server configured using ES Modules, integrating with MongoDB (via Mongoose) and broadcasting live alerts via Server-Sent Events (SSE).

---

## ✨ Key Features

### 1. Imperial Guest Court (Patron Site)
* **Royal Reservations**: Dynamic dining table reservation system checking seat capacities per time slot.
* **Culinary Registry**: View premium menus, explore the history of Urban Maharaja, and make queries.
* **Maharaja Club**: Newsletter registry to receive exclusive culinary invitations.

### 2. Admin Dashboard Hub
* **Unified Statistics Widget**: Instantly view counts for today's dining hostings, total expected guests, pending queue queue, inquiries log, and newsletter registry.
* **Interactive Bookings Manager (CRUD)**: Create walk-in reservations, edit reservations, cancel, confirm, or delete client records permanently.
* **Customer Inquiry Desk**: Review customer queries and delete outdated requests.
* **Newsletter Registry registry**: Manage newsletter subscriptions and manually add new VIP emails.
* **Self-Persisting Profile panel**: Edit administrative contact details and passwords. Changes are dynamically written back to `.env` to persist across server boots.

### 3. Real-Time Push Notification Engine
* **No-Refresh Streams**: Leveraging Server-Sent Events (SSE) instead of bloated WebSockets, new client events are broadcast from server to client instantly.
* **Alert Feed Desk**: Responsive notification bell icon in the dashboard header featuring a pulsing unread count badge.
* **Interactive Dropdown**: Clear notification lists, dismiss items, and auto-navigate to corresponding tabs directly from logs.
* **Auto-healing connection**: Built-in client-side logic to self-heal SSE connections if the network drops.

### 4. Advanced Security Architecture
* **Hashed Credentials**: Stored securely via bcrypt. Any plain-text credentials in the configuration are automatically hashed during first boot.
* **JWT Session Tokens**: Restricts access across all administrative REST calls using stateless session verification.
* **Auto-Logout Verification**: Automatically triggers session cleanups and redirects when JWT tokens expire.

---

## 💻 Tech Stack

### Client (Frontend)
* **Framework**: React 19 (using Vite 8 compiler)
* **Routing**: React Router DOM 7
* **Styling**: Vanilla CSS + TailwindCSS 4
* **Icons**: React Icons (lucide, feather, hi, gi)

### Server (Backend)
* **Framework**: Express (Node.js) using ES Modules
* **Database**: MongoDB (via Mongoose ODM)
* **Token Auth**: JSONWebToken (JWT)
* **Encryption**: BcryptJS
* **Real-time Push**: HTML5 Server-Sent Events (SSE)

---

## 🛠️ Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed.

### 1. Clone the repository
```bash
git clone https://github.com/ankitgithub12/Urban-Maharaja-Luxury-Royal-Indian-Fine-Dining-Restaurant-Website.git
cd "Urban Maharaja – Luxury Royal Indian Fine Dining Restaurant Website"
```

### 2. Environment Parameters Setup
Create a `.env` file in the **root** folder (or update the existing one):

```env
# Server Boot Configuration
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173

# Admin Authentication
ADMIN_EMAIL=admin@urbanmaharaja.com
ADMIN_PASSWORD=MaharajaAdmin@2026
ADMIN_NAME=Royal Administrator
ADMIN_PHONE=+91 98765 43210
JWT_SECRET=UrbanMaharaja_S3cr3t_K3y_2026_R0yal
JWT_EXPIRES_IN=24h
```

### 3. Dependency Installation
Install all dependencies for the root monorepo, frontend, and backend with a single command:
```bash
npm run install-all
```

---

## 🚀 Running the Project

To start both the client and server concurrently:
```bash
npm run dev
```

The application will launch on:
* **Frontend Client**: [http://localhost:5173/](http://localhost:5173/)
* **Backend REST Server**: [http://localhost:5000/](http://localhost:5000/)

To run the apps individually:
* **Run Client Only**: `npm run client`
* **Run Server Only**: `npm run server`

---

## ⚖️ License
This project is licensed under the MIT License.
