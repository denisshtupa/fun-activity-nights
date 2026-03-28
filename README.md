## Poker Nights Dashboard

A single-page React dashboard that visualizes the performance of 10 poker players across multiple games.  
It uses **Vite**, **styled-components**, and **Recharts** to show standings, totals, and several interactive charts.

### Tech stack

- **React 18** (Vite)
- **styled-components** for styling
- **Recharts** for charts (bar, donut, line, area)

### Domain rules

- Players: Antonio, Amiklat, Ardit, Arber, Ervir, Elvis, Duli, Denis, Landi, Gesti.
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

## Deploy to GitHub Pages (step by step)

Your **source code** stays on **`main`**. The recommended approach is **GitHub Actions**: every push to **`main`** builds the site on GitHub’s servers and publishes it. That avoids Windows issues with the local **`gh-pages`** tool (see below).

### Before you start

1. A **GitHub repository** for this project (for example `https://github.com/YOUR_USERNAME/fun-activity-nights`).
2. **`vite.config.js`** → **`GITHUB_PAGES_BASE`** must be `/<repository-name>/` (default is `/fun-activity-nights/`). If your repo name differs, change it and commit.

---

### Recommended: deploy with GitHub Actions

#### Step 1 — Add the workflow (already in this repo)

The file **`.github/workflows/deploy-github-pages.yml`** runs on every push to **`main`** (and can be run manually under **Actions** → **Deploy to GitHub Pages** → **Run workflow**).

Commit and push it if you have not yet:

```bash
git add .github/workflows/deploy-github-pages.yml
git commit -m "Add GitHub Pages deploy workflow"
git push origin main
```

#### Step 2 — Enable GitHub Pages (Actions as source)

1. On GitHub, open the repository.
2. **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions** (not “Deploy from a branch”).
4. Save if prompted. The first workflow run may ask you to approve the **`github-pages`** environment once.

#### Step 3 — Wait for the workflow

1. Open the **Actions** tab and open the latest **Deploy to GitHub Pages** run.
2. When both **build** and **deploy** are green, the site is live (often within **1–2 minutes**).

#### Step 4 — Open the site

```text
https://YOUR_USERNAME.github.io/fun-activity-nights/
```

Use your GitHub username and your real repo name in the path.

#### Updating the site

Push any change to **`main`**; the workflow deploys again automatically. You can also trigger **Run workflow** from the Actions tab.

---

### Optional: local `npm run deploy` (macOS / Linux, or WSL)

```bash
npm install
npm run deploy
```

That runs **`vite build`** and pushes **`dist`** to the **`gh-pages`** branch using the **`gh-pages`** package.

On **Windows**, this often fails with **`Error: spawn ENAMETOOLONG`** because the OS limits how long a single command line can be. **Use GitHub Actions instead**, or run **`npm run deploy`** from **WSL** or **Git Bash** with the repo in a **short path** (for example `C:\dev\fun-activity-nights`).

If you use the **`gh-pages`** branch method, set **Settings** → **Pages** → **Source** to **Deploy from branch** → **`gh-pages`** / **(root)** — not needed when using **GitHub Actions**.

---

### Troubleshooting

| Problem | What to check |
|--------|----------------|
| **Blank page** on Pages | **`vite.config.js`** → `GITHUB_PAGES_BASE` = `/<exact-repo-name>/`. Fix, push to **main**, wait for Actions. |
| **`spawn ENAMETOOLONG`** on `npm run deploy` | Windows command-line limit. Use **GitHub Actions** or **WSL** / shorter path. |
| **Workflow fails** | **Actions** tab → open the failed job → read logs. Often **`npm ci`** needs a committed **`package-lock.json`**. |
| **Pages shows “Get started”** | **Settings** → **Pages** → set **Source** to **GitHub Actions**. |
| **Old version in browser** | Hard refresh (Ctrl+F5); wait a minute after a green deploy. |

---

### Project structure

- `package.json` – dependencies and scripts (`deploy` uses `gh-pages`; optional on Windows)
- `.github/workflows/deploy-github-pages.yml` – **recommended** Pages deploy via GitHub Actions
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
