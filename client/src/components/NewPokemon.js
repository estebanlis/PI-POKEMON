import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newPokemon, getTypes,setMsgDb, getPokemones} from '../actions';


export default function NewPokemon() {

    

    let types = useSelector(state => state.typesPok);
    let msgFromDb = useSelector(state => state.msgDbOK);
    let msgFromDbF = useSelector(state => state.msgDbFail);
    let dispatch = useDispatch();

    

    

   
    const inputInicial = {
        name:'',
        hp:'',
        attack: '',
        speed: '',
        defense:'',
        height:'',
        weight:'',
        image:'',
        types:''
      }
      
      const [input, setInput] = useState(inputInicial);

      const [inputErr, setInputErr] = useState({
        name:false,
        hp:false,
        attack: false,
        speed: false,
        defense:false,
        height:false,
        weight:false,
        image:false,
        types:false
      } );


      useEffect(() => {
        if(!types.length){
          dispatch(getTypes());
          
        }

        return () => {dispatch(getPokemones()); dispatch(setMsgDb(false));}
      },[dispatch]);

      useEffect(() => {

        if(msgFromDb){setInput(inputInicial)}
        
      },[msgFromDb]);
      
    
    
      const handleOnChange = (e) => {
          
        setInput({
          ...input,
          [e.target.name]: e.target.value,
        });
      };

      const handleOnChangeTypes = (e) => {
          
       
         let target = e.target;
        
        
         let value = Array.from(target.selectedOptions, option => Number(option.value));
        
         setInput({
           ...input,
           types : value
         })

         if(value.length > 2){
            setInputErr({
                ...inputErr,
                types:  <p className='pmsgErr'>*Maximo dos tipos.</p>
              });
         }else{
            setInputErr({
                ...inputErr,
                types:  false
              });
         }

      };
    
      const handleOnSubmit = (e) => {
        e.preventDefault();

       
        if(!isInputValidate(inputErr)){

          dispatch(newPokemon(input));
        
        
        } 

        
        
        
      }

      const controlInput = (e) => {
        
        let target = e.target;
        if(target.value === ''){

           
            setInputErr({
              ...inputErr,
              [target.name]:  <p className='pmsgErr'>*Es un campo obligatorio.</p>
            });
            
          }
        if(target.name === 'name'){
          
            if(!/^[a-zA-Z]*$/.test(target.value)){

              setInputErr({
                ...inputErr,
                name: <p className='pmsgErr'>*Solo caracteres.</p>
              });

            }
        }
        if(target.name === 'hp'){
           
               if(!/^[0-9\b]*$/.test(target.value)){
  
                setInputErr({
                  ...inputErr,
                  [target.name]: <p className='pmsgErr'>*Solo numeros enteros.</p>
                });
  
              } 

        }

       

      }

      const clearErr = (e) => {
        let target = e.target;
        if(msgFromDb) {dispatch(setMsgDb(false))}     
              setInputErr({
                ...inputErr,
                [target.name]: false,
                
              });
         
        


      }

      const isInputValidate = (obj) => {
        let b = false;
        
        for (const property in obj) {
           if(obj[property]){ b= true}
          }
        for (const property in input) {
            if(property !== 'image' && property !== 'types' ) {
              console.log(property);
              if(input[property] === '') {b= true}
           }else{
             if(property === 'types'){
                if(input[property].length < 1) {b= true}
             }
           }  
         
      }
      return b ;
    }

     
     
      
  return (
    <div className='homeContent'>
       
       
        <form className='formPok' onSubmit={handleOnSubmit}>
        {msgFromDb ? <div className='smsgExito'><span>Pokemon creado exitosamente.</span></div> : null}
        
        {msgFromDbF ? <div className='smsgError'><span>No se pudo crear el Pokemon.</span></div> : null}
        
        <label>Name</label>
        <input autoFocus className={inputErr.name ? 'inputErr': null}  name="name" value={input.name} onChange={handleOnChange} onBlur={controlInput} onFocus={clearErr}></input>
         {inputErr.name ? inputErr.name : null} 
        
        <div className='featuresGrid'>
              <div className='featuresFlex'>
                  <label>Hp</label>
                  <input className={inputErr.hp ? 'inputErr features': 'features'} name="hp" value={input.hp} onChange={handleOnChange}  onBlur={controlInput} onFocus={clearErr}></input>
                  {inputErr.hp ? inputErr.hp : null}
                 
                  
              </div>
              <div className='featuresFlex'>
              <label>Attack</label>
              <input className={inputErr.attack ? 'inputErr features': 'features'} name="attack" value={input.attack} onChange={handleOnChange} onBlur={controlInput} onFocus={clearErr}></input>
              {inputErr.attack ? inputErr.attack : null}
              </div>
              <div className='featuresFlex'>
              <label>Speed</label>
              <input className={inputErr.speed ? 'inputErr features': 'features'} name="speed" value={input.speed} onChange={handleOnChange} onBlur={controlInput} onFocus={clearErr}></input>
              {inputErr.speed ? inputErr.speed : null}
              </div>
              <div className='featuresFlex'> 
              <label>Defense</label>
              <input className={inputErr.defense ? 'inputErr features': 'features'} name="defense" value={input.defense} onChange={handleOnChange} onBlur={controlInput} onFocus={clearErr}></input>
              {inputErr.defense ? inputErr.defense : null}
              </div>
              <div className='featuresFlex'>
              <label>Height</label>
              <input className={inputErr.height ? 'inputErr features': 'features'} name="height" value={input.height} onChange={handleOnChange} onBlur={controlInput} onFocus={clearErr}></input>
              {inputErr.height ? inputErr.height : null}
              </div>
              <div className='featuresFlex'>
              <label>Weight</label>
              <input className={inputErr.weight ? 'inputErr features': 'features'} name="weight" value={input.weight} onChange={handleOnChange} onBlur={controlInput} onFocus={clearErr}></input>
              {inputErr.weight ? inputErr.weight : null}
              </div>
        </div>
        <label>Image</label>
        <input name="image" value={input.image} onChange={handleOnChange}></input>
        <label>Types (only two)</label>
      
         <select  multiple={true} value={input.types} name='types' onChange={handleOnChangeTypes} id="selectType" >
              
                {types && types.map( (t,index) => (
                  <option  key={index}  value={t.id}>{t.name}</option>
                ))}
              </select>   

              {inputErr.types ? inputErr.types : null}           
        
        <button disabled={isInputValidate(inputErr)}  type="submit">Create</button>
      </form>


        
    </div>
  )
}
