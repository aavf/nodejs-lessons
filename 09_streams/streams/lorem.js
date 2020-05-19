const fs = require('fs');

var str = "";

for(var i=0; i<= 1000000; i++) {
  str += 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n';
}

fs.writeFile('./input3.txt', str, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});