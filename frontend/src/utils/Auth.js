export const BASE_URL = 'https://auth.nomoreparties.co';

  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  }
        
export const register = ( {password, email} ) => {
    return fetch(`${BASE_URL}/signup`, {
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

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((response => response.json()))
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      return data.token; 
    } 
  })
  .catch(err => console.log(err))
};
  

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },  
  }).then((res) => {
    return checkResponse(res);
  });
};
