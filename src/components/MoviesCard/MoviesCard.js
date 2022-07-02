import React, { useState, useEffect } from 'react'
import './MoviesCard.css'
// import moviesCard from "../../images/movies-card.png";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard(props) {
  let isLiked =
    !props.isSavedMoviesCard && props.checkLikeSaveMovie(props.movie)

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `${
    isLiked ? 'movies-card__favorite_active' : 'movies-card__favorite'
  }`

  function handleMoviesCard() {
    if (props.isSavedMoviesCard) {
      handleDeleteClick()
    } else {
      handleSaveClick()
    }
  }

  function handleSaveClick() {
    props.onCardLike(props.movie)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.movie)
  }

  return (
    <article className="movies-card movies-cards__item">
      <div className="movies-card__flex">
        <div className="movies-card__info">
          <h2 className="movies-card__title">{props.movie.nameRU}</h2>
          <span className="movies-card__duration">{`${props.movie.duration} мин`}</span>
        </div>
        <button
          onClick={handleMoviesCard}
          className={`icon ${cardLikeButtonClassName} ${
            props.isSavedMoviesCard ? 'movies-card__close' : ''
          }`}
          type="button"
        ></button>
      </div>
      <a href={props.movie.trailerLink} target="_blank">
        <img
          className="movies-card__image link"
          src={
            props.isSavedMoviesCard
              ? props.movie.image
              : `https://api.nomoreparties.co/${props.movie.image.url}`
          }
          alt="Обложка фильма."
        />
      </a>
    </article>
  )
}

export default MoviesCard
