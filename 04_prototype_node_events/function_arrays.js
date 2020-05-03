// 4.
var arr = [];

arr.push(function(){
    console.log("Hello World 1");
});

arr.push(function(){
    console.log("Hello World 2");
});

arr.push(function(){
    console.log("Hello World 3");
});
/*
for(var i = 0; i < arr.length; i++){
    arr[i]();
}
OU
arr.forEach(function(element){
    element();
});
OU */
arr.forEach(element => {
    element();
});