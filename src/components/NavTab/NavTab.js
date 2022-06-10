import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className='navtab__nenu'>
      <ul className='navtab__links'>
        <li>
          <a href='' className='navtab__link'>
            О проекте
          </a>
        </li>
        <li>
          <a href='' className='navtab__link'>
            Технологии
          </a>
        </li>
        <li>
          <a href='' target='_blank' className='navtab__link'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
