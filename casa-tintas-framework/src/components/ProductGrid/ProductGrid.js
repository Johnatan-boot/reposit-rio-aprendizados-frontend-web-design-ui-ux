// =========================================================
// PRODUCT GRID — WEB COMPONENT
// =========================================================

class ProductGrid extends HTMLElement {

    constructor() {
        super();

        this.produtos = [];
    }

    // =====================================================
    // COMPONENTE ENTROU NO DOM
    // =====================================================

    connectedCallback() {
        this.render();
    }

    // =====================================================
    // RECEBER PRODUTOS
    // =====================================================

    set data(produtos) {

        this.produtos = Array.isArray(produtos)
            ? produtos
            : [];

        this.render();
    }

    // =====================================================
    // OBTER PRODUTOS
    // =====================================================

    get data() {
        return this.produtos;
    }

    // =====================================================
    // RENDERIZAR
    // =====================================================

    render() {

        this.innerHTML = "";

        // =================================================
        // NENHUM PRODUTO
        // =================================================

        this.classList.toggle("product-grid--empty", this.produtos.length === 0);

        if (this.produtos.length === 0) {

            this.innerHTML = `
                <div class="search-empty">
                    <h3>Nenhum produto encontrado</h3>
                    <p>Tente ajustar a pesquisa, a categoria ou a faixa de preço.</p>
                </div>
            `;

            return;
        }

        // =================================================
        // CRIAR PRODUCT CARDS
        // =================================================

        this.produtos.forEach(
            (produto) => {

                const card =
                    document.createElement(
                        "product-card"
                    );

                card.data = produto;

                this.appendChild(card);
            }
        );
    }
}

// =========================================================
// REGISTRAR WEB COMPONENT
// =========================================================

customElements.define(
    "product-grid",
    ProductGrid
);