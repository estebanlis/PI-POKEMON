//Trae todos los pokemones
export const getPokemones = () => dispatch => {
    return fetch('http://localhost:3001/pokemon/')
    .then(response => response.json())
    .then(data => dispatch({type: 'GET_POKEMONES',payload: data}))
   
};

//Crea un pokemon nuevo en la DB local
export const newPokemon = (payload) => dispatch => {
    
    return fetch('http://localhost:3001/pokemon/',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => dispatch({type: 'CREATE_POKEMON',payload: data}))
    .catch((error) => {console.log(error.message)})
   
};

//Busca en pokemon por nombre en la api y en la DB 
export const searchPok = (value) => dispatch => {
    return fetch(`http://localhost:3001/pokemon/?name=${value}`)
    .then(response => response.json())
    .then(data => dispatch({type: 'SEARCH_POKEMON',payload: data}))
    .catch((error) => {console.log(error.message)})
   
};

// Setea la variable que indica que esta cargando datos desde backend
export const setLoading = (payload) =>{
    return{
        type:'setLoading',
        payload
    }
};
//Setea variable que indica que fue exitoso la carga del pokemon en la db local
export const setMsgDb = (payload) =>{
    return{
        type:'setMsgDb',
        payload
    }
};

//Setea variable que indica hubo problemas en la carga del pokemon en la db local
export const setMsgDbFail = (payload) =>{
    return{
        type:'setMsgDbFail',
        payload
    }
};

export const setMsgDbName = (payload) =>{
    return{
        type:'setMsgDbName',
        payload
    }
};


//Limpia la variable objeto donde gurado el dalle de un pokemon
export const clearPokDetail = () =>{
    return{
        type:'CLEAR_POKDETAIL',
        
    }
};

// Trae los types desde la DB
export const getTypes = () => dispatch => {
    return fetch('http://localhost:3001/type/')
    .then(response => response.json())
    .then(data => dispatch({type: 'GET_TYPES',payload: data}))
   
};

//trae pokemon por el ID, desde la api o db
export const getPokById = (value) => dispatch => {
    return fetch(`http://localhost:3001/pokemon/${value}`)
    .then(response => response.json())
    .then(data => dispatch({type: 'GET_POK_BY_ID',payload: data}))
   
};
