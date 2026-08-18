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

    const dadosSalvos =
        localStorage.getItem(STORAGE_KEY);


    // -----------------------------------------------------
    // Não existe carrinho salvo
    // -----------------------------------------------------

    if (!dadosSalvos) {

        return [];

    }


    // -----------------------------------------------------
    // Tenta transformar JSON em objeto JavaScript
    // -----------------------------------------------------

    try {

        const carrinho =
            JSON.parse(dadosSalvos);


        // -------------------------------------------------
        // Garante que o resultado seja um array
        // -------------------------------------------------

        if (!Array.isArray(carrinho)) {

            return [];

        }


        return carrinho;

    } catch (error) {

        console.error(
            "Erro ao carregar carrinho:",
            error
        );


        return [];

    }

}


// =========================================================
// ESTADO DA APLICAÇÃO
// =========================================================

const state = {

    carrinho: carregarCarrinho()

};


// =========================================================
// SALVAR ESTADO
// =========================================================

function salvarCarrinho() {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(
            state.carrinho
        )

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

    const produtoExistente =
        state.carrinho.find(
            (item) => item.id === produto.id
        );


    // -----------------------------------------------------
    // PRODUTO JÁ EXISTE
    // -----------------------------------------------------

    if (produtoExistente) {

        produtoExistente.quantidade += 1;

    }

    // -----------------------------------------------------
    // NOVO PRODUTO
    // -----------------------------------------------------

    else {

        state.carrinho.push({

            ...produto,

            quantidade: 1

        });

    }


    // -----------------------------------------------------
    // PERSISTE ALTERAÇÃO
    // -----------------------------------------------------

    salvarCarrinho();

}


// =========================================================
// REMOVER PRODUTO
// =========================================================

export function removerProduto(produtoId) {

    state.carrinho =
        state.carrinho.filter(
            (item) => item.id !== produtoId
        );


    salvarCarrinho();

}


// =========================================================
// AUMENTAR QUANTIDADE
// =========================================================

export function aumentarQuantidade(produtoId) {

    const produto =
        state.carrinho.find(
            (item) => item.id === produtoId
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

    const produto =
        state.carrinho.find(
            (item) => item.id === produtoId
        );


    if (!produto) {

        return;

    }


    produto.quantidade -= 1;


    // -----------------------------------------------------
    // Remove automaticamente ao chegar a zero
    // -----------------------------------------------------

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
// QUANTIDADE TOTAL
// =========================================================

export function obterQuantidadeCarrinho() {

    return state.carrinho.reduce(

        (total, produto) => {

            return total +
                produto.quantidade;

        },

        0

    );

}


// =========================================================
// VALOR TOTAL
// =========================================================

export function obterTotalCarrinho() {

    return state.carrinho.reduce(

        (total, produto) => {

            return total +
                (
                    Number(produto.preco) *
                    produto.quantidade
                );

        },

        0

    );

}