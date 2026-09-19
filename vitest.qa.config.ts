import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['tests/qa/**/*.qa.ts', 'tests/qa/**/*.test.ts'],
    testTimeout: 600_000,
  },
});
