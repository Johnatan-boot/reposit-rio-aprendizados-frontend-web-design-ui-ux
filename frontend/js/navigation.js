/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.querySelector(".menu-button");
    const menuIcon = document.querySelector(".menu-button__icon");
    const mainNav = document.querySelector(".main-nav");

    if (!menuButton || !menuIcon || !mainNav) {
        console.warn("Menu mobile não encontrado.");
        return;
    }


    /* =====================================================
       ABRIR / FECHAR MENU
       ===================================================== */

    menuButton.addEventListener("click", () => {

        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        const nextState = !isOpen;


        /* Estado acessível */

        menuButton.setAttribute(
            "aria-expanded",
            String(nextState)
        );


        menuButton.setAttribute(
            "aria-label",
            nextState
                ? "Fechar menu"
                : "Abrir menu"
        );


        /* Ícone */

        menuIcon.textContent =
            nextState
                ? "×"
                : "☰";


        /* Menu */

        mainNav.classList.toggle(
            "main-nav--open",
            nextState
        );

    });


    /* =====================================================
       FECHAR MENU AO CLICAR EM UM LINK
       ===================================================== */

    mainNav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove(
                "main-nav--open"
            );


            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            menuButton.setAttribute(
                "aria-label",
                "Abrir menu"
            );


            menuIcon.textContent = "☰";

        });

    });


    /* =====================================================
       FECHAR MENU COM ESC
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }


        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";


        if (!isOpen) {
            return;
        }


        mainNav.classList.remove(
            "main-nav--open"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        menuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );


        menuIcon.textContent = "☰";


        menuButton.focus();

    });


    /* =====================================================
       RESPONSIVIDADE
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth <= 1024) {
            return;
        }


        mainNav.classList.remove(
            "main-nav--open"
        );


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        menuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );


        menuIcon.textContent = "☰";

    });

});