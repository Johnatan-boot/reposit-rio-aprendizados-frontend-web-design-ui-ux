// =========================================================
// CASA DE TINTAS
// APP.JS
// =========================================================

import {
    buscarProdutos
} from "./services/product-service.js";


import {
    criarProdutoCard
} from "./components/product-card.js";


import {
    adicionarProduto
} from "./state/store.js";


import {
    inicializarCarrinho,
    atualizarCarrinho,
    abrirCarrinho
} from "./components/cart.js";


// =========================================================
// DOM
// =========================================================

const productGrid =
    document.querySelector(
        ".product-grid"
    );


const cartButton =
    document.querySelector(
        "#cart-button"
    );


// =========================================================
// PRODUTOS
// =========================================================

function renderizarProdutos(produtos) {

    if (!productGrid) {

        console.warn(
            ".product-grid não encontrado."
        );

        return;

    }


    productGrid.innerHTML = "";


    if (
        !Array.isArray(produtos) ||
        produtos.length === 0
    ) {

        productGrid.innerHTML = `
            <p>
                Nenhum produto encontrado.
            </p>
        `;

        return;

    }


    produtos.forEach(
        (produto) => {

            const card =
                criarProdutoCard(
                    produto
                );


            productGrid.appendChild(
                card
            );

        }
    );

}


// =========================================================
// EVENTO DO CARRINHO
// =========================================================

document.addEventListener(
    "cart:add",
    (event) => {

        const produto =
            event.detail;


        console.log(
            "Adicionando produto:",
            produto.nome
        );


        // Atualiza estado.

        adicionarProduto(
            produto
        );


        // Atualiza interface.

        atualizarCarrinho();


        // Abre carrinho.

        abrirCarrinho();

    }
);


// =========================================================
// BOTÃO DO CARRINHO
// =========================================================

if (cartButton) {

    cartButton.addEventListener(
        "click",
        abrirCarrinho
    );

}


// =========================================================
// INICIALIZAÇÃO
// =========================================================

async function iniciarAplicacao() {

    console.log(
        "Casa de Tintas — iniciando aplicação..."
    );


    // Inicializa carrinho.

    inicializarCarrinho();


    try {

        const produtos =
            await buscarProdutos();


        renderizarProdutos(
            produtos
        );


        console.log(
            `${produtos.length} produtos carregados.`
        );

    } catch (error) {

        console.error(
            "Erro ao iniciar aplicação:",
            error
        );


        if (productGrid) {

            productGrid.innerHTML = `
                <p>
                    Não foi possível carregar os produtos.
                </p>
            `;

        }

    }

}


// =========================================================
// START
// =========================================================

iniciarAplicacao();