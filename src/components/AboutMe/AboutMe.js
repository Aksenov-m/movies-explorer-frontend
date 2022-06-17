import React from "react";
import foto from "../../images/foto.jpeg";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section id='about-me' className='about-me section content__section'>
      <div className='about'>
        <h2 className='title'>Студент</h2>
      </div>
      <img className='about-me__foto' src={foto} alt='Фото студента.'></img>
      <article>
        <h2 className='about-me__title'>Михаил</h2>
        <h3 className='about-me__subtitle'>Фронтенд-разработчик, 34 года</h3>
        <p className='about-me__paragraph'>
          Я родился и живу в Московской области, закончил факультет ПГС университета МГСУ. У меня есть жена и две дочки.
          Я увлекаюсь футболом, сноубордом. Недавно начал кодить. С 2015 года работаю в компании «ГОРПРОЕКТ».
        </p>
      </article>
      <nav>
        <ul className='about-me__nenu'>
          <li className='about-me__list'>
            <a href='https://#' className='about-me__link'>
              Facebook
            </a>
          </li>
          <li className='about-me__list'>
            <a href='https://github.com/Aksenov-m' className='about-me__link'>
              Github
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default AboutMe;
