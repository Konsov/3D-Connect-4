//VARIABLE AND FUNCTION FOR THE GAME RULES AND CHECK
//I imagine to rappresent game like 5 horizontal floors rappresents each with a respective matrix
//On each value of the matrix rappresent respective value of a peg on the board
//If value is 0 means that peg at that floor is empty, 1 is filled by a piece of player 1, 2 is filled by piece of player 2
//Heights matrix is used to check how many piece there are on one peg. Their values can go from 0 to 5 and: 0 empty, 5 with 5 peg

//Each index of floor matrix rappresent a peg
// var floor_i =   [    0 1 2 3
//                      4 5 6 7
//                      8 9 10 11
//                      12 13 14 15
//                  ];

var positionPiece = 12; //Start Peg for first piece is peg 12

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

function currentPlayer(){
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

//FUNCTION TO MOVE A PIECE ON THE BOARD
// var floor_i =   [    0 1 2 3
//                      4 5 6 7
//                      8 9 10 11
//                      12 13 14 15
//                  ];
function movePieceUp(){
    if((currentPz > -3) && fluctuate){
        positionPiece = positionPiece - 4;
        objectsPositions[currentTurn].localMatrix =  utils.multiplyMatrices(utils.MakeTranslateMatrix(0 , 0, -2), objectsPositions[currentTurn].localMatrix);
        currentPz = currentPz - 2;
    }
}

function movePieceDown(){
    if((currentPz < 3) && fluctuate){
        positionPiece = positionPiece + 4;
        objectsPositions[currentTurn].localMatrix =  utils.multiplyMatrices(utils.MakeTranslateMatrix(0 , 0, 2), objectsPositions[currentTurn].localMatrix);
        currentPz = currentPz + 2;
    }
}

function movePieceLeft(){
    if((currentPx > -3) && fluctuate){
        positionPiece = positionPiece -1;
        objectsPositions[currentTurn].localMatrix =  utils.multiplyMatrices(utils.MakeTranslateMatrix(-2 , 0, 0), objectsPositions[currentTurn].localMatrix);
        currentPx = currentPx - 2;
    }
}


function movePieceRight(){
    if((currentPx < 3) && fluctuate){
        positionPiece = positionPiece +1;
        objectsPositions[currentTurn].localMatrix =  utils.multiplyMatrices(utils.MakeTranslateMatrix(2 , 0, 0), objectsPositions[currentTurn].localMatrix);
        currentPx = currentPx + 2;
    }
   
}

//FUNCTION TO INSERT A PIECE IN A PEG
function insertPiece(){
    fluctuate = false;
    heights[positionPiece] = heights[positionPiece] + 1;
            
    updateFloors()
}

//FUNCTION THAT UPDATE GAME MATRIX AFTER A INSERT
function updateFloors(){
    
    var floor = heights[positionPiece];

    if(floor == 1){
        floor_1[positionPiece] = currentPlayer();
    }else if(floor == 2){
        floor_2[positionPiece] = currentPlayer();
    }else if(floor == 3){
        floor_3[positionPiece] = currentPlayer();
    }else if(floor == 4){
        floor_4[positionPiece] = currentPlayer();
    }else if(floor == 5){
        floor_5[positionPiece] = currentPlayer();
    }

}


//SET OF CONDITION TO CHECK IF AFTER AND INSERT THERE IS A WIN
function checkWin(){
   
    var floors = [floor_1, floor_2, floor_3, floor_4, floor_5]
    var someoneWin = false;
   
    for (var i = 0; i < floors.length; i++){

        //Controllo in orizzontale per ogni piano ------->
        // var floor_i =   [    0 1 2 3
        //                      4 5 6 7
        //                      8 9 10 11
        //                      12 13 14 15
        //                  ];
 
        if( ((floors[i][0] == floors[i][1])&& (floors[i][1] == floors[i][2]) && (floors[i][2] == floors[i][3])) && floors[i][0] != 0){
            console.log("WIN");
            someoneWin = true;
        }
        
        if( ((floors[i][4] == floors[i][5])&& (floors[i][5] == floors[i][6]) && (floors[i][6] == floors[i][7])) && floors[i][4] != 0){
            console.log("WIN");
            someoneWin = true;
        }
        
        if( ((floors[i][8] == floors[i][9])&& (floors[i][9] == floors[i][10]) && (floors[i][10] == floors[i][11])) && floors[i][8] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        if( ((floors[i][12] == floors[i][13])&& (floors[i][13] == floors[i][14]) && (floors[i][14] == floors[i][15])) && floors[i][12] != 0){
            console.log("WIN");
            someoneWin = true;
        }
    
    
        //Controollo in veritcale per ogni piano
        // var floor_i =   [    0 1 2 3       |
        //                      4 5 6 7       |  
        //                      8 9 10 11     |  
        //                      12 13 14 15   V
        //                  ];
        if( ((floors[i][0] == floors[i][4])&& (floors[i][4] == floors[i][8]) && (floors[i][8] == floors[i][12])) && floors[i][0] != 0){
            console.log("WIN");
            someoneWin = true;
        }
        
        if( ((floors[i][1] == floors[i][5])&& (floors[i][5] == floors[i][9]) && (floors[i][9] == floors[i][13])) && floors[i][1] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        if( ((floors[i][2] == floors[i][6])&& (floors[i][6] == floors[i][10]) && (floors[i][10] == floors[i][14])) && floors[i][2] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        if( ((floors[i][3] == floors[i][7])&& (floors[i][7] == floors[i][11]) && (floors[i][11] == floors[i][15])) && floors[i][3] != 0){
            console.log("WIN");
            someoneWin = true;
        }
        
        //Controollo in obliquo diagonale per piano
        // var floor_i =   [    0 1 2 3       
        //                      4 5 6 7        
        //                      8 9 10 11      
        //                      12 13 14 15   
        //                  ];
        if( ((floors[i][0] == floors[i][5])&& (floors[i][5] == floors[i][10]) && (floors[i][10] == floors[i][15])) && floors[i][0] != 0){
            console.log("WIN");
            someoneWin = true;
        }
    
        
        if( ((floors[i][3] == floors[i][6])&& (floors[i][6] == floors[i][9]) && (floors[i][9] == floors[i][12])) && floors[i][3] != 0){
            console.log("WIN");
            someoneWin = true;
        }
    }

   
    //Controllo In Verticale in piani diversi (rispetto al Piolo) 
   //// floor_5    0 1 
    //  floor_4    1 1           
    //  floor_3    1 1           
    //  floor_2    1 1  
    //  floor_1    1 0 
    //  si fanno solo se tassello messo è in altezza 4 o 5 
    if(heights[positionPiece] == 4){
        if( ((floor_1[positionPiece] == floor_2[positionPiece]) && (floor_2[positionPiece] == floor_3[positionPiece]) && (floor_3[positionPiece] == floor_4[positionPiece])) && floor_4[positionPiece] != 0){
            console.log("WIN");
            someoneWin = true;
        }
    }
    if(heights[positionPiece] == 5){
        if( ((floor_2[positionPiece] == floor_3[positionPiece]) && (floor_3[positionPiece] == floor_4[positionPiece]) && (floor_4[positionPiece] == floor_5[positionPiece])) && floor_5[positionPiece] != 0){
            console.log("WIN");
            someoneWin = true;
        }
    }

   //Controllo sul piano verticale in obliquo su piani diversi per ogni lato.
  // A  floor_5    0 0 0 1            B  floor_5    1 0 0 0         // var floor_i =   [    0 1 2 3
    //  floor_4    0 0 1 1           //  floor_4    1 1 0 0         //                      4 5 6 7
    //  floor_3    0 1 1 0           //  floor_3    0 1 1 0         //                      8 9 10 11
    //  floor_2    1 1 0 0           //  floor_2    0 0 1 1         //                      12 13 14 15
    //  floor_1    1 0 0 0           //  floor_1    0 0 0 1         //                  ];
    
    //Come controllo in orizzontale su un singolo piano, ma sfalzo di un piano ogni tass
    //da controllare solo per i primi due piani.
    for (var i = 0; i < 2; i++){
        //A
        if( ((floors[i][0] == floors[i+1][1]) && (floors[i+1][1] == floors[i+2][2]) && (floors[i+2][2] == floors[i+3][3])) && floors[i][0] != 0){
            console.log("WIN");
            someoneWin = true;
        }
    
        
        if( ((floors[i][4] == floors[i+1][5]) && (floors[i+1][5] == floors[i+2][6]) && (floors[i+2][6] == floors[i+3][7])) && floors[i][4] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        
        if( ((floors[i][8] == floors[i+1][9]) && (floors[i+1][9] == floors[i+2][10]) && (floors[i+2][10] == floors[i+3][11])) && floors[i][8] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        if( ((floors[i][12] == floors[i+1][13])&& (floors[i+1][13] == floors[i+2][14]) && (floors[i+2][14] == floors[i+3][15])) && floors[i][12] != 0){
            console.log("WIN");
            someoneWin = true;
        }
        //B
        if( ((floors[i][3] == floors[i+1][2]) && (floors[i+1][2] == floors[i+2][1]) && (floors[i+2][1] == floors[i+3][0])) && floors[i+3][0] != 0){
            console.log("WIN");
            someoneWin = true;
        }
    
        
        if( ((floors[i][7] == floors[i+1][6]) && (floors[i+1][6] == floors[i+2][5]) && (floors[i+2][5] == floors[i+3][4])) && floors[i+3][4] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        
        if( ((floors[i][11] == floors[i+1][10]) && (floors[i+1][10] == floors[i+2][9]) && (floors[i+2][9] == floors[i+3][8])) && floors[i+3][8] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        if( ((floors[i][15] == floors[i+1][14])&& (floors[i+1][14] == floors[i+2][13]) && (floors[i+2][13] == floors[i+3][12])) && floors[i+3][12] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        //Come controllo in verticale su un singolo piano, ma sfalzo di un piano ogni tass
        //A
        if( ((floors[i][0] == floors[i+1][4])&& (floors[i+1][4] == floors[i+2][8]) && (floors[i+2][8] == floors[i+3][12])) && floors[i][0] != 0){
            console.log("WIN");
            someoneWin = true;
        }
        
        if( ((floors[i][1] == floors[i+1][5])&& (floors[i+1][5] == floors[i+2][9]) && (floors[i+2][9] == floors[i+3][13])) && floors[i][1] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        if( ((floors[i][2] == floors[i+1][6])&& (floors[i+1][6] == floors[i+2][10]) && (floors[i+2][10] == floors[i+3][14])) && floors[i][2] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        if( ((floors[i][3] == floors[i+1][7])&& (floors[i+1][7] == floors[i+2][11]) && (floors[i+2][11] == floors[i+3][15])) && floors[i][3] != 0){
            console.log("WIN");
            someoneWin = true;
        }
        //B
        if( ((floors[i][12] == floors[i+1][8])&& (floors[i+1][8] == floors[i+2][4]) && (floors[i+2][4] == floors[i+3][0])) && floors[i][12] != 0){
            console.log("WIN");
            someoneWin = true;
        }
        
        if( ((floors[i][13] == floors[i+1][9])&& (floors[i+1][9] == floors[i+2][5]) && (floors[i+2][5] == floors[i+3][1])) && floors[i][13] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        if( ((floors[i][14] == floors[i+1][10])&& (floors[i+1][10] == floors[i+2][6]) && (floors[i+2][6] == floors[i+3][2])) && floors[i][14] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        if( ((floors[i][15] == floors[i+1][11])&& (floors[i+1][11] == floors[i+2][7]) && (floors[i+2][7] == floors[i+3][3])) && floors[i][15] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        //Check obliquo diagonale su piani diversi
        //
        // var floor =   [      0 0 0 1       // var floor_i =   [    1 0 0 0
        //                      0 0 1 0       //                      0 1 0 0 
        //                      0 1 0 0       //                      0 0 1 0 
        //                      1 0 0 0       //                      0 0 0 1  
        //                  ];                //                  ];
        if( ((floors[i][0] == floors[i+1][5])&& (floors[i+1][5] == floors[i+2][10]) && (floors[i+2][10] == floors[i+3][15])) && floors[i][0] != 0){
            console.log("WIN");
            someoneWin = true;
        }
    
        
        if( ((floors[i][3] == floors[i+1][6])&& (floors[i+1][6] == floors[i+2][9]) && (floors[i+2][9] == floors[i+3][12])) && floors[i][3] != 0){
            console.log("WIN");
            someoneWin = true;
        }

        if( ((floors[i][15] == floors[i+1][10])&& (floors[i+1][10] == floors[i+2][5]) && (floors[i+2][5] == floors[i+3][0])) && floors[i][15] != 0){
            console.log("WIN");
            someoneWin = true;
        }
            
        if( ((floors[i][12] == floors[i+1][9])&& (floors[i+1][9] == floors[i+2][6]) && (floors[i+2][6] == floors[i+3][3])) && floors[i][12] != 0){
            console.log("WIN");
            someoneWin = true;
        }
    }

    return someoneWin;
}

