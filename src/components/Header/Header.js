import React from 'react'
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import './Header.css'

function Header() {
    return (
        <header className='header section page__header'>
            <img className='header__logo' src={logo} alt='Логотип.' />
            <div className='header__info'>
                <Link className='header__text link' to='/signup'>
                    Регистрация
                </Link>
                <Link className='header__text header__text_type_signin link' to='/signin'>
                    Войти
                </Link>
            </div>
        </header>
    );
};

export default Header