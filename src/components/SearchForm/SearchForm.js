import React from "react";
import "./SearchForm.css";

// Функциональный компонент Movies
function SearchForm() {
  return (
    <form className='search-form'>
      <fieldset className='search-form__movies'>
        <input className='search-form__input' type='text' placeholder='Фильм' required></input>
        <button className='search-form__button' type='image'></button>
      </fieldset>
      <div class='search-form__checkbox'>
        <input className='search-form__switch' id='switch' type='checkbox'></input>
        <p className='search-form__text'>Короткометражки</p>
      </div>
    </form>
  );
}

export default SearchForm;
