// Gallery images data
const galleryImages = [
    {
        id: 1,
        src: 'classico.png',
        title: 'Sala de Estar Sofisticada',
        category: 'Linha Clássico Premium',
        productPng: 'classico_premium.png' // <-- NOVO!
    },
    {
        id: 2,
        src: 'minimalista.png',
        title: 'Quarto Minimalista',
        category: 'Linha Minimalista Elite',
        productPng: 'minimalista_elite.png' // <-- NOVO!
    },
    {
        id: 3,
        src: 'decorativo.png',
        title: 'Cozinha Integrada',
        category: 'Design Moderno',
        productPng: 'decorativo_royal.png' // <-- NOVO! (Exemplo)
    },
    {
        id: 4,
        src: 'adaptavel.png',
        title: 'Corredor Elegante',
        category: 'Acabamento Impecável',
        productPng: 'flex_adaptavel.png' // <-- NOVO! (Exemplo)
    },
    {
        id: 5,
        src: 'executivo.png',
        title: 'Escritório Executivo',
        category: 'Linha Executivo Standard',
        productPng: 'executivo_standard.png' // <-- NOVO!
    },
    {
        id: 6,
        src: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
        title: 'Refúgio Residencial',
        category: 'Linha Residence Luxury',
        productPng: 'residence_luxury.png' // <-- NOVO!
    }
];

// Hero carousel images
const heroImages = [
    'https://images.pexels.com/photos/6782351/pexels-photo-6782351.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080',
    'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080'
];

// Current state
let currentPage = 'home';
let currentHeroIndex = 0;
let currentGalleryIndex = 0;
let heroCarouselInterval;
let galleryCarouselInterval;
let current3DColor = 'gold';

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const pageTransitionContainer = document.getElementById('pageTransitionContainer');
const transitionLayerGold = document.getElementById('transitionLayerGold');
const transitionLayerBlack = document.getElementById('transitionLayerBlack');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupScrollEffects();
    setupFormHandler();
    setupAnimations();
    initializeAdvancedBackground(); // <-- A nova animação
    initializeHeroCarousel();
    initializeGalleryCarousel();
	setupLazyLoading();
    setupSidebarCarousel();
    initialize3DViewer();
}


// ===============================================
// NOVA ANIMAÇÃO DE FUNDO DINÂMICA E "INVOLUNTÁRIA"
// ===============================================

// Array para guardar nossas formas e suas propriedades
let backgroundShapes = [];

function initializeAdvancedBackground() {
    // ↓↓↓ MUDANÇA PRINCIPAL AQUI ↓↓↓
    const container = document.getElementById('animatedBackground');  
    if (!container) return;

    // --- Configurações da Animação (AJUSTADAS PARA MAIS SUTILEZA) ---
    const numberOfShapes = 6;  // Menos formas para um visual mais limpo
    const baseSpeed = 0.2;     // Movimento mais lento e relaxante

    for (let i = 0; i < numberOfShapes; i++) {
        const shapeElement = document.createElement('div');
        shapeElement.className = 'bg-shape';
        container.appendChild(shapeElement);

        const size = Math.random() * 180 + 80; // Tamanho entre 80px e 260px
        
        shapeElement.style.width = `${size}px`;
        shapeElement.style.height = `${size}px`;
        shapeElement.style.filter = `blur(${size / 3}px)`; // Mais blur para suavidade

        // O resto da função continua exatamente igual...
        backgroundShapes.push({
            element: shapeElement,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * baseSpeed,
            vy: (Math.random() - 0.5) * baseSpeed,
        });
    }

    // Inicia o loop da animação
    animateBackground();
}

