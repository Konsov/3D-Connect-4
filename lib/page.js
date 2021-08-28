function finishScreen(){
    document.getElementById("centerBand").style.visibility = "visible"; 
    document.getElementById("canvas").style.opacity = "0.2"; 
    document.getElementById("watchBoardButton").style.visibility = "visible";
    document.getElementById("restartButton").style.top = "75%";
    document.getElementById("restartButton").style.left = "40%";
}

function watchWinningBoard(){
    document.getElementById("centerBand").style.visibility = "hidden"; 
    document.getElementById("restartButton").style.top = "90%";
    document.getElementById("restartButton").style.left = "1%";
    document.getElementById("canvas").style.opacity = "1"; 
    document.getElementById("watchBoardButton").style.visibility = "hidden";

}