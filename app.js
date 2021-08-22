var program;

var baseModel;
var baseModelVertices;
var baseModelIndices;
var baseModelNormals;

var matrixLocation;

var positionAttributeLocation, normalAttributeLocation;

var materialDiffColorHandle;
var lightDirectionHandle;
var lightColorHandle;
var normalMatrixPositionHandle;
var vertexMatrixPositionHandle;

var worldMatrix;
var viewMatrix;
var perspectiveMatrix;


//define directional light
var lightColor = [1.0, 1.0, 1.0];
var lightPos = [-3.0, 8.5, -1.0];
var lightTarget = 10;
var lightDecay = 2;

var lightPosLocation;
var lightTargetLocation;
var lightDecayLocation;
  

//Define material color
var cubeMaterialColor = [1.0, 0.5, 0.5];
var lastUpdateTime = (new Date).getTime();

var indexBuffer;
var normalBuffer;
var positionBuffer;
var vao;


var cx= -3.0;
var cy= 7.0;
var cz = 4;
var elev=  -55.0;
var angle = 0.0;

function main() {

    gl.useProgram(program);
    
    positionAttributeLocation = gl.getAttribLocation(program, "inPosition");  
    normalAttributeLocation = gl.getAttribLocation(program, "inNormal");  
    matrixLocation = gl.getUniformLocation(program, "matrix");
    materialDiffColorHandle = gl.getUniformLocation(program, 'mDiffColor');
    lightColorHandle = gl.getUniformLocation(program, 'LAlightColor');
    vertexMatrixPositionHandle = gl.getUniformLocation(program, "pMatrix");
    normalMatrixPositionHandle = gl.getUniformLocation(program, "nMatrix");

    lightPosLocation = gl.getUniformLocation(program, "LAPos");
    lightTargetLocation = gl.getUniformLocation(program, "LATarget");
    lightDecayLocation = gl.getUniformLocation(program, "LADecay");
  

    vao = gl.createVertexArray();

    gl.bindVertexArray(vao);
    
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(baseModelVertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(baseModelNormals), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(normalAttributeLocation);
    gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(baseModelIndices), gl.STATIC_DRAW); 
    
    drawScene();

    function drawScene() {

    
        worldMatrix = utils.MakeWorld(-3.0, 1.0, -1.0, 0.0, 0.0, 0.0, 1.0);
        viewMatrix = utils.MakeView(cx, cy, cz, elev, angle);
        perspectiveMatrix = utils.MakePerspective(120, gl.canvas.width/gl.canvas.height, 0.1, 100.0);
    
       
        var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix);
        var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
            
        gl.uniformMatrix4fv(normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(worldMatrix));
          
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));
        gl.uniformMatrix4fv(vertexMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(worldMatrix));
    
        gl.uniform3fv(materialDiffColorHandle, cubeMaterialColor);
        gl.uniform3fv(lightColorHandle,  lightColor);
        gl.uniform3fv(lightPosLocation,  lightPos);
        gl.uniform1f(lightTargetLocation,  lightTarget);
        gl.uniform1f(lightDecayLocation,  lightDecay);
    
        gl.bindVertexArray(vao);
        gl.drawElements(gl.TRIANGLES, baseModelIndices.length, gl.UNSIGNED_SHORT, 0 );
        
        window.requestAnimationFrame(drawScene);
    
      }
    
    window.requestAnimationFrame(drawScene);
}



function keyFunction(e){
    
    
    if (e.keyCode == 49) {  // Camera 1
        cx = -3.0;
        cy = 7.0;
        cz = 4.0;
        elev=  -55.0;
        angle = 0.0;
    } 

    if (e.keyCode == 50) {  // Camera 2
        cx = 2.0;
        cy = 7.0;
        cz = -1.0;
        elev=  -55.0;
        angle = -90.0;
    } 
    
    if (e.keyCode == 51) {  // Camera 3
        cx = -3.0;
        cy = 7.0;
        cz = -6.0;
        elev = -55.0;
        angle = 180.0;
    } 

    if (e.keyCode == 52) {  // Camera 4
        cx = -8.0;
        cy = 7.0;
        cz = -1.0;
        elev=  -55.0;
        angle = 90.0;
    } 

    if (e.keyCode == 53) {  // Camera 5
        cx = -3.0;
        cy = 8.5;
        cz = -1.0;
        elev=  -90.0;
        angle = 0.0;
    } 
    
    window.requestAnimationFrame(drawScene);
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
//'window' is a JavaScript object (if "canvas", it will not work)
window.addEventListener("keyup", keyFunction, false);