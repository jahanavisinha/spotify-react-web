import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//   },
// })

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    base: env.VITE_ROUTER_BASE_URL || '/',
    define: {
      'process.env': env,
    },
    plugins: [react()],
    server: {
      port: 5173,
    },
  })
}
