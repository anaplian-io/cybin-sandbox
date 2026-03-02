import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    include: ['**/*.test.{ts,tsx}'],
    watch: false,
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'clover'],
      enabled: true,
      thresholds: {
        lines: 100,
        branches: 100,
        functions: 100,
        statements: 100,
      },
      exclude: [
        'src/cli.tsx',
        'dist/**',
        'node_modules/**',
        'src/constants/**',
        'src/data/**',
        'src/types/**',
      ],
    },
  },
});
