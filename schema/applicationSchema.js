const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    name :{
        type : String
    },
    userId : {
        type : String
    },
    userType:{
        type : String
    },
    designation :{
        type : String
    },
    Department:{
        type : String
    },
    requestedDaysVacation : {
        type : Number
    },
    reasonForLeave : {
        type : String
    },
    totalAvailableVacations : {
        type : Number
    },
    isAcceptedByHR : {
        type : Boolean
    },
    isAcceptedByRegistrar : {
        type : Boolean
    },
    isAcceptedByVC : {
        type : Boolean
    },
    isLeaveApplicationRejected :{
        type : Boolean
    }
})

module.exports = mongoose.model('Application', applicationSchema);