const initialState = {
    pokemones: [],
    loading : true,
    searchResult: [],
    typesPok:[]
};

const pokemones = (state = initialState, action) => {
    switch(action.type){
       
            case 'GET_POKEMONES':
                return {
                    ...state,
                    loading: false,
                    pokemones: action.payload
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
                   

            case 'setLoading':
                        return {
                            ...state,
                            loading: action.payload,
                            
                        };                     

        
            default: return state;
        }

        
    
};

export default pokemones;