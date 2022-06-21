import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

// Функциональный компонент Movies
function Movies() {
  return (
    <main className='content content__movies'>
      <SearchForm />
      <MoviesCardList />
      <button type='submit' className='button link'>
        Ещё
      </button>
    </main>
  );
}

export default Movies;
