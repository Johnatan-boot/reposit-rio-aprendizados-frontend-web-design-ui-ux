// =========================================================
// ADDRESS FORM — WEB COMPONENT
// =========================================================

class AddressForm extends HTMLElement {
  constructor() {
    super();

    this.enviarDados =
      this.enviarDados.bind(this);
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
             CEP E ESTADO
        ============================================== -->

        <div class="checkout-form__grid">

          <!-- ===========================================
               CEP
          ============================================ -->

          <div class="form-field">

            <label for="address-cep">
              CEP
            </label>

            <input
              id="address-cep"
              name="cep"
              type="text"
              placeholder="00000-000"
              autocomplete="postal-code"
              required
            >

          </div>

          <!-- ===========================================
               ESTADO
          ============================================ -->

          <div class="form-field">

            <label for="address-state">
              Estado
            </label>

            <select
              id="address-state"
              name="state"
              autocomplete="address-level1"
              required
            >
              <option value="">
                Selecione
              </option>

              <option value="SP">
                São Paulo
              </option>

              <option value="RJ">
                Rio de Janeiro
              </option>

              <option value="MG">
                Minas Gerais
              </option>

              <option value="PR">
                Paraná
              </option>

              <option value="SC">
                Santa Catarina
              </option>
            </select>

          </div>

        </div>

        <!-- =============================================
             ENDEREÇO
        ============================================== -->

        <div class="form-field">

          <label for="address-street">
            Endereço
          </label>

          <input
            id="address-street"
            name="street"
            type="text"
            placeholder="Rua, avenida..."
            autocomplete="street-address"
            required
          >

        </div>

        <!-- =============================================
             NÚMERO, COMPLEMENTO E BAIRRO
        ============================================== -->

        <div class="checkout-form__grid checkout-form__grid--three">

          <!-- ===========================================
               NÚMERO
          ============================================ -->

          <div class="form-field">

            <label for="address-number">
              Número
            </label>

            <input
              id="address-number"
              name="number"
              type="text"
              placeholder="123"
              autocomplete="address-line2"
              required
            >

          </div>

          <!-- ===========================================
               COMPLEMENTO
          ============================================ -->

          <div class="form-field">

            <label for="address-complement">
              Complemento
            </label>

            <input
              id="address-complement"
              name="complement"
              type="text"
              placeholder="Apto, bloco..."
              autocomplete="address-line2"
            >

          </div>

          <!-- ===========================================
               BAIRRO
          ============================================ -->

          <div class="form-field">

            <label for="address-neighborhood">
              Bairro
            </label>

            <input
              id="address-neighborhood"
              name="neighborhood"
              type="text"
              placeholder="Seu bairro"
              autocomplete="address-level3"
              required
            >

          </div>

        </div>

        <!-- =============================================
             CIDADE
        ============================================== -->

        <div class="checkout-form__grid">

          <div class="form-field">

            <label for="address-city">
              Cidade
            </label>

            <input
              id="address-city"
              name="city"
              type="text"
              placeholder="São Paulo"
              autocomplete="address-level2"
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
      this.enviarDados,
    );

    form.addEventListener(
      "change",
      this.enviarDados,
    );
  }

  // =======================================================
  // ENVIAR DADOS PARA O CHECKOUT
  // =======================================================

  enviarDados() {
    const form = this.querySelector("form");

    if (!form) {
      return;
    }

    const formData = new FormData(form);

    const addressData = {
      cep: formData.get("cep")?.toString() || "",

      street:
        formData.get("street")?.toString() || "",

      number:
        formData.get("number")?.toString() || "",

      complement:
        formData.get("complement")?.toString() || "",

      neighborhood:
        formData.get("neighborhood")?.toString() || "",

      city:
        formData.get("city")?.toString() || "",

      state:
        formData.get("state")?.toString() || "",
    };

    this.dispatchEvent(
      new CustomEvent(
        "checkout:address-change",
        {
          detail: addressData,
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
      this.enviarDados,
    );

    form.removeEventListener(
      "change",
      this.enviarDados,
    );
  }
}

// =========================================================
// REGISTRAR WEB COMPONENT
// =========================================================

if (!customElements.get("address-form")) {
  customElements.define(
    "address-form",
    AddressForm,
  );
}