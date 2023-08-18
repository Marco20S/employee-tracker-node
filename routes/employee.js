const express = require('express')
const router = express.Router()


router.use(logger)

router.get("/", (req, res) => {
    // console.log("Steve lacy some");
    // res.send('Employee List')
    res.render("employee")
})

router.get("/add", (req, res) => {
   
    // res.send('Employee form')
    res.render("employee/add",{})
})

// router.use((req, res) => {
//     // console.log("Steve lacy some");
//     res.send('Employee form')
//     req.render("employee/add")
// })

router.post("/list", (req, res) => {
    res.render("employee/list",{})
    // res.send('Create User form')

})

router.get("/list", (req, res) => {
    res.render("employee/list",{})
    // res.send('Create User form')

})
 

//id to get, edit and delete record


router.route("/:id")
    .get((req, res) => {
        res.send(`Get Employee with id ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Get Employee with id ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Get Employee with id ${req.params.id}`)
    })


    const employee = [{name:'john'} , {name:'Busi'} , {name:'sonaldo'}]

//middleware and it runs between requests
router.param("id", (req, res, next, id) => {
   req.employee = employee[id]
    next()
})

// router.post("/*", (req, res) => {

//     res.statusCode(404).render('404',{title:'404'})
// })

function logger(req,res,next) {

    console.log(req.originalUrl)
    next()
}



module.exports = router