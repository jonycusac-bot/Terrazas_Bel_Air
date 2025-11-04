// Variables globales
let currentUser = null;
let notifications = [
    { id: 1, type: 'info', title: 'Nueva reunión programada', message: 'Junta ordinaria el 15 de diciembre', time: new Date() },
    { id: 2, type: 'warning', title: 'Mantenimiento ascensor', message: 'Revisión programada para mañana 9:00', time: new Date() },
    { id: 3, type: 'success', title: 'Mejora completada', message: 'Instalación de luces LED finalizada', time: new Date() }
];

// Funcionalidad principal
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupLogin();
    setupNotifications();
    setupGallery();
    setupSugerencias();
    setupDocuments();
    setupAnimations();
    
    console.log('Portal de Comunidad de Vecinos cargado correctamente');
}

// Sistema de navegación
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    function showSection(sectionId) {
        sections.forEach(section => section.classList.remove('active'));
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        navButtons.forEach(btn => btn.classList.remove('active'));
        
        const activeButton = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
}

// Sistema de login
function setupLogin() {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const closeBtn = loginModal.querySelector('.close');

    loginBtn.addEventListener('click', () => {
        if (currentUser) {
            logout();
        } else {
            loginModal.style.display = 'block';
        }
    });

    closeBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const vivienda = document.getElementById('vivienda').value;
        const password = document.getElementById('password').value;
        
        // Simulación de login (en producción sería una validación real)
        if (vivienda && password) {
            login(vivienda);
            loginModal.style.display = 'none';
            showNotification('success', 'Sesión iniciada', `Bienvenido, vivienda ${vivienda}`);
        }
    });

    function login(vivienda) {
        currentUser = { vivienda: vivienda };
        loginBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        loginBtn.title = 'Cerrar sesión';
        
        // Mostrar contenido personalizado
        updateUserContent();
    }

    function logout() {
        currentUser = null;
        loginBtn.innerHTML = '<i class="fas fa-user"></i>';
        loginBtn.title = 'Iniciar sesión';
        showNotification('info', 'Sesión cerrada', 'Has cerrado sesión correctamente');
    }

    function updateUserContent() {
        // Aquí se podría personalizar el contenido según el usuario
        // Por ejemplo, mostrar solo las deudas de su vivienda, etc.
    }
}

// Sistema de notificaciones
function setupNotifications() {
    const notificationsBtn = document.getElementById('notifications-btn');
    const notificationCount = document.getElementById('notification-count');
    
    updateNotificationCount();
    
    notificationsBtn.addEventListener('click', () => {
        showAllNotifications();
    });

    // Mostrar notificación automática al cargar
    setTimeout(() => {
        showNotification('info', 'Bienvenido', 'Portal de la comunidad actualizado');
    }, 2000);
}

function showNotification(type, title, message) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <button class="notification-close">&times;</button>
        <strong>${title}</strong><br>
        <span>${message}</span>
    `;
    
    container.appendChild(notification);
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Botón de cerrar
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

function showAllNotifications() {
    let notificationsList = notifications.map(n => 
        `• ${n.title}: ${n.message}`
    ).join('\n');
    
    alert(`Notificaciones:\n\n${notificationsList}`);
    
    // Marcar como leídas
    notifications = [];
    updateNotificationCount();
}

function updateNotificationCount() {
    const count = notifications.length;
    const badge = document.getElementById('notification-count');
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
}

// Sistema de galería
function setupGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeModal = imageModal.querySelector('.close');

    // Filtros de galería
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Modal de imagen
    closeModal.addEventListener('click', () => {
        imageModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
        }
    });
}

// Función global para abrir modal de imagen
function openImageModal(button) {
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('h4').textContent;
    const date = galleryItem.querySelector('p').textContent;
    
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalCaption.innerHTML = `<h3>${title}</h3><p>${date}</p>`;
    
    modal.style.display = 'block';
}

// Sistema de sugerencias
function setupSugerencias() {
    console.log('🔧 Configurando sistema de sugerencias...');
    
    const suggestionsForm = document.getElementById('suggestions-form');
    
    if (!suggestionsForm) {
        console.error('❌ No se encontró el formulario de sugerencias');
        return;
    }
    
    console.log('✅ Formulario de sugerencias encontrado');
    
    suggestionsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('📝 Formulario enviado');
        
        const residentInfo = document.getElementById('resident-info').value;
        const contactEmail = document.getElementById('contact-email').value;
        const type = document.getElementById('suggestion-type').value;
        const category = document.getElementById('suggestion-category').value;
        const title = document.getElementById('suggestion-title').value;
        const description = document.getElementById('suggestion-description').value;
        const priority = document.getElementById('suggestion-priority').value;
        
        console.log('📋 Datos del formulario:', {residentInfo, type, category, title});
        
        // Crear email para el administrador
        sendEmailToAdmin(residentInfo, contactEmail, type, category, title, description, priority);
        
        // Limpiar formulario
        suggestionsForm.reset();
    });

    // Botones de votación
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-vote')) {
            if (!currentUser) {
                showNotification('warning', 'Inicia sesión', 'Debes iniciar sesión para votar');
                return;
            }
            
            const button = e.target.closest('.btn-vote');
            const currentCount = parseInt(button.textContent.trim().split(' ')[1] || '0');
            button.innerHTML = button.innerHTML.replace(/\d+/, currentCount + 1);
            
            showNotification('success', 'Voto registrado', 'Tu voto ha sido registrado');
        }
    });
}

function addSuggestionToList(title, category, description, priority) {
    const suggestionsList = document.querySelector('.suggestions-list');
    const newSuggestion = document.createElement('div');
    newSuggestion.className = 'suggestion-item';
    
    newSuggestion.innerHTML = `
        <div class="suggestion-header">
            <h4>${title}</h4>
            <span class="priority-badge ${priority}">${priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
        </div>
        <p class="suggestion-meta">Por ${currentUser.vivienda} • Ahora • Categoría: ${category}</p>
        <p class="suggestion-text">${description}</p>
        <div class="suggestion-actions">
            <button class="btn-vote"><i class="fas fa-thumbs-up"></i> 0</button>
            <button class="btn-vote"><i class="fas fa-thumbs-down"></i> 0</button>
            <span class="suggestion-status pendiente">Pendiente</span>
        </div>
    `;
    
    suggestionsList.insertBefore(newSuggestion, suggestionsList.children[1]);
}

// Sistema de documentos
function setupDocuments() {
    const downloadButtons = document.querySelectorAll('.btn-download');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (!currentUser) {
                showNotification('warning', 'Inicia sesión', 'Debes iniciar sesión para descargar documentos');
                return;
            }
            
            const docItem = button.closest('.doc-item');
            const docTitle = docItem.querySelector('h4').textContent;
            
            // Simular descarga
            showNotification('info', 'Descargando', `Descargando: ${docTitle}`);
        });
    });

    // Botones de actas
    const actaButtons = document.querySelectorAll('.btn-secondary');
    actaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (!currentUser) {
                showNotification('warning', 'Inicia sesión', 'Debes iniciar sesión para acceder a las actas');
                return;
            }
            
            if (this.textContent.includes('Ver Acta')) {
                showNotification('info', 'Abriendo acta', 'Funcionalidad en desarrollo');
            } else if (this.textContent.includes('Descargar PDF')) {
                showNotification('info', 'Descargando PDF', 'Funcionalidad en desarrollo');
            }
        });
    });
}

// Animaciones
function setupAnimations() {
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

    const cards = document.querySelectorAll('.welcome-card, .improvement-card, .meeting-item, .stat-card, .update-item, .maintenance-item, .debtor-item, .gallery-item, .suggestion-item, .doc-category, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Función para enviar email al administrador
function sendEmailToAdmin(residentInfo, contactEmail, type, category, title, description, priority) {
    // Email del administrador (CAMBIAR POR EL EMAIL REAL)
    const adminEmail = 'jonycusac@gmail.com'; // ← CAMBIAR AQUÍ POR EL EMAIL REAL
    
    // Crear asunto del email
    const subject = `[${type.toUpperCase()}] ${category} - ${title}`;
    
    // Crear cuerpo del email
    const body = `
NUEVA ${type.toUpperCase()} DESDE EL PORTAL DE LA COMUNIDAD

═══════════════════════════════════════════════════════════════

📍 DATOS DEL VECINO:
${residentInfo}

📧 EMAIL DE CONTACTO:
${contactEmail || 'No proporcionado'}

📋 TIPO: ${type.charAt(0).toUpperCase() + type.slice(1)}
🏷️ CATEGORÍA: ${category.charAt(0).toUpperCase() + category.slice(1)}
⚡ URGENCIA: ${priority.charAt(0).toUpperCase() + priority.slice(1)}

═══════════════════════════════════════════════════════════════

📝 ASUNTO:
${title}

📄 DESCRIPCIÓN:
${description}

═══════════════════════════════════════════════════════════════

📅 FECHA: ${new Date().toLocaleDateString('es-ES')}
🕐 HORA: ${new Date().toLocaleTimeString('es-ES')}

Enviado desde: Portal Web Terrazas de Bel Air
    `.trim();
    
    // OPCIÓN A: Usar mailto (requiere que el usuario haga clic en enviar)
    const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Mostrar modal con opciones
    showEmailOptions(mailtoLink, adminEmail, subject, body);
    
    console.log('📧 Email preparado para:', adminEmail);
    console.log('📋 Asunto:', subject);
}

// Función para mostrar opciones de envío de email
function showEmailOptions(mailtoLink, adminEmail, subject, body) {
    // Crear modal con opciones
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <span class="close">&times;</span>
            <h2>📧 Enviar mensaje al administrador</h2>
            <p><strong>Para:</strong> ${adminEmail}</p>
            <p><strong>Asunto:</strong> ${subject}</p>
            
            <div style="margin: 20px 0;">
                <h3>Elige cómo enviar:</h3>
                
                <button id="send-gmail" class="btn-primary" style="margin: 10px 0; width: 100%;">
                    📧 Enviar con Gmail
                </button>
                
                <button id="send-outlook" class="btn-primary" style="margin: 10px 0; width: 100%;">
                    📧 Enviar con Outlook
                </button>
                
                <button id="send-mailto" class="btn-secondary" style="margin: 10px 0; width: 100%;">
                    📧 Abrir mi cliente de email
                </button>
                
                <button id="copy-email" class="btn-secondary" style="margin: 10px 0; width: 100%;">
                    📋 Copiar texto para enviar manualmente
                </button>
            </div>
            
            <p style="font-size: 0.9rem; color: #666; margin-top: 20px;">
                <strong>Nota:</strong> El email se abrirá en una nueva ventana. Haz clic en "Enviar" para completar el envío.
            </p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Gmail
    document.getElementById('send-gmail').addEventListener('click', () => {
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${adminEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(gmailUrl, '_blank');
        document.body.removeChild(modal);
        showNotification('success', 'Gmail abierto', 'Haz clic en ENVIAR en Gmail para completar el envío');
    });
    
    // Outlook
    document.getElementById('send-outlook').addEventListener('click', () => {
        const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${adminEmail}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(outlookUrl, '_blank');
        document.body.removeChild(modal);
        showNotification('success', 'Outlook abierto', 'Haz clic en ENVIAR en Outlook para completar el envío');
    });
    
    // Cliente de email local
    document.getElementById('send-mailto').addEventListener('click', () => {
        window.location.href = mailtoLink;
        document.body.removeChild(modal);
        showNotification('info', 'Cliente de email abierto', 'Haz clic en ENVIAR en tu cliente de email');
    });
    
    // Copiar texto
    document.getElementById('copy-email').addEventListener('click', () => {
        const fullText = `Para: ${adminEmail}\nAsunto: ${subject}\n\n${body}`;
        navigator.clipboard.writeText(fullText).then(() => {
            document.body.removeChild(modal);
            showNotification('success', 'Texto copiado', 'Pega el texto en tu email y envíalo manualmente');
        });
    });
    
    // Cerrar al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}