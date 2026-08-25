// =========================================================
// CASA DE TINTAS
// PRODUCT CONTROLLER
// Único ponto de verdade para: pesquisa, filtros, ordenação
// e renderização dos Product Cards.
//
// Fluxo:
//   Produtos → Pesquisa → Filtros → Ordenação → Product Cards
// =========================================================

import { buscarProdutos } from "./services/product-service.js";
import { formatCurrency } from "./utils/currency.js";

// =========================================================
// ESTADO DOS FILTROS
// =========================================================

const state = {
    termo: "",
    categoria: "todos",
    precoMax: null,
    ordenacao: "relevancia",
};

let produtosCache = [];

let productGrid;
let filtersContainer;
let searchButton;
let searchContainer;
let searchInput;

// =========================================================
// INICIALIZAÇÃO
// =========================================================

export async function inicializarProdutos() {
    productGrid = document.querySelector("product-grid");
    filtersContainer = document.querySelector(".product-filters");

    searchButton = document.querySelector("#search-button");
    searchContainer = document.querySelector("#search-container");
    searchInput = document.querySelector("#product-search");

    if (!productGrid) {
        console.warn("product-grid não encontrado.");
        return;
    }

    conectarPesquisa();

    try {
        produtosCache = await buscarProdutos();
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);

        productGrid.innerHTML = `
            <p>Não foi possível carregar os produtos.</p>
        `;

        return;
    }

    renderizarFiltros();
    aplicarPipeline();
}

// =========================================================
// PESQUISA (abrir/fechar + digitação)
// =========================================================

function conectarPesquisa() {
    if (!searchInput) {
        return;
    }

    if (searchButton && searchContainer) {
        searchButton.addEventListener("click", () => {
            const isOpen = searchButton.getAttribute("aria-expanded") === "true";
            const nextState = !isOpen;

            searchButton.setAttribute("aria-expanded", String(nextState));
            searchContainer.hidden = !nextState;

            if (nextState) {
                searchInput.focus();
            } else {
                searchInput.value = "";
                state.termo = "";
                aplicarPipeline();
            }
        });

        searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                searchButton.click();
                searchButton.focus();
            }
        });
    }

    searchInput.addEventListener("input", (event) => {
        state.termo = event.target.value;
        aplicarPipeline();
    });
}

// =========================================================
// RENDERIZAR CONTROLES DE FILTRO (categoria, preço, ordenação)
// =========================================================

function renderizarFiltros() {
    if (!filtersContainer) {
        console.warn("Container de filtros não encontrado.");
        return;
    }

    const categorias = obterCategorias(produtosCache);
    const precos = produtosCache.map((produto) => Number(produto.preco));
    const precoMinimo = precos.length ? Math.floor(Math.min(...precos)) : 0;
    const precoMaximo = precos.length ? Math.ceil(Math.max(...precos)) : 0;

    state.precoMax = precoMaximo;

    filtersContainer.innerHTML = `
        <div
            class="product-filters__group"
            role="group"
            aria-label="Filtrar produtos por categoria"
        >
            <button type="button" class="filter-button filter-button--active" data-category="todos">
                Todos
            </button>
            ${categorias
                .map(
                    (categoria) => `
                        <button type="button" class="filter-button" data-category="${categoria}">
                            ${categoria}
                        </button>
                    `
                )
                .join("")}
        </div>

        <div class="product-filters__row">
            <label class="product-filters__price" for="price-range">
                Até
                <strong class="product-filters__price-value">
                    ${formatCurrency(precoMaximo)}
                </strong>
                <input
                    type="range"
                    id="price-range"
                    min="${precoMinimo}"
                    max="${precoMaximo}"
                    step="1"
                    value="${precoMaximo}"
                />
            </label>

            <label class="product-filters__sort" for="sort-select">
                Ordenar por
                <select id="sort-select">
                    <option value="relevancia">Relevância</option>
                    <option value="menor-preco">Menor preço</option>
                    <option value="maior-preco">Maior preço</option>
                    <option value="nome-az">Nome (A–Z)</option>
                    <option value="nome-za">Nome (Z–A)</option>
                </select>
            </label>
        </div>
    `;

    conectarEventosFiltro(precoMaximo);
}

