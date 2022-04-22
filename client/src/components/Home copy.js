import {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPokemones, getTypes } from '../actions';
import CardPokes from './CardPokes';



export default function Home() {

    
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
                                            Todos: true,
                                            TypePok:'todos',
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

   

    const pokesView = () => {

      
        let pokesFront = pokes;

        if(filters.PokApi) {

                             pokesFront = pokesFront.filter( p => typeof p.id !== 'string' );

                             if(filters.TypePok !== 'todos'){
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

                              if(filters.TypePok !== 'todos'){
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

         if(filters.Todos){

                  if(filters.TypePok !== 'todos'){

                    pokesFront = pokesFront.filter(p => {
                    if(p.type.find( t => t === filters.TypePok )) return p;
                    })
                  }

                  if(filters.ZA){
                    pokesFront = pokesFront.reverse(SortArray);
                  }

                  if(filters.AZ){
                    pokesFront = pokesFront.sort(SortArray);
                  }

                  if(pokesFront.length > offset){
                    totalPages.current = Math.ceil(pokesFront.length/offset);

                    return pokesFront.slice(currentPage.page,currentPage.page + offset)
                  }

                  totalPages.current = 1;
                  return pokesFront;
              }
         
         return pokesFront;     
              

      } 

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
                                
                                TypePok:'todos',
                                PokApi : event.target.checked,
                                Todos: false,
                                PokLocales: false,
                                ZA: false,
                                AZ: false,

                }); 

                
              }

              if(event.target.value === 'PokLocales'){
                return setFilters({
                                
                                TypePok:'todos',
                                [event.target.value] : event.target.checked,
                                Todos: false,
                                PokApi: false,
                                ZA: false,
                                AZ: false,                
                });
              }

              if(event.target.value === 'Todos'){

                return setFilters({
                  
                  TypePok:'todos',
                  [event.target.value] : event.target.checked,
                  PokLocales: false,
                  PokApi: false,
                  ZA: false,
                  AZ: false,    


              })
            }

              if(event.target.value === 'AZ'){
                return setFilters({
                                ...filters,
                                AZ : event.target.checked,
                                ZA: false
                                            
                });
              }

              if(event.target.value === 'ZA'){
                return setFilters({
                                ...filters,
                                ZA : event.target.checked,
                                AZ: false
                                            
                });
              }
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
              <span>Todos <input onChange={handleFilters} type='radio' name='filters' value='Todos' defaultChecked={filters.Todos}/></span>
              <span>API <input onChange={handleFilters} type='radio' name='filters' value='PokApi'defaultChecked={filters.PokApi}/></span>
              <span>Local <input onChange={handleFilters} type='radio' name='filters' value='PokLocales' defaultChecked={filters.PokLocales}/></span>
              <span>A-Z <input onChange={handleFilters} type='radio' name='filtersAZ' value='AZ' defaultChecked={filters.AZ}/></span>
              <span>Z-A <input onChange={handleFilters} type='radio' name='filtersAZ' value='ZA' defaultChecked={filters.ZA}/></span>
              <select  value={filters.TypePok} name='TypePok' onChange={handleFilters} id="selectType">
              <option  value='todos' >Tipos</option>
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
