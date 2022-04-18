const initialState = {
    pokemones: [],
    loading : true,
    searchResult: []
};

const pokemones = (state = initialState, action) => {
    switch(action.type){
       
            case 'GET_POKEMONES':
                return {
                    state,
                    loading: false,
                    pokemones: action.payload
                };
            case 'SEARCH_POKEMONE':
                    return {
                        state,
                        loading: false,
                        searchResult: action.payload
                    };    

        
            default: return state;
        }

        
    
};

export default pokemones;