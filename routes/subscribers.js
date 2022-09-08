const { response } = require('express');
const express = require('express')
const router = express.Router()
const Subscriber = require('../schema/subscriberSchema')

// getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(201).json(subscribers);
    } catch (error) {
        res.status(500).json({ message : error.message})
    }
})

// getting one
router.get('/:id', getSubscriber ,(req, res) => {
    res.json(res.subscriber)
})

// insert one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name : req.body.name,
        subscriberToChannel : req.body.subscriberToChannel
    })

    try {
        const response = await subscriber.save();
        res.status(201).json({message : "saved successfully", data : response});
    } catch (error) {
        console.log(error);
        req.status(500).json({message : error.message})
    }
})

// update one
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name !== null){
        res.subscriber.name = req.body.name;
    }
    if(req.body.subscriberToChannel !== null){
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel;
    }

    try {
        console.log(res.subscriber);
        const updatedSubscriber = await res.subscriber.save();
        res.json(res);
    } catch (error) {
        res.status(400).json({message : error.message})
    }
})

// delete one
router.delete('/:id', getSubscriber,  async (req, res) => {
    try {
        await res.subscriber.remove();
        res.json({message : "deleted successfully"});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id);
        
        if(subscriber === null){
            res.status(404).json({message : "subscriber not found"})
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }
    res.subscriber = subscriber;
    next();
}

module.exports = router;