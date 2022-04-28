import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { searchPok, setLoading } from '../actions';
import { useNavigate } from 'react-router-dom';

export default function SearchBox() {

  let [input, setInput] = useState({searchValue:''}); 
  let dispatch = useDispatch();
  let navigateTo = useNavigate();
    let handleChange = (e) => {
      setInput({
        ...input,
        [e.target.name] : e.target.value
      });
    }

    let handleSubmit = (e) => {
      e.preventDefault();
      dispatch(searchPok(input.searchValue));
      setInput({searchValue:''});
      dispatch(setLoading(true));
      
      navigateTo('search');
    }

  return (
    <div className='boxSearch'>

      <form onSubmit={handleSubmit}>
          <input 
             type='search'
             name='searchValue'
             value={input.name}
             onChange={(e) => handleChange(e)} 
             placeholder='Name/Id'
             required>
            

          </input>
          <button className='button_find' type='submit'>Search</button>
      </form>
            
        </div>
  )
}
