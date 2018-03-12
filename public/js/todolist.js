/**
 * Assignment
 * The client file
 *
 * @author: Milos Lalkovic
 * @version: 0.0.1
 */
var socket = io.connect('http://localhost:8080');

socket.on('updateTask', function(todolist) {
    $('#todolist').empty();
    todolist.forEach(function(grocery, quant, index) {
        insertTask(grocery, quant, index);
    });
});

$('#todolistForm').submit(function ()
{
    var grocery = $('#grocery').val(); 
	var quant = $('#quant').val();
    socket.emit('addTask', { grocery: grocery, quant: quant }); 
    insertTask({ grocery, quant, index });
    $('#grocery').val('').focus()
	$('#quant').val('').focus();
    return false; 
});

socket.on('addTask', function(data) {
    insertTask(data);
});

/**
 * Add grocery in the page
 *
 * @param {int} index
 * @param {string} grocery
 * @param {int} quant
 */
function insertTask(data)
{
    console.log(data);
    $('#todolist').append('<li>'+ data.grocery  + ' ' + data.quant +' ' + " " +'<a class="delete" href="#" data-index="' + data.index + '"><button type="submit">X</button></a></li>');
}

$('body').on('click', '.delete', function()
{
    socket.emit('deleteTask', $(this).data('index'));
});
