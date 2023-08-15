const express = require('express')
const router = express.Router()



router.get("/", (req, res) => {
    // console.log("Steve lacy some");
    // res.send('Employee List')
    req.render("employee")
})

router.get("/add", (req, res) => {
    // console.log("Steve lacy some");
    // res.send('Employee form')
    req.render("employee/add")
})

// router.use((req, res) => {
//     // console.log("Steve lacy some");
//     res.send('Employee form')
//     req.render("employee/add")
// })

router.post("/", (req, res) => {

    res.send('Create User form')

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

router.post("/*", (req, res) => {

    res.statusCode(404).render('404',{title:'404'})
})




module.exports = router