
const initialState = {
    pokemones: [],
    loading : true,
    searchResult: [],
    typesPok:[],
    pokTemp:[],
    pokDetail:{},
    msgDbOK: false,
    msgDbFail: false,
    msgDbName: false
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
                
            case 'CREATE_POKEMON':

                     
                    return {
                        ...state,
                        loading: false,
                        msgDbOK : action.payload.msg === 'ok' ? true : false,
                        msgDbFail : action.payload.msgF === 'fail' ? true : false,
                        msgDbName : action.payload.msgDbName === 'nameExist' ? true : false
                        
                    };

            case 'SEARCH_POKEMON':
                    return {
                        ...state,
                        loading: false,
                        searchResult: action.payload,
                        msgDbFail: action.payload.msg === 'fail' ? true : false
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
                   
            
            case 'setLoading':
                        return {
                            ...state,
                            loading: action.payload,
                            
                        };  
            case 'setMsgDb':
                        return {
                            ...state,
                            msgDbOK: action.payload,
                            
                        };  
            case 'setMsgDbFail':
                            return {
                                ...state,
                                msgDbFail: action.payload,
                                
                            };
            case 'setMsgDbName':
                                return {
                                    ...state,
                                    msgDbName: action.payload,
                                    
                                };
                            
                        
            case 'CLEAR_POKDETAIL':
                            return {
                                ...state,
                                pokDetail:{}
                                
                            };  
                         
           
        
            default: return state;
        }

        
    
};

export default pokemones;

