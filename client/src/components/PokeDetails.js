import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import CardPokesDetails from './CadPokesDetails';
import { getPokById, clearPokDetail } from '../actions';

export default function PokeDetails() {
    let {id} = useParams();
    let load = useSelector(state => state.loading);
    let pok = useSelector(state => state.pokDetail);
    let dispatch = useDispatch();

    useEffect ( () => {

        dispatch(getPokById(id));
        return (() =>dispatch(clearPokDetail()));

    },[]);
  return (
    
    <>
        <div className='homeContent'>
        


     

          {load? <p>Cargando..</p> : 
            <CardPokesDetails key={pok.id} id={pok.id} name={pok.name} image={pok.image} types={pok.type}
            hp={pok.hp}  attack={pok.attack}  defense={pok.defense}  speed={pok.speed}  height={pok.height} weight={pok.weight}/>
        }   

        </div>
    </>
  )
}
