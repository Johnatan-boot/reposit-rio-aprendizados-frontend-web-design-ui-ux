// =========================================================
// PAYMENT FORM — WEB COMPONENT
// =========================================================

class PaymentForm extends HTMLElement {
  constructor() {
    super();

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
      <form class="checkout-form">

        <fieldset class="payment-options">

          <legend>
            Forma de pagamento
          </legend>

          <!-- ===========================================
               PIX
          ============================================ -->

          <label class="payment-option">

            <input
              type="radio"
              name="payment"
              value="pix"
              required
            >

            <span>

              <strong>
                PIX
              </strong>

              <small>
                Pagamento instantâneo
              </small>

            </span>

          </label>

          <!-- ===========================================
               CARTÃO
          ============================================ -->

          <label class="payment-option">

            <input
              type="radio"
              name="payment"
              value="card"
            >

            <span>

              <strong>
                Cartão
              </strong>

              <small>
                Crédito ou débito
              </small>

            </span>

          </label>

          <!-- ===========================================
               DINHEIRO
          ============================================ -->

          <label class="payment-option">

            <input
              type="radio"
              name="payment"
              value="cash"
            >

            <span>

              <strong>
                Dinheiro
              </strong>

              <small>
                Pagamento na entrega
              </small>

            </span>

          </label>

        </fieldset>

      </form>
    `;
  }

  // =======================================================
  // CONFIGURAR EVENTOS
  // =======================================================

  configurarEventos() {
    const form = this.querySelector("form");

    if (!form) {
      return;
    }

    form.addEventListener(
      "change",
      this.handlePaymentChange,
    );
  }

  // =======================================================
  // ALTERAÇÃO DO PAGAMENTO
  // =======================================================

  handlePaymentChange(event) {
    if (
      event.target.name !== "payment"
    ) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent(
        "checkout:payment-change",
        {
          detail: {
            method: event.target.value,
          },

          bubbles: true,
        },
      ),
    );
  }

  // =======================================================
  // COMPONENTE DESCONECTADO
  // =======================================================

  disconnectedCallback() {
    const form = this.querySelector("form");

    if (!form) {
      return;
    }

    form.removeEventListener(
      "change",
      this.handlePaymentChange,
    );
  }
}

// =========================================================
// REGISTRAR WEB COMPONENT
// =========================================================

if (!customElements.get("payment-form")) {
  customElements.define(
    "payment-form",
    PaymentForm,
  );
}