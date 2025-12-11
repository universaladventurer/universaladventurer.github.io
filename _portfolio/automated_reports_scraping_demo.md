---
title: "Automated Reports Scraping Demo"
excerpt: "A scalable system for scraping, parsing, and structuring online reports for research pipelines.<br/><img src='/images/thumbnail_scraping_demo.png'>"
collection: portfolio
tags:
  - Web Scraping
  - Python
  - Automation
  - Data Engineering
  - Selenium
  - Research Pipelines
---

## 🎥 Video Demo

<video width="100%" controls>
  <source src="{{ '/files/videos/reports_scrape_demo.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>

---

## 📌 Overview

This project demonstrates a **high-volume automated scraping system** designed to retrieve corporate governance reports from the Japan Exchange Group (JPX/TSE) website. The system extracts metadata, downloads both English and Japanese documents, and exports clean structured datasets for downstream research analysis.

The system integrates **browser automation**, **structured parsing**, **retry logic**, and **data normalization**, forming the backend of a scalable research pipeline for academic finance research.

---

## 🧠 Skills Demonstrated

- Dynamic web automation with JavaScript-rendered pages  
- Data extraction from complex DOM structures  
- Automatic pagination, file downloading, and session handling  
- Robust error handling & exponential backoff retry logic  
- Bilingual data processing (English & Japanese documents)  
- Data normalization + structured dataset construction  
- Modular, production-ready scraper design  

---

## 🛠 Technologies Used

- **Python** — Core scripting language  
- **DrissionPage** — Hybrid browser automation (combines Selenium-like control with requests efficiency)  
- **Requests** — HTTP library for direct file downloads  
- **Pandas** — Data manipulation and Excel I/O  
- **XPath Selectors** — Precise DOM element targeting  
- **CSV** — Intermediate data storage  

---

## 🧱 System Architecture

The scraper is organized into a **modular pipeline**, allowing reliable execution across thousands of documents:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        INPUT LAYER                                  │
│  ┌─────────────────┐                                                │
│  │  make_up.xlsx   │  Company list with Securities Codes           │
│  └────────┬────────┘                                                │
└───────────┼─────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BROWSER AUTOMATION LAYER                         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  DrissionPage WebPage Controller                             │   │
│  │  • Navigate to JPX search portal                             │   │
│  │  • Input securities code & trigger search                    │   │
│  │  • Click through to Basic Information → Corporate Governance │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     DATA EXTRACTION LAYER                           │
│  ┌──────────────────────┐    ┌──────────────────────┐              │
│  │  English Documents   │    │  Japanese Documents  │              │
│  │  • Parse table rows  │    │  • Parse table rows  │              │
│  │  • Extract dates     │    │  • Extract dates     │              │
│  │  • Get PDF links     │    │  • Get PDF/HTML links│              │
│  └──────────┬───────────┘    └──────────┬───────────┘              │
└─────────────┼───────────────────────────┼───────────────────────────┘
              │                           │
              ▼                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      DOWNLOAD LAYER                                 │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  Retry-Enabled HTTP Downloader (spider1)                    │   │
│  │  • Exponential backoff: 0s → 3s → 6s → 9s → 12s            │   │
│  │  • Custom headers & cookies for session persistence         │   │
│  │  • 20-second timeout per request                            │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       OUTPUT LAYER                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────────────┐   │
│  │  files/       │  │  Data_1.xlsx  │  │  Problematic_Data.csv │   │
│  │  (PDF/HTML)   │  │  (Metadata)   │  │  (Failed codes)       │   │
│  └───────────────┘  └───────────────┘  └───────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔑 Key Implementation Details

### 1. Robust Retry Logic with Exponential Backoff

Network requests can fail due to rate limiting, timeouts, or temporary server issues. The system implements a retry mechanism that progressively increases wait times:

```python
def spider1(link):
    t = 0
    while True:
        if t == 15:
            return ''  # Give up after ~5 attempts
        time.sleep(t)
        try:
            response = requests.get(link, cookies=cookies, 
                                    timeout=20, headers=headers)
            return response
        except:
            t += 3  # Exponential backoff
            continue
```

### 2. Multi-Stage Navigation with Fault Tolerance

The scraper navigates through multiple dynamic pages. Each critical step includes retry logic to handle page load delays:

```python
# Retry wrapper for clicking dynamic elements
attempt = 0
while True:
    attempt += 1
    if attempt == 5:
        flag = True  # Mark as problematic
        break
    try:
        time.sleep(0.5)
        page('x://input[@value="Basic information"]', timeout=1).click()
        # ... additional navigation
        break
    except:
        continue
```

### 3. Bilingual Document Handling

The system processes both English and Japanese corporate governance documents with different table structures:

- **English documents**: Single table with date and PDF link columns
- **Japanese documents**: Extended table with HTML and PDF format options, prioritizing PDF when available

### 4. Structured Output Schema

Each downloaded document is cataloged with comprehensive metadata:

| Field | Description |
|-------|-------------|
| `Securities_Code` | TSE security identifier |
| `Company_Name` | Official company name |
| `ISIN_Code` | International Securities ID |
| `Market_Segment` | Exchange listing segment |
| `Date_Available_Public_Inspection` | Document publication date |
| `Reports_Language` | English or Japanese |
| `Reports_Type` | PDF or HTML |
| `English_Reports_Heading` | Filename for English docs |
| `Japanese_Reports_Heading` | Filename for Japanese docs |
| `Source_URL` | HTML source link |
| `PDF_URL` | Direct PDF download link |

---

## 📊 Performance & Scale

- **Throughput**: Processes ~100-200 companies per hour (rate-limited for stability)
- **Error Handling**: Failed securities codes logged separately for manual review
- **Deduplication**: Final output automatically removes duplicate entries
- **File Naming**: Systematic convention `{Code}_{Date}_{Lang}_{Seq}.{ext}` ensures traceability

---

## 🎯 Research Application

This scraper was developed to support academic research on **Japanese corporate governance**. The structured dataset enables:

- Longitudinal analysis of governance disclosure practices
- Cross-sectional comparison across market segments
- NLP analysis of governance report content (English and Japanese)
- Tracking of governance policy adoption over time

---

## 📁 Output Files

| File | Purpose |
|------|---------|
| `files/` | Downloaded PDF and HTML governance reports |
| `Data_1.xlsx` | Master metadata spreadsheet |
| `Problematic_Data_1.csv` | Securities codes that failed processing |

