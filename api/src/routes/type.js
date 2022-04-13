const {Router} = require('express');
const {Type} = require('../db');
const router = Router();

router.get('/', async (req, res) => {

    try {
        
        let types = await Type.findAll();

        let typesMap = types.map( ty => {
            let obj = {
                id: ty.id,
                name: ty.name
            }
            return obj;
        });

        return res.json(typesMap);

    } catch (error) {
        res.json(error.message);
    }

});

module.exports = router;