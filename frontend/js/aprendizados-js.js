// "const" deve ser nossa escolha padrão.
// Usamos quando a referência não será reatribuída.
/**const nome = "Casa de Tintas";

// "let" usamos quando o valor realmente precisa mudar.
let quantidade = 1;

quantidade = 2;

console.log(nome);
console.log(quantidade);


const categoria_tinta = "Tinta Premium";     // string
const preco = 189.90;            // number
const disponivel = true;         // boolean
//const estoque = null;            // ausência intencional
let desconto;                    // undefined
const id = 123n;                 // bigint
const simbolo = Symbol("id");    // symbol


/*const produto = {
    Code: "XRTY-45678",
    nome: "Tinta para Paredes Coral Rende Muito",
    fabricante: "Coral",
    categoria: "Standard",
    preco: 189.90,
    estoque: 20
};*/




/**const subtotal = preco * quantidade;

console.log(subtotal);




//COMPARAÇÃO 

/**
 * Atenção

Prefira:

=== 
!== 

em vez de:

==
!=

Porque === compara valor e tipo.
*/

/**const estoque = 10;

if (estoque > 0) {
    console.log("Produto disponível");
}else{
   console.log("Produto não disponível");

}


if (estoque > 0) {
    console.log("Disponível");
} else {
    console.log("Produto esgotado");
}


//Estrutura decisao
const estoqueDeficiente = false;

if (!estoqueDeficiente) {
    console.log("Produto com pouca quantidade no Estoque");
} else if (estoque === 0) {
    console.log("Produto esgotado");
} else {
    console.log("Produto disponível");
}




const status = estoque > 0
    ? "Disponível"
    : "Esgotado";

console.log(status);

//Não devemos abusar de ternários complexos.

//FUNÇÕES 

function calcularSubtotal(preco, quantidade) {
    return preco * quantidade;
}

const total = calcularSubtotal(189.90, 2);

console.log(total);

//ARROW FUNCTION 
/**
 * const calcularSubtotal = (preco, quantidade) => {
    return preco * quantidade;
};


OU

const calcularSubtotal = (preco, quantidade) =>
    preco * quantidade;
*/



//ARRAYS
/*const produtos = [
    "Tinta Premium",
    "Tinta Super Lavável",
    "Esmalte Premium",
    "Textura Decorativa"
];


//ADICIONANDO UM ITEM NO ARRAY
produtos.push("Tinta Exterior");
console.log(produtos);

//Removendo um Item de um Array
produtos.pop(produtos[2]);
console.log(produtos[0]);
console.log(produtos);*/



//MAP

/*const precos = [100, 150, 200];

const precosComDesconto = precos.map((preco) => {
    return preco * 0.9;
});

console.log(precosComDesconto);*/




//FILTER

/*const produtos = [
    { nome: "Tinta", preco: 100 },
    { nome: "Esmalte", preco: 80 },
    { nome: "Textura", preco: 150 }
];

const produtosCaros = produtos.filter((produto) => {
    return produto.preco > 100;
});


//FIND

const produto = produtos.find((produto) => {
    return produto.nome === "Tinta";
});

console.log(produto);


//REDUCE

const carrinho = [
    {
        nome: "Tinta",
        preco: 189.90,
        quantidade: 2
    },
    {
        nome: "Esmalte",
        preco: 89.90,
        quantidade: 1
    }
];

const total = carrinho.reduce((acumulador, item) => {
    return acumulador + (
        item.preco * item.quantidade
    );
}, 0);

console.log(total);*/


//OBJETO

/*const produto = {
    id: 1,
    nome: "Tinta Premium Fosca",
    categoria: "Tinta acrílica",
    preco: 189.90,
    estoque: 20
};

console.log(produto.nome);
console.log(produto.preco);*/


//DESTRUCTURING
/*const produto = {
    nome: "Tinta Premium",
    preco: 189.90
};

const { nome, preco } = produto;

console.log(nome);
console.log(preco);*/



const produto = {
    nome: "Tinta",
    preco: 100
};

const produtoAtualizado = {
    ...produto,
    preco: 120
};

/**
 * Isso preserva o objeto original.

Começamos aqui a trabalhar com imutabilidade.

*/


//DOM  Agora JavaScript começa a conversar com nossa interface.

//Alterar conteúdo:

