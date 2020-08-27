var http = require('http');
var fs = require('fs');
var path = require('path');

var scores = fs.readFile("scores.json");
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


http.createServer(function (request, response) {
    console.log('request starting...');
    
    var filePath = '.' + request.url;
    if (filePath == './'){ filePath = './index.html'; }

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.json': contentType = 'application/json'; break;
       /* case '.png': contentType = 'image/png'; break;      
        case '.jpg': contentType = 'image/jpg'; break;
        case '.wav': contentType = 'audio/wav'; break; */
    }

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end(); 
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');