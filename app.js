var express=require('express');
var unirest = require('unirest');
var app=express();
//var parser = require('xml2json')
var bodyParser = require('body-parser');
var port=3000;
var jsonxml = require('jsontoxml');
//var formurlencoded = require('form-urlencoded');
//var xform = require('x-www-form-urlencode')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var raq = require("redis-as-queue");

var normalQueue = new raq.NormalQueue("myqueue", 6379, '127.0.0.1');




app.post('/api',function(req,res){
	
	
	var json={
		"from":"",
		"to":"abc",
		"sub":"hai",
		"msg":"hello",
		//"originalXml" : "<person> <firstName>Henrik</firstName><lastName>Ingo</lastName><height unit=\"cm\">183</height><age>36</age><shoeSize unit=\"EU\">44</shoeSize> </person>"

	}
	//console.log(json);
	res.send(json)
	
})

app.post('/api1',function(req,res){
	
	var json={
		"sSessionId":"",
		"sPayload":"abc",
		"subject":"hai",
		"sOutput":"hello",
		//"originalXml" : "<person> <firstName>Henrik</firstName><lastName>Ingo</lastName><height unit=\"cm\">183</height><age>36</age><shoeSize unit=\"EU\">44</shoeSize> </person>"              
	}
//console.log(json);
var p= JSON.stringify(json);

normalQueue.push(p, function(err) {
    //console.log(err);
    console.log(p);
	var d=p;
unirest.post('http://localhost:3000/api')
.headers({'Accept': 'application/x-www-url-encoded', 'Content-Type': 'application/x-www-url-encoded'})
.send(d)

.end(function (response) {
	
	if(response.body.msg=="helo"){
  res.send(response);
	}
	else{
		normalQueue.get(function(err, messages) {
    //console.log(err);
	console.log(messages);
    if(messages.length)
		res.send(JSON.parse(messages));
});
	}
})


})
})
app.listen(port,function(){
	console.log("server at 3000");
})