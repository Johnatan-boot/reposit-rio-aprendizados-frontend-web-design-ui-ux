// =========================================================
// CASA DE TINTAS
// PRODUCT SERVICE
// Responsável por carregar e fornecer os produtos
// =========================================================


// =========================================================
// CONFIGURAÇÃO
// =========================================================

// Local real do arquivo produtos.json
const PRODUCTS_URL =
    "/frontend/js/data/produtos.json";


// =========================================================
// CACHE
// Evita múltiplos fetch() desnecessários
// =========================================================

let produtosCache = null;


// =========================================================
// BUSCAR PRODUTOS
// =========================================================

export async function buscarProdutos() {

    // -----------------------------------------------------
    // Verifica se os produtos já estão em memória
    // -----------------------------------------------------

    if (produtosCache) {

        return produtosCache;

    }


    try {

        // -------------------------------------------------
        // CARREGAR JSON
        // -------------------------------------------------

        const response =
            await fetch(PRODUCTS_URL);


        // -------------------------------------------------
        // VALIDAR RESPOSTA
        // -------------------------------------------------

        if (!response.ok) {

            throw new Error(
                `Erro HTTP: ${response.status}`
            );

        }


        // -------------------------------------------------
        // CONVERTER PARA JSON
        // -------------------------------------------------

        produtosCache =
            await response.json();


        // -------------------------------------------------
        // LOG
        // -------------------------------------------------

        console.log(
            `${produtosCache.length} produtos carregados pelo Product Service.`
        );


        // -------------------------------------------------
        // RETORNAR PRODUTOS
        // -------------------------------------------------

        return produtosCache;

    } catch (error) {

        console.error(
            "Erro ao carregar produtos:",
            error
        );

        throw error;

    }

}


// =========================================================
// LIMPAR CACHE
// =========================================================

export function limparProdutosCache() {

    produtosCache = null;

}