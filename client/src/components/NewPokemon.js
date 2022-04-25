import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newPokemon } from '../actions';
import Select from 'react-select'

export default function NewPokemon() {

    let types = useSelector(state => state.typesPok);
    let dispatch = useDispatch();

    const inputInicial = {
        name:'',
        hp:'',
        attack: '',
        speed: '',
        defense:'',
        height:'',
        image:'',
        types:[]
      }
      const [input, setInput] = useState(  inputInicial);
      
    
      const handleOnChange = (e) => {
          
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      };

      const handleOnChangeTypes = (value) => {
          
       
          console.log(value.map(p => p.value));   

          setInput({
            ...input,
            types: value.map(p => p.value)
          });

      };
    
      const handleOnSubmit = (e) => {
        e.preventDefault();
        
        dispatch(newPokemon(input));
        
        setInput(inputInicial)
      }

      const options = types && types.map( (p) => ({value:p.id, label:p.name}));

      console.log(options);

      
  return (
    <div className='homeContent'>
       

        <form className='formPok' onSubmit={handleOnSubmit}>
        <label>Name</label>
        <input name="name" value={input.name} onChange={handleOnChange}></input>
        <label>hp</label>
        <input name="hp" value={input.hp} onChange={handleOnChange}></input>
        <label>attack</label>
        <input name="attack" value={input.attack} onChange={handleOnChange}></input>
        <label>speed</label>
        <input name="speed" value={input.speed} onChange={handleOnChange}></input>
        <label>defense</label>
        <input name="defense" value={input.defense} onChange={handleOnChange}></input>
        <label>height</label>
        <input name="height" value={input.height} onChange={handleOnChange}></input>
        <label>weight</label>
        <input name="weight" value={input.weight} onChange={handleOnChange}></input>
        <label>image</label>
        <input name="image" value={input.image} onChange={handleOnChange}></input>
        <label>types</label>
      
        {/* <select  multiple value={input.types} name='types' onChange={handleOnChange} id="selectType">
              <option  value='todos' >Tipos</option>
                {types && types.map( (t,index) => (
                  <option  key={index}  value={t.id}>{t.name}</option>
                ))}
              </select>      */}  
         <div >
          {types?.map((type) => {
            return (
              <div  key={type.id}>
                <input
                  
                  type="checkbox"
                  name="types"
                 
                  
                />
                <label>{type.name}</label>
              </div>
            );
          })}
        </div>
        <button type="submit">Add</button>
      </form>


        
    </div>
  )
}
