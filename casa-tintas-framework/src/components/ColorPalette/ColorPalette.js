// =========================================================
// COLOR PALETTE
// =========================================================

class ColorPalette extends HTMLElement {

    connectedCallback() {

        const cores = [
            "#1d1e18",
            "#6b8f71",
            "#aad2ba",
            "#d9fff5",
            "#b9f5d8"
        ];

        this.classList.add("color-palette");

        this.setAttribute(
            "aria-hidden",
            "true"
        );

        this.innerHTML = "";

        cores.forEach((cor) => {

            const swatch =
                document.createElement("span");

            swatch.style.setProperty(
                "--swatch",
                cor
            );

            this.appendChild(swatch);
        });
    }
}

customElements.define(
    "color-palette",
    ColorPalette
);