import React, { useEffect } from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header(props) {
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        props.closeBurger();
      }
    }
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [props.burgerOpen]);

  useEffect(() => {
    function handleClickClose(evt) {
      if (evt.target.classList.contains("navigation__burger_opened")) {
        props.closeBurger();
      }
    }
    document.addEventListener("click", handleClickClose);
    return () => document.removeEventListener("click", handleClickClose);
  }, [props.burgerOpen]);

  return (
    <header className='header section page__header'>
      <img className='header__logo' src={logo} alt='Логотип.' />
      <button
        className={`header__button ${props.loggedIn ? "" : "header__button_disabled"}`}
        onClick={props.onBurger}
      ></button>
      <Navigation {...props} />
      <div className={`header__info ${props.loggedIn ? "header__info_disabled" : ""}`}>
        <Link className='header__text link' to='/signup'>
          Регистрация
        </Link>
        <Link className='header__text header__text_type_signin link' to='/signin'>
          Войти
        </Link>
      </div>
    </header>
  );
}

export default Header;
