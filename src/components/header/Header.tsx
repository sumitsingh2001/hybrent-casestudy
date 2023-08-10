import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../routes/RoutePaths';

const Header = () => {
  return (
    <div className='header'>
      <nav className='nav'>
        <Link to={APP_ROUTES.HOME}>
          <div className='logo'>MEME's Beer</div>
        </Link>
        <div className='links'>
          <Link className='link' to={APP_ROUTES.HOME}>
            Home
          </Link>
          <Link className='link' to={APP_ROUTES.FAVORIOTS}>
            Fav's
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
