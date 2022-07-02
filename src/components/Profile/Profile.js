import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import Header from "../Header/Header";
import "./Profile.css";

// Функциональный компонент Profile
function Profile(props, { handleUpdateUser, errorMessage }) {
  const [isEditInfo, setIsEditInfo] = useState(false);
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  const ref = useRef(null);
  const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser(values.name, values.email);
  }

  const handleClick = () => {
    setIsEditInfo(true);
    ref.current.focus();
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    if (currentUser) {
      setIsEditInfo(false);
    }
  }, [currentUser]);

  return (
    <>
      <Header {...props} />
      <main className='section content__profile'>
        <h2 className='profile__title'>{`Привет, ${currentUser.name}`}</h2>
        <form className='profile__form'>
          <fieldset className='profile__info name'>
            <label className='profile__label' htmlFor='name'>
              Имя
            </label>
            <input
              ref={ref}
              className='profile__input'
              type='text'
              id='name'
              name='name'
              placeholder={currentUser.name}
              required
              pattern='[a-zA-Zа-яА-Я -]{1,}'
              value={values.name || ""}
              onChange={handleChange}
            ></input>
            <span className='form__input-error profile__name-error'>{errors.name || ""}</span>
          </fieldset>
          <fieldset className='profile__info email'>
            <label className='profile__label' htmlFor='email'>
              E-&nbsp;mail
            </label>
            <input
              className='profile__input'
              type='email'
              id='email'
              name='email'
              placeholder={currentUser.email}
              required
              value={values.email || ""}
              onChange={handleChange}
            ></input>
            <span className='form__input-error profile__email-error'>{errors.email || ""}</span>
          </fieldset>
          <div className='profile__container'>
            <p className='profile__error'>{errorMessage || ""}</p>
            <button
              className={`button button_theme_green link ${isEditInfo ? "" : "profile__button_disabled"}`}
              type='submit'
              disabled={!isValid}
              onClick={handleSubmit}
            >
              Сохранить
            </button>
          </div>
        </form>
        <button className={`profile__button link ${isEditInfo ? "profile__button_disabled" : ""}`} onClick={handleClick}>
          Редактировать
        </button>
        <Link onClick={props.signOut} className={`profile__button profile__button_theme_red link' ${isEditInfo ? "profile__button_disabled" : ""}`} to='/'>
          Выйти из аккаунта
        </Link>
      </main>
    </>
  );
}

export default Profile;
