import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className='footer section page__footer'>
      <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <nav class='footer__menu'>
        <ul className='footer__list'>
          <li>
            <a className='footer__link' href='https://practicum.yandex.ru/'>
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a className='footer__link' href='https://github.com/Aksenov-m'>
              Github
            </a>
          </li>
          <li>
            <a className='footer__link' href='https://#'>
              Facebook
            </a>
          </li>
        </ul>
      </nav>
      <p className='footer__copyright'>&copy;2022</p>
    </footer>
  );
}

export default Footer;
