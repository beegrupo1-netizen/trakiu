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

// ============================================
// CHATBOT - Base de Conhecimento
// (Baseado exclusivamente no conteúdo do site)
// ============================================

const chatResponses = {
    // --- GERAL ---
    what: {
        text: 'A <strong>Trakiu</strong> é um software de gestão de equipas e picagem de ponto com geolocalização. Permite registar presenças via GPS, gerir horários e escalas, e ter uma visão completa do dia a dia da sua equipa — tudo na palma da mão! 📱',
        followUp: ['features', 'differentiation', 'pricing']
    },
    greeting: {
        text: 'Olá! 👋 Sou o assistente virtual da <strong>Trakiu</strong>. Estou aqui para responder às suas dúvidas sobre a nossa app de gestão de equipas e picagem de ponto por GPS. Como posso ajudar?',
        followUp: ['what', 'features', 'pricing']
    },

    // --- FUNCIONALIDADES (conforme secção "A SOLUÇÃO" do site) ---
    features: {
        text: '✨ <strong>Funcionalidades principais:</strong><br><br>📍 <strong>Picagem por Geolocalização</strong> — Registo de ponto preciso e anti-fraude com verificação GPS em tempo real.<br><br>👥 <strong>Gestão de Horários e Equipas</strong> — Escalas flexíveis, férias e gestão de tarefas num só lugar.<br><br>📊 <strong>Dashboard Intuitivo</strong> — Visão clara do dia a dia com sistema de notificações push.',
        followUp: ['gps', 'schedules', 'dashboard']
    },
    gps: {
        text: '📍 <strong>Picagem de Ponto por GPS:</strong><br><br>O sistema de geolocalização da Trakiu permite:<br><br>✅ <strong>Registo de ponto preciso</strong> com verificação GPS em tempo real.<br>✅ Sistema <strong>anti-fraude</strong> — garante a veracidade da picagem.<br>✅ Funciona com <strong>qualquer smartphone</strong> com GPS (iPhone ou Android).<br><br>Para mais detalhes técnicos sobre a funcionalidade, contacte-nos em <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a>.',
        followUp: ['features', 'download', 'contact']
    },
    schedules: {
        text: '👥 <strong>Gestão de Horários e Equipas:</strong><br><br>A Trakiu permite gerir tudo num só lugar:<br><br>📅 <strong>Escalas flexíveis</strong> adaptadas à sua equipa<br>🏖️ <strong>Gestão de férias</strong><br>📋 <strong>Gestão de tarefas</strong><br><br>Para informações mais detalhadas sobre estas funcionalidades, contacte-nos em <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a>.',
        followUp: ['features', 'dashboard', 'contact']
    },
    dashboard: {
        text: '📊 <strong>Dashboard e Notificações:</strong><br><br>A Trakiu oferece uma visão clara do dia a dia:<br><br>📌 <strong>Dashboard intuitivo</strong> para acompanhar a equipa<br>🔔 <strong>Sistema de notificações push</strong> para manter todos informados<br><br>Para saber mais detalhes, contacte-nos em <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a>.',
        followUp: ['features', 'schedules', 'contact']
    },

    // --- DIFERENCIAÇÃO (conforme secção "O QUE NOS DIFERENCIA" do site) ---
    differentiation: {
        text: '🏆 <strong>O que nos diferencia:</strong><br><br>💡 <strong>Simplicidade Real</strong> — UX/UI moderno, experiência intuitiva que não requer treino.<br><br>📱 <strong>Gestão na Palma da Mão</strong> — Acesso total em qualquer lugar via smartphone. Aprovações e controlo total.<br><br>⚡ <strong>Implementação Rápida</strong> — Sem configurações pesadas ou servidores locais. A equipa começa a usar em minutos.<br><br>🤝 <strong>Suporte Próximo</strong> — Tecnologia com rosto humano. Equipa de suporte dedicada e acessível.',
        followUp: ['features', 'pricing', 'acquire']
    },

    // --- PREÇOS E PLANOS (conforme secção "PLANOS E PREÇOS" do site) ---
    pricing: {
        text: '💰 <strong>Planos disponíveis:</strong><br><br>🔹 <strong>Micro (Base)</strong> — 20€/mês* ou 200€/ano*<br>Até 5 utilizadores, 1 admin<br><em>🎉 Promoção -20% (antes 25€/mês)</em><br><br>🔹 <strong>Equipa (Crescimento)</strong> — 30€/mês* ou 300€/ano*<br>Até 10 utilizadores, 2 admins<br><em>🎉 Promoção -20% (antes 37,5€/mês)</em><br><br>🔹 <strong>Avançado (Personalizado)</strong> — Sob consulta<br>+10 utilizadores, admins ilimitados, multi-localização, relatórios completos<br><br><small>* Preços sem IVA</small>',
        followUp: ['planMicro', 'planTeam', 'planAdvanced']
    },
    planMicro: {
        text: '🔹 <strong>Plano Micro (Base):</strong><br><br>💲 <strong>20€/mês</strong> ou <strong>200€/ano</strong> (sem IVA)<br><em>Promoção -20% — antes 25€/mês!</em><br><br>Descrição: <strong>Simples, poderosa e acessível</strong><br><br>Inclui:<br>✅ Até <strong>5 utilizadores</strong><br>✅ <strong>1 administrador</strong><br><br>Ideal para micro-empresas e equipas pequenas! 🏢',
        followUp: ['planTeam', 'planAdvanced', 'acquire']
    },
    planTeam: {
        text: '🔹 <strong>Plano Equipa (Crescimento):</strong><br><br>💲 <strong>30€/mês</strong> ou <strong>300€/ano</strong> (sem IVA)<br><em>Promoção -20% — antes 37,5€/mês!</em><br><br>Descrição: <strong>Ideal para equipas em expansão</strong><br><br>Inclui:<br>✅ Até <strong>10 utilizadores</strong><br>✅ <strong>2 administradores</strong><br><br>Perfeito para PMEs em crescimento! 📈',
        followUp: ['planMicro', 'planAdvanced', 'acquire']
    },
    planAdvanced: {
        text: '🔹 <strong>Plano Avançado (Personalizado):</strong><br><br>💲 <strong>Sob consulta</strong> — preço personalizado<br><br>Descrição: <strong>Soluções para empresas de qualquer tamanho</strong><br><br>Inclui:<br>✅ <strong>Mais de 10 utilizadores</strong><br>✅ <strong>Administradores ilimitados</strong><br>✅ <strong>Multi-localização</strong><br>✅ <strong>Relatórios completos</strong><br><br>Contacte-nos para um orçamento à medida! 🏗️',
        followUp: ['acquire', 'contact', 'pricing']
    },
    comparePlans: {
        text: '📊 <strong>Comparação de Planos:</strong><br><br><strong>Micro — 20€/mês:</strong><br>• 5 utilizadores, 1 admin<br>• Simples, poderosa e acessível<br><br><strong>Equipa — 30€/mês:</strong><br>• 10 utilizadores, 2 admins<br>• Ideal para equipas em expansão<br><br><strong>Avançado — Sob consulta:</strong><br>• +10 utilizadores, admins ilimitados<br>• Multi-localização, relatórios completos<br><br>Todos os preços sem IVA. Ambos com promoção de -20%! 🎉',
        followUp: ['planMicro', 'planTeam', 'planAdvanced']
    },
    annual: {
        text: '📅 <strong>Opção Anual:</strong><br><br>Os planos podem ser pagos mensalmente ou anualmente:<br><br>🔹 <strong>Micro:</strong> 20€/mês ou 200€/ano (poupa 2 meses)<br>🔹 <strong>Equipa:</strong> 30€/mês ou 300€/ano (poupa 2 meses)<br><br>Todos com promoção de -20% sobre o preço original! 💰<br><small>Preços sem IVA</small>',
        followUp: ['pricing', 'acquire', 'contact']
    },

    // --- AQUISIÇÃO ---
    acquire: {
        text: '🛒 <strong>Como adquirir a Trakiu?</strong><br><br>É muito simples! Contacte-nos por um dos meios disponíveis:<br><br>📧 <strong>Email:</strong> <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a><br>🌐 <strong>Site:</strong> <a href="https://www.trakiu.com/#contact" style="color: var(--cyan);">www.trakiu.com</a><br><br>Indique-nos o plano pretendido e a dimensão da sua equipa. Responderemos o mais brevemente possível! 🙌',
        followUp: ['pricing', 'download', 'contact']
    },
    trial: {
        text: '🆓 <strong>Quer experimentar?</strong><br><br>Contacte-nos para saber mais sobre como pode experimentar a plataforma:<br><br>📧 <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a><br>🌐 <a href="https://www.trakiu.com/#contact" style="color: var(--cyan);">www.trakiu.com</a><br><br>Teremos todo o gosto em esclarecer as suas dúvidas e apresentar a Trakiu! 🎯',
        followUp: ['acquire', 'pricing', 'contact']
    },

    // --- DOWNLOAD ---
    download: {
        text: '📲 <strong>Descarregue a app Trakiu:</strong><br><br>🍎 <strong>App Store (iOS):</strong><br><a href="https://apps.apple.com/pt/app/trakiu/id6502695600" target="_blank" style="color: var(--cyan);">Descarregar para iPhone/iPad</a><br><br>🤖 <strong>Google Play (Android):</strong><br><a href="https://play.google.com/store/apps/details?id=com.thepinkseagull.traxler" target="_blank" style="color: var(--cyan);">Descarregar para Android</a><br><br>A instalação é rápida! 🚀',
        followUp: ['features', 'login', 'acquire']
    },
    login: {
        text: '🔐 <strong>Acesso / Login:</strong><br><br>Aceda à plataforma em:<br><a href="https://app.trakiu.com" style="color: var(--cyan);">app.trakiu.com</a><br><br>Se precisar de ajuda com o acesso, contacte-nos em <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a>.',
        followUp: ['download', 'contact', 'features']
    },

    // --- CONTACTO ---
    contact: {
        text: '📞 <strong>Fale connosco!</strong><br><br>Estamos disponíveis para esclarecer qualquer dúvida:<br><br>📧 <strong>Email:</strong> <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a><br>🌐 <strong>Site:</strong> <a href="https://www.trakiu.com/#contact" style="color: var(--cyan);">www.trakiu.com</a><br>📱 <strong>App:</strong> <a href="https://app.trakiu.com" style="color: var(--cyan);">app.trakiu.com</a><br><br>Teremos todo o gosto em ajudá-lo! 😊',
        followUp: ['acquire', 'pricing', 'features']
    },
    support: {
        text: '🆘 <strong>Precisa de ajuda?</strong><br><br>A Trakiu tem uma equipa de <strong>suporte dedicada e acessível</strong>. Contacte-nos:<br><br>📧 <strong>Email:</strong> <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a><br>🌐 <strong>Site:</strong> <a href="https://www.trakiu.com/#contact" style="color: var(--cyan);">www.trakiu.com</a><br><br>Tecnologia com rosto humano — acompanhamos o seu crescimento! 🤝',
        followUp: ['contact', 'features', 'pricing']
    },

    // --- PRIVACIDADE ---
    privacy: {
        text: '🛡️ <strong>Política de Privacidade:</strong><br><br>A Trakiu leva a proteção dos seus dados a sério. Consulte a nossa política de privacidade completa em:<br><br>🔗 <a href="https://www.trakiu.com/privacy.html" style="color: var(--cyan);">www.trakiu.com/privacy.html</a><br><br>Para questões sobre privacidade e dados, contacte-nos em <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a>.',
        followUp: ['contact', 'features', 'pricing']
    },

    // --- MISC ---
    thanks: {
        text: 'De nada! 😊 Estou sempre disponível para ajudar. Se surgir mais alguma dúvida, não hesite em perguntar ou contactar-nos diretamente em <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a>. 🙌',
        followUp: ['what', 'features', 'contact']
    },
    moreInfo: {
        text: 'Para informações mais detalhadas sobre este tema, contacte-nos diretamente:<br><br>📧 <strong>Email:</strong> <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a><br>🌐 <strong>Site:</strong> <a href="https://www.trakiu.com/#contact" style="color: var(--cyan);">www.trakiu.com</a><br><br>Teremos todo o gosto em esclarecer a sua dúvida! 😊',
        followUp: ['contact', 'features', 'pricing']
    }
};

