import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./App.css";

function App() {
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleBurgeClick() {
    setBurgerOpen(true);
  }

  function closeBurger() {
    setBurgerOpen(false);
  }

  return (
    <div className='App'>
      <div className='page__container'>
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
          <Route exact path='/profile'>
            <Header
              loggedIn={loggedIn}
              burgerOpen={isBurgerOpen}
              onBurger={handleBurgeClick}
              closeBurger={closeBurger}
            />
            <Profile />
          </Route>
          <Route exact path='/signin'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <Register />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
