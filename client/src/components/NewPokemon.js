import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newPokemon, getTypes } from '../actions';


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

      const [inputErr, setInputErr] = useState({
        nameVoid:false,
        nameNum:false,
        hp:false,
        attack: false,
        speed: false,
        defense:false,
        height:false,
        image:false,
        types:false
      } );


      useEffect(() => {
        if(!types.length){
          dispatch(getTypes());
          
        }
      },[dispatch]);
      
    
      const handleOnChange = (e) => {
          
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      };

      const handleOnChangeTypes = (e) => {
          
       
         let target = e.target;
        
         console.log(target.selectedOptions)
         let value = Array.from(target.selectedOptions, option => Number(option.value));
        
         setInput({
           ...input,
           types : value
         })

      };
    
      const handleOnSubmit = (e) => {
        e.preventDefault();
        
        dispatch(newPokemon(input));
        
        setInput(inputInicial)
      }

      const controlInput = (e) => {
        let target = e.target;
        if(target.name === 'name'){
            if(target.value === ''){

              setInputErr({
                ...inputErr,
                name: true
              });
              
            }
            if(!/^[a-zA-Z]*$/.test(target.value)){

              setInputErr({
                ...inputErr,
                nameNum: true
              });

            }
        }

      }

      const clearErr = (e) => {
        let target = e.target;
        if(target.name === 'name'){
            

              setInputErr({
                ...inputErr,
                name: false,
                nameNum: false
              });
              
            
        }

      }


      
  return (
    <div className='homeContent'>
       

        <form className='formPok' onSubmit={handleOnSubmit}>
        <label>Name</label>
        <input className={inputErr.name || inputErr.nameNum ? 'inputErr': null} name="name" value={input.name} onChange={handleOnChange} onBlur={controlInput} onFocus={clearErr}></input>
        {inputErr.name ? <p className='pmsgErr'>**El nombre es un campo requerido**</p> : null}
        {inputErr.nameNum ? <p className='pmsgErr'>**El nombre no debe contener numeros o espacios**</p> : null}
        <div className='featuresGrid'>
              <div className='featuresFlex'>
                  <label>Hp</label>
                  <input name="hp" value={input.hp} onChange={handleOnChange} className='features'></input>
                  
              </div>
              <div className='featuresFlex'>
              <label>Attack</label>
              <input name="attack" value={input.attack} onChange={handleOnChange} className='features'></input>
              </div>
              <div className='featuresFlex'>
              <label>Speed</label>
              <input name="speed" value={input.speed} onChange={handleOnChange} className='features'></input>
              </div>
              <div className='featuresFlex'> 
              <label>Defense</label>
              <input name="defense" value={input.defense} onChange={handleOnChange} className='features'></input>
              </div>
              <div className='featuresFlex'>
              <label>Height</label>
              <input name="height" value={input.height} onChange={handleOnChange} className='features'></input>
              </div>
              <div className='featuresFlex'>
              <label>Weight</label>
              <input name="weight" value={input.weight} onChange={handleOnChange} className='features'></input>
              </div>
        </div>
        <label>Image</label>
        <input name="image" value={input.image} onChange={handleOnChange}></input>
        <label>Types (only two)</label>
      
         <select  multiple={true} value={input.types} name='types' onChange={handleOnChangeTypes} id="selectType">
              
                {types && types.map( (t,index) => (
                  <option  key={index}  value={t.id}>{t.name}</option>
                ))}
              </select>      
        
        <button disabled={false}  type="submit">Add</button>
      </form>


        
    </div>
  )
}
