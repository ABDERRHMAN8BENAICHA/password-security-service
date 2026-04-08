# 🔐 Password Security Service

A full-stack cybersecurity platform designed to analyze, generate, and protect passwords using modern security practices such as hashing, JWT authentication, and Two-Factor Authentication (2FA).

---

## 🚀 Overview

This project evolved from a simple password checker into a **complete SaaS security platform** with:

* 🔐 Secure authentication system (JWT)
* 🧠 Password strength analysis
* 🔑 Secure password generator
* 📱 Two-Factor Authentication (TOTP)
* 🛡️ Cybersecurity tools & insights
* 🎨 Modern dashboard UI

---

## 🏗️ Tech Stack

### Backend

* 🐍 Python
* ⚡ FastAPI
* 🗄️ SQLAlchemy
* 🔐 Bcrypt (Password Hashing)
* 🔑 JWT (Authentication)
* 📱 PyOTP (2FA)

### Frontend

* 🌐 HTML, CSS, JavaScript
* 🎨 Custom Dark UI Dashboard
* 📊 Chart.js (Statistics)

---

## 🔐 Features

### 1. Authentication System

* User registration & login
* Password hashing using Bcrypt
* JWT-based authentication
* Secure API access

---

### 2. Password Analyzer

* Strength scoring system
* Real-time feedback
* Complexity checks
* Security recommendations

---

### 3. Password Generator

* Secure random password generation
* Customizable length & characters
* One-click copy

---

### 4. Two-Factor Authentication (2FA)

* QR Code setup
* Google Authenticator integration
* Secure TOTP verification
* Per-user secret storage

---

### 5. Advanced Security Tools

* 🔍 Breach Checker (leaked passwords)
* ⏱ Time-to-Crack estimation
* 🧠 Live password validation
* 🗂 Local password vault
* 📊 Global password statistics

---

## 🎨 UI & UX

* Modern **dark dashboard design**
* Sidebar navigation
* Responsive (mobile + desktop)
* Glassmorphism effects
* Professional icon system (Phosphor Icons)

---

## 📦 Installation

### 1. Clone the project

```bash
git clone https://github.com/your-username/password-security-service.git
cd password-security-service
```

---

### 2. Install dependencies

```bash
pip install fastapi uvicorn sqlalchemy pyotp passlib[bcrypt] PyJWT qrcode
```

---

### 3. Run backend

```bash
uvicorn main:app --reload
```

Server will run on:

```
http://127.0.0.1:8000
```

---

### 4. Run frontend

* Open `frontend/index.html`
* Use **Live Server** in VS Code

---

## 📂 Project Structure

```
password-security-service/
│
├── app/
│   ├── api/
│   ├── application/
│   ├── domain/
│   ├── infrastructure/
│   └── security/
│
├── frontend/
│   ├── index.html
│   ├── analyzer.html
│   ├── generator.html
│   ├── twofa.html
│   ├── style.css
│   └── script.js
│
├── main.py
├── requirements.txt
└── README.md
```

---

## 🔐 Security Practices

* Passwords are **hashed (never stored in plain text)**
* JWT authentication for secure sessions
* 2FA using TOTP standard
* API validation and structured architecture

---

## 🌐 Future Improvements

* 🧠 AI password advisor
* 🌍 Deployment (Render / Netlify)
* 🗄️ PostgreSQL integration
* 📊 Advanced analytics dashboard
* 🔐 Rate limiting & API protection

---

## 👨‍💻 Author

**Islam and abdelrahmene**
IoT Student & Cybersecurity Enthusiast 🔥

---

## ⭐ Project Status

✔ Full-stack working
✔ Production-ready structure
✔ Cybersecurity-focused
✔ Ready for deployment

---

## 💬 Final Note

This project is not just a tool — it’s a **complete security platform** demonstrating real-world backend architecture, frontend integration, and modern cybersecurity practices.
