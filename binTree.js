var canvas = document.getElementById("mycanvas");
var btInput = document.getElementsByClassName("input-insert-bt")[0];
var btInputButton = document.getElementsByClassName("insert-but-bt")[0];
var btSearchInput =  document.getElementsByClassName("input-search-bt")[0];
var btSearchButton = document.getElementsByClassName("search-but-bt")[0];
var btInorder = document.getElementsByClassName("bt-inorder")[0];
var btPreorder = document.getElementsByClassName("bt-preorder")[0];
var btPostorder = document.getElementsByClassName("bt-postorder")[0];
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

let flag = false;
function searchBT(root, key){
    if(root == null){
        console.log("Key not found");
    }
    else{
        console.log("currently on "+root.data);
        if(root.data==key){
            flag=true;
            paintSearchCircle(root, '#800080');
            return;
        }
        paintSearchCircle(root, '#FFFF00');
        if(flag!=true && root.left!=null){
            searchBT(root.left, key);
        }
        if(flag!=true && root.right!=null){
            searchBT(root.right, key);
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

function inorder(root){
    if(root!=null){
        inorder(root.left);
        paintSearchCircle(root, '#0000FF');
        inorder(root.right);
    }
}

function preorder(root){
    if(root!=null){
        paintSearchCircle(root, '#0000FF');
        inorder(root.left);
        inorder(root.right);
    }
}

function postorder(root){
    if(root!=null){
        inorder(root.left);
        inorder(root.right);
        paintSearchCircle(root, '#0000FF');
    }
}

//todo --> 1.delete button in bst.