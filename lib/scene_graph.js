// Node definition
//
var Node = function() {
    this.children = [];
    this.localMatrix = utils.identityMatrix();
    this.worldMatrix = utils.identityMatrix();
};
  
Node.prototype.setParent = function(parent) {
    // remove us from our parent
    if (this.parent) {
        var ndx = this.parent.children.indexOf(this);
        if (ndx >= 0) {
        this.parent.children.splice(ndx, 1);
        }
    }
  
    // Add us to our new parent
    if (parent) {
        parent.children.push(this);
    }
    this.parent = parent;
};
  
Node.prototype.updateWorldMatrix = function(matrix) {
    if (matrix) {
        // a matrix was passed in so do the math
        this.worldMatrix = utils.multiplyMatrices(matrix, this.localMatrix);
    } else {
        // no matrix was passed in so just copy.
        utils.copy(this.localMatrix, this.worldMatrix);
    }
  
    // now process all the children
    var worldMatrix = this.worldMatrix;
    this.children.forEach(function(child) {
        child.updateWorldMatrix(worldMatrix);
    });
};

// Compute the scene graph 
function computeSceneGraph() {

    // Define Scene Graph
    //
    basePositionNode = new Node();
    basePositionNode.localMatrix = utils.MakeTranslateMatrix(baseX,baseY,baseZ);

    // The null values in drawInfo will be assigned in runtime.
    baseNode = new Node();
    baseNode.localMatrix = utils.MakeScaleMatrix(1);
    baseNode.drawInfo = {
        name:                       'base',
        //Vao
        vertexArray:                null,

        // Model info
        vertices:                   null,
        normals:                    null,
        indices:                    null,

        // Tetxure
        textureRef:                   [],
        texture:             baseTexture,
        texCoord:                   null,     
    }


    // Creaing the gererchy
    baseNode.setParent(basePositionNode);
    

    objects = [
        baseNode,
    ];

    objectsPositions = [
        basePositionNode,
    ]

    //Creationo of 80 piece, 40 for each player
    createPieces(80)

}

function createPieces(numberOfPieces){
    var PieceToPlayer; //Variable help to chose features of piece based on player 1 or 2
    var evenCount; // even piece for player one, odd piece for player 2, in this way create a piece for one then for the other
    //Start position of pieces of two players
    var p1x = 8;
    var p1z = 7;
    var p2x = -8;
    var p2z = -7;
    
    //Help to order pieces in column
    var elementForColumn = 8;
    var countX = 1;
    
    
    var n = 0;
    while(n < numberOfPieces){
        evenCount = n % 2;

        if(evenCount == 0){
            PieceToPlayer = 'pieceP1';
            px = p1x;
            pz = p1z;
            pieceTexture =pieceP1Texture;

            p1z = p1z + 2;
            if(countX % elementForColumn==0){
               p1x = p1x + 2;
               p1z = 7;
            }
        }else{
            PieceToPlayer = 'pieceP2';
            px = p2x;
            pz = p2z;
            pieceTexture =pieceP2Texture;
            p2z = p2z - 2;
            if(countX % elementForColumn==0){
                p2x = p2x - 2;
                p2z = -7;
            }
            countX = countX + 1;
        }
        piecePositionNode = new Node();
        piecePositionNode.localMatrix =  utils.MakeTranslateMatrix(px, 1, pz);;
    
        pieceNode = new Node();
        pieceNode.localMatrix = utils.MakeScaleMatrix(1);
        pieceNode.drawInfo = {
            name:               PieceToPlayer,
            //Vao
            vertexArray:                null,
            
            // Model info
            vertices:                   null,
            normals:                    null,
            indices:                    null,
    
            // Tetxure
            textureRef:                   [],
            texture:            pieceTexture,
            texCoord:                   null,
        }

        pieceNode.setParent(piecePositionNode);
        piecePositionNode.setParent(basePositionNode)
        
        objects.push(pieceNode);
        objectsPositions.push(piecePositionNode);
        n = n + 1;
    }

}