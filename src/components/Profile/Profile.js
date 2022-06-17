import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

// Функциональный компонент Profile
function Profile() {
  return (
    <main className='section content__profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <form className='profile__form'>
        <fieldset class='profile__info name'>
          <label className='profile__label' for='name'>
            Имя
          </label>
          <input className='profile__input' type='text' id='name' placeholder='Виталий' required></input>
        </fieldset>
        <fieldset class='profile__info email'>
          <label className='profile__label' for='email'>
            E-&nbsp;mail
          </label>
          <input className='profile__input' type='email' id='email' placeholder='pochta@yandex.ru' required></input>
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
