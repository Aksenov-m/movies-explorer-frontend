import React, { useEffect } from "react";
// import { withRouter } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import "./Register.css";
import useFormWithValidation from "../useFormWithValidation";

function Register({ handleRegister }) {
  // const [registerData, setRegisterData] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  // })

  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  // const { name, email, password } = registerData;

  // function handleChange(e) {
  //   const { name, value } = e.target
  //   setRegisterData({
  //     ...registerData,
  //     [name]: value,
  //   })
  // }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values.name, values.email, values.password);
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
          pattern='[a-zA-Zа-яА-Я -]{1,}'
          value={values.name || ""}
          onChange={handleChange}
        />
        <span className='form__input-error register__name-error'>{errors.name || ""}</span>
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
          value={values.email || ""}
          onChange={handleChange}
        />
        <span className='form__input-error register__email-error'>{errors.email || ""}</span>
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
          value={values.password || ""}
          onChange={handleChange}
        />
        <span className='form__input-error register__password-error'>{errors.password || ""}</span>
      </AuthForm>
    </main>
  );
}

export default Register;
