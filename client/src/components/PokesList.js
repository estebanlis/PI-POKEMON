import React from 'react'
import { Link } from 'react-router-dom';
import CardPokes from './CardPokes';
import { setFlag, setLoading } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

export default function PokesList({ pokes, load, ixFirstPok }) {
   let flag = useSelector(state => state.flag);
   let dispatch = useDispatch();

   if(flag){
      setTimeout(() => {
         dispatch(setFlag(false));
      },555)
   }

   return (
      <>
         <div className={load ? "homeContent" : pokes.length > 1 ? "homeContent list" : "homeContent"}>
            {load ? <div className={ flag ? "loaderInicial pokemonLoader " : "pokemonLoader" }></div> : pokes && pokes.length ? pokes.map((p,index) => (
               <Link to={`/pokemon/${p.id}?index=${ixFirstPok + index} `} key={p.id} onClick={() => { dispatch(setLoading(true)); window.scrollTo(0, 0); }} >
                  <CardPokes id={p.id} name={p.name} image={p.image} types={p.type} />
               </Link>))
               : <p>Oops! Not found Pokemones.</p>}
         </div>
      </>
   )
}