function animateBackground() {
    // O "cérebro" da animação
    backgroundShapes.forEach(shape => {
        // 1. Atualiza a posição com base na velocidade
        shape.x += shape.vx;
        shape.y += shape.vy;

        // 2. Adiciona o "movimento involuntário" (a mágica acontece aqui)
        // Isso adiciona uma pequena força aleatória a cada frame, criando um desvio suave
        shape.vx += (Math.random() - 0.5) * 0.02; // Ajuste este valor para mais ou menos "tremor"
        shape.vy += (Math.random() - 0.5) * 0.02;

        // 3. Verifica as bordas da tela para as formas não fugirem
        if (shape.x < 0 || shape.x > window.innerWidth) shape.vx *= -1;
        if (shape.y < 0 || shape.y > window.innerHeight) shape.vy *= -1;
        
        // 4. Limita a velocidade máxima para não ficar caótico
        shape.vx = Math.max(-0.5, Math.min(0.5, shape.vx));
        shape.vy = Math.max(-0.5, Math.min(0.5, shape.vy));

        // 5. Aplica a nova posição ao elemento HTML
        shape.element.style.transform = `translate(${shape.x}px, ${shape.y}px)`;
    });

    // Pede ao navegador para chamar esta função novamente no próximo frame
    // É muito mais eficiente que setInterval
    requestAnimationFrame(animateBackground);
}

function setupLazyLoading() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
}

// ====================================
// 3D VIEWER FUNCTIONS
// ====================================

function initialize3DViewer() {
    // Setup color button event listeners
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const color = this.dataset.color;
            change3DColor(color);
            
            // Update active state
            colorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Setup close on background click
    const viewer3DOverlay = document.getElementById('viewer3dOverlay');
    viewer3DOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            close3DViewer();
        }
    });

    // Setup keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        const viewer3DOverlay = document.getElementById('viewer3dOverlay');
        if (viewer3DOverlay.classList.contains('active')) {
            if (e.key === 'Escape') {
                close3DViewer();
            } else if (e.key === '1') {
                change3DColor('gold');
            } else if (e.key === '2') {
                change3DColor('black');
            } else if (e.key === '3') {
                change3DColor('white');
            }
        }
    });
}

function open3DViewer(nomeDoArquivo) { // <-- 1. Adicionamos um parâmetro aqui!
    // Pega o elemento <model-viewer>
    const viewer = document.querySelector('#rodapeViewer');
    
    // Se o viewer ou o nome do arquivo não existirem, não faz nada para evitar erros.
    if (!viewer || !nomeDoArquivo) {
        console.error("Visualizador 3D não encontrado ou nome do modelo não fornecido.");
        return;
    }

    // 2. Monta o caminho completo para o arquivo .glb
    const caminhoCompleto = `glb/${nomeDoArquivo}`;

    // 3. ATUALIZA o atributo 'src' do model-viewer com o novo caminho
    viewer.setAttribute('src', caminhoCompleto);

    // O resto do código é o que você já tinha, para abrir o modal.
    const viewer3DOverlay = document.getElementById('viewer3dOverlay');
    
    viewer3DOverlay.classList.add('active');
    
    // Aplica a cor que estava selecionada por último
    change3DColor(current3DColor);
    
    document.body.style.overflow = 'hidden';
    
    viewer3DOverlay.focus();
    
    // A animação de entrada do modal não precisa de mudanças.
    // Apenas garantimos que o modelo 3D tenha um tempo para começar a carregar.
    setTimeout(() => {
        const modelViewerElement = document.getElementById('rodapeViewer');
        if (modelViewerElement) {
            modelViewerElement.style.opacity = '1';
            modelViewerElement.style.transform = 'scale(1)';
        }
    }, 300);
}

function close3DViewer() {
    const viewer3DOverlay = document.getElementById('viewer3dOverlay');
    const rodape3d = document.getElementById('rodape3d');
    
    // Exit animation
    if (rodape3d) {
        rodape3d.style.opacity = '0';
        rodape3d.style.transform = 'scale(0.8)';
    }
    
    setTimeout(() => {
        viewer3DOverlay.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = '';
    }, 300);
}

