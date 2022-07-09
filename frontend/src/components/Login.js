import React from 'react';
//import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { withRouter } from 'react-router-dom';

function Login({onLogin}) {

  const [values, setValues] = React.useState({});

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin( values.password, values.email );
  }

  return ( 
      <section className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h3 className="login__title">Вход</h3>
          <input
              required
              name="email"
              type="email"
              minLength="5"
              className="login__input"
              placeholder="Email" 
              onChange={handleChange}
          />
            <span className="login__error login__error_visible name-error" />
          <input
              required
              name="password"
              type="password"
              minLength="5"
              maxLength="5"
              className="login__input"
              placeholder="Пароль" 
              onChange={handleChange}
          />
            <span className="login__error login__error_visible password-error" />
          <button type="submit" 
                  className="login__button">Войти</button>
        </form>
      </section>
    );
  } 

export default withRouter(Login);
