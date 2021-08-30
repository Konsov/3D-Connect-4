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
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.drawInfo.indices), gl.STATIC_DRAW);

    normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.drawInfo.normals), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(normalAttributeLocation);
    gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.drawInfo.texCoord), gl.STATIC_DRAW);      
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(uvLocation);

    return vao;


}

function savelightLocation(){
    // Light Locations
    lightPosLocation = gl.getUniformLocation(program, "pointPos");
    lightTargetLocation = gl.getUniformLocation(program, "pointTargetG");
    lightDecayLocation = gl.getUniformLocation(program, "pointDecay");

    lightColorHandle = gl.getUniformLocation(program, 'pointColor');
    materialDiffColorHandle = gl.getUniformLocation(program, 'mDiffColor');
}
function main() {

    // Create scene graph
    computeSceneGraph();

    gl.useProgram(program);
    
    objects.forEach(function (object) {
     
        texture= gl.createTexture();
        //In WebGL there are (at least) 8 texture slots, all subsequent
        //function modifying the state will happen on the active slot
        //Slots are numbered gl.TEXTUREi, e.g., gl.TEXTURE1, gl.TEXTURE2
        //Starting from 0
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture); //Bound to slot 0

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //WebGL has inverted uv coordinates
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, object.drawInfo.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
        object.drawInfo.textureRef.push(texture);

    });

    // Save loactions
    positionAttributeLocation = gl.getAttribLocation(program, "inPosition"); 
    normalAttributeLocation = gl.getAttribLocation(program, "inNormal");  
    matrixLocation = gl.getUniformLocation(program, "matrix");
    uvLocation = gl.getAttribLocation(program, "a_uv");
    vertexMatrixPositionHandle = gl.getUniformLocation(program, "pMatrix");
    normalMatrixPositionHandle = gl.getUniformLocation(program, "nMatrix");
    textLocation = gl.getUniformLocation(program, "sampler");

    savelightLocation()

    objects.forEach(function (object) { 
        
        computeModelData(object);
        
    });   

    //
    // Create buffers
    //
    objects.forEach(function (object) {
        object.drawInfo.vertexArray = createBuffers(object);
    });

    drawScene()
}

function animate() {
    
    var currentTime = (new Date).getTime();
    if (lastUpdateTime) {
      //currentTime – lastUpdateTime is the time passed between frames
      if(fluctuate){
        var deltaC = (3 * (currentTime - lastUpdateTime)) / 15000.0;
      }else{
        var deltaC = (3 * (currentTime - lastUpdateTime)) / 2000.0;
      }
      
      if (flag == 0) currentPy += deltaC;
      else currentPy -= deltaC;
      if (currentPy >= 6.3) flag = 1;
      else if (currentPy <= 6 && fluctuate) flag = 0;
      else if ((currentPy <= heights[positionPiece]) && !fluctuate){
            objectsPositions[currentTurn].localMatrix = utils.MakeTranslateMatrix(currentPx,heights[positionPiece],currentPz);
            fluctuate = true
            currentPy = 6;
            if(checkWin()){
                gameEnded = true;
                finishScreen()
            }
            currentTurn = currentTurn + 1;
      }
    }
    if(gameEnded == false){
        if(currentTurn < objectsPositions.length){
            objectsPositions[currentTurn].localMatrix = utils.MakeTranslateMatrix(currentPx,currentPy,currentPz);
            lastUpdateTime = currentTime; //Need to update it for the next frame
        }else{
            gameEnded = true;
            draw = true;
            finishScreen()
        }
    }
  }

function drawScene(){

    animate()
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var viewMatrix = utils.MakeView(cx, cy, cz, elev, angle);
    var perspectiveMatrix = utils.MakePerspective(90, gl.canvas.width/gl.canvas.height, 0.1, 100.0);
        
    basePositionNode.updateWorldMatrix();
    
    objects.forEach(function (object) {
        var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, object.worldMatrix);
        var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
        var normalMatrix = utils.invertMatrix(utils.transposeMatrix(object.worldMatrix));
        
        // (world space) i couold use world matrix instead of normalmatrix beacasue object dont have a non uniform scaling
        gl.uniformMatrix4fv(normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(normalMatrix));
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix)); 
        gl.uniformMatrix4fv(vertexMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(object.worldMatrix));

        gl.uniform3fv(materialDiffColorHandle, [1.0, 1.0, 1.0]);
        gl.uniform3fv(lightColorHandle,  pointColor);
        gl.uniform3fv(lightPosLocation,  pointPos);
        gl.uniform1f(lightTargetLocation,  pointTarget);
        gl.uniform1f(lightDecayLocation,  pointDecay);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, object.drawInfo.textureRef[0]);
        gl.uniform1i(object.drawInfo.textLocation, 0);
        
        gl.bindVertexArray(object.drawInfo.vertexArray);
        gl.drawElements(gl.TRIANGLES, object.drawInfo.indices.length, gl.UNSIGNED_SHORT, 0 );
    });

    window.requestAnimationFrame(drawScene);

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
    //utils.resizeCanvasToDisplaySize(gl.canvas);
       
      
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
    var baseModelSerialized = await utils.get_objstr(baseModelSrc);
    baseModel = new OBJ.Mesh(baseModelSerialized);

    var pieceModelSerialized = await utils.get_objstr(pieceModelSrc);
    pieceModel = new OBJ.Mesh(pieceModelSerialized);
    
    // Add loaded models to help variable
    models["base"] = baseModel;
    models["pieceP1"] = pieceModel;
    models["pieceP2"] = pieceModel;
    

    main();
}



window.onload = init;
