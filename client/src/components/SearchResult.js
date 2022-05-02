import {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { setLoading,setMsgDbFail } from '../actions';
import { Link } from 'react-router-dom';


import CardPokes from './CardPokes';

export default function SearchResult() {

    let pok = useSelector(state => state.searchResult);
    let load = useSelector(state => state.loading);
    let msgFromDb = useSelector(state => state.msgDbFail);
    let dispatch = useDispatch();

    useEffect(() => {
     

      return () => dispatch(setMsgDbFail(false));
    },[dispatch]);

    
    
    
    
  return (
    <>
        <div className='homeContent'>

       

          {load? <div className="pokemonLoader"></div> : <Link to={`/pokemon/${pok.id} `} style={msgFromDb ?{pointerEvents: "none"} :null } onClick={()=>{dispatch(setLoading(true))}}><CardPokes key={pok.id} id={pok.id} name={pok.name} image={pok.image} types={pok.type} msg={msgFromDb} /></Link>
        }

        <Link to='/home'><span style={{fontWeight: "600"}}>Back</span></Link>  

        </div>
    </>
  )
}