function change3DColor(color) {
    // Pega o elemento <model-viewer> pelo ID que definimos no HTML
    const viewer = document.querySelector('#rodapeViewer');
    
    // Se o viewer não for encontrado, não faz nada
    if (!viewer) return;

    // Pega o modelo carregado dentro do viewer
    const model = viewer.model;

    // Se o modelo ainda não carregou, não faz nada (evita erros)
    if (!model) return;

    // Mapeia os nomes das cores para valores de cor e rugosidade do material
    // pbrMetallicRoughness:
    // - baseColorFactor: A cor [R, G, B]
    // - metallicFactor: O quão metálico ele é (0 = não metálico, 1 = metal)
    // - roughnessFactor: O quão áspero/fosco ele é (0 = polido/reflexivo, 1 = fosco)
    const materialProperties = {
        'gold':  { color: [1.0, 0.84, 0.25], metallic: 0.8, roughness: 0.2 },
        'black': { color: [0.1, 0.1, 0.1],   metallic: 0.2, roughness: 0.4 },
        'white': { color: [1.0, 1.0, 1.0],   metallic: 0.1, roughness: 0.3 }
    };

    // Pega as propriedades da cor selecionada, ou dourado como padrão
    const properties = materialProperties[color] || materialProperties['gold'];
    
    // Pega o primeiro material do modelo (geralmente só há um)
    const material = model.materials[0];
    
    // Aplica as propriedades ao material
    material.pbrMetallicRoughness.setBaseColorFactor(properties.color);
    material.pbrMetallicRoughness.setMetallicFactor(properties.metallic);
    material.pbrMetallicRoughness.setRoughnessFactor(properties.roughness);

    // O resto do seu código para atualizar o botão ativo já está no initialize3DViewer,
    // então não precisamos duplicá-lo aqui. Apenas atualizamos a variável de estado.
    current3DColor = color;
}

// ====================================
// END 3D VIEWER FUNCTIONS
// ====================================

// Enhanced Page Navigation with Smooth Transitions
function showPage(pageName) {
    if (currentPage === pageName) return;

    // --- SEQUÊNCIA DE FECHAMENTO ---

    // 1. Ativa o container para bloquear cliques.
    pageTransitionContainer.classList.add('active');

    // 2. A camada DOURADA desliza para dentro.
    transitionLayerGold.classList.add('active');

    // 3. Após um breve momento, a camada PRETA desliza por cima.
    setTimeout(() => {
        transitionLayerBlack.classList.add('active');
    }, 50); // Atraso de 200ms para o efeito sequencial

    // 4. Aguarda a animação de fechamento ser concluída.
    // O tempo total é o atraso (200ms) + duração da animação (800ms) = 1000ms.
    setTimeout(() => {
        // --- TROCA DE CONTEÚDO (TELA ESTÁ PRETA) ---
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => {
            page.classList.remove('active');
        });

        const targetPage = document.getElementById(pageName + '-page');
        if (targetPage) {
            targetPage.classList.add('active');
        }

        updateNavigation(pageName);
        mobileMenu.classList.remove('open'); // Garante que o menu feche
        window.scrollTo({ top: 0, behavior: 'smooth' });
        currentPage = pageName;

        if (galleryCarouselInterval) {
            clearInterval(galleryCarouselInterval);
        }
		
		if (pageName === 'gallery') {
            setupSidebarCarousel(); // Recria os itens da barra lateral
            setupGalleryAutoChange(); // Inicia a troca automática de imagens
        }

        // --- SEQUÊNCIA DE ABERTURA ---

        // 5. A camada PRETA desliza para fora, revelando a dourada.
        transitionLayerBlack.classList.remove('active');

        // 6. Após um breve momento, a camada DOURADA também desliza para fora.
        setTimeout(() => {
            transitionLayerGold.classList.remove('active');
        }, 50); // Atraso de 200ms

        // 7. Após a conclusão de todas as animações, desativa o container.
        setTimeout(() => {
            pageTransitionContainer.classList.remove('active');
        }, 1000); // Aguarda a animação de saída terminar (800ms + 200ms de atraso)

    }, 1000);
}

function updateNavigation(activePage) {
    // Update desktop navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === activePage) {
            link.classList.add('active');
        }
    });
    
    // Update mobile navigation
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === activePage) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    mobileMenu.classList.toggle('open');
    mobileMenuBtn.classList.toggle('open');
}

// WhatsApp Integration
function openWhatsApp() {
    const phoneNumber = '5543996349824'; // Substitua pelo número correto
    const message = encodeURIComponent('Olá, vim pelo site do Aurum e gostaria de mais informações');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Enhanced Scroll Effects
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 50;
        navbar.classList.toggle('scrolled', scrolled);
        
        // Animate elements on scroll
        animateOnScroll();
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}


