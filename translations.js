// TRADUCCIONES ESPAÑOL/INGLÉS
const translations = {
    es: {
        // Header
        communityName: "Terrazas de Bel Air",
        subtitle: "Portal Informativo de Vecinos",
        
        // Navegación
        inicio: "Inicio",
        mejoras: "Mejoras",
        mantenimiento: "Mantenimiento",
        deudores: "Deudores",
        actas: "Actas",
        galeria: "Galería",
        sugerencias: "Sugerencias",
        documentos: "Documentos",
        contactos: "Contactos",
        
        // Inicio
        welcome: "Bienvenido a tu Comunidad",
        welcomeText: "Mantente informado sobre todas las novedades y gestiones de nuestra comunidad de vecinos.",
        neighbors: "Vecinos",
        homes: "Viviendas",
        meetings: "Reuniones este año",
        recentUpdates: "Últimas Actualizaciones",
        
        // Mejoras
        improvements: "Mejoras de la Comunidad",
        completed: "Completado",
        inProgress: "En Progreso",
        planned: "Planificado",
        
        // Mantenimiento
        maintenance: "Mantenimiento",
        nextTasks: "Próximas Tareas",
        recentHistory: "Historial Reciente",
        
        // Deudores
        paymentStatus: "Estado de Pagos",
        upToDate: "Al corriente",
        pending: "Pendientes",
        defaulters: "Morosos",
        
        // Actas
        meetingMinutes: "Actas de Reuniones",
        viewMinutes: "Ver Acta",
        downloadPDF: "Descargar PDF",
        
        // Galería
        gallery: "Galería de Mejoras",
        all: "Todas",
        
        // Sugerencias
        suggestions: "Sugerencias y Propuestas",
        newSuggestion: "Nueva Sugerencia",
        
        // Documentos
        documents: "Documentos Importantes",
        legalDocs: "Documentos Legales",
        economicDocs: "Documentos Económicos",
        technicalDocs: "Documentos Técnicos",
        
        // Contactos
        contacts: "Contactos Útiles",
        emergencies: "Emergencias",
        administration: "Administración",
        security: "Seguridad",
        cleaning: "Limpieza",
        boardMembers: "Junta Directiva",
        
        // Footer
        allRightsReserved: "Todos los derechos reservados",
        administrator: "Administrador"
    },
    
    en: {
        // Header
        communityName: "Terrazas de Bel Air",
        subtitle: "Neighbors Information Portal",
        
        // Navegación
        inicio: "Home",
        mejoras: "Improvements",
        mantenimiento: "Maintenance",
        deudores: "Debtors",
        actas: "Minutes",
        galeria: "Gallery",
        sugerencias: "Suggestions",
        documentos: "Documents",
        contactos: "Contacts",
        
        // Inicio
        welcome: "Welcome to your Community",
        welcomeText: "Stay informed about all the news and management of our neighborhood community.",
        neighbors: "Neighbors",
        homes: "Homes",
        meetings: "Meetings this year",
        recentUpdates: "Recent Updates",
        
        // Mejoras
        improvements: "Community Improvements",
        completed: "Completed",
        inProgress: "In Progress",
        planned: "Planned",
        
        // Mantenimiento
        maintenance: "Maintenance",
        nextTasks: "Upcoming Tasks",
        recentHistory: "Recent History",
        
        // Deudores
        paymentStatus: "Payment Status",
        upToDate: "Up to date",
        pending: "Pending",
        defaulters: "Defaulters",
        
        // Actas
        meetingMinutes: "Meeting Minutes",
        viewMinutes: "View Minutes",
        downloadPDF: "Download PDF",
        
        // Galería
        gallery: "Improvements Gallery",
        all: "All",
        
        // Sugerencias
        suggestions: "Suggestions and Proposals",
        newSuggestion: "New Suggestion",
        
        // Documentos
        documents: "Important Documents",
        legalDocs: "Legal Documents",
        economicDocs: "Economic Documents",
        technicalDocs: "Technical Documents",
        
        // Contactos
        contacts: "Useful Contacts",
        emergencies: "Emergencies",
        administration: "Administration",
        security: "Security",
        cleaning: "Cleaning",
        boardMembers: "Board Members",
        
        // Footer
        allRightsReserved: "All rights reserved",
        administrator: "Administrator"
    }
};

// IDIOMA ACTUAL
let currentLanguage = 'es';

// FUNCIÓN PARA CAMBIAR IDIOMA
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Actualizar indicador de idioma
    document.getElementById('current-lang').textContent = lang.toUpperCase();
    
    // Aplicar traducciones
    applyTranslations();
    
    console.log(`Idioma cambiado a: ${lang}`);
}

// FUNCIÓN PARA APLICAR TRADUCCIONES
function applyTranslations() {
    const t = translations[currentLanguage];
    
    // Header
    const headerTitle = document.querySelector('.header h1');
    if (headerTitle) {
        headerTitle.innerHTML = `<i class="fas fa-home"></i> ${t.communityName}`;
    }
    
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        subtitle.textContent = t.subtitle;
    }
    
    // Navegación
    const navButtons = document.querySelectorAll('.nav-btn span');
    const navTexts = [t.inicio, t.mejoras, t.mantenimiento, t.deudores, t.actas, t.galeria, t.sugerencias, t.documentos, t.contactos];
    navButtons.forEach((btn, index) => {
        if (navTexts[index]) {
            btn.textContent = navTexts[index];
        }
    });
    
    // Títulos de secciones
    const sectionTitles = document.querySelectorAll('section h2');
    sectionTitles.forEach(title => {
        const text = title.textContent.trim();
        if (text.includes('Mejoras')) title.textContent = t.improvements;
        if (text.includes('Mantenimiento')) title.textContent = t.maintenance;
        if (text.includes('Estado de Pagos')) title.textContent = t.paymentStatus;
        if (text.includes('Actas')) title.textContent = t.meetingMinutes;
        if (text.includes('Galería')) title.textContent = t.gallery;
        if (text.includes('Sugerencias')) title.textContent = t.suggestions;
        if (text.includes('Documentos')) title.textContent = t.documents;
        if (text.includes('Contactos')) title.textContent = t.contacts;
    });
    
    // Estadísticas
    const statLabels = document.querySelectorAll('.stat-card p');
    if (statLabels[0]) statLabels[0].textContent = t.neighbors;
    if (statLabels[1]) statLabels[1].textContent = t.homes;
    if (statLabels[2]) statLabels[2].textContent = t.meetings;
    
    // Botones
    const viewButtons = document.querySelectorAll('.btn-secondary');
    viewButtons.forEach(btn => {
        if (btn.textContent.includes('Ver Acta')) {
            btn.innerHTML = `<i class="fas fa-eye"></i> ${t.viewMinutes}`;
        }
        if (btn.textContent.includes('Descargar PDF')) {
            btn.innerHTML = `<i class="fas fa-download"></i> ${t.downloadPDF}`;
        }
    });
}

// INICIALIZAR IDIOMA
function initializeLanguage() {
    // Cargar idioma guardado o usar español por defecto
    const savedLang = localStorage.getItem('language') || 'es';
    changeLanguage(savedLang);
}

// CONFIGURAR SELECTOR DE IDIOMA
function setupLanguageSelector() {
    const languageBtn = document.getElementById('language-btn');
    
    // Crear dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';
    dropdown.innerHTML = `
        <div class="language-option" data-lang="es">
            <span class="flag-icon flag-es"></span>
            Español
        </div>
        <div class="language-option" data-lang="en">
            <span class="flag-icon flag-en"></span>
            English (UK)
        </div>
    `;
    
    languageBtn.parentNode.style.position = 'relative';
    languageBtn.parentNode.appendChild(dropdown);
    
    // Toggle dropdown
    languageBtn.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Seleccionar idioma
    dropdown.addEventListener('click', (e) => {
        const option = e.target.closest('.language-option');
        if (option) {
            const lang = option.dataset.lang;
            changeLanguage(lang);
            dropdown.style.display = 'none';
        }
    });
    
    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!languageBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

// INICIALIZAR CUANDO SE CARGA LA PÁGINA
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        setupLanguageSelector();
        initializeLanguage();
    }, 200);
});