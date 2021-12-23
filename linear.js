var canvas = document.getElementById('mycanvas')
var ctx = canvas.getContext('2d')
ctx.font = "20px Arial";

var arr = [];
// pop(): Remove an item from the end of an array.
// push(): Add items to the end of an array.
// shift(): Remove an item from the beginning of an array.
// unshift(): Add items to the beginning of an array.

var push = document.getElementById('push')
var pop = document.getElementById('pop')
var enqueue = document.getElementById('enqueue')
var dequeue = document.getElementById('dequeue')

push.addEventListener("click", push_tostack);
pop.addEventListener("click", pop_fromstack);
enqueue.addEventListener("click", enqueue_toqueue);
dequeue.addEventListener("click", dequeue_fromqueue);

function push_tostack() {
    var num = document.getElementById('pushvalue').value;
    if (Number.isInteger(parseInt(num))) {
        if (arr.length == 0)
            drawstack();

        arr.unshift(parseInt(num));

        if ((480 - 30 * arr.length) < 100)
            alert("Stack Overflow");
        else
            stackelement();
    }
    else {
        alert("Give appropiate input value");
    }
    document.getElementById('pushvalue').value = '';
    return false;
}

function pop_fromstack() {
    if (arr.length == 0)
        alert("Stack Underflow");
    else {
        ctx.clearRect(399, 479 - 30 * arr.length, 202, 31)
        arr.shift();
        }
}

function enqueue_toqueue() {
    var num = document.getElementById('enqueuevalue').value;
    if (Number.isInteger(parseInt(num))) {
        if (arr.length == 0)
            drawqueue();

        if (120 + 75 * arr.length > 730)
            alert("Queue is full");
        else { 
            arr.push(parseInt(num)); 
            queueelement(parseInt(num));
        }
    }
    else {
        alert("Give appropiate input value");
    }
    document.getElementById('enqueuevalue').value = '';
    return false;
}

function dequeue_fromqueue() {
    if (arr.length == 0)
        alert("Queue is Empty");
    else {
        ctx.clearRect(100, 200, 800, 100);
        arr.shift();
        drawqueue();
        for (var i = 0; i < arr.length; i++)
           {
            ctx.strokeRect(120 + 75 * i, 220, 75, 60);
            ctx.fillText(arr[i], 120 + 75 * i + 20, 250);
           }
    }
}

function drawstack() {
    ctx.beginPath();
    ctx.moveTo(300, 100);
    ctx.lineTo(300, 500);
    ctx.lineTo(700, 500);
    ctx.lineTo(700, 100);
    ctx.stroke();
}

function drawqueue() {
    ctx.strokeRect(100, 200, 800, 100);
}

function queueelement(num) {
    ctx.strokeRect(45 + 75 * arr.length, 220, 75, 60);
    ctx.fillText(num, 45 + 75 * arr.length + 20, 250);
}
function stackelement() {
    ctx.strokeRect(400, 480 - 30 * arr.length, 200, 30);
    ctx.fillText(arr[0], 480, 480 - 30 * arr.length + 20);
}

function clear(){
    ctx.clearRect(0,0,1100,550);
}