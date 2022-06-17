import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className='portfolio section content__section'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <nav className='portfolio__content'>
        <ul className='portfolio__nenu'>
          <li className='portfolio__list'>
            <a href='https://github.com/Aksenov-m/how-to-learn' className='portfolio__link'>
              Статичный сайт
            </a>
            <p className='portfolio__arrow'>↗</p>
          </li>
          <li className='portfolio__list'>
            <a href='https://github.com/Aksenov-m/russian-travel' className='portfolio__link'>
              Адаптивный сайт
            </a>
            <p className='portfolio__arrow'>↗</p>
          </li>
          <li className='portfolio__list'>
            <a href='https://github.com/Aksenov-m/react-mesto-api-full' className='portfolio__link'>
              Одностраничное приложение
            </a>
            <p className='portfolio__arrow'>↗</p>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
