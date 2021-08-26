var heights =   [   0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ];

var positionPiece = 12;

var floor_1 =   [   0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ];

var floor_2 =   [   0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ];

var floor_3 =   [   0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ];

var floor_4 =   [   0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ];

var floor_5 =   [   0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ];

function reconPlayer(){
    //Controllo se sto giocando in un turno pari o dispari
    //Il giocatore 1 gioca nei turni pari, il giocatore 2 nei turni dispari
    //Quindi dal turno in cui sono posso riconoscere che giocatore ha giocato
    var even = currentTurn % 2;
    var player;
    if(even == 1){
        player = 1;
    }else{
        player = 2;
    }

    return player;
}

function movePieceUp(){
    positionPiece = positionPiece - 4;
    objectsPositions[currentTurn].localMatrix =  utils.multiplyMatrices(utils.MakeTranslateMatrix(0 , 0, -2), objectsPositions[currentTurn].localMatrix);
    currentPz = currentPz - 2;    
}

function movePieceDown(){
    positionPiece = positionPiece + 4;
    objectsPositions[currentTurn].localMatrix =  utils.multiplyMatrices(utils.MakeTranslateMatrix(0 , 0, 2), objectsPositions[currentTurn].localMatrix);
    currentPz = currentPz + 2;
}

function movePieceLeft(){
    positionPiece = positionPiece -1;
    objectsPositions[currentTurn].localMatrix =  utils.multiplyMatrices(utils.MakeTranslateMatrix(-2 , 0, 0), objectsPositions[currentTurn].localMatrix);
    currentPx = currentPx - 2;
}


function movePieceRight(){
    positionPiece = positionPiece +1;
    objectsPositions[currentTurn].localMatrix =  utils.multiplyMatrices(utils.MakeTranslateMatrix(2 , 0, 0), objectsPositions[currentTurn].localMatrix);
    currentPx = currentPx + 2;
}

function insertPiece(){
    fluctuate = false;
    heights[positionPiece] = heights[positionPiece] + 1;
            
    updateFloors()
}

function updateFloors(){
    
    var floor = heights[positionPiece];

    if(floor == 1){
        floor_1[positionPiece] = reconPlayer();
    }else if(floor == 2){
        floor_2[positionPiece] = reconPlayer();
    }else if(floor == 3){
        floor_3[positionPiece] = reconPlayer();
    }else if(floor == 4){
        floor_3[positionPiece] = reconPlayer();
    }else if(floor == 5){
        floor_5[positionPiece] = reconPlayer();
    }

}