// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for scroll animations
document.querySelectorAll('.solution-card, .diff-card, .contact-card, .cta-box').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Observe mockup image for animation on scroll
const mockupImage = document.querySelector('.mockup-image');
if (mockupImage) {
    const mockupObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                mockupObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    mockupObserver.observe(mockupImage);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add ripple effect to buttons on click
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.transform = 'scale(0)';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Download modal functionality
const downloadBtn = document.getElementById('downloadBtn');
const downloadModal = document.getElementById('downloadModal');
const closeModal = document.getElementById('closeModal');

if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        downloadModal.classList.add('show');
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        downloadModal.classList.remove('show');
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === downloadModal) {
        downloadModal.classList.remove('show');
    }
});

// Cookie Consent Banner
const cookieBanner = document.getElementById('cookieBanner');
const acceptCookies = document.getElementById('acceptCookies');
const rejectCookies = document.getElementById('rejectCookies');

// Check if user has already made a choice
function checkCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (cookieConsent) {
        cookieBanner.classList.add('hidden');
    }
}

// Accept cookies
if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        cookieBanner.classList.add('hidden');
        // Load analytics or tracking scripts here if needed
    });
}

// Reject cookies
if (rejectCookies) {
    rejectCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        cookieBanner.classList.add('hidden');
    });
}

// Show banner on page load if consent not given
checkCookieConsent();

// ===== CHATBOT =====
const chatbot = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotOptions = document.getElementById('chatbotOptions');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

const chatResponses = {
    what: {
        text: 'A <strong>Trakiu</strong> é um software de gestão de equipas e picagem de ponto com geolocalização. Permite registar presenças via GPS, gerir horários e escalas, e ter uma visão completa do dia a dia da sua equipa — tudo na palma da mão! 📱',
        followUp: ['features', 'pricing', 'acquire']
    },
    features: {
        text: '✨ <strong>Funcionalidades principais:</strong><br><br>📍 <strong>Picagem por Geolocalização</strong> — Registo de ponto preciso e anti-fraude com verificação GPS em tempo real.<br><br>👥 <strong>Gestão de Horários e Equipas</strong> — Escalas flexíveis, férias e gestão de tarefas num só lugar.<br><br>📊 <strong>Dashboard Intuitivo</strong> — Visão clara do dia a dia com sistema de notificações push.<br><br>🚀 <strong>Implementação Rápida</strong> — Sem configurações pesadas, a sua equipa começa a usar em minutos.',
        followUp: ['pricing', 'acquire', 'download']
    },
    pricing: {
        text: '💰 <strong>Planos disponíveis:</strong><br><br>🔹 <strong>Micro (Base)</strong> — 20€/mês* ou 200€/ano*<br>Até 5 utilizadores, 1 admin<br><em>Promoção -20% (antes 25€/mês)</em><br><br>🔹 <strong>Equipa (Crescimento)</strong> — 30€/mês* ou 300€/ano*<br>Até 10 utilizadores, 2 admins<br><em>Promoção -20% (antes 37,5€/mês)</em><br><br>🔹 <strong>Avançado</strong> — Sob consulta<br>+10 utilizadores, admins ilimitados, multi-localização<br><br><small>* Preços sem IVA</small>',
        followUp: ['acquire', 'contact']
    },
    acquire: {
        text: '🛒 <strong>Como adquirir a Trakiu?</strong><br><br>É muito simples! Pode contactar-nos através de:<br><br>📧 <strong>Email:</strong> <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a><br><br>🌐 <strong>Site:</strong> <a href="https://www.trakiu.com" style="color: var(--cyan);">www.trakiu.com</a><br><br>Envie-nos uma mensagem com o plano pretendido e a dimensão da sua equipa. Responderemos no prazo máximo de 24 horas! 🙌',
        followUp: ['pricing', 'download', 'contact']
    },
    download: {
        text: '📲 <strong>Descarregue a app Trakiu:</strong><br><br>🍎 <strong>App Store (iOS):</strong><br><a href="https://apps.apple.com/pt/app/trakiu/id6502695600" target="_blank" style="color: var(--cyan);">Descarregar para iPhone</a><br><br>🤖 <strong>Google Play (Android):</strong><br><a href="https://play.google.com/store/apps/details?id=com.thepinkseagull.traxler" target="_blank" style="color: var(--cyan);">Descarregar para Android</a><br><br>A instalação é rápida e pode começar a usar imediatamente! 🚀',
        followUp: ['features', 'acquire', 'contact']
    },
    contact: {
        text: '📞 <strong>Fale connosco!</strong><br><br>Estamos disponíveis para esclarecer qualquer dúvida ou ajudar na configuração:<br><br>📧 <strong>Email:</strong> <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a><br><br>🌐 <strong>Site:</strong> <a href="https://www.trakiu.com/#contact" style="color: var(--cyan);">www.trakiu.com</a><br><br>Teremos todo o gosto em ajudá-lo! 😊',
        followUp: ['what', 'pricing', 'acquire']
    }
};

