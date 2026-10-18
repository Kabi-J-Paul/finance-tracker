# M1 — Spec & Wireframes

**Project:** Student Finance Tracker
**Author:** Kabi Jean Paul
**Theme:** Personal finance for students

---

## 1. Goal

A no-framework, single-page web app that helps a student log daily spending and
see where the money goes. It runs entirely in the browser with `localStorage`,
has a regex-powered search, a live dashboard with a budget cap, and JSON
import/export. Built with vanilla HTML, CSS and JavaScript (ES modules).

---

## 2. Scope

**In scope**
- Add, edit and delete spending records.
- Inline validation with clear error messages.
- Regex search with safe compiling and highlighted matches.
- Sorting by date, description or amount.
- Live dashboard: total records, total spend, top category, budget cap, 7-day trend.
- Budget cap with live "remaining / over by" feedback.
- Currency display (stored in RWF; view in RWF, USD or EUR).
- JSON/CSV export, JSON import with validation, reload seed, clear all.
- Light and dark themes, remembered across sessions.
- Responsive layout (mobile-first).

**Out of scope**
- No backend, accounts or sync.
- No build step or frameworks.
- No real currency conversion API (rates are user-set and stored locally).

---

## 3. Data model

A record is a plain object. The list is an array of records.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Unique, generated (e.g. `rec_0001`). |
| `description` | string | yes | 3+ chars, contains a letter, no doubled word. |
| `amount` | number | yes | Greater than 0, max 1,000,000,000, up to 2 decimals. |
| `category` | string | yes | Letters, spaces and hyphens only. |
| `date` | string | yes | `YYYY-MM-DD`, must be a real calendar date. |
| `createdAt` | string | no | ISO timestamp set on creation. |
| `updatedAt` | string | no | ISO timestamp set on each edit. |

**Settings** (stored separately in `localStorage`):

| Field | Type | Notes |
|---|---|---|
| `cap` | number | Monthly budget cap. |
| `usd` | number | RWF → USD rate. |
| `eur` | number | RWF → EUR rate. |
| `base` | string | Display currency: `RWF`, `USD` or `EUR`. |
| `cats` | string[] | Saved category list (duplicates removed). |
| `theme` | string | `light` or `dark`. |

---

## 4. Validation rules

| Field | Rule | Message |
|---|---|---|
| Description | No leading/trailing spaces | "No leading/trailing spaces." |
| Description | At least 3 characters | "At least 3 chars." |
| Description | Must contain a letter | "Must contain letters." |
| Description | No doubled word (`\b(\w+)\s+\1\b`) | "Duplicate word" |
| Amount | Digits, optional 1–2 decimals | "Enter Digits Only with NO commas(,)" |
| Amount | Greater than 0 | "Amount must be over 0." |
| Amount | Most 1,000,000,000 | "Maximum amount is 1 Billion." |
| Date | `YYYY-MM-DD` | "Use YYYY-MM-DD format" |
| Date | Real calendar date (rejects `2025-02-30`) | "Invalid date" |
| Category | Letters, spaces, hyphens only | "Letters/spaces/hyphens only" |
| Whole record | No duplicate of an existing record | "This record already exists." |

---

## 5. Wireframes

### Desktop

```
+--------------------------------------------------------------+
|  [logo] Student Finance Tracker        [Header]              |
|  About | Dashboard | Records | Add/Edit | Settings   [nav]    |
+--------------------------------------------------------------+
|  About: short intro + how to use                             |
+--------------------------------------------------------------+
|  Dashboard                                                    |
|  +--------+ +--------+ +--------+ +--------+                 |
|  | Records| |  Spend | |  Top   | |  Cap   |                 |
|  |   12   | | 46,500 | |  Food  | | 3,500  |                 |
|  +--------+ +--------+ +--------+ +--------+                 |
|  Last 7 days:  [bar][bar][bar][bar][bar][bar][bar]           |
+--------------------------------------------------------------+
|  Records                                                      |
|  Search: [___________________] [x] Case-insensitive          |
|  Sort:   [Date newest v]            3 records                |
|  +--------------------------------------------------------+ |
|  | Description      | Amount | Category | Date     | Act  | |
|  | Lunch at cafe    |  3,500 | Food     | 2026-..  | E D  | |
|  +--------------------------------------------------------+ |
+--------------------------------------------------------------+
|  Add / Edit                                                   |
|  Description [______]  Amount [______]                       |
|  Category    [______]  Date   [______]                       |
|  [ Add Record ]                                              |
+--------------------------------------------------------------+
|  Settings                                                    |
|  Budget cap [____]  USD rate [____]  EUR rate [____]         |
|  Display [RWF v]  Categories [______] [Add]                  |
|  [Export JSON] [Export CSV] [Import JSON] [Seed] [Clear All] |
|  Theme [Light/Dark]                                          |
+--------------------------------------------------------------+
|  Footer                                                       |
+--------------------------------------------------------------+
```

### Mobile (single column, card view)

```
+------------------------+
| [logo]   [nav]         |
| Search [_______]       |
| Sort   [Date  v]       |
| +--------------------+ |
| | Lunch at cafe      | |
| | 3,500 RWF  Food    | |
| | 2026-10-18         | |
| | [Edit] [Del]       | |
| +--------------------+ |
| +--------------------+ |
| | ...                | |
+------------------------+
```

---

## 6. Accessibility plan (WCAG-minded)

- **Landmarks:** `header`, `nav`, `main`, `section`s and `footer`; headings in order.
- **Skip link:** "Skip to content" visible on the first `Tab`.
- **Focus:** visible `:focus-visible` outline on every control; logical tab order.
- **Labels:** every input has a `<label>`; the table has a `<caption>`.
- **Images:** `alt` text on the logo.
- **Live regions:** `role="status"` / `role="alert"` for status, errors and cap messages.
- **Keyboard:** `Escape` cancels editing; `Enter` submits; native `<select>` controls.
- **Zoom:** layout reflows without horizontal scrolling.
- **Contrast:** both themes meet readable contrast; colour is never the only signal.
- **No flash:** theme is applied before paint so there is no flash on load.

---

## 7. Regex catalog

| Pattern | Purpose |
|---|---|
| `\.\d{2}\b` | Amounts ending in two decimals |
| `(coffee\|tea)` | Either word (alternation) |
| `\b(\w+)\s+\1\b` | Repeated word (back-reference) |
| `^(?=.*[A-Za-z]).+$` | Must contain a letter (lookahead) |
| `^(0\|[1-9]\d*)(\.\d{1,2})?$` | Positive amount, up to 2 decimals |
| `^\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])$` | Date in `YYYY-MM-DD` |

Search input goes through a safe compiler (`try/catch`) so an invalid pattern
shows a friendly message instead of breaking the page.

---

## 8. Milestone plan

| Milestone | Focus |
|---|---|
| M1 | Spec & wireframes: data model, a11y plan (this document) |
| M2 | Semantic HTML & base CSS: mobile-first layout |
| M3 | Forms & regex validation: 4+ rules, error UI, tests |
| M4 | Render, sort & regex search: safe compiler, highlighting |
| M5 | Stats & budget cap: dashboard metrics, ARIA live updates |
| M6 | Persistence & data tools: localStorage, import/export, settings |
| M7 | Polish & accessibility: nav, skip link, separators, CSV, duplicate & category checks |