const express = require('express')
const router = express.Router()
const Ingradients = require('../schema/ingradientsSchema')

router.get('/all_ingradients', async (req, res) => {
    try {
        const response = await Ingradients.find();
        res.status(201).json(response)
    } catch (error) {
        console.log(error);
        req.status(500).json({message : error.message})
    }

})

router.post('/new_ingradients', async (req, res) => {
    const ingradients = new Ingradients({
        name : req.body.name,
        image : req.body.image
    })

    try {
        const response = await ingradients.save();
        res.status(201).json({message : "Ingradients save successfully", data : response});
    } catch (error) {
        console.log(error);
        req.status(500).json({message : error.message})
    }
})

module.exports = router;