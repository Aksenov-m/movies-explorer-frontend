import React, { useEffect, useRef } from "react";
import "./SearchForm.css";
import useFormWithValidation from "../../hooks/useFormWithValidation";

// Функциональный компонент SearchForm
function SearchForm(props) {
  const { values, handleChange, resetForm, isValid } = useFormWithValidation();

  const inputRef = useRef(null);

  useEffect(() => {
    if (!props.isSavedMoviesCard) {
    inputRef.current.value = props.searchMoviesName;
    }
    else {
      inputRef.current.value = props.searchSaveMoviesName;
    }
  }, []);

  useEffect(() => {
    props.setMessage("");
  }, []);


  useEffect(() => {
    resetForm();
  }, [resetForm]);


  function handleSubmit(e) {
    e.preventDefault();
    if (props.isSavedMoviesCard) {
      props.handleGetSaveMovies(values.search);
    } else {
      props.handleGetMovies(values.search);
    }
  }

  function handleToggle() {
    if (props.isSavedMoviesCard) {
      props.onCheckboxSaveMovies(props.moviesCard);
    } else {
      props.onCheckbox(props.moviesCard);
    }
  }

  return (
    <>
      <form className='search-form'>
        <fieldset className='search-form__movies'>
          <input
            ref={inputRef}
            className='search-form__input'
            type='text'
            id='search'
            name='search'
            placeholder='Фильм'
            required
            value={values.search}
            onChange={handleChange}
          ></input>
          <button className='search-form__button' type='submit' disabled={!isValid} onClick={handleSubmit}></button>
        </fieldset>
        <div className='search-form__checkbox'>
          <input
            className='search-form__switch'
            id='switch'
            type='checkbox'
            defaultChecked={!props.isSavedMoviesCard ? props.checkbox : props.checkboxSaveMovies}
            onClick={handleToggle}
          ></input>
          <p className='search-form__text'>Короткометражки</p>
        </div>
      </form>
      <span className='form__input-error'>{props.errorMessage || ""}</span>
    </>
  );
}

export default SearchForm;
