// =========================================================
// CUSTOMER FORM — WEB COMPONENT
// =========================================================

class CustomerForm extends HTMLElement {
  constructor() {
    super();

    this.handleInput =
      this.handleInput.bind(this);
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

        <!-- =============================================
             NOME
        ============================================== -->

        <div class="form-field">

          <label for="customer-name">
            Nome completo
          </label>

          <input
            id="customer-name"
            name="name"
            type="text"
            placeholder="Digite seu nome"
            autocomplete="name"
            required
          >

        </div>

        <!-- =============================================
             E-MAIL E TELEFONE
        ============================================== -->

        <div class="checkout-form__grid">

          <!-- ===========================================
               E-MAIL
          ============================================ -->

          <div class="form-field">

            <label for="customer-email">
              E-mail
            </label>

            <input
              id="customer-email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              autocomplete="email"
              required
            >

          </div>

          <!-- ===========================================
               TELEFONE
          ============================================ -->

          <div class="form-field">

            <label for="customer-phone">
              Telefone
            </label>

            <input
              id="customer-phone"
              name="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              autocomplete="tel"
              required
            >

          </div>

        </div>

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
      "input",
      this.handleInput,
    );
  }

  // =======================================================
  // INPUT
  // =======================================================

  handleInput() {
    const form = this.querySelector("form");

    if (!form) {
      return;
    }

    const formData = new FormData(form);

    const customerData = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
    };

    this.dispatchEvent(
      new CustomEvent(
        "checkout:customer-change",
        {
          detail: customerData,
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
      "input",
      this.handleInput,
    );
  }
}

// =========================================================
// REGISTRAR WEB COMPONENT
// =========================================================

if (!customElements.get("customer-form")) {
  customElements.define(
    "customer-form",
    CustomerForm,
  );
}