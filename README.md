# Student Finance Tracker

A no-framework web app that helps students track daily spending by **description, amount, category and date**. Data is saved in the browser with `localStorage`, with JSON import/export, a regex-powered search and a live dashboard.

- 🔗 **Live site:** https://kabi-j-paul.github.io/finance-tracker/
- 💻 **Repository:** https://github.com/Kabi-J-Paul/finance-tracker

---

## Overview

Student Finance Tracker is a single-page application built with vanilla HTML, CSS and JavaScript (ES modules) and hosted on GitHub Pages. It replaces a paper spending log with a fast, offline-friendly tool. You can add a purchase and see it right away in the table or on the dashboard. You can also search your records with regex and keep an eye on a monthly budget cap. Everything runs client-side, with no backend and no build step.

---

## Chosen Theme

The chosen theme is **personal finance for students** — a lightweight tool to log
daily spending and keep an eye on a monthly budget. Visually, the app uses a calm
**teal-and-gold** palette with a **light and dark mode**, and keeps the interface
minimal so the numbers stay easy to scan.
---

## Features

- **Add / edit / delete** records with inline validation.
- **Duplicate protection:** a record with the same description, amount, category and date as an existing one cannot be saved.
- **Live dashboard:** total records, total spend, top category and budget-cap status.
- **7-day trend chart** of recent spending.
- **Regex search** with safe compiling and highlighted matches.
- **Sorting** by date, description or amount.
- **Budget cap** with live "remaining / over by" feedback.
- **Currency display:** amounts are stored in **RWF** and can be viewed in RWF, USD or EUR.
- **Data tools:** export JSON/CSV, import JSON with validation, reload seed data, clear all.
- **Dark mode** that is remembered across sessions and doesn't flash on load.
- **Category management:** duplicate categories are removed automatically on save.
- **Responsive:** mobile-first, with a card view on small screens and a table on larger ones.
- **Accessible:** landmarks, labels, skip link, visible focus and ARIA live regions.

---

## Setup Guide

ES modules only load over HTTP, so opening `index.html` directly with `file://` won't work.

1. Clone the repository:

```bash
   git clone https://github.com/Kabi-J-Paul/finance-tracker.git
   cd finance-tracker
```

2. Serve it locally:

```bash
   python -m http.server 8000
```

   You can also use the VS Code **Live Server** extension.

3. Open [http://localhost:8000](http://localhost:8000).

On first load the app seeds itself from `seed.json`. After that, your data lives in the browser.

---

## Usage

- **Add:** fill in Description, Amount, Category and Date under **Add / Edit**, then click **Add Record**.
- **Edit:** click **Edit** on a row or card. The submit button changes to **Update**.
- **Delete:** click **Del** and confirm.
- **Search:** type plain text or a regex. Matches are highlighted.
- **Sort:** use the **Sort** dropdown.
- **Settings:** set the budget cap, exchange rates, display currency and categories.

---

## Regex Catalog

| Pattern | Purpose | Example |
|---|---|---|
| `\.\d{2}\b` | Amounts ending in two decimals | Matches `500.99` |
| `(coffee\|tea)` | Either word (alternation) | Matches "coffee" or "tea" |
| `\b(\w+)\s+\1\b` | Repeated word (back-reference) | Matches "tea tea" |
| `^(?=.*[A-Za-z]).+$` | Must contain a letter (lookahead) | Rejects `123` |
| `^(0\|[1-9]\d*)(\.\d{1,2})?$` | Amount: positive, up to 2 decimals | Accepts `12.50` |
| `^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$` | Date in `YYYY-MM-DD` format | Accepts `2025-09-29` |

Search input goes through a safe compiler (`try/catch`). An invalid pattern shows a friendly message instead of breaking the page.

---

## Keyboard Map

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Move focus forward / backward |
| `Enter` on **Skip to content** | Jump straight to the main content |
| `Enter` or `Space` on **Import JSON** | Open the file picker |
| `Enter` in an Add/Edit field | Submit the form |
| `Escape` | Cancel editing and reset the form |
| `Space` | Toggle the **Case-insensitive** checkbox |
| Arrow keys | Change a `<select>` (Sort, Display, Base) |

---

## Accessibility Notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and ordered headings.
- A "Skip to content" link that appears on the first `Tab`.
- Visible `:focus-visible` outlines for keyboard users.
- ARIA live regions for status, error and cap messages (`role="status"` / `role="alert"`).
- `alt` text on the logo, labelled controls, and a `<caption>` on the table.
- Light and dark themes, both with readable contrast.

---

## Testing Instructions

1. Serve the project over HTTP (see [Setup Guide](#setup-guide)).
2. Open `tests/tests.html` in the browser, at [http://localhost:8000/tests/tests.html](http://localhost:8000/tests/tests.html).
3. The page runs **19 assertions** covering:
   - the validators (`checkDesc`, `checkAmount`, `checkDate`, `checkCat`)
   - the regex compiler (`compileRegex`)
   - import validation (`validateImport`)

   A summary in the form "*n* passed, *n* failed" prints at the bottom of the page.

**Manual checks:**

- Add a duplicate record → it is blocked.
- Edit a record without changing anything → it still saves.
- Search `(coffee|tea)` → matches are highlighted.
- Reload the page → data persists.

---

## Project Structure

```
finance-tracker/
├── index.html          # About, Dashboard, Records, Add/Edit, Settings
├── seed.json           # 12 sample RWF records
├── .gitignore
├── README.md
├── tests/
│   └── tests.html      # 19 validator / import assertions
├── assets/
│   └── logo.svg
├── styles/
│   └── main.css
└── scripts/
    ├── state.js        # State + persistence
    ├── storage.js      # localStorage + import validation
    ├── validators.js   # Regex rules
    ├── search.js       # Safe regex compiler, filter, highlight
    ├── ui.js           # Rendering
    └── app.js          # Event wiring
```

---

## Milestones

| Commit | Focus |
|---|---|
| M1 | Spec & wireframes: data model, a11y plan |
| M2 | Semantic HTML & base CSS: mobile-first layout |
| M3 | Forms & regex validation: 4+ rules, error UI, tests |
| M4 | Render, sort & regex search: safe compiler, highlighting |
| M5 | Stats & budget cap: dashboard metrics, ARIA live updates |
| M6 | Persistence & data tools: localStorage, import/export, settings |
| M7 | Polish & accessibility: header/nav, skip link, thousands separators, duplicate & category checks, CSV export |

---

## Author

**Kabi Jean Paul**: [k.kabi@alustudent.com](mailto:k.kabi@alustudent.com)

Front-End Web Development summative project.