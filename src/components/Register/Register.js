import React from "react";
import AuthForm from "../AuthForm/AuthForm";
import "./Register.css";

function Register(props) {
  return (
    <main>
      <AuthForm
        name='register'
        title='Добро пожаловать!'
        buttonText='Зарегистрироваться'
        namelink='Войти'
        text='Уже зарегистрированы?'
        link='/signin'
      >
        <label className='register__label' for='name'>
          Имя
        </label>
        <input
          id='name'
          name='name'
          className='form__input register__input_string_name'
          type='text'
          placeholder='Виталий'
          required
          autoComplete='off'
          minLength='2'
          maxLength='40'
        />
        <span className='form__input-error register__name-error'>5655</span>
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
        <span className='form__input-error register__password-error'>Что-то пошло не так...</span>
      </AuthForm>
    </main>
  );
}

export default Register;
