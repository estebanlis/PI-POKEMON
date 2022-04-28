import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemones, getTypes, filter,pagePok, setLoading } from '../actions';
import CardPokes from './CardPokes';
import Pagination from './Pagination';
import PokesList from './PokesList';
import SetFilters from './SetFilters';
import Filters from './Filters';



export default function Home() {

    
    let pokes = useSelector(state => state.pokTemp);
    let load = useSelector(state => state.loading);
    let types = useSelector(state => state.typesPok);
    

    const [currentPage, setCurrentPage] = useState(1);
    const [pokPerPage]=useState(10);
    const [filters, setFilters] = useState({
      PokLocales : false,
      PokApi : false,
      Todos: true,
      TypePok:'todos',
      orderAZ: false,
      orderZA: false,
      orderUpAttack: false,
      orderDownAttack: false
     });

    const ixLastPok = currentPage * pokPerPage;
    const ixFirstPok = ixLastPok - pokPerPage;
    const currentPokes = pokes.slice(ixFirstPok,ixLastPok);

    const paginate = (pageNumber) => {setCurrentPage(pageNumber);}

    let dispatch = useDispatch();


    useEffect(() => {
            if(!pokes.length){
              dispatch(getTypes());
              dispatch(getPokemones());
            }
    },[dispatch]);

        
   
  return (
    <>
      <div className='paginado'>
        <Pagination pokPerPage={pokPerPage} totalPok={pokes.length} paginate={paginate} ixCurrent={currentPage} />
        <SetFilters types={types} filters={filters} setFilters={setFilters} />
      </div>
      <PokesList pokes={pokes} load={load} />



    </>
    
  )
}
