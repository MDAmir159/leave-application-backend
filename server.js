require('dotenv').config()

const cors = require('cors')
const express = require('express')
const app = express()
const mongo  = require('mongodb')
const mongoose = require('mongoose')
const apiRoutes = require('./routes/allApiRoutes')
const port = process.env.PORT

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

// app.use(express.urlencoded({extended : true}));
// app.use(cors())
app.use(express.json())
app.use(cors())

// app.use('/subscriber', subscribersRouter)
// app.use(apis);

// ---------------  for test -----------------
// app.use('/welcome', (req, res) => {
//     res.json({
//         message : "ahoy"
//     })
// })

app.use(apiRoutes);

app.listen(port, () => console.log("Server connected"))
// https://www.w3schools.in/mongodb/data-types
// https://mongoosejs.com/docs/api/schema.html

// time and date https://stackoverflow.com/questions/10006218/which-schematype-in-mongoose-is-best-for-timestamp
