import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  test: {
    // Replay/freeze suites time out under full parallelism on Windows; 8 workers keeps them in budget.
    maxWorkers: 8,
    include: ['tests/state/**/*.test.ts', 'tests/routes/**/*.test.ts', 'tests/tools/**/*.test.ts'],
  },
});
