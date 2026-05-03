# Election Citizen Services Platform - PromptWars 2026

### 🗳️ Submission for Challenge 2: AI Election Assistant

This platform is a production-grade, secure, and mobile-responsive digital hub designed to empower citizens with accurate, neutral, and interactive election information.

---

## 🎯 Project Overview
*   **Vertical**: Challenge 2 (AI Election Assistant & Voter Education)
*   **Deployment**: [PASTE YOUR CLOUD RUN LINK HERE]
*   **Technology Stack**: Node.js (Express), Vanilla JavaScript, HTML5, CSS3, Docker.
*   **Cloud Infrastructure**: Google Cloud Run.

---

## 🧠 Approach & Logic

### 1. Hybrid Intelligence Engine
To ensure high performance and reliability, I implemented a dual-layer AI strategy:
*   **Primary Layer (Offline Knowledge Base)**: A high-performance, hardcoded JavaScript `Map` that handles common queries (e.g., "What is NOTA?", "How to register?") instantly without network latency.
*   **Secondary Layer (Secure AI Fallback)**: For complex or real-time queries, the system securely proxies requests to the **OpenRouter API** (using Gemini models), ensuring the user always gets a helpful answer even for topics outside the core database.

### 2. Context-Aware Intent Detection
The assistant uses a keyword-mapping system that detects user intent across multiple categories:
*   **Procedures**: Voting steps and document verification.
*   **Rights**: Voter rights and constitutional protections.
*   **Democracy Basics**: Explanations of Lok Sabha, Rajya Sabha, etc.
*   **Anti-Misinformation**: A dedicated Myth vs. Reality logic gate.

### 3. Security-First Architecture
*   **API Proxying**: Sensitive credentials are never exposed to the client. All AI traffic is routed through a Node.js backend.
*   **Input Sanitization**: All user inputs are stripped of HTML and limited to 300 characters to prevent injection attacks and ensure cost efficiency.
*   **Environment Management**: Secrets are managed via `.env` and Google Cloud Secret Manager patterns.

---

## 🛠️ How it Works
1.  **Voter Education Hub**: A modular grid of 6 expandable cards providing deep-dives into civic education.
2.  **Interactive Timeline**: A dynamic, state-tracked visualization of the election cycle.
3.  **AI Assistant**: A chat interface with 1200ms "typing" simulation for natural UX, structured response formatting (tables, myths, lists), and political neutrality filters.
4.  **Polling Support**: A booth locator simulation and document checklist.

---

## ♿ Accessibility & Design
*   **Inclusive Design**: High-contrast colors (Amber/Blue/Green) and semantic HTML5 elements.
*   **Mobile-First**: Fully responsive layouts optimized for the smallest devices.
*   **Aria Labels**: Comprehensive ARIA implementation for screen reader support.

---

## 🧪 Testing
I have included a basic validation suite (`test.js`) to ensure the integrity of the Knowledge Base and the Intent Detection logic before deployment.

---

## 📝 Assumptions
*   The system assumes users prefer English/Hindi/Marathi (Multilingual support is ready).
*   The assistant assumes a neutral, non-partisan stance as per government-grade service standards.
*   Deployment is assumed to be on Google Cloud Run as per competition requirements.

---
*Developed by Tambalge Sainath for PromptWars 2026.*
