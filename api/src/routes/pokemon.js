const {Router} = require('express');
const axios = require('axios');

const {Pokemon, Type} = require('../db');
const router = Router();

const urlApi = 'https://pokeapi.co/api/v2/pokemon';

router.get('/', async (req, res) => {

    let  {name} = req.query;

    if(name){

                name = name.toLowerCase();

                try {

                        let pok = await Pokemon.findOne({
                                        where:{
                                        name: name
                                        },
                                        include: {
                                        model: Type,
                                        attributes: ['name']
                                        }
                                        });
            
                        let obj = {
                            idB: pok.idB,
                            name: pok.name,
                            hp: pok.hp,
                            attack: pok.attack,
                            defense: pok.defense,
                            speed: pok.speed,
                            height: pok.height,
                            weight: pok.weight,
                            image: pok.image,
                            type: pok.types?.map( t => t.name)
                        } 

                        return res.json(obj);

           
            
                    } catch (error) {
                        //res.status(404).json(error.message);  
                        
                    }

                    try {

                        let pokemon = await axios.get(urlApi +'/'+name); 

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
                            type: pokemon.data.types.length > 0 ? pokemon.data.types.map( t => t.type.name) : []
                        }
                
                        return res.json(obj);

                    } catch (error) {
                        res.status(404).json(error.message);
                    }
    }
   
    let pokemons = [];
    try {

            let api_1 = await axios.get(urlApi + '?limit=40&offset=0'); 

            // data.results -->       {
            //                          "name": "bulbasaur",
            //                          "url": "https://pokeapi.co/api/v2/pokemon/1/"
            //                        },

            let api_2 = api_1.data.results.map(  u =>  u.url); // --> ["url", "url", ....]

            let api_3 = await axios.all(api_2.map( e => axios.get(e))); // lo mismo que Promise.all

            
            pokemons = api_3.map( pok => {
                                            let obj = {};
                                            obj = {
                                                        id: pok.data.id,
                                                        name: pok.data.name,
                                                        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pok.data.id}.png `,
                                                        attack: pok.data.stats[1].base_stat,
                                                        type: pok.data.types.length > 0 ? pok.data.types.map( t => t.type.name) : []
                                                    }
                                            return obj;
                                        })

            //res.json(pokemons);
                
    } catch (error) {
        //res.status(404).json(error.message);
        
    }

    try {

        let pok = await Pokemon.findAll({
            include: {
                        model: Type,
                        attributes: ['name']
            }
        });

        let pokMap = pok.map( p => {

            let obj = {
                id: p.idB,
                name: p.name,
               // hp: p.hp,
                attack: p.attack,
               // defense: p.defense,
               // speed: p.speed,
               // height: p.height,
               // weight: p.weight,
                image: p.image,
                type: p.types?.map( t => t.name)
            }  

            return obj;

        })
        

        return res.json([...pokMap,...pokemons]);
        
    } catch (error) {
        res.status(404).json(error.message);  
    
    }
    
});

router.get('/:id', async (req, res) => {

    let {id} = req.params;

    if(id.indexOf('B') <0 ){ // consulto si id tiene un 'B', si true pertenece DB local, caso contrario es para la api externa

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
                                       /*  image: pokemon.data.sprites.other.home.front_default, */
                                       image :  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png `,
                                        type: pokemon.data.types.length > 0 ? pokemon.data.types.map( t => t.type.name) : []
                                    }
                            
                                    return res.json(obj);
                                    
                                } catch (error) {
                                    res.status(404).json(error.message); 
                                }

    }else{

            id = Number(id.substring(0, id.length - 1));

            try {

                    let pok = await Pokemon.findByPk(id,{
                        include: {
                            model: Type,
                            attributes: ['name']
                    }
                    });
                    
                            
                    let obj = {
                        id: pok.idB,
                        name: pok.name,
                        hp: pok.hp,
                        attack: pok.attack,
                        defense: pok.defense,
                        speed: pok.speed,
                        height: pok.height,
                        weight: pok.weight,
                        image: pok.image,
                        type: pok.types?.map( t => t.name)
                    } 

                    return res.json(obj);
                    
            } catch (error) {
                    res.status(404).json(error.message);  
            }
        


    }
    
});

router.post('/', async (req, res) => {
    
    const {name,hp,attack,defense,speed,height,weight,image,types} = req.body;

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

        if(types) newPokemon.setTypes(types);

        /* let pok = await Pokemon.findByPk(1,
            {
                include: [{
                    model: Type,
                    through: {attributes: []}
                }]
            });
         */
            let pok = await Pokemon.findOne({
                where:{
                    name : name
                },
                include: {
                    model: Type,
                    attributes: ['name']
            }
            });
            let i = await pok.getTypes();
            
         
            let obj = {
                idB: pok.idB,
                id: pok.id,
                name: pok.name,
                hp: pok.hp,
                attack: pok.attack,
                defense: pok.defense,
                speed: pok.speed,
                height: pok.height,
                weight: pok.weight,
                image: pok.image,
                types: i.length > 0 ? i.map( t => t.name) : []
                //types: pok.types?.map( t => t.name)
            } 
            

        //console.log(pok.toJSON());
      //let i = await pok.getTypes();

        res.json(obj);

    } catch (error) {
        res.status(404).json(error.message); 
    }

});

module.exports = router;

