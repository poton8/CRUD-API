var fs = require('fs');
var data = JSON.parse(fs.readFileSync('FakeData.json'));
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var uuidv4 = require('uuid/v4');

//Show server is running
app.listen(3000, function listening(){
    console.log("listening");
})

//uses the html document inside the folder "Website" and bodyParser for json data
app.use(express.static('Website'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header({"Access-Control-Allow-Origin": "http://localhost:3001",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, OPTIONS"
               })
    next();
  });


//Reads all employees
app.get('/employees', (request, response)=>{
    response.send(data);
})

//Query for word in JSON file
app.get('/employees/:uuid', (request, response)=>{
    uuid = request.params.uuid;
    var found = data.employees.find(element =>{
        return element.uuid == uuid;
    })
    response.send(found);
})

//Create new employee
app.post('/employees', (request, response) =>{
    const id = uuidv4();
    const employee = {
        uuid: id,
        name: request.body.name
    }    
    data.employees.push(employee);
    response.send(employee);
    writeFile();
})

//update employee
app.put('/employees/:uuid', (request, response) =>{
    uuid = request.params.uuid;
    console.log(request.body);
    var foundIndex = data.employees.findIndex(element =>{
        return element.uuid == uuid;
    })

    if(foundIndex != null){
        data.employees[foundIndex].name = request.body.name;
        response.send(data.employees[foundIndex]);
        writeFile();
    }
    else{
        response.send("employee not found");
    }
})

//delete employee
app.delete('/employees/:uuid', (request, response) =>{
    uuid = request.params.uuid;
    var foundIndex = data.employees.findIndex(element =>{
        return element.uuid == uuid;
    })
    console.log(foundIndex);
    
    if(foundIndex != null){
        data.employees.splice(foundIndex,1)
        response.send("employee has been deleted");
        writeFile();
    }
    else{
        console.log("employee not found");
    }
})

//overwrites JSON file
function writeFile(){
    fs.writeFile("FakeData.json",JSON.stringify(data,null,2),(err) =>{
        console.log("finished");
    })
}