/*const titulo = document.querySelector("h1");

console.log(titulo);


titulo.textContent = "Sua casa. Sua cor.";


//Alterar classe:

titulo.classList.add("active");

//REMOVE
titulo.classList.remove("active");

//Alternar:
titulo.classList.toggle("active");*/


//EVENTOS
/**
 * usuário
   ↓
evento
   ↓
JavaScript
   ↓
estado
   ↓
interface
*/

/*const botao = document.querySelector(".button");

botao.addEventListener("click", () => {
    console.log("Botão clicado");
});
*/

//EVENT DELEGATION  Isso será muito útil no catálogo e no carrinho.

/*lista.addEventListener("click", (event) => {

    const botao = event.target.closest("[data-action]");

    if (!botao) {
        return;
    }

    console.log(botao.dataset.action);
});


//DATA ATTRIBUTES
const id = button.dataset.productId;
const action = button.dataset.action;



const state = {
    produtos: [],
    carrinho: [],
    busca: "",
    categoria: null
};



function renderCart(cart) {

    const container =
        document.querySelector("#cart");

    container.innerHTML = "";

    cart.forEach((item) => {

        const element =
            document.createElement("article");

        element.textContent =
            `${item.nome} - ${item.quantidade}`;

        container.appendChild(element);
    });
}*/

//RENDERIZAÇÃO  Uma função pode transformar estado em interface:
//Aqui você começa a construir um mini sistema de UI sem framework.
/*function renderCart(cart) {

    const container =
        document.querySelector("#cart");

    container.innerHTML = "";

    cart.forEach((item) => {

        const element =
            document.createElement("article");

        element.textContent =
            `${item.nome} - ${item.quantidade}`;

        container.appendChild(element);
    });
}
*/

//21 — localStorage

//Carrinho persistente:

/*const cart = [
    {
        id: 1,
        nome: "Tinta Premium",
        quantidade: 2
    }
];*/


// Transformamos objeto/array em JSON.
/*localStorage.setItem(
    "cart",
    JSON.stringify(cart)
);



//Recuperar:

const savedCart =
    localStorage.getItem("cart");


const cart = savedCart
    ? JSON.parse(savedCart)
    : [];*/


//PROMISSE ASSINCRONISMO
    const promessa = new Promise((resolve, reject) => {

    const sucesso = true;

    if (sucesso) {
        resolve("Dados carregados");
    } else {
        reject("Erro");
    }
});



async function carregarProdutos() {

    try {

        const response =
            await fetch("/api/products");

        const data =
            await response.json();

        console.log(data);

    } catch (error) {

        console.error(
            "Erro ao carregar produtos:",
            error
        );
    }
}


//25 — FETCH

//GET:

/*const response = await fetch("/api/products");


const products = await response.json();

//POST:

const response = await fetch("/api/products", {
    method: "POST",


    headers: {
        "Content-Type": "application/json"
    },


    body: JSON.stringify({
        nome: "Nova Tinta",
        preco: 150
    })
});*/



//26 — NÃO CONFUNDIR HTTP ERROR COM EXCEPTION

//Um erro muito comum:

//const response = await fetch(url);

//Isso não significa que a API respondeu corretamente.

//Precisamos verificar:

/*if (!response.ok) {
    throw new Error(
        `HTTP ${response.status}`
    );
}

//Então:

async function getProducts() {


    const response =
        await fetch("/api/products");


    if (!response.ok) {
        throw new Error(
            "Falha ao carregar produtos"
        );
    }


    return response.json();
}

//Isso é pensamento profissional.*/


//30 — THROTTLE

//Útil para eventos frequentes como scroll:

function throttle(callback, delay) {


    let waiting = false;


    return (...args) => {


        if (waiting) {
            return;
        }


        callback(...args);


        waiting = true;


        setTimeout(() => {
            waiting = false;
        }, delay);
    };
}


//32 — ABORT CONTROLLER

//Quando o usuário pesquisa rapidamente:

//tinta
//tin
//tint
//tinta externa

//podemos cancelar requisições anteriores.

const controller =
    new AbortController();


fetch("/api/products", {
    signal: controller.signal
});


// Cancela a requisição.
controller.abort();
//Isso é Front-end avançado.



//33 — CLOSURES

//Um dos conceitos mais importantes de JavaScript.

