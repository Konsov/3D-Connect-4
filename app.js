//Help Function to assing model info to respective Objcet
function computeModelData(object) {
    object.drawInfo.vertices = models[object.drawInfo.name].vertices;
    object.drawInfo.indices = models[object.drawInfo.name].indices;
    object.drawInfo.normals = models[object.drawInfo.name].vertexNormals;
    object.drawInfo.texCoord = models[object.drawInfo.name].textures;
}

//Function that Create Buffer
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

//Function that set light for shader
function savelightLocation(){
    // Light Locations
    lightTypeLocation = gl.getUniformLocation(program, 'lightType');
    lightAmbientLocation = gl.getUniformLocation(program, 'lightAmbient');
    diffuseReflectionLocation = gl.getUniformLocation(program, 'diffuseReflection');
    diffuseSpecularLocation = gl.getUniformLocation(program, 'diffuseSpecular');

    //Direct Light Location
    directDirLocation = gl.getUniformLocation(program, 'directDir');
    directColorLocation = gl.getUniformLocation(program, 'directColor');
    
    //Point Light Location
    pointPosLocation = gl.getUniformLocation(program, 'pointPos');
    pointDecayLocation = gl.getUniformLocation(program, 'pointDecay');
    pointTargetGLocation = gl.getUniformLocation(program, 'pointTargetG');
    pointColorLocation = gl.getUniformLocation(program, 'pointColor');

    //Spot Light
    spotColorLocation = gl.getUniformLocation(program, 'spotColor');
    spotPosLocation = gl.getUniformLocation(program, 'spotPos');
    spotDecayLocation = gl.getUniformLocation(program, 'spotDecay');
    spotTargetGLocation = gl.getUniformLocation(program, 'spotTargetG');
    spotDirLocation = gl.getUniformLocation(program, 'spotDir');
    spotConeInLocation = gl.getUniformLocation(program, 'spotConeIn');
    spotConeOutLocation = gl.getUniformLocation(program, 'spotConeOut');

    //Lambert Diffuse
    lambertColorLocation = gl.getUniformLocation(program, 'lambertColor');
    lambertTextureLocation = gl.getUniformLocation(program, 'lambertTexture');

    //Ambient light 
    ambientColorLocation = gl.getUniformLocation(program, 'ambientColor');
    
    //Hemisperichal ambient light
    hemisphericDirLocation = gl.getUniformLocation(program, 'hemisphericDir');
    ambientLowerColorLocation = gl.getUniformLocation(program, 'ambientLowerColor');
    ambientUpperColorLocation = gl.getUniformLocation(program, 'ambientUpperColor');
    
    // Phong Specular
    phongColorLocation = gl.getUniformLocation(program, 'phongColor');
    blinnColorLocation = gl.getUniformLocation(program, 'blinnColor');
   
    // Blinn Specular
    phongShinyLocation = gl.getUniformLocation(program, 'phongShiny');
    blinnShinyLocation = gl.getUniformLocation(program, 'blinnShiny');
 
    
}

//Function that assing respective value to a location for fs
function setLightsAndReflection(){

    // Settings Variables
    gl.uniform1f(lightTypeLocation, parseFloat(lightModel));
    gl.uniform1f(lightAmbientLocation, parseFloat(ambientLight));
    gl.uniform1f(diffuseReflectionLocation, parseFloat(diffuseReflection));
    gl.uniform1f(diffuseSpecularLocation, parseFloat(specularReflecion));
      
    // //Direct Light
    gl.uniform3fv(directDirLocation, directDir);
    gl.uniform4fv(directColorLocation, dirColor);
    
    //Point Light
    gl.uniform3fv(pointPosLocation, pointPos);
    gl.uniform1f(pointDecayLocation, pointDecay);
    gl.uniform1f(pointTargetGLocation, pointTarget);
    gl.uniform4fv(pointColorLocation, pointColor);

    //Spot Light
    gl.uniform3fv(spotPosLocation, spotPos);
    gl.uniform1f(spotDecayLocation, spotDecay);
    gl.uniform1f(spotTargetGLocation, spotTarget);
    gl.uniform3fv(spotDirLocation, directSpot);
    gl.uniform1f(spotConeInLocation, spotConeIn);
    gl.uniform1f(spotConeOutLocation, spotConeOut);
    gl.uniform4fv(spotColorLocation, spotColor);

    //ambient light
    gl.uniform4fv(ambientColorLocation, ambientColor);
    
    //hemisperich ambient light
    gl.uniform4fv(ambientLowerColorLocation, hemispericLowerColor);
    gl.uniform4fv(ambientUpperColorLocation, hemispericUpperColor);
    gl.uniform3fv(hemisphericDirLocation, directHemisperic);
    
    // //Lambert diffuse
    gl.uniform4fv(lambertColorLocation, lambertColor);
    gl.uniform1f(lambertTextureLocation, lambertTexture/100);
    
    //Phong specular
    gl.uniform4fv(phongColorLocation, PhongColor);
    gl.uniform1f(phongShinyLocation, PhongShiny);
    
    //blinn specular
    gl.uniform4fv(blinnColorLocation, BlinnColor);
    gl.uniform1f(blinnShinyLocation, BlinnShiny);
}

