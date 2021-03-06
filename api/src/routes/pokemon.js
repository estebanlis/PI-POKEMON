const { Router } = require('express');
const axios = require('axios');

const { Pokemon, Type } = require('../db');
const router = Router();

const urlApi = 'https://pokeapi.co/api/v2/pokemon';

router.get('/', async (req, res) => {

    let { name } = req.query;


/////////////////////Busqueda por Nombre o ID/////////////////////////
    if (name) {

        try {
            let id = 0;
            let pok = {};
            let obj = {};

            if (/([1-9])+B/.test(name)) {
                id = Number(name.substring(0, name.length - 1));

                pok = await Pokemon.findOne({
                    where: {
                        id: id
                    },
                    include: {
                        model: Type,
                        attributes: ['name']
                    }
                });
            }
            else {

                name = name.toLowerCase();

                pok = await Pokemon.findOne({
                    where: {
                        name: name
                    },
                    include: {
                        model: Type,
                        attributes: ['name']
                    }
                });

            }



            if (pok !== null) {

                obj = {
                    id: pok.idB,
                    name: pok.name,
                    hp: pok.hp,
                    attack: pok.attack,
                    defense: pok.defense,
                    speed: pok.speed,
                    height: pok.height,
                    weight: pok.weight,
                    image: pok.image,
                    type: pok.types?.map(t => t.name)
                }

                return res.json(obj);
            }




        } catch (error) {

            console.log(error.message);
        }

        try {

            let pokemon = await axios.get(urlApi + '/' + name);

            let obj = {
                id: pokemon.data.id,
                name: pokemon.data.name,
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.data.id}.png `,
                type: pokemon.data.types.length > 0 ? pokemon.data.types.map(t => t.type.name) : []
            }


            return res.json(obj);

        } catch (error) {


            return res.status(404).json({ msg: 'fail' });

        }
    }

/////////////////////Trae los datos de los pokemones/////////////////

    let pokemons = [];
    try {

        let api_1 = await axios.get(urlApi + '?limit=40&offset=0');

        //////////////////////////////////////////////////////////////////////////////
        // data.results -->       {                                                     
        //                          "name": "bulbasaur",
        //                          "url": "https://pokeapi.co/api/v2/pokemon/1/"
        //                        },
        //////////////////////////////////////////////////////////////////////////////

        let api_2 = api_1.data.results.map(u => u.url); // --> ["url", "url", ....]

        let api_3 = await axios.all(api_2.map(e => axios.get(e))); // lo mismo que Promise.all ---> [{..}, {..}, ...]


////////////////// Filtro los datos que necesito mandar al front.//////////////

        pokemons = api_3.map(pok => {
            let obj = {};
            obj = {
                id: pok.data.id,
                name: pok.data.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pok.data.id}.png `,
                attack: pok.data.stats[1].base_stat,
                type: pok.data.types.length > 0 ? pok.data.types.map(t => t.type.name) : []
            }
            return obj;
        })



    } catch (error) {

        console.log(error.message);
    }

//////////////////// Busco todos los pokemones de la db local //////////////

    try {

        let pok = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name']
            }
        });

        let pokMap = pok.map(p => {

            let obj = {
                id: p.idB,
                name: p.name,
                attack: p.attack,
                image: p.image,
                type: p.types?.map(t => t.name)
            }

            return obj;

        })

        return res.json([...pokMap, ...pokemons]);

    } catch (error) {
        return res.status(404).json({ msg: error.message });

    }

});

/////////////// Ruta para pokemon por ID //////////////////////////////////////

router.get('/:id', async (req, res) => {

    let { id } = req.params;

    if (!/([1-9])+B/.test(id)) { // consulto si id tiene una 'B', si true pertenece DB local, caso contrario es para la api externa

        try {
            let pokemon = await axios.get(urlApi + '/' + id); // trae pokemon desde la api por el id

            let obj = {
                id: pokemon.data.id,
                name: pokemon.data.name,
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png `,
                type: pokemon.data.types.length > 0 ? pokemon.data.types.map(t => t.type.name) : []
            }

            return res.json(obj);

        } catch (error) {
            return res.status(404).json({ msg: 'fail' });
        }

    } else {

        let obj = {};
        let pok = {};
        id = Number(id.substring(0, id.length - 1));

        try {

            pok = await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                    attributes: ['name']
                }
            });

            if(pok !== null){

                    obj = {
                    id: pok.idB,
                    name: pok.name,
                    hp: pok.hp,
                    attack: pok.attack,
                    defense: pok.defense,
                    speed: pok.speed,
                    height: pok.height,
                    weight: pok.weight,
                    image: pok.image,
                    type: pok.types?.map(t => t.name)
                }
    
                return res.json(obj);

            }
            

        } catch (error) {
            return res.status(404).json({ msg: 'fail' });
        }



    }

});

router.post('/', async (req, res) => {

    let { name, hp, attack, defense, speed, height, weight, image, types } = req.body;



    if (Object.keys(req.body).length === 0) {
        return res.status(500);
    }

    name = name.toLowerCase();

    if (name !== '' || name !== ' ') {
        try {

            let pok = await Pokemon.findOne({
                where: {
                    name: name
                },

            });


            console.log(pok.toJSON());
            return res.json({ msgDbName: 'nameExist' });



        } catch (error) {
           
        }
        try {

            let pokemon = await axios.get(urlApi + '/' + name);
            

            return res.json({ msgDbName: 'nameExist' });

        } catch (error) {
  
        }

    }
    try {
        const newPokemon = await Pokemon.create(
            {
                name,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                image

            }
        );

        if (types) newPokemon.setTypes(types);



        res.json({ msg: 'ok' });

    } catch (error) {
        
        return res.status(404).json({ msgF: 'fail' });
        
    }
});

module.exports = router;