const followUpLabels = {
    what: 'O que é a Trakiu?',
    features: 'Funcionalidades',
    pricing: 'Planos e Preços',
    acquire: 'Como adquirir?',
    download: 'Descarregar a app',
    contact: 'Falar com alguém'
};

// Toggle chatbot
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbot.classList.toggle('active');
    });
}

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbot.classList.remove('active');
    });
}

// Add message to chat
function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${type}`;
    msg.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Update follow-up options
function showFollowUp(keys) {
    chatbotOptions.innerHTML = '';
    keys.forEach(key => {
        const btn = document.createElement('button');
        btn.className = 'chatbot-option';
        btn.dataset.question = key;
        btn.textContent = followUpLabels[key];
        btn.addEventListener('click', () => handleQuestion(key));
        chatbotOptions.appendChild(btn);
    });
}

// Handle question selection
function handleQuestion(key) {
    const response = chatResponses[key];
    if (!response) return;

    addMessage(followUpLabels[key], 'user');

    setTimeout(() => {
        addMessage(response.text, 'bot');
        showFollowUp(response.followUp);
    }, 500);
}

// Option button click events
document.querySelectorAll('.chatbot-option').forEach(btn => {
    btn.addEventListener('click', () => {
        handleQuestion(btn.dataset.question);
    });
});

// Free text input
function handleFreeText() {
    const text = chatbotInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatbotInput.value = '';

    const lowerText = text.toLowerCase();

    setTimeout(() => {
        if (lowerText.includes('preço') || lowerText.includes('preco') || lowerText.includes('custo') || lowerText.includes('plano') || lowerText.includes('valor')) {
            addMessage(chatResponses.pricing.text, 'bot');
            showFollowUp(chatResponses.pricing.followUp);
        } else if (lowerText.includes('comprar') || lowerText.includes('adquirir') || lowerText.includes('subscrever') || lowerText.includes('contratar')) {
            addMessage(chatResponses.acquire.text, 'bot');
            showFollowUp(chatResponses.acquire.followUp);
        } else if (lowerText.includes('funcionalidade') || lowerText.includes('função') || lowerText.includes('faz') || lowerText.includes('serve')) {
            addMessage(chatResponses.features.text, 'bot');
            showFollowUp(chatResponses.features.followUp);
        } else if (lowerText.includes('download') || lowerText.includes('descarregar') || lowerText.includes('instalar') || lowerText.includes('app')) {
            addMessage(chatResponses.download.text, 'bot');
            showFollowUp(chatResponses.download.followUp);
        } else if (lowerText.includes('contacto') || lowerText.includes('email') || lowerText.includes('telefone') || lowerText.includes('falar')) {
            addMessage(chatResponses.contact.text, 'bot');
            showFollowUp(chatResponses.contact.followUp);
        } else if (lowerText.includes('o que é') || lowerText.includes('trakiu') || lowerText.includes('o que') || lowerText.includes('olá') || lowerText.includes('ola') || lowerText.includes('bom dia') || lowerText.includes('boa tarde')) {
            addMessage(chatResponses.what.text, 'bot');
            showFollowUp(chatResponses.what.followUp);
        } else {
            addMessage('Obrigado pela sua mensagem! Para que possamos ajudá-lo da melhor forma, por favor contacte-nos diretamente por email: <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a> 📧', 'bot');
            showFollowUp(['acquire', 'pricing', 'contact']);
        }
    }, 600);
}

if (chatbotSend) {
    chatbotSend.addEventListener('click', handleFreeText);
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleFreeText();
    });
}
