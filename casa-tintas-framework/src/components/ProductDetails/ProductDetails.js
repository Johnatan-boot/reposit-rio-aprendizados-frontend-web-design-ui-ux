// =========================================================
// PRODUCT DETAILS
// =========================================================

import { formatCurrency }
    from "../../js/utils/currency.js";

import {
    abrirModal,
    fecharModal,
    configurarFechamentoOverlay
} from "../../js/ui/modal.js";

class ProductDetails extends HTMLElement {

    constructor() {

        super();

        this._product = null;

        this._renderizado = false;

    }

    // =====================================================
    // CONNECTED
    // =====================================================

    connectedCallback() {
    this.render();

    this.addEventListener(
        "click",
        this.handleClick
    );

    configurarFechamentoOverlay(this);
}
    // =====================================================
    // PRODUCT
    // =====================================================

    set product(produto) {

        this._product = produto;

        this.render();

    }

    get product() {

        return this._product;

    }

    // =====================================================
    // RENDER
    // =====================================================

    render() {

        if (!this._product) {

            this.innerHTML = "";

            return;

        }

        const produto = this._product;

        this.innerHTML = `

            <div
                class="product-details"
                role="dialog"
                aria-modal="true"
                aria-labelledby="product-details-title"
            >

                <button
                    type="button"
                    class="product-details__close"
                    data-action="close"
                    data-modal-close
                    aria-label="Fechar detalhes do produto"
                >
                    ×
                </button>

                <div class="product-details__image">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                    >

                </div>

                <div class="product-details__content">

                    <p class="product-details__category">
                        ${produto.categoria}
                    </p>

                    <h2
                        id="product-details-title"
                        class="product-details__title"
                    >
                        ${produto.nome}
                    </h2>

                    <p class="product-details__description">
                        ${produto.descricao}
                    </p>

                    <div class="product-details__price">

                        <span>
                            A partir de
                        </span>

                        <strong>
                            ${formatCurrency(produto.preco)}
                        </strong>

                    </div>

                    <div class="product-details__quantity">

                        <label for="product-quantity">
                            Quantidade
                        </label>

                        <div class="quantity-control">

                            <button
                                type="button"
                                data-action="decrease"
                                aria-label="Diminuir quantidade"
                            >
                                −
                            </button>

                            <span
                                id="product-quantity"
                                class="quantity-value"
                                aria-live="polite"
                            >
                                1
                            </span>

                            <button
                                type="button"
                                data-action="increase"
                                aria-label="Aumentar quantidade"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        type="button"
                        class="button button--primary product-details__buy"
                        data-action="buy"
                    >
                        Adicionar ao carrinho
                    </button>

                </div>

            </div>

        `;

    }

    // =====================================================
    // CLICK
    // =====================================================

    handleClick = (event) => {

        const action =
            event.target.dataset.action;

        if (!action) {

            return;

        }

        if (action === "close") {

            this.fechar();

        }

        if (action === "increase") {

            this.alterarQuantidade(1);

        }

        if (action === "decrease") {

            this.alterarQuantidade(-1);

        }

        if (action === "buy") {

            this.adicionarAoCarrinho();

        }

    };

    // =====================================================
    // QUANTIDADE
    // =====================================================

    alterarQuantidade(valor) {

        const quantityElement =
            this.querySelector(
                ".quantity-value"
            );

        if (!quantityElement) {

            return;

        }

        let quantidade =
            Number(
                quantityElement.textContent
            );

        quantidade += valor;

        if (quantidade < 1) {

            quantidade = 1;

        }

        quantityElement.textContent =
            quantidade;

    }

    // =====================================================
    // ADICIONAR AO CARRINHO
    // =====================================================

    adicionarAoCarrinho() {

        if (!this._product) {

            return;

        }

        const quantityElement =
            this.querySelector(
                ".quantity-value"
            );

        const quantidade =
            Number(
                quantityElement?.textContent || 1
            );

        for (
            let i = 0;
            i < quantidade;
            i++
        ) {

            document.dispatchEvent(
                new CustomEvent(
                    "cart:add",
                    {
                        detail: this._product
                    }
                )
            );

        }

        this.fechar();

    }

    // =====================================================
    // ABRIR
    // =====================================================

    abrir(produto) {

        if (!produto) {

            return;

        }

        this._product = produto;

        this.render();

        abrirModal(
            this,
            document.activeElement
        );

    }

    // =====================================================
    // FECHAR
    // =====================================================

    fechar() {

        fecharModal(this);

    }

    // =====================================================
    // EVENTOS
    // =====================================================

 
    disconnectedCallback() {

        this.removeEventListener(
            "click",
            this.handleClick
        );

    }

}

customElements.define(
    "product-details",
    ProductDetails
);