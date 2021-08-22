var program;

var baseModel;
var baseModelVertices;
var baseModelIndices;
var baseModelNormals;


function main() {

        // look up where the vertex data needs to go.
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");  
    var matrixLocation = gl.getUniformLocation(program, "matrix");
        
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(baseModelVertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(baseModelIndices), gl.STATIC_DRAW); 

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    var worldMatrix = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0);/***NEW***/
    var viewMatrix = utils.MakeView(0, 20.0, 10.0, 15.0, 10.0);/***NEW***/
    var perspectiveMatrix = utils.MakePerspective(120, gl.canvas.width/gl.canvas.height, 0.1, 100.0);/***NEW***/

    var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix);/***NEW***/
    var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);/***NEW***/

    gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix)); 

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, baseModelIndices.length, gl.UNSIGNED_SHORT, 0 );

}

var init = async function() {

    var path = window.location.pathname;
    var page = path.split("/").pop();
    baseDir = window.location.href.replace(page, '');
    shaderDir = baseDir+"shaders/"; 

    // Initialize canvas and gl
    canvas = document.getElementById("canvas");
    gl = canvas.getContext('webgl2');
    
    if(!gl) {
        alert('Your browser does not support WebGL 2.0');
    }

    utils.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0.85, 0.85, 0.85, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);


    // Initialize Program
    await utils.loadFiles([shaderDir + 'vs.glsl', shaderDir + 'fs.glsl'], function (shaderText) {
        var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
    
        program = utils.createProgram(gl, vertexShader, fragmentShader);
        });
        
      
    // Load models
    //
    var baseModelSerialized = await utils.get_objstr('models/base.obj');
    baseModel = new OBJ.Mesh(baseModelSerialized);
    
    baseModelVertices = baseModel.vertices; //Array of vertices
    baseModelNormals = baseModel.normals; //Array of normals
    baseModelIndices = baseModel.indices; //Array of indices

    main();
}

window.onload = init;