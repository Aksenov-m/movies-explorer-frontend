import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";

// Функциональный компонент SavedMovies
function SavedMovies() {
  return (
    <main className='content content__movies'>
      <SearchForm />
      <MoviesCardList isSavedMoviesCard={true} />
    </main>
  );
}

export default SavedMovies;
