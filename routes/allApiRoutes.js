const express = require('express')
const routes = express.Router()

/////
const subcsriberRouter = require('./subscribers')
const ingradientsRouter = require('./ingradients')
const faculty = require('./faculty')
const application = require('./application')
//////
routes.use('/subscriber', subcsriberRouter);
routes.use('/ingradients', ingradientsRouter);
routes.use('/faculty', faculty);
routes.use('/application', application)

// routes.use('/api', apiRoutes)
module.exports = routes;