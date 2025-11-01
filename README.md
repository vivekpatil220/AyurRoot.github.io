🌿 AyurRoot – Blockchain-Based Geo-Tagged Traceability System for Ayurvedic Herbs
🧩 Overview

AyurRoot is a blockchain-powered platform designed to ensure the authenticity, quality, and sustainability of Ayurvedic herbs.
It provides end-to-end traceability from farm to formulation using geo-tagging, blockchain, and smart contracts.

Consumers can scan a QR code on the final product to instantly verify the herb’s origin, harvest details, lab test results, and sustainability compliance.

🚀 Features

🔗 Permissioned Blockchain Network using Hyperledger Fabric

📍 Geo-Tagged Collection Events with GPS and timestamp

⚙️ Smart Contracts for enforcing quality, seasonal, and geo-fencing rules

🧪 Lab Test Integration (moisture, pesticide, DNA authentication)

🧾 QR Code Generation for product verification

🌐 Web & Mobile Portal for real-time provenance tracking

📶 Offline Data Capture + SMS Sync for rural collectors

🔒 Tamper-Proof Ledger ensuring transparency and trust

🧱 Tech Stack

🖥️ Frontend

1. React.js

Used for building a fast, dynamic, and component-based user interface.

Enables real-time rendering of herb data, maps, and QR code details.

2. Tailwind CSS

Utility-first CSS framework for clean and responsive UI design.

Helps create a lightweight and mobile-friendly layout for farmers, labs, and consumers.

3. Leaflet.js

Open-source JavaScript library for interactive maps.

Used to visualize geo-tagged herb collection locations and supply-chain routes.

⚙️ Backend

1. Node.js

JavaScript runtime used to build scalable and efficient server-side applications.

Handles API requests, blockchain interactions, and authentication.

2. Express.js

Lightweight Node.js framework for creating RESTful APIs.

Connects the frontend with blockchain and database layers.

🔗 Blockchain Layer

1. Hyperledger Fabric

Permissioned blockchain framework ensuring security, privacy, and trust.

Records every supply-chain transaction (collection, processing, testing) immutably.

Supports smart contracts to enforce geo-fencing, quality checks, and sustainability rules.

2. IPFS (InterPlanetary File System)

Decentralized file storage system for lab certificates, test reports, and images.

Stores data off-chain and links it to blockchain via unique content hashes.

💾 Database

PostgreSQL

Robust relational database for managing off-chain metadata and user records.

Ensures efficient querying of provenance data and batch traceability reports.

📡 IoT Integrations

1. GPS (Global Positioning System)

Captures accurate latitude and longitude during herb collection.

Enables geo-tagging and validation of harvest locations.

2. RFID (Radio-Frequency Identification)

Used to tag and track herb batches during processing and transportation.

Ensures tamper-proof custody tracking across the supply chain.

3. SMS Gateway

Allows collectors in low-connectivity areas to record events via text message.

SMS data is securely converted to blockchain transactions through a gateway.

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/<your-username>/AyurRoot.git
cd AyurRoot

2️⃣ Install Dependencies
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

This project addresses the Ministry of AYUSH (AIIA) problem statement —
“Develop a blockchain-based system for botanical traceability of Ayurvedic herbs, including geo-tagging from the point of collection to the final Ayurvedic formulation label.”

👥 Team Members
Name	Role
VIVEK N PATIL	Project Lead / Blockchain Developer, Frontend Developer, Backend Developer
ANANT D LOHAR	Frontend Developer
ADITYA S KARNAWAT	Backend Developer, UI/UX Designer

🏁 Future Scope

AI-based fraud detection using pattern recognition

Integration with AYUSH certification bodies

Multi-language support for rural collectors

Expansion to other medicinal plant supply chains
