// imports
const express = require('express')
const fs = require('fs');

const app = express()
const port = 3000

// a.
app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)

    fs.open('log.txt', 'a', function (err, fd){
        console.log('ficheiro criado');
    });
    // OU alternativa
    fs.appendFile('log2.txt', '', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
})

function writeLog(request, response) {
    // e.
    var logEntry = request.path + ", " + request.method + ", " + new Date() + "\n";
    //fs.appendFile('log.txt', function (err) {
    fs.appendFile('log.txt', logEntry, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

// b.
app.get("/", function (request, response) {
    // e. registar pedido ao servidor no log
    writeLog(request, response);
    // Escrever o cabeçalho
    const body = "Hello World";
    response.writeHead(200, { 
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/plain' 
    });
    response.end(body);
});

// c.
app.get("/html", function (request, response) {
    // e. registar pedido ao servidor no log
    writeLog(request, response);
    response.writeHead(200, { 'Content-Type': 'text/html' });

    var html = fs.readFileSync("./index.html", 'utf-8');
    html = html.replace('{Message}', new Date());
    response.end(html);
});

// d.
app.get("/user/:name", function (request, response) {
    writeLog(request, response);
    response.writeHead(200, { 'Content-Type': 'text/html' });

    var html = fs.readFileSync("./index.html", 'utf-8');
    html = html.replace('{Message}', request.params.name);
    response.end(html);
});

// f.
app.get("/log", function (request, response) {
    var file = fs.readFileSync("./log.txt", "utf-8");
    response.end(file);
});

// g.
app.get("/log.txt", function (request, response) {
    response.download("./log.txt");
});

// h.
app.delete("/clear", function (request, response) {
    fs.unlinkSync("./log.txt");
    response.end("Log File deleted");
});
