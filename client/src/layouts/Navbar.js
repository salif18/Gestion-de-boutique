import React from 'react';
import image from '../images/logo.jpg'
const Navbar = () => {
    return (
        <header className='header'>
          <div className='header-left'>
          <img src={image} alt='' />
          <h1>FOOZO Cosmetics</h1>
          </div>
           
        </header>
    );
}

export default Navbar;