function createCounter() {


    let count = 0;


    return () => {


        count++;


        return count;
    };
}


const counter = createCounter();


console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3


//34 — this
const product = {


    name: "Tinta",


    showName() {
        console.log(this.name);
    }
};


product.showName();

//Entender this é obrigatório para avançar em JavaScript.


//35 — CLASSES
class Cart {

    constructor() {
        this.items = [];
    }

    add(product) {
        this.items.push(product);
    }

    remove(productId) {
        this.items =
            this.items.filter(
                item => item.id !== productId
            );
    }
}



/*36 — PROTOTYPES

Por baixo das classes existe o sistema de protótipos:

const product = {
    name: "Tinta"
};


console.log(
    Object.getPrototypeOf(product)
);

//Esse é um assunto que estudaremos quando chegarmos ao JavaScript avançado.

//37 — IMMUTABILITY

//Evitar alterações desnecessárias:

const cart = [
    {
        id: 1,
        quantity: 1
    }
];

//Ao atualizar:

const updatedCart = cart.map(item => {


    if (item.id !== 1) {
        return item;
    }


    return {
        ...item,
        quantity: item.quantity + 1
    };
});
*/
//Isso prepara sua cabeça para React e arquiteturas modernas.

//38 — PERFORMANCE

//Vamos estudar:

//DOM manipulation
//        ↓
//reflow
//        ↓
//repaint
     //   ↓
//renderização

//E depois:

//lazy loading
/*debounce
throttle
code splitting
caching
memoização
Web Workers
otimização de imagens
Core Web Vitals
bundle size*/



/*39 — SEGURANÇA

Nunca devemos fazer:

element.innerHTML = userInput;

sem sanitização adequada.

Porque podemos abrir espaço para XSS.

Preferimos:

element.textContent = userInput;

Esse detalhe parece pequeno.

É extremamente importante.

40 — ACESSIBILIDADE + JAVASCRIPT

Nosso JavaScript também precisa respeitar acessibilidade.

Por exemplo:

menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
);

Isso conecta:

Estado JavaScript
      ↓
ARIA
      ↓
Tecnologia assistiva
      ↓
Usuário

Foi exatamente o que fizemos agora na Casa de Tintas.

41 — TESTES

Depois:

describe("calculateTotal", () => {


    it("deve calcular o total", () => {


        const result =
            calculateTotal([
                {
                    price: 100,
                    quantity: 2
                }
            ]);


        expect(result).toBe(200);
    });
});

Vamos estudar:

testes unitários
testes de integração
mocks
testes de DOM
E2E
coverage
42 — ARQUITETURA

Aqui juntamos tudo.

Uma aplicação pode chegar a:

                 APP
                  │
        ┌─────────┴─────────┐
        │                   │
       UI                 STATE
        │                   │
 COMPONENTS              STORE
        │                   │
        └─────────┬─────────┘
                  │
               SERVICES
                  │
                 API
                  │
               BACKEND
                  │
              DATABASE

Essa é a ponte entre:

Front-end → Engenharia de Software.

43 — CLEAN CODE

Não:

function x(a,b,c){
    return a*b+c;
}

Preferível:

function calculateProductTotal(
    price,
    quantity,
    shipping
) {
    return (
        price * quantity +
        shipping
    );
}

Código deve ser compreensível.

44 — SOLID

Depois estudaremos:

S — Single Responsibility
O — Open/Closed
L — Liskov Substitution
I — Interface Segregation
D — Dependency Inversion

Mas não vamos jogar SOLID em cima de código simples só para parecer sofisticado.

Esse é um erro muito comum.

45 — DESIGN PATTERNS

No Front-end vamos estudar padrões como:

Module
Factory
Observer
Pub/Sub
Strategy
Adapter
Facade
Singleton
Repository

Alguns serão usados diretamente na Casa de Tintas.

46 — E DEPOIS ENTRA O ECOSSISTEMA

Só depois de dominar JavaScript puro faz muito mais sentido entrar profundamente em:

JavaScript
   ↓
TypeScript
   ↓
Vite
   ↓
React
   ↓
React Router
   ↓
State Management
   ↓
Testing
   ↓
API
   ↓
Deploy

E aí podemos comparar com:

Angular
Vue
Next.js

porque você já terá entendido o problema que os frameworks estão tentando resolver.*/