// Hero Carousel
function initializeHeroCarousel() {
    const heroCarousel = document.getElementById('heroCarousel');
    if (!heroCarousel) return;
    
    // Initialize slides with background images
    const slides = heroCarousel.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
        const bgImage = slide.dataset.bg;
        slide.style.backgroundImage = `url(${bgImage})`;
    });
    
    function nextHeroSlide() {
        slides[currentHeroIndex].classList.remove('active');
        currentHeroIndex = (currentHeroIndex + 1) % slides.length;
        slides[currentHeroIndex].classList.add('active');
    }
    
    // Start carousel
    heroCarouselInterval = setInterval(nextHeroSlide, 5000);
}

// Gallery Carousel
function initializeGalleryCarousel() {
    if (currentPage === 'gallery') {
        setupGalleryAutoChange();
    }
}

function setupGalleryAutoChange() {
    const mainImage = document.getElementById('mainGalleryImage');
    const mainTitle = document.getElementById('mainImageTitle');
    const mainCategory = document.getElementById('mainImageCategory');
	const floatingRodape = document.getElementById('floatingRodapePng');
    
    // Se a imagem principal não existir, interrompe para evitar erros.
    if (!mainImage || !floatingRodape) return;
    
    function changeMainImage() {
        // Pega a imagem atual da galeria baseada no índice
        const image = galleryImages[currentGalleryIndex];
        
        // Efeito de fade-out
        mainImage.style.opacity = '0.5';
        floatingRodape.style.opacity = '0';
		
        // Aguarda o fade-out para fazer a troca
        setTimeout(() => {
            mainImage.src = image.src;
            mainImage.alt = image.title;
			floatingRodape.src = image.productPng;
            mainTitle.textContent = image.title;
            mainCategory.textContent = image.category;
            
            // Efeito de fade-in
            mainImage.style.opacity = '1';
            floatingRodape.style.opacity = '1'; // <-- O rodapé se torna visível aqui!
        }, 300);
        
        // Prepara o índice para a próxima imagem
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    }
    
    // =================================================================
    // ======================= INÍCIO DA CORREÇÃO ======================
    // =================================================================
    
    // 1. CHAMA A FUNÇÃO IMEDIATAMENTE
    // Isso garante que a primeira imagem e o primeiro rodapé apareçam na hora.
    changeMainImage();
    
    // 2. DEPOIS, INICIA O INTERVALO PARA AS PRÓXIMAS TROCAS
    // Agora o intervalo vai controlar apenas as trocas subsequentes.
    galleryCarouselInterval = setInterval(changeMainImage, 5000);

    // =================================================================
    // ======================== FIM DA CORREÇÃO ========================
    // =================================================================
}

// Sidebar Carousel
function setupSidebarCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) return;
    
    // Limpa o carrossel antes de recriar
    carouselTrack.innerHTML = '';
    
    // Cria itens apenas com as imagens originais (sem duplicar)
    galleryImages.forEach((image, index) => {
        const sidebarItem = document.createElement('div');
        sidebarItem.className = 'sidebar-item';
        sidebarItem.onclick = () => {
            clearInterval(galleryCarouselInterval);
            changeMainGalleryImage(index);
        };
        
        sidebarItem.innerHTML = `
            <img src="${image.src}" alt="${image.title}">
            <div class="sidebar-overlay">
                <h4>${image.title}</h4>
                <p>${image.category}</p>
            </div>
        `;
        
        carouselTrack.appendChild(sidebarItem);
    });
}

function changeMainGalleryImage(index) {
    const mainImage = document.getElementById('mainGalleryImage');
    const mainTitle = document.getElementById('mainImageTitle');
    const mainCategory = document.getElementById('mainImageCategory');
	const floatingRodape = document.getElementById('floatingRodapePng');
    
    if (!mainImage) return;

    // Pausa o carrossel automático
    if (galleryCarouselInterval) {
        clearInterval(galleryCarouselInterval);
    }
    
    const image = galleryImages[index];
    currentGalleryIndex = index;
    
    // Transição suave
    mainImage.style.opacity = '0';
	floatingRodape.style.opacity = '0';
    
    setTimeout(() => {
        mainImage.src = image.src;
        mainImage.alt = image.title;
		floatingRodape.src = image.productPng;
        mainTitle.textContent = image.title;
        mainCategory.textContent = image.category;
        
        mainImage.style.opacity = '1';
		floatingRodape.style.opacity = '1';
        
        // Reinicia o carrossel após 10 segundos de inatividade
        setTimeout(() => {
            setupGalleryAutoChange();
        }, 10000);
    }, 300);
}

