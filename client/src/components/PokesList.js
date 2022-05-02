import React from 'react'
import { Link } from 'react-router-dom';
import CardPokes from './CardPokes';
import { setLoading } from '../actions';
import { useDispatch } from 'react-redux';

export default function PokesList({ pokes, load }) {

   let dispatch = useDispatch();


   return (
      <>
         <div className={load ? "homeContent" : "homeContent list"}>
            {load ? <div className="pokemonLoader"></div> : pokes && pokes.length ? pokes.map(p => (
               <Link to={`/pokemon/${p.id} `} key={p.id} onClick={() => { dispatch(setLoading(true)); window.scrollTo(0, 0); }} >
                  <CardPokes id={p.id} name={p.name} image={p.image} types={p.type} />
               </Link>))
               : <p>Not found pokemon</p>}
         </div>
      </>
   )
}

