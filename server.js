var express = require('express'), app = express(), server = require('http').createServer(app), io = require('socket.io').listen(server);
var myApp = require('./myApp.js');

var port = 8777;
var previous = '';

server.listen(port);
console.log('Started at port : ' + port);

var myAppClass = new myApp();

myAppClass.initialize();
myAppClass.registerPIREvents();

io.sockets.on('connection',function (socket) {
    console.log('Connected!');

    myAppClass.setSocketVar(socket);

    socket.on('send command',function (data) {

        if(previous == '' || (previous != data['action'] || previous == 'end')) {
            console.log('Received Data : ' + data['action']);
            myAppClass.main(data['action']);
        }

        previous = data['action'];

    });
});


// Routes and static files

app.get('/',function (req, res) {

    res.sendFile(__dirname + '/index.html');

});

app.get('/js/jquery-3.2.1.min.js',function (req, res) {

    res.sendFile(__dirname + '/js/jquery-3.2.1.min.js');

});

app.get('/js/socket.io.slim.js',function (req, res) {

    res.sendFile(__dirname + '/js/socket.io.slim.js');

});

app.get('/js/jsmpeg.min.js',function (req, res) {

    res.sendFile(__dirname + '/js/jsmpeg.min.js');

});

app.get('/js/nipplejs.min.js',function (req, res) {

    res.sendFile(__dirname + '/node_modules/nipplejs/dist/nipplejs.min.js');

});





