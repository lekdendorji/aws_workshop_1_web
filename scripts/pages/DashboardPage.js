import Backend from '/scripts/clients/Backend.js';
import pageController from '/scripts/controllers/PageController.js';

class DashboardPage {
    constructor() {
        this._initializeEventListeners();
    }

    _initializeEventListeners() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                Backend.logout();
                pageController.showLogin();
            });
        }
    }
}

let dashboardPage = new DashboardPage();
export default dashboardPage;
