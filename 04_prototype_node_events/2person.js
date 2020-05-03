var personObjLit = {
	firstName: "",
	lastName: "",
}

Person.prototype.greet = function() {
	console.log(" Hello " + this.firstName + " " + this.lastName + ", Age: " + this.age);
}

Person.prototype.age = null;

var john = Object.create(personObjLit) ;
john.firstName = "John";
john.lastName = "Doe";
john.age = 24;

var jane = Object.create(personObjLit) ;
jane.firstName = "Jane";
jane.lastName = "Doe";
jane.age = 26;


console.log(john.__proto__);
console.log(jane.__proto__);
console.log(john.__proto__ === jane.__proto__);
