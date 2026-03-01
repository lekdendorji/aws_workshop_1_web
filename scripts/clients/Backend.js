import { API_URL } from '/scripts/constants/constants.js';

let authToken = Number(localStorage.getItem('authToken'));
let authExpiration = Number(localStorage.getItem('authExpiration'));

class Backend {
    setAuth(token, expiration) {
        authToken = token;
        authExpiration = expiration;
        localStorage.setItem('authToken', token);
        localStorage.setItem('authExpiration', expiration);
    }

    async login(username, password) {
        return await this._post('/auth/login', { username, password });
    }

    async signup(username, password) {
        return await this._post('/auth/signup', { username, password });
    }

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authExpiration');
        authToken = null;
        authExpiration = null;
    }

    async _handleError(response) {
        let errorData = {
            status: response.status,
        }
        try {
            const errorBody = await response.json();
            if (errorBody) {
                errorData.body = errorBody;
            }
        } catch (e) {
            // Response wasn't JSON or didn't have a message field
        }
        throw new Error(JSON.stringify(errorData));
    }

    async _get(path, params, apiUrl = API_URL) {
        const queryString = params ? `?${new URLSearchParams(params)}` : '';
        const response = await fetch(apiUrl + path + queryString, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            await this._handleError(response);
        }
        const data = await response.json();
        return data.data;
    }

    isAuthenticated() {
        return !isNaN(authExpiration) && authExpiration > Date.now() && authToken;
    }

    async _getAuthenticated(path, params, apiUrl = API_URL) {
        if(!this.isAuthenticated())
            window.location.reload();
            
        const queryString = params ? `?${new URLSearchParams(params)}` : '';
        const response = await fetch(apiUrl + path + queryString, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        
        if (!response.ok) {
            await this._handleError(response);
        }
        const data = await response.json();
        return data.data;
    }

    async _post(path, request, apiUrl = API_URL) {
        const response = await fetch(apiUrl + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request),
            credentials: 'include'
        });

        if (!response.ok) {
            await this._handleError(response);
        }
        const data = await response.json();
        return data;
    }

    async _postAuthenticated(path, request, apiUrl = API_URL) {
        if(!this.isAuthenticated())
            window.location.reload();

        const response = await fetch(apiUrl + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request),
            credentials: 'include'
        });

        if (!response.ok) {
            await this._handleError(response);
        }
        const data = await response.json();
        return data;
    }

    async _putAuthenticated(path, request, apiUrl = API_URL) {
        if(!this.isAuthenticated())
            window.location.reload();

        const response = await fetch(apiUrl + path, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request),
            credentials: 'include'
        });

        if (!response.ok) {
            await this._handleError(response);
        }
        const data = await response.json();
        return data;
    }

    async _deleteAuthenticated(path, request, apiUrl = API_URL) {
        if(!this.isAuthenticated())
            window.location.reload();

        const response = await fetch(apiUrl + path, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request),
            credentials: 'include'
        });

        if (!response.ok) {
            await this._handleError(response);
        }
        const data = await response.json();
        return data;
    }
}

let backend = new Backend();
export default backend;
