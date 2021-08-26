var positionPiece = 12;

var heights =   [   0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0,
                    0, 0, 0, 0
                ];

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

function checkWin(){
   
    var floors = [ floor_1, floor_2, floor_3, floor_4]
    
    //Controllo in Orizzontale per ogni piano
    for (var i = 0; i < floors.length; i++){
 
        if( ((floors[i][0] == floors[i][1])&& (floors[i][1] == floors[i][2]) && (floors[i][2] == floors[i][3])) && floors[i][0] != 0){
            console.log("WIN")
        }
    
        
        if( ((floors[i][4] == floors[i][5])&& (floors[i][5] == floors[i][6]) && (floors[i][6] == floors[i][7])) && floors[i][4] != 0){
            console.log("WIN")
        }

        
        if( ((floors[i][8] == floors[i][9])&& (floors[i][9] == floors[i][10]) && (floors[i][10] == floors[i][11])) && floors[i][8] != 0){
            console.log("WIN")
        }

        if( ((floors[i][12] == floors[i][13])&& (floors[i][13] == floors[i][14]) && (floors[i][14] == floors[i][15])) && floors[i][12] != 0){
            console.log("WIN")
        }
    }

}