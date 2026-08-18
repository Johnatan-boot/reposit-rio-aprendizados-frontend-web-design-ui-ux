// =========================================================
// PRODUCT CARD
// =========================================================

import {
    formatCurrency
} from "../utils/currency.js";


// =========================================================
// CRIAR CARD
// =========================================================

export function criarProdutoCard(produto) {

    const article =
        document.createElement("article");


    article.classList.add(
        "product-card"
    );


    // =====================================================
    // IMAGEM
    // =====================================================

    const imageContainer =
        document.createElement("div");


    imageContainer.classList.add(
        "product-card__image"
    );


    const image =
        document.createElement("img");


    image.src =
        produto.imagem;


    image.alt =
        produto.nome;


    imageContainer.appendChild(
        image
    );


    // =====================================================
    // BODY
    // =====================================================

    const body =
        document.createElement("div");


    body.classList.add(
        "product-card__body"
    );


    // =====================================================
    // CATEGORIA
    // =====================================================

    const category =
        document.createElement("p");


    category.classList.add(
        "product-card__category"
    );


    category.textContent =
        produto.categoria;


    // =====================================================
    // TÍTULO
    // =====================================================

    const title =
        document.createElement("h3");


    title.textContent =
        produto.nome;


    // =====================================================
    // DESCRIÇÃO
    // =====================================================

    const description =
        document.createElement("p");


    description.classList.add(
        "product-card__description"
    );


    description.textContent =
        produto.descricao;


    // =====================================================
    // FOOTER
    // =====================================================

    const footer =
        document.createElement("div");


    footer.classList.add(
        "product-card__footer"
    );


    // =====================================================
    // PREÇO
    // =====================================================

    const priceContainer =
        document.createElement("div");


    const priceLabel =
        document.createElement("span");


    priceLabel.classList.add(
        "price-label"
    );


    priceLabel.textContent =
        "A partir de";


    const price =
        document.createElement("strong");


    price.classList.add(
        "price"
    );


    price.textContent =
        formatCurrency(
            produto.preco
        );


    priceContainer.appendChild(
        priceLabel
    );


    priceContainer.appendChild(
        price
    );


    // =====================================================
    // BOTÃO COMPRAR
    // =====================================================

    const button =
        document.createElement("button");


    button.type =
        "button";


    button.classList.add(
        "button",
        "button--small"
    );


    button.textContent =
        "Comprar";


    button.dataset.productId =
        produto.id;


    // =====================================================
    // EVENTO
    // =====================================================

    button.addEventListener(
        "click",
        () => {

            document.dispatchEvent(

                new CustomEvent(
                    "cart:add",
                    {
                        detail: produto
                    }
                )

            );

        }
    );


    // =====================================================
    // MONTAGEM
    // =====================================================

    footer.appendChild(
        priceContainer
    );


    footer.appendChild(
        button
    );


    body.appendChild(
        category
    );


    body.appendChild(
        title
    );


    body.appendChild(
        description
    );


    body.appendChild(
        footer
    );


    article.appendChild(
        imageContainer
    );


    article.appendChild(
        body
    );


    return article;

}