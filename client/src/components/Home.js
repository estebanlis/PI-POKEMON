import {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemones, getTypes, filter,pagePok, setLoading } from '../actions';
import CardPokes from './CardPokes';



export default function Home() {

    
    let pokes = useSelector(state => state.pokTemp);
    let load = useSelector(state => state.loading);
    let types = useSelector(state => state.typesPok);
    let totalPage = useSelector(state => state.page);

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
                                            orderAZ: false,
                                            orderZA: false,
                                            orderUpAttack: false,
                                            orderDownAttack: false
                                           });
    
    
    const offset = 12;
    
    
    let dispatch = useDispatch();

    useEffect(() => {
            if(!pokes.length){
              dispatch(getTypes());
              dispatch(getPokemones());
            }
    },[dispatch]);
    
    useEffect(() => {
      if(load ) return;

      
      if(totalPage <= 1) {
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
    },[filters,load,totalPage]);

    useEffect(() => {
     dispatch(filter(filters));
    
     dispatch(pagePok({currentPage: currentPage.page, offset: offset}));
      

    },[filters, currentPage]);

    
    const nextPage = () => {
   
       if(currentPage.index < totalPage -2){
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
         setFilters({...filters,
                        TypePok : event.target.value,
  
        });
      }

      if(event.target.value === 'orderUpAttack'){
        setFilters( {  ...filters,
                       orderUpAttack:event.target.checked, 
                       orderZA: false,
                       orderAZ: false, 
                       
         });
        }

      if(event.target.value === 'orderDownAttack'){
          setFilters( {  ...filters,
                         orderDownAttack:event.target.checked,
                         orderZA: false,
                         orderAZ: false,  
                         
           });  
          }

      if(event.target.value === 'PokApi'){
         setFilters( {
                        TypePok:'todos',
                        PokApi : event.target.checked,
                        Todos: false,
                        PokLocales: false,
                        orderZA: false,
                        orderAZ: false,
          }); 

        
      }

      if(event.target.value === 'PokLocales'){

         setFilters( {
                        TypePok:'todos',
                        PokLocales : event.target.checked,
                        Todos: false,
                        PokApi: false,
                        orderZA: false,
                        orderAZ: false,  
          });
      }

      if(event.target.value === 'Todos'){

         setFilters( {
                        TypePok:'todos',
                        Todos: event.target.checked,
                        PokLocales: false,
                        PokApi: false,
                        orderZA: false,
                        orderAZ: false,  
            })
    }

      if(event.target.value === 'orderAZ'){
         setFilters( {
            ...filters,
                        orderAZ : event.target.checked,
                        orderZA: false,
                        orderDownAttack: false,
                        orderUpAttack: false
 
        });
      }

      if(event.target.value === 'orderZA'){
         setFilters( {
            ...filters,
                        orderZA : event.target.checked,
                        orderAZ: false,
                        orderDownAttack: false,
                        orderUpAttack: false
           });
      }
  
     }

    
   
  return (
      <>
      {load ? null :

<div className='paginado'>
<div>
    <button onClick={prevPage} disabled ={currentPage.btnPrev}>Anterior</button>
    <button onClick={nextPage} disabled ={currentPage.btnNext}>Siguiente</button> 
</div>
<div className='filters'>
      <div className='fsource'>
      <span>Todos <input onChange={handleFilters} type='radio' name='filters' value='Todos' defaultChecked={filters.Todos}/></span>
      <span>API <input onChange={handleFilters} type='radio' name='filters' value='PokApi'defaultChecked={filters.PokApi}/></span>
      <span>Local <input onChange={handleFilters} type='radio' name='filters' value='PokLocales' defaultChecked={filters.PokLocales}/></span>

      </div>

      <div className='fsource'>
      <span>A-Z <input onChange={handleFilters} type='radio' name='filtersAZAttack' value='orderAZ' defaultChecked={filters.AZ}/></span>
      <span>Z-A <input onChange={handleFilters} type='radio' name='filtersAZAttack' value='orderZA' defaultChecked={filters.ZA}/></span>
      <span>Attack ++ <input onChange={handleFilters} type='radio' name='filtersAZAttack' value='orderUpAttack' defaultChecked={filters.orderUpAttack}/></span>
      <span>Attack -- <input onChange={handleFilters} type='radio' name='filtersAZAttack' value='orderDownAttack' defaultChecked={filters.orderDownAttack}/></span>
      <select style={{borderRadius: "5px"}} value={filters.TypePok} name='TypePok' onChange={handleFilters} id="selectType">
      <option  value='todos' >Tipos</option>
        {types && types.map( (t,index) => (
          <option  key={index}  value={t.name}>{t.name}</option>
        ))}
      </select>        

      </div>
      
      

</div>


</div>



      }
      
      
      <div className={load ? "homeContent": "homeContent list"}>
      

        {load? <div class="pokemonLoader"></div> : pokes && pokes.length ? pokes.map(p => (
            <Link to={`/pokemon/${p.id} `} key={p.id} onClick={()=>{dispatch(setLoading(true))}}> <CardPokes  id={p.id} name={p.name} image={p.image} types={p.type} /></Link>
        )) : <p>Not found pokemon</p>}
    </div>

      </>
    
  )
}