// Form Handler
function setupFormHandler() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Simulação de envio - substitua por código real de API
    fetch('https://seu-endpoint-api.com/contato', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro no envio');
        return response.json();
    })
    .then(data => {
        showNotification('Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.', 'success');
        e.target.reset();
    })
    .catch(error => {
        showNotification('Erro ao enviar mensagem. Por favor, tente novamente mais tarde.', 'error');
        console.error('Error:', error);
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: var(--accent);
        color: var(--secondary);
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: var(--shadow-heavy);
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        font-family: var(--font-primary);
        font-weight: 400;
        letter-spacing: 0.05em;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// Setup Enhanced Animations
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special animation for section dividers
                if (entry.target.classList.contains('section-divider')) {
                    entry.target.style.transform = 'scale(1)';
                }
                
                // Add stagger effect for multiple elements
                const children = entry.target.querySelectorAll('.feature-item, .value-card, .product-row, .contact-method');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll(`
        .luxury-content, 
        .story-container, 
        .values-grid, 
        .excellence-container, 
        .contact-content, 
        .product-row,
        .section-divider,
        .custom-gallery-section,
        .premium-content,
        .showcase-content
		[data-animate="slide-in-right"]
    `);
    
    animateElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Special handling for section dividers
        if (el.classList.contains('section-divider')) {
            el.style.transform = 'scale(0.9)';
            el.style.transition += ', transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        // Set child elements initial state
        const children = el.querySelectorAll('.feature-item, .value-card, .product-row, .contact-method');
        children.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px)';
            child.style.transition = 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        observer.observe(el);
    });
}

// Enhanced Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // VERIFICAÇÃO ADICIONADA: Se o href for apenas '#' ou vazio, não faz nada.
            if (!href || href === '#') {
                return; 
            }

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggleMobileMenu();
    }
    
    // Arrow keys for gallery navigation (when on gallery page)
    if (currentPage === 'gallery') {
        if (e.key === 'ArrowLeft') {
            const prevIndex = currentGalleryIndex === 0 ? galleryImages.length - 1 : currentGalleryIndex - 1;
            changeMainGalleryImage(prevIndex);
        } else if (e.key === 'ArrowRight') {
            changeMainGalleryImage(currentGalleryIndex);
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
window.addEventListener('scroll', debounce(() => {
    animateOnScroll();
}, 10));

document.addEventListener('DOMContentLoaded', () => {
    // Agora seleciona tanto os divisores quanto os cards da hero section
    const elementsToObserve = document.querySelectorAll('.section-divider, .hero-stats');

    // Configura o observador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se o elemento estiver visível na tela
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Opcional: remove a classe se o elemento sair da tela,
                // para a animação acontecer novamente se o usuário rolar para cima e para baixo.
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.5 // A animação começa quando 50% do elemento estiver visível
    });

    // Pede ao observador para 'observar' cada elemento da nossa lista
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// Page visibility change handling (pause/resume carousels)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause carousels when page is not visible
        if (heroCarouselInterval) clearInterval(heroCarouselInterval);
        if (galleryCarouselInterval) clearInterval(galleryCarouselInterval);
    } else {
        // Resume carousels when page becomes visible
        if (currentPage === 'home') {
            initializeHeroCarousel();
        }
        if (currentPage === 'gallery') {
            setupGalleryAutoChange();
        }
    }
});

// Clean up intervals when navigating away
window.addEventListener('beforeunload', function() {
    if (heroCarouselInterval) clearInterval(heroCarouselInterval);
    if (galleryCarouselInterval) clearInterval(galleryCarouselInterval);
});

// Touch gestures for mobile gallery navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
});



function handleGesture() {
    if (currentPage !== 'gallery') return;
    
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) < swipeThreshold) return;
    
    if (swipeDistance > 0) {
        // Swipe right - previous image
        const prevIndex = currentGalleryIndex === 0 ? galleryImages.length - 1 : currentGalleryIndex - 1;
        changeMainGalleryImage(prevIndex);
    } else {
        // Swipe left - next image
        changeMainGalleryImage(currentGalleryIndex);
    }
}

// Initialize smooth scrolling
setupSmoothScrolling();