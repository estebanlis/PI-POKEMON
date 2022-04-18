import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemones } from '../actions';
import CardPokes from './CardPokes';

export default function Home() {

   
    const [currentPage, setCurrentPage] = useState({
                                                    page : 0,
                                                    btnNext : false,
                                                    btnPrev: true
    });
    let pokes = useSelector(state => state.pokemones);
    let load = useSelector(state => state.loading);
    const [filters, setFilters] = useState({
                                                        PokLocales : false,
                                                        PokApi : false,
                                                        todos: true

                                                 });
    let pokesFront = [];
     

    let dispatch = useDispatch();

    useEffect(() => {

        dispatch(getPokemones());

        
        
    },[]);

    //if(pokes) console.log(pokes.length);

    if(!load) pokesFront = pokes;

    const pokesView = () => {
      
      if(!load){

        //let pokesFront = pokes;

        //console.log(pokesFront);

        if(filters.PokApi) {

          pokesFront = pokesFront.filter( p => typeof p.id !== 'string' )

        }

        if(filters.PokLocales) {

          pokesFront = pokesFront.filter( p => typeof p.id === 'string' )

        }

        if(pokesFront.length > 12){
          //console.log('currentPage: ',currentPage)
          return pokesFront.slice(currentPage.page,currentPage.page + 12);
        }else{
          return pokesFront;
        }

      }
     
    }

    const prevPage = () => {
      if(currentPage.page >=12){
          setCurrentPage({...currentPage, 
                          page : currentPage.page - 12
                        });

    }else{setCurrentPage({...currentPage, btnPrev : true}); }
    }

    const nextPage = () => {
      console.log('length pokesFront: ',pokesFront.length);
      console.log('length pokesView: ',pokesView().length);
      console.log('currentPage fnext in: ',currentPage)
      if(currentPage.page < pokesFront.length) {setCurrentPage({...currentPage, 
        btnPrev: false,
        page : currentPage.page + 12}); console.log('currentPage fnext out: ',currentPage)}
      
     
    }

    const handleCheckbox = event =>{

      if(event.target.value === 'PokApi'){
        return setFilters({[event.target.value] : event.target.checked,
                        todos: false,
                        PokLocales: false                
        });
      }

      if(event.target.value === 'PokLocales'){
        return setFilters({[event.target.value] : event.target.checked,
                        todos: false,
                        PokApi: false                
        });
      }
      
      setFilters({[event.target.value] : event.target.checked,
        PokLocales: false,
        PokApi: false                
});
      
      console.log(filters);
    }

   
  return (
      <>
      <div className='paginado'>
        <div>
            <button onClick={prevPage} disabled ={currentPage.btnPrev}>Anterior</button>
            <button onClick={nextPage} disabled ={currentPage.btnNext}>Siguiente</button> 
        </div>
        <div>
              Todos <input onChange={handleCheckbox} type='checkbox' name='filters' value='todos' checked={filters.todos}/>
              Pkemones API <input onChange={handleCheckbox} type='checkbox' name='filters' value='PokApi'checked={filters.PokApi}/>
              Pkemones Locales <input onChange={handleCheckbox} type='checkbox' name='filters' value='PokLocales' checked={filters.PokLocales}/>

        </div>
      
      
      </div>
      
      <div className="homeContent">
      

        {load? <p>Cargando..</p> : pokesView() && pokesView().map(p => (
            <CardPokes key={p.id} id={p.id} name={p.name} image={p.image} types={p.type} />
        ))}
    </div>

      </>
    
  )
}
