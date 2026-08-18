// =========================================================
// FORMATADOR DE MOEDA
// =========================================================

/**
 * Formata um número para o padrão monetário brasileiro.
 *
 * Exemplo:
 *
 * 109.90
 * ↓
 * R$ 109,90
 */
export function formatCurrency(value) {

    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}