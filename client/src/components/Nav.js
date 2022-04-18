import React from 'react'
import '../index.css';
import imageLogo from '../assets/images/pokemon_logo_PNG9.png'
import SearchBox from './SearchBox';

export default function Nav() {
  return (
      <>
        <header className='header'>
      <div className='logo'>
          {/* <p  className='iniciales-logo'>PK</p> 
         <a href='#'> <h1></h1></a>*/}
        <img src={imageLogo} alt='logo'/>
      </div>
     
    </header>
     <nav className='menu'>

         <SearchBox />
     
      </nav>


      </>
    
  )
}
