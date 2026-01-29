export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    signin({ email, password }) {
        return fetch(`${this._baseUrl}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ email, password }),
        }).then(this._checkResponse);
    }
  
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }


    _makeRequest(endpoint, method, body = null) {
        const options = {
            method,
            headers: this._headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        return fetch(`${this._baseUrl}${endpoint}`, options)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Error: ${res.status}`);
            });


    }
    getUserInfo() {
        return this._makeRequest('/users/me', 'GET');
    }

    updateUserInfo(name, about) {
        return this._makeRequest('/users/me', 'PATCH', { name, about });

    }

    updateUserAvatar(avatar) {
        return this._makeRequest('/users/me/avatar', 'PATCH', { avatar });

    }

    getInitialCards() {
        return this._makeRequest('/cards', 'GET');

    }

    addCard(name, link) {
        return this._makeRequest('/cards', 'POST', { name, link });

    }

    deleteCard(cardId) {
        return this._makeRequest(`/cards/${cardId}`, 'DELETE');

    }

    likeCard(cardId) {
        return this._makeRequest(`/cards/${cardId}/likes`, 'PUT');

    }
    dislikeCard(cardId) {
        return this._makeRequest(`/cards/${cardId}/likes`, 'DELETE');

    }

}

export default Api;
