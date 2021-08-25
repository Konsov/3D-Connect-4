//
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

    //
    // Define Scene Graph
    //
    basePositionNode = new Node();
    basePositionNode.localMatrix = utils.MakeTranslateMatrix(-3,1,-1);

    // The null values in drawInfo will be assigned in runtime.
    baseNode = new Node();
    baseNode.localMatrix = utils.MakeScaleMatrix(1);
    baseNode.drawInfo = {
        name:                       'base',
        programInfo:                program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        
        // Model info
        vertices:                   null,
        normals:                    null,
        indices:                    null,

        // Tetxure
        textureRef:                   [],
        texture:             baseTexture,
        texCoord:                   null,

        turnPlayed:                    0,
                 
    }


    pieceP1PositionNode = new Node();
    pieceP1PositionNode.localMatrix;

    pieceP1Node = new Node();
    pieceP1Node.localMatrix = utils.MakeScaleMatrix(1);
    pieceP1Node.drawInfo = {
        name:                       'pieceP1',
        programInfo:            program,
        // Locations
        positionAttributeLocation:  null,
        normalAttributeLocation:    null,
        uvLocation:                 null,
        matrixLocation:             null,
        textLocation:               null,
        normalMatrixPositionHandle: null,
        vertexArray:                null,
        vertexMatrixPositionHandle: null,
        
        // Model info
        vertices:                   null,
        normals:                    null,
        indices:                    null,

        // Tetxure
        textureRef:                   [],
        texture:            pieceP1Texture,
        texCoord:                   null,
        
        turnPlayed:                    1,
    }

   
    objects = [
        baseNode,
        pieceP1Node,
    
    ];

    objectsPositions = [
        basePositionNode,
        pieceP1PositionNode,

    ]

    // Creaing the gererchy
    baseNode.setParent(basePositionNode);
    pieceP1Node.setParent(pieceP1PositionNode);
    pieceP1PositionNode.setParent(basePositionNode)

    createPiecesPlayerTwo()
   

}

function createPiecesPlayerTwo(){
    var n=0;
    var sy = 40;
    while(n <= 40){
        pieceP2PositionNode = new Node();
        pieceP2PositionNode.localMatrix = utils.MakeTranslateMatrix(-7, 1, sy);

        pieceP2Node = new Node();
        pieceP2Node.localMatrix = utils.MakeRotateXMatrix(90);
        pieceP2Node.drawInfo = {
            name:                     'pieceP2',
            programInfo:               program,
            // Locations
            positionAttributeLocation:  null,
            normalAttributeLocation:    null,
            uvLocation:                 null,
            matrixLocation:             null,
            textLocation:               null,
            normalMatrixPositionHandle: null,
            vertexArray:                null,
            vertexMatrixPositionHandle: null,
            
            // Model info
            vertices:                   null,
            normals:                    null,
            indices:                    null,

            // Tetxure
            textureRef:                    [],
            texture:           pieceP2Texture,
            texCoord:                    null,

            turnPlayed:                    2,
                    
        }

            pieceP2Node.setParent(pieceP2PositionNode);
            pieceP2PositionNode.setParent(basePositionNode)
            
            objects.push(pieceP2Node);
            objectsPositions.push(pieceP2PositionNode);
            sy = sy -1;
            n = n+1;
    }

}