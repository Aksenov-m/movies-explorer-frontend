import React from "react";
import "./MoviesCard.css";
import moviesCard from "../../images/movies-card.png";

function MoviesCard(props) {
  return (
    <article className='movies-card movies-cards__item'>
      <div className='movies-card__flex'>
        <div className='movies-card__info'>
          <h2 className='movies-card__title'>33 слова о дизайне</h2>
          <span className='movies-card__duration'>1ч 47м</span>
        </div>
        <button
          className={`icon movies-card__favorite ${props.isSavedMoviesCard ? "movies-card__close" : ""}`}
          type='button'
        ></button>
      </div>
      {/* <button className='movies-card__close' type='button' aria-label='closeMovies-card'></button> */}
      {/* <button className='movies-card__favorite' type='button' aria-label='favorite'></button> */}
      <img className='movies-card__image' src={moviesCard} alt='' />
    </article>
  );
}

export default MoviesCard;
