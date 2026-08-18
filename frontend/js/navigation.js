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
       CONSTANTES
       ===================================================== */

    const DESKTOP_BREAKPOINT = 1024;

    /* =====================================================
       CONTROLE DO MENU
       ===================================================== */

    const setMenuState = (isOpen, { returnFocus = false } = {}) => {
        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Fechar menu"
                : "Abrir menu"
        );

        menuIcon.textContent = isOpen ? "×" : "☰";

        mainNav.classList.toggle(
            "main-nav--open",
            isOpen
        );

        if (returnFocus) {
            menuButton.focus();
        }
    };

    /* =====================================================
       ABRIR / FECHAR MENU
       ===================================================== */

    menuButton.addEventListener("click", () => {
        const isOpen =
            menuButton.getAttribute("aria-expanded") === "true";

        setMenuState(!isOpen);
    });

    /* =====================================================
       FECHAR AO CLICAR EM LINK
       ===================================================== */

    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            setMenuState(false);
        });
    });

    /* =====================================================
       FECHAR COM ESC
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

        setMenuState(false, {
            returnFocus: true
        });
    });

    /* =====================================================
       RESPONSIVIDADE
       ===================================================== */

    window.addEventListener("resize", () => {
        if (window.innerWidth <= DESKTOP_BREAKPOINT) {
            return;
        }

        setMenuState(false);
    });
});