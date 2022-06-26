import React, { useState, useEffect } from "react";
import AuthForm from "../AuthForm/AuthForm";
import "./Login.css";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function Login({ handleLogin }) {
  const [message, setMessage] = useState("");

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleLogin(values.email, values.password).catch((e) => setMessage(e.message));
  }

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <main>
      <AuthForm
        name='login'
        title='Рады видеть!'
        buttonText='Войти'
        namelink='Регистрация'
        text='Ещё не зарегистрированы?'
        link='/signup'
        onSubmit={handleSubmit}
        isValid={isValid}
        errorMessage={message}
      >
        <label className='register__label' htmlFor='email'>
          E-&nbsp;mail
        </label>
        <input
          id='email'
          name='email'
          className='form__input register__input_string_email'
          type='text'
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

export default Login;
