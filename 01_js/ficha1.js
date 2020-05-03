var x=1, y=2;
console.log(x + y);

// 5
function average(note1, note2) {
  return (note1+note2)/2;
}
console.log('5. avg:', average(14,12));

// 7
/* function operation(n1, n2, operator) {
  return n1+operator+n2;
}
console.log('7. ope:', operation(14,12, '+'));
 */
// 7
function mult() {
  count=1;
  mul=5;
  console.log('8. mult:');
  while(mul<15){
      mul=5*count;
      console.log(mul);
      count++;
  }
}
mult();

// 8
function sum100() {
  var res=0;
  for(i = 1; i <= 100; i++){
      res+=i;
  }
  return res;
}
console.log('9. sum100:', sum100());

// 9
function factorial(num) {
  var fact = 1;
  for (i = 1; i <= num; i++) {
      fact *= i;
  }
  return fact;
}
console.log('10. fact:', factorial(5));

// 10
function min(seq) {
  var res=seq[0];
  seq.forEach(function(item){
    if(item < res)
      res=item;
  });
  return res;
}
console.log('10.a min:', min([10,3,5]));

function max(seq) {
  var res=seq[0];
  seq.forEach(function(item){
    if(item > res)
      res=item;
  });
  return res;
}
console.log('10.b max:', max([10,3,5]));

function avg(seq) {
  var res=0;
  seq.forEach(function(item){
    res+=item;
  });
  return res / seq.length;
}
console.log('10.c avg:', avg([4,2,6]));