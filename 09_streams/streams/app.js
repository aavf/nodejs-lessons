var fs = require('fs');
var zlib = require('zlib');

var hrstart = process.hrtime()

function readFile() {
  fs.readFile('./big.txt', (err, data) => {
    if (err) throw err;
    console.log("Completed Async");

    hrend = process.hrtime(hrstart)
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
  });

  console.log("test");
}
readFile();

// STREAMS
var readable = fs.createReadStream('big.txt');
var writeable = fs.createWriteStream('big_copy.txt');

function manageStream() {
  readable.on('data', function (chunk) {
    //console.log(chunk);
    writeable.write(chunk);
  });

  readable.on('end', function () {
    console.log("Completed Stream");
    writeable.end();

    hrend = process.hrtime(hrstart)  
    console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
  });
  
  console.log("test");
}
//manageStream();
 
// PIPES: Copy data using pipe function
//readable.pipe(writeable);
 
var gzip = zlib.createGzip();
var compressed = fs.createWriteStream('big.txt.gz');

// chain methods with piping
// 1 - readable pipe to gzip
// 2 - pipe compressed data to a file
readable.pipe(gzip).pipe(compressed);
