// =========================================================
// CART COMPONENT
// =========================================================

import {
  getState,
  removerProduto,
  aumentarQuantidade,
  diminuirQuantidade,
  limparCarrinho,
  obterQuantidadeCarrinho,
  obterTotalCarrinho,
} from "../state/store.js";

import { formatCurrency } from "../utils/currency.js";

// =========================================================
// REFERÊNCIAS
// =========================================================

let cartPanel = null;
let cartItems = null;
let cartTotal = null;
let cartCount = null;

// =========================================================
// INICIALIZAR
// =========================================================

export function inicializarCarrinho() {
  criarEstruturaCarrinho();
  atualizarCarrinho();
}

// =========================================================
// CRIAR ESTRUTURA
// =========================================================

function criarEstruturaCarrinho() {
  // Evita criar o carrinho duas vezes
  if (cartPanel) {
    return;
  }

  // =====================================================
  // CONTADOR DO CARRINHO NO HEADER
  // =====================================================

  cartCount = document.querySelector(".cart-count");

  // =====================================================
  // PAINEL DO CARRINHO
  // =====================================================

  cartPanel = document.createElement("aside");

  cartPanel.className = "cart-panel";
  cartPanel.setAttribute("aria-label", "Carrinho de compras");

  cartPanel.innerHTML = `
    <div class="cart-panel__header">
      <h2>Carrinho</h2>

      <button
        type="button"
        class="cart-panel__close"
        aria-label="Fechar carrinho"
      >
        ×
      </button>
    </div>

    <div class="cart-panel__items"></div>

    <div class="cart-panel__footer">
      <strong>Total</strong>

      <strong class="cart-panel__total">
        R$ 0,00
      </strong>

      <button
        type="button"
        class="button button--primary cart-panel__checkout"
      >
        Finalizar pedido
      </button>

      <button
        type="button"
        class="button button--secondary cart-panel__clear"
      >
        Limpar carrinho
      </button>
    </div>
  `;

  document.body.appendChild(cartPanel);

  // =====================================================
  // REFERÊNCIAS INTERNAS
  // =====================================================

  cartItems = cartPanel.querySelector(".cart-panel__items");
  cartTotal = cartPanel.querySelector(".cart-panel__total");

  // =====================================================
  // CHECKOUT
  // =====================================================

  cartPanel
    .querySelector(".cart-panel__checkout")
    .addEventListener("click", irParaCheckout);

  // =====================================================
  // FECHAR
  // =====================================================

  cartPanel
    .querySelector(".cart-panel__close")
    .addEventListener("click", fecharCarrinho);

  // =====================================================
  // LIMPAR
  // =====================================================

  cartPanel
    .querySelector(".cart-panel__clear")
    .addEventListener("click", () => {
      limparCarrinho();
      atualizarCarrinho();
    });
}

// =========================================================
// ATUALIZAR INTERFACE
// =========================================================

export function atualizarCarrinho() {
  if (!cartItems || !cartTotal) {
    return;
  }

  const state = getState();

  // =====================================================
  // LIMPAR ITENS
  // =====================================================

  cartItems.innerHTML = "";

  // =====================================================
  // CARRINHO VAZIO
  // =====================================================

  if (state.carrinho.length === 0) {
    cartItems.innerHTML = `
      <p class="cart-empty">
        Seu carrinho está vazio.
      </p>
    `;
  } else {
    // ===================================================
    // RENDERIZAR PRODUTOS
    // ===================================================

    state.carrinho.forEach((produto) => {
      const item = criarItemCarrinho(produto);

      cartItems.appendChild(item);
    });
  }

  // =====================================================
  // TOTAL
  // =====================================================

  const total = obterTotalCarrinho();

  cartTotal.textContent = formatCurrency(total);

  // =====================================================
  // QUANTIDADE
  // =====================================================

  const quantidade = obterQuantidadeCarrinho();

  // =====================================================
  // CONTADOR DO HEADER
  // =====================================================

  if (cartCount) {
    cartCount.textContent = quantidade;

    cartCount.setAttribute(
      "aria-label",
      `${quantidade} ${
        quantidade === 1 ? "produto" : "produtos"
      } no carrinho`,
    );
  }
}

// =========================================================
// CRIAR ITEM DO CARRINHO
// =========================================================

function criarItemCarrinho(produto) {
  const item = document.createElement("article");

  item.className = "cart-item";

  const preco = Number(produto.preco) || 0;
  const quantidade = Number(produto.quantidade) || 0;
  const subtotal = preco * quantidade;

  item.innerHTML = `
    <div>
      <h3>
        ${produto.nome}
      </h3>

      <p>
        ${formatCurrency(preco)}
        <span class="cart-item__unit-label">
          / unidade
        </span>
      </p>
    </div>

    <div class="cart-item__actions">

      <button
        type="button"
        data-action="decrease"
        aria-label="Diminuir quantidade de ${produto.nome}"
      >
        −
      </button>

      <span>
        ${quantidade}
      </span>

      <button
        type="button"
        data-action="increase"
        aria-label="Aumentar quantidade de ${produto.nome}"
      >
        +
      </button>

      <button
        type="button"
        data-action="remove"
        aria-label="Remover ${produto.nome} do carrinho"
      >
        Remover
      </button>

    </div>

    <p class="cart-item__subtotal">
      Subtotal:
      <strong>
        ${formatCurrency(subtotal)}
      </strong>
    </p>
  `;

  // =====================================================
  // AUMENTAR
  // =====================================================

  item
    .querySelector('[data-action="increase"]')
    .addEventListener("click", () => {
      aumentarQuantidade(produto.id);
      atualizarCarrinho();
    });

  // =====================================================
  // DIMINUIR
  // =====================================================

  item
    .querySelector('[data-action="decrease"]')
    .addEventListener("click", () => {
      diminuirQuantidade(produto.id);
      atualizarCarrinho();
    });

  // =====================================================
  // REMOVER
  // =====================================================

  item
    .querySelector('[data-action="remove"]')
    .addEventListener("click", () => {
      removerProduto(produto.id);
      atualizarCarrinho();
    });

  return item;
}

// =========================================================
// ABRIR CARRINHO
// =========================================================

export function abrirCarrinho() {
  if (!cartPanel) {
    return;
  }

  cartPanel.classList.add("cart-panel--open");
}

// =========================================================
// FECHAR CARRINHO
// =========================================================

export function fecharCarrinho() {
  if (!cartPanel) {
    return;
  }

  cartPanel.classList.remove("cart-panel--open");
}

// =========================================================
// IR PARA O CHECKOUT
// =========================================================

export function irParaCheckout() {
  window.location.href = "./checkout.html";
}