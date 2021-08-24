
function computeModelData(object) {
    object.drawInfo.vertices = models[object.drawInfo.name].vertices;
    object.drawInfo.indices = models[object.drawInfo.name].indices;
    object.drawInfo.normals = models[object.drawInfo.name].vertexNormals;
    object.drawInfo.texCoord = models[object.drawInfo.name].textures;
}


function createBuffers(object){
    
    vao = gl.createVertexArray();
    gl.bindVertexArray(vao);    
        
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.drawInfo.vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(object.drawInfo.positionAttributeLocation);
    gl.vertexAttribPointer(object.drawInfo.positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.drawInfo.indices), gl.STATIC_DRAW);

    normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.drawInfo.normals), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(object.drawInfo.normalAttributeLocation);
    gl.vertexAttribPointer(object.drawInfo.normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.drawInfo.texCoord), gl.STATIC_DRAW);      
    gl.vertexAttribPointer(object.drawInfo.uvLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(object.drawInfo.uvLocation);

    return vao;


}

var texture;
function main() {

    // Create scene graph
    computeSceneGraph();

    gl.useProgram(program);

    texture=gl.createTexture();
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
 
    // Save loactions
    objects.forEach(function (object) { 
        gl.useProgram(object.drawInfo.programInfo);

        object.drawInfo.positionAttributeLocation = gl.getAttribLocation(object.drawInfo.programInfo, "inPosition"); 
        object.drawInfo.normalAttributeLocation = gl.getAttribLocation(object.drawInfo.programInfo, "inNormal");  
        object.drawInfo.matrixLocation = gl.getUniformLocation(object.drawInfo.programInfo, "matrix");
        object.drawInfo.uvLocation = gl.getAttribLocation(object.drawInfo.programInfo, "a_uv");
        object.drawInfo.vertexMatrixPositionHandle = gl.getUniformLocation(object.drawInfo.programInfo, "pMatrix");
        object.drawInfo.normalMatrixPositionHandle = gl.getUniformLocation(object.drawInfo.programInfo, "nMatrix");
        object.drawInfo.textLocation = gl.getUniformLocation(object.drawInfo.programInfo, "sampler");
        
    });     
    
    
    objects.forEach(function (object) { 
        
        computeModelData(object);
        
    });   

    objects.forEach(function (object) { 
        lightPosLocation = gl.getUniformLocation(object.drawInfo.programInfo, "LAPos");
        lightTargetLocation = gl.getUniformLocation(object.drawInfo.programInfo, "LATarget");
        lightDecayLocation = gl.getUniformLocation(object.drawInfo.programInfo, "LADecay");
        lightColorHandle = gl.getUniformLocation(object.drawInfo.programInfo, 'LAlightColor');
        materialDiffColorHandle = gl.getUniformLocation(object.drawInfo.programInfo, 'mDiffColor');
    });   

    //
    // Create buffers
    //
    objects.forEach(function (object) {
        object.drawInfo.vertexArray = createBuffers(object);
    });

    drawScene()
}

function drawScene(){

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var viewMatrix = utils.MakeView(cx, cy, cz, elev, angle);
    var perspectiveMatrix = utils.MakePerspective(120, gl.canvas.width/gl.canvas.height, 0.1, 100.0);
    
    basePositionNode.updateWorldMatrix();
    
    objects.forEach(function (object) {
        var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, object.worldMatrix);
        var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);

        gl.uniformMatrix4fv(object.drawInfo.normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(object.worldMatrix));

        //Set a the matrix as uniform. Pay attention! this line must be after "useProgram" otherwise
        //webgl is not able to find the matrixLocation, and then to set its value 
        gl.uniformMatrix4fv(object.drawInfo.matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix)); 

        gl.uniformMatrix4fv(object.drawInfo.vertexMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(object.worldMatrix));

        gl.uniform3fv(materialDiffColorHandle, [1.0, 1.0, 1.0]);
        gl.uniform3fv(lightColorHandle,  lightColor);
        gl.uniform3fv(lightPosLocation,  lightPos);
        gl.uniform1f(lightTargetLocation,  lightTarget);
        gl.uniform1f(lightDecayLocation,  lightDecay);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(object.drawInfo.textLocation, 0);
        
        gl.bindVertexArray(object.drawInfo.vertexArray);
        gl.drawElements(gl.TRIANGLES, object.drawInfo.indices.length, gl.UNSIGNED_SHORT, 0 );
    });
}

var init = async function() {

    baseDir = window.location.href.replace(page, '');
    shaderDir = baseDir+"shaders/"; 

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
  

    await utils.loadFiles([shaderDir + 'vs.glsl', shaderDir + 'fs.glsl'], function (shaderText) {
        var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
    
        program = utils.createProgram(gl, vertexShader, fragmentShader);
        });
      
    // Load models
    //
    var baseModelSerialized = await utils.get_objstr('models/base.obj');
    baseModel = new OBJ.Mesh(baseModelSerialized);


    // Add loaded models to help variable
    models["base"] = baseModel;


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