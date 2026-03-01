import Backend from '/scripts/clients/Backend.js';
import pageController from '/scripts/controllers/PageController.js';

class LoginPage {
    constructor() {
        this._initializeEventListeners();
    }

    _initializeEventListeners() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this._login();
            });
        }

        const showSignupLink = document.getElementById('show-signup');
        if (showSignupLink) {
            showSignupLink.addEventListener('click', (e) => {
                e.preventDefault();
                pageController.showSignup();
            });
        }
    }

    _getErrorMessageElement() {
        return document.getElementById('login-error');
    }

    _showError(message) {
        const el = this._getErrorMessageElement();
        if (el) el.textContent = message;
    }

    _clearError() {
        const el = this._getErrorMessageElement();
        if (el) el.textContent = '';
    }

    _setButtonLoading(loading) {
        const btn = document.getElementById('login-btn');
        if (!btn) return;
        btn.disabled = loading;
        btn.classList.toggle('loading', loading);
    }

    async _login() {
        const username = document.getElementById('login-username')?.value?.trim();
        const password = document.getElementById('login-password')?.value;

        this._clearError();

        if (!username) {
            this._showError('Please enter a username.');
            return;
        }
        if (!password) {
            this._showError('Please enter a password.');
            return;
        }

        this._setButtonLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const result = await Backend.login(username, password);
            Backend.setAuth(result.token, result.expiration);
            pageController.showDashboard();
        } catch (err) {
            this._setButtonLoading(false);
            if(false) {
                this._showError("Invalid username or password.");
            } else {
                this._showError("Sorry, something went wrong. Please try again later.");
            }
        }
    }
}

let loginPage = new LoginPage();
export default loginPage;
