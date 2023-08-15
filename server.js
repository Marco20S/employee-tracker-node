const http = require('http')

const fs = require('fs')

const server = http.createServer((req, res) => {

    // res.setHeader('Content-type', 'text/html')
    // // res.write("Hello this is my new server ")
    // // res.end()

    // //sending our html file
    // fs.readFile('./views/index.html', (err, data) => {

    //     if (err) {
    //         console.log(err);
    //         res.end()
    //     } else { 
    //         res.write(data)
    //         res.end()
    //     }

    // })

    let path = './views'

    switch (req.url) {
        case '/'
            : path += '/index.html';
            res.statusCode = 200
            break;

        case '/add'
            : path += '/add.html';
            res.statusCode = 200
            break;

        case '/list'
            : path += '/add.html';
            res.statusCode = 200
            break;

        default
            : path += '/404.html';
            res.statusCode = 404
            break;

    }

    //sending back to browser

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end()
        } else {
            res.write(data)
            res.end()
        }
    })


})

const port = 4000;
server.listen(port, 'localhost', () => {
    console.log(`Listening to this fire port${port}`)
})