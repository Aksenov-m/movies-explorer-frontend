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
import InfoTooltipUpdateUser from "../InfoTooltipUpdateUser/InfoTooltipUpdateUser";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"; // импортируем HOC
import ProtectedRouteAuth from "../ProtectedRouteAuth/ProtectedRouteAuth";
import * as moviesAuth from "../../utils/MoviesAuth";
import mainApi from "../../utils/MainApi";
import * as moviesApi from "../../utils/MoviesApi";
import "./App.css";
import {
  MOVIE_TIME,
  SCREEN_SIZE_DESKTOP,
  SCREEN_SIZE_LAPTOP_FIRST,
  SCREEN_SIZE_LAPTOP,
  SCREEN_SIZE_MOBILE,
  SCREEN_SIZE_MOBILE_FIRST,
  MOVIES_12,
  MOVIES_8,
  MOVIES_5,
  MOVIES_3,
  MOVIES_2,
} from "../../config/config";

function App() {
  const [moviesCard, setMoviesCard] = useState([]);
  const [saveMoviesCard, setSaveMoviesCard] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState(3);
  const [message, setMessage] = useState("");
  // Стейт, отвечающий за данные текущего пользователя
  const [currentUser, setСurrentUser] = useState({});
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  // Стейт, который информирует пользователя об успешной (или не очень) регистрации
  const [isRegister, setIsRegister] = useState(false);
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const [isloader, setloader] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [isInfoTooltipUpdateUserPopupOpen, setisInfoTooltipUpdateUserPopupOpen] = useState(false);
  const [searchSaveMoviesName, setSearchSaveMoviesName] = useState("");
  const [searchMoviesName, setSearchMoviesName] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);
  const [searchSaveMovies, setSearchSaveMovies] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [checkboxSaveMovies, setCheckboxSaveMovies] = useState(false);

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
      setCheckboxSaveMovies(JSON.parse(localStorage.getItem("isCheckboxSaveFilter")));
      setSearchMovies(JSON.parse(localStorage.getItem("searcMovies")));
      setSearchMoviesName(localStorage.getItem("searcMoviesName"));
    }
    else if (localStorage.getItem("isCheckboxFilter" || "isCheckboxSaveFilter")) {
      setCheckbox(JSON.parse(localStorage.getItem("isCheckboxFilter")));
      setCheckboxSaveMovies(JSON.parse(localStorage.getItem("isCheckboxSaveFilter")));
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

        .then(([movies, user, saveMovies]) => {
          setMoviesCard(movies);
          setСurrentUser(user.data);
          const saveMoviesCard = saveMovies.data.filter((i) => i.owner === user.data._id);
          setSaveMoviesCard(saveMoviesCard);
          setSearchSaveMovies(saveMoviesCard);
        })
        .catch((err) => alert(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if ((size <= SCREEN_SIZE_DESKTOP) & (size > SCREEN_SIZE_LAPTOP)) {
      setVisibleMovies(MOVIES_12);
    } else if ((size < SCREEN_SIZE_LAPTOP) & (size > SCREEN_SIZE_MOBILE)) {
      setVisibleMovies(MOVIES_8);
    } else if ((size < SCREEN_SIZE_MOBILE) & (size > SCREEN_SIZE_MOBILE_FIRST)) {
      setVisibleMovies(MOVIES_5);
    } else {
      setVisibleMovies(MOVIES_12);
    }
  }, [size]);

  const showMoreMovies = () => {
    setTimeout(() => {
      if (size >= SCREEN_SIZE_DESKTOP) {
        setVisibleMovies((i) => i + MOVIES_3);
      } else if (size <= SCREEN_SIZE_LAPTOP_FIRST) {
        setVisibleMovies((i) => i + MOVIES_2);
      } else {
        setVisibleMovies((i) => i + MOVIES_3);
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
    setSearchSaveMoviesName(value);
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
        setSearchSaveMovies(filteredMovies);
      }
    }, 2500);
  }

  function filteredCheckboxMovies(array) {
    return array.filter((movie) => movie.duration <= MOVIE_TIME);
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
    if (!checkboxSaveMovies) {
      setCheckboxSaveMovies(true);
      localStorage.setItem("isCheckboxSaveFilter", JSON.stringify(!checkboxSaveMovies));
    }
    // тру
    else {
      setCheckboxSaveMovies(false);
      localStorage.setItem("isCheckboxSaveFilter", JSON.stringify(!checkboxSaveMovies));
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
    setisInfoTooltipUpdateUserPopupOpen(false);
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
      if (!res) {
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
    setSearchMoviesName("");
    setCheckboxSaveMovies(false);
    history.push("/");
  }

  function handleUpdateUser(name, email) {
    if (name !== currentUser.name || email !== currentUser.email) {
      mainApi
        .setUserInfo(name, email)
        .then((res) => {
          setСurrentUser(res.data);
          setMessage("");
          setIsUpdateUser(true);
          setisInfoTooltipUpdateUserPopupOpen(true);
        })
        .catch((res) => {
          setMessage(`${res === 409 ? "Пользователь с таким email уже существует." : "При обновлении профиля произошла ошибка."}`);
          setIsUpdateUser(false);
          setisInfoTooltipUpdateUserPopupOpen(true);
        });
    } else {
      setMessage("Данные не обновлены! Новые данные должны отличатся от текущих");
    }
  }

  // проверка состояния лайка (избранное)
  function checkLikeSaveMovie(movie) {
    return saveMoviesCard.some((i) => i.movieId === movie.id);
  }
 
  // сохранение фильма (лайк)
  function onCardLike(data) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = checkLikeSaveMovie(data);
    setloader(true);
    setTimeout(() => {
      if (!isLiked) {
        mainApi
          .saveMoviesCard(data, !isLiked)
          .then((res) => {
            const newSavedMovies = [res.data, ...saveMoviesCard];
            setSaveMoviesCard(newSavedMovies);
            setSearchSaveMovies(newSavedMovies);
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

  // удаление фильма
  function onCardDelete(movie) {
    // Отправляем запрос в API и получаем обновлённые данные без удалённой карточки
    mainApi
      .deleteCard(movie)
      .then(() => {
        const newState = saveMoviesCard.filter((cardDelete) => cardDelete._id !== movie._id);
        setSaveMoviesCard(newState);
        setSearchSaveMovies(newState);
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
              setMessage={setMessage}
              searchMoviesName={searchMoviesName}
            />
            <ProtectedRoute
              path='/saved-movies'
              loggedIn={loggedIn}
              component={SavedMovies}
              onCheckboxSaveMovies={onCheckboxSaveMovies}
              checkboxSaveMovies={checkboxSaveMovies}
              onCardDelete={onCardDelete}
              isSavedMoviesCard={true}
              moviesCard={checkboxSaveMovies ? filteredCheckboxMovies(searchSaveMovies) : searchSaveMovies}
              burgerOpen={isBurgerOpen}
              onBurger={handleBurgeClick}
              closeBurger={closeBurger}
              errorMessage={message}
              setMessage={setMessage}
              handleGetSaveMovies={handleGetSaveMovies}
              searchSaveMoviesName={searchSaveMoviesName}
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
              setMessage={setMessage}
            />
            <ProtectedRouteAuth path='/signin' loggedIn={loggedIn} component={Login} handleLogin={handleLogin} />
            <ProtectedRouteAuth path='/signup' loggedIn={loggedIn} component={Register} handleRegister={handleRegister} />
            <Route path='*'>
              <PageNotFound />
            </Route>
          </Switch>
          <InfoTooltip name='infotooltip' onClose={closePopups} isOpen={isInfoTooltipPopupOpen} isRegister={isRegister}></InfoTooltip>
          <InfoTooltipUpdateUser
            name='InfoTooltipUpdateUser'
            onClose={closePopups}
            isOpen={isInfoTooltipUpdateUserPopupOpen}
            isUpdateUser={isUpdateUser}
          ></InfoTooltipUpdateUser>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
