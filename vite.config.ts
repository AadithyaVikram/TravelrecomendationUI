///<reference types="vitest"/>
///<reference types="vite/client"/>
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
   
    include: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.d.ts'],
  },
})