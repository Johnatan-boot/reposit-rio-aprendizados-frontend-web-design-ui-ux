import {
    atualizarTermoBusca
} from "./filter.js";

// =========================================================
// CASA DE TINTAS
// PESQUISA DE PRODUTOS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // ELEMENTOS
    // =====================================================

    const searchButton =
        document.querySelector("#search-button");

    const searchContainer =
        document.querySelector("#search-container");

    const searchInput =
        document.querySelector("#product-search");


    // =====================================================
    // VALIDAÇÃO
    // =====================================================

    if (
        !searchButton ||
        !searchContainer ||
        !searchInput
    ) {

        console.warn(
            "Elementos da pesquisa não encontrados."
        );

        return;

    }


    // =====================================================
    // PRODUTOS
    // =====================================================

    let produtos = [];


    // =====================================================
    // CARREGAR PRODUTOS
    // =====================================================

    async function carregarProdutos() {

        try {

            const response =
                await fetch(
                    "/frontend/js/data/produtos.json"
                );


            if (!response.ok) {

                throw new Error(
                    `Erro HTTP: ${response.status}`
                );

            }


            produtos =
                await response.json();


            console.log(
                "Produtos carregados para pesquisa:",
                produtos
            );


        } catch (error) {

            console.error(
                "Erro ao carregar produtos para pesquisa:",
                error
            );

        }

    }


    // =====================================================
    // ABRIR / FECHAR PESQUISA
    // =====================================================

    searchButton.addEventListener(
        "click",
        () => {

            const isOpen =
                searchButton.getAttribute(
                    "aria-expanded"
                ) === "true";


            const nextState =
                !isOpen;


            searchButton.setAttribute(
                "aria-expanded",
                String(nextState)
            );


            searchContainer.hidden =
                !nextState;


            if (nextState) {

                searchInput.focus();

            } else {

                searchInput.value = "";

                mostrarTodosProdutos();

            }

        }
    );


    // =====================================================
    // ESC
    // =====================================================

    searchInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Escape") {

                return;

            }


            searchButton.click();

            searchButton.focus();

        }
    );


    // =====================================================
    // PESQUISA
    // =====================================================

    searchInput.addEventListener(
        "input",
        (event) => {

            const termo =
                normalizarTexto(
                    event.target.value
                );


            filtrarProdutos(termo);

        }
    );


    // =====================================================
    // NORMALIZA TEXTO
    // =====================================================

    function normalizarTexto(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .trim();

    }


    // =====================================================
    // FILTRAR PRODUTOS
    // =====================================================

    function filtrarProdutos(termo) {

        if (!termo) {

            mostrarTodosProdutos();

            return;

        }


        const resultados =
            produtos.filter(
                (produto) => {

                    const nome =
                        normalizarTexto(
                            produto.nome || ""
                        );


                    const descricao =
                        normalizarTexto(
                            produto.descricao || ""
                        );


                    const categoria =
                        normalizarTexto(
                            produto.categoria || ""
                        );


                    return (
                        nome.includes(termo) ||
                        descricao.includes(termo) ||
                        categoria.includes(termo)
                    );

                }
            );


        renderizarResultados(resultados);

    }


    // =====================================================
    // MOSTRAR TODOS
    // =====================================================

    function mostrarTodosProdutos() {

        renderizarResultados(produtos);

    }


    function renderizarResultados(resultados) {

    const productGrid =
        document.querySelector(
            ".product-grid"
        );


    if (!productGrid) {

        console.warn(
            "Product grid não encontrado."
        );

        return;

    }


    // =====================================================
    // CONTROLE DE LAYOUT DOS RESULTADOS
    // =====================================================

    productGrid.classList.toggle(
        "product-grid--search-result",
        resultados.length === 1
    );


    // =====================================================
    // NENHUM RESULTADO
    // =====================================================

    if (resultados.length === 0) {

        productGrid.innerHTML = `

            <div class="search-empty">

                <h3>
                    Nenhum produto encontrado
                </h3>

                <p>
                    Tente buscar por outro nome,
                    categoria ou descrição.
                </p>

            </div>

        `;

        return;

    }


    // =====================================================
    // RENDERIZAÇÃO
    // =====================================================

    productGrid.innerHTML =
        resultados
            .map(
                criarCardProduto
            )
            .join("");

}

    // =====================================================
    // CARD DO PRODUTO
    // =====================================================

    function criarCardProduto(produto) {

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

                    <p
                        class="product-card__category"
                    >
                        ${produto.categoria}
                    </p>


                    <h3>
                        ${produto.nome}
                    </h3>


                    <p
                        class="product-card__description"
                    >
                        ${produto.descricao}
                    </p>


                    <div
                        class="product-card__footer"
                    >

                        <div>

                            <span
                                class="price-label"
                            >
                                A partir de
                            </span>


                            <strong
                                class="price"
                            >
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


    // =====================================================
    // INICIALIZA
    // =====================================================

    carregarProdutos();

});