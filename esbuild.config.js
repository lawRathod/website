import fs from "node:fs";
import path from "node:path";
import esbuild from "esbuild";

const isDev = process.env.ELEVENTY_ENV === "development";

const manifestPlugin = {
	name: "manifest",
	setup(build) {
		build.onEnd((result) => {
			if (result.errors.length > 0) return;

			const manifest = {};
			for (const output of Object.keys(result.metafile.outputs)) {
				const entry = path.basename(output);
				manifest[entry] = `/assets/${entry}`;
			}

			const outDir = path.resolve("public", "assets");
			fs.mkdirSync(outDir, { recursive: true });
			fs.writeFileSync(
				path.join(outDir, "manifest.json"),
				JSON.stringify(manifest, null, 2),
			);
		});
	},
};

const config = {
	entryPoints: [
		path.resolve("src", "js", "main.js"),
		path.resolve("src", "css", "main.css"),
	],
	outdir: path.resolve("public", "assets"),
	bundle: true,
	minify: !isDev,
	sourcemap: isDev,
	metafile: true,
	entryNames: "[name]",
	loader: {
		".css": "css",
	},
	plugins: [manifestPlugin],
};

if (process.argv.includes("--watch")) {
	const ctx = await esbuild.context(config);
	await ctx.watch();
	console.log("Watching for changes...");
} else {
	await esbuild.build(config);
	console.log("Build complete.");
}
