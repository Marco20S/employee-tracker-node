const express = require('express')
const app = express()

app.use(express.static('public'))
app.set("view engine", "ejs")
app.set("views")


const admin = require('firebase-admin')
const credentials = require('./key.json')

//initializing admin
admin.initializeApp({
    credentials:admin.credential.cert(credentials)
})

//database 
const databse = admin.firestore()
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// create post

app.post('/create', async (req,res,next)=>{
    try {
        const employeeJson={
            nameSurname:req.body.title,
            idNumber:req.body.idNumber,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            postion:req.body.position
           // image:req.body.title
        }

        const response = await database.collection('employee').add(employeeJson)
        res.send(response)
    }
    catch (error){
        console.error("something went wrong");
        res.alert(error,"An Error Has Occured, Something went wrong")
        res.send(error)

    }
})

const employeeRouter = require('./routes/employee')

app.use('/employee', employeeRouter)
 
 
app.listen(3000)