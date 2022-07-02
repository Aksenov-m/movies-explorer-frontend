import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  return (
    <section className='cards section content__section' aria-label='Карточки фильмов'>
      {props.moviesCard.slice(0, props.visibleMovies).map((movieInfo) => {
        return <MoviesCard key={movieInfo.id || movieInfo._id} movie={movieInfo} {...props} />;
      })}
    </section>
  );
}

export default MoviesCardList;
