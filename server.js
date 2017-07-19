var unirest = require('unirest');
var port=3030;
var express=require('express');
var app=express();
app.get('/api1',function(req,res){
unirest.post('http://localhost:3000/api')
.end(function (response) {
  console.log(response);
})
})
app.listen(port);