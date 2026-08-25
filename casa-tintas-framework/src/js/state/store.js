// =========================================================
// CASA DE TINTAS
// STORE
// Estado global + persistência local
// =========================================================

// =========================================================
// CONFIGURAÇÃO
// =========================================================

const STORAGE_KEY = "casaTintas:carrinho";

// =========================================================
// CARREGAR CARRINHO DO NAVEGADOR
// =========================================================

function carregarCarrinho() {
  const dadosSalvos = localStorage.getItem(STORAGE_KEY);

  if (!dadosSalvos) {
    return [];
  }

  try {
    const carrinho = JSON.parse(dadosSalvos);

    if (!Array.isArray(carrinho)) {
      return [];
    }

    return carrinho;
  } catch (error) {
    console.error("Erro ao carregar carrinho:", error);

    return [];
  }
}

// =========================================================
// ESTADO DA APLICAÇÃO
// =========================================================

const state = {
  carrinho: carregarCarrinho(),
};

// =========================================================
// SALVAR CARRINHO
// =========================================================

function salvarCarrinho() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state.carrinho),
  );

  document.dispatchEvent(
    new CustomEvent("cart:updated", {
      detail: {
        carrinho: state.carrinho,
      },
    }),
  );
}

// =========================================================
// OBTER ESTADO
// =========================================================

export function getState() {
  return state;
}

// =========================================================
// ADICIONAR PRODUTO
// =========================================================

export function adicionarProduto(produto) {
  if (!produto || produto.id == null) {
    return;
  }

  const produtoExistente = state.carrinho.find(
    (item) => item.id === produto.id,
  );

  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  } else {
    state.carrinho.push({
      ...produto,
      quantidade: 1,
    });
  }

  salvarCarrinho();
}

// =========================================================
// REMOVER PRODUTO
// =========================================================

export function removerProduto(produtoId) {
  state.carrinho = state.carrinho.filter(
    (item) => item.id !== produtoId,
  );

  salvarCarrinho();
}

// =========================================================
// AUMENTAR QUANTIDADE
// =========================================================

export function aumentarQuantidade(produtoId) {
  const produto = state.carrinho.find(
    (item) => item.id === produtoId,
  );

  if (!produto) {
    return;
  }

  produto.quantidade += 1;

  salvarCarrinho();
}

// =========================================================
// DIMINUIR QUANTIDADE
// =========================================================

export function diminuirQuantidade(produtoId) {
  const produto = state.carrinho.find(
    (item) => item.id === produtoId,
  );

  if (!produto) {
    return;
  }

  produto.quantidade -= 1;

  if (produto.quantidade <= 0) {
    removerProduto(produtoId);
    return;
  }

  salvarCarrinho();
}

// =========================================================
// LIMPAR CARRINHO
// =========================================================

export function limparCarrinho() {
  state.carrinho = [];

  salvarCarrinho();
}

// =========================================================
// QUANTIDADE TOTAL DE PRODUTOS
// =========================================================

export function obterQuantidadeCarrinho() {
  return state.carrinho.reduce(
    (total, produto) => {
      return total + produto.quantidade;
    },
    0,
  );
}

// =========================================================
// VALOR TOTAL DO CARRINHO
// =========================================================

export function obterTotalCarrinho() {
  return state.carrinho.reduce(
    (total, produto) => {
      return (
        total +
        Number(produto.preco) * produto.quantidade
      );
    },
    0,
  );
}