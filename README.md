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

### Getting started

From the project folder (`c:\Users\Denis\.ssh\fun-activity-nights`):

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (by default `http://localhost:5173`).

### Project structure

- `package.json` – dependencies and scripts
- `vite.config.js` – Vite + React config
- `index.html` – root HTML shell
- `src/main.jsx` – React entry point
- `src/styles/GlobalStyle.js` – global theming with styled-components
- `src/data/games.js` – static players and game points
- `src/App.jsx` – main dashboard layout, standings table, and charts

### Customization ideas

- Add more games or adjust points in `src/data/games.js`.
- Change colors or typography in `src/styles/GlobalStyle.js`.
- Add filters by date range or show per-player detail modals.

