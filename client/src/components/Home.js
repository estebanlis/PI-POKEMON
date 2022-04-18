import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemones } from '../actions';
import CardPokes from './CardPokes';

export default function Home() {

   

    let pokes = useSelector(state => state.pokemones);
    let load = useSelector(state => state.loading);

    let dispatch = useDispatch();

    useEffect(() => {

        dispatch(getPokemones());

        
        
    },[]);// eslint-disable-line react-hooks/exhaustive-deps

    console.log(pokes)

   
  return (
      <>
      <div className="homeContent">
      

        {load? <p>Cargando..</p> : pokes && pokes.map(p => (
            <CardPokes key={p.id} id={p.id} name={p.name} image={p.image} types={p.type} />
        ))}
    </div>

      </>
    
  )
}
