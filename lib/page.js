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


document.getElementById("sliderPoint_Px").setAttribute('value', lightPos[0]);
document.getElementById("sliderPoint_Py").setAttribute('value', lightPos[1]);
document.getElementById("sliderPoint_Pz").setAttribute('value', lightPos[2]);
document.getElementById("sliderPoint_Decay").setAttribute('value', lightDecay);
document.getElementById("sliderPoint_TargetDistance").setAttribute('value', lightTarget);
document.getElementById("PointLightColor").setAttribute('value', rgbToHex(lightColor));

function onDropdownChange(value,id){
    if(id == "ddlightModel"){
        if(value == "0"){
            document.getElementById("lightModelDir").style.visibility = "visible";
            document.getElementById("lightModelPoint").style.visibility = "hidden";
            document.getElementById("lightModelSpot").style.visibility = "hidden";
        }else if(value == "1"){
            document.getElementById("lightModelDir").style.visibility = "hidden";
            document.getElementById("lightModelPoint").style.visibility = "visible";
            document.getElementById("lightModelSpot").style.visibility = "hidden";
            
        }else if(value == "2"){
            document.getElementById("lightModelDir").style.visibility = "hidden";
            document.getElementById("lightModelPoint").style.visibility = "hidden";
            document.getElementById("lightModelSpot").style.visibility = "visible";
        }
    }

    if(id == "ddAmbientLight"){
        if(value == "0"){
            document.getElementById("AmbientLightAmbient").style.visibility = "visible";
            document.getElementById("AmbientLightHemispheric").style.visibility = "hidden";
        }else if(value == "1"){
            document.getElementById("AmbientLightAmbient").style.visibility = "hidden";
            document.getElementById("AmbientLightHemispheric").style.visibility = "visible";
        }else if(value == "2"){
            document.getElementById("AmbientLightAmbient").style.visibility = "hidden";
            document.getElementById("AmbientLightHemispheric").style.visibility = "hidden";
        }
    }

    if(id == "dddiffuse"){
        if(value == "0"){
            document.getElementById("LambertReflection").style.visibility = "visible";
        }else if(value == "1"){
            document.getElementById("LambertReflection").style.visibility = "hidden";
        }
    }

    if(id == "ddspecular"){
        console.log(value)
        if(value == "0"){
            document.getElementById("PhongReflection").style.visibility = "visible";
            document.getElementById("BlinnReflection").style.visibility = "hidden";
        }else if(value == "1"){
            document.getElementById("PhongReflection").style.visibility = "hidden";
            document.getElementById("BlinnReflection").style.visibility = "visible";
        }else if(value == "2"){
            document.getElementById("PhongReflection").style.visibility = "hidden";
            document.getElementById("BlinnReflection").style.visibility = "hidden";
        }
    }
}
