const mongoose = require('mongoose')

const facultySchema = new mongoose.Schema({
    name :{
        type : String
    },
    userType:{
        type : String
    },
    email : {
        type : String
    },
    password: {
        type : String
    },
    designation :{
        type : String
    },
    Department:{
        type : String
    },
    university:{
        type : String
    },
    totalAvailableVacations : {
        type : Number
    },
    isApplied : {
        type : Boolean
    },
    isLeaveApplicationRejected : {
        type : Boolean
    },
    isAcceptedByHR : {
        type : Boolean
    },
    isAcceptedByRegistrar : {
        type : Boolean
    },
    isAcceptedByVC : {
        type : Boolean
    }
})

module.exports = mongoose.model('Faculty', facultySchema);