function obterCategorias(produtos) {
    return [...new Set(produtos.map((produto) => produto.categoria).filter(Boolean))];
}

// =========================================================
// EVENTOS DOS FILTROS
// =========================================================

function conectarEventosFiltro() {
    // -------------------------------------------------
    // CATEGORIA
    // -------------------------------------------------

    const botoesCategoria = filtersContainer.querySelectorAll(".filter-button");

    botoesCategoria.forEach((botao) => {
        botao.addEventListener("click", () => {
            state.categoria = botao.dataset.category;

            botoesCategoria.forEach((b) => b.classList.remove("filter-button--active"));
            botao.classList.add("filter-button--active");

            aplicarPipeline();
        });
    });

    // -------------------------------------------------
    // FAIXA DE PREÇO
    // -------------------------------------------------

    const priceRange = filtersContainer.querySelector("#price-range");
    const priceValue = filtersContainer.querySelector(".product-filters__price-value");

    if (priceRange) {
        priceRange.addEventListener("input", () => {
            state.precoMax = Number(priceRange.value);

            if (priceValue) {
                priceValue.textContent = formatCurrency(state.precoMax);
            }

            aplicarPipeline();
        });
    }

    // -------------------------------------------------
    // ORDENAÇÃO
    // -------------------------------------------------

    const sortSelect = filtersContainer.querySelector("#sort-select");

    if (sortSelect) {
        sortSelect.addEventListener("change", () => {
            state.ordenacao = sortSelect.value;
            aplicarPipeline();
        });
    }
}

// =========================================================
// NORMALIZA TEXTO (remove acentos, minúsculas)
// =========================================================

function normalizarTexto(texto) {
    return String(texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

// =========================================================
// PIPELINE: PESQUISA → CATEGORIA → PREÇO → ORDENAÇÃO
// =========================================================

function aplicarPipeline() {
    let resultado = [...produtosCache];

    // Pesquisa por nome / descrição / categoria
    const termo = normalizarTexto(state.termo);

    if (termo) {
        resultado = resultado.filter((produto) => {
            const textoProduto = normalizarTexto(
                [produto.nome, produto.descricao, produto.categoria].filter(Boolean).join(" ")
            );

            return textoProduto.includes(termo);
        });
    }

    // Categoria
    if (state.categoria && state.categoria !== "todos") {
        resultado = resultado.filter(
            (produto) => normalizarTexto(produto.categoria) === normalizarTexto(state.categoria)
        );
    }

    // Faixa de preço
    if (state.precoMax !== null) {
        resultado = resultado.filter((produto) => Number(produto.preco) <= state.precoMax);
    }

    // Ordenação
    resultado = ordenar(resultado, state.ordenacao);

    renderizarResultado(resultado);
}

function ordenar(lista, tipo) {
    const copia = [...lista];

    switch (tipo) {
        case "menor-preco":
            return copia.sort((a, b) => Number(a.preco) - Number(b.preco));

        case "maior-preco":
            return copia.sort((a, b) => Number(b.preco) - Number(a.preco));

        case "nome-az":
            return copia.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

        case "nome-za":
            return copia.sort((a, b) => b.nome.localeCompare(a.nome, "pt-BR"));

        default:
            return copia;
    }
}

// =========================================================
// RENDERIZAÇÃO FINAL (delega ao Web Component <product-grid>)
// =========================================================

function renderizarResultado(resultado) {
    productGrid.data = resultado;

    // Mantém o layout consistente quando há poucos resultados.
    productGrid.classList.toggle("product-grid--search-result", resultado.length === 1);
    productGrid.classList.toggle(
        "product-grid--few",
        resultado.length > 1 && resultado.length <= 2
    );
}
