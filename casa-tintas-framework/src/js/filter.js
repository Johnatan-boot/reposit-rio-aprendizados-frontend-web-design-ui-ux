// =========================================================
// CASA DE TINTAS
// FILTRO DE PRODUTOS
// =========================================================

import {
    buscarProdutos
} from "./services/product-service.js";

// =========================================================
// ESTADO DOS FILTROS
// =========================================================

const filtroState = {

    categoria: "todos",

    termo: ""

};


// =========================================================
// ELEMENTOS
// =========================================================

const productGrid =
    document.querySelector(
        ".product-grid"
    );


// =========================================================
// INICIALIZAÇÃO
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    inicializarFiltros
);


async function inicializarFiltros() {

    if (!productGrid) {

        console.warn(
            "Product grid não encontrado."
        );

        return;

    }


    const produtos =
        await buscarProdutos();


    criarFiltros(produtos);

}


// =========================================================
// CRIAR FILTROS
// =========================================================

function criarFiltros(produtos) {

    const categorias =
        obterCategorias(produtos);


    const container =
        document.querySelector(
            ".product-filters"
        );


    if (!container) {

        console.warn(
            "Container de filtros não encontrado."
        );

        return;

    }


    container.innerHTML = `

        <div
            class="product-filters__group"
            role="group"
            aria-label="Filtrar produtos por categoria"
        >

            <button
                type="button"
                class="filter-button filter-button--active"
                data-category="todos"
            >
                Todos
            </button>

            ${categorias
                .map(
                    (categoria) => `

                        <button
                            type="button"
                            class="filter-button"
                            data-category="${categoria}"
                        >
                            ${categoria}
                        </button>

                    `
                )
                .join("")}

        </div>

    `;


    adicionarEventosFiltro();

}


// =========================================================
// OBTER CATEGORIAS
// =========================================================

function obterCategorias(produtos) {

    return [
        ...new Set(

            produtos
                .map(
                    (produto) =>
                        produto.categoria
                )
                .filter(Boolean)

        )
    ];

}


// =========================================================
// EVENTOS
// =========================================================

function adicionarEventosFiltro() {

    const buttons =
        document.querySelectorAll(
            ".filter-button"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    const categoria =
                        button.dataset.category;


                    filtroState.categoria =
                        categoria;


                    atualizarEstadoBotoes(
                        buttons,
                        button
                    );


                    aplicarFiltros();

                }
            );

        }
    );

}


// =========================================================
// ESTADO VISUAL DOS BOTÕES
// =========================================================

function atualizarEstadoBotoes(
    buttons,
    activeButton
) {

    buttons.forEach(
        (button) => {

            button.classList.remove(
                "filter-button--active"
            );

        }
    );


    activeButton.classList.add(
        "filter-button--active"
    );

}


// =========================================================
// APLICAR FILTROS
// =========================================================

async function aplicarFiltros() {

    const produtos =
        await buscarProdutos();


    const termo =
        normalizarTexto(
            filtroState.termo
        );


    const resultados =
        produtos.filter(
            (produto) => {

                // -----------------------------------------
                // FILTRO DE CATEGORIA
                // -----------------------------------------

                const correspondeCategoria =

                    filtroState.categoria === "todos" ||

                    normalizarTexto(
                        produto.categoria || ""
                    ) ===
                    normalizarTexto(
                        filtroState.categoria
                    );


                // -----------------------------------------
                // FILTRO DE BUSCA
                // -----------------------------------------

                const textoProduto = [

                    produto.nome,

                    produto.descricao,

                    produto.categoria

                ]
                    .filter(Boolean)
                    .join(" ");


                const correspondeBusca =

                    !termo ||

                    normalizarTexto(
                        textoProduto
                    ).includes(termo);


                // -----------------------------------------
                // OS DOIS FILTROS DEVEM SER VERDADEIROS
                // -----------------------------------------

                return (
                    correspondeCategoria &&
                    correspondeBusca
                );

            }
        );


    renderizarResultados(
        resultados
    );

}


// =========================================================
// NORMALIZA TEXTO
// =========================================================

function normalizarTexto(texto) {

    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(
            /[\u0300-\u036f]/g,
            ""
        )
        .trim();

}


// =========================================================
// RENDERIZAR
// =========================================================

function renderizarResultados(
    resultados
) {

    productGrid.classList.toggle(
        "product-grid--search-result",
        resultados.length === 1
    );


    if (
        resultados.length === 0
    ) {

        productGrid.innerHTML = `

            <div class="search-empty">

                <h3>
                    Nenhum produto encontrado
                </h3>

                <p>
                    Tente outra categoria
                    ou outro termo de busca.
                </p>

            </div>

        `;

        return;

    }


    productGrid.innerHTML =
        resultados
            .map(
                criarCardProduto
            )
            .join("");


    conectarBotoesComprar();

}


// =========================================================
// CARD
// =========================================================

function criarCardProduto(
    produto
) {

    const preco =
        Number(produto.preco);


    const precoFormatado =
        new Intl.NumberFormat(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        ).format(preco);


    return `

        <article class="product-card">

            <div class="product-card__image">

                ${
                    produto.destaque
                        ? `
                            <span
                                class="product-card__badge"
                            >
                                Mais vendido
                            </span>
                          `
                        : ""
                }

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >

            </div>


            <div class="product-card__body">

                <p class="product-card__category">
                    ${produto.categoria}
                </p>


                <h3>
                    ${produto.nome}
                </h3>


                <p class="product-card__description">
                    ${produto.descricao}
                </p>


                <div class="product-card__footer">

                    <div>

                        <span class="price-label">
                            A partir de
                        </span>

                        <strong class="price">
                            ${precoFormatado}
                        </strong>

                    </div>


                    <button
                        type="button"
                        class="button button--small"
                        data-product-id="${produto.id}"
                    >
                        Comprar
                    </button>

                </div>

            </div>

        </article>

    `;

}


// =========================================================
// BOTÕES COMPRAR
// =========================================================
//
// IMPORTANTE:
// Não duplicamos a lógica do carrinho aqui.
// O evento existente do seu app continua responsável
// pelo comportamento do carrinho.
//
// Se seu app usa delegation no .product-grid,
// nenhum código adicional será necessário.
//
// =========================================================

function conectarBotoesComprar() {

    console.log(
        "Botões Comprar atualizados:",
        productGrid.querySelectorAll(
            "[data-product-id]"
        ).length
    );

}


// =========================================================
// EXPÕE FUNÇÃO DE BUSCA
// =========================================================

export function atualizarTermoBusca(
    termo
) {

    filtroState.termo =
        termo;


    aplicarFiltros();

}