const followUpLabels = {
    what: 'O que é a Trakiu?',
    greeting: 'Voltar ao início',
    features: 'Funcionalidades',
    gps: 'Picagem GPS',
    schedules: 'Horários e Equipas',
    dashboard: 'Dashboard',
    differentiation: 'O que nos diferencia',
    pricing: 'Planos e Preços',
    planMicro: 'Plano Micro',
    planTeam: 'Plano Equipa',
    planAdvanced: 'Plano Avançado',
    comparePlans: 'Comparar planos',
    annual: 'Opção anual',
    acquire: 'Como adquirir?',
    trial: 'Experimentar',
    download: 'Descarregar a app',
    login: 'Login / Acesso',
    contact: 'Falar connosco',
    support: 'Suporte',
    privacy: 'Privacidade',
    thanks: 'Obrigado!',
    moreInfo: 'Mais informações'
};

// ============================================
// MOTOR DE NLP - Correspondência inteligente
// ============================================

const keywordMap = [
    // Saudações
    { keys: ['olá', 'ola', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'hey', 'hello', 'hi'], topic: 'greeting' },
    // Agradecimentos
    { keys: ['obrigado', 'obrigada', 'thanks', 'valeu', 'agradeço', 'grato', 'grata'], topic: 'thanks' },
    // O que é
    { keys: ['o que é', 'o que e', 'o que faz', 'para que serve', 'que aplicação', 'que app', 'sobre a trakiu', 'explicar', 'explica', 'apresentar', 'apresentação', 'o que é a trakiu'], topic: 'what' },
    // Funcionalidades gerais
    { keys: ['funcionalidade', 'funcionalidades', 'função', 'funções', 'recurso', 'recursos', 'módulo', 'modulo', 'módulos', 'solução', 'solucao', 'como funciona', 'funcionamento', 'como usar', 'como utilizar'], topic: 'features' },
    // GPS / Picagem
    { keys: ['gps', 'geolocalização', 'geolocalizacao', 'localização', 'localizacao', 'ponto', 'picagem', 'picar', 'check-in', 'checkin', 'check in', 'check-out', 'checkout', 'registo de ponto', 'registar ponto', 'relógio de ponto', 'relogio de ponto', 'anti-fraude', 'antifraude', 'fraude'], topic: 'gps' },
    // Horários e Escalas
    { keys: ['horário', 'horario', 'horários', 'escala', 'escalas', 'turno', 'turnos', 'férias', 'ferias', 'tarefa', 'tarefas'], topic: 'schedules' },
    // Dashboard
    { keys: ['dashboard', 'painel', 'visão geral', 'resumo', 'notificação', 'notificações', 'notificacao', 'notificacoes', 'alerta', 'alertas', 'push'], topic: 'dashboard' },
    // Diferenciação
    { keys: ['diferencia', 'diferencial', 'diferenciação', 'diferenciacao', 'vantagem', 'vantagens', 'porquê', 'porque', 'por que', 'benefício', 'beneficio', 'benefícios', 'simplicidade', 'simples', 'mobile-first', 'mobile first', 'implementação rápida', 'implementacao rapida', 'suporte próximo', 'suporte proximo', 'vale a pena', 'melhor', 'concorrência', 'concorrencia', 'alternativa', 'vs', 'versus'], topic: 'differentiation' },
    // Preços
    { keys: ['preço', 'preco', 'preços', 'precos', 'custo', 'custos', 'valor', 'valores', 'quanto custa', 'quanto é', 'price', 'pricing', 'tarifário', 'tarifario', 'plano', 'planos', 'tabela de preços', 'orçamento', 'orcamento', 'investimento'], topic: 'pricing' },
    // Planos específicos
    { keys: ['plano micro', 'plano base', '5 utilizadores', 'plano mais barato', 'mais barato', 'básico', 'basico'], topic: 'planMicro' },
    { keys: ['plano equipa', 'plano crescimento', '10 utilizadores', 'plano médio', 'plano medio'], topic: 'planTeam' },
    { keys: ['plano avançado', 'plano avancado', 'plano empresarial', 'enterprise', 'ilimitado', 'sob consulta', 'personalizado', 'grande empresa', 'grandes empresas', 'mais de 10', 'multi-localização', 'multilocalização', 'relatórios completos'], topic: 'planAdvanced' },
    // Comparar planos
    { keys: ['comparar', 'comparação', 'comparacao', 'diferença entre planos', 'diferenca entre planos', 'qual plano', 'qual o melhor plano', 'que plano escolher'], topic: 'comparePlans' },
    // Pagamento anual
    { keys: ['anual', 'anuidade', 'pagamento anual', 'por ano', 'desconto anual', 'pagar por ano', 'mensal ou anual'], topic: 'annual' },
    // Adquirir
    { keys: ['comprar', 'adquirir', 'subscrever', 'contratar', 'aquisição', 'aquisicao', 'como faço para ter', 'como começo', 'como comeco', 'aderir', 'inscrever', 'registar', 'sign up', 'signup', 'quero usar', 'quero contratar', 'como posso ter', 'começar agora'], topic: 'acquire' },
    // Trial / Demo
    { keys: ['demo', 'demonstração', 'demonstracao', 'teste', 'testar', 'experimentar', 'trial', 'gratuito', 'grátis', 'gratis', 'período de teste', 'periodo de teste', 'provar'], topic: 'trial' },
    // Download
    { keys: ['download', 'descarregar', 'baixar', 'transferir', 'instalar', 'instalação', 'instalacao', 'app store', 'google play', 'play store', 'apple store', 'ios', 'android', 'iphone', 'samsung'], topic: 'download' },
    // Login
    { keys: ['login', 'entrar', 'aceder', 'acesso', 'log in', 'iniciar sessão', 'sessão', 'sessao', 'conta', 'password', 'palavra-passe', 'senha', 'esqueci', 'credenciais', 'app.trakiu'], topic: 'login' },
    // Suporte
    { keys: ['suporte', 'assistência', 'assistencia', 'problema', 'erro', 'bug', 'não funciona', 'nao funciona', 'reclamação', 'reclamacao', 'ajuda', 'help', 'socorro', 'dúvida', 'duvida'], topic: 'support' },
    // Contacto
    { keys: ['contacto', 'contato', 'contactar', 'email', 'e-mail', 'falar', 'falar com alguém', 'falar com alguem', 'atendimento', 'comunicar', 'geral@trakiu'], topic: 'contact' },
    // Privacidade
    { keys: ['rgpd', 'gdpr', 'privacidade', 'proteção de dados', 'protecao de dados', 'dados pessoais', 'política de privacidade', 'politica de privacidade', 'segurança', 'seguranca', 'cookies'], topic: 'privacy' }
];

// Normalizar texto (remover acentos e converter para minúsculas)
function normalizeText(text) {
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s\-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// Motor de correspondência inteligente com pontuação
function findBestMatch(userText) {
    const normalized = normalizeText(userText);
    const words = normalized.split(' ');
    let bestTopic = null;
    let bestScore = 0;

    for (const entry of keywordMap) {
        let score = 0;
        for (const key of entry.keys) {
            const normalizedKey = normalizeText(key);
            // Correspondência exata da frase
            if (normalized.includes(normalizedKey)) {
                // Bonus para frases mais longas (mais específicas)
                score += normalizedKey.split(' ').length * 3;
            }
            // Correspondência parcial por palavras individuais
            const keyWords = normalizedKey.split(' ');
            for (const kw of keyWords) {
                if (kw.length >= 3 && words.some(w => w.includes(kw) || kw.includes(w))) {
                    score += 1;
                }
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestTopic = entry.topic;
        }
    }

    return bestScore >= 2 ? bestTopic : null;
}

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

// Typing indicator
function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-message bot typing-indicator';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<p><span class="typing-dots"><span>.</span><span>.</span><span>.</span></span></p>';
    chatbotMessages.appendChild(typing);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function removeTyping() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
}

// Update follow-up options
function showFollowUp(keys) {
    chatbotOptions.innerHTML = '';
    keys.forEach(key => {
        if (!followUpLabels[key]) return;
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

    addMessage(followUpLabels[key] || key, 'user');
    showTyping();

    const delay = 400 + Math.random() * 400;
    setTimeout(() => {
        removeTyping();
        addMessage(response.text, 'bot');
        showFollowUp(response.followUp);
    }, delay);
}

// Option button click events
document.querySelectorAll('.chatbot-option').forEach(btn => {
    btn.addEventListener('click', () => {
        handleQuestion(btn.dataset.question);
    });
});

// Free text input - Motor NLP inteligente
function handleFreeText() {
    const text = chatbotInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatbotInput.value = '';
    showTyping();

    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
        removeTyping();

        // Tentar encontrar o melhor tópico
        const topic = findBestMatch(text);

        if (topic && chatResponses[topic]) {
            addMessage(chatResponses[topic].text, 'bot');
            showFollowUp(chatResponses[topic].followUp);
        } else {
            // Fallback - redirecionar para contacto
            addMessage('Obrigado pela sua pergunta! 🤔 Para informações mais detalhadas sobre este tema, contacte-nos diretamente:<br><br>📧 <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a><br>🌐 <a href="https://www.trakiu.com/#contact" style="color: var(--cyan);">www.trakiu.com</a><br><br>Ou selecione um dos temas abaixo:', 'bot');
            showFollowUp(['what', 'features', 'pricing', 'acquire', 'contact']);
        }
    }, delay);
}

if (chatbotSend) {
    chatbotSend.addEventListener('click', handleFreeText);
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleFreeText();
    });
}
