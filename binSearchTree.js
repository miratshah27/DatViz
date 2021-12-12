var bstInput = document.getElementsByClassName("input-insert-bst")[0];
var bstInsertButton = document.getElementsByClassName("insert-but-bst")[0];
var bstSearchInput = document.getElementsByClassName("input-search-bst")[0];
var bstSearchButton = document.getElementsByClassName("search-but-bst")[0];
var bstInorder = document.getElementsByClassName("bst-inorder")[0];
var bstPreorder = document.getElementsByClassName("bst-preorder")[0];
var bstPostorder = document.getElementsByClassName("bst-postorder")[0];

let bstRoot = new TreeNode(null);

bstInsertButton.addEventListener("click", () => {
    var data = bstInput.value;
    if(data == ""){
        alert("Enter valid input");
        return;
    }
    insertBST(parseInt(data));
    bstInput.value = null;
});

bstSearchButton.addEventListener("click", () => {
    var data = bstSearchInput.value;
    if(data == ""){
        alert("Enter valid input");
        return;
    }
    searchBST(parseInt(data));
    bstSearchButton.value = null;
});

bstInorder.addEventListener("click", () => inorder(bstRoot));
bstPreorder.addEventListener("click", () => preorder(bstRoot));
bstPostorder.addEventListener("click", () => postorder(bstRoot));

function insertBST(data){
    console.log("Inserted in BST "+data);
    let node = new TreeNode(data);
    if(bstRoot.data == null){
        node.cordX = 500;
        node.cordY = 100;
        node.level = 0;
        bstRoot = node;
        paintNode(node.cordX, node.cordY, node.data);
        return;
    }
    let prev = new TreeNode(null);
    let temp = bstRoot;
    while(temp!=null){
        if(data < temp.data){
            prev = temp;
            temp = temp.left;
        }
        else if(data > temp.data){
            prev = temp;
            temp = temp.right;
        }
    }
    if(data < prev.data){
        console.log(prev);
        node.level = prev.level+1;
        node.cordX = prev.cordX-(1000/(Math.pow(2, node.level)+1)/2);
        node.cordY = prev.cordY+60;
        prev.left = node;
        paintNode(node.cordX, node.cordY, node.data);
        paintLine(node.cordX, node.cordY, prev.cordX, prev.cordY, "left");
        return;
    }
    else{
        console.log(prev);
        node.level = prev.level+1;
        node.cordX = prev.cordX+(1000/(Math.pow(2, node.level)+1)/2);
        node.cordY = prev.cordY+60;
        prev.right = node;
        paintNode(node.cordX, node.cordY, node.data);
        paintLine(node.cordX, node.cordY, prev.cordX, prev.cordY, "right");
        return;
    }      
}

function searchBST(data){
    // await sleep(1000);
    let temp = bstRoot;
    if(temp != null && temp.data == data){
        paintSearchCircle(bstRoot,'#800080');
        return;
    }
    while(temp.data != data){
        if(data < temp.data){
            paintSearchCircle(temp, '#FFFF00');
            temp = temp.left;
        }
        else if(data > temp.data){
            paintSearchCircle(temp, '#FFFF00');
            temp = temp.right;
        }
    }
    if(temp.data == data){
        paintSearchCircle(temp, '#800080');
        return;
    }
}

