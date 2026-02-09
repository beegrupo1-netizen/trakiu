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
// CHATBOT INTELIGENTE - Base de Conhecimento
// ============================================

const chatResponses = {
    // --- GERAL ---
    what: {
        text: 'A <strong>Trakiu</strong> é um software de gestão de equipas e picagem de ponto com geolocalização GPS. Permite registar presenças com precisão, gerir horários e escalas, acompanhar tarefas e ter uma visão completa da operação da sua equipa — tudo na palma da mão! 📱',
        followUp: ['features', 'pricing', 'howItWorks']
    },
    greeting: {
        text: 'Olá! 👋 Sou o assistente virtual da <strong>Trakiu</strong>. Estou aqui para responder a todas as suas dúvidas sobre a nossa app de gestão de equipas e picagem de ponto por GPS. Como posso ajudar?',
        followUp: ['what', 'features', 'pricing']
    },
    howItWorks: {
        text: '⚙️ <strong>Como funciona a Trakiu?</strong><br><br>1️⃣ <strong>Registe a empresa</strong> — O administrador cria a conta e configura localizações e equipas.<br><br>2️⃣ <strong>Adicione colaboradores</strong> — Convide a equipa via email. Cada um descarrega a app.<br><br>3️⃣ <strong>Picagem de ponto</strong> — Os colaboradores fazem check-in/check-out na app. O GPS valida automaticamente a localização.<br><br>4️⃣ <strong>Acompanhe tudo</strong> — O dashboard mostra presenças, horas, atrasos e relatórios em tempo real.<br><br>É simples e começa a funcionar em minutos! 🚀',
        followUp: ['gps', 'setup', 'features']
    },

    // --- FUNCIONALIDADES ---
    features: {
        text: '✨ <strong>Funcionalidades principais:</strong><br><br>📍 <strong>Picagem por Geolocalização</strong> — Registo de ponto preciso e anti-fraude com verificação GPS em tempo real.<br><br>👥 <strong>Gestão de Horários e Equipas</strong> — Escalas flexíveis, férias e gestão de tarefas num só lugar.<br><br>📊 <strong>Dashboard Intuitivo</strong> — Visão clara do dia a dia com sistema de notificações push.<br><br>📋 <strong>Relatórios Automáticos</strong> — Exportação de dados e análises detalhadas.<br><br>🚀 <strong>Implementação Rápida</strong> — Sem configurações pesadas, a sua equipa começa a usar em minutos.',
        followUp: ['gps', 'schedules', 'dashboard']
    },
    gps: {
        text: '📍 <strong>Picagem de Ponto por GPS:</strong><br><br>O sistema de geolocalização da Trakiu funciona assim:<br><br>✅ O admin define as <strong>localizações autorizadas</strong> (escritório, obra, loja, etc.) com raio de tolerância personalizado.<br><br>✅ Quando o colaborador faz check-in, o GPS do telemóvel <strong>valida automaticamente</strong> se está dentro da zona autorizada.<br><br>✅ O sistema é <strong>anti-fraude</strong> — não é possível picar ponto fora da localização definida.<br><br>✅ As coordenadas ficam registadas para <strong>auditoria e conformidade legal</strong>.<br><br>✅ Funciona com <strong>qualquer smartphone</strong> com GPS (iPhone ou Android).',
        followUp: ['antiFraud', 'multiLocation', 'offline']
    },
    schedules: {
        text: '📅 <strong>Gestão de Horários e Escalas:</strong><br><br>👉 Crie <strong>escalas rotativas ou fixas</strong> para cada equipa ou colaborador.<br><br>👉 Defina <strong>turnos personalizados</strong> (manhã, tarde, noite, misto).<br><br>👉 Configure <strong>tolerâncias de atraso</strong> e regras de horas extra.<br><br>👉 Os colaboradores consultam os seus horários diretamente na app.<br><br>👉 Receba <strong>alertas automáticos</strong> quando alguém se atrasa ou falta.',
        followUp: ['vacations', 'overtime', 'nightShift']
    },
    dashboard: {
        text: '📊 <strong>Dashboard e Relatórios:</strong><br><br>O painel de administração permite ver em tempo real:<br><br>📌 Quem está a trabalhar agora e onde<br>📌 Horas trabalhadas por dia, semana e mês<br>📌 Atrasos, faltas e ausências<br>📌 Relatórios por equipa, departamento ou colaborador<br>📌 Exportação em Excel/PDF para processamento salarial<br>📌 Histórico completo de picagens com coordenadas GPS',
        followUp: ['reports', 'notifications', 'features']
    },
    notifications: {
        text: '🔔 <strong>Sistema de Notificações:</strong><br><br>A Trakiu envia notificações push automáticas para:<br><br>✅ Lembrar o colaborador de fazer check-in/check-out<br>✅ Alertar o admin sobre atrasos ou faltas<br>✅ Avisar sobre pedidos de férias pendentes<br>✅ Notificar alterações de horário ou escala<br>✅ Informar sobre novos anúncios da empresa<br><br>As notificações são personalizáveis e podem ser ativadas/desativadas.',
        followUp: ['schedules', 'dashboard', 'features']
    },
    reports: {
        text: '📋 <strong>Relatórios e Exportação:</strong><br><br>A Trakiu gera relatórios automáticos com:<br><br>📊 Horas trabalhadas por colaborador, equipa ou período<br>📊 Registo de presenças, faltas e atrasos<br>📊 Horas extra e horas noturnas<br>📊 Dados de geolocalização de cada picagem<br>📊 Exportação em <strong>Excel e PDF</strong><br><br>Ideal para processamento salarial e conformidade com o Código do Trabalho! 📝',
        followUp: ['dashboard', 'payroll', 'legal']
    },
    tasks: {
        text: '✅ <strong>Gestão de Tarefas:</strong><br><br>Para além da picagem de ponto, a Trakiu permite:<br><br>📝 Criar e atribuir <strong>tarefas</strong> a colaboradores específicos<br>📝 Definir <strong>prioridades e prazos</strong><br>📝 Acompanhar o <strong>progresso</strong> em tempo real<br>📝 Adicionar <strong>comentários e anexos</strong><br>📝 Receber notificações de <strong>conclusão</strong><br><br>Uma forma simples de organizar o trabalho da equipa!',
        followUp: ['features', 'schedules', 'dashboard']
    },

    // --- PREÇOS E PLANOS ---
    pricing: {
        text: '💰 <strong>Planos disponíveis:</strong><br><br>🔹 <strong>Micro (Base)</strong> — 20€/mês* ou 200€/ano*<br>Até 5 utilizadores, 1 admin<br><em>🎉 Promoção -20% (antes 25€/mês)</em><br><br>🔹 <strong>Equipa (Crescimento)</strong> — 30€/mês* ou 300€/ano*<br>Até 10 utilizadores, 2 admins<br><em>🎉 Promoção -20% (antes 37,5€/mês)</em><br><br>🔹 <strong>Avançado</strong> — Sob consulta<br>+10 utilizadores, admins ilimitados, multi-localização<br><br><small>* Preços sem IVA</small>',
        followUp: ['planMicro', 'planTeam', 'planAdvanced']
    },
    planMicro: {
        text: '🔹 <strong>Plano Micro (Base):</strong><br><br>💲 <strong>20€/mês</strong> ou <strong>200€/ano</strong> (sem IVA)<br><em>Promoção -20% — antes 25€/mês!</em><br><br>Inclui:<br>✅ Até <strong>5 utilizadores</strong><br>✅ <strong>1 administrador</strong><br>✅ Picagem de ponto por GPS<br>✅ Gestão de horários<br>✅ Dashboard e relatórios<br>✅ Notificações push<br>✅ Suporte por email<br><br>Ideal para <strong>micro-empresas e equipas pequenas</strong>! 🏢',
        followUp: ['planTeam', 'acquire', 'trial']
    },
    planTeam: {
        text: '🔹 <strong>Plano Equipa (Crescimento):</strong><br><br>💲 <strong>30€/mês</strong> ou <strong>300€/ano</strong> (sem IVA)<br><em>Promoção -20% — antes 37,5€/mês!</em><br><br>Tudo do plano Micro, mais:<br>✅ Até <strong>10 utilizadores</strong><br>✅ <strong>2 administradores</strong><br>✅ Gestão de equipas avançada<br>✅ Relatórios detalhados<br>✅ Suporte prioritário<br><br>Perfeito para <strong>PMEs em crescimento</strong>! 📈',
        followUp: ['planAdvanced', 'acquire', 'trial']
    },
    planAdvanced: {
        text: '🔹 <strong>Plano Avançado:</strong><br><br>💲 <strong>Sob consulta</strong> — preço personalizado<br><br>Tudo dos planos anteriores, mais:<br>✅ <strong>+10 utilizadores</strong> (sem limite)<br>✅ <strong>Administradores ilimitados</strong><br>✅ <strong>Multi-localização</strong> (várias filiais/obras)<br>✅ Configurações personalizadas<br>✅ Suporte dedicado<br>✅ Onboarding assistido<br><br>Ideal para <strong>grandes empresas e operações complexas</strong>. Contacte-nos para um orçamento personalizado! 🏗️',
        followUp: ['acquire', 'multiLocation', 'contact']
    },
    comparePlans: {
        text: '📊 <strong>Comparação de Planos:</strong><br><br><strong>Micro (20€/mês):</strong><br>• 5 utilizadores, 1 admin<br>• Funcionalidades base completas<br><br><strong>Equipa (30€/mês):</strong><br>• 10 utilizadores, 2 admins<br>• Relatórios avançados, suporte prioritário<br><br><strong>Avançado (sob consulta):</strong><br>• Ilimitado, multi-localização<br>• Configuração personalizada, suporte dedicado<br><br>💡 <strong>Dica:</strong> Todos os planos incluem GPS, dashboard, notificações e todas as funcionalidades core!',
        followUp: ['planMicro', 'planTeam', 'planAdvanced']
    },
    annual: {
        text: '📅 <strong>Pagamento Anual:</strong><br><br>Ao escolher o pagamento anual, paga <strong>10 meses pelo preço de 12</strong>:<br><br>🔹 Micro: 200€/ano (em vez de 240€) — <strong>poupa 40€</strong><br>🔹 Equipa: 300€/ano (em vez de 360€) — <strong>poupa 60€</strong><br><br>O pagamento anual garante-lhe um desconto adicional significativo! 💰',
        followUp: ['pricing', 'payment', 'acquire']
    },

    // --- AQUISIÇÃO E PAGAMENTO ---
    acquire: {
        text: '🛒 <strong>Como adquirir a Trakiu?</strong><br><br>É muito simples! Basta seguir estes passos:<br><br>1️⃣ <strong>Escolha o plano</strong> que melhor se adapta à sua equipa<br>2️⃣ <strong>Contacte-nos</strong> por um dos meios abaixo<br>3️⃣ <strong>Receba o acesso</strong> em menos de 24 horas<br><br>📧 <strong>Email:</strong> <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a><br>🌐 <strong>Site:</strong> <a href="https://www.trakiu.com/#contact" style="color: var(--cyan);">www.trakiu.com</a><br><br>Indique-nos o plano pretendido e a dimensão da sua equipa. Responderemos no prazo máximo de 24h! 🙌',
        followUp: ['pricing', 'trial', 'payment']
    },
    trial: {
        text: '🆓 <strong>Período de Demonstração:</strong><br><br>Quer experimentar antes de decidir? Contacte-nos e podemos:<br><br>✅ Fazer uma <strong>demonstração personalizada</strong> da plataforma<br>✅ Configurar o seu ambiente de teste<br>✅ Responder a todas as dúvidas técnicas<br><br>📧 Envie email para <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a> com o assunto "<strong>Demo Trakiu</strong>" e entraremos em contacto! 🎯',
        followUp: ['acquire', 'pricing', 'contact']
    },
    payment: {
        text: '💳 <strong>Métodos de Pagamento:</strong><br><br>A Trakiu aceita os seguintes métodos:<br><br>✅ <strong>Transferência bancária</strong><br>✅ <strong>Débito direto (SEPA)</strong><br>✅ <strong>MBWay</strong><br><br>A faturação é mensal ou anual conforme o plano escolhido. Todas as faturas são emitidas automaticamente e enviadas por email. 📄',
        followUp: ['annual', 'contract', 'acquire']
    },
    contract: {
        text: '📝 <strong>Contrato e Compromisso:</strong><br><br>✅ <strong>Sem fidelização obrigatória</strong> — pode cancelar a qualquer momento.<br>✅ No plano mensal, o cancelamento entra em vigor no mês seguinte.<br>✅ No plano anual, a subscrição é válida até ao final do período pago.<br>✅ Não há penalizações por cancelamento.<br><br>Queremos que fique connosco porque gosta do serviço, não por obrigação! 😊',
        followUp: ['cancel', 'pricing', 'acquire']
    },
    cancel: {
        text: '❌ <strong>Como cancelar a subscrição?</strong><br><br>Para cancelar, basta enviar um email para <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a> com o pedido de cancelamento.<br><br>✅ Processamos o cancelamento em 24-48 horas<br>✅ Sem penalizações nem custos adicionais<br>✅ Os seus dados permanecem acessíveis durante 30 dias após o cancelamento<br>✅ Pode exportar todos os relatórios antes do encerramento<br><br>Se está a considerar cancelar, fale connosco — talvez possamos ajudar a resolver eventuais problemas! 🤝',
        followUp: ['contact', 'pricing', 'acquire']
    },

    // --- DOWNLOAD E INSTALAÇÃO ---
    download: {
        text: '📲 <strong>Descarregue a app Trakiu:</strong><br><br>🍎 <strong>App Store (iOS):</strong><br><a href="https://apps.apple.com/pt/app/trakiu/id6502695600" target="_blank" style="color: var(--cyan);">Descarregar para iPhone/iPad</a><br><br>🤖 <strong>Google Play (Android):</strong><br><a href="https://play.google.com/store/apps/details?id=com.thepinkseagull.traxler" target="_blank" style="color: var(--cyan);">Descarregar para Android</a><br><br>A instalação é rápida e pode começar a usar imediatamente! Compatible com iPhone, iPad e smartphones Android. 🚀',
        followUp: ['setup', 'requirements', 'login']
    },
    setup: {
        text: '🔧 <strong>Como configurar a Trakiu:</strong><br><br>Após receber os acessos de administrador:<br><br>1️⃣ <strong>Aceda ao painel web</strong> em <a href="https://app.trakiu.com" style="color: var(--cyan);">app.trakiu.com</a><br>2️⃣ <strong>Configure as localizações</strong> da sua empresa (morada, raio GPS)<br>3️⃣ <strong>Crie os horários</strong> e escalas de trabalho<br>4️⃣ <strong>Adicione colaboradores</strong> — cada um recebe um convite por email<br>5️⃣ <strong>Os colaboradores descarregam a app</strong> e fazem login<br>6️⃣ <strong>Pronto!</strong> A equipa já pode picar ponto! ✅<br><br>Todo o processo demora menos de <strong>15 minutos</strong>!',
        followUp: ['addUsers', 'gps', 'download']
    },
    login: {
        text: '🔐 <strong>Acesso / Login:</strong><br><br>👨‍💼 <strong>Administradores</strong> acedem ao painel web em:<br><a href="https://app.trakiu.com" style="color: var(--cyan);">app.trakiu.com</a><br><br>👷 <strong>Colaboradores</strong> utilizam a app móvel (iOS/Android).<br><br>Cada utilizador recebe credenciais por email ao ser adicionado à plataforma. Se esqueceu a password, pode recuperá-la através da opção "Esqueci a password" no ecrã de login.',
        followUp: ['download', 'setup', 'forgotPassword']
    },
    forgotPassword: {
        text: '🔑 <strong>Esqueceu a password?</strong><br><br>No ecrã de login da app ou em <a href="https://app.trakiu.com" style="color: var(--cyan);">app.trakiu.com</a>:<br><br>1️⃣ Clique em "<strong>Esqueci a password</strong>"<br>2️⃣ Introduza o seu <strong>email registado</strong><br>3️⃣ Receberá um link para <strong>redefinir a password</strong><br><br>Se o problema persistir, contacte o administrador da sua empresa ou envie email para <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a>.',
        followUp: ['login', 'contact', 'support']
    },
    requirements: {
        text: '📱 <strong>Requisitos da App:</strong><br><br>🍎 <strong>iOS:</strong> iPhone ou iPad com iOS 15.0 ou superior<br>🤖 <strong>Android:</strong> Smartphone com Android 8.0 ou superior<br>🌐 <strong>Web:</strong> Qualquer browser moderno (Chrome, Safari, Firefox, Edge)<br><br>Requisitos adicionais:<br>✅ GPS ativado no dispositivo<br>✅ Conexão à Internet (Wi-Fi ou dados móveis)<br>✅ Permissões de localização ativadas para a app<br><br>A app é leve e não consome muita bateria! 🔋',
        followUp: ['download', 'battery', 'offline']
    },

    // --- TÉCNICO ---
    antiFraud: {
        text: '🛡️ <strong>Sistema Anti-Fraude:</strong><br><br>A Trakiu utiliza vários mecanismos para garantir a veracidade das picagens:<br><br>🔒 <strong>Verificação GPS em tempo real</strong> — A localização é validada no momento do check-in.<br>🔒 <strong>Raio de tolerância</strong> — Configurável por localização (ex: 50m, 100m, 200m).<br>🔒 <strong>Bloqueio de picagem remota</strong> — Não é possível picar fora da zona autorizada.<br>🔒 <strong>Registo de coordenadas</strong> — Cada picagem fica registada com latitude e longitude.<br>🔒 <strong>Deteção de GPS falso</strong> — O sistema deteta apps de simulação de localização.<br><br>Total transparência e fiabilidade! ✅',
        followUp: ['gps', 'security', 'legal']
    },
    multiLocation: {
        text: '🏢 <strong>Multi-localização:</strong><br><br>A Trakiu suporta múltiplas localizações para empresas com:<br><br>📍 Vários escritórios ou filiais<br>📍 Obras e estaleiros temporários<br>📍 Lojas em diferentes locais<br>📍 Equipas que se deslocam entre pontos<br><br>Cada localização tem o seu próprio <strong>raio GPS configurável</strong> e pode ter equipas/horários diferentes.<br><br>Disponível no <strong>Plano Avançado</strong> ou mediante consulta para necessidades específicas.',
        followUp: ['planAdvanced', 'gps', 'acquire']
    },
    offline: {
        text: '📶 <strong>Funcionamento Offline:</strong><br><br>A Trakiu precisa de ligação à Internet para registar as picagens em tempo real. No entanto:<br><br>✅ Se houver uma <strong>falha momentânea de rede</strong>, a picagem fica em espera e é sincronizada automaticamente assim que a ligação é restabelecida.<br>✅ Os <strong>horários</strong> ficam disponíveis na cache da app.<br>✅ O sistema é <strong>tolerante a falhas</strong> de conectividade breves.<br><br>Para um funcionamento ideal, recomendamos Wi-Fi ou dados móveis ativos.',
        followUp: ['requirements', 'gps', 'support']
    },
    battery: {
        text: '🔋 <strong>Consumo de Bateria:</strong><br><br>A Trakiu foi otimizada para ter o <strong>menor impacto possível</strong> na bateria:<br><br>✅ O GPS só é ativado no <strong>momento da picagem</strong>, não continuamente.<br>✅ Não há tracking de localização em segundo plano.<br>✅ As notificações push usam os serviços nativos do sistema.<br>✅ A app é leve (menos de 50MB).<br><br>O impacto na bateria é <strong>mínimo</strong> e praticamente imperceptível no uso diário! 😊',
        followUp: ['requirements', 'gps', 'download']
    },
    security: {
        text: '🔐 <strong>Segurança e Privacidade:</strong><br><br>A Trakiu leva a segurança dos seus dados muito a sério:<br><br>🔒 <strong>Encriptação SSL/TLS</strong> em todas as comunicações<br>🔒 <strong>Dados alojados na UE</strong> com cumprimento do RGPD<br>🔒 <strong>Backups automáticos</strong> diários<br>🔒 <strong>Controlo de acessos</strong> por perfis (admin/colaborador)<br>🔒 <strong>Sem partilha de dados</strong> com terceiros<br>🔒 <strong>Política de privacidade</strong> transparente<br><br>Consulte a nossa <a href="https://www.trakiu.com/privacy.html" style="color: var(--cyan);">Política de Privacidade</a> para mais detalhes.',
        followUp: ['privacy', 'legal', 'antiFraud']
    },
    privacy: {
        text: '🛡️ <strong>RGPD e Proteção de Dados:</strong><br><br>A Trakiu está em <strong>total conformidade com o RGPD</strong>:<br><br>✅ Recolhemos apenas os dados necessários à prestação do serviço<br>✅ Os colaboradores são informados sobre os dados recolhidos<br>✅ É possível solicitar <strong>eliminação de dados pessoais</strong><br>✅ Não vendemos nem partilhamos dados com terceiros<br>✅ Os dados de geolocalização são usados <strong>exclusivamente para validação de ponto</strong><br><br>Consulte: <a href="https://www.trakiu.com/privacy.html" style="color: var(--cyan);">Política de Privacidade completa</a>',
        followUp: ['security', 'legal', 'contact']
    },

    // --- RECURSOS HUMANOS ---
    vacations: {
        text: '🏖️ <strong>Gestão de Férias e Ausências:</strong><br><br>A Trakiu facilita a gestão de férias:<br><br>📅 Os colaboradores <strong>submetem pedidos de férias</strong> pela app<br>📅 O admin <strong>aprova ou rejeita</strong> com um clique<br>📅 O <strong>calendário</strong> mostra as ausências planeadas da equipa<br>📅 Registo de <strong>faltas justificadas e injustificadas</strong><br>📅 Controlo de <strong>dias disponíveis</strong> por colaborador<br><br>Tudo organizado e sem papéis! 📝',
        followUp: ['schedules', 'overtime', 'reports']
    },
    overtime: {
        text: '⏰ <strong>Horas Extraordinárias:</strong><br><br>A Trakiu calcula automaticamente as horas extra:<br><br>✅ Identifica quando um colaborador <strong>ultrapassa o horário</strong> definido<br>✅ Regista <strong>horas extras diárias, semanais e mensais</strong><br>✅ Distingue entre <strong>horas normais, noturnas e feriado</strong><br>✅ Auxilia o cálculo de <strong>remuneração adicional</strong><br>✅ Exportável para <strong>processamento salarial</strong><br><br>Legal e transparente, conforme o Código do Trabalho! ⚖️',
        followUp: ['nightShift', 'payroll', 'reports']
    },
    nightShift: {
        text: '🌙 <strong>Turnos Noturnos:</strong><br><br>A Trakiu suporta totalmente turnos noturnos e rotativos:<br><br>✅ Configure turnos que <strong>cruzam a meia-noite</strong> (ex: 22h-06h)<br>✅ O sistema calcula corretamente as <strong>horas noturnas</strong><br>✅ Suporte para <strong>escalas rotativas</strong> (manhã/tarde/noite)<br>✅ Registo diferenciado para efeitos de <strong>remuneração noturna</strong><br><br>Ideal para indústria, hotelaria, saúde e segurança! 🏥',
        followUp: ['schedules', 'overtime', 'features']
    },
    payroll: {
        text: '💼 <strong>Integração com Processamento Salarial:</strong><br><br>A Trakiu facilita o processamento de salários:<br><br>📊 <strong>Exportação de dados</strong> em Excel com horas trabalhadas mensais<br>📊 Discriminação de <strong>horas normais, extras e noturnas</strong><br>📊 Registo de <strong>faltas e ausências</strong> por tipo<br>📊 Dados prontos para integrar com software de contabilidade<br><br>Reduz drasticamente o trabalho administrativo de RH! 📉',
        followUp: ['reports', 'overtime', 'features']
    },
    addUsers: {
        text: '👤 <strong>Como adicionar colaboradores:</strong><br><br>1️⃣ Aceda ao painel de admin em <a href="https://app.trakiu.com" style="color: var(--cyan);">app.trakiu.com</a><br>2️⃣ Vá a <strong>"Colaboradores" → "Adicionar"</strong><br>3️⃣ Introduza o <strong>nome e email</strong> do colaborador<br>4️⃣ Atribua a <strong>equipa e horário</strong><br>5️⃣ O colaborador recebe um <strong>convite por email</strong> com as credenciais<br>6️⃣ Descarrega a app e já pode picar ponto! ✅<br><br>Rápido e sem complicações!',
        followUp: ['setup', 'schedules', 'download']
    },
    moreUsers: {
        text: '👥 <strong>Preciso de mais utilizadores:</strong><br><br>Se a sua equipa cresceu além do limite do plano atual:<br><br>🔹 <strong>Plano Micro</strong> (até 5 users) → Upgrade para <strong>Equipa</strong><br>🔹 <strong>Plano Equipa</strong> (até 10 users) → Upgrade para <strong>Avançado</strong><br>🔹 <strong>Plano Avançado</strong> → Sem limites!<br><br>O upgrade é feito em minutos. Contacte-nos em <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a> e ajustamos o seu plano sem interrupção do serviço! 📈',
        followUp: ['pricing', 'planAdvanced', 'contact']
    },

    // --- LEGAL E CONFORMIDADE ---
    legal: {
        text: '⚖️ <strong>Conformidade Legal:</strong><br><br>A Trakiu ajuda a sua empresa a cumprir com:<br><br>📜 <strong>Código do Trabalho Português</strong> — Registo de ponto obrigatório (Art. 202º)<br>📜 <strong>RGPD</strong> — Proteção de dados pessoais dos colaboradores<br>📜 <strong>ACT</strong> — Autoridade para as Condições do Trabalho pode auditar registos<br><br>O registo eletrónico de ponto por GPS é legalmente válido e aceite como prova em tribunal e para efeitos de fiscalização. 📋',
        followUp: ['privacy', 'reports', 'antiFraud']
    },

    // --- SETORES E CASOS DE USO ---
    sectors: {
        text: '🏢 <strong>Setores que utilizam a Trakiu:</strong><br><br>🔨 <strong>Construção Civil</strong> — Controlo de presenças em obras<br>🛒 <strong>Retalho</strong> — Gestão de turnos em lojas<br>🏥 <strong>Saúde</strong> — Escalas hospitalares e clínicas<br>🍽️ <strong>Restauração</strong> — Turnos rotativos e extras<br>🏭 <strong>Indústria</strong> — Fábricas com múltiplos turnos<br>🧹 <strong>Limpezas</strong> — Equipas distribuídas por localizações<br>🔒 <strong>Segurança</strong> — Vigilantes em diferentes postos<br>🚛 <strong>Logística</strong> — Armazéns e distribuição<br>🏫 <strong>Educação</strong> — Funcionários não-docentes<br><br>E muitos mais! Se tem uma equipa, a Trakiu é para si. 💪',
        followUp: ['features', 'multiLocation', 'pricing']
    },
    construction: {
        text: '🔨 <strong>Trakiu para Construção Civil:</strong><br><br>Ideal para controlar presenças em obras:<br><br>✅ <strong>Multi-localização</strong> — Controle várias obras em simultâneo<br>✅ <strong>GPS anti-fraude</strong> — Garanta que estão no estaleiro<br>✅ <strong>Escalas dinâmicas</strong> — Mude equipas entre obras facilmente<br>✅ <strong>Horas extra</strong> — Cálculo automático para processamento<br>✅ <strong>Relatórios por obra</strong> — Saiba exatamente as horas em cada projeto<br><br>Simplifique a gestão de mão-de-obra! 🏗️',
        followUp: ['multiLocation', 'overtime', 'pricing']
    },
    retail: {
        text: '🛒 <strong>Trakiu para Retalho:</strong><br><br>Perfeito para lojas e cadeias comerciais:<br><br>✅ <strong>Turnos flexíveis</strong> — Manhã, tarde, noite e fins de semana<br>✅ <strong>Multi-loja</strong> — Controle várias lojas numa só plataforma<br>✅ <strong>Part-time e full-time</strong> — Horários mistos sem confusão<br>✅ <strong>Ponto por GPS</strong> — Cada loja com a sua zona de picagem<br>✅ <strong>Relatórios</strong> — Horas por loja e por colaborador<br><br>Controlo total da equipa comercial! 🏪',
        followUp: ['multiLocation', 'schedules', 'pricing']
    },

    // --- SUPORTE ---
    support: {
        text: '🆘 <strong>Suporte Técnico:</strong><br><br>Precisa de ajuda? Estamos disponíveis:<br><br>📧 <strong>Email:</strong> <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a><br>⏰ <strong>Horário:</strong> Segunda a Sexta, 9h-18h<br>⏱️ <strong>Tempo de resposta:</strong> Até 24 horas (dias úteis)<br><br>No plano Equipa e Avançado tem <strong>suporte prioritário</strong> com resposta mais rápida.<br><br>Para questões urgentes, indique "URGENTE" no assunto do email. 📩',
        followUp: ['contact', 'forgotPassword', 'features']
    },
    help: {
        text: '❓ <strong>Precisa de ajuda?</strong><br><br>Posso ajudá-lo com diversas questões:<br><br>📱 <strong>Sobre a Trakiu</strong> — O que é e como funciona<br>✨ <strong>Funcionalidades</strong> — GPS, horários, relatórios, etc.<br>💰 <strong>Planos e Preços</strong> — Micro, Equipa, Avançado<br>🛒 <strong>Como adquirir</strong> — Processo de compra<br>📲 <strong>Download e Setup</strong> — Instalação e configuração<br>🔐 <strong>Segurança</strong> — RGPD, encriptação, privacidade<br>⚖️ <strong>Legal</strong> — Conformidade com o Código do Trabalho<br>🏢 <strong>Setores</strong> — Casos de uso por indústria<br><br>Basta escrever a sua pergunta! 💬',
        followUp: ['what', 'features', 'pricing']
    },

    // --- CONTACTO ---
    contact: {
        text: '📞 <strong>Fale connosco!</strong><br><br>Estamos disponíveis para esclarecer qualquer dúvida ou ajudar na configuração:<br><br>📧 <strong>Email:</strong> <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a><br>🌐 <strong>Site:</strong> <a href="https://www.trakiu.com/#contact" style="color: var(--cyan);">www.trakiu.com</a><br>📱 <strong>App:</strong> <a href="https://app.trakiu.com" style="color: var(--cyan);">app.trakiu.com</a><br><br>Teremos todo o gosto em ajudá-lo! A equipa Trakiu responde em menos de 24 horas. 😊',
        followUp: ['acquire', 'support', 'pricing']
    },

    // --- VANTAGENS E DIFERENCIAÇÃO ---
    advantages: {
        text: '🏆 <strong>Porquê escolher a Trakiu?</strong><br><br>💡 <strong>Simplicidade</strong> — Interface intuitiva, sem curva de aprendizagem<br>📍 <strong>GPS Anti-Fraude</strong> — O sistema mais fiável do mercado português<br>⚡ <strong>Implementação em minutos</strong> — Sem hardware, sem instalações complexas<br>💰 <strong>Preço acessível</strong> — A partir de apenas 20€/mês<br>📱 <strong>Mobile-first</strong> — Desenvolvida para smartphones<br>🇵🇹 <strong>100% Português</strong> — Pensada para o mercado nacional<br>⚖️ <strong>Legalmente válida</strong> — Conforme Código do Trabalho<br>🔐 <strong>Segura</strong> — RGPD compliant, dados na UE<br>🆘 <strong>Suporte dedicado</strong> — Equipa portuguesa, respostas rápidas',
        followUp: ['features', 'pricing', 'sectors']
    },
    competitors: {
        text: '🥇 <strong>Trakiu vs. Outras soluções:</strong><br><br>Ao contrário de outras plataformas, a Trakiu oferece:<br><br>✅ <strong>100% focada no mercado PT</strong> — Não é uma adaptação de software estrangeiro<br>✅ <strong>Preço competitivo</strong> — Sem custos por utilizador individual<br>✅ <strong>Sem hardware</strong> — Não precisa de relógios de ponto físicos<br>✅ <strong>Mobile-first</strong> — Pensada para telemóvel desde o início<br>✅ <strong>Suporte em português</strong> — Equipa local e acessível<br>✅ <strong>Setup em minutos</strong> — Sem semanas de implementação<br><br>Mais simples, mais acessível, mais eficaz! 💪',
        followUp: ['advantages', 'pricing', 'trial']
    },

    // --- MISC ---
    thanks: {
        text: 'De nada! 😊 Estou sempre disponível para ajudar. Se surgir mais alguma dúvida, não hesite em perguntar ou contactar-nos diretamente em <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a>. Bom dia! 🙌',
        followUp: ['what', 'features', 'contact']
    }
};

const followUpLabels = {
    what: 'O que é a Trakiu?',
    greeting: 'Voltar ao início',
    howItWorks: 'Como funciona?',
    features: 'Funcionalidades',
    gps: 'GPS e Picagem',
    schedules: 'Horários e Escalas',
    dashboard: 'Dashboard',
    notifications: 'Notificações',
    reports: 'Relatórios',
    tasks: 'Gestão de Tarefas',
    pricing: 'Planos e Preços',
    planMicro: 'Plano Micro',
    planTeam: 'Plano Equipa',
    planAdvanced: 'Plano Avançado',
    comparePlans: 'Comparar planos',
    annual: 'Pagamento anual',
    acquire: 'Como adquirir?',
    trial: 'Experimentar / Demo',
    payment: 'Métodos de pagamento',
    contract: 'Contrato e fidelização',
    cancel: 'Cancelar subscrição',
    download: 'Descarregar a app',
    setup: 'Configurar a Trakiu',
    login: 'Login / Acesso',
    forgotPassword: 'Esqueci a password',
    requirements: 'Requisitos da app',
    antiFraud: 'Sistema anti-fraude',
    multiLocation: 'Multi-localização',
    offline: 'Modo offline',
    battery: 'Consumo de bateria',
    security: 'Segurança',
    privacy: 'RGPD / Privacidade',
    vacations: 'Férias e Ausências',
    overtime: 'Horas Extraordinárias',
    nightShift: 'Turnos noturnos',
    payroll: 'Processamento salarial',
    addUsers: 'Adicionar colaboradores',
    moreUsers: 'Mais utilizadores',
    legal: 'Conformidade legal',
    sectors: 'Setores de atividade',
    construction: 'Construção Civil',
    retail: 'Retalho',
    support: 'Suporte técnico',
    help: 'Ajuda geral',
    contact: 'Falar connosco',
    advantages: 'Vantagens da Trakiu',
    competitors: 'Trakiu vs. outros',
    thanks: 'Obrigado!'
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
    { keys: ['o que é', 'o que e', 'o que faz', 'para que serve', 'que aplicação', 'que app', 'sobre a trakiu', 'explicar', 'explica', 'apresentar', 'apresentação'], topic: 'what' },
    // Como funciona
    { keys: ['como funciona', 'como é que funciona', 'funcionamento', 'como usar', 'como utilizar', 'como é que se usa', 'como é que uso'], topic: 'howItWorks' },
    // Funcionalidades gerais
    { keys: ['funcionalidade', 'funcionalidades', 'função', 'funções', 'recurso', 'recursos', 'capacidade', 'módulo', 'modulo', 'módulos'], topic: 'features' },
    // GPS
    { keys: ['gps', 'geolocalização', 'geolocalizacao', 'localização', 'localizacao', 'ponto', 'picagem', 'picar', 'check-in', 'checkin', 'check in', 'check-out', 'checkout', 'registo de ponto', 'registar ponto', 'relógio de ponto', 'relogio de ponto', 'clock', 'clocking'], topic: 'gps' },
    // Anti-fraude
    { keys: ['fraude', 'anti-fraude', 'antifraude', 'falsificar', 'fake', 'enganar', 'manipular', 'gps falso', 'mock', 'spoofing', 'fiável', 'fiabilidade', 'confiável'], topic: 'antiFraud' },
    // Multi-localização
    { keys: ['multi-localização', 'multi localização', 'multilocalização', 'várias localizações', 'varias localizacoes', 'filial', 'filiais', 'obra', 'obras', 'escritório', 'escritorios', 'vários locais', 'varios locais', 'multi-location', 'múltiplos locais'], topic: 'multiLocation' },
    // Horários e Escalas
    { keys: ['horário', 'horario', 'horários', 'escala', 'escalas', 'turno', 'turnos', 'rota', 'rotas', 'agenda', 'calendário', 'scheduling'], topic: 'schedules' },
    // Dashboard
    { keys: ['dashboard', 'painel', 'visão geral', 'resumo', 'monitorizar', 'monitorização', 'tempo real', 'em direto'], topic: 'dashboard' },
    // Notificações
    { keys: ['notificação', 'notificações', 'notificacao', 'notificacoes', 'alerta', 'alertas', 'push', 'aviso', 'avisos', 'lembrete', 'lembretes'], topic: 'notifications' },
    // Relatórios
    { keys: ['relatório', 'relatorio', 'relatórios', 'relatorios', 'report', 'reports', 'exportar', 'exportação', 'excel', 'pdf', 'dados', 'estatísticas', 'estatisticas', 'análise', 'analise'], topic: 'reports' },
    // Tarefas
    { keys: ['tarefa', 'tarefas', 'task', 'tasks', 'atividade', 'atividades', 'to-do', 'todo', 'atribuir', 'atribuição'], topic: 'tasks' },
    // Preços
    { keys: ['preço', 'preco', 'preços', 'precos', 'custo', 'custos', 'valor', 'valores', 'quanto custa', 'quanto é', 'price', 'pricing', 'tarifário', 'tarifario', 'tabela de preços', 'orçamento', 'orcamento', 'investimento'], topic: 'pricing' },
    // Planos específicos
    { keys: ['plano micro', 'plano base', 'micro', '5 utilizadores', '5 users', 'plano mais barato', 'mais barato', 'básico', 'basico'], topic: 'planMicro' },
    { keys: ['plano equipa', 'plano crescimento', '10 utilizadores', '10 users', 'plano médio', 'plano medio', 'intermédio', 'intermedio'], topic: 'planTeam' },
    { keys: ['plano avançado', 'plano avancado', 'plano empresarial', 'enterprise', 'ilimitado', 'sob consulta', 'personalizado', 'grande empresa', 'grandes empresas', 'mais de 10'], topic: 'planAdvanced' },
    // Comparar planos
    { keys: ['comparar', 'comparação', 'comparacao', 'diferença entre planos', 'diferenca entre planos', 'qual plano', 'qual o melhor plano', 'que plano'], topic: 'comparePlans' },
    // Pagamento anual
    { keys: ['anual', 'anuidade', 'pagamento anual', 'por ano', 'desconto anual', 'pagar por ano'], topic: 'annual' },
    // Adquirir
    { keys: ['comprar', 'adquirir', 'subscrever', 'contratar', 'aquisição', 'aquisicao', 'como faço para ter', 'como começo', 'como comeco', 'aderir', 'inscrever', 'registar', 'registro', 'registo', 'sign up', 'signup', 'quero usar', 'quero experimentar', 'quero contratar', 'como posso ter'], topic: 'acquire' },
    // Trial / Demo
    { keys: ['demo', 'demonstração', 'demonstracao', 'teste', 'testar', 'experimentar', 'trial', 'free trial', 'gratuito', 'grátis', 'gratis', 'período de teste', 'periodo de teste', 'experimentação', 'provar'], topic: 'trial' },
    // Pagamento
    { keys: ['pagamento', 'pagar', 'forma de pagamento', 'método de pagamento', 'metodo de pagamento', 'transferência', 'transferencia', 'mbway', 'mb way', 'multibanco', 'cartão', 'cartao', 'débito', 'debito', 'fatura', 'factura', 'faturação', 'facturacao'], topic: 'payment' },
    // Contrato
    { keys: ['contrato', 'fidelização', 'fidelizacao', 'compromisso', 'prazo', 'vinculativo', 'permanência', 'permanencia', 'obrigatório', 'obrigatorio', 'mínimo', 'minimo'], topic: 'contract' },
    // Cancelar
    { keys: ['cancelar', 'cancelamento', 'desistir', 'parar', 'terminar', 'anular', 'rescindir', 'rescisão', 'rescisao', 'sair', 'deixar de usar', 'não quero mais', 'devolver'], topic: 'cancel' },
    // Download
    { keys: ['download', 'descarregar', 'baixar', 'transferir', 'instalar', 'instalação', 'instalacao', 'app store', 'google play', 'play store', 'apple store', 'ios', 'android', 'iphone', 'samsung'], topic: 'download' },
    // Setup
    { keys: ['configurar', 'configuração', 'configuracao', 'setup', 'implementar', 'implementação', 'implementacao', 'começar', 'início', 'inicio', 'getting started', 'onboarding', 'pôr a funcionar', 'ativar'], topic: 'setup' },
    // Login
    { keys: ['login', 'entrar', 'aceder', 'acesso', 'log in', 'iniciar sessão', 'sessão', 'sessao', 'conta', 'autenticação', 'autenticacao', 'credenciais', 'nome de utilizador', 'username'], topic: 'login' },
    // Password
    { keys: ['password', 'palavra-passe', 'palavra passe', 'senha', 'esqueci', 'recuperar', 'reset', 'redefini', 'não consigo entrar', 'nao consigo entrar', 'bloqueado', 'bloqueada'], topic: 'forgotPassword' },
    // Requisitos
    { keys: ['requisito', 'requisitos', 'compatível', 'compativel', 'compatibilidade', 'sistema operativo', 'versão', 'versao', 'telemóvel', 'telemovel', 'smartphone', 'tablet', 'ipad', 'web', 'browser', 'navegador', 'dispositivo'], topic: 'requirements' },
    // Offline
    { keys: ['offline', 'sem internet', 'sem rede', 'sem dados', 'sem wifi', 'sem ligação', 'sem ligacao', 'funciona sem', 'sem cobertura', 'desligado'], topic: 'offline' },
    // Bateria
    { keys: ['bateria', 'consumo', 'gasta bateria', 'energia', 'duração', 'duracao', 'pesado', 'leve', 'performance', 'desempenho'], topic: 'battery' },
    // Segurança
    { keys: ['segurança', 'seguranca', 'seguro', 'encriptação', 'encriptacao', 'protecção', 'proteccao', 'ssl', 'vírus', 'virus', 'hack', 'dados seguros', 'backup'], topic: 'security' },
    // Privacidade / RGPD
    { keys: ['rgpd', 'gdpr', 'privacidade', 'proteção de dados', 'protecao de dados', 'dados pessoais', 'política de privacidade', 'politica de privacidade', 'consentimento', 'direito ao esquecimento', 'eliminar dados'], topic: 'privacy' },
    // Férias
    { keys: ['férias', 'ferias', 'ausência', 'ausencia', 'ausências', 'ausencias', 'falta', 'faltas', 'licença', 'licenca', 'atestado', 'doença', 'doenca', 'baixa', 'justificação', 'justificacao'], topic: 'vacations' },
    // Horas extra
    { keys: ['hora extra', 'horas extra', 'horas extraordinárias', 'horas extraordinarias', 'overtime', 'trabalhar mais', 'exceder horário', 'exceder horario', 'compensação', 'compensacao'], topic: 'overtime' },
    // Turno noturno
    { keys: ['noturno', 'noite', 'turno da noite', 'trabalho noturno', 'meia-noite', 'meia noite', 'madrugada', 'rotativo'], topic: 'nightShift' },
    // Processamento salarial
    { keys: ['salário', 'salario', 'salários', 'salarial', 'vencimento', 'vencimentos', 'folha de pagamento', 'recibo', 'recibos', 'contabilidade', 'contabilista', 'rh', 'recursos humanos'], topic: 'payroll' },
    // Adicionar utilizadores
    { keys: ['adicionar utilizador', 'adicionar colaborador', 'adicionar funcionário', 'adicionar funcionario', 'novo utilizador', 'novo colaborador', 'convidar', 'convite'], topic: 'addUsers' },
    // Mais utilizadores
    { keys: ['mais utilizadores', 'mais colaboradores', 'aumentar utilizadores', 'upgrade', 'migrar', 'mudar de plano', 'trocar de plano', 'crescer', 'escalar', 'expandir', 'limite de utilizadores'], topic: 'moreUsers' },
    // Legal
    { keys: ['legal', 'lei', 'legislação', 'legislacao', 'código do trabalho', 'codigo do trabalho', 'act', 'inspeção do trabalho', 'inspecao do trabalho', 'obrigação legal', 'obrigacao legal', 'obrigatório', 'artigo 202', 'registo de tempo', 'fiscalização'], topic: 'legal' },
    // Setores
    { keys: ['setor', 'sector', 'setores', 'sectores', 'indústria', 'industria', 'área de atividade', 'area de atividade', 'ramo', 'mercado', 'negócio', 'negocio', 'tipo de empresa', 'para quem é'], topic: 'sectors' },
    // Construção
    { keys: ['construção', 'construcao', 'obra', 'empreiteiro', 'empreiteiros', 'estaleiro', 'pedreiro', 'engenharia civil'], topic: 'construction' },
    // Retalho
    { keys: ['retalho', 'loja', 'lojas', 'comércio', 'comercio', 'vendas', 'supermercado', 'centro comercial'], topic: 'retail' },
    // Suporte
    { keys: ['suporte', 'assistência', 'assistencia', 'problema', 'erro', 'bug', 'não funciona', 'nao funciona', 'avaria', 'avariado', 'reclamação', 'reclamacao', 'reclamar', 'queixa'], topic: 'support' },
    // Ajuda
    { keys: ['ajuda', 'help', 'socorro', 'dúvida', 'duvida', 'dúvidas', 'duvidas', 'pergunta', 'perguntas', 'informação', 'informacao', 'informações', 'informacoes', 'saber mais'], topic: 'help' },
    // Contacto
    { keys: ['contacto', 'contato', 'contactar', 'email', 'e-mail', 'telefone', 'ligar', 'telefonar', 'falar', 'falar com alguém', 'falar com alguem', 'atendimento', 'comunicar', 'morada', 'endereço', 'endereco'], topic: 'contact' },
    // Vantagens
    { keys: ['vantagem', 'vantagens', 'benefício', 'beneficio', 'benefícios', 'beneficios', 'porquê', 'porque', 'por que', 'motivo', 'razão', 'razao', 'melhor', 'diferencial', 'diferenciação', 'diferenciacao', 'vale a pena'], topic: 'advantages' },
    // Concorrência
    { keys: ['concorrência', 'concorrencia', 'concorrente', 'concorrentes', 'alternativa', 'alternativas', 'similar', 'parecido', 'equivalente', 'vs', 'versus', 'comparado', 'outro software', 'outra app', 'outra aplicação'], topic: 'competitors' }
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
            // Fallback inteligente - sugerir tópicos populares
            addMessage('Obrigado pela sua pergunta! 🤔 Não tenho a certeza se entendi completamente. Posso ajudar com estes temas:<br><br>📱 O que é a Trakiu<br>✨ Funcionalidades e GPS<br>💰 Planos e Preços<br>🛒 Como adquirir<br>🔐 Segurança e Privacidade<br><br>Ou contacte-nos diretamente em <a href="mailto:geral@trakiu.com" style="color: var(--cyan);">geral@trakiu.com</a> para questões mais específicas! 📧', 'bot');
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
