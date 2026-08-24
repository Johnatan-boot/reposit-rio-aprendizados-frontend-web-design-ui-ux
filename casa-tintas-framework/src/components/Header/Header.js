class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
           <header class="site-header">
      <!-- =====================================================
       TOPBAR
       ===================================================== -->

      <div class="topbar">
        <div class="container topbar__content">
          <p>
            <strong>Entrega rápida</strong>
            para sua região
          </p>

          <p>
            Atendimento:
            <a href="tel:+5511999999999"> (11) 99999-9999 </a>
          </p>

          <p>
            <span aria-hidden="true">📍</span>
            Nossa loja
          </p>
        </div>
      </div>

      <!-- =====================================================
       NAVBAR
       ===================================================== -->

      <div class="navbar">
        <div class="container navbar__content">
          <!-- =================================================
           BRAND
           ================================================= -->

          <a
            class="brand"
            href="/"
            aria-label="Casa de Tintas — página inicial"
          >
            <span class="brand__mark">CT</span>

            <span class="brand__name"> Casa de Tintas </span>
          </a>

          <!-- =================================================
           MAIN NAVIGATION
           ================================================= -->

          <nav
            id="main-navigation"
            class="main-nav"
            aria-label="Navegação principal"
          >
            <ul>
              <li>
                <a href="#produtos"> Produtos </a>
              </li>

              <li>
                <a href="#categorias"> Categorias </a>
              </li>

              <li>
                <a href="#cores"> Cores </a>
              </li>

              <li>
                <a href="#inspiracoes"> Inspiração </a>
              </li>

              <li>
                <a href="#contato"> Contato </a>
              </li>
            </ul>
          </nav>

          <!-- =================================================
           ACTIONS
           ================================================= -->

          <div class="navbar__actions">
            <!-- Busca -->

            <button
              type="button"
              class="icon-button search-button"
              id="search-button"
              aria-label="Pesquisar produtos"
              aria-expanded="false"
              aria-controls="search-container"
            >
              <span aria-hidden="true">🔍</span>
            </button>

            <!-- Carrinho -->

            <button
              type="button"
              class="icon-button"
              id="cart-button"
              aria-label="Abrir carrinho de compras"
            >
              <span aria-hidden="true"> 🛒 </span>

              <span class="cart-count" aria-label="0 produtos no carrinho">
                0
              </span>
            </button>

            <!-- Menu Mobile -->

            <button
              type="button"
              class="menu-button"
              aria-label="Abrir menu"
              aria-expanded="false"
              aria-controls="main-navigation"
            >
              <span class="menu-button__icon" aria-hidden="true"> ☰ </span>
            </button>
          </div>
        </div>

        <!-- ===================================================
         SEARCH
         =================================================== -->

        <div class="search-container" id="search-container" hidden>
          <div class="container">
            <label for="product-search" class="sr-only">
              Pesquisar produtos
            </label>

            <input
              type="search"
              id="product-search"
              class="search-input"
              placeholder="Buscar produtos..."
              autocomplete="off"
            />
          </div>
        </div>
      </div>
    </header>
        `;
    }
}

customElements.define("site-header", Header);