var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var myApp = require('./myApp.js');

var port = 8777;
var previous = '';

server.listen(port);
console.log('Started at port : ' + port);

app.get('/',function (req, res) {

    res.sendFile(__dirname + '/index.html');

});

io.sockets.on('connection',function (socket) {
    console.log('Connected!');

    myApp.setIoVar(socket);

    socket.on('send command',function (data) {

        if(previous == '' || (previous != data['action'] || previous == 'end')) {
            console.log('Received Data : ' + data['action']);
            myApp.main(data['action']);
        }

        previous = data['action'];

    });
});

app.get('/js/jquery-3.2.1.min.js',function (req, res) {

    res.sendFile(__dirname + '/js/jquery-3.2.1.min.js');

});

app.get('/js/socket.io.slim.js',function (req, res) {

    res.sendFile(__dirname + '/js/socket.io.slim.js');

});

app.get('/js/nipplejs.min.js',function (req, res) {

    res.sendFile(__dirname + '/node_modules/nipplejs/dist/nipplejs.min.js');

});





