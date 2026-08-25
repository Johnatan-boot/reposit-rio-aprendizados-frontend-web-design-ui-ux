// =========================================================
// CHECKOUT — WEB COMPONENT
// =========================================================

class Checkout extends HTMLElement {
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

          <!-- =========================================
               CABEÇALHO
          ========================================== -->

          <header class="checkout__header">

            <p class="eyebrow">
              FINALIZE SUA COMPRA
            </p>

            <h1 id="checkout-title">
              Checkout
            </h1>

            <p>
              Confira seus dados e finalize seu pedido.
            </p>

          </header>

          <!-- =========================================
               LAYOUT
          ========================================== -->

          <div class="checkout__layout">

            <!-- =======================================
                 CONTEÚDO PRINCIPAL
            ======================================== -->

            <main class="checkout__main">

              <!-- =====================================
                   1 — DADOS DO CLIENTE
              ====================================== -->

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

              <!-- =====================================
                   2 — ENDEREÇO
              ====================================== -->

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

              <!-- =====================================
                   3 — PAGAMENTO
              ====================================== -->

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

            <!-- =======================================
                 RESUMO DO PEDIDO
            ======================================== -->

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
  }

  // =======================================================
  // DADOS DO CLIENTE
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
  // DESCONECTAR COMPONENTE
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
  }
}

// =========================================================
// REGISTRAR WEB COMPONENT
// =========================================================

if (!customElements.get("checkout-page")) {
  customElements.define("checkout-page", Checkout);
}