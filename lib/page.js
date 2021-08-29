function finishScreen(){
    var s1 = "Player "
    var s2 = " WIN!!"
    var annouce;
    if(draw == false){
        annouce = s1.concat(String(currentPlayer()))
        annouce = annouce.concat(s2)
    }else{
        annouce = "DRAW !"
    }
    document.getElementById("centerBand").innerHTML = annouce;
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


document.getElementById("sliderPx").setAttribute('value', lightPos[0]);
document.getElementById("sliderPy").setAttribute('value', lightPos[1]);
document.getElementById("sliderPz").setAttribute('value', lightPos[2]);
document.getElementById("sliderDecay").setAttribute('value', lightDecay);
document.getElementById("sliderTargetDistance").setAttribute('value', lightTarget);
document.getElementById("lightColor").setAttribute('value', rgbToHex(lightColor));
