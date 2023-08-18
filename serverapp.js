const express = require('express')
const app = express()

app.use(express.static('public'))
app.set("view engine", "ejs")
app.set("views")

const employeeRouter = require('./routes/employee')

app.use('/employee', employeeRouter)


const admin = require('firebase-admin')
const credentials = require('./key.json')

//initializing admin
admin.initializeApp({
    credential: admin.credential.cert(credentials)
})

//database 
const database = admin.firestore()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// create post

app.post('/add', async (req, res, next) => {
    try {
        const employeeJson = {
            nameSurname: req.body.nameSurname,
            idNumber: req.body.idNumber,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            position: req.body.position
        }

        console.log('before awee');
        const response = await database.collection("employees").add(employeeJson);
        console.log('after awee');
        console.log('awee', response);

        res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
})

//read data

app.get('/', async (req, res, next) => {
    try {
        const employeeRef = database.collection('employees')

        const response = await employeeRef.get()
        let responseArray = []

        response.forEach((result) => {
            responseArray.push({ ...result.data(), id: result.id })
        })

        res.render('index',responseArray)
        // res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }

})

app.get('/list', async (req, res, next) => {
    try {
        const employeeRef = database.collection('employees')

        const response = await employeeRef.get()
        let responseArray = []

        response.forEach((result) => {
            responseArray.push({ ...result.data(), id: result.id })
        })

        res.render('index',{title:'home',responseArray})
        // res.send(response);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }

})


//delete record

app.delete('/delete/:id', async (req, res, next) => {
    try {
        const response = database.collection('employees').doc(req.params.id).delete()
        console.log("employee is deleted");
        res.status(200).send("employee is deleted");

    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
})

//update record

// app.put('/update/:id', async (req, res, next) => {

//     const id = req.params.id; 
//     const updateRecord = {
//         nameSurname: req.body.nameSurname,
//         idNumber: req.body.idNumber,
//         email: req.body.email,
//         phoneNumber: req.body.phoneNumber,
//         position: req.body.position
//     }

//     database.collection('employees').doc(id).update(updateRecord).then(() => {
//         console.log(" Record updated");
//         res.send(" Record updated")
//     })
//         .catch((error) => {
//             console.error(error);
//             res.status(500).send("An error occurred");
//         })
// })

app.put('/update/:id', async (req, res, next) => {
    const id = req.params.id;
    const updateRecord = {
      nameSurname: req.body.nameSurname,
      idNumber: req.body.idNumber,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      position: req.body.position
    }
  
    // Validate the required fields
    if (
      !updateRecord.nameSurname || '',
      !updateRecord.idNumber || '',
      !updateRecord.email || '',
      !updateRecord.phoneNumber || '',
      !updateRecord.position || ''
    ) {
      res.status(400).send("Missing required fields");
      return;
    }
  
    // Update the Firestore document
    try {
      await database.collection('employees').doc(id).update(updateRecord);
      console.log("Record updated");
      res.send("Record updated");
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  });


app.listen(3000)