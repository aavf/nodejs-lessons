function started(){
  console.log('Started Download');
}

function update(){
  for(i=0; i<=100; i++)
    console.log(i+'% of download');
}

function completed(){
  console.log('Finish Download');
}

function performDownload(fn1, fn2, fn3){
  fn1();
  fn2();
  fn3();
}

//performDownload(started, update, completed);


var myArrayUtilsModule = require('./ArrayUtils.js');

console.log('vazio, true:', myArrayUtilsModule.isEmpty([]));
console.log('vazio, false:', myArrayUtilsModule.isEmpty([1,2]));

console.log('max, 10:', myArrayUtilsModule.max([1,10,2]));
console.log('max, vazio:', myArrayUtilsModule.max([]));

console.log('avg:', myArrayUtilsModule.average([1,10,2]));
console.log('avg, vazio:', myArrayUtilsModule.average([]));

console.log('index:', myArrayUtilsModule.indexOf([1,10,2], 2));
console.log('index, vazio:', myArrayUtilsModule.indexOf([], 2));

console.log('index:', myArrayUtilsModule.isSameLength([1,10,2], 2));
console.log('index, vazio:', myArrayUtilsModule.indexOf([], 2));

console.log('subArray:', myArrayUtilsModule.subArray([1,10,2], 1, 3));
console.log('subArray:', myArrayUtilsModule.subArray([1,10,2], 2, 4 ));

console.log('isSameLength, false:', myArrayUtilsModule.isSameLength([1,10,2], [2,3]));
console.log('isSameLength, true: ', myArrayUtilsModule.isSameLength([1,10], [2,3]));
console.log('isSameLength, vazio:', myArrayUtilsModule.isSameLength([], []));

console.log('reverse:', myArrayUtilsModule.reverse([1,10,2]));
console.log('reverse, vazio:', myArrayUtilsModule.reverse([]));

console.log('swap:', myArrayUtilsModule.swap([1,10,2], 1, 2));
console.log('swap, vazio:', myArrayUtilsModule.swap([], 1, 2));

console.log('contains, true:', myArrayUtilsModule.contains([1,10,2], 10));
console.log('contains, false:', myArrayUtilsModule.contains([2,9], 11));
console.log('contains, vazio:', myArrayUtilsModule.contains([], 2));

console.log('concatenate:', myArrayUtilsModule.concatenate([2,9], [11, 19]));
console.log('concatenate, vazio:', myArrayUtilsModule.concatenate([], []));
