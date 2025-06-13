import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import fg from 'fast-glob';
import { defineConfig } from 'vite';

const host = process.env.TAURI_DEV_HOST;

export default defineConfig(async () => ({
	plugins: [react(), vanillaExtractPlugin()],
	clearScreen: false,
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		hmr: host
			? {
					protocol: 'ws',
					host,
					port: 1421,
				}
			: undefined,
		watch: {
			ignored: ['**/src-tauri/**'],
		},
		warmup: {
			clientFiles: await fg(['./src/**/*.css.ts', '!./src/**/layer.css.ts']),
		},
	},
	envPrefix: ['VITE_', 'TAURI_ENV_'],
	minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
	sourcemap: !!process.env.TAURI_ENV_DEBUG,
}));
