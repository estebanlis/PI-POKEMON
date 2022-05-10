import React from 'react'
import { Link } from 'react-router-dom';
import CardPokes from './CardPokes';
import { setLoading } from '../actions';
import { useDispatch } from 'react-redux';

export default function PokesList({ pokes, load, ixFirstPok }) {

   let dispatch = useDispatch();


   return (
      <>
         <div className={load ? "homeContent" : pokes.length > 1 ? "homeContent list" : "homeContent"}>
            {load ? <div className="pokemonLoader"></div> : pokes && pokes.length ? pokes.map((p,index) => (
               <Link to={`/pokemon/${p.id}?index=${ixFirstPok + index} `} key={p.id} onClick={() => { dispatch(setLoading(true)); window.scrollTo(0, 0); }} >
                  <CardPokes id={p.id} name={p.name} image={p.image} types={p.type} />
               </Link>))
               : <p>Oops! Not found Pokemones.</p>}
         </div>
      </>
   )
}

