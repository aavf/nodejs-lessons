var arrayUtils = {
    isEmpty: function (array){
      if(array.length)
        return false;
      else
        return true;
    },
    max: function (array){
      if (!array.length)
        return 'erro: vazio';
      let max = array[0];
      array.forEach(element => {
        if(element > max)
          max = element;
      });
      return max;
    },
    min: function (array){
      if (!array.length)
        return 'erro: vazio';
      let min = array[0];
      array.forEach(element => {
        if(element < min)
          min = element;
      });
      return min;
    },
    average: function (array){
      if (!array.length)
        return 'erro: vazio';
      let total = 0
      array.forEach(function(item){
          total += item;
      });
      var avg = total / array.length;
      //console.log('avg:', );
      return avg;
    },
    indexOf: function (array, value){
      if (!array.length)
        return 'erro: vazio';
      let index = 'nao existe o valor';
      for(i=0; i<array.length; i++){
        if(array[i] == value)
          index = i;
      }
      return index
    },
    subArray: function (array, startIndex, endIndex){
      if (!array.length)
        return 'erro: vazio';
      let sub = [];
      let endI = endIndex;
      if(endI > array.length-1)
        endI=array.length-1
      for(i=startIndex; i<=endI; i++)
        sub.push(array[i]);
      return sub;
    },
    subArray2: function (array, startIndex, endIndex){
      if (!array.length)
        return 'erro: vazio';
      return array.slice(startIndex, endIndex);
    },
    isSameLength: function (a1, a2){
      if (a1.length == a2.length)
        return true;
      else
        return false;
    },
    reverse: function (array){
      var reverse=[];
      for(i=array.length-1; i>=0; i--)
        reverse.push(array[i]);
      return reverse;
    },
    swap: function (array, index1, index2){
      if (!array.length)
        return 'erro: vazio';
      let index1Val = array[index1];
      array[index1] = array[index2];
      array[index2] = index1Val;
      return array;
    },
    contains: function (array, value){
      if (!array.length)
        return 'erro: vazio';
      for(i=0; i<array.length; i++){
        if(array[i] == value)
          return true
      }
      return false
    },
    concatenate: function (a1, a2){
      let a = a1;
      a2.forEach(element => {
        a.push(element);
      });
      return a;
    },
    concatenate2: function (a1, a2){
      return [...a1,...a2];
    }
};

module.exports = arrayUtils