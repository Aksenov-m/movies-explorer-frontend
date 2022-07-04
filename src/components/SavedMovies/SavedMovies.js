import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// Функциональный компонент SavedMovies
function SavedMovies(props) {
  return (
    <>
      <Header {...props} />
      <main className='content content__movies'>
        <SearchForm {...props} />
        <MoviesCardList {...props} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
