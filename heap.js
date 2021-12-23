const canvas = document.getElementById('myspace');
var ctx = canvas.getContext('2d');
var canvas_w = 1000;
var canvas_h = 550;
ctx.font = "20px Arial";


function clearcanvas() {
    ctx.clearRect(0, 100, 1000, 550);
    console.log("clear function reached");
    return false;
}

class node {
    constructor(value) {
        this.left = null;
        this.right = null;
        this.parent = null;
        this.value = value;
        this.cordX = 0;
        this.cordY = 0;
        this.level = 0;
        // this.circle = null;
        // this.text = null;
    }
}

class heap {
    constructor() {
        this.root = null;
    }
}

class Queue {
    constructor() {
        this.items = [];
    }

    // enqueue function
    enqueue(element) {
        // adding element to the queue
        this.items.push(element);
    }

    dequeue() {
        // removing element from the queue
        // returns underflow when called 
        // on empty queue
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }

    // front function
    front() {
        // returns the Front element of 
        // the queue without removing it.
        if (this.isEmpty())
            return "No elements in Queue";
        return this.items[0];
    }

    isEmpty() {
        // return true if the queue is empty.
        return this.items.length == 0;
    }

    printQueue() {
        var str = "";
        for (var i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}

var arr = [];

function insertion() {
    var num = document.getElementById('input_element').value;
    if (Number.isInteger(parseInt(num))) {
        arr.push(parseInt(num));
        insert_node_array(num, arr.length - 1);
    }
    else {
        alert("Give appropiate input value");
    }
    return false;
}

function insert_node_array(num, i) {

    ctx.strokeRect(50 * (i + 1), 12, 50, 50);
    ctx.fillText(arr[i], 50 * (i + 1) + 10, 45);
    let child = parseInt(i);
    swapping(child);


    clearcanvas();
    var max_heap = new heap();
    for (var i = 0; i < arr.length; i++)
        insert_node(max_heap, arr[i]);

    document.getElementById('input_element').value = "";
    console.log(arr);
}
function swapping(child) {
    let parent = parseInt((child - 1) / 2);

    if (parent == child || parent < 0)
        return;

    if (arr[parent] > arr[child])
        return;
    else {
        // console.log(parent, child);
        ctx.clearRect(50 + 50 * parent, 12, 50, 50);
        ctx.clearRect(50 + 50 * child, 12, 50, 50);

        let temp = arr[parent];
        arr[parent] = arr[child];
        arr[child] = temp;
        ctx.strokeRect(50 + 50 * parent, 12, 50, 50);
        ctx.strokeRect(50 + 50 * child, 12, 50, 50);
        ctx.fillText(arr[parent], 60 + 50 * parent, 45);
        ctx.fillText(arr[child], 60 + 50 * child, 45);
        swapping(parent);
    }
}

function insert_node(max_heap, value) {
    let newnode = new node(value);
    if (max_heap.root == null) {
        max_heap.root = newnode;
        create_node(newnode, canvas_w / 2, 150, newnode.value, 1);
    }
    else {
        var q = new Queue();
        q.enqueue(max_heap.root);

        while (q.isEmpty() == false) {
            let frontnode = q.front();
            // console.log(frontnode)

            if (frontnode.left == null) {
                frontnode.left = newnode;
                newnode.parent = frontnode;
                var x = frontnode.cordX - canvas_w / Math.pow(2, frontnode.level + 1);
                create_node(newnode, x, frontnode.cordY + 75, newnode.value, frontnode.level + 1);
                drawline(frontnode.cordX, frontnode.cordY + 30, x, frontnode.cordY + 45);
                break;
            }

            if (frontnode.right == null) {
                frontnode.right = newnode;
                newnode.parent = frontnode;
                var x = frontnode.cordX + canvas_w / Math.pow(2, frontnode.level + 1);
                create_node(newnode, x, frontnode.cordY + 75, newnode.value, frontnode.level + 1);
                drawline(frontnode.cordX, frontnode.cordY + 30, x, frontnode.cordY + 45);
                break;
            }

            q.enqueue(frontnode.left);
            q.enqueue(frontnode.right);
            q.dequeue();
        }
    }
    // swap_nodes(newnode);
}

// function swap_nodes(child) {
//     if(child.parent == null)
//         return;

//     if(child.value < parent.value)
//         return;
//     else{
//         let temp = child.parent.value;
//         child.parent.value = child.value;
//         child.value = temp;
//         swap_nodes(child.parent);
//     }
// }


function create_node(newnode, x, y, value, level) {

    newnode.level = level;
    newnode.cordX = x;
    newnode.cordY = y;
    var radius = 30;
    ctx.beginPath();
    ctx.arc(newnode.cordX, newnode.cordY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText(value, x - 10, y);
}

function drawline(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function extractmax() {
    alert("The Maximum Element in the binary Heap :" + arr[0]);
    buildheapagain();
    return false;
}

function heapify(i) {
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;

    if (l < arr.length && arr[l] > arr[largest])
        largest = l;

    if (r < arr.length && arr[r] > arr[largest])
        largest = r;

    if (largest != i) {
        var temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(largest);
    }
}

// from array -> build heap
// decrease key

function increase_key() {
    var i = document.getElementById('index').value;
    var newnum = document.getElementById('increasekey').value;
    arr[parseInt(i)] = parseInt(newnum);
    var parent = parseInt(parseInt(i)/2);

    while (i != 0 && arr[parent] < arr[i])
    {
       var temp = arr[i];
       arr[i] = arr[parent];
       arr[parent] = temp;
       i = parent;
    }
    ctx.clearRect(0, 0, 1000, 550);
    for (var i = 0; i < arr.length; i++)
        insert_node_array(arr[i], i);
        console.log("here")

    document.getElementById('index').value = '';
    document.getElementById('increasekey').value = '';
    return false;
}   

// heap sort
function heap_sort() {
    let sortedarray = [];
    while (arr.length > 0) {
        sortedarray.unshift(arr[0]);
        buildheapagain();
    }
    alert( "Sorted Array : " + sortedarray)
    return false;
}

function kthmax() {

    var k = document.getElementById('kth_element').value;
    for (var i = 0; i < parseInt(k) - 1; i++)
        buildheapagain();

    alert("The Kth Maximum Element in the binary Heap :" + arr[0]);
    document.getElementById('kth_element').value = '';
    return false;
}

function buildheapagain() {
    arr[0] = arr[arr.length - 1];
    arr.pop();
    ctx.clearRect(0, 0, 1000, 550);
    heapify(0);

    for (var i = 0; i < arr.length; i++)
        insert_node_array(arr[i], i);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function clear(){
    ctx.clearRect(0,0,1100,550);
}