import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	bundle: false,
	dts: false,
	entry: ['src/**/*.ts'],
	format: ['esm'],
	minify: false,
	tsconfig: 'src/tsconfig.json',
	target: 'es2022',
	splitting: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	shims: false,
	keepNames: true
});
