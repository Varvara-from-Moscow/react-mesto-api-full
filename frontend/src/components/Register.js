import React from 'react';
import { Link, withRouter} from 'react-router-dom';
 

function Register({onRegister}) {
  const [values, setValues] = React.useState({});

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      password: values.password,
      email: values.email
    });
  }

  return (
    <section className="login__container">
      
      <form className="login__form" onSubmit={handleSubmit}>
        <h3 className="login__title">Регистрация</h3>
        <input
          required
          autoComplete="on"
          name="email"
          type="email"
          minLength="5"
          maxLength="40"
          className="login__input"
          placeholder="Email" 
          onChange={handleChange}
        />
        <span className="login__error login__error_visible name-error" />
        <input
          required
          autoComplete="on"
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
                className="login__button">
                Зарегистрироваться
                </button>
      </form>

      <p className="login__subtitle">Уже зарегистрированы?<Link to="/signin" className="login__subtitle_enter"> Войти</Link></p>

    </section>  
      

    );
  }

export default withRouter(Register);
