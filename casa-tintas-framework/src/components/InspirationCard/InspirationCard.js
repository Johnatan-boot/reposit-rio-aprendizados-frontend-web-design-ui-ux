// =========================================================
// INSPIRATION CARD
// =========================================================

class InspirationCard extends HTMLElement {

    connectedCallback() {

        const imagem =
            this.getAttribute("imagem") || "";

        const alt =
            this.getAttribute("alt") || "";

        const titulo =
            this.getAttribute("titulo") || "Inspiração";

        const descricao =
            this.getAttribute("descricao") || "";

        const link =
            this.getAttribute("link") || "#produtos";

        const acao =
            this.getAttribute("acao") || "Ver inspiração";

        const tamanho =
            this.getAttribute("tamanho") || "";


        // =====================================================
        // CLASSES DO PRÓPRIO COMPONENTE
        // =====================================================

        this.classList.add("inspiration-card");

        if (tamanho) {
            this.classList.add(tamanho);
        }


        // =====================================================
        // ESTRUTURA
        // =====================================================

        this.innerHTML = `

            <a
                href="${link}"
                aria-label="${acao} para ${titulo}"
            >

                <div class="inspiration-card__visual">

                    <img
                        src="${imagem}"
                        alt="${alt}"
                    />

                </div>

            </a>


            <div class="inspiration-card__content">

                <h3>
                    ${titulo}
                </h3>

                <p>
                    ${descricao}
                </p>

                <a href="${link}">
                    ${acao}
                </a>

            </div>

        `;
    }
}


// =========================================================
// CUSTOM ELEMENT
// =========================================================

customElements.define(
    "inspiration-card",
    InspirationCard
);