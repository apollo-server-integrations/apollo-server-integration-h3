import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/websocket.ts'],
  dts: true,
  exports: true,
})
