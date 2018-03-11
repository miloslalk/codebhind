/**
 * Assignment
 * The server file
 *
 * @author: Milos Lalkovic
 * @version: 0.0.1
 */
var express     = require('express'); 
var http        = require('http'); 
var ent         = require('ent'); 

var application = express(); 
var server      = http.createServer(application); 

var socketio    = require('socket.io').listen(server); 

var todolist    = []; 
var index;

application.use(express.static('public'))

.get('/assignment', function(request, response)
{
    response.sendFile(__dirname + '/views/index.html');
})

.use(function(request, response, next)
{
    response.redirect('/assignment');
});

socketio.sockets.on('connection', function(socket)
{
    socket.emit('updateTask', todolist);

    socket.on('addTask', function(data)
    {
       todolist.push(data); 
       index = todolist.length - 1;
       socket.broadcast.emit('addTask', { grocery: data.grocery, quant: data.quant, index:index });
    });

    // Delete grocerys
    socket.on('deleteTask', function(index)
    {
        // Deletes grocery from the server todolist array
        todolist.splice(index, 1);

        // Updates groceries of all users in real-time - refresh index
        socketio.sockets.emit('updateTask', todolist);
    });
});

server.listen(8080);
