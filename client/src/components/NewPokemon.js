import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newPokemon, getTypes, setMsgDb, getPokemones, setMsgDbName, setLoading } from '../actions';


export default function NewPokemon() {

  let load = useSelector(state => state.loading);
  let types = useSelector(state => state.typesPok);
  let msgFromDb = useSelector(state => state.msgDbOK);
  let msgFromDbF = useSelector(state => state.msgDbFail);
  let msgFromDbName = useSelector(state => state.msgDbName);

  let dispatch = useDispatch();

  const inputInicial = {
    name: '',
    hp: '',
    attack: '',
    speed: '',
    defense: '',
    height: '',
    weight: '',

    types: []
  }

  const [input, setInput] = useState(inputInicial);

  const [inputErr, setInputErr] = useState({
    name: false,
    hp: false,
    attack: false,
    speed: false,
    defense: false,
    height: false,
    weight: false,
    image: false,
    types: false
  });


  useEffect(() => {
    if (!types.length) {
      dispatch(getTypes());
      dispatch(setLoading(false))

    }
    dispatch(setLoading(false))

    return () => { dispatch(getPokemones()); dispatch(setMsgDb(false)); dispatch(setLoading(true)); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {

    if (msgFromDb) { setInput(inputInicial) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msgFromDb]);

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
      types: value
    })

    if (value.length > 2) {
      setInputErr({
        ...inputErr,
        types: <p className='pmsgErr'>*Max two types.</p>
      });
    } else {
      setInputErr({
        ...inputErr,
        types: false
      });
    }

  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!isInputValidate(inputErr)) {

      dispatch(setLoading(true));
      dispatch(newPokemon(input));
      
    }
  }

  const controlInput = (e) => {

    let target = e.target;
    if (target.value === '') {

      setInputErr({
        ...inputErr,
        [target.name]: <p className='pmsgErr'>*Is required.</p>
      });

    }
    if (target.name === 'name') {

      if (!/^[a-zA-Z]*$/.test(target.value)) {

        setInputErr({
          ...inputErr,
          name: <p className='pmsgErr'>*Only characters.</p>
        });

      }
    }
    if (target.name !== 'name') {

      if (!/^[0-9\b]*$/.test(target.value)) {

        setInputErr({
          ...inputErr,
          [target.name]: <p className='pmsgErr'>*Integer numbers only.</p>
        });

      }else {
        if(target.value < 0 ||  target.value > 200){

          setInputErr({
            ...inputErr,
            [target.name]: <p className='pmsgErr'>*Allowed range [0-200].</p>
          });

        }
      }
    }
  }

  const clearErr = (e) => {
    let target = e.target;
    if (msgFromDb) { dispatch(setMsgDb(false)) }
    if (msgFromDbName) { dispatch(setMsgDbName(false)) }
    setInputErr({
      ...inputErr,
      [target.name]: false,

    });
  }

  const isInputValidate = (obj) => {
    let b = false;

    for (const property in obj) {
      if (obj[property]) { b = true }
    }
    for (const property in input) {
      if (property !== 'image' && property !== 'types') {

        if (input[property] === '') { b = true }
      } else {
        if (property === 'types') {
          if (input[property].length < 1) { b = true }
        }
      }

    }
    return b;
  }
  
   
 

   const isValidUrlimg = (e) => {
    let target = e.target;
    if(target.value === '') return
    
    
    try {
      // eslint-disable-next-line no-unused-vars
      let url = new URL(target.value);
      
      
    } catch (error) {
      
      setInputErr({
        ...inputErr,
        image: <p className='pmsgErr'>*invalid url.</p>
      });
    }
    
  }
 
  return (
    <div className='homeContent'>

      <form className='formPok' onSubmit={handleOnSubmit}>
        {msgFromDb ? <div className='smsgExito'><span>Pokemon successfully created.</span></div> : null}

        {msgFromDbF ? <div className='smsgError'><span>Something wrong...</span></div> : null}

        {msgFromDbName ? <div className='smsgError'><span>Name already exist.</span></div> : null}

        <label>Name</label>
        <input autoFocus className={inputErr.name ? 'inputErr' : null} name="name" value={input.name} onChange={handleOnChange}
          onBlur={controlInput} onFocus={clearErr}></input>
        {inputErr.name ? inputErr.name : null}

        <div className='featuresGrid'>
          <div className='featuresFlex'>
            <label>Hp</label>
            <input className={inputErr.hp ? 'inputErr features' : 'features'} name="hp" value={input.hp} onChange={handleOnChange}
              onBlur={controlInput} onFocus={clearErr}></input>
            {inputErr.hp ? inputErr.hp : null}


          </div>
          <div className='featuresFlex'>
            <label>Attack</label>
            <input className={inputErr.attack ? 'inputErr features' : 'features'} name="attack" value={input.attack}
              onChange={handleOnChange} onBlur={controlInput} onFocus={clearErr}></input>
            {inputErr.attack ? inputErr.attack : null}
          </div>
          <div className='featuresFlex'>
            <label>Speed</label>
            <input className={inputErr.speed ? 'inputErr features' : 'features'} name="speed" value={input.speed}
              onChange={handleOnChange} onBlur={controlInput} onFocus={clearErr}></input>
            {inputErr.speed ? inputErr.speed : null}
          </div>
          <div className='featuresFlex'>
            <label>Defense</label>
            <input className={inputErr.defense ? 'inputErr features' : 'features'} name="defense" value={input.defense}
              onChange={handleOnChange} onBlur={controlInput} onFocus={clearErr}></input>
            {inputErr.defense ? inputErr.defense : null}
          </div>
          <div className='featuresFlex'>
            <label>Height</label>
            <input className={inputErr.height ? 'inputErr features' : 'features'} name="height" value={input.height}
              onChange={handleOnChange} onBlur={controlInput} onFocus={clearErr}></input>
            {inputErr.height ? inputErr.height : null}
          </div>
          <div className='featuresFlex'>
            <label>Weight</label>
            <input className={inputErr.weight ? 'inputErr features' : 'features'} name="weight" value={input.weight}
              onChange={handleOnChange} onBlur={controlInput} onFocus={clearErr}></input>
            {inputErr.weight ? inputErr.weight : null}
          </div>
        </div>
        <label>Image</label>
        <input className={inputErr.image ? 'inputErr' : null} name="image"  value={input.image} onChange={handleOnChange} 
        onBlur={isValidUrlimg} onFocus={clearErr}></input>
        {inputErr.image ? inputErr.image : null}
        <label>Types</label>

        <select multiple={true} value={input.types} name='types' onChange={handleOnChangeTypes} id="selectType" >

          {types && types.map((t, index) => (
            <option key={index} value={t.id}>{t.name}</option>
          ))}
        </select>
        {inputErr.types ? inputErr.types : null}

        <button disabled={isInputValidate(inputErr)} type="submit">{load ? <i className="loader --4"></i> : <span
          style={{ fontWeight: "bold", }}>Create</span>}</button>
      </form>

    </div>
  )
}
