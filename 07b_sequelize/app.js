// import modules
const express = require('express');
const models = require('./models');
const Person = models.Person;

// create express instance
const app = express();
const port = 3000

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})

// 1. GET request to list all the users from the database
app.post('/persons', function (request, response) {
    Person.create(request.body).then(newPerson => {
        console.log("New person auto-generated ID:", newPerson.id);
        response.send(newPerson);
    });
});
// 1. ALTERNATIVO
app.post('/persons-alt', function (request, response) {
    const personData = {
        firstname: request.body.firstname, 
        lastname: request.body.lastname, 
        profession: request.body.profession, 
        age: request.body.age
    };
    Person.create(personData).then(newPerson => {
        console.log("New person auto-generated ID:", newPerson.id);
        response.send(newPerson);
    });
});

// 2. 
app.get('/persons', function (request, response) {
    Person.findAll().then(persons => {
        console.log(persons);
        //console.log("All persons:", JSON.stringify(persons, null, 2));
        response.send(persons);
    });
});

// 3. 
app.delete('/persons/:id', function (request, response) {
    Person.destroy({
        where: {
            id: request.params.id
        }
    }).then((result) => {
        console.log(result);
        if(result == 0)
            response.send('o id nao existe');
        else
            response.send("Number of records deleted: " + result);
    });
});

// 4. 
app.get('/persons/:id', function (request, response) {
    Person.findByPk(request.params.id).then(person => {
        // person will be an instance of Person and stores the content of the table entry
        // if such an entry is not defined you will get null
        console.log(person.dataValues);
        if(person)
            response.send(person);
        else
            response.send('o id nao existe');
    })
});

// 5. 
app.get('/persons/:age/:profession', function (request, response) {
    Person.findAll({
        where: {
            profession: request.params.profession,
            age: request.params.age
        }
    }).then(persons => {
        console.log(persons.dataValues);
        console.log("persons:", JSON.stringify(persons, null, 2));
        if(persons == '')
            response.send('nao existem entradas');
        else
            response.send(persons);
    });
});
