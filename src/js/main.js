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
