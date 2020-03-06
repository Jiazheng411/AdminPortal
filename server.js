var express = require("express");
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "escdb"
})

 //use the application off of express.
 var app = express();
 
 //define the route for "/"
 app.get("/", function (request, response){
     response.sendFile(__dirname+"/views/index.html");
 });
 
 app.get("/addagent", function (request, response){
     var firstname = request.query.firstname;
     var rainbowID = request.query.rainbowID;
     var chinese = request.query.language1;
     var english = request.query.language2;
     var skill1 = request.query.skill1;
     var skill2 = request.query.skill2;
     console.log(request.query);

     var cn = 0;
     if(chinese == 'chinese'){
         cn = 1;
     }
     var eng = 0;
     if(english == 'english'){
         eng = 1;
     }

     var skil1 = 0;
     if(skill1 == 'skill1'){
         skil1 = 1;
     }
     var skil2 = 0;
     if(skill2 == 'skill2'){
         skil2 = 1;
     }
    
     console.log(cn);
     console.log(eng);
     console.log(skil1);
     console.log(skil2);

     con.connect(function(err){
        if(err) throw err;
        console.log("Connected");
        var sql = "INSERT INTO agents (name, rainbowID, chinese, english, skill1, skill2) VALUES ?";
        var values = [
            [firstname, rainbowID, cn, eng, skil1, skil2]
        ]
        con.query(sql, [values], function(err,result){
            if(err) throw err;
            console.log(result)});
    });
 
     if (firstname != "" ) {
         response.send("agent has been added");
     } else {
         response.send("Please provide us first name");
     }

 });
 
 //start the server
 app.listen(8080);
 
 console.log("Something awesome to happen at http://localhost:8080");