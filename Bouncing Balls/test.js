var fs = require('fs');
var scores = [];
fs.readFile("scores.json", (err, data) => {
    if(err){try{throw err;} catch{console.log(err);}}
    scores = JSON.parse(data);
});
var contains = true;

var name = "";

function sort(){ //Sorts in ascending order.  
    for(var i=0;i<scores.length-1;i++){
      var pos = i;
      for(var j=i+1; j<scores.length;j++){
        if(scores[j].score < scores[pos].score){pos = j;}
      }
      let temp = scores[i];
      scores[i] = scores[pos];
      scores[pos] = temp;
    }
  }
  
  function isSorted(){ //Checks whether scores[] array is sorted or not
    let sorted = true;
    for(var i=0;i<scores.length-1;i++){
      if(scores[i].score > scores[i+1].score){sorted = false; break;}
    }
    return sorted;
  }
  
/*  function updateScores(){
    if(!isSorted()){
      sort();
      var s = JSON.stringify(scores);
      fs.writeFile("f.json", s, (err)=>{console.log(err);});
    }
  } */
  
  function containsUser(st){ return JSON.stringify(scores).includes(st); }

  function won(){
    if(contains===false){ scores.push({"name":name, "score":time}); } //New user
    else { //Existing user
        for(var p=0; p < scores.length; p++){ //Finds existing user and updates values
            if(scores[p].name === name){scores[p].score = time;}
        }
    }
    sort();
    //para.textContent = "You win!"; /////////////
    console.log("scores: "+scores);
}

console.log(scores);