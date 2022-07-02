import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Preloader from "../Preloader/Preloader";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"; // импортируем HOC
import * as moviesAuth from "../../utils/MoviesAuth";
import mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";

import "./App.css";

function App() {
  const [moviesCard, setmoviesCard] = useState([]);
  const [saveMoviesCard, setSaveMoviesCard] = useState([]);

  const [visibleMovies, setVisibleMovies] = useState(3);
  const [message, setMessage] = useState("");
  // Стейт, отвечающий за данные текущего пользователя
  const [currentUser, setСurrentUser] = useState({});
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  // Стейт, который информирует пользователя об успешной (или не очень) регистрации
  const [isRegister, setIsRegister] = useState(false);
  const [isloader, setloader] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [searchMoviesName, setSearchMoviesName] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [checkboxSaveMoviesCard, setCheckboxSaveMoviesCard] = useState(false);

  const [size, setSize] = useState(window.innerWidth);

  const history = useHistory();

  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      moviesAuth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            // здесь можем получить данные пользователя!

            setСurrentUser(res.data);
            setLoggedIn(true);
            // history.push("/movies");
          }
        })
        .catch((res) => console.log(res.message));
    }
  };

  useEffect(() => {
    tokenCheck();
    if (localStorage.getItem("searcMovies")) {
    setCheckbox(JSON.parse(localStorage.getItem("isCheckboxFilter")));
    setCheckboxSaveMoviesCard(JSON.parse(localStorage.getItem("isCheckboxSaveFilter")));
    setSearchMovies(JSON.parse(localStorage.getItem("searcMovies")));
    setSearchMoviesName(localStorage.getItem("searcMoviesName"));
  }
  }, []);

  const handlResize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    handlResize();
    window.addEventListener("resize", handlResize);
    return () => window.removeEventListener("resize", handlResize);
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([moviesApi.getMovies(), mainApi.getUserInfo(), mainApi.getSavelMoviesCards()])

  
        .then(([movies, user, saveMovies ]) => {
          setmoviesCard(movies);
          setСurrentUser(user.data);
          const saveMoviesCard = saveMovies.data.filter((i) => i.owner === user.data._id);
          setSaveMoviesCard(saveMoviesCard);
        })
        .catch((err) => alert(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if ((size <= 1280) & (size > 769)) {
      setVisibleMovies(12);
    } else if ((size < 769) & (size > 481)) {
      setVisibleMovies(8);
    } else if ((size < 481) & (size > 0)) {
      setVisibleMovies(5);
    } else {
      setVisibleMovies(12);
    }
  }, [size]);

  const showMoreMovies = () => {
    setTimeout(() => {
      if (size >= 1280) {
        setVisibleMovies((i) => i + 3);
      } else if (size <= 768) {
        setVisibleMovies((i) => i + 2);
      } else {
        setVisibleMovies((i) => i + 3);
      }
    }, 800);
  };

  function handleGetMovies(value) {
    setloader(true);
    setSearchMoviesName(value);
    setTimeout(() => {
      const filteredMovies = moviesCard.filter((movie) => {
        return String(movie.nameEN).toLowerCase().includes(value.toLowerCase()) || movie.nameRU.toLowerCase().includes(value.toLowerCase());
      });
      if (filteredMovies.length === 0) {
        setMessage("Ничего не найдено");
        setSearchMovies([]);
        setloader(false);
      } else {
        setloader(false);
        setMessage();
        setSearchMovies(filteredMovies);
        localStorage.setItem("searcMovies", JSON.stringify(filteredMovies));
        localStorage.setItem("searcMoviesName", value);
      }
    }, 2500);
  }

  function handleGetSaveMovies(value) {
    setloader(true);
    setSearchMoviesName(value);
    setTimeout(() => {
      const filteredMovies = saveMoviesCard.filter((movie) => {
        return String(movie.nameEN).toLowerCase().includes(value.toLowerCase()) || movie.nameRU.toLowerCase().includes(value.toLowerCase());
      });
      if (filteredMovies.length === 0) {
        setMessage("Ничего не найдено");
        setloader(false);
      } else {
        setloader(false);
        setMessage();
        setSaveMoviesCard(filteredMovies);
      }
    }, 2500);
  }

  function filteredCheckboxMovies(array) {
    return array.filter((movie) => movie.duration <= 40);
  }

  function onCheckbox() {
    // фолс
    if (!checkbox) {
      setCheckbox(true);
      localStorage.setItem("isCheckboxFilter", JSON.stringify(!checkbox));
    }
    // тру
    else {
      setCheckbox(false);
      localStorage.setItem("isCheckboxFilter", JSON.stringify(!checkbox));
    }
  }

  function onCheckboxSaveMovies() {
    // фолс
    if (!checkboxSaveMoviesCard) {
      setCheckboxSaveMoviesCard(true);
      localStorage.setItem("isCheckboxSaveFilter", JSON.stringify(!checkboxSaveMoviesCard));
    }
    // тру
    else {
      setCheckboxSaveMoviesCard(false);
      localStorage.setItem("isCheckboxSaveFilter", JSON.stringify(!checkboxSaveMoviesCard));
    }
  }

  function handleBurgeClick() {
    setBurgerOpen(true);
  }

  function closeBurger() {
    setBurgerOpen(false);
  }

  function closePopups() {
    setInfoTooltipPopupOpen(false);
  }

  function handleRegister(name, email, password) {
    return moviesAuth.register(name, email, password).then(async (res) => {
      if (res.data) {
        await handleLogin(res.data.email, password);
        history.push("/movies");
        setIsRegister(true);
        setInfoTooltipPopupOpen(true);
      } else if (!res.data) {
        setInfoTooltipPopupOpen(true);
        setIsRegister(false);
        throw new Error(res.validation.body.message);
      } else {
        throw new Error("При регистрации пользователя произошла ошибка.");
      }
    });
  }

  function handleLogin(email, password) {
    return moviesAuth.authorize(email, password).then((res) => {
      // const { statusCode } = res;
      if (!res) {
        // const message = res.message;
        setInfoTooltipPopupOpen(true);
        setIsRegister(false);
        throw new Error("Вы ввели неправильный логин или пароль");
      } else if (res.token) {
        const userData = { email, password };
        localStorage.setItem("jwt", res.token);
        setСurrentUser(userData);
        setLoggedIn(true);
        history.push("/movies");
      } else {
        throw new Error("При авторизации произошла ошибка. Переданный токен некорректен.");
      }
    });
  }

  function signOut() {
    localStorage.clear();
    setСurrentUser({});
    setSearchMovies([]);
    setLoggedIn(false);
    setCheckbox(false);
    setSearchMoviesName("")
    setCheckboxSaveMoviesCard(false);
    history.push("/");
  }

  function handleUpdateUser(name, email) {
    setloader(true);
    mainApi
      .setUserInfo(name, email)
      .then((res) => {
        setСurrentUser(res.data);
        setMessage("");
      })
      .catch((res) => setMessage(`${res === 409 ? "Пользователь с таким email уже существует." : "При обновлении профиля произошла ошибка."}`))
      .finally(() => {
        setloader(false);
      });
  }


  // проверка состояния лайка (избранное)
  function checkLikeSaveMovie(movie) {
    return saveMoviesCard.some((i) => i.movieId === movie.id);
  }

  function onCardLike(data) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = checkLikeSaveMovie(data);
    setloader(true);
    setTimeout(() => {
      if (!isLiked) {
        mainApi
          .saveMoviesCard(data, !isLiked)
          .then((newMoviesCard) => {
            setSaveMoviesCard([newMoviesCard.data, ...saveMoviesCard]);
          })
          .catch((err) => alert(err))
          .finally(() => {
            setloader(false);
          });
      } else {
        const id = data.id || data.movieId;
        const movie = saveMoviesCard.find((item) => item.movieId === id);
        onCardDelete(movie);
      }
    }, 600);
  }

  function onCardDelete(movie) {
    // Отправляем запрос в API и получаем обновлённые данные без удалённой карточки
    mainApi
      .deleteCard(movie)
      .then(() => {
        setSaveMoviesCard((state) => state.filter((cardDelete) => cardDelete._id !== movie._id));
      })
      .catch((err) => alert(err))
      .finally(() => {
        setloader(false);
      });
  }

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='page__container'>
          <Preloader isOpen={isloader} />
          <Switch>
            <Route exact path='/'>
              <Main loggedIn={loggedIn} burgerOpen={isBurgerOpen} onBurger={handleBurgeClick} closeBurger={closeBurger} />
            </Route>
            <ProtectedRoute
              path='/movies'
              handleGetMovies={handleGetMovies}
              showMoreMovies={showMoreMovies}
              visibleMovies={visibleMovies}
              loggedIn={loggedIn}
              component={Movies}
              isSavedMoviesCard={false}
              checkLikeSaveMovie={checkLikeSaveMovie}
              onCardLike={onCardLike}
              moviesCard={checkbox ? filteredCheckboxMovies(searchMovies) : searchMovies}
              checkbox={checkbox}
              onCheckbox={onCheckbox}
              onCardDelete={onCardDelete}
              burgerOpen={isBurgerOpen}
              onBurger={handleBurgeClick}
              closeBurger={closeBurger}
              errorMessage={message}
              searchMoviesName={searchMoviesName}
            />
            <ProtectedRoute
              path='/saved-movies'
              loggedIn={loggedIn}
              component={SavedMovies}
              onCheckboxSaveMovies={onCheckboxSaveMovies}
              checkboxSaveMoviesCard={checkboxSaveMoviesCard}
              onCardDelete={onCardDelete}
              isSavedMoviesCard={true}
              moviesCard={checkboxSaveMoviesCard ? filteredCheckboxMovies(saveMoviesCard) : saveMoviesCard}
              burgerOpen={isBurgerOpen}
              onBurger={handleBurgeClick}
              closeBurger={closeBurger}
              handleGetSaveMovies={handleGetSaveMovies}
            />
            <ProtectedRoute
              path='/profile'
              handleUpdateUser={handleUpdateUser}
              signOut={signOut}
              component={Profile}
              loggedIn={loggedIn}
              burgerOpen={isBurgerOpen}
              onBurger={handleBurgeClick}
              closeBurger={closeBurger}
              errorMessage={message}
            />
            <Route path='/signin'>
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path='/signup'>
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path='*'>
              <PageNotFound />
            </Route>
          </Switch>
          <InfoTooltip name='infotooltip' onClose={closePopups} isOpen={isInfoTooltipPopupOpen} isRegister={isRegister}></InfoTooltip>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
