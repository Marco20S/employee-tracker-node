const morgan = require('morgan')
const http = require('http')

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




// const server = http.createServer((req, res) => {

//     // res.setHeader('Content-type', 'text/html')
//     // // res.write("Hello this is my new server ")
//     // // res.end()

//     // //sending our html file
//     // fs.readFile('./views/index.html', (err, data) => {

//     //     if (err) {
//     //         console.log(err);
//     //         res.end()
//     //     } else { 
//     //         res.write(data)
//     //         res.end()
//     //     }

//     // })

//     let path = './views'

//     switch (req.url) {
//         case '/'
//             : path += '/index.html';
//             res.statusCode = 200
//             break;

//         case '/add'
//             : path += '/add.html';
//             res.statusCode = 200
//             break;

//         case '/list'
//             : path += '/add.html';
//             res.statusCode = 200
//             break;

//         default
//             : path += '/404.html';
//             res.statusCode = 404
//             break;

//     }

//     //sending back to browser

//     fs.readFile(path, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.end()
//         } else {
//             res.write(data)
//             res.end()
//         }
//     })


// })

// const port = 4000;
// server.listen(port, 'localhost', () => {
//     console.log(`Listening to this fire port${port}`)
// })