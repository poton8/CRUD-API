var fs = require('fs')
var data = JSON.parse(fs.readFileSync('FakeData.json'))
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var uuidv4 = require('uuid/v4')
employees = data.employees

//Show server is running
app.listen(3000, function listening(){
    console.log("listening")
    console.log("hi")
})

//uses the html document inside the folder "Website"
app.use(express.static('Website'))
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));


//Reads all employees
app.get('/employees', (request, response)=>{
    response.send(employees)
})

//Query for word in JSON file
app.get('/employees/:uuid', (request, response)=>{
    uuid = request.params.uuid
    var found = employees.find(element =>{
        return element.uuid == uuid
    })
    response.send(found)
})

//Create new employee
app.post('/employees', (request, response) =>{
    const id = uuidv4()
    const employee = {
        uuid: id,
        name: request.body.name
    }    
    employees.push(employee)
    response.send(employee)
})

//update employee
app.put('/employees/:uuid', (request, response) =>{
    uuid = request.params.uuid
    var found = employees.find(element =>{
        return element.uuid == uuid
    })
    if(found){

    }
})