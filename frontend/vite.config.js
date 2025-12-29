import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // Fix for packages relying on global
    'process.env': {}, // Fix for packages relying on process.env
  },
  optimizeDeps: {
    exclude: [
      '@opentelemetry/resources',
      '@opentelemetry/sdk-trace-web',
      '@opentelemetry/sdk-trace-base',
      '@opentelemetry/core'
    ]
  }
})
