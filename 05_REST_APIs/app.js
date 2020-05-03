// import express module
const express = require('express')
// import file system module
const fs = require('fs');
// import uuid
const { v4: uuidv4 } = require('uuid');
// exemplo como gerar uuid
var uuid = uuidv4();

const app = express()
const port = 3000

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})

app.get('/', (req, res) => res.send('Hello World!'))


// function to load file
function readFile(fileName){
    var file = fs.readFileSync(fileName);    
    return file;
}

// GET request to list all the persons from the file
app.get('/persons', function (request, response) {  
    var file = readFile('./persons.json');
    //console.log(file);
    response.send(file);
});

// ADD
app.post('/persons', function (request, response) {
    var file = readFile('./persons.json');
    var jsonData = JSON.parse(file);
        
    var keys = Object.keys(jsonData);
    var obj_length = keys.length;
    console.log("Data in body, request:", request.body);

    obj_length++;
    
    jsonData['person' + obj_length] = request.body;
    jsonData['person' + obj_length].id = obj_length;

    response.send(jsonData);
});

// GET one
app.get('/persons/:id', function(request, response){
    var file = readFile('./persons.json');
    var jsonData = JSON.parse(file);

    for (person in jsonData){
        //console.log(jsonData[person]);
        if(jsonData[person].id == request.params.id)
            response.send(jsonData[person]);   
    }
});

app.delete('/persons/:id', function(request, response) {
    var file = readFile('./persons.json');
    var jsonData = JSON.parse(file);
    var id = request.params.id;

    for (person in jsonData) {
        if (jsonData[person].id == id) {
            delete jsonData[person];
            response.send(jsonData);
        }
    }
})

// EXEMPLOS EXTRA
// get geral sobre profissoes
app.get('/professions', function(request, response) {
});

app.get('/persons/:id/profession', function(request, response) {
});
app.post('/persons/:id/age/increment', function(request, response){
    response.send('fazer code increment');
});



// ADD simple
app.post('/persons-alt', function (request, response) {
    var file = readFile('./persons.json');
    var jsonData = JSON.parse(file);
        
    jsonData['newPerson'] = request.body;

    response.send(jsonData);
});


// ALTERNATIVAS: nao tao robustos como anteriores
app.get('/persons-alt/:id', function(request, response){
    console.log("Id in params");
    var file = readFile('./persons.json');
    var jsonData = JSON.parse(file);
    var user = jsonData["person" + request.params.id];    
    response.send(JSON.stringify(user));
});

app.delete('/persons-alt/:id', function (request, response) {
    var file = readFile('./persons.json');
    var jsonData = JSON.parse(file);
    var id = request.params.id;
    console.log(id);
    delete jsonData["person" + id];
    response.send( JSON.stringify(jsonData));
});