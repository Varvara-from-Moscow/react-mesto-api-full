export const BASE_URL = 'https://api.mestoApp.nomoredomains.xyz';

  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

export const register = ( password, email ) => {
  return fetch(`${BASE_URL}/signup`, {
    credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password,
        email
      })
    })
  .then(checkResponse)
}; 

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    credentioals: 'include',
    method: 'POST',
    headers: {
      //'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
  //.then((response => response.json()))
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
    credentials: 'include',
    method: 'GET',
    headers: {
      //'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },  
  })
  .then(checkResponse)
};
