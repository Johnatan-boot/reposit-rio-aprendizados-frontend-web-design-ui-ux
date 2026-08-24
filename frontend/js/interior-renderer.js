export async function initInteriorPage() {
  try {
    // Ajuste o caminho do fetch conforme a localização do seu arquivo JSON
    const response = await fetch('../js/data/interior.json'); 
    if (!response.ok) throw new Error('Erro ao carregar o banco de dados.');
    
    const data = await response.json();

    renderCategories(data.categorias);
    renderProducts(data.produtos);

  } catch (error) {
    console.error('Erro:', error);
  }
}

function renderCategories(categorias) {
  const grid = document.querySelector('.category-grid');
  if (!grid) return;

  grid.innerHTML = categorias.map(cat => `
    <a class="category-card" href="${cat.link}">
      <img src="${cat.imagem}" alt="${cat.alt}" />
      <h3>${cat.titulo}</h3>
      <p>${cat.descricao}</p>
      <span class="category-card__link">Ver produtos →</span>
    </a>
  `).join('');
}

function renderProducts(produtos) {
  const grid = document.querySelector('.product-grid');
  if (!grid) return;

  grid.innerHTML = produtos.map(prod => `
    <article class="product-card" data-id="${prod.id}">
      <div class="product-card__visual">
        <img src="${prod.imagem}" alt="${prod.alt}" />
      </div>
      <div class="product-card__content">
        <h3>${prod.nome}</h3>
        <p>${prod.descricao}</p>
        <div class="product-card__footer">
          <span class="product-card__price">R$ ${prod.preco.toFixed(2).replace('.', ',')}</span>
          <button class="button button--primary button--sm" data-add-cart="${prod.id}">Comprar</button>
        </div>
      </div>
    </article>
  `).join('');
}