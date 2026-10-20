import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 在 GitHub Actions 上建置時用 /pawsteps/，本機與 Vercel 維持 /
  base: process.env.GITHUB_ACTIONS ? '/pawsteps/' : '/',
})