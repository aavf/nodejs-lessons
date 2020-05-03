// import modules
const express = require('express');
const mysql = require('mysql')

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

// MySQL connection
var connection = mysql.createConnection({
     host: '127.0.0.1', // ou localhost
     user: 'root',
     password: '',
     database: 'personsdb',
});
console.log("MySQL connection created at %s with database: %s", connection.config.host, connection.config.database);


// 1. GET request to list all the users from the database
app.get('/persons', function (request, response) {
    connection.query('SELECT * FROM persons;', function (err, result, fields) {
        if (err) throw err;
        response.send(result);
    });
});

// 2. 
app.post('/persons', function (request, response) {
    var query = 'INSERT INTO persons set ?';
    var values = request.body;
    connection.query(query, values, function (err, result) {
        if (err) throw err;
        console.log(result);
        response.send("" + result.insertId);
    });
});

// 3. 
app.delete('/persons', function (request, response) {
    var query = "DELETE FROM persons WHERE id = ?"; // OU 'DELETE FROM persons WHERE ?'
    var userId = request.body.id;
    connection.query(query, userId, function (err, result) {
        if (err) throw err;
        console.log(result);
        if(result.affectedRows == 0)
            response.send('o id nao existe');
        else
            response.send("Number of records deleted: " + result.affectedRows);
    });
});

// 4.  
app.get('/persons/:id', function (request, response) {
    var query = 'SELECT * FROM persons WHERE id = ?';
    connection.query(query, request.params.id, function (err, result) {
        if (err) throw err;
        if(result == '')
            response.send('o id nao existe');
        else
            response.send(result);
    });
});

// 5. 
app.get('/persons/:age/:profession', function (request, response) {
    var age = request.params.age;
    var profession = request.params.profession;    
    var query = 'SELECT * FROM persons WHERE age = ? AND profession = ?';
    connection.query(query, [age, profession], function (err, result) {
        if (err) throw err;
        if(result == '')
            response.send('nao existem entradas');
        else
            response.send(result);
    });
});
