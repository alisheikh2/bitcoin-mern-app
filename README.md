# 🪙 Bitcoin Price Analytics & Prediction System (MERN Stack)
A comprehensive Full-Stack web application built using the MERN stack that manages, tracks, and analyzes historical Bitcoin market data while offering predictive insights. This project simulates a real-world cryptocurrency dashboard, featuring automated data pipelines, asset logging, and high-performance backend organization.

## ⚙️ How the Project Works (System Architecture)
This application operates on a clear, decoupled three-tier architecture (Client, Server, Database) to ensure smooth data synchronization:
1. **The Data Layer (MongoDB):** Stores the daily historical footprints of Bitcoin (Open, High, Low, Close, Volume) along with custom classification tags and machine-learning-ready prediction schemas.
2. **The Controller Layer (Node.js & Express):** Acts as the engine of the project. It handles requests coming from the frontend, securely connects to MongoDB, processes incoming crypto payloads, runs analytical operations, and ships clean JSON data back to the client.
3. **The Presentation Layer (React.js):** Renders the visual charts, data tables, and high-low alert systems. It requests raw data from the API routes, processes it into user-friendly layouts, and implements client-side pagination to keep the UI smooth and responsive.

## 🚀 Key Functional Features

**Historical Ledger (CRUD Operations):** Allows full tracking of historical asset data. Users can log daily records, update market deviations, search specific date intervals, and clean out redundant system logs via the frontend UI.
**Smart Filtering & Analytics:** The backend dynamically isolates volatile periods (e.g., Bullish phases above specific price targets) and performs server-side calculations like average market volume before data hits the user interface.
**Pagination System:** Designed to handle vast historical charts. Instead of dumping years of Bitcoin data onto the screen at once, the system slices the records neatly into logical dashboard pages to optimize render speed.
**Future-Ready Prediction Schema:** Features placeholder hooks (`predictedClose`) designed to merge seamlessly with algorithmic data prediction modules for forecasting trends.

## 🛠️ Tech Stack & Dependencies

**Frontend:** React.js, Context API/Axios for state & server interaction, Tailwind CSS for dashboard design.
**Backend:** Node.js, Express.js (REST API Endpoints)
**Database:** MongoDB (Native Drivers / Mongoose Object Modeling)

## ⚙️ Installation & Setup Guide

Follow these steps to deploy and run the system locally:

### 1. Prerequisites
Ensure you have **Node.js** and **MongoDB Server** (Local or Atlas) installed on your machine.

### 2. Clone the Repository
git clone [https://github.com/alisheikh2/bitcoin-mern.git](https://github.com/alisheikh2/bitcoin-mern.git)
cd bitcoin-mern

### 3. Backend Deployment
Move to the server directory:
cd backend

Install the necessary node modules:
npm install

Set up your environment file (.env):
PORT=5000
MONGO_URI=mongodb://localhost:27017/bitcoin-analytics-db

Boot up the REST API server:
npm start

### 4. Frontend Deployment (Terminal 2)
Open a new terminal window or tab, navigate back to the root bitcoin-mern-app folder, and run:

Move to the client directory:
cd frontend

Install user interface dependencies:
npm install

Start the React development environment:
npm start
