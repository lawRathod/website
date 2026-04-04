import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pluginRss from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import readingTime from "eleventy-plugin-reading-time";
import pluginTOC from "eleventy-plugin-toc";
import { DateTime } from "luxon";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.ELEVENTY_ENV === "development";

const manifestPath = path.resolve(
	__dirname,
	"public",
	"assets",
	"manifest.json",
);

const manifest = isDev
	? {
			"main.js": "/assets/main.js",
			"main.css": "/assets/main.css",
		}
	: JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(readingTime);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(pluginTOC);

	eleventyConfig.setLibrary(
		"md",
		markdownIt({ html: true }).use(markdownItAnchor),
	);

	// setup mermaid markdown highlighter
	const highlighter = eleventyConfig.markdownHighlighter;
	eleventyConfig.addMarkdownHighlighter((str, language) => {
		if (language === "mermaid") {
			return `<pre class="mermaid">${str}</pre>`;
		}
		return highlighter(str, language);
	});

	eleventyConfig.setDataDeepMerge(true);
	eleventyConfig.addPassthroughCopy({ "src/images": "images" });
	eleventyConfig.setBrowserSyncConfig({
		files: [manifestPath, "./public/assets/main.css"],
	});

	eleventyConfig.addShortcode("bundledcss", () =>
		manifest["main.css"]
			? `<link href="${manifest["main.css"]}" rel="stylesheet" />`
			: "",
	);

	eleventyConfig.addShortcode("bundledjs", () =>
		manifest["main.js"] ? `<script src="${manifest["main.js"]}"></script>` : "",
	);

	eleventyConfig.addFilter("excerpt", (post) => {
		const content = post.replace(/(<([^>]+)>)/gi, "");
		return content.slice(0, content.lastIndexOf(" ", 200)) + "...";
	});

	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
			"dd LLL yyyy",
		);
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	eleventyConfig.addFilter("dateToIso", (dateString) => {
		return new Date(dateString).toISOString();
	});

	eleventyConfig.addFilter("head", (array, n) => {
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	eleventyConfig.addCollection("experiments", (collection) => {
		return collection.getFilteredByGlob("src/experiments/*.md");
	});

	eleventyConfig.addCollection("tagList", (collection) => {
		const tagSet = new Set();
		collection.getAll().forEach((item) => {
			if ("tags" in item.data) {
				let tags = item.data.tags;

				tags = tags.filter((item) => {
					switch (item) {
						case "all":
						case "nav":
						case "post":
						case "posts":
							return false;
					}

					return true;
				});

				for (const tag of tags) {
					tagSet.add(tag);
				}
			}
		});

		return [...tagSet];
	});

	eleventyConfig.addFilter("pageTags", (tags) => {
		const generalTags = ["all", "nav", "post", "posts"];

		return tags
			.toString()
			.split(",")
			.filter((tag) => {
				return !generalTags.includes(tag);
			});
	});

	return {
		dir: {
			input: "src",
			output: "public",
			includes: "includes",
			data: "data",
			layouts: "layouts",
		},
		passthroughFileCopy: true,
		templateFormats: ["html", "njk", "md"],
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
	};
}
