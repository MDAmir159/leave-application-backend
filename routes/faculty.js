const { response } = require('express');
const express = require('express')
const router = express.Router()
const Faculty = require('../schema/facultySchema')

router.get('/', async (req, res) => {
    console.log(userType);
    try {
        const facultyList = await Faculty.find();
        res.status(201).json({
            message : "OK..successfully found all faculty details",
            data : facultyList 
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal Server error"
        })
    }
})

router.post('/', async (req, res) => {
    const faculty = new Faculty({
        name : req.body.name,
        userType : req.body.userType,
        email : req.body.email,
        password : req.body.password,
        designation: req.body.designation,
        Department : req.body.Department,
        university : req.body.university,
        totalAvailableVacations : req.body.totalAvailableVacations,
        isLeaveApplicationRejected : true,
        isApplied : false,
        isAcceptedByHR : false,
        isAcceptedByRegistrar : false,
        isAcceptedByVC : false
    })

    try {
        const response = await faculty.save();
        res.status(201).json({
            message : "faculty data successfully entried"
        })
    } catch (error) {
        console.log(error);
        req.status(500).json({
            message : error.message
        })
    }
})

router.get('/:id', getFaculty, (req, res) => {
    let facultyMember
    res.status(201).json({
        data : res.facultyMember
    })
})

router.post('/login', getFacultyByEmail, (req, res) => {
    const {email, password, userType} = req.body
    let facultyMember = res.facultyMember

    let checkedFacultyMember = facultyMember.findIndex(function (item, index) {
        if(item.email == email) return true
    })
    
    if((checkedFacultyMember != -1) && (userType === facultyMember[checkedFacultyMember].userType) && (password === facultyMember[checkedFacultyMember].password)){
        res.status(201).json({
            message : "OK.. authorised",
            data : facultyMember[checkedFacultyMember]
        })
    } else {
        res.status(401).json({
            message : "Sorry..not authorised",
        })
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