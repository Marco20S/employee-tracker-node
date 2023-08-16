const morgan = require('morgan')
// const http = require('http')

const express = require("express")
const app = express()

app.use(express.static("public"))


const fs = require('fs')

const employeeRouter = require('./routes/employee')
const { hostname } = require('os')
const { publicDecrypt } = require('crypto')

// router 
app.use('/employee', employeeRouter)



//express app port view engine
app.set("views engine", "ejs")
app.set("views")


//middleware
// app.use((req, res, next,) => {
//     console.log('hostname', req.hostname);
//     console.log('url', req.path);
//     console.log('method', req.method);
//     next()

// })

app.use(morgan('dev'))

app.use(express.static('public'))


app.get("/", (req, res) => {
    console.log("Steve lacy some");
    res.render('index')
})

app.get("/add", (req, res) => {
    console.log("Steve lacy some");
    res.render('add')
})

// app.get("/", (req, res) => {
//     console.log("Steve lacy some");
//     res.render('index')
// })




app.listen(3500)