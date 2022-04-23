
const initialState = {
    pokemones: [],
    loading : true,
    searchResult: [],
    typesPok:[],
    pokTemp:[],
    page:1,
    pokDetail:{}
};

const pokemones = (state = initialState, action) => {
    switch(action.type){
       
            case 'GET_POKEMONES':
                return {
                    ...state,
                    loading: false,
                    pokemones: action.payload,
                    pokTemp: action.payload
                };

            case 'SEARCH_POKEMON':
                    return {
                        ...state,
                        loading: false,
                        searchResult: action.payload
                    };
            case 'GET_POK_BY_ID':
                        return {
                            ...state,
                            loading: false,
                            pokDetail: action.payload
                        };

            case 'GET_TYPES':
                    return {
                            ...state,
                           
                            typesPok: action.payload
                        };        
                   
            case 'FILTER' :
                let pokFilter = state.pokemones;
                let numPages=1;

                if(action.payload.PokApi){
                    pokFilter = state.pokemones.filter( p => typeof p.id !== 'string' );

                    if(action.payload.TypePok !== 'todos'){
                        pokFilter = pokFilter.filter(p => {
                        if(p.type.find( t => t === action.payload.TypePok )) return p;
                        })
                        
                        }
                    if(action.payload.orderAZ){
                            pokFilter = pokFilter.sort(SortArray);
                          }
                          
                    if(action.payload.orderZA){
                            pokFilter = pokFilter.reverse(SortArray);
                          }
                    if(action.payload.orderUpAttack){
                            pokFilter = pokFilter.sort(function(a,b){
                                if(a.attack > b.attack){
                                    return -1;
                                }
                                if(b.attack > a.attack){
                                    return 1;
                                }
                                return 0;
                            })
                          }
                    if(action.payload.orderDownAttack){
                            pokFilter = pokFilter.sort(function(a,b){
                                if(a.attack > b.attack){
                                    return 1;
                                }
                                if(b.attack > a.attack){
                                    return -1;
                                }
                                return 0;
                            })
                          }
                } 
                
                if(action.payload.PokLocales){
                    pokFilter = state.pokemones.filter( p => typeof p.id === 'string' );

                    if(action.payload.TypePok !== 'todos'){
                        pokFilter = pokFilter.filter(p => {
                        if(p.type.find( t => t === action.payload.TypePok )) return p;
                        })
                        
                        }
                    if(action.payload.orderAZ){
                            pokFilter = pokFilter.sort(SortArray);
                          }
                          
                    if(action.payload.orderZA){
                            pokFilter = pokFilter.reverse(SortArray);
                          }
                    if(action.payload.orderUpAttack){
                            pokFilter = pokFilter.sort(function(a,b){
                                if(a.attack > b.attack){
                                    return -1;
                                }
                                if(b.attack > a.attack){
                                    return 1;
                                }
                                return 0;
                            })
                          }
                    if(action.payload.orderDownAttack){
                            pokFilter = pokFilter.sort(function(a,b){
                                if(a.attack > b.attack){
                                    return 1;
                                }
                                if(b.attack > a.attack){
                                    return -1;
                                }
                                return 0;
                            })
                          }
                }

                if(action.payload.Todos){
                    
                    if(action.payload.TypePok !== 'todos'){
                        pokFilter = pokFilter.filter(p => {
                        if(p.type.find( t => t === action.payload.TypePok )) return p;
                        })
                        
                        }
                    if(action.payload.orderAZ){
                            pokFilter = pokFilter.sort(SortArray);
                          }
                          
                    if(action.payload.orderZA){
                            pokFilter = pokFilter.reverse(SortArray);
                          }
                          if(action.payload.orderUpAttack){
                            pokFilter = pokFilter.sort(function(a,b){
                                if(a.attack > b.attack){
                                    return -1;
                                }
                                if(b.attack > a.attack){
                                    return 1;
                                }
                                return 0;
                            })
                          }
                    if(action.payload.orderDownAttack){
                            pokFilter = pokFilter.sort(function(a,b){
                                if(a.attack > b.attack){
                                    return 1;
                                }
                                if(b.attack > a.attack){
                                    return -1;
                                }
                                return 0;
                            })
                          }
                } 


                numPages = Math.ceil(pokFilter.length/12);
               
                
               return{
                    ...state,
                    pokTemp: pokFilter,
                    page: numPages
                };

            case 'setLoading':
                        return {
                            ...state,
                            loading: action.payload,
                            
                        };   
            case 'PAGE_POK':
                let pokPage = state.pokTemp;
                pokPage = pokPage.slice(action.payload.currentPage,action.payload.currentPage + action.payload.offset);

                            return {
                                ...state,
                                pokTemp: pokPage
                                
                            };                           

        
            default: return state;
        }

        
    
};

export default pokemones;

const  SortArray = (x, y) => {
       
    return x.name.localeCompare(y.name);
  }