// =========================================================
// CART STATE
// Estado do carrinho de compras
// =========================================================


// =========================================================
// ESTADO PRIVADO
// =========================================================

let carrinho = [];


// =========================================================
// ADICIONAR PRODUTO
// =========================================================

export function adicionarAoCarrinho(produto) {

    // -----------------------------------------------------
    // Verifica se o produto já está no carrinho
    // -----------------------------------------------------

    const itemExistente =
        carrinho.find(
            (item) => item.id === produto.id
        );


    // -----------------------------------------------------
    // Se já existe
    // -----------------------------------------------------

    if (itemExistente) {

        itemExistente.quantidade += 1;

    }


    // -----------------------------------------------------
    // Se ainda não existe
    // -----------------------------------------------------

    else {

        carrinho.push({

            ...produto,

            quantidade: 1

        });

    }


    // -----------------------------------------------------
    // Retorna uma cópia do estado
    // -----------------------------------------------------

    return obterCarrinho();

}


// =========================================================
// REMOVER PRODUTO
// =========================================================

export function removerDoCarrinho(produtoId) {

    carrinho =
        carrinho.filter(
            (item) => item.id !== produtoId
        );


    return obterCarrinho();

}


// =========================================================
// ALTERAR QUANTIDADE
// =========================================================

export function alterarQuantidade(
    produtoId,
    quantidade
) {

    const item =
        carrinho.find(
            (item) => item.id === produtoId
        );


    if (!item) {
        return obterCarrinho();
    }


    // -----------------------------------------------------
    // Impede quantidade menor que 1
    // -----------------------------------------------------

    if (quantidade <= 0) {

        return removerDoCarrinho(
            produtoId
        );

    }


    item.quantidade =
        quantidade;


    return obterCarrinho();

}


// =========================================================
// OBTER CARRINHO
// =========================================================

export function obterCarrinho() {

    // Retorna uma cópia para evitar
    // alteração direta do estado.

    return [...carrinho];

}


// =========================================================
// LIMPAR CARRINHO
// =========================================================

export function limparCarrinho() {

    carrinho = [];

    return obterCarrinho();

}


// =========================================================
// QUANTIDADE TOTAL
// =========================================================

export function obterQuantidadeTotal() {

    return carrinho.reduce(
        (
            total,
            item
        ) => {

            return total + item.quantidade;

        },
        0
    );

}


// =========================================================
// VALOR TOTAL
// =========================================================

export function obterValorTotal() {

    return carrinho.reduce(
        (
            total,
            item
        ) => {

            return total +
                item.preco *
                item.quantidade;

        },
        0
    );

}