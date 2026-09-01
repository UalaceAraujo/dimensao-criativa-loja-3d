/**
 * ==============================================================================
 * DIMENSÃO CRIATIVA | LOJA VIRTUAL 3D & ATENDIMENTO WHATSAPP
 * Script de Raios Elétricos, Partículas Laser, Carrinho e Mensagens
 * ==============================================================================
 */

// 1. Configurações Centrais de Atendimento
const WHATSAPP_CONFIG = {
  phone: '5516999999999', // Altere para o WhatsApp real da empresa (DDI + DDD + Número)
  companyName: 'Dimensão Criativa 3D'
};

// 2. Canvas de Raios Elétricos & Partículas Energizadas (Hero Section)
const canvas = document.getElementById('lightningCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const particles = [];
  const particleCount = 40;
  const colors = ['#00f0ff', '#ff1475', '#9628f0', '#1c52bd', '#ffffff', '#f5b027'];

  class EnergyParticle {
    constructor() {
      this.reset();
    }

    reset() {
      // Posiciona na região central da máquina e da logo
      this.x = window.innerWidth * 0.55 + (Math.random() * 200 - 100);
      this.y = window.innerHeight * 0.38 + (Math.random() * 120 - 60);
      this.vx = (Math.random() - 0.5) * 2.2;
      this.vy = Math.random() * 2.5 + 0.8;
      this.size = Math.random() * 3 + 1.2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.life = Math.random() * 70 + 30;
      this.maxLife = this.life;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life--;
      if (this.life <= 0) this.reset();
    }

    draw() {
      const alpha = this.life / this.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new EnergyParticle());
  }

  // Função para desenhar arcos voltaicos aleatórios
  function drawElectricArc() {
    if (Math.random() > 0.35) return;
    
    const startX = window.innerWidth * 0.75;
    const startY = window.innerHeight * 0.45;
    const segments = 6;
    let currentX = startX;
    let currentY = startY;

    ctx.save();
    ctx.strokeStyle = Math.random() > 0.5 ? '#00f0ff' : '#ff1475';
    ctx.lineWidth = Math.random() * 2 + 1;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(currentX, currentY);

    for (let i = 0; i < segments; i++) {
      currentX += (Math.random() - 0.5) * 60;
      currentY += (Math.random() - 0.5) * 60;
      ctx.lineTo(currentX, currentY);
    }
    ctx.stroke();
    ctx.restore();
  }

  function animateEnergy() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawElectricArc();
    requestAnimationFrame(animateEnergy);
  }

  animateEnergy();
}

// 3. Carrinho de Compras Interativo
let cart = [];

const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const openCartBtn = document.getElementById('openCartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItemsList = document.getElementById('cartItemsList');
const cartTotalValue = document.getElementById('cartTotalValue');
const cartCountBadge = document.getElementById('cartCountBadge');
const cartItemCount = document.getElementById('cartItemCount');

if (openCartBtn) {
  openCartBtn.addEventListener('click', openCart);
}

if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

function openCart() {
  if (cartDrawer && cartBackdrop) {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
  }
}

function closeCart() {
  if (cartDrawer && cartBackdrop) {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
  }
}

function addToCart(name, price, variation) {
  cart.push({ id: Date.now(), name, price, variation });
  updateCartUI();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  if (!cartCountBadge) return;
  cartCountBadge.textContent = cart.length;
  if (cartItemCount) cartItemCount.textContent = cart.length;

  if (cart.length === 0) {
    if (cartItemsList) {
      cartItemsList.innerHTML = `
        <div class="empty-cart-message">
          <p>Seu carrinho está vazio.</p>
          <small>Adicione produtos da vitrine acima!</small>
        </div>
      `;
    }
    if (cartTotalValue) cartTotalValue.textContent = 'R$ 0,00';
    return;
  }

  let total = 0;
  if (cartItemsList) cartItemsList.innerHTML = '';

  cart.forEach(item => {
    total += item.price;
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item-card';
    itemEl.innerHTML = `
      <div>
        <div class="cart-item-title">${item.name}</div>
        <small style="color:#9bb0ce;">${item.variation}</small>
        <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
      </div>
      <button class="remove-item-btn" onclick="removeFromCart(${item.id})" title="Remover item">&times;</button>
    `;
    if (cartItemsList) cartItemsList.appendChild(itemEl);
  });

  if (cartTotalValue) cartTotalValue.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio! Adicione produtos antes de finalizar.');
    return;
  }

  let message = `*⚡ PEDIDO LOJA 3D - ${WHATSAPP_CONFIG.companyName.toUpperCase()} ⚡*\n\n` +
                `Olá! Gostaria de fechar meu pedido feito na loja virtual:\n\n`;
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. *${item.name}* (${item.variation}) - R$ ${item.price.toFixed(2).replace('.', ',')}\n`;
    total += item.price;
  });

  message += `\n💵 *Total:* R$ ${total.toFixed(2).replace('.', ',')}\n\n` +
             `Por favor, informe as opções de envio e chave Pix/Cartão para pagamento!`;

  openWhatsAppWindow(message);
}

// 4. Filtros de Produtos na Vitrine
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    productCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// 5. WhatsApp Engine & Simulador de Mensagem
function sendDirectWhatsApp(department) {
  let message = '';

  switch (department) {
    case 'orcamento':
      message = `Olá, equipe *${WHATSAPP_CONFIG.companyName}*! ⚡\n\n` +
                `Gostaria de solicitar um *Orçamento de Impressão 3D*.\n` +
                `Tenho o arquivo (.STL / .OBJ / .STEP) e gostaria de calcular valores e prazos.`;
      break;

    case 'pedido':
      message = `Olá! Gostaria de informações e rastreamento sobre o meu *Pedido na Loja Virtual*.`;
      break;

    case 'personalizado':
      message = `Olá! Gostaria de desenvolver um *Projeto 3D Personalizado / Brinde Corporativo*.\n` +
                `Poderiam me orientar com opções de modelos e acabamentos?`;
      break;

    case 'tecnico':
      message = `Olá! Gostaria de uma *Consultoria Técnica sobre Materiais de Impressão 3D* (PLA, PETG, ABS ou Resina 8K) para a minha aplicação.`;
      break;

    default:
      message = `Olá! Gostaria de atendimento com um especialista da *${WHATSAPP_CONFIG.companyName}*.`;
  }

  openWhatsAppWindow(message);
}

function updateLivePreview() {
  const nameInput = document.getElementById('waClientName');
  const serviceInput = document.getElementById('waServiceType');
  const materialInput = document.getElementById('waMaterial');
  const quantityInput = document.getElementById('waQuantity');
  const detailsInput = document.getElementById('waDetails');
  const previewBox = document.getElementById('waLiveMessagePreview');

  if (!previewBox) return;

  const clientName = nameInput && nameInput.value.trim() ? nameInput.value.trim() : '[Seu Nome]';
  const serviceType = serviceInput ? serviceInput.value : 'Orçamento 3D';
  const material = materialInput ? materialInput.value : 'PLA Premium';
  const quantity = quantityInput ? quantityInput.value : '1';
  const details = detailsInput && detailsInput.value.trim() ? detailsInput.value.trim() : 'Gostaria de mais detalhes sobre valores e prazos.';

  const formattedPreview = 
    `*⚡ NOVA SOLICITAÇÃO 3D - DIMENSÃO CRIATIVA ⚡*\n\n` +
    `👤 *Cliente:* ${clientName}\n` +
    `📌 *Assunto:* ${serviceType}\n` +
    `🧪 *Material:* ${material}\n` +
    `🔢 *Quantidade:* ${quantity} unidade(s)\n\n` +
    `📝 *Detalhes:*\n"${details}"`;

  previewBox.textContent = formattedPreview.replace(/\\n/g, '\n');
}

function launchGeneratedWhatsApp() {
  const name = document.getElementById('waClientName') ? document.getElementById('waClientName').value.trim() : 'Cliente';
  const serviceType = document.getElementById('waServiceType') ? document.getElementById('waServiceType').value : 'Orçamento 3D';
  const material = document.getElementById('waMaterial') ? document.getElementById('waMaterial').value : 'PLA';
  const quantity = document.getElementById('waQuantity') ? document.getElementById('waQuantity').value : '1';
  const details = document.getElementById('waDetails') && document.getElementById('waDetails').value.trim() ? document.getElementById('waDetails').value.trim() : 'Favor calcular orçamento e prazo.';

  const fullMessage = 
    `*⚡ NOVA SOLICITAÇÃO - DIMENSÃO CRIATIVA 3D ⚡*\n\n` +
    `👤 *Nome:* ${name}\n` +
    `📌 *Serviço:* ${serviceType}\n` +
    `🧪 *Material:* ${material}\n` +
    `🔢 *Quantidade:* ${quantity} un\n\n` +
    `📝 *Descrição do Projeto:*\n${details}\n\n` +
    `Aguardo o retorno da equipe técnica!`;

  openWhatsAppWindow(fullMessage);
}

function forwardQuoteToWhatsApp() {
  const name = document.getElementById('clientName') ? document.getElementById('clientName').value.trim() : 'Cliente';
  const phone = document.getElementById('clientPhone') ? document.getElementById('clientPhone').value.trim() : '';
  const material = document.getElementById('materialSelect') ? document.getElementById('materialSelect').value : 'PLA';

  const message = 
    `*📐 SOLICITAÇÃO DE COTAÇÃO 3D - SITE*\n\n` +
    `👤 *Nome:* ${name}\n` +
    `📱 *WhatsApp:* ${phone}\n` +
    `🧪 *Material:* ${material}\n\n` +
    `Estou com o arquivo 3D pronto para enviar aqui no chat!`;

  openWhatsAppWindow(message);
}

function openWhatsAppWindow(text) {
  const cleanText = text.replace(/\\n/g, '\n');
  const encodedMessage = encodeURIComponent(cleanText);
  const waUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodedMessage}`;
  window.open(waUrl, '_blank');
}

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const assunto = urlParams.get('assunto');
  const serviceSelect = document.getElementById('waServiceType');

  if (assunto && serviceSelect) {
    if (assunto.toLowerCase().includes('decor')) serviceSelect.value = 'Compra de Produto da Loja';
    if (assunto.toLowerCase().includes('colecion')) serviceSelect.value = 'Modelagem 3D do Zero';
    if (assunto.toLowerCase().includes('engenharia')) serviceSelect.value = 'Orçamento de Impressão 3D';
    if (assunto.toLowerCase().includes('corporativo')) serviceSelect.value = 'Pedido Corporativo / Brindes';
    if (assunto.toLowerCase().includes('arquivo')) serviceSelect.value = 'Orçamento de Impressão 3D';
  }

  updateLivePreview();
});

// 6. Lógica da Estante de Amostras 3D (Carrossel Interativo)
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevSlideBtn');
const nextBtn = document.getElementById('nextSlideBtn');
let carouselInterval = null;

function showSlide(index) {
  if (slides.length === 0) return;
  
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetCarouselTimer();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetCarouselTimer();
  });
}

dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    const slideIdx = parseInt(e.target.getAttribute('data-slide'));
    showSlide(slideIdx);
    resetCarouselTimer();
  });
});

function startCarouselTimer() {
  carouselInterval = setInterval(nextSlide, 4500);
}

function resetCarouselTimer() {
  clearInterval(carouselInterval);
  startCarouselTimer();
}

// Inicia o carrossel na carga
window.addEventListener('DOMContentLoaded', () => {
  showSlide(0);
  startCarouselTimer();
});

// 6. Lógica da Estante de Amostras 3D Multi-Produtos (Carrossel Lado a Lado)
const shelfTrack = document.getElementById('shelfTrack');
const shelfPrevBtn = document.getElementById('shelfPrevBtn');
const shelfNextBtn = document.getElementById('shelfNextBtn');
const shelfDots = document.querySelectorAll('.s-dot');
let shelfPosition = 0;
let maxPositions = 3;
let shelfAutoPlayTimer = null;

function calculateMaxPositions() {
  const width = window.innerWidth;
  if (width <= 768) maxPositions = 6; // 1 por vez
  else if (width <= 1024) maxPositions = 4; // 2 por vez
  else maxPositions = 3; // 3 por vez
}

function updateShelfCarousel(pos) {
  if (!shelfTrack) return;
  calculateMaxPositions();
  
  if (pos >= maxPositions) shelfPosition = 0;
  else if (pos < 0) shelfPosition = maxPositions - 1;
  else shelfPosition = pos;

  const cardWidth = shelfTrack.children[0] ? shelfTrack.children[0].offsetWidth : 300;
  const gap = 24; // 1.5rem
  const moveDistance = (cardWidth + gap) * shelfPosition;

  shelfTrack.style.transform = `translateX(-${moveDistance}px)`;

  shelfDots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === shelfPosition);
  });
}

function nextShelfItem() {
  updateShelfCarousel(shelfPosition + 1);
}

function prevShelfItem() {
  updateShelfCarousel(shelfPosition - 1);
}

if (shelfNextBtn && shelfPrevBtn) {
  shelfNextBtn.addEventListener('click', () => {
    nextShelfItem();
    resetShelfTimer();
  });
  shelfPrevBtn.addEventListener('click', () => {
    prevShelfItem();
    resetShelfTimer();
  });
}

shelfDots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    updateShelfCarousel(idx);
    resetShelfTimer();
  });
});

function startShelfTimer() {
  shelfAutoPlayTimer = setInterval(nextShelfItem, 4000);
}

function resetShelfTimer() {
  clearInterval(shelfAutoPlayTimer);
  startShelfTimer();
}

window.addEventListener('resize', () => {
  updateShelfCarousel(shelfPosition);
});

window.addEventListener('DOMContentLoaded', () => {
  updateShelfCarousel(0);
  startShelfTimer();
});
