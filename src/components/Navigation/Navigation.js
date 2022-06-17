import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = (props) => {
  return (
    <div className={`navigation ${props.burgerOpen ? "navigation__burger_opened" : ""}`}>
      <button
        className='navigation__close-button link'
        type='button'
        aria-label='closeNavigation'
        onClick={props.closeBurger}
      ></button>
      <nav>
        <ul className='navigation__nenu'>
          <li className='navigation__list'>
            <NavLink
              exact={true}
              to='/'
              className='navigation__link link'
              activeClassName='navigation__link_active'
              onClick={props.closeBurger}
            >
              Главная
            </NavLink>
          </li>
          <li className='navigation__list'>
            <NavLink
              to='/movies'
              className='navigation__link link'
              activeClassName='navigation__link_active'
              onClick={props.closeBurger}
            >
              Фильмы
            </NavLink>
          </li>
          <li className='navigation__list'>
            <NavLink
              to='/saved-movies'
              className='navigation__link link'
              activeClassName='navigation__link_active'
              onClick={props.closeBurger}
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <li className='navigation__list'>
            <NavLink to='/profile' className='navigation__link link_type_to-profile link' onClick={props.closeBurger}>
              Аккаунт
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
