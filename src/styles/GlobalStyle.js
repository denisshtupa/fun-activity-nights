import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #050816;
    --bg-elevated: #0b1020;
    --accent: #ff6b6b;
    --accent-soft: #feca57;
    --accent-alt: #1dd1a1;
    --text: #f1f5f9;
    --muted: #94a3b8;
    --card-radius: 18px;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: radial-gradient(circle at top left, #1e293b 0, #020617 50%, #000 100%);
    color: var(--text);
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #1e293b;
    border-radius: 999px;
  }
`;

