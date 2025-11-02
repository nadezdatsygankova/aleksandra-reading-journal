import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fm from 'front-matter'

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    react(),
    {
      name: 'markdown-loader',
      transform(code, id) {
        if (id.endsWith('.md')) {
          const { attributes, body } = fm(code)
          return `export default ${JSON.stringify({ data: attributes, content: body })}`
        }
      }
    }
  ],
})
