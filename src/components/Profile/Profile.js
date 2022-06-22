import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "./Profile.css";

// Функциональный компонент Profile
function Profile(props) {
  // Подписка на контекст
  // const currentUser = useContext(CurrentUserContext);
  const [values, setValues] = useState({});

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  // useEffect(() => {
  //   if (currentUser)
  //     // setName(currentUser.name);
  //     // setDescription(currentUser.about);
  //     setValues(currentUser);
  // }, [currentUser]);

  // function handleChangeInput(e) {
  //   setValues({
  //     ...values,
  //     [e.target.value.name]: e.target.value,
  //   });
  // }

  // function handleSubmit(e) {
  //   // Запрещаем браузеру переходить по адресу формы
  //   e.preventDefault();

  //   // Передаём значения управляемых компонентов во внешний обработчик
  //   props.onUpdateUser(values);
  // }

  return (
    <main className='section content__profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <form className='profile__form'>
        <fieldset class='profile__info name'>
          <label className='profile__label' for='name'>
            Имя
          </label>
          <input
            className='profile__input'
            type='text'
            id='name'
            name='name'
            placeholder='Виталий'
            required
            pattern='[a-zA-Zа-яА-Я -]{1,}'
            value={values.name || ""}
            // onChange={handleChangeInput}
          ></input>
        </fieldset>
        <fieldset class='profile__info email'>
          <label className='profile__label' for='email'>
            E-&nbsp;mail
          </label>
          <input
            className='profile__input'
            type='email'
            id='email'
            name='email'
            placeholder='pochta@yandex.ru'
            required
            value={values.email || ""}
            // onChange={handleChangeInput}
          ></input>
        </fieldset>
      </form>
      <button className='profile__button link'>Редактировать</button>
      <Link className='profile__button profile__button_theme_red link' to='/signin'>
        Выйти из аккаунта
      </Link>
    </main>
  );
}

export default Profile;
