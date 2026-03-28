## Poker Nights Dashboard

A single-page React dashboard that visualizes the performance of 10 poker players across multiple games.  
It uses **Vite**, **styled-components**, and **Recharts** to show standings, totals, and several interactive charts.

### Tech stack

- **React 18** (Vite)
- **styled-components** for styling
- **Recharts** for charts (bar, donut, line, area)

### Domain rules

- Each game gives:
  - 4 points to the **winner**
  - 2 points to **second**
  - 1 point to **third**
  - 0 points to other **present** players
  - `x` for **absent** players
- The app uses a **static array** (`src/data/games.js`) containing all game results.

### Getting started (local)

From the project folder:

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (by default `http://localhost:5173`).

To preview a **production** build locally (same asset paths as GitHub Pages):

```bash
npm run build
npm run preview
```

---

## Deploy to GitHub Pages

Code lives on **`main`**. The **`npm run deploy`** script builds the app and publishes **`dist`** to the **`gh-pages`** branch (via the **`gh-pages`** package).

### 1. Base path

In **`vite.config.js`**, set **`GITHUB_PAGES_BASE`** to `/<your-repo-name>/` (default **`/fun-activity-nights/`**). It must match the repository name in the URL  
`https://YOUR_USERNAME.github.io/<repo-name>/`.

### 2. Deploy from your machine

```bash
npm install
npm run deploy
```

Use Git credentials that can push to the repo. If **`spawn ENAMETOOLONG`** appears on **Windows**, try **WSL**, **Git Bash**, or a **shorter folder path** (e.g. `C:\dev\fun-activity-nights`).

### 3. GitHub Pages settings

**Settings** → **Pages** → **Source**: **Deploy from a branch** → **`gh-pages`** → **`/ (root)`** → Save.

### 4. Site URL

```text
https://YOUR_USERNAME.github.io/fun-activity-nights/
```

### 5. After you change the app

Commit and push to **`main`**, then run **`npm run deploy`** again.

### Troubleshooting

| Problem | What to check |
|--------|----------------|
| **Blank page** | Wrong **`GITHUB_PAGES_BASE`** in **`vite.config.js`**; rebuild and **`npm run deploy`**. |
| **`spawn ENAMETOOLONG`** | Common on Windows with **`gh-pages`**; WSL, shorter path, or your usual deploy method. |
| **Push / auth errors** | Remote URL and GitHub login (**`gh auth login`**, PAT, or SSH). |

---

### Project structure

- `package.json` – scripts including **`deploy`** (`gh-pages`)
- `vite.config.js` – Vite + React config; **`GITHUB_PAGES_BASE`** for GitHub Pages
- `index.html` – root HTML shell
- `src/main.jsx` – React entry point
- `src/styles/GlobalStyle.js` – global theming with styled-components
- `src/data/games.js` – static players and game points
- `src/App.jsx` – main dashboard layout, standings table, and charts

### Customization ideas

- Add more games or adjust points in `src/data/games.js`.
- Change colors or typography in `src/styles/GlobalStyle.js` or `PLAYER_COLORS` in `src/App.jsx`.
- Add filters by date range or show per-player detail modals.
