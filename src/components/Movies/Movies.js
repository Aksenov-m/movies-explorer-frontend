import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Movies.css";

// Функциональный компонент Movies
function Movies(props) {
  const isDisabledBt = props.visibleMovies >= props.moviesCard.length;

  function handleShowMoreClick() {
    props.showMoreMovies();
  }

  return (
    <>
      <Header {...props}/>
    <main className='content content__movies'>
      <SearchForm {...props} />
      <MoviesCardList {...props} />
      <button disabled={isDisabledBt} className='button link' onClick={handleShowMoreClick}>
        Ещё
      </button>
    </main>
    <Footer />
    </>
  );
}

export default Movies;
