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
    baseNode.localMatrix = utils.identityMatrix();
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
        textureSrc:                 null,
        texCoord:                   null,
                 
    }

    objects = [
        baseNode
    ];

    // Creaing the gererchy
    baseNode.setParent(basePositionNode);

}