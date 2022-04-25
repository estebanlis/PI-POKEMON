import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newPokemon } from '../actions';

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
        types:''
      }
      const [input, setInput] = React.useState(  inputInicial);
    
      const handleOnChange = (e) => {
          if(e.target.name === 'types'){
              setInput({
                  ...input,
                  types: Array.from(new Set([...input.types, e.target.value]))
              })
          }
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleOnSubmit = (e) => {
        e.preventDefault();
        
        dispatch(newPokemon(input));
        
        setInput(inputInicial)
      }
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
       {/*  <input name="types" value={input.types} onChange={handleOnChange}></input> */}
        <select  value={input.types} name='types' onChange={handleOnChange} id="selectType">
              <option  value='todos' >Tipos</option>
                {types && types.map( (t,index) => (
                  <option  key={index}  value={t.id}>{t.name}</option>
                ))}
              </select>       
        <button type="submit">Add</button>
      </form>
        
        
    </div>
  )
}
/* "name": "lucia",
                "hp": 5,
                "attack": 2,
                "defense" : 66,
                "speed": 80,
                "height" : 52,
                "weight": 30,
                "image": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
                "types": [5,6] */