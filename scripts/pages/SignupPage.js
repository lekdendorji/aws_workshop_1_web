import Backend from '/scripts/clients/Backend.js';
import pageController from '/scripts/controllers/PageController.js';

class SignupPage {
    constructor() {
        this._initializeEventListeners();
    }

    _initializeEventListeners() {
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this._signup();
            });
        }

        const showLoginLink = document.getElementById('show-login');
        if (showLoginLink) {
            showLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                pageController.showLogin();
            });
        }
    }

    _getErrorMessageElement() {
        return document.getElementById('signup-error');
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
        const btn = document.getElementById('signup-btn');
        if (!btn) return;
        btn.disabled = loading;
        btn.classList.toggle('loading', loading);
    }

    async _signup() {
        const username = document.getElementById('signup-username')?.value?.trim();
        const password = document.getElementById('signup-password')?.value;
        const passwordConfirm = document.getElementById('signup-password-confirm')?.value;

        this._clearError();

        if (!username) {
            this._showError('Please enter a username.');
            return;
        }
        if (!password) {
            this._showError('Please enter a password.');
            return;
        }
        if (password !== passwordConfirm) {
            this._showError('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            this._showError('Password must be at least 6 characters.');
            return;
        }

        this._setButtonLoading(true);
        try {
            const result = await Backend.signup(username, password);
            Backend.setAuth(result.token, result.expiration);
            pageController.showDashboard();
        } catch (err) {
            this._setButtonLoading(false);
            if(false) {
                this._showError("Username already exists.");
            } else {
                this._showError("Sorry, something went wrong. Please try again later.");
            }
        }
    }
}

let signupPage = new SignupPage();
export default signupPage;
