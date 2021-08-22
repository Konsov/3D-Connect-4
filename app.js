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

var worldMatrix;
var viewMatrix;
var perspectiveMatrix;


//define directional light
var dirLightAlpha = -utils.degToRad(60);
var dirLightBeta  = -utils.degToRad(120);

var directionalLight = [Math.cos(dirLightAlpha) * Math.cos(dirLightBeta),
          Math.sin(dirLightAlpha),
          Math.cos(dirLightAlpha) * Math.sin(dirLightBeta)
          ];
var directionalLightColor = [0.1, 1.0, 1.0];

//Define material color
var cubeMaterialColor = [0.5, 0.5, 0.5];
var lastUpdateTime = (new Date).getTime();

var indexBuffer;
var normalBuffer;
var positionBuffer;
var vao;

var cx= 0;
var cy= 2.0;
var cz= 10.0;
var elev= 15.0;
var angle = 10.0;

function main() {

    // look up where the vertex data needs to go.
    // var positionAttributeLocation = gl.getAttribLocation(program, "a_position");  
    // var matrixLocation = gl.getUniformLocation(program, "matrix");
        
    // var positionBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(baseModelVertices), gl.STATIC_DRAW);
    // gl.enableVertexAttribArray(positionAttributeLocation);
    // gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    // var indexBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(baseModelIndices), gl.STATIC_DRAW); 

    // // Tell it to use our program (pair of shaders)
    // gl.useProgram(program);



    gl.useProgram(program);
    
    positionAttributeLocation = gl.getAttribLocation(program, "inPosition");  
    normalAttributeLocation = gl.getAttribLocation(program, "inNormal");  
    matrixLocation = gl.getUniformLocation(program, "matrix");
    materialDiffColorHandle = gl.getUniformLocation(program, 'mDiffColor');
    lightDirectionHandle = gl.getUniformLocation(program, 'lightDirection');
    lightColorHandle = gl.getUniformLocation(program, 'lightColor');
    normalMatrixPositionHandle = gl.getUniformLocation(program, 'nMatrix');

    worldMatrix = utils.MakeWorld(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 2.0);/***NEW***/
    viewMatrix = utils.MakeView(cx, cy, cz, elev, angle);/***NEW***/
    perspectiveMatrix = utils.MakePerspective(120, gl.canvas.width/gl.canvas.height, 0.1, 100.0);/***NEW***/

    // var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix);/***NEW***/
    // var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);/***NEW***/

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
}

function drawScene() {

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix);
    var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
    
    gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix));  
    gl.uniformMatrix4fv(normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(worldMatrix));

    gl.uniform3fv(materialDiffColorHandle, cubeMaterialColor);
    gl.uniform3fv(lightColorHandle,  directionalLightColor);
    gl.uniform3fv(lightDirectionHandle,  directionalLight);

    gl.bindVertexArray(vao);
    gl.drawElements(gl.TRIANGLES, baseModelIndices.length, gl.UNSIGNED_SHORT, 0 );

  }

function keyFunction(e){
 
    if (e.keyCode == 50) {  // 4
      cx-=5.0;
    }
    if (e.keyCode == 51) {  // 3
      cy+=5.0;
    } 
    if (e.keyCode == 52) {  // 1
      cz-=0.1;
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