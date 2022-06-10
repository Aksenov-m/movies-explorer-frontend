import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className='about-project section content__section'>
      <div className='about'>
        <h2 className='title'>О проекте</h2>
      </div>
      <div className='about-project__info'>
        <article>
          <h2 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h2>
          <p className='about-project__paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </article>
        <article>
          <h2 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h2>
          <p className='about-project__paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </div>
      <div className='about-project__time'>
        <div className='about-project__term about-project__term_color_green'>
          <span className='about-project__scale about-project__scale_color_green'>1 неделя</span>
          <span className='about-project__description'>Back-end</span>
        </div>
        <div className='about-project__term'>
          <span className='about-project__scale'>4 недели</span>
          <span className='about-project__description'>Front-end</span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
