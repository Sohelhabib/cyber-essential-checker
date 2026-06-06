# CyberMark 🛡️
### Cyber Essentials Readiness Checker for UK SMEs

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-v24+-green.svg)
![React](https://img.shields.io/badge/react-v18+-61DAFB.svg)
![Status](https://img.shields.io/badge/status-live-brightgreen.svg)

**CyberMark** is a free Cyber Essentials readiness assessment tool built for UK small and medium-sized businesses. Answer 45 questions in 10 minutes and get an instant compliance score showing exactly where your business stands — and what to fix before certification.

🔗 **Live at:** [cybermark-olive.vercel.app](https://cybermark-olive.vercel.app)

---

## 📸 Screenshots

| Landing Page | Assessment | Results |
|---|---|---|
| ![Landing](https://via.placeholder.com/250x150/0a0f1e/0ea5e9?text=Landing) | ![Assessment](https://via.placeholder.com/250x150/0a0f1e/0ea5e9?text=Assessment) | ![Results](https://via.placeholder.com/250x150/0a0f1e/0ea5e9?text=Results) |

---

## ✨ Features

- ✅ **45 questions** covering all 5 official Cyber Essentials controls
- ✅ **Instant readiness score** out of 100
- ✅ **Control breakdown** — score per control area
- ✅ **Gap analysis** — critical, medium, and low severity gaps identified
- ✅ **Remediation guidance** — plain English advice for every gap
- ✅ **No account needed** — just enter your email and start
- ✅ **Mobile responsive** — works on all devices
- ✅ **NCSC aligned** — based on the official Cyber Essentials framework

---

## 🛡️ The 5 Cyber Essentials Controls Covered

1. **Firewalls** — boundary protection and network security
2. **Secure Configuration** — default passwords, unnecessary software, admin access
3. **Security Update Management** — patching within 14 days, EOL software
4. **User Access Control** — MFA, least privilege, account management
5. **Malware Protection** — antivirus, web filtering, email scanning

---

## 🏗️ Tech Stack

### Frontend
- React 18 + Vite
- React Router DOM
- Axios
- Deployed on **Vercel**

### Backend
- Node.js + Express
- MongoDB + Mongoose
- CORS + dotenv
- Deployed on **Render**

### Database
- MongoDB Atlas (free tier)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v22+
- MongoDB Atlas account (free)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Sohelhabib/cyber-essential-checker.git
cd cyber-essential-checker
```

**2. Set up the frontend**
```bash
cd client
npm install
npm install react-router-dom axios
```

**3. Set up the backend**
```bash
cd ../server
npm install
```

**4. Configure environment variables**

Create a `.env` file in the `server` folder:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/cyberessentials
PORT=4000
CLIENT_URL=http://localhost:5173
```

**5. Run the app**

Open two terminals:

Terminal 1 — Frontend:
```bash
cd client
npm run dev
```

Terminal 2 — Backend:
```bash
cd server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
cyber-essential-checker/
├── client/                   # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx   # Email gate + hero page
│   │   │   ├── Assessment.jsx # 45-question quiz
│   │   │   └── Results.jsx   # Score + gap analysis
│   │   ├── components/
│   │   │   ├── QuestionCard.jsx
│   │   │   └── ScoreGauge.jsx
│   │   └── data/
│   │       └── questions.js  # All 45 CE questions
│   └── public/
└── server/                   # Node.js backend
    ├── routes/
    │   ├── assess.js         # Assessment scoring route
    │   └── stripe.js         # Payments (coming soon)
    ├── models/
    │   └── Assessment.js     # MongoDB schema
    ├── utils/
    │   └── scorer.js         # Scoring algorithm
    └── index.js              # Express entry point
```

---

## 🌐 Deployment

### Frontend — Vercel
1. Connect GitHub repo to Vercel
2. Set Root Directory to `client`
3. Deploy

### Backend — Render
1. Connect GitHub repo to Render
2. Set Root Directory to `server`
3. Add environment variables
4. Set Build Command: `npm install`
5. Set Start Command: `node index.js`

---

## 🗺️ Roadmap

- [x] Free assessment with instant scoring
- [x] Gap analysis with severity levels
- [x] Mobile responsive design
- [ ] PDF report export
- [ ] Stripe / Lemon Squeezy payments (£9/month)
- [ ] User accounts and saved assessments
- [ ] Progress tracking over time
- [ ] ISO 27001 readiness checker
- [ ] GDPR compliance checker
- [ ] White-label for MSPs

---

## 💰 Business Model

| Tier | Price | Features |
|------|-------|----------|
| Free | £0 | Full assessment, overall score, 3 critical gaps |
| Pro | £9/month | Full gap report, remediation checklist, PDF export |
| Business | £29/month | Unlimited users, progress tracking, priority support |

---

## 👨‍💻 About the Builder

Built by **Md Sohel Habib** — MSc Technology Management with Cybersecurity student at BPP University, London.

- 🔗 [LinkedIn](https://linkedin.com/in/md-sohel-habib)
- 🌐 [cybermark-olive.vercel.app](https://cybermark-olive.vercel.app)
- 📧 mdsohelhabib@gmail.com

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome. Feel free to open an issue or submit a pull request.

---

⭐ **If you find this useful, please give it a star on GitHub — it helps more UK businesses find the tool!**
