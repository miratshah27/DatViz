var bstInput = document.getElementsByClassName("input-insert-bst")[0];
var bstInsertButton = document.getElementsByClassName("insert-but-bst")[0];
var bstSearchInput = document.getElementsByClassName("input-search-bst")[0];
var bstSearchButton = document.getElementsByClassName("search-but-bst")[0];
var bstInorder = document.getElementsByClassName("bst-inorder")[0];
var bstPreorder = document.getElementsByClassName("bst-preorder")[0];
var bstPostorder = document.getElementsByClassName("bst-postorder")[0];
// update
var DeleteButton = document.getElementsByClassName("delete-but-bst")[0];
DeleteButton.addEventListener("click", deletion);
var btInput = document.getElementsByClassName("input-delete-bst")[0];
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

let bstRoot = new TreeNode(null);

bstInsertButton.addEventListener("click", () => {
    var data = bstInput.value;
    if (data == "") {
        alert("Enter valid input");
        return;
    }
    insertBST(parseInt(data));
    bstInput.value = null;
});

bstSearchButton.addEventListener("click", () => {
    var data = bstSearchInput.value;
    if (data == "") {
        alert("Enter valid input");
        return;
    }
    searchBST(parseInt(data));
    bstSearchButton.value = null;
});

bstInorder.addEventListener("click", () => inorder(bstRoot));
bstPreorder.addEventListener("click", () => preorder(bstRoot));
bstPostorder.addEventListener("click", () => postorder(bstRoot));

function insertBST(data) {
    console.log("Inserted in BST " + data);
    let node = new TreeNode(data);
    if (bstRoot.data == null) {
        node.cordX = 500;
        node.cordY = 100;
        node.level = 0;
        bstRoot = node;
        paintNode(node.cordX, node.cordY, node.data);
        // inorder_print(bstRoot)
        return;
    }
    let prev = new TreeNode(null);
    let temp = bstRoot;
    while (temp != null) {
        if (data < temp.data) {
            prev = temp;
            temp = temp.left;
        }
        else if (data > temp.data) {
            prev = temp;
            temp = temp.right;
        }
    }
    if (data < prev.data) {
        // console.log(prev);
        node.level = prev.level + 1;
        node.cordX = prev.cordX - (1000 / (Math.pow(2, node.level) + 1) / 2);
        node.cordY = prev.cordY + 60;
        prev.left = node;
        paintNode(node.cordX, node.cordY, node.data);
        paintLine(node.cordX, node.cordY, prev.cordX, prev.cordY, "left");
        // inorder_print(bstRoot)

        return;
    }
    else {
        // console.log(prev);
        node.level = prev.level + 1;
        node.cordX = prev.cordX + (1000 / (Math.pow(2, node.level) + 1) / 2);
        node.cordY = prev.cordY + 60;
        prev.right = node;
        paintNode(node.cordX, node.cordY, node.data);
        paintLine(node.cordX, node.cordY, prev.cordX, prev.cordY, "right");
        // inorder_print(bstRoot)

        return;
    }
}

async function searchBST(data) {
    // await sleep(1000);
    let temp = bstRoot;
    if (temp != null && temp.data == data) {
        await sleep(1000);
        paintSearchCircle(bstRoot, '#00fcca');
        return;
    }
    while (temp.data != data) {
        if (data < temp.data) {
            await sleep(1000);
            paintSearchCircle(temp, '#FFFF00');
            temp = temp.left;
        }
        else if (data > temp.data) {
            await sleep(1000);
            paintSearchCircle(temp, '#FFFF00');
            temp = temp.right;
        }
    }
    if (temp.data == data) {
        await sleep(1000);
        paintSearchCircle(temp, '#00fcca');
        return;
    }
    else {
        alert("Element Not found");
    }
}


function deletenode(node, val) {

    if (node == null)
        return null;
    else if (val == node.data) {
        if (node.left == null || node.right == null) {
            var temp = node.left == null ? node.right : node.left;
            return temp;
        }
        else {
            console.log(node, successor(node))
            node.data = successor(node);
            node.right = deletenode(node.right, node.data);
        }

    }
    else if (val > node.data)
        node.right = deletenode(node.right, val);
    else
        node.left = deletenode(node.left, val);

    return node;
}

function deletion() {
    bstRoot = deletenode(bstRoot, btInput.value);
    ctx.clearRect(0, 0, 1000, 550);
    buildtree();
    document.getElementsByClassName("input-delete-bst")[0].value = '';
}

function successor(node) {
    var temp = node.right;
    while (temp.left != null)
        temp = temp.left;
    return temp.data;
}


function inorder_print(node) {
    if (node != null) {
        inorder_print(node.left);
        console.log(node.data);
        inorder_print(node.right);
    }
}

function buildtree() {
    var q = new Queue();
    if (bstRoot != null) {
        q.enqueue(bstRoot);
        paintNode(bstRoot.cordX, bstRoot.cordY, bstRoot.data);
    }

    while (q.isEmpty() == false) {
        var frontnode = q.front();

        if (frontnode.left != null) {
            q.enqueue(frontnode.left);
            frontnode.left.level = frontnode.level + 1;
            frontnode.left.cordX = frontnode.cordX - (1000 / (Math.pow(2, frontnode.left.level) + 1) / 2);
            frontnode.left.cordY = frontnode.cordY + 60;
            paintNode(frontnode.left.cordX, frontnode.left.cordY, frontnode.left.data);
            paintLine(frontnode.left.cordX, frontnode.left.cordY, frontnode.cordX, frontnode.cordY, "left");
        }
        if (frontnode.right != null) {
            q.enqueue(frontnode.right);
            frontnode.right.level = frontnode.level + 1;
            frontnode.right.cordX = frontnode.cordX + (1000 / (Math.pow(2, frontnode.right.level) + 1) / 2);
            frontnode.right.cordY = frontnode.cordY + 60;
            paintNode(frontnode.right.cordX, frontnode.right.cordY, frontnode.right.data);
            paintLine(frontnode.right.cordX, frontnode.right.cordY, frontnode.cordX, frontnode.cordY, "right");
        }
        q.dequeue();
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