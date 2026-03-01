import Backend from '/scripts/clients/Backend.js';

class PageController {
    constructor() {
        this._loginSection = document.getElementById('login-section');
        this._signupSection = document.getElementById('signup-section');
        this._dashboardSection = document.getElementById('dashboard-section');
        if (!this._loginSection || !this._signupSection || !this._dashboardSection) return;

        this._init();
    }

    _hideAll() {
        this._loginSection?.classList.add('hidden');
        this._signupSection?.classList.add('hidden');
        this._dashboardSection?.classList.add('hidden');
    }

    showLogin() {
        this._hideAll();
        this._loginSection?.classList.remove('hidden');
    }

    showSignup() {
        this._hideAll();
        this._signupSection?.classList.remove('hidden');
    }

    showDashboard() {
        this._hideAll();
        this._dashboardSection?.classList.remove('hidden');
    }

    async _init() {
        if (Backend.isAuthenticated()) {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }
}

let pageController = new PageController();
export default pageController;
