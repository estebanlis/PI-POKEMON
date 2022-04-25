

import { useDispatch, useSelector} from 'react-redux';
import { setLoading } from '../actions';
import { Link } from 'react-router-dom';


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

       

          {load? <p>Cargando..</p> : 
            <Link to={`/pokemon/${pok.id} `} onClick={()=>{dispatch(setLoading(true))}}><CardPokes key={pok.id} id={pok.id} name={pok.name} image={pok.image} types={pok.type} /></Link>
        } 

        </div>
    </>
  )
}
