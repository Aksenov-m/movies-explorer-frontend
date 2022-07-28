import React, { useState, useEffect } from "react";
import AuthForm from "../AuthForm/AuthForm";
import "./Register.css";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function Register({ handleRegister }) {
  const [message, setMessage] = useState("");
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values.name, values.email, values.password).catch((e) => setMessage(e.message));
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main>
      <AuthForm
        name='register'
        title='Добро пожаловать!'
        buttonText='Зарегистрироваться'
        namelink='Войти'
        text='Уже зарегистрированы?'
        link='/signin'
        onSubmit={handleSubmit}
        isValid={isValid}
        errorMessage={message}
      >
        <label className='register__label' htmlFor='name'>
          Имя
        </label>
        <input
          id='name'
          name='name'
          className='form__input register__input_string_name'
          type='text'
          placeholder=''
          required
          autoComplete='off'
          minLength='2'
          maxLength='40'
          pattern='[a-zA-Zа-яА-Я -]{1,}'
          value={values.name || ""}
          onChange={handleChange}
        />
        <span className='form__input-error register__name-error'>{errors.name || ""}</span>
        <label className='register__label' htmlFor='email'>
          E-&nbsp;mail
        </label>
        <input
          id='email'
          name='email'
          className='form__input register__input_string_email'
          type='email'
          placeholder=''
          required
          autoComplete='off'
          minLength='2'
          maxLength='40'
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className='form__input-error register__email-error'>{errors.email || ""}</span>
        <label className='register__label' htmlFor='password'>
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
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className='form__input-error register__password-error'>{errors.password || ""}</span>
      </AuthForm>
    </main>
  );
}

export default Register;
