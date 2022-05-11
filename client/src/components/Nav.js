import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { searchPok, setLoading } from '../actions';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import imageLogo from '../assets/images/pokemon_logo_PNG9.png'
import SearchBox from './SearchBox';
import Footer from './Footer';
import { Outlet, Link } from 'react-router-dom';

export default function Nav() {
  let [input, setInput] = useState({ searchValue: '' });
  let dispatch = useDispatch();
  let navigateTo = useNavigate();
  let handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    
    
    
      dispatch(searchPok(input.searchValue));
    
    
    setInput({ searchValue: '' });
    dispatch(setLoading(true));

    navigateTo('search');
  }

  return (
    <>
      <header className='header'>
        <div className='logo'>

          <Link to='home'><img src={imageLogo} alt='logo' /></Link>
        </div>

      </header>
      <nav className='menu'>
        
        <SearchBox input={input} handleChange={handleChange} handleSubmit={handleSubmit} />
        <Link to='NewPokemon'><span className='button_newPok'><span style={{fontSize: "16px"}}> + </span>Create Pokemon</span></Link>
      </nav>

      <Outlet />

      <Footer />
    </>

  )
}
