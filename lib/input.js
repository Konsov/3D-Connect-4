function keyFunctionMoveCamera(e){
    
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

  

function keyFunctionMovePiece(e){
    // z e x vanno da -3 a 3
    // Distanza tra una stecca e l'altra 2

    if (e.keyCode == 87) {  

        if(currentPz > -3){
          
            objectsPositions[currentTurn].localMatrix =  utils.multiplyMatrices(utils.MakeTranslateMatrix(0 , 0, -2), objectsPositions[currentTurn].localMatrix);
            currentPz = currentPz - 2;
        }

      
    }
    
    if (e.keyCode == 83) { 

        if(currentPz < 3){
            
            objectsPositions[currentTurn].localMatrix =  utils.multiplyMatrices(utils.MakeTranslateMatrix(0 , 0, 2), objectsPositions[currentTurn].localMatrix);
            currentPz = currentPz + 2;
        }
      
    }

    if (e.keyCode == 65) {  

        if(currentPx > -3){
           
            objectsPositions[currentTurn].localMatrix =  utils.multiplyMatrices(utils.MakeTranslateMatrix(-2 , 0, 0), objectsPositions[currentTurn].localMatrix);
            currentPx = currentPx - 2;
        }
    }
    
    if (e.keyCode == 68) {  
        if(currentPx < 3){
            
            objectsPositions[currentTurn].localMatrix =  utils.multiplyMatrices(utils.MakeTranslateMatrix(2 , 0, 0), objectsPositions[currentTurn].localMatrix);
            currentPx = currentPx + 2;
        }
    }
    
    if (e.keyCode == 32) {  
        
        fluctuate = false;
       finalPosition = 1;
       
    }
  
    window.requestAnimationFrame(drawScene);
}


//'window' is a JavaScript object (if "canvas", it will not work)
window.addEventListener("keyup", keyFunctionMoveCamera, false);
window.addEventListener("keyup", keyFunctionMovePiece, false);