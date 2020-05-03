// 2
var personObjLit = {
    firstName: "James",
    lastName: "Bond",
    age: 45,
    gender: "M",
}
console.log(JSON.stringify(personObjLit));

var json = '{"firstName":"James","lastName":"Bond","age":45,"gender":"M"}';
console.log(JSON.parse(json));


// 5. f
var Emitter = require("./emitter");
//var Emitter = require("events");
var eventConstants = require('./config');
var emtr = new Emitter();

emtr.on(eventConstants.events.FILESAVED, function(){
    console.log("A file was saved 1");
});

emtr.on(eventConstants.events.FILESAVED, function(){
    console.log("A file was saved 2");
});

// i.
emtr.on(eventConstants.events.GREET, function(){
  console.log("Hello");
});

// Invocar todas as funções que foram adicionadas com o tipo greet
emtr.emit(eventConstants.events.FILESAVED);
emtr.emit(eventConstants.events.GREET);


