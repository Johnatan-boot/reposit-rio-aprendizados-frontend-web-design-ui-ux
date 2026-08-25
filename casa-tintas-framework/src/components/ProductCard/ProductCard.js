// =========================================================
// PRODUCT CARD — WEB COMPONENT
// =========================================================

import { formatCurrency } from "../../js/utils/currency.js";

class ProductCard extends HTMLElement {

    constructor() {
        super();

        this.produto = null;
    }

    connectedCallback() {

        this.render();

    }

    set data(produto) {

        this.produto = produto;

        this.render();

    }

    get data() {

        return this.produto;

    }

    render() {

        if (!this.produto) {

            return;

        }

        const produto = this.produto;

        this.innerHTML = `

            <article class="product-card">

                <div class="product-card__image">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                    />

                </div>

                <div class="product-card__body">

                    <p class="product-card__category">
                        ${produto.categoria}
                    </p>

                    <h3>
                        ${produto.nome}
                    </h3>

                    <p class="product-card__description">
                        ${produto.descricao}
                    </p>

                    <div class="product-card__footer">

                        <div>

                            <span class="price-label">
                                A partir de
                            </span>

                            <strong class="price">
                                ${formatCurrency(produto.preco)}
                            </strong>

                        </div>

                        <button
                            type="button"
                            class="button button--small"
                            data-action="details"
                        >
                            Comprar
                        </button>

                    </div>

                </div>

            </article>

        `;

        this.configurarEventos();

    }

    configurarEventos() {

        const button = this.querySelector(
            '[data-action="details"]'
        );

        if (!button) {

            return;

        }

        button.addEventListener(
            "click",
            () => {

                const productDetails =
                    document.querySelector(
                        "product-details"
                    );

                if (!productDetails) {

                    console.warn(
                        "Componente <product-details> não encontrado."
                    );

                    return;

                }

                productDetails.abrir(
                    this.produto
                );

            }
        );

    }

}

customElements.define(
    "product-card",
    ProductCard
);