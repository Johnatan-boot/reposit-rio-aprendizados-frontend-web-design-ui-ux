// =========================================================
// FOOTER
// =========================================================

class Footer extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `

            <footer class="site-footer">

                <div class="container footer-grid">

                    <div>

                        <a
                            class="brand brand--footer"
                            href="/"
                            aria-label="Casa de Tintas — página inicial"
                        >

                            <span class="brand__mark">
                                CT
                            </span>

                            <span class="brand__name">
                                Casa de Tintas
                            </span>

                        </a>

                        <p>
                            Cores que transformam espaços e histórias.
                        </p>

                    </div>


                    <nav aria-label="Produtos">

                        <h2>
                            Produtos
                        </h2>

                        <ul>

                            <li>
                                <a href="#">
                                    Tintas
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Esmaltes
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Texturas
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Complementos
                                </a>
                            </li>

                        </ul>

                    </nav>


                    <nav aria-label="Empresa">

                        <h2>
                            Empresa
                        </h2>

                        <ul>

                            <li>
                                <a href="#">
                                    Sobre nós
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Contato
                                </a>
                            </li>

                            <li>
                                <a href="#">
                                    Política de privacidade
                                </a>
                            </li>

                        </ul>

                    </nav>


                    <address>

                        <h2>
                            Fale conosco
                        </h2>

                        <p>
                            <a href="tel:+5511999999999">
                                (11) 99999-9999
                            </a>
                        </p>

                        <p>
                            <a href="mailto:contato@casadetintas.com.br">
                                contato@casadetintas.com.br
                            </a>
                        </p>

                    </address>

                </div>


                <div class="footer-bottom">

                    <div class="container">

                        <p>
                            &copy;
                            <time datetime="2026">
                                2026
                            </time>
                            Casa de Tintas.
                            Todos os direitos reservados.
                        </p>

                    </div>

                </div>

            </footer>

        `;
    }
}


// =========================================================
// CUSTOM ELEMENT
// =========================================================

customElements.define(
    "site-footer",
    Footer
);