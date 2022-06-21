import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import "./Login.css";

function Login(props) {
  return (
    <main>
      <AuthForm
        name='login'
        title='Рады видеть!'
        buttonText='Войти'
        namelink='Регистрация'
        text='Ещё не зарегистрированы?'
        link='/signup'
      >
        <label className='register__label' for='email'>
          E-&nbsp;mail
        </label>
        <input
          id='email'
          name='email'
          className='form__input register__input_string_email'
          type='text'
          placeholder='pochta@yandex.ru'
          required
          autoComplete='off'
          minLength='2'
          maxLength='40'
        />
        <span className='form__input-error register__email-error'>65565666</span>
        <label className='register__label' for='password'>
          Пароль
        </label>
        <input
          id='password'
          name='password'
          className='form__input register__input_string_password'
          type='password'
          required
          autoComplete='off'
          minLength='2'
          maxLength='200'
        />
        <span className='form__input-error register__password-error'>656</span>
      </AuthForm>
    </main>
  );
}

export default Login;