function main() {

    // Create scene graph
    computeSceneGraph();

    gl.useProgram(program);
    
    //LOAD TEXTURE
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

    // Save loactions for shraders
    eyePositionHandle = gl.getUniformLocation(program, 'eyePosition')
    positionAttributeLocation = gl.getAttribLocation(program, "inPosition"); 
    normalAttributeLocation = gl.getAttribLocation(program, "inNormal");  
    matrixLocation = gl.getUniformLocation(program, "matrix");
    uvLocation = gl.getAttribLocation(program, "a_uv");
    vertexMatrixPositionHandle = gl.getUniformLocation(program, "pMatrix");
    normalMatrixPositionHandle = gl.getUniformLocation(program, "nMatrix");
    textLocation = gl.getUniformLocation(program, "sampler");
    
    //Save light location
    savelightLocation()

    objects.forEach(function (object) { 
        //assing model info to respective Objcet
        computeModelData(object);
        
    });   


    // Create buffers
    objects.forEach(function (object) {
        object.drawInfo.vertexArray = createBuffers(object);
    });

    drawScene()
}

function animate() {
    //Animation for fluctating and inserting
    //Piece fluctate (Go up and down) Then is go down to his final place
    var currentTime = (new Date).getTime();
    if (lastUpdateTime) {
      //currentTime – lastUpdateTime is the time passed between frames
      if(fluctuate){ // Two velocity, one for fluctating one for inserting
        var deltaC = (3 * (currentTime - lastUpdateTime)) / 15000.0;
      }else{
        var deltaC = (3 * (currentTime - lastUpdateTime)) / 2000.0;
      }
      
      if (flag == 0) currentPy += deltaC;
      else currentPy -= deltaC;
      if (currentPy >= 6.3) flag = 1; //Fluctating from 6.3 to 6 on Y
      else if (currentPy <= 6 && fluctuate) flag = 0;
      else if ((currentPy <= heights[positionPiece]) && !fluctuate){ //Then it'go down to Heights[positionPlace] that rappresent hights on the peg
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
    if(gameEnded == false){ //If game in not endend after move another piece is load to fluctate. IF there aren't any piece game is a drawn
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
    //Creation of view matrix and perspective matrix
    var eyePos = [cx, cy, cz];
    var viewMatrix = utils.MakeView(cx, cy, cz, elev, angle);
    var perspectiveMatrix = utils.MakePerspective(90, gl.canvas.width/gl.canvas.height, 0.1, 100.0);

    //Update World Matrix since his root
    basePositionNode.updateWorldMatrix();
    
    objects.forEach(function (object) {
        var viewWorldMatrix = utils.multiplyMatrices(viewMatrix, object.worldMatrix);
        var projectionMatrix = utils.multiplyMatrices(perspectiveMatrix, viewWorldMatrix);
        var normalMatrix = utils.invertMatrix(utils.transposeMatrix(object.worldMatrix));
        
        // (world space) i couold use world matrix instead of normalmatrix beacasue object dont have a non uniform scaling
        gl.uniformMatrix4fv(normalMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(normalMatrix));
        gl.uniformMatrix4fv(matrixLocation, gl.FALSE, utils.transposeMatrix(projectionMatrix)); 
        gl.uniformMatrix4fv(vertexMatrixPositionHandle, gl.FALSE, utils.transposeMatrix(object.worldMatrix));
        gl.uniform3fv(eyePositionHandle, eyePos);
        
        setLightsAndReflection();
        

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
  
    //Create shaders
    await utils.loadFiles([shaderDir + 'vs.glsl', shaderDir + 'fs.glsl'], function (shaderText) {
        var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
        var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);
    
        program = utils.createProgram(gl, vertexShader, fragmentShader);
        });
      
    // Load models
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
