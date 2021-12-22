avlInput = document.getElementsByClassName("input-insert-avl")[0];
avlInsertButton = document.getElementsByClassName("insert-but-avl")[0];
avlSearchInput = document.getElementsByClassName("input-search-avl")[0];
avlSearchButton = document.getElementsByClassName("search-but-avl")[0];
avlInorder = document.getElementsByClassName("avl-inorder")[0];
avlPreorder = document.getElementsByClassName("avl-preorder")[0];
avlPostorder = document.getElementsByClassName("avl-postorder")[0];

class AVLNode{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
        this.level = 0;
        this.height = -1;
        this.bf = 0;
        this.cordX = 0;
        this.cordY = 0;
    }
}

// let avlRoot = new AVLNode(null);
let avlRoot = null;

avlInsertButton.addEventListener("click", () => {
    let data = parseInt(avlInput.value);
    avlRoot = insertAVL(avlRoot, data, null);
    avlRoot = balance(avlRoot);
    avlInput.value = null;
});
avlInorder.addEventListener("click", () => {
    console.log("pressing inorder avl");
    tpinorder(avlRoot);
});

function tpinorder(avlRoot){
    if(avlRoot != null){
        tpinorder(avlRoot.left);
        console.log(avlRoot.data);
        tpinorder(avlRoot.right);
    }
}

function rightRotate(A){
    let B = A.left;
    A.left = B.right;
    B.right = A;

    update(A);
    update(B);
    return B;
}

function leftRotate(A){
    let B = A.right;
    A.right = B.left;
    B.left = A;

    update(A);
    update(B);
    return B;
}

function update(node){
    let lh = -1;
    let rh = -1;
    if(node.left != null) lh = node.left.height;
    if(node.right != null) rh = node.right.height;
    node.height = 1+Math.max(lh,rh);
    node.bf = rh - lh;
}

function llcase(node){
    return rightRotate(node);
}

function rrcase(node){
    return leftRotate(node);
}

function lrcase(node){
    node.left = leftRotate(node.left);
    return llcase(node);
}

function rlcase(node){
    node.right = rightRotate(node.right);
    return rrcase(node);
}

function balance(node){
    if(node.bf == -2){
        if(node.left.bf <= 0) return llcase(node);
        else return lrcase(node);
    }
    else if(node.bf == 2){
        if(node.right.bf >= 0) return rrcase(node);
        else return rlcase(node);
    }

    return node;
}

function insertAVL(node, key, parent){
    if(node == null){
        console.log("inserted in avl : "+key);
        let newNode = new AVLNode(key)
        // if(avlRoot == null){
        //     newNode.level = newNode.height+1;
        //     newNode.cordX = 500;
        //     newNode.cordY = 100;
        //     paintNode(newNode.cordX, newNode.cordY,key);
        // }
        // else if(parent != null){
        //     newNode.level = newNode.height+1;
        //     if(key > parent.data) newNode.cordX = parent.cordX+(1000/(Math.pow(2,newNode.level)+1)/2);
        //     else newNode.cordX = parent.cordX-(1000/(Math.pow(2,newNode.level)+1)/2);
        //     newNode.cordY = parent.cordY+60;
        //     paintNode(newNode.cordX, newNode.cordY, key);
        //     if(key > parent.data) paintLine(newNode.cordX, newNode.cordY, parent.cordX, parent.cordY, "right");
        //     else paintLine(newNode.cordX, newNode.cordY, parent.cordX, parent.cordY, "left");
        // }
        return newNode;
    }

    if(key < node.data) node.left = insertAVL(node.left, key, node);
    else if(key > node.data) node.right = insertAVL(node.right, key, node);

    update(node);
    return balance(node);
}

