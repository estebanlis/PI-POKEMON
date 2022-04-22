import {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemones, getTypes } from '../actions';
import CardPokes from './CardPokes';


export default function Home() {

    console.log('pase home')
    let pokes = useSelector(state => state.pokemones);

    let load = useSelector(state => state.loading);
    let types = useSelector(state => state.typesPok);

    

    
    const [currentPage, setCurrentPage] = useState({
                                                    
                                                    index: 0,
                                                    page : 0,
                                                    btnNext : false,
                                                    btnPrev: true
                                                  });

    

    const [filters, setFilters] = useState({
                                            PokLocales : false,
                                            PokApi : false,
                                            todos: true,
                                            TypePok:'',
                                            AZ: false,
                                            ZA: false
                                           });

    const offset = 12;
    const totalPages = useRef(0);
     

    let dispatch = useDispatch();

    useEffect(() => {
      if(!pokes.length){
        dispatch(getTypes());
        dispatch(getPokemones());
      }
        
        
        
       
  
    },[dispatch]);

    

   

    const pokesView = () => {

      
        let pokesFront = pokes;

        if(filters.PokApi) {

                             pokesFront = pokesFront.filter( p => typeof p.id !== 'string' );

                             if(filters.TypePok !== ''){
                                              pokesFront = pokesFront.filter(p => {
                                              if(p.type.find( t => t === filters.TypePok )) return p;
                                              })
                                              
                              }

                              if(filters.AZ){
                                pokesFront = pokesFront.sort(SortArray);
                              }
                              
                              if(filters.ZA){
                                pokesFront = pokesFront.reverse(SortArray);
                              }
                              

                              if(pokesFront.length > offset ){
                                              totalPages.current = Math.ceil(pokesFront.length/offset);
                                              return pokesFront.slice(currentPage.page,currentPage.page + offset)
                              }else{
                                    totalPages.current = 1;
                                    return pokesFront;
                              }
         }

        if(filters.PokLocales) {

                              pokesFront = pokesFront.filter( p => typeof p.id === 'string' )

                              if(filters.TypePok !== ''){
                                            pokesFront = pokesFront.filter(p => {
                                            if(p.type.find( t => t === filters.TypePok )) return p;
                                            })
                                           

                              }

                              if(filters.AZ){
                                pokesFront = pokesFront.sort(SortArray);
                              }
                              
                              if(filters.ZA){
                                pokesFront = pokesFront.reverse(SortArray);
                              }

                              if(pokesFront.length > offset ){
                                            totalPages.current = Math.ceil(pokesFront.length/offset);
                                            return pokesFront.slice(currentPage.page,currentPage.page + offset)
                              }else{
                                      
                                      return pokesFront;
                              }
         }

        if(filters.TypePok !== ''){
                              pokesFront = pokesFront.filter(p => {
                              if(p.type.find( t => t === filters.TypePok )) return p;
                              })
                             

          }
          
          if(filters.AZ){
            pokesFront = pokesFront.sort(SortArray);
            console.log('pase todo AZ')
          }
          
          if(filters.ZA){
            pokesFront = pokesFront.reverse(SortArray);
            console.log(pokesFront)
            console.log('pase todo ZA')
          }

        if(pokesFront.length > offset){
          totalPages.current = Math.ceil(pokesFront.length/offset);
          
          return pokesFront.slice(currentPage.page,currentPage.page + offset)

          

        }
        totalPages.current = 1;
        
        return pokesFront;


      }
      


     

     useEffect(() => {
     if(load ) return;

     
     
      if(totalPages.current < 2) {
        setCurrentPage({
          index: 0,
          page : 0,
          btnNext : true,
          btnPrev: true
  
        });
        

      }else{

        setCurrentPage({
          index: 0,
          page : 0,
          btnNext : false,
          btnPrev: true
  
        });
        

      }
      
      
      },[filters,load]);


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

    const handleFilters = event =>{

      
      
      if(event.target.name === 'TypePok'){
        return setFilters({
                        ...filters,
                        TypePok : event.target.value,
                                     
        });
      }

      if(event.target.value === 'PokApi'){
        return setFilters({
                        TypePok:'',
                        [event.target.value] : event.target.checked,
                        todos: false,
                        PokLocales: false                
        });
      }

      if(event.target.value === 'AZ'){
        return setFilters({
                        ...filters,
                        [event.target.value] : event.target.checked,
                        ZA: false
                                    
        });
      }

      if(event.target.value === 'ZA'){
        return setFilters({
                        ...filters,
                        [event.target.value] : event.target.checked,
                        AZ: false
                                    
        });
      }

      if(event.target.value === 'PokLocales'){
        return setFilters({
                        TypePok:'',
                        [event.target.value] : event.target.checked,
                        todos: false,
                        PokApi: false                
        });
      }
      
      return setFilters({
        TypePok:'',
        [event.target.value] : event.target.checked,
        PokLocales: false,
        PokApi: false                
});
      
      
    }

  const  SortArray = (x, y) => {
      return x.name.localeCompare(y.name);
  }
   
  return (
      <>
      <div className='paginado'>
        <div>
            <button onClick={prevPage} disabled ={currentPage.btnPrev}>Anterior</button>
            <button onClick={nextPage} disabled ={currentPage.btnNext}>Siguiente</button> 
        </div>
        <div className='filters'>
              <span>Todos <input onChange={handleFilters} type='checkbox' name='filters' value='todos' checked={filters.todos}/></span>
              <span>API <input onChange={handleFilters} type='checkbox' name='filters' value='PokApi'checked={filters.PokApi}/></span>
              <span>Local <input onChange={handleFilters} type='checkbox' name='filters' value='PokLocales' checked={filters.PokLocales}/></span>
              <span>A-Z <input onChange={handleFilters} type='checkbox' name='filters' value='AZ' checked={filters.AZ}/></span>
              <span>Z-A <input onChange={handleFilters} type='checkbox' name='filters' value='ZA' checked={filters.ZA}/></span>
              <select  value={filters.TypePok} name='TypePok' onChange={handleFilters} id="selectType">
              <option  value='' >Tipos</option>
                {types && types.map( (t,index) => (
                  <option  key={index}  value={t.name}>{t.name}</option>
                ))}
                
                
              </select>

        </div>
      
      
      </div>
      
      <div className="homeContent">
      

        {load? <p>Cargando..</p> : pokes && pokesView().length ? pokesView().map(p => (
            <CardPokes key={p.id} id={p.id} name={p.name} image={p.image} types={p.type} />
        )) : <p>Not found pokemon</p>}
    </div>

      </>
    
  )
}
