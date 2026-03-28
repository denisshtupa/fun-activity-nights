import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// GitHub project Pages URL: https://<user>.github.io/<repo>/
// Change this if the repository name is not `fun-activity-nights`.
const GITHUB_PAGES_BASE = '/fun-activity-nights/';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? GITHUB_PAGES_BASE : '/',
  plugins: [react()],
  server: {
    port: 5173
  }
}));

