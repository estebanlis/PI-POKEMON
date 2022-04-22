
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setLoading } from '../actions';

import CardPokes from './CardPokes';

export default function SearchResult() {

    let pok = useSelector(state => state.searchResult);
    let load = useSelector(state => state.loading);
    let dispatch = useDispatch();

    
    if(!load)console.log(pok);
    console.log('Search Result load: ',load);

    
  return (
    <>
        <div className='homeContent'>

       {/*  {load? <p>Cargando..</p> : pok && pok.map(p => (
            <CardPokes key={p.id} id={p.id} name={p.name} image={p.image} types={p.type} />
        ))} */}

          {load? <p>Cargando..</p> : 
            <CardPokes key={pok.id} id={pok.id} name={pok.name} image={pok.image} types={pok.type} />
        } 

        </div>
    </>
  )
}
