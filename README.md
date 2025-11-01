# 🌿 AyurRoot – Blockchain-Based Geo-Tagged Traceability System for Ayurvedic Herbs

## 🧩 Overview

**AyurRoot** is a blockchain-powered platform designed to ensure the **authenticity, quality, and sustainability** of Ayurvedic herbs.  
It provides **end-to-end traceability** from farm to formulation using **geo-tagging, blockchain, and smart contracts**.

Consumers can scan a **QR code** on the final product to instantly verify the herb’s origin, harvest details, lab test results, and sustainability compliance.

---

## 🚀 Features

- 🔗 **Permissioned Blockchain Network** using Hyperledger Fabric  
- 📍 **Geo-Tagged Collection Events** with GPS and timestamp  
- ⚙️ **Smart Contracts** for enforcing quality, seasonal, and geo-fencing rules  
- 🧪 **Lab Test Integration** (moisture, pesticide, DNA authentication)  
- 🧾 **QR Code Generation** for product verification  
- 🌐 **Web & Mobile Portal** for real-time provenance tracking  
- 📶 **Offline Data Capture + SMS Sync** for rural collectors  
- 🔒 **Tamper-Proof Ledger** ensuring transparency and trust  

---

## 🧱 Tech Stack

### 🖥️ Frontend

| Technology | Description |
|-------------|-------------|
| **React.js** | Builds a fast, dynamic, and component-based user interface. Enables real-time rendering of herb data, maps, and QR code details. |
| **Tailwind CSS** | Utility-first CSS framework for clean and responsive UI design. Creates a lightweight and mobile-friendly layout for farmers, labs, and consumers. |
| **Leaflet.js** | JavaScript library for interactive maps. Visualizes geo-tagged herb collection locations and supply-chain routes. |

---

### ⚙️ Backend

| Technology | Description |
|-------------|-------------|
| **Node.js** | JavaScript runtime for building scalable, efficient server-side applications. Handles API requests, blockchain interactions, and authentication. |
| **Express.js** | Lightweight Node.js framework for RESTful APIs. Connects frontend with blockchain and database layers. |

---

### 🔗 Blockchain Layer

| Technology | Description |
|-------------|-------------|
| **Hyperledger Fabric** | Permissioned blockchain ensuring security, privacy, and trust. Records every transaction immutably and supports smart contracts for geo-fencing, quality, and sustainability rules. |
| **IPFS (InterPlanetary File System)** | Decentralized storage for lab certificates, test reports, and images. Stores off-chain data linked via content hashes. |

---

### 💾 Database

| Technology | Description |
|-------------|-------------|
| **PostgreSQL** | Robust relational database for managing off-chain metadata and user records. Ensures efficient provenance data querying and traceability reports. |

---

### 📡 IoT Integrations

| Technology | Purpose |
|-------------|----------|
| **GPS (Global Positioning System)** | Captures accurate latitude and longitude during herb collection for geo-tagging and location validation. |
| **RFID (Radio-Frequency Identification)** | Tags and tracks herb batches during processing and transport to ensure tamper-proof custody tracking. |
| **SMS Gateway** | Enables offline data recording through text messages; converts SMS data into blockchain transactions. |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/AyurRoot.git
cd AyurRoot
### 2️⃣ Install Dependencies
npm install
3️⃣ Run the Frontend (Development Mode)
npm run dev
4️⃣ Start Backend Server
cd backend
npm install
npm start
🗺️ Project Architecture
AyurRoot/
│
├── backend/             # Node.js + Express backend (API + Blockchain logic)
├── public/              # Static assets
├── src/                 # React frontend source code
├── components.json      # Component registry
├── tailwind.config.ts   # Tailwind CSS configuration
├── package.json         # Project dependencies
├── README.md            # Project documentation
└── .env                 # Environment variables (local setup)

💡 Use Case

This project addresses the Ministry of AYUSH (AIIA) problem statement:

“Develop a blockchain-based system for botanical traceability of Ayurvedic herbs, including geo-tagging from the point of collection to the final Ayurvedic formulation label.”

👥 Team Members
Name	Role
Vivek N. Patil	Team Lead / Blockchain Developer / Frontend Developer / Backend Developer
Anant D. Lohar	Frontend Developer
Aditya S. Karnawat	Backend Developer / UI-UX Designer

🏁 Future Scope

🤖 AI-based fraud detection using pattern recognition

🧾 Integration with AYUSH certification bodies

🌍 Multi-language support for rural collectors

🌱 Expansion to other medicinal plant supply chains
