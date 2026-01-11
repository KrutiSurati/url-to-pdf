# 📄 URL to PDF & EPUB Chrome Extension

A clean, minimal Chrome extension that converts any public webpage into a downloadable **PDF or EPUB** using a local **Node.js + Puppeteer** backend.

This project focuses on **clarity, real-world constraints, and good UX**, focusing on reliable document generation rather than fragile feature bloat.

---

##  Features

*  **Convert any webpage URL to PDF**
*  **Convert any webpage URL to EPUB (text-focused)**
*  **Automatically detects the current browser tab URL**
*  **Downloads files using the page title as filename** (sanitized)
*  **Configurable PDF options**

##  Configurable Options (PDF)
- Page Size: A4 / Letter
- Orientation: Portrait / Landscape
- Print background support

##  User Experience
- Clean, minimal UI
- Automatic dark-mode support
- Loading state & disabled button during conversion
- Input validation for invalid URLs

---

##  Architecture Overview

```
Chrome Extension (Frontend)
        │
        │ HTTP POST (URL + options + format)
        ▼
Node.js Backend (Express)
        │
        | 
        ▼
Puppeteer (Headless Chromium)
        |
        |
EPUB generator- Text based EPUB
        │
        ▼
Generated file → Downloaded to user
```

### Why a Backend?

Chrome extensions **cannot reliably run Puppeteer / Chromium** due to sandboxing, binary size, and security restrictions.

To solve this cleanly, the extension communicates with a **local Node.js backend** that handles:

* Page rendering
* PDF generation
* File streaming

This separation keeps the extension lightweight and secure.

---

## 📚 EPUB Design Decision

EPUB conversion focuses on **clean, distraction-free reading** by extracting **textual content only**.

Images are intentionally excluded to ensure:
- Better compatibility across websites
- Stability with dynamic or lazy-loaded content
- Avoidance of broken relative asset paths

This mirrors real-world tools like Instapaper and Pocket.

---


##  Tech Stack

**Frontend (Extension)**

* HTML
* CSS ( dark-mode aware UI)
* JavaScript (Chrome Extension APIs)

**Backend**

* Node.js
* Express.js
* Puppeteer
* EPUB generation utilities


---

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/KrutiSurati/url-to-pdf
cd url-to-pdf
```

---

### 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend will start at:
http://localhost:3000

---

### 3. Load the Extension
```
1. Open Chrome
2. Go to chrome://extensions
3. Enable Developer mode
4. Click Load unpacked
5. Select the extension folder

```
## Demo Video
Demo video link - https://drive.google.com/file/d/1MLmSI64HHvBQThvFdeuBt3OgV07PCDWP/view?usp=drivesdk


##  Privacy & Security

* No user data is stored
* No browsing history is logged
* URLs are sent **only to a local backend**
* No cookies, credentials, or page content are persisted

---

##  Use Cases

* Students saving articles for offline study
* Developers exporting documentation pages
* Researchers archiving web content
* Readers creating distraction-free EPUBs
* Anyone needing clean PDFs from webpages

---

##  Future Scope

* Cloud-hosted backend
* Image-embedded EPUB support
* Batch URL conversion
* Margin & scale controls
* Header/footer with page numbers
* Support for authenticated pages (session-based)

---

##  Design Philosophy

* Stability
* Maintainability
* Clear architecture
* Real-world usability

---

##  Author

**Kruti Surati**


> *This project demonstrates practical full-stack development, thoughtful UX decisions, and an understanding of real-world browser constraints.*
