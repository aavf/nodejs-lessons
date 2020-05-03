var student1 = new Object();
student1.number = 1;
student1.note = 14;

var studentList = [];
studentList.push(student1);

var student2 = new Object();
student2.number = 2;
student2.note = 8;
studentList.push(student2);

var student3 = new Object();
student3.number = 3;
student3.note = 20;
studentList.push(student3);

function list(){
    var list = [];
    for(i=0; i < studentList.length; i++)
        list.push(studentList[i].note);

    return list;
}

function best(studentList){
    var res=studentList[0].note;
    studentList.forEach(function(item){
      if(item.note > res)
        res=item.note;
    });
    return res;
}

function worst(){
    var res=studentList[0].note;
    studentList.forEach((item) => {
      if(item.note < res)
        res=item.note;
    });
    return res;
}

function avg(){
    var total = 0
    studentList.forEach(function(item){
        total += item.note;
    });
    var avg = total / studentList.length;
    console.log('avg:', avg);
    
    var closestStudent = studentList[0].note - avg;
    var res=studentList[0].note;
    studentList.forEach((item) => {
        if(Math.abs(item.note - avg) < closestStudent)
            res=item;
    });
    return res;
}

function reproved(){
  var res=[];
  studentList.forEach((item) => {
    if(item.note < 10)
      res.push(item);
  });
  return res.length;
}

function aproved(){
  var res=[];
  studentList.forEach((item) => {
    if(item.note >= 10)
      res.push(item);
  });
  return res.length;
}

function processNotes(option){
    switch (option) {
        case 'a':
          console.log('Lista: ', list());
          break;
        case 'b':
          console.log('Melhor nota : ', best(studentList));
          break;
        case 'c':
          console.log('Pior nota : ', worst());
          break;
        case 'd':
          console.log('Nota média : ', avg());
          break;
        case 'e':
          console.log('Notas Negativas : ', reproved());
          break;
        case 'f':
          console.log('Notas Positivas : ', aproved());
          break;
        default:
          console.log('Sorry, no ' + option + ' option.');
      }
};

processNotes('a');
processNotes('b');
processNotes('c');
processNotes('d');
processNotes('e');
processNotes('f');
processNotes('p');