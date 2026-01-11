const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");
const Epub = require("epub-gen");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/convert", async (req, res) => {
  const { url, pageSize, orientation, format = "pdf" } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  let browser;

  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    /* PDF */
    if (format === "pdf") {
      const pdfBuffer = await page.pdf({
        format: pageSize || "A4",
        landscape: orientation === "landscape",
        printBackground: true
      });

      await browser.close();

      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=output.pdf"
      });

      return res.send(pdfBuffer);
    }

    /*EPUB*/
    if (format === "epub") {
  const textContent = await page.evaluate(() => {
    return document.body.innerText;
  });

  await browser.close();

  const cleanText = textContent
    .split("\n")
    .filter(line => line.trim().length > 0)
    .map(line => `<p>${line}</p>`)
    .join("\n");

  const filePath = "output.epub";

  const epub = new Epub(
    {
      title: "Converted Webpage",
      author: "URL to PDF Converter",
      content: [
        {
          title: "Main Content",
          data: `
            <html>
              <head><meta charset="utf-8"></head>
              <body>${cleanText}</body>
            </html>
          `
        }
      ]
    },
    filePath
  );

  await epub.promise;

  const epubBuffer = fs.readFileSync(filePath);
  fs.unlinkSync(filePath);

  res.set({
    "Content-Type": "application/epub+zip",
    "Content-Disposition": "attachment; filename=output.epub"
  });

  return res.send(epubBuffer);
}


    res.status(400).json({ error: "Invalid format" });

  } catch (err) {
    console.error("Conversion error:", err);
    if (browser) await browser.close();
    res.status(500).json({ error: "Failed to convert URL" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});




