export const getPokemones = () => dispatch => {
    return fetch('http://localhost:3001/pokemon/')
    .then(response => response.json())
    .then(data => dispatch({type: 'GET_POKEMONES',payload: data}))
   
};

export const searchPok = (value) => dispatch => {
    return fetch(`http://localhost:3001/pokemon/?name=${value}`)
    .then(response => response.json())
    .then(data => dispatch({type: 'SEARCH_POKEMON',payload: data}))
   
};

export const setLoading = (payload) =>{
    return{
        type:'setLoading',
        payload
    }
};