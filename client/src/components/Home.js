import {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemones } from '../actions';
import CardPokes from './CardPokes';

export default function Home() {

  console.log('pase');
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

    const offset = 8;
    const totalPages = useRef(0);
     

    let dispatch = useDispatch();

    useEffect(() => {

        dispatch(getPokemones());
  
    },[]);

    //if(pokes) console.log(pokes.length);

    //if(!load) {pokesFront = pokes; console.log('pase')}

    const pokesView = () => {

      if(!load){
        let pokesFront = pokes;

        if(filters.PokApi) {

           pokesFront = pokesFront.filter( p => typeof p.id !== 'string' )

          if(pokesFront.length > 12 ){
            totalPages.current = Math.ceil(pokesFront.length/offset);
            return pokesFront.slice(currentPage.page,currentPage.page + offset)
          }else{
            return pokesFront;
          }
         
        }

        if(filters.PokLocales) {

           pokesFront = pokesFront.filter( p => typeof p.id === 'string' )

          if(pokesFront.length > offset ){
            totalPages.current = Math.ceil(pokesFront.length/offset);
            return pokesFront.slice(currentPage.page,currentPage.page + offset)
          }else{
            totalPages.current = Math.ceil(pokesFront.length/offset);
            return pokesFront;
          }
                   
        }
        if(pokesFront.length > offset){
          totalPages.current = Math.ceil(pokesFront.length/offset);
        
          return pokesFront.slice(currentPage.page,currentPage.page + offset)

        }
        return pokesFront;


      }
      


     }

     useEffect(() => {
     if(load) return;
     
      if(totalPages.current < 2) {
        setCurrentPage({
          index: 0,
          page : 0,
          btnNext : true,
          btnPrev: true
  
        })

      }else{

        setCurrentPage({
          index: 0,
          page : 0,
          btnNext : false,
          btnPrev: true
  
        })

      }
      
      
      },[filters]);


    const nextPage = () => {

     
       if(currentPage.index < totalPages.current - 2){
          setCurrentPage({...currentPage,
                          btnPrev: false, 
                          page : currentPage.page + offset,
                          index : currentPage.index + 1
                        });
                       
        }else{setCurrentPage({...currentPage,
                             btnNext : true,
                             page : currentPage.page + offset,
                             index: currentPage.index + 1
                            }); 
                           
                          } 
    }

    const prevPage = () => {
      
       if(currentPage.index > 1) {
        setCurrentPage({...currentPage, 
                           btnNext: false,
                           page : currentPage.page - offset,
                           index: currentPage.index - 1
                          }); 
                          
        }else{
          setCurrentPage({
                          ...currentPage,
                          index: currentPage.index - 1,
                          page : currentPage.page - offset,
                          btnPrev: true
          })
         
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
      

        {load? <p>Cargando..</p> : pokesView().length ? pokesView().map(p => (
            <CardPokes key={p.id} id={p.id} name={p.name} image={p.image} types={p.type} />
        )) : <p>Not fount pokemon</p>}
    </div>

      </>
    
  )
}
