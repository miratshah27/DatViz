var btInput = document.getElementsByClassName("input-insert-bt")[0];
var btInputButton = document.getElementsByClassName("insert-but-bt")[0];
var btSearchInput =  document.getElementsByClassName("input-search-bt")[0];
var btSearchButton = document.getElementsByClassName("search-but-bt")[0];
var btInorder = document.getElementsByClassName("bt-inorder")[0];
var btPreorder = document.getElementsByClassName("bt-preorder")[0];
var btPostorder = document.getElementsByClassName("bt-postorder")[0];
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

class TreeNode{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
        this.level = 0;
        this.cordX = 0;
        this.cordY = 0;
    }
}

let root = null;
let queue = [];

btInputButton.addEventListener("click", insertBT);
btSearchButton.addEventListener("click",() =>{
    let temp = root;
    if(btSearchInput.value == ""){
        alert("Enter valid input");
        return;
    }
    searchBT(temp,parseInt(btSearchInput.value));
});
btInorder.addEventListener("click", () => inorder(root));
btPreorder.addEventListener("click", () => preorder(root));
btPostorder.addEventListener("click", () => postorder(root));


function insertBT(){
    var data = btInput.value;
    if(data == ""){
        alert("Enter valid input");
        return;
    }
    let node = new TreeNode(parseInt(data));
    if(root == null){
        node.cordX = 500;
        node.cordY = 100;
        this.level = 0;
        root = node;
        paintNode(node.cordX, node.cordY, node.data);
    }
    else if(queue[0].left == null){
        queue[0].left = node;
        node.level = queue[0].level+1;
        node.cordX = queue[0].cordX-(1000/(Math.pow(2, node.level)+1)/2);
        node.cordY = queue[0].cordY+60;
        paintNode(node.cordX, node.cordY, node.data);
        paintLine(node.cordX, node.cordY, queue[0].cordX, queue[0].cordY, "left");
    }
    else{
        queue[0].right = node;
        node.level = queue[0].level+1;
        node.cordX = queue[0].cordX+(1000/(Math.pow(2, node.level)+1)/2);
        node.cordY = queue[0].cordY + 60;
        paintNode(node.cordX, node.cordY, node.data);
        paintLine(node.cordX, node.cordY, queue[0].cordX, queue[0].cordY, "right");
        queue.shift();
    }
    queue.push(node);
    btInput.value = null;
    console.log("Inserted "+data);
}

function paintNode(x, y, data){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.font = "15px Calibri";
    ctx.arc(x,y,20,0,2*Math.PI);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(data, x-2, y+5);
    ctx.stroke();
}

function paintLine(childX, childY, parentX, parentY, direction){
    let recalc = 20*Math.sin(Math.PI/4);
    if(direction == "left"){
        parentX = parentX-recalc;
        parentY = parentY+recalc;
        childX = childX+recalc;
        childY = childY-recalc;
    }
    else{
        parentX = parentX+recalc;
        parentY = parentY+recalc;
        childX = childX-recalc;
        childY = childY-recalc;
    }
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(parentX, parentY);
    ctx.lineTo(childX, childY);
    ctx.stroke();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function searchBT(root, key){
    if(root == null) return;
    var treeNodeStack = [];
    treeNodeStack.push(root);
    while(treeNodeStack.length > 0){
        var node = treeNodeStack[treeNodeStack.length - 1];
        if(node.data == key){
            await sleep(1000);
            paintSearchCircle(node, '#800080');
            treeNodeStack.pop();
            return;
        }else{
            await sleep(1000);
            paintSearchCircle(node, '#FFFF00');
            treeNodeStack.pop();
        }
        if(node.right != null){
            treeNodeStack.push(node.right);
        }
        if(node.left != null){
            treeNodeStack.push(node.left);
        }
    }
}

function paintSearchCircle(node, hexcode){
    ctx.beginPath();
    
    ctx.strokeStyle = hexcode;
    ctx.lineWidth = 3;
    
    ctx.arc(node.cordX,node.cordY,25,0,2*Math.PI);
    ctx.stroke();
}

async function inorder(root){
    let stack = [];
    let curr = root;
    while(stack.length > 0 || curr != null){
        if(curr != null){
            stack.push(curr);
            curr = curr.left;
        }
        else{
            curr = stack.pop();
            await sleep(1000);
            paintSearchCircle(curr, '#ff3dff');
            curr = curr.right;
        }
    }
}

async function preorder(root){
    if(root == null) return;
    var treeNodeStack = [];
    treeNodeStack.push(root);
    while(treeNodeStack.length > 0){
        var node = treeNodeStack[treeNodeStack.length - 1];
        await sleep(1000);
        paintSearchCircle(node, '#f56969');
        treeNodeStack.pop();
        if(node.right != null){
            treeNodeStack.push(node.right);
        }
        if(node.left != null){
            treeNodeStack.push(node.left);
        }
    }
}

async function postorder(root){
    let stack1 = [];
    let stack2 = [];
    if(root == null) return;
    stack1.push(root);
    while(stack1.length>0){
        var temp = stack1.pop();
        stack2.push(temp);

        if(temp.left != null) stack1.push(temp.left);
        if(temp.right != null) stack1.push(temp.right);
    }
    while(stack2.length > 0){
        var temp = stack2.pop();
        await sleep(1000);
        paintSearchCircle(temp, '#69f5bd');
    }
}

//todo --> 1.delete button in bst.
function clear(){
    ctx.clearRect(0,0,1100,550);
}