import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  return (
    <section className='cards section content__section' aria-label='Карточки мест'>
      <MoviesCard isSavedMoviesCard={props.isSavedMoviesCard} />
      <MoviesCard isSavedMoviesCard={props.isSavedMoviesCard} />
      <MoviesCard isSavedMoviesCard={props.isSavedMoviesCard} />
      <MoviesCard isSavedMoviesCard={props.isSavedMoviesCard} />
      <MoviesCard isSavedMoviesCard={props.isSavedMoviesCard} />
    </section>
  );
}

export default MoviesCardList;
