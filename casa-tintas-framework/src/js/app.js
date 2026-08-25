// =========================================================
// CASA DE TINTAS
// APP.JS
// =========================================================

import { adicionarProduto } from "./state/store.js";

import {
  inicializarCarrinho,
  atualizarCarrinho,
  abrirCarrinho,
} from "./components/cart.js";

import { inicializarProdutos } from "./product-controller.js";

// =========================================================
// DOM
// =========================================================

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

  // Carrega produtos + pesquisa + filtros + ordenação.

  await inicializarProdutos();
}

// =========================================================
// START
// =========================================================

iniciarAplicacao();
