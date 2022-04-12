const {Router} = require('express');
const axios = require('axios');

const router = Router();

const urlApi = 'https://pokeapi.co/api/v2/pokemon';

router.get('/', async (req, res) => {

    try {

        let api_1 = await axios.get(urlApi + '?limit=10&offset=0'); 
    // data.results -->       {
    //                          "name": "bulbasaur",
    //                          "url": "https://pokeapi.co/api/v2/pokemon/1/"
    //                        },
    let api_2 = api_1.data.results.map(  u =>  u.url); // --> ["url", "url", ....]

    let api_3 = await axios.all(api_2.map( e => axios.get(e))); // lo mismo que Promise.all

    //console.log(api_3[0].data);

    let pokemons = api_3.map( pok => {
        let obj = {};
        obj = {
            name: pok.data.name,
            image: pok.data.sprites.other.dream_world.front_default,
            type: pok.data.types.length > 0 ? pok.data.types.map( t => t.type.name) : []
        }
        return obj;
    })

    res.json(pokemons);
        
    } catch (error) {
        res.status(404).json({msg: 'error'});
    }

    
});

module.exports = router;

