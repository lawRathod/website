(() => {
	const toggle = document.querySelector(".theme-toggle");
	const storedTheme = localStorage.getItem("theme");

	if (storedTheme) {
		document.documentElement.setAttribute("data-theme", storedTheme);
	} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		document.documentElement.setAttribute("data-theme", "dark");
	}

	toggle.addEventListener("click", () => {
		const currentTheme = document.documentElement.getAttribute("data-theme");
		const newTheme = currentTheme === "dark" ? "light" : "dark";

		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	});
})();

(() => {
	const backToTop = document.querySelector(".back-to-top");

	window.addEventListener("scroll", () => {
		if (window.scrollY > 300) {
			backToTop.classList.add("visible");
		} else {
			backToTop.classList.remove("visible");
		}
	});

	backToTop.addEventListener("click", () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	});
})();

(() => {
	const toc = document.querySelector(".post__toc");
	if (!toc) return;

	const tocLinks = toc.querySelectorAll("a");
	const headings = [];
	const headingMap = {};

	tocLinks.forEach((link) => {
		const href = link.getAttribute("href");
		if (href && href.startsWith("#")) {
			const id = href.slice(1);
			const heading = document.getElementById(id);
			if (heading) {
				headings.push(heading);
				headingMap[id] = link;
			}
		}
	});

	if (headings.length === 0) return;

	let activeLink = null;

	const updateActive = () => {
		const scrollY = window.scrollY;
		const offset = 100;

		let current = null;
		for (let i = headings.length - 1; i >= 0; i--) {
			if (headings[i].offsetTop - offset <= scrollY) {
				current = headings[i];
				break;
			}
		}

		const newActiveLink = current ? headingMap[current.id] : null;

		if (newActiveLink !== activeLink) {
			if (activeLink) {
				activeLink.classList.remove("is-active");
			}
			if (newActiveLink) {
				newActiveLink.classList.add("is-active");
			}
			activeLink = newActiveLink;
		}
	};

	window.addEventListener("scroll", updateActive, { passive: true });
	updateActive();
})();
