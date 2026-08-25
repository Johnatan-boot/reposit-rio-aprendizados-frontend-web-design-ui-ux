// =========================================================
// UI — MODAL
// Comportamentos reutilizáveis para modais
// =========================================================

let modalAberto = null;
let elementoAnterior = null;

// =========================================================
// ABRIR MODAL
// =========================================================

export function abrirModal(modal, elementoOrigem = null) {

    if (!modal) {
        return;
    }

    modalAberto = modal;

    elementoAnterior =
        elementoOrigem ||
        document.activeElement;

    modal.classList.add("is-open");

    document.body.classList.add("modal-open");

    const elementoFoco =
        modal.querySelector(
            "[data-modal-close], button, input, select, textarea, a"
        );

    if (elementoFoco) {

        requestAnimationFrame(() => {

            elementoFoco.focus();

        });

    }

}

// =========================================================
// FECHAR MODAL
// =========================================================

export function fecharModal(modal = modalAberto) {

    if (!modal) {
        return;
    }

    modal.classList.remove("is-open");

    if (modal === modalAberto) {

        modalAberto = null;

    }

    document.body.classList.remove("modal-open");

    if (
        elementoAnterior &&
        typeof elementoAnterior.focus === "function"
    ) {

        requestAnimationFrame(() => {

            elementoAnterior.focus();

        });

    }

    elementoAnterior = null;

}

// =========================================================
// CLICK NO OVERLAY
// =========================================================

export function configurarFechamentoOverlay(modal) {

    if (!modal) {
        return;
    }

    modal.addEventListener(
        "click",
        (event) => {

            if (event.target === modal) {

                fecharModal(modal);

            }

        }
    );

}

// =========================================================
// ESC
// =========================================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            modalAberto
        ) {

            fecharModal();

        }

    }
);