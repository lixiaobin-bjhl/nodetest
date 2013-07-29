var express = require('express'),
	app = express(),
	io = require('socket.io');
var http = require('http').createServer(app).listen('8080');
var socket = io.listen(http).sockets;
var MongoClient = require('mongodb').MongoClient,
	format = require('util').format;    

MongoClient.connect('mongodb://127.0.0.1:27017/test',function(err,db){
	if (err) throw err;
	var collection = db.collection('user'); 
	collection.find().toArray(function(err,results){
		console.log(results);
	});

	// collection.insert({"name":"chenfan"},function(){

	// });""
});

var userinfo = {
	"name":"xiaobin",
	"age":27	
}
app.use(express.static(__dirname + '/static'));
app.engine('.html', require('ejs').renderFile);
app.set('views', __dirname + '/');
app.set('view engine', 'ejs');



socket.on('connection',function(socket){
	socket.emit('init',{});
	socket.on('message',function(e){
		console.log(e);
	});




});


app.get('/', function(req, res){
  res.render('index.html',{"userinfo":userinfo});
});

app.get('/user/:id',function(req,res){
	res.send('user'+req.params.id);
})

