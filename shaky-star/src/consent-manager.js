// ====================================
// Système de Gestion des Consentements (Loi 25)
// GDG Productions
// ====================================

class ConsentManager {
    constructor() {
        this.cookieName = 'gdg_consent_preferences';
        this.consentData = this.loadConsent();
        this.init();
    }

    // Initialisation
    init() {
        // Si pas de consentement enregistré, afficher le banner
        if (!this.consentData) {
            this.showBanner();
        } else {
            // Charger les services selon les préférences
            this.loadServices();
        }

        // Écouter les boutons de gestion des cookies
        this.setupEventListeners();
    }

    // Charger les préférences depuis le localStorage
    loadConsent() {
        try {
            const stored = localStorage.getItem(this.cookieName);
            if (stored) {
                const data = JSON.parse(stored);
                // Vérifier que le consentement n'a pas expiré (12 mois)
                const expiryDate = new Date(data.timestamp);
                expiryDate.setMonth(expiryDate.getMonth() + 12);
                
                if (new Date() < expiryDate) {
                    return data;
                }
            }
        } catch (e) {
            console.error('Erreur chargement consentement:', e);
        }
        return null;
    }

    // Sauvegarder les préférences
    saveConsent(preferences) {
        const consentData = {
            analytics: preferences.analytics || false,
            fonts: preferences.fonts || false,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem(this.cookieName, JSON.stringify(consentData));
        this.consentData = consentData;
    }

    // Afficher le banner de consentement
    showBanner() {
        // Vérifier si le banner n'existe pas déjà
        if (document.getElementById('consent-banner')) return;

        const banner = document.createElement('div');
        banner.id = 'consent-banner';
        banner.innerHTML = `
            <div class="consent-content">
                <div class="consent-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="consent-text">
                    <h3>🍪 Respect de votre vie privée</h3>
                    <p>
                        Nous utilisons des cookies pour améliorer votre expérience. 
                        Conformément à la <strong>Loi 25 du Québec</strong>, nous avons besoin de votre consentement.
                    </p>
                    <p class="consent-detail">
                        <a href="/privacy" target="_blank">Politique de confidentialité</a>
                    </p>
                </div>
                <div class="consent-actions">
                    <button id="consent-customize" class="btn-consent btn-secondary">
                        <i class="fas fa-cog"></i> Personnaliser
                    </button>
                    <button id="consent-accept-all" class="btn-consent btn-primary">
                        <i class="fas fa-check"></i> Tout Accepter
                    </button>
                    <button id="consent-reject-all" class="btn-consent btn-reject">
                        <i class="fas fa-times"></i> Tout Refuser
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);

        // Animation d'entrée
        setTimeout(() => banner.classList.add('active'), 100);

        // Événements des boutons
        document.getElementById('consent-accept-all').addEventListener('click', () => this.acceptAll());
        document.getElementById('consent-reject-all').addEventListener('click', () => this.rejectAll());
        document.getElementById('consent-customize').addEventListener('click', () => this.showCustomModal());
    }

    // Afficher la modal de personnalisation
    showCustomModal() {
        const modal = document.createElement('div');
        modal.id = 'consent-modal';
        modal.innerHTML = `
            <div class="consent-modal-content">
                <div class="consent-modal-header">
                    <h2><i class="fas fa-sliders-h"></i> Paramètres des Cookies</h2>
                    <button class="consent-modal-close" id="modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="consent-modal-body">
                    <div class="consent-category">
                        <div class="consent-category-header">
                            <h3><i class="fas fa-check-circle"></i> Cookies Essentiels</h3>
                            <span class="required-badge">Obligatoires</span>
                        </div>
                        <p>
                            Ces cookies sont nécessaires au fonctionnement du site et ne peuvent être désactivés. 
                            Ils mémorisent vos choix de consentement et assurent la sécurité de base.
                        </p>
                        <ul class="cookie-list">
                            <li><strong>gdg_consent_preferences</strong> - Stocke vos préférences (12 mois)</li>
                        </ul>
                    </div>

                    <div class="consent-category">
                        <div class="consent-category-header">
                            <div>
                                <h3><i class="fas fa-chart-line"></i> Cookies Analytiques</h3>
                                <label class="switch">
                                    <input type="checkbox" id="consent-analytics">
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>
                        <p>
                            Nous permettent de comprendre comment les visiteurs utilisent notre site pour l'améliorer. 
                            Données anonymisées et agrégées uniquement.
                        </p>
                        <ul class="cookie-list">
                            <li><strong>Tinylytics</strong> - Statistiques de visite anonymes (14 mois)</li>
                        </ul>
                    </div>

                    <div class="consent-category">
                        <div class="consent-category-header">
                            <div>
                                <h3><i class="fas fa-font"></i> Google Fonts</h3>
                                <label class="switch">
                                    <input type="checkbox" id="consent-fonts">
                                    <span class="slider"></span>
                                </label>
                            </div>
                        </div>
                        <p>
                            Charge les polices depuis les serveurs de Google. Peut transmettre votre adresse IP à Google.
                            Si refusé, des polices système seront utilisées.
                        </p>
                        <ul class="cookie-list">
                            <li><strong>Google Fonts API</strong> - Typographie (peut partager IP)</li>
                        </ul>
                    </div>

                    <div class="consent-info">
                        <i class="fas fa-info-circle"></i>
                        <p>
                            <strong>Vos droits (Loi 25) :</strong> Vous pouvez à tout moment modifier vos préférences, 
                            demander l'accès, la rectification ou la suppression de vos données. 
                            <a href="/privacy">En savoir plus</a>
                        </p>
                    </div>
                </div>
                <div class="consent-modal-footer">
                    <button id="modal-save" class="btn-consent btn-primary">
                        <i class="fas fa-save"></i> Enregistrer mes Choix
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 50);

        // Événements
        document.getElementById('modal-close').addEventListener('click', () => this.closeModal());
        document.getElementById('modal-save').addEventListener('click', () => this.saveCustom());
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'consent-modal') this.closeModal();
        });
    }

    // Accepter tout
    acceptAll() {
        this.saveConsent({ analytics: true, fonts: true });
        this.hideBanner();
        this.loadServices();
        this.showNotification('✓ Préférences enregistrées. Merci !', 'success');
    }

    // Refuser tout (sauf essentiels)
    rejectAll() {
        this.saveConsent({ analytics: false, fonts: false });
        this.hideBanner();
        this.showNotification('✓ Seuls les cookies essentiels sont activés', 'info');
    }

    // Sauvegarder les choix personnalisés
    saveCustom() {
        const analytics = document.getElementById('consent-analytics').checked;
        const fonts = document.getElementById('consent-fonts').checked;
        
        this.saveConsent({ analytics, fonts });
        this.closeModal();
        this.hideBanner();
        this.loadServices();
        this.showNotification('✓ Vos préférences ont été enregistrées', 'success');
    }

    // Charger les services selon les préférences
    loadServices() {
        if (!this.consentData) return;

        // Charger Google Fonts si autorisé
        if (this.consentData.fonts) {
            this.loadGoogleFonts();
        }

        // Charger Analytics si autorisé
        if (this.consentData.analytics) {
            this.loadAnalytics();
        }
    }

    // Charger Google Fonts
    loadGoogleFonts() {
        if (document.getElementById('google-fonts')) return; // Déjà chargé

        const link = document.createElement('link');
        link.id = 'google-fonts';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Montserrat:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(link);
    }

    // Charger Analytics (Tinylytics)
    loadAnalytics() {
        if (document.getElementById('tinylytics-script')) return; // Déjà chargé

        const script = document.createElement('script');
        script.id = 'tinylytics-script';
        script.src = 'https://tinylytics.app/embed/BkNCVK1kcz4y6kZSkEJ4.js';
        script.defer = true;
        document.head.appendChild(script);
    }

    // Cacher le banner
    hideBanner() {
        const banner = document.getElementById('consent-banner');
        if (banner) {
            banner.classList.remove('active');
            setTimeout(() => banner.remove(), 300);
        }
    }

    // Fermer la modal
    closeModal() {
        const modal = document.getElementById('consent-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    }

    // Afficher une notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `consent-notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('active'), 100);
        setTimeout(() => {
            notification.classList.remove('active');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Configurer les écouteurs pour le bouton de gestion
    setupEventListeners() {
        // Ajouter un bouton flottant pour rouvrir les paramètres
        const settingsBtn = document.createElement('button');
        settingsBtn.id = 'consent-settings-btn';
        settingsBtn.className = 'consent-floating-btn';
        settingsBtn.innerHTML = '<i class="fas fa-cookie-bite"></i>';
        settingsBtn.title = 'Gérer mes cookies';
        settingsBtn.addEventListener('click', () => this.showCustomModal());
        document.body.appendChild(settingsBtn);
    }

    // Réinitialiser les préférences (pour tests)
    reset() {
        localStorage.removeItem(this.cookieName);
        this.consentData = null;
        location.reload();
    }
}

// Initialiser le gestionnaire au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.consentManager = new ConsentManager();
    });
} else {
    window.consentManager = new ConsentManager();
}
