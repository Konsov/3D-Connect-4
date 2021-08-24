var vertexShaderSource = `#version 300 es

in vec3 inPosition;
in vec3 inNormal;
in vec2 a_uv;

out vec2 uvCoord;
out vec3 fsNormal;
out vec3 fsPos;

uniform mat4 matrix; 
uniform mat4 nMatrix;     //matrix to transform normals
uniform mat4 pMatrix;     //matrix to transform positions

void main() {
    uvCoord = a_uv;
    fsNormal = mat3(nMatrix) * inNormal; 
    fsPos = (pMatrix * vec4(inPosition, 1.0)).xyz;
    gl_Position = matrix * vec4(inPosition, 1.0);
}
`;

var fragmentShaderSource = `#version 300 es

precision mediump float;

in vec2 uvCoord;
in vec3 fsNormal;
in vec3 fsPos; 
out vec4 outColor;

uniform vec3 mDiffColor; //material diffuse color 
uniform vec3 LAlightColor; //point light color 
uniform vec3 LAPos; //point light position
uniform float LATarget; //point light target
uniform float LADecay; //point light decay

uniform sampler2D sampler;

void main() {
    vec3 nNormal = normalize(fsNormal);
    vec3 textureCol = texture(sampler, uvCoord).rgb;

    vec3 lightColorA = LAlightColor * pow(LATarget / length(LAPos - fsPos), LADecay);
    vec3 lightDirNorm = normalize(LAPos - fsPos);

    vec3 diffColor = mDiffColor * 0.1 + textureCol * 0.9;

    vec3 lambertColour = diffColor * lightColorA * dot(lightDirNorm,nNormal);

    outColor = vec4(clamp(lambertColour, 0.0, 1.0), 1.0);
   
}
`;



var canvas;
var gl;

var vertexShader;
var fragmentShader;
var program;

var baseModel;
var vertices;
var indices;
var uv;

var positionAttributeLocation;  
var matrixLocation;

var vao;

var positionBuffer;
var indexBuffer;


var texture;
var image;

var uvLocation;
var uvBuffer;
var image = new Image();
image.src = 'models/texture/WoodM1.jpg';

var normalAttributeLocation;  
var materialDiffColorHandle;
var lightColorHandle;
var vertexMatrixPositionHandle;
var normalMatrixPositionHandle;

//Light params
var lightColor = [1.0, 1.0, 1.0];
var lightPos = [-3.0, 10, 2.0];
var lightTarget = 10;
var lightDecay = 0;
  
var lightPosLocation;
var lightTargetLocation;
var lightDecayLocation;

var normalBuffer;

function loadTextures(){

    texture= gl.createTexture();
    //In WebGL there are (at least) 8 texture slots, all subsequent
    //function modifying the state will happen on the active slot
    //Slots are numbered gl.TEXTUREi, e.g., gl.TEXTURE1, gl.TEXTURE2
    //Starting from 0
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture); //Bound to slot 0

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //WebGL has inverted uv coordinates
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);

}



function main() {
    // Get a WebGL context
    canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) {
        document.write("GL context not opened");
        return;
    }
    utils.resizeCanvasToDisplaySize(gl.canvas);
    
   
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // create GLSL shaders, upload the GLSL source, compile the shaders and link them
    vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    program = utils.createProgram(gl, vertexShader, fragmentShader);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);
    loadTextures()

    // look up where the vertex data needs to go.
    positionAttributeLocation = gl.getAttribLocation(program, "inPosition");  
    matrixLocation = gl.getUniformLocation(program, "matrix");
    uvLocation = gl.getAttribLocation(program, "a_uv");

    
    normalAttributeLocation = gl.getAttribLocation(program, "inNormal");  
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
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(normalAttributeLocation);
    gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);      
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(uvLocation);

    drawScene()

 
}

function drawScene(){

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var worldMatrix = utils.MakeWorld(-3.0, 1.0, -1.0, 0.0, 0.0, 0.0, 1.0);
    var viewMatrix = utils.MakeView(cx, cy, cz, elev, angle);
    var perspectiveMatrix = utils.MakePerspective(120, gl.canvas.width/gl.canvas.height, 0.1, 100.0);

    var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, worldMatrix);
    var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);

    gl.uniformMatrix4fv(normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(worldMatrix));

    //Set a the matrix as uniform. Pay attention! this line must be after "useProgram" otherwise
    //webgl is not able to find the matrixLocation, and then to set its value 
    gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix)); 

    gl.uniformMatrix4fv(vertexMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(worldMatrix));

    gl.uniform3fv(materialDiffColorHandle, [1.0, 1.0, 1.0]);
    gl.uniform3fv(lightColorHandle,  lightColor);
    gl.uniform3fv(lightPosLocation,  lightPos);
    gl.uniform1f(lightTargetLocation,  lightTarget);
    gl.uniform1f(lightDecayLocation,  lightDecay);

    gl.bindVertexArray(vao);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
}

var init = async function() {
      
    // Load models
    //
    var baseModelSerialized = await utils.get_objstr('models/base.obj');
    baseModel = new OBJ.Mesh(baseModelSerialized);
    
    vertices = baseModel.vertices; //Array of vertices
    normals = baseModel.vertexNormals; //Array of normals
    indices = baseModel.indices; //Array of indices
    uv = baseModel.textures;
    console.log(normals)


    main();
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



window.onload = init;
//'window' is a JavaScript object (if "canvas", it will not work)
window.addEventListener("keyup", keyFunction, false);