
const initialState = {
    pokemones: [],
    loading : true,
    searchResult: [],
    typesPok:[],
    pokTemp:[]
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

            case 'GET_TYPES':
                    return {
                            ...state,
                           
                            typesPok: action.payload
                        };        
                   
            case 'FILTER' :
                let pokFilter = state.pokemones;

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
                } 


               
                
               return{
                    ...state,
                    pokTemp: pokFilter

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