import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemones, getTypes, setLoading } from '../actions';
import Pagination from './Pagination';
import PokesList from './PokesList';
import SetFilters from './SetFilters';
import {Filters} from './Filters';



export default function Home() {

    
    let pokes = useSelector(state => state.pokTemp);
    let load = useSelector(state => state.loading);
    let types = useSelector(state => state.typesPok);
    

    const [currentPage, setCurrentPage] = useState(1);
    const [pokPerPage]=useState(12);
    const [filters, setFilters] = useState({
      TypePok:'todos',
      orderAZ: false,
      orderZA: false,
      orderUpAttack: false,
      orderDownAttack: false
     });
     const [fsource, setFsource] = useState({
      PokLocales : false,
      PokApi : false,
      Todos: true,

     })

    const pokesFiltered = Filters(pokes, filters,fsource);

    const ixLastPok = currentPage * pokPerPage;
    const ixFirstPok = ixLastPok - pokPerPage;
    const currentPokes = pokesFiltered && pokesFiltered.slice(ixFirstPok,ixLastPok);

    const paginate = (pageNumber) => {setCurrentPage(pageNumber);}

    let dispatch = useDispatch();


    useEffect(() => {
      
            if(!pokes.length){
              console.log('pase');
              dispatch(getTypes());
              dispatch(getPokemones());
            }else{
              dispatch(setLoading(false))
            }
    },[dispatch]);

    useEffect(() => {
      
      setCurrentPage(1);
      setFilters({
        TypePok:'todos',
        orderAZ: false,
        orderZA: false,
        orderUpAttack: false,
        orderDownAttack: false
       });
      
},[fsource]);

    

        
   
  return (
    <>
      {load ? null :

        <div className='paginado'>
          <Pagination pokPerPage={pokPerPage} totalPok={pokesFiltered.length} paginate={paginate} ixCurrent={currentPage} />
          <SetFilters types={types} filters={filters} setFilters={setFilters} fsource={fsource} setFsource={setFsource} />
        </div>

      }

      <PokesList pokes={currentPokes} load={load} />



    </>
    
  )
}
