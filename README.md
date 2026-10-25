# AAA Engine — Adaptive Acoustic Auth Engine
## Complete Technical Project Documentation Website

A responsive, production-ready project documentation website for **AAA Engine (Adaptive Acoustic Auth Engine)**, developed for final-year engineering project **23CSE498 – Project Phase 2 (Team Number: 90)** at the Amrita School of Computing, Department of Computer Science & Engineering.

---

## 📌 Project Overview

**AAA Engine** is a plug-and-play biometric security middleware that provides deepfake-immune voice authentication. It integrates:
1. **Layer 2 — Anti-Spoofing Gate (Wav2Vec2 / Wav2Vec2BERT):** Classifies incoming audio as *bonafide* or *spoof*, blocking synthesized speech and replay attacks before embedding extraction.
2. **Layer 1 — Speaker Verification (ECAPA-TDNN):** Generates 192-dimensional acoustic voiceprints with channel attention and computes cosine similarity against stored templates (threshold $\ge 0.70$).
3. **Layer 3 — Adaptive Voiceprint Update (EMA):** Dynamically evolves stored voiceprints on successful authentication using Exponential Moving Average ($\text{New} = 0.8 \times \text{Old} + 0.2 \times \text{Current}$) to compensate for natural voice drift.
4. **Active Challenge-Response Protocol:** Enforces cognitive liveness via HMAC-SHA256 signed, 90-second single-use challenge tokens (`nonce.expires_ts.sig`).

---

## 👥 Project Team & Leadership

* **Faculty Project Guide:** **Dr. Harini N**, Associate Professor, Department of CSE, Amrita School of Computing
* **Project Team (Team Number: 90):**
  1. **M Nandan Reddy** (`CB.SC.U4CSE23431`) — Layer 2 Deepfake Detection (`layer2_deepfake.py`)
  2. **M Navadeep Kumar** (`CB.SC.U4CSE23434`) — API Middleware & Pipeline Orchestration (`main.py`, `db.py`)
  3. **Parise Aditya** (`CB.SC.U4CSE23464`) — Layer 3 Adaptive Voiceprint & Token Logic (`layer3_adaptive.py`)
  4. **AVKB Surya** (`CB.SC.U4CSE23467`) — Layer 1 Speaker Verification (`layer1_speaker.py`)
  5. **M Karthik Srijan** (`CB.SC.U4CSE23534`) — Security Architecture, Tokens & Cryptography

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend & Client** | React 19, Vite 8, `audioEncoder.js` (WebM $\to$ 16kHz mono WAV), Streamlit dashboard |
| **Backend & API** | Python FastAPI (port 8000), SQLAlchemy ORM, Pydantic v2, Uvicorn |
| **AI & Models** | ECAPA-TDNN (SpeechBrain), Wav2Vec2 / Wav2Vec2BERT, PyTorch, Hugging Face |
| **Audio Processing** | LibROSA (16kHz resampling, silence trim), torchaudio (FBANK features) |
| **Database** | PostgreSQL with native `ARRAY(Float)` vector column for 192-dim embeddings |
| **Security & Auth** | HMAC-SHA256 single-use tokens, 90s TTL, timing-safe `compare_digest` |
| **Deployment** | Docker & Docker Compose (`fastapi-app`, `postgres-db`) |

---

## 📂 Project Directory Structure

```
website_demo/
├── index.html                   # HTML entry point with metadata & web fonts
├── package.json                 # Node dependencies and scripts
├── vite.config.js               # Vite bundler configuration
├── public/
│   ├── favicon.svg              # SVG security/audio badge icon
│   └── documents/               # Authentic project deliverable documents
│       ├── final_ppt.pdf        # Panel Review 1 Presentation (11 slides)
│       ├── Task1_Motivation_Problem_Statement.docx
│       ├── Task2_Technical_Domain_Knowledge.docx
│       ├── Task3_Literature_Review.docx
│       ├── Task4_Architecture_Design.docx
│       ├── Task5_Novelty_Differentiation.docx
│       └── Task6_Phase_Planning.docx
└── src/
    ├── main.jsx                 # React root mount
    ├── App.jsx                  # Main page assembler with smooth scrolling
    ├── index.css                # Global design system (light mode, academic styling)
    ├── components/
    │   ├── Header.jsx           # Sticky nav with active scroll tracking & mobile menu
    │   └── Footer.jsx           # Clean footer with GitHub link, team & guide info
    ├── data/
    │   └── projectData.js       # Central data model (team, API, DB schema, milestones)
    └── sections/
        ├── Hero.jsx             # Tagline, 3-layer pipeline preview, and CTAs
        ├── ProblemStatement.jsx # Indian scam cases, voice fraud stats, and pain points
        ├── Objectives.jsx       # 6 core research and engineering objectives
        ├── Methodology.jsx      # 9-step authentication flow with layer badges
        ├── Architecture.jsx     # Responsive component diagram & module breakdown
        ├── TechStack.jsx        # Categorized technology stack cards
        ├── Progress.jsx         # Implementation state & roadmap for upcoming semesters
        ├── Team.jsx             # Team member cards, roles, and faculty guide
        ├── Novelty.jsx          # 3 Novelty Pillars & comparison with existing systems
        ├── ApiDocs.jsx          # 5-endpoint REST API documentation with copyable JSON
        ├── Database.jsx         # 4-table PostgreSQL schema & ER architecture
        ├── GitHub.jsx           # Repository showcase card & branch details
        ├── Demos.jsx            # Demonstration walkthrough previews
        └── References.jsx       # 11+ academic citations and benchmark dataset table
```

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js**: v18.0.0 or higher (v22.x recommended)
* **npm**: v9.0.0 or higher

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
The compiled, minified bundle will be output to the `dist/` folder.

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Run Linter
```bash
npm run lint
```

---

## 🌐 Deployment Instructions

### Vercel
1. Install Vercel CLI: `npm i -g vercel` or link your GitHub repository on [vercel.com](https://vercel.com).
2. Set Framework Preset to **Vite**.
3. Set Build Command to `npm run build` and Output Directory to `dist`.

### Netlify
1. Connect repository or run `netlify deploy`.
2. Set Build Command to `npm run build` and Publish Directory to `dist`.

### GitHub Pages
1. In `vite.config.js`, set `base: '/<repository-name>/'` if deploying to a subpath.
2. Build with `npm run build` and publish the `dist/` folder via the `gh-pages` branch.

---

## 🔒 Security & Privacy Notice
* The website runs as a standalone client-side technical documentation portal and does not send recorded audio to untrusted external endpoints.
* In the live backend architecture, raw audio files are discarded in-memory; only 192-dimensional floating-point vectors are stored in compliance with GDPR biometric guidelines.
