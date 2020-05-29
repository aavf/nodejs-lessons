// import express module
const express = require('express')
// import file system module
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express()
const port = 3000

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})

// function to load file
function readFile(fileName){
    var file = fs.readFileSync(fileName);    
    return file;
}

function myWriteFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

// a. GET request to list all the photos from the file
app.get('/photos', function (request, response) {  
    var file = readFile('./photos.json');
    //console.log(file);
    response.send(file);
});

// b. GET
app.get('/photos/:id', function(request, response){
    var file = readFile('./photos.json');
    var jsonData = JSON.parse(file);

    for (photo in jsonData){
        //console.log(jsonData[person]);
        if(jsonData[photo].id == request.params.id)
            response.send(jsonData[photo]);   
    }
});

// c. ADD
app.post('/photos', function (request, response) {
    var file = readFile('./photos.json');
    var jsonData = JSON.parse(file);
        
    //console.log("Data in body, request:", request.body);
    jsonData['new'] = request.body;
    // gerar uuid
    jsonData['new'].id = uuidv4();
    // write to file
    myWriteFile('./photos.json', JSON.stringify(jsonData, null, 2));
    response.send('Foto adicionada com sucesso');
});


// d.
app.delete('/photos/:id', function(request, response) {
    var file = readFile('./photos.json');
    var jsonData = JSON.parse(file);
    var id = request.params.id;

    for (photo in jsonData) {
        if (jsonData[photo].id == id) {
            delete jsonData[photo];
            // write to file
            myWriteFile('./photos.json', JSON.stringify(jsonData, null, 2));
            response.send('Apagada com Sucesso');
        }
    }
    response.send('Erro ID nao existe');
})

// e.
app.get('/uploader/:name', function(request, response) {
    var file = readFile('./photos.json');
    var jsonData = JSON.parse(file);
    var uploaderName = request.params.name;
    uploaderPhotos = [];

    for (photo in jsonData) {
        if (jsonData[photo].uploader == uploaderName)
            uploaderPhotos.push(jsonData[photo]);
    }            
    response.send(uploaderPhotos);
})

/** PARTE B */
// B a. INCrement
app.post('/photos/:id/likes/increment', function(request, response) {
    var file = readFile('./photos.json');
    var jsonData = JSON.parse(file);

    for (photo in jsonData){
        //console.log(jsonData[person]);
        if(jsonData[photo].id == request.params.id){
            jsonData[photo].likes++;
            response.send(jsonData[photo]);   
        }
    }
});

// B b. with tags
app.get('/tags', function(request, response) {
    var file = readFile('./photos.json');
    var jsonData = JSON.parse(file);
    //console.log("Data in body, request:", request.body.tags);
    withTags = [];

    for (photo in jsonData) {
        request.body.tags.forEach(element => {
            if(jsonData[photo].tags.includes(element))
                withTags.push(jsonData[photo]);
                //break;
        });
    }
    /* request.body.tags.forEach(element => {
        for (photo in jsonData) {
            if(jsonData[photo].tags.includes(element))
                withTags.push(jsonData[photo]);
        }
    });  */
    response.send(withTags);   
});

// B c. DECrement
app.post('/photos/:id/likes/decrement', function(request, response){
    var file = readFile('./photos.json');
    var jsonData = JSON.parse(file);

    for (photo in jsonData){
        //console.log(jsonData[person]);
        if(jsonData[photo].id == request.params.id) {
            jsonData[photo].likes--;
            myWriteFile('./photos.json', JSON.stringify(jsonData));
            response.send(jsonData[photo]);
        }
    }
});

// B d. ADD tags
app.post('/photos/:id', function(request, response) {
    var file = readFile('./photos.json');
    var jsonData = JSON.parse(file);

    for (photo in jsonData) {
        if (jsonData[photo].id == request.params.id) {
            jsonData[photo].tags = jsonData[photo].tags.concat(request.body.tags);
            myWriteFile('./photos.json', JSON.stringify(jsonData));
            response.send(jsonData[photo]);
        }
    }
});

// B e. sorted likes
app.get('/likes', function(request, response) {
    var file = readFile('./photos.json');
    var jsonData = JSON.parse(file);

    console.log("Data in body, request:", jsonData);
    array = toArray(jsonData);
    sorted = array.sort(sortByProperty('likes'));
    response.send(sorted);
});

function toArray(jsObj){
    array = [];
    for(var i in jsObj) {
        array.push(jsObj[i]);
    }
    return array;
}

function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return -1;  
       else if(a[property] < b[property])  
          return 1;  
       return 0;  
    }  
 }