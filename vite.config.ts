import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    sveltekit(),

    Icons({
      compiler: 'svelte',
    }),
  ],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
