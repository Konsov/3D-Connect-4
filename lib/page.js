// SETTING DEFAULT LIGHTS AND REFLECTIONS FROM JS TO HTML
// Direct light default settings
document.getElementById("sliderDir_Theta").setAttribute('value', dirTheta);
document.getElementById("sliderDir_Phi").setAttribute('value', dirPhi);
document.getElementById("DirLightColor").setAttribute('value', rgbToHex(dirColor));
// Point light default settings
document.getElementById("sliderPoint_Px").setAttribute('value', pointPos[0]);
document.getElementById("sliderPoint_Py").setAttribute('value', pointPos[1]);
document.getElementById("sliderPoint_Pz").setAttribute('value', pointPos[2]);
document.getElementById("sliderPoint_Decay").setAttribute('value', pointDecay);
document.getElementById("sliderPoint_TargetDistance").setAttribute('value', pointTarget);
document.getElementById("PointLightColor").setAttribute('value', rgbToHex(pointColor));
// Spot light default settings
document.getElementById("sliderSpot_Px").setAttribute('value', spotPos[0]);
document.getElementById("sliderSpot_Py").setAttribute('value', spotPos[1]);
document.getElementById("sliderSpot_Pz").setAttribute('value', spotPos[2]);
document.getElementById("sliderSpot_Decay").setAttribute('value', spotDecay);
document.getElementById("sliderSpot_TargetDistance").setAttribute('value', spotTarget);
document.getElementById("sliderSpot_Theta").setAttribute('value', spotTheta);
document.getElementById("sliderSpot_Phi").setAttribute('value', spotPhi);
document.getElementById("sliderSpot_ConeOut").setAttribute('value', spotConeOut);
document.getElementById("sliderSpot_ConeIn").setAttribute('max', spotConeOut);
document.getElementById("sliderSpot_ConeIn").setAttribute('value', spotConeIn);
document.getElementById("SpotLightColor").setAttribute('value', rgbToHex(spotColor));
// Ambient Light default settings
document.getElementById("AmbientLightColor").setAttribute('value', rgbToHex(ambientColor));
// Ambient Light default settings
document.getElementById("HemisphericUpperLightColor").setAttribute('value', rgbToHex(hemispericUpperColor));
document.getElementById("HemisphericLowerLightColor").setAttribute('value', rgbToHex(hemispericLowerColor));
document.getElementById("sliderHemispheric_Theta").setAttribute('value', hemispericTheta);
document.getElementById("sliderHemispheric_Phi").setAttribute('value', hemispericPhi);
// Lambert Diffuse Reflection default settings
document.getElementById("sliderLambert_Texture").setAttribute('value', lamberTexture);
document.getElementById("LambertColor").setAttribute('value', rgbToHex(labertColor));
// Phong Specular Reflection default settings
document.getElementById("sliderPhong_Shiny").setAttribute('value', PhongShiny);
document.getElementById("PhongColor").setAttribute('value', rgbToHex(PhongColor));
// Blinn Specular Reflection default settings
document.getElementById("sliderBlinn_Shiny").setAttribute('value', BlinnShiny);
document.getElementById("BlinnColor").setAttribute('value', rgbToHex(BlinnColor));




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
