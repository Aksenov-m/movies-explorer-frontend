import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./AuthForm.css";

// Функциональный компонент PopupWithForm
function AuthForm(props) {
  return (
    <div className='auth-form section'>
      <div className='auth-form__header'>
        <img className='header__logo' src={logo} alt='Логотип.' />
        <h2 className='auth-form__title'>{props.title}</h2>
      </div>
      <form
        className={`auth-form__info auth-form__info_form_${props.name}`}
        name={props.name}
        onSubmit={props.onSubmit}
      >
        {props.children}
        <p className='auth-form__error'>{props.errorMessage}</p>
        <button type='submit' className='button button_theme_green link' disabled={!props.isValid}>
          {props.buttonText}
        </button>
      </form>
      <div className='auth-form__link'>
        <p className='auth-form__text'>{props.text || "500 На сервере произошла ошибка."}</p>
        <Link className='auth-form__button link' to={props.link}>
          {props.namelink}
        </Link>
      </div>
    </div>
  );
}

export default AuthForm;
