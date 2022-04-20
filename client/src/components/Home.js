import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemones } from '../actions';
import CardPokes from './CardPokes';

export default function Home() {

   
    const [currentPage, setCurrentPage] = useState({
                                                    
                                                    index: 0,
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

    //let pokesFront = [];
    //let totalPages;
     

    let dispatch = useDispatch();

    useEffect(() => {

        dispatch(getPokemones());
  
    },[]);

    //if(pokes) console.log(pokes.length);

    //if(!load) {pokesFront = pokes; console.log('pase')}

    const pokesView = () => {
      
      if(!load){

        if(filters.PokApi) {

          const pokesFront = pokes.filter( p => typeof p.id !== 'string' )
          if(pokesFront.length > 12){
          
            const totalPages = Math.ceil(pokesFront.length/12);
            
         
           return pokesFront.slice(currentPage.page,currentPage.page + 12)
          
        }else{
          return pokesFront;
        }
      }

        if(filters.PokLocales) {

          const pokesFront = pokes.filter( p => typeof p.id === 'string' )
          if(pokesFront.length > 12){
          
            const totalPages = Math.ceil(pokesFront.length/12);
            
         
           return pokesFront.slice(currentPage.page,currentPage.page + 12)
          
        }else{
          return pokesFront;
        }

        }

        

      }
     
    }

    const nextPage = () => {
      if(currentPage.index < totalPages - 2){
          setCurrentPage({...currentPage,
                          btnPrev: false, 
                          page : currentPage.page + 12,
                          index : currentPage.index + 1
                        });
                        console.log(currentPage);
    }else{setCurrentPage({...currentPage,
                             btnNext : true,
                             page : currentPage.page + 12,
                             index: currentPage.index + 1
                            }); 
                            console.log(currentPage);
                          }
    }

    const prevPage = () => {
      
      if(currentPage.index > 1) {
        setCurrentPage({...currentPage, 
                           btnNext: false,
                           page : currentPage.page - 12,
                           index: currentPage.index - 1
                          }); 
                          console.log(currentPage);
        }else{
          setCurrentPage({
                          ...currentPage,
                          index: currentPage.index - 1,
                          page : currentPage.page - 12,
                          btnPrev: true
          })
          console.log(currentPage);
        }
      
     
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
      

        {load? <p>Cargando..</p> : pokesView().map(p => (
            <CardPokes key={p.id} id={p.id} name={p.name} image={p.image} types={p.type} />
        ))}
    </div>

      </>
    
  )
}
