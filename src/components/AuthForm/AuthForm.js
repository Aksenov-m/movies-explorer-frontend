import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./AuthForm.css";

// Функциональный компонент PopupWithForm
function AuthForm(props) {
  return (
    <div className='auth-form section'>
      <img className='header__logo' src={logo} alt='Логотип.' />
      <h2 className='auth-form__title'>{props.title}</h2>
      <form className={`auth-form__info auth-form__info_form_${props.name}`} name={props.name}>
        {props.children}
      </form>
      <button type='submit' className='button button_theme_green link'>
        {props.buttonText}
      </button>
      <div className='auth-form__link'>
        <p className='auth-form__text'>{props.text}</p>
        <Link className='auth-form__button link' to={props.link}>
          {props.namelink}
        </Link>
      </div>
    </div>
  );
}

export default AuthForm;
