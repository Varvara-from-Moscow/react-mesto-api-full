  export default class Api {
    constructor({url, headers}) {
        this._url = url;
        this._headers = headers;
    }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method:'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      method:'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  addUserCard(data) {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch (`${this._url}/cards/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._checkResponse);
  }

  changeLikeStatus(id, isLiked) {
    return fetch (`${this._url}/cards/${id}/likes`, {
      credentials: 'include',
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
        .then(this._checkResponse);
  }

  updateUserAvatar(data) {
    return fetch (`${this._url}/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._checkResponse);
  }
}

const api = new Api({
  url:'https://api.mestoApp.nomoredomains.xyz',
  headers: {
    'Content-Type': 'application/json'
  }
});

export {api};
