// 1
function imc(weight, height) {
    return weight / (height ** 2);
}
console.log('1. imc:', imc(75, 1.85));

// 2
function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}
console.log(reverseString('Hoje e Domingo'));

// 3
function vowel_count(str1) {
    var vowel_list = 'aeiouAEIOU';
    var vcount = 0;

    for (var x = 0; x < str1.length; x++) {
        if (vowel_list.indexOf(str1[x]) >= 0) {
            vcount += 1;
        }
    }
    return vcount;
}
console.log(vowel_count("this is a string"));


// 5
function diff_hours(dt1, dt2) {
    return dt2.getHours() - dt1.getHours();
}
dt1 = new Date("October 13, 2014 08:00:00");
dt2 = new Date("October 13, 2014 17:00:00");
console.log(diff_hours(dt1, dt2));

// 6
function rect(width, height){
    for(i=1; i<=height; i++) {
        var line=''
        for(y=1; y<=width; y++) {
            line+='*';
        }
        console.log(line);
    }
}
rect(20, 10);

// 7
function tri(height){
    for(i=1; i<=height; i++) {
        var line=''
        for(y=1; y<=i; y++) {
            line+='*';
        }
        console.log(line);
    }
}
tri(10);

// 8
function quad(side){
    for(i=1; i<=side; i++) {
        var line='';
        for(y=1; y<=side; y++) {
            if (i==1 || i==10)
                line+='*';
            else { 
                if (y==1 || y==10)
                    line+='*';
                else
                    line+=" ";
            }
        }
        console.log(line);
    }
}
quad(10);

// 9