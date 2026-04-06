#!/usr/bin/env node
/**
 * export-pdf.js
 * Exports the site as a portfolio PDF using Puppeteer.
 *
 * Usage:
 *   node scripts/export-pdf.js [--url http://localhost:8080] [--out portfolio.pdf]
 *
 * Default base URL is the live site. Pass --url for local dev server.
 */

const puppeteer = require("puppeteer");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

// ── Config ────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag, def) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : def;
};

const BASE_URL = getArg("--url", "https://forminju.github.io");
const OUT_FILE = getArg("--out", "assets/pdf/MinJu_Jeon_Portfolio.pdf");

const PAGES = [
  { path: "/", label: "About" },
  { path: "/publications/", label: "Publications" },
  { path: "/projects/", label: "Projects" },
  { path: "/cv/", label: "CV" },
];

// ── Print CSS injected into every page ────────────────────────────────────────
const PRINT_CSS = `
  /* Hide interactive elements */
  .navbar, #light-toggle, #search-toggle, footer, .back-to-top,
  #rabbit-mascot, .social-rabbit, .profile-rabbit {
    display: none !important;
  }

  /* Remove scroll animations so content is fully visible */
  .fade-in {
    opacity: 1 !important;
    transform: none !important;
  }

  body {
    padding-top: 0 !important;
    margin-top: 0 !important;
  }

  .container, .container-fluid {
    max-width: 900px;
    margin: 0 auto;
  }

  /* Ensure images render */
  img {
    max-width: 100% !important;
  }

  a {
    color: inherit !important;
    text-decoration: none !important;
  }
`;

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  console.log(`\n📄 Exporting portfolio PDF from ${BASE_URL}\n`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const pagePdfs = [];

  for (const { path: pagePath, label } of PAGES) {
    const url = BASE_URL + pagePath;
    console.log(`  → Capturing: ${label} (${url})`);

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    } catch (e) {
      console.warn(`    ⚠ Timeout or error loading ${url}, using partial render`);
    }

    // Wait for fonts & images
    await page.evaluate(() => document.fonts.ready);
    await new Promise((r) => setTimeout(r, 800));

    // Inject print styles & trigger fade-in
    await page.addStyleTag({ content: PRINT_CSS });
    await page.evaluate(() => {
      document.querySelectorAll(".fade-in").forEach((el) => {
        el.classList.add("fade-in--visible");
      });
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
      displayHeaderFooter: true,
      headerTemplate: `<div style="font-size:9px;color:#aaa;width:100%;text-align:right;padding-right:20mm">${label}</div>`,
      footerTemplate: `<div style="font-size:9px;color:#aaa;width:100%;text-align:center"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
    });

    pagePdfs.push(pdfBuffer);
    await page.close();
    console.log(`    ✓ Done`);
  }

  await browser.close();

  // ── Merge all page PDFs into one ──────────────────────────────────────────
  console.log("\n  → Merging pages...");
  const merged = await PDFDocument.create();

  for (const buf of pagePdfs) {
    const doc = await PDFDocument.load(buf);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    pages.forEach((p) => merged.addPage(p));
  }

  const mergedBytes = await merged.save();
  const outPath = path.resolve(OUT_FILE);
  fs.writeFileSync(outPath, mergedBytes);

  console.log(`\n✅ Saved: ${outPath}\n`);
})();
