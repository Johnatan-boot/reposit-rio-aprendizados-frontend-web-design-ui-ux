# 🎨 Casa de Tintas — Design System

> Sistema visual desenvolvido para manter consistência,
> acessibilidade e reutilização entre as interfaces do projeto.

---

## 1. Objetivo

O Design System da Casa de Tintas estabelece uma linguagem
visual consistente para todas as páginas da aplicação.

Ele define:

- cores;
- tipografia;
- espaçamento;
- bordas;
- sombras;
- componentes;
- estados de interação;
- acessibilidade;
- responsividade.

A proposta é separar:

**conteúdo → estrutura → apresentação → interação**

---

# 2. Design Tokens

Os valores fundamentais da interface estão centralizados em:

```text
css/tokens.css




# Casa de Tintas — Design System

## Visão

O Design System da Casa de Tintas representa a camada visual
e comportamental compartilhada da interface.

Ele foi construído a partir de quatro fundamentos:

1. Consistência
2. Acessibilidade
3. Reutilização
4. Clareza

---

## Arquitetura

```text
Design Tokens
      ↓
CSS Foundation
      ↓
Components
      ↓
Interaction
      ↓
Responsive Behavior
      ↓
Pages



Isso deixa o documento mais arquitetural.

---

# 7. Estrutura final

Depois dessas mudanças, quero que sua estrutura fique aproximadamente:

```text
treinando-ap-frontend/
│
├── frontend/
│   │
│   ├── assets/
│   │
│   ├── css/
│   │   ├── base.css
│   │   ├── category-card.css
│   │   ├── category-grid.css
│   │   ├── elements-click.css
│   │   ├── hero__content.css
│   │   ├── hero__visual.css
│   │   ├── inspiration-card.css
│   │   ├── media.css
│   │   ├── product-card.css
│   │   ├── product-grid.css
│   │   ├── style.css
│   │   ├── tokens.css
│   │   └── ux.css
│   │
│   ├── js/
│   │   └── navigation.js
│   │
│   ├── Doc/
│   │   ├── _logica_UI.txt
│   │   ├── _logica_negocio.txt
│   │   ├── _notas_ap_webd.txt
│   │   ├── _wireframe_visual.txt
│   │   └── design-system.md
│   │
│   └── views/
│       ├── home.html
│       └── html-semantico.html
│
├── README.md
└── package.json