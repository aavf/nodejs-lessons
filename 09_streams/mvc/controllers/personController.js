const mysql = require('mysql')

// MySQL connection
var connection = mysql.createConnection({
  host: '127.0.0.1', // ou localhost
  user: 'uma',
  password: 'uma+disc',
  database: 'personsdb',
  port: '8889'
});
console.log("MySQL connection created at %s with database: %s", connection.config.host, connection.config.database);

exports.person_detail = function (req, res, next) {
  var userId = req.params.id;
  var query = 'SELECT * FROM persons WHERE id = ?';
  connection.query(query, userId, function (err, result, fields) {
      if (err) throw err;       
      res.render('person.ejs', { title: 'Person Detail', person: result[0]});                
     //res.send(result[0]);
  });
};

// Display list of all Persons.
exports.person_list = function (req, res, next) {
  connection.query('SELECT * FROM persons;', function (err, result, fields) {
      if (err) {
          console.log("error: ", err);
          res.send(err, null);
      }
      else {
          res.send(result);           
      }
  });
};
