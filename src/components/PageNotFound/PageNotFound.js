import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className='not-found'>
      <span className='not-found__title'>404</span>
      <p className='not-found__text'>Страница не найдена</p>
      <Link className='auth-form__button link' to='/signin'>
        Назад
      </Link>
    </div>
  );
}

export default PageNotFound;
