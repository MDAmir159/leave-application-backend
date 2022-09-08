const { response } = require('express');
const express = require('express');
const router = express.Router()
const Application = require('../schema/applicationSchema')
const Faculty = require('../schema/facultySchema')

router.get('/:id', async (req, res) => {
    try {
        
        const userType = req.params.id
        let applicationList
        if(userType === 'hr') {
            applicationList = await Application.find({
                isLeaveApplicationRejected : false,
                isAcceptedByHR : false
            });
        } else if (userType === 'registrar'){
            applicationList = await Application.find({
                isLeaveApplicationRejected : false,
                isAcceptedByHR : true,
                isAcceptedByRegistrar : false,
            });
        } else if(userType === 'vc') {
            applicationList = await Application.find({
                isLeaveApplicationRejected : false,
                isAcceptedByHR : true,
                isAcceptedByRegistrar : true,
                isAcceptedByVC : false
            });
        }
        
        res.status(201).json({
            message : "OK..successfully found all application details",
            data : applicationList 
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal Server error"
        })
    }
})

router.post('/', async (req, res) => {
    const application = new Application({
        name :req.body.name,
        userId : req.body.userId,
        userType: req.body.userType,
        designation :req.body.designation,
        Department: req.body.Department,
        requestedDaysVacation : req.body.requestedDaysVacation,
        reasonForLeave : req.body.reasonForLeave,
        totalAvailableVacations : req.body.totalAvailableVacations,
        isLeaveApplicationRejected : false,
        isAcceptedByHR : false,
        isAcceptedByRegistrar : false,
        isAcceptedByVC : false
    })

    let submittedJSON = {
        isLeaveApplicationRejected : false
    }

    try {
        const response = await application.save();
        const updatedFaculty = await Faculty.updateOne({
            _id : application.userId
        },{
            $set : submittedJSON
        }
        );
        res.status(201).json({
            message : "application data successfully entried"
        })
    } catch (error) {
        console.log(error);
        req.status(500).json({
            message : error.message
        })
    }
})

router.patch('/:id', async (req, res, next) => {
    const userid = req.body.userId
    const userType = req.body.userType
    const isRejected = req.body.isRejected
    const applicationId = req.params.id
    let submittedJSON = {}

    if(isRejected === true){
        submittedJSON = {
            isLeaveApplicationRejected : true
        }
    } else {
        if(userType ===  "hr"){
            submittedJSON = {isAcceptedByHR : true}
        } else if (userType === "registrar"){
            submittedJSON = {isAcceptedByRegistrar : true}
        } else if (userType === "vc"){
            submittedJSON = {isAcceptedByVC : true}
        }
    }

    try {
        const updatedFaculty = await Faculty.updateOne({
            _id : userid
        },{
            $set : submittedJSON
        }
        );

        const updatedSubscriber = await Application.updateOne({
            _id : applicationId
        },{
            $set : submittedJSON
        }
        );

        if(isRejected === false && userType === "vc"){
            const applicationDetails = await Application.find({
                _id : applicationId
            })
            const userDetails = await Faculty.find({
                _id : userid
            })
            const requestedDaysVacation = applicationDetails[0].requestedDaysVacation
            const remainingDaysForVacation = userDetails[0].totalAvailableVacations
            const updatedTotalAvailableVacations = remainingDaysForVacation - requestedDaysVacation
            const updatedFaculty = await Faculty.updateOne({
                _id : userid
            },{
                $set : {
                    totalAvailableVacations : updatedTotalAvailableVacations,
                    isLeaveApplicationRejected : true
                }
            }
            );
        }

        
        res.status(200).json({
            message : "updated"
        });
    } catch (error) {
        res.status(400).json({message : error.message})
    }
    
})

async function getFacultyByEmail(req, res, next) {
    let facultyMember
    try {
        facultyMember = await Faculty.find({email : req.body.email})
        if(facultyMember == null){
            res.status(400).json({
                message : "subscriber not found"
            })
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }
    res.facultyMember = facultyMember
    next()
}

async function getFaculty(req, res, next) {
    let facultyMember
    try {
        facultyMember = await Faculty.findById(req.params.id)
        if(facultyMember == null){
            res.status(400).json({
                message : "subscriber not found"
            })
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }
    res.facultyMember = facultyMember
    next()
}

module.exports = router