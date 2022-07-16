import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link } from 'react-router-dom';
//import {CurrentUserContext} from '../contexts/CurrentUserContext'
import { Route } from 'react-router-dom';

function Header({loggedIn, userEmail, onSignOut}) {

  return (
    <header className="header">
        <a href="#">
          <img src={headerLogo} alt="Логотип" className="header__logo" />
        </a>
    {loggedIn? 
        <ul className="header__navBar">
          <li className="header__nav">{userEmail}</li>
          <li className="header__nav">
          <button className="header__exit-button" onClick={onSignOut}>Выйти</button></li>
        </ul>
      :
      (<>
      <Route path="/signin">
        <Link to="/signup" className="header__nav-link header__nav-reg">Регистрация</Link>
      </Route>
      <Route path="/signup">
        <Link to="/signin" className="header__nav-link">Войти</Link>
      </Route>
      </>)
    }

    </header>
  );
}
  
export default Header;
