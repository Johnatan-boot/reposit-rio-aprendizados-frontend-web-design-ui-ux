// =========================================================
// CASA DE TINTAS
// APP.JS
// =========================================================

import { buscarProdutos } from "./services/product-service.js";

import { adicionarProduto } from "./state/store.js";

import {
  inicializarCarrinho,
  atualizarCarrinho,
  abrirCarrinho,
} from "./components/cart.js";

// =========================================================
// DOM
// =========================================================

const productGrid = document.querySelector("product-grid");

const cartButton = document.querySelector("#cart-button");

// =========================================================
// PRODUTOS
// =========================================================

// =========================================================
// EVENTO DO CARRINHO
// =========================================================

document.addEventListener("cart:add", (event) => {
  const produto = event.detail;

  console.log("Adicionando produto:", produto.nome);

  // Atualiza estado.

  adicionarProduto(produto);

  // Atualiza interface.

  atualizarCarrinho();

  // Abre carrinho.

  abrirCarrinho();
});

// =========================================================
// BOTÃO DO CARRINHO
// =========================================================

if (cartButton) {
  cartButton.addEventListener("click", abrirCarrinho);
}

// =========================================================
// INICIALIZAÇÃO
// =========================================================

async function iniciarAplicacao() {
  console.log("Casa de Tintas — iniciando aplicação...");

  // Inicializa carrinho.

  inicializarCarrinho();

  try {
    const produtos = await buscarProdutos();

    productGrid.data = produtos;

    console.log(`${produtos.length} produtos carregados.`);
  } catch (error) {
    console.error("Erro ao iniciar aplicação:", error);

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
