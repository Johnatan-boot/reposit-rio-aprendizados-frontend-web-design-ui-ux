// =========================================================
// ORDER SUMMARY — WEB COMPONENT
// =========================================================

import {
  getState,
} from "../../js/state/store.js";

import {
  formatCurrency,
} from "../../js/utils/currency.js";

// =========================================================
// COMPONENTE
// =========================================================

class OrderSummary extends HTMLElement {
  constructor() {
    super();

    this.handleCartUpdate =
      this.handleCartUpdate.bind(this);

    this.handleSubmit =
      this.handleSubmit.bind(this);
  }

  // =======================================================
  // COMPONENTE CONECTADO
  // =======================================================

  connectedCallback() {
    this.render();
    this.configurarEventos();
  }

  // =======================================================
  // RENDER
  // =======================================================

  render() {
    const state = getState();

    const carrinho = Array.isArray(state.carrinho)
      ? state.carrinho
      : [];

    const subtotal = carrinho.reduce(
      (total, item) => {
        const preco =
          Number(item.preco) || 0;

        const quantidade =
          Number(item.quantidade) || 0;

        return total + preco * quantidade;
      },
      0,
    );

    // =====================================================
    // FRETE
    // =====================================================

    const frete = 0;

    // =====================================================
    // TOTAL
    // =====================================================

    const total = subtotal + frete;

    // =====================================================
    // ITENS
    // =====================================================

    const itensHTML =
      carrinho.length === 0
        ? `
          <p class="order-summary__empty">
            Seu carrinho está vazio.
          </p>
        `
        : carrinho
            .map((item) => {
              const preco =
                Number(item.preco) || 0;

              const quantidade =
                Number(item.quantidade) || 0;

              const subtotalItem =
                preco * quantidade;

              return `
                <div class="order-summary__item">

                  <div>

                    <strong>
                      ${item.nome}
                    </strong>

                    <span>
                      ${quantidade}x
                    </span>

                  </div>

                  <strong>
                    ${formatCurrency(subtotalItem)}
                  </strong>

                </div>
              `;
            })
            .join("");

    // =====================================================
    // HTML
    // =====================================================

    this.innerHTML = `
      <div class="order-summary">

        <!-- =============================================
             TÍTULO
        ============================================== -->

        <h2>
          Resumo do pedido
        </h2>

        <!-- =============================================
             PRODUTOS
        ============================================== -->

        <div class="order-summary__items">

          ${itensHTML}

        </div>

        <!-- =============================================
             TOTAIS
        ============================================== -->

        <div class="order-summary__totals">

          <div>

            <span>
              Subtotal
            </span>

            <strong>
              ${formatCurrency(subtotal)}
            </strong>

          </div>

          <div>

            <span>
              Frete
            </span>

            <strong>
              ${
                frete === 0
                  ? "Grátis"
                  : formatCurrency(frete)
              }
            </strong>

          </div>

          <div class="order-summary__total">

            <span>
              Total
            </span>

            <strong>
              ${formatCurrency(total)}
            </strong>

          </div>

        </div>

        <!-- =============================================
             BOTÃO
        ============================================== -->

        <button
          type="button"
          class="button button--primary order-summary__submit"
        >
          Revisar pedido
        </button>

      </div>
    `;
  }

  // =======================================================
  // CONFIGURAR EVENTOS
  // =======================================================

  configurarEventos() {
    document.addEventListener(
      "cart:updated",
      this.handleCartUpdate,
    );

    const submitButton =
      this.querySelector(
        ".order-summary__submit",
      );

    if (submitButton) {
      submitButton.addEventListener(
        "click",
        this.handleSubmit,
      );
    }
  }

  // =======================================================
  // ATUALIZAR RESUMO
  // =======================================================

  handleCartUpdate() {
    this.render();
    this.configurarBotao();
  }

  // =======================================================
  // CONFIGURAR BOTÃO
  // =======================================================

  configurarBotao() {
    const submitButton =
      this.querySelector(
        ".order-summary__submit",
      );

    if (!submitButton) {
      return;
    }

    submitButton.removeEventListener(
      "click",
      this.handleSubmit,
    );

    submitButton.addEventListener(
      "click",
      this.handleSubmit,
    );
  }

  // =======================================================
  // REVISAR PEDIDO
  // =======================================================

  handleSubmit() {
    const state = getState();

    if (
      !state.carrinho ||
      state.carrinho.length === 0
    ) {
      alert(
        "Seu carrinho está vazio.",
      );

      return;
    }

    const event =
      new CustomEvent(
        "checkout:review-order",
        {
          bubbles: true,
        },
      );

    this.dispatchEvent(event);
  }

  // =======================================================
  // COMPONENTE DESCONECTADO
  // =======================================================

  disconnectedCallback() {
    document.removeEventListener(
      "cart:updated",
      this.handleCartUpdate,
    );

    const submitButton =
      this.querySelector(
        ".order-summary__submit",
      );

    if (submitButton) {
      submitButton.removeEventListener(
        "click",
        this.handleSubmit,
      );
    }
  }
}

// =========================================================
// REGISTRAR WEB COMPONENT
// =========================================================

if (!customElements.get("order-summary")) {
  customElements.define(
    "order-summary",
    OrderSummary,
  );
}