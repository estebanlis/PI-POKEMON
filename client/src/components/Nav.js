import React from 'react'
import '../index.css';
import imageLogo from '../assets/images/pokemon_logo_PNG9.png'
import SearchBox from './SearchBox';
import Footer from './Footer';
import { Outlet, Link } from 'react-router-dom';

export default function Nav() {
  return (
      <>
        <header className='header'>
          <div className='logo'>
         
            <Link to='home'><img src={imageLogo} alt='logo'/></Link>
          </div>
     
         </header>
        <nav className='menu'>

           <SearchBox/>
           <Link to='NewPokemon'><span>Crear Pokemon</span></Link>
     
        </nav>
         
         <Outlet/>

         <Footer/>
      </>
    
  )
}
