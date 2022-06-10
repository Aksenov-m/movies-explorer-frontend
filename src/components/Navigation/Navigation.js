import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <div className='navigation'>
      <span></span>
      <nav className='navigation__nenu'>
        <ul className='navigation__list'>
          <li className='navigation__list'>
            <Link to='/signup' className='navigation__link'></Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
