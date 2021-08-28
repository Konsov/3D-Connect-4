function keyFunctionMoveCamera(e){
    
    if (e.keyCode == 49) {  // Camera 1
        cx = -3.0;
        cy = 15.0;
        cz = 8.0;
        elev=  -60.0;
        angle = 0.0;
        currentCamera = 1;
    } 

    if (e.keyCode == 50) {  // Camera 2
        cx = 6.0;
        cy = 15.0;
        cz = -1.0;
        elev=  -60.0;
        angle = -90.0;
        currentCamera = 2;
    } 
    
    if (e.keyCode == 51) {  // Camera 3
        cx = -3.0;
        cy = 15.0;
        cz = -10.0;
        elev = -60.0;
        angle = 180.0;
        currentCamera = 3;
    } 

    if (e.keyCode == 52) {  // Camera 4
        cx = -12.0;
        cy = 15.0;
        cz = -1.0;
        elev=  -60.0;
        angle = 90.0;
        currentCamera = 4;
    } 

    if (e.keyCode == 53) {  // Camera 5
        cx = -3.0;
        cy = 15;
        cz = -1.0;
        elev=  -90.0;
        angle = 0.0;
        currentCamera = 5;
    } 
  
    if (e.keyCode == 38) {  // Camera su
       
        cy = cy + 1;
       
    } 

    if(cy > baseY+3){
        
        if (e.keyCode == 40) {  // Camera giu

            cy = cy -1;
        }
    } 
    
    if (e.keyCode == 85) {  // Camera inclinazion alto
       
        elev = elev +5;
        
    } 

    if (e.keyCode == 74) {  // Camera inclinazione bass
        
        elev =  elev - 5.0;
        
    } 

    if (e.keyCode == 75) {  // Camera inclinazione pari alla base
       
        elev =  0.0;
        
    } 
}

function keyFunctionMovePiece(e){
    
    if(gameEnded == false){
        
        if (e.keyCode == 87) { 
            if(currentCamera == 1 || currentCamera == 5){   
                movePieceUp(); 

            }else if(currentCamera == 2){
                movePieceLeft();   
                
            }else if(currentCamera == 3){
                movePieceDown();
                
            }else if(currentCamera == 4){
                movePieceRight();
            }
        }
        
        if (e.keyCode == 83) { 
            if(currentCamera == 1 || currentCamera == 5){   
                movePieceDown();

            }else if(currentCamera == 2){
                movePieceRight();   
                
            }else if(currentCamera == 3){
                movePieceUp();
                
            }else if(currentCamera == 4){
                movePieceLeft();
            }
        }

        if (e.keyCode == 65) {  
            if(currentCamera == 1 || currentCamera == 5){   
                movePieceLeft(); 

            }else if(currentCamera == 2){
                movePieceDown();   
                
            }else if(currentCamera == 3){
                movePieceRight();
                
            }else if(currentCamera == 4){
                movePieceUp();
            } 
        }
        
        if (e.keyCode == 68) {  
            if(currentCamera == 1 || currentCamera == 5){   
                movePieceRight();
                 
            }else if(currentCamera == 2){
                movePieceUp();   
                
            }else if(currentCamera == 3){
                movePieceLeft();
                
            }else if(currentCamera == 4){
                movePieceDown();
            }
        }
        
        if (e.keyCode == 32 && fluctuate) {  
            if( heights[positionPiece] < 5){
                insertPiece();
                checkWin();
            }
        }
    }
}


//'window' is a JavaScript object (if "canvas", it will not work)
window.addEventListener("keyup", keyFunctionMoveCamera, false);
window.addEventListener("keyup", keyFunctionMovePiece, false);