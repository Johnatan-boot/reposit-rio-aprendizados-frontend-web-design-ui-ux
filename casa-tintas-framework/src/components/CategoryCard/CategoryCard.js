// =========================================================
// CATEGORY CARD
// =========================================================

class CategoryCard extends HTMLElement {

    connectedCallback() {

        const imagem = this.getAttribute("imagem") || "";
        const titulo = this.getAttribute("titulo") || "Categoria";
        const descricao = this.getAttribute("descricao") || "";
        const link = this.getAttribute("link") || "#";

        this.innerHTML = `
            <a class="category-card" href="${link}">

                <img
                    src="${imagem}"
                    alt="${titulo}"
                />

                <h3>${titulo}</h3>

                <p>${descricao}</p>

                <span class="category-card__link">
                    Ver produtos →
                </span>

            </a>
        `;
    }
}

customElements.define("category-card", CategoryCard);