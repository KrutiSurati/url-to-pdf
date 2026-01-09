# 📄 URL to PDF Chrome Extension

A clean, minimal Chrome/Brave extension that converts any public webpage into a downloadable **PDF** using a local **Node.js + Puppeteer** backend.

This project focuses on **clarity, real-world constraints, and good UX**, rather than unnecessary feature bloat.

---

## ✨ Features

* 🔗 **Convert any webpage URL to PDF**
* 🧠 **Automatically detects the current browser tab URL**
* 📝 **Downloads PDF using the page title as filename** (sanitized)
* 📐 **Configurable PDF options**

  * Page Size: A4 / Letter
  * Orientation: Portrait / Landscape
* ⏳ **Loading state & disabled button during conversion**
* 🎨 **Clean, pastel UI with automatic dark mode support**
* ⚠️ **Input validation for invalid URLs**

---

## 🏗️ Architecture Overview

```
Chrome Extension (Frontend)
        │
        │ HTTP POST (URL + options)
        ▼
Node.js Backend (Express)
        │
        ▼
Puppeteer (Headless Chromium)
        │
        ▼
Generated PDF → Downloaded to user
```

### Why a Backend?

Chrome extensions **cannot reliably run Puppeteer / Chromium** due to sandboxing, binary size, and security restrictions.

To solve this cleanly, the extension communicates with a **local Node.js backend** that handles:

* Page rendering
* PDF generation
* File streaming

This separation keeps the extension lightweight and secure.

---

## 🛠 Tech Stack

**Frontend (Extension)**

* HTML
* CSS (pastel, dark-mode aware UI)
* JavaScript (Chrome Extension APIs)

**Backend**

* Node.js
* Express.js
* Puppeteer

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd url-to-pdf
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend will start at:

```
http://localhost:3000
```

---

### 3️⃣ Load the Extension

1. Open Chrome / Brave
2. Go to `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the extension folder

---

## 📸 Screenshots

> (Add 2–3 screenshots here)

* Extension popup UI
* Options selection
* PDF download result

---

## ⚠️ Known Limitations

* Only **public, accessible webpages** can be converted
* Pages requiring login/authentication may not render correctly
* Some websites block headless browsers
* Backend must be running locally for the extension to work

These limitations are inherent to browser security and Puppeteer-based rendering.

---

## 🔐 Privacy & Security

* No user data is stored
* No browsing history is logged
* URLs are sent **only to a local backend**
* No cookies, credentials, or page content are persisted

---

## 🎯 Use Cases

* Students saving articles for offline study
* Developers exporting documentation pages
* Researchers archiving web content
* Anyone needing clean PDFs from webpages

---

## 🔮 Future Scope

* Cloud-hosted backend
* Batch URL conversion
* Margin & scale controls
* Header/footer with page numbers
* Support for authenticated pages (session-based)

---

## 📌 Design Philosophy

This project is **intentionally kept minimal** to prioritize:

* Stability
* Maintainability
* Clear architecture
* Real-world usability

---

## 🧑‍💻 Author

**Kruti Surati**

---

## ⭐ Acknowledgements

* Puppeteer documentation
* Chrome Extensions API

---

> *This project demonstrates practical full-stack development, thoughtful UX decisions, and an understanding of real-world browser constraints.*
