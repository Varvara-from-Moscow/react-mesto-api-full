export const BASE_URL = 'https://api.mestoApp.nomoredomains.xyz';
//export const BASE_URL = 'http://localhost:3000';

  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

export const register = ( {password, email} ) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: password,
      email: email 
      })
  }).then((res) => {
    console.log(res);
    return checkResponse(res);
  });
}; 

export const authorize = ( password, email ) => {
  return fetch(`${BASE_URL}/signin`, {
      credentials: 'include',
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ password, email })
  })
      .then(checkResponse)
      
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
      credentials: 'include',
      method: "GET",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
  })
      .then(checkResponse)
};
