// include our model
const Person = require('../sequelize').Person;

exports.getAllPerson = function (request, response, next) {
  Person.findAll()
    .then(persons => {
      //console.log("All persons:", JSON.stringify(persons, null, 2));
      response.send(persons);
    });
}

exports.createPerson = function (request, response) {
  Person.create(request.body)
    .then(newPerson => {
      console.log("New person auto-generated ID:", newPerson.id);
      response.send("ID inserted: " + newPerson.id);
    });
}
// ALTERNATIVA: para caso de nomes diferentes no cliente
exports.createPersonAlt = function (request, response) {
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
}

exports.deletePerson = function (request, response) {
  Person.destroy({
    where: {
      id: request.params.id
    }
  }).then(result => {
    console.log(result);
    if (result == 0) {
      response.status(404).send("Cannot find id");
    }
    else {
      response.send("Number of deleted instances: " + result);
    }
  })
}

exports.getPersonById = function (request, response) {
  Person.findByPk(request.params.id).then(person => {
    // person will be an instance of Person and stores the content of the table entry
    // if such an entry is not defined you will get null
    console.log(person.dataValues);
    if (person)
      response.send(person);
    else
      response.send('o id nao existe');
  })
}

exports.getPersonByProfessionAndAge = function (request, response) {
  Person.findAll({
    where: {
      profession: request.params.profession,
      age: request.params.age
    }
  }).then(result => {
    if (result == 0) {
      response.status(404).send("Cannot find id with profession");
    }
    else {
      response.send(result);
    }
  });
}

exports.updatePerson = function (request, response) {
  Person.update(request.body, {
    where: {
      id: request.params.id
    }
  }).then(result => {
    if (result == 0) {
      response.send("Cannot find id");
    }
    else {
      Person.findAll({
        where: {
          id: request.params.id
        }
      }).then(result => {
        response.send(result);
      });
    }
  });
}