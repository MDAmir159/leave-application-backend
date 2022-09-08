const mongoose = require('mongoose')

const ingradientsSchema = new mongoose.Schema({
    name :{
        type : String
    },
    image :{
        type : String
    }
})

module.exports = mongoose.model('Ingradients', ingradientsSchema);