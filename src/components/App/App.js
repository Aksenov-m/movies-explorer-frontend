import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
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
// import moviesApi from "../../utils/MoviesApi";

import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  // Стейт, отвечающий за данные текущего пользователя
  const [currentUser, setСurrentUser] = useState({});
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  // Стейт, который информирует пользователя об успешной (или не очень) регистрации
  const [isRegister, setIsRegister] = useState(false);
  const [isloader, setloader] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  // const [userData, setUserData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  const [size, setSize] = useState(window.innerWidth);

  const history = useHistory();
  useEffect(() => tokenCheck(), []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     history.push("/movies");
  //   }
  // }, [loggedIn]);

  const handlResize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    handlResize();
    window.addEventListener("resize", handlResize);
    return () => window.removeEventListener("resize", handlResize);
  }, []);

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

  function signOut() {
    localStorage.clear();
    setСurrentUser({});
    setLoggedIn(false);
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
      .catch((res) =>
        setMessage(
          `${
            res === 409
              ? "Пользователь с таким email уже существует."
              : "При регистрации пользователя произошла ошибка."
          }`
        )
      )
      .finally(() => {
        setloader(false);
      });
  }

  useEffect(() => {
    if (loggedIn) {
      debugger;
      // history.push("/movies");
      // api
      //   .getInitialCards()
      //   .then((cards) => {
      //     setCards(cards.data);
      //   })
      //   .catch((err) => alert(err));
      mainApi
        .getUserInfo()
        .then((user) => {
          setСurrentUser(user.data);
        })
        .catch((err) => alert(err));
    }
  }, [loggedIn]);

  return (
    <div className='App'>
      <Header loggedIn={loggedIn} burgerOpen={isBurgerOpen} onBurger={handleBurgeClick} closeBurger={closeBurger} />
      <CurrentUserContext.Provider value={currentUser}>
        <div className='page__container'>
          <Preloader isOpen={isloader} />
          <Switch>
            <Route exact path='/'>
              <Header
                loggedIn={loggedIn}
                burgerOpen={isBurgerOpen}
                onBurger={handleBurgeClick}
                closeBurger={closeBurger}
              />
              <Main />
              <Footer />
            </Route>
            <Route path='/movies'>
              <Header
                loggedIn={loggedIn}
                burgerOpen={isBurgerOpen}
                onBurger={handleBurgeClick}
                closeBurger={closeBurger}
              />
              <Movies />
              <Footer />
            </Route>
            <Route exact path='/saved-movies'>
              <Header
                loggedIn={loggedIn}
                burgerOpen={isBurgerOpen}
                onBurger={handleBurgeClick}
                closeBurger={closeBurger}
              />
              <SavedMovies />
              <Footer />
            </Route>
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
          <InfoTooltip
            name='infotooltip'
            onClose={closePopups}
            isOpen={isInfoTooltipPopupOpen}
            isRegister={isRegister}
          ></InfoTooltip>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
