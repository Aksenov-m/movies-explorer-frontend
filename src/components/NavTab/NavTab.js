import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className='navtab__nenu'>
      <ul className='navtab__links'>
        <li className='about-me__item'>
          <a href='#about-project' className='navtab__link'>
            О проекте
          </a>
        </li>
        <li className='about-me__item'>
          <a href='#techs' className='navtab__link'>
            Технологии
          </a>
        </li>
        <li className='about-me__item'>
          <a href='#about-me' className='navtab__link'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
