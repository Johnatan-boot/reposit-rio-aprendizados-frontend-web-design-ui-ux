// =========================================================
// CHECKOUT PAGE — WEB COMPONENT
// =========================================================

class CheckoutPage extends HTMLElement {
  constructor() {
    super();

    this.checkoutData = {
      customer: {
        name: "",
        email: "",
        phone: "",
      },

      address: {
        cep: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
      },

      payment: {
        method: "",
      },
    };

    this.handleCustomerChange =
      this.handleCustomerChange.bind(this);

    this.handleAddressChange =
      this.handleAddressChange.bind(this);

    this.handlePaymentChange =
      this.handlePaymentChange.bind(this);

    this.handleReviewOrder =
      this.handleReviewOrder.bind(this);
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
    this.innerHTML = `
      <section
        class="checkout"
        aria-labelledby="checkout-title"
      >

        <div class="container">

          <!-- =============================================
               CABEÇALHO
          ============================================== -->

          <header class="checkout__header">

            <p class="eyebrow">
              FINALIZE SEU PEDIDO
            </p>

            <h1 id="checkout-title">
              Checkout
            </h1>

            <p>
              Confira seu pedido e informe seus dados
              para finalizar a compra.
            </p>

          </header>

          <!-- =============================================
               LAYOUT
          ============================================== -->

          <div class="checkout__layout">

            <!-- ===========================================
                 CONTEÚDO PRINCIPAL
            ============================================ -->

            <main class="checkout__main">

              <!-- =========================================
                   1 — CLIENTE
              ========================================== -->

              <section class="checkout-section">

                <div class="checkout-section__header">

                  <span class="checkout-section__number">
                    1
                  </span>

                  <div>

                    <h2>
                      Dados do cliente
                    </h2>

                    <p>
                      Informe seus dados para continuar.
                    </p>

                  </div>

                </div>

                <customer-form></customer-form>

              </section>

              <!-- =========================================
                   2 — ENDEREÇO
              ========================================== -->

              <section class="checkout-section">

                <div class="checkout-section__header">

                  <span class="checkout-section__number">
                    2
                  </span>

                  <div>

                    <h2>
                      Endereço de entrega
                    </h2>

                    <p>
                      Para onde devemos enviar seu pedido?
                    </p>

                  </div>

                </div>

                <address-form></address-form>

              </section>

              <!-- =========================================
                   3 — PAGAMENTO
              ========================================== -->

              <section class="checkout-section">

                <div class="checkout-section__header">

                  <span class="checkout-section__number">
                    3
                  </span>

                  <div>

                    <h2>
                      Pagamento
                    </h2>

                    <p>
                      Escolha uma forma de pagamento.
                    </p>

                  </div>

                </div>

                <payment-form></payment-form>

              </section>

            </main>

            <!-- ===========================================
                 RESUMO
            ============================================ -->

            <aside
              class="checkout__sidebar"
              aria-label="Resumo do pedido"
            >

              <order-summary></order-summary>

            </aside>

          </div>

        </div>

      </section>
    `;
  }

  // =======================================================
  // CONFIGURAR EVENTOS
  // =======================================================

  configurarEventos() {
    this.addEventListener(
      "checkout:customer-change",
      this.handleCustomerChange,
    );

    this.addEventListener(
      "checkout:address-change",
      this.handleAddressChange,
    );

    this.addEventListener(
      "checkout:payment-change",
      this.handlePaymentChange,
    );

    this.addEventListener(
      "checkout:review-order",
      this.handleReviewOrder,
    );
  }

  // =======================================================
  // CLIENTE
  // =======================================================

  handleCustomerChange(event) {
    this.checkoutData.customer = {
      ...this.checkoutData.customer,
      ...event.detail,
    };
  }

  // =======================================================
  // ENDEREÇO
  // =======================================================

  handleAddressChange(event) {
    this.checkoutData.address = {
      ...this.checkoutData.address,
      ...event.detail,
    };
  }

  // =======================================================
  // PAGAMENTO
  // =======================================================

  handlePaymentChange(event) {
    this.checkoutData.payment = {
      ...this.checkoutData.payment,
      ...event.detail,
    };
  }

  // =======================================================
  // REVISAR PEDIDO
  // =======================================================

  handleReviewOrder() {
    if (!this.validarCheckout()) {
      return;
    }

    console.log(
      "Dados do checkout:",
      this.checkoutData,
    );

    alert(
      "Pedido pronto para revisão.",
    );
  }

  // =======================================================
  // VALIDAR CHECKOUT
  // =======================================================

  validarCheckout() {
    const {
      customer,
      address,
      payment,
    } = this.checkoutData;

    // =====================================================
    // CLIENTE
    // =====================================================

    if (
      !customer.name ||
      !customer.email ||
      !customer.phone
    ) {
      alert(
        "Preencha todos os dados do cliente.",
      );

      return false;
    }

    // =====================================================
    // ENDEREÇO
    // =====================================================

    if (
      !address.cep ||
      !address.street ||
      !address.number ||
      !address.neighborhood ||
      !address.city ||
      !address.state
    ) {
      alert(
        "Preencha todos os dados de endereço.",
      );

      return false;
    }

    // =====================================================
    // PAGAMENTO
    // =====================================================

    if (!payment.method) {
      alert(
        "Selecione uma forma de pagamento.",
      );

      return false;
    }

    return true;
  }

  // =======================================================
  // DESCONECTAR
  // =======================================================

  disconnectedCallback() {
    this.removeEventListener(
      "checkout:customer-change",
      this.handleCustomerChange,
    );

    this.removeEventListener(
      "checkout:address-change",
      this.handleAddressChange,
    );

    this.removeEventListener(
      "checkout:payment-change",
      this.handlePaymentChange,
    );

    this.removeEventListener(
      "checkout:review-order",
      this.handleReviewOrder,
    );
  }
}

// =========================================================
// REGISTRAR WEB COMPONENT
// =========================================================

if (!customElements.get("checkout-page")) {
  customElements.define(
    "checkout-page",
    CheckoutPage,
  );
}