//UTILS FOR LIGHT
//help to switch from hex color in html and rgb color for webgl
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(color) {
    let r = Math.floor(color[0]*255);
    let g = Math.floor(color[1]*255);
    let b = Math.floor(color[2]*255);
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    R = parseInt(hex.substring(1,3), 16) / 255;
    G = parseInt(hex.substring(3,5), 16) / 255;
    B = parseInt(hex.substring(5,7), 16) / 255;

    return [R, G, B, 1.0];
}

//--------------------------------------------------------
//On DropDown Change on gui set corrispond variables
//SEE FUNCTION IN PAGE JS

//On slider change on gui set corrispond variable
function onSliderChange(value, id){
    //Change Dir Light Settings
    if(id == "sliderDir_Theta"){
        console.log(value + ' ' + id)
        dirTheta = value;
        directDir = [   Math.sin(utils.degToRad(dirTheta))*Math.sin(utils.degToRad(dirPhi)),
            Math.cos(utils.degToRad(dirTheta)),
            Math.sin(utils.degToRad(dirTheta))*Math.cos(utils.degToRad(dirPhi))];
    }
    if(id == "sliderDir_Phi"){
        console.log(value + ' ' + id)
        dirPhi = value;
        directDir = [   Math.sin(utils.degToRad(dirTheta))*Math.sin(utils.degToRad(dirPhi)),
            Math.cos(utils.degToRad(dirTheta)),
            Math.sin(utils.degToRad(dirTheta))*Math.cos(utils.degToRad(dirPhi))];
    }

    //Change Point Light Settings
    if(id == "sliderPoint_Px"){
        console.log(value + ' ' + id)
        pointPos[0] = value;
    }
    if(id == "sliderPoint_Py"){
        console.log(value + ' ' + id)
        pointPos[1] = value;
    }
    if(id == "sliderPoint_Pz"){
        console.log(value + ' ' + id)
        pointPos[2] = value;
    }
    if(id == "sliderPoint_Decay"){
        console.log(value + ' ' + id)
        pointDecay = value;
    }
    if(id == "sliderPoint_TargetDistance"){
        pointTarget = value;
        console.log(value + ' ' + id)
    }

    //Change Spot Light Settings
    if(id == "sliderSpot_Px"){
        console.log(value + ' ' + id)
        spotPos[0] = value;
    }
    if(id == "sliderSpot_Py"){
        spotPos[1] = value;
        console.log(value + ' ' + id)
    }
    if(id == "sliderSpot_Pz"){
        spotPos[2] = value;
        console.log(value + ' ' + id)
    }
    if(id == "sliderSpot_Decay"){
        spotDecay = value;
        console.log(value + ' ' + id)
    }
    if(id == "sliderSpot_TargetDistance"){
        spotTarget = value;
        console.log(value + ' ' + id)
    }
    if(id == "sliderSpot_Theta"){
        console.log(value + ' ' + id)
        spotTheta = value;
        directSpot = [  Math.sin(utils.degToRad(spotTheta))*Math.sin(utils.degToRad(spotPhi)),
                        Math.cos(utils.degToRad(spotTheta)),
                        Math.sin(utils.degToRad(spotTheta))*Math.cos(utils.degToRad(spotPhi))];
    }
    if(id == "sliderSpot_Phi"){
        spotPhi = value;
        console.log(value + ' ' + id)
        directSpot = [  Math.sin(utils.degToRad(spotTheta))*Math.sin(utils.degToRad(spotPhi)),
                        Math.cos(utils.degToRad(spotTheta)),
                        Math.sin(utils.degToRad(spotTheta))*Math.cos(utils.degToRad(spotPhi))];
    }
    if(id == "sliderSpot_ConeOut"){
        spotConeOut = value;
        console.log(value + ' ' + id)
        document.getElementById("sliderSpot_ConeIn").setAttribute('max', spotConeOut);
    }
    if(id == "sliderSpot_ConeIn"){
        spotConeIn = value;      
        console.log(value + ' ' + id)
    }
    
    //Change Hemispheric Light Settings
    if(id == "sliderHemispheric_Theta"){
        hemispericTheta = value;
        console.log(value + ' ' + id)
        directHemisperic = [  Math.sin(utils.degToRad(hemispericTheta))*Math.sin(utils.degToRad(hemispericPhi)),
                        Math.cos(utils.degToRad(hemispericTheta)),
                        Math.sin(utils.degToRad(hemispericTheta))*Math.cos(utils.degToRad(hemispericPhi))];
    }
    if(id == "sliderHemispheric_Phi"){
        hemispericPhi = value;
        console.log(value + ' ' + id)
        directHemisperic = [  Math.sin(utils.degToRad(hemispericTheta))*Math.sin(utils.degToRad(hemispericPhi)),
                        Math.cos(utils.degToRad(hemispericTheta)),
                        Math.sin(utils.degToRad(hemispericTheta))*Math.cos(utils.degToRad(hemispericPhi))];
    }
    //Change Lambert Reflection Diffuse Settings
    if(id == "sliderLambert_Texture"){
        lambertTexture = value;
        console.log(value + ' ' + id)
    }
     //Change Lambert Reflection Diffuse Settings
     if(id == "sliderPhong_Shiny"){
        PhongShiny = value;
        console.log(value + ' ' + id)
    }
     //Change Lambert Reflection Diffuse Settings
     if(id == "sliderBlinn_Shiny"){
        BlinnShiny = value;
        console.log(value + ' ' + id)
    }
}

//On Color Change on gui set corrispond variables
function onColorChange(value,id){
    //Change Direct Color Light
    if(id == "DirLightColor"){
        dirColor = hexToRgb(value);
    }
    //Change Point Color Light
    if(id == "PointLightColor"){
        pointColor = hexToRgb(value);
    }
    //Change Spot Color Light
    if(id == "SpotLightColor"){
        spotColor = hexToRgb(value);
    }
    //Change Ambient Color Light
    if(id == "AmbientLightColor"){
        ambientColor = hexToRgb(value);
    }
    //Change HemisphericLower Color Light
    if(id == "HemisphericLowerLightColor"){
        hemispericLowerColor = hexToRgb(value);
    }
    //Change HemisphericUpper Color Light
    if(id == "HemisphericUpperLightColor"){
        hemispericUpperColor = hexToRgb(value);
    }
    //Change Lambert Diffuse Color Light
    if(id == "LambertColor"){
        lambertColor = hexToRgb(value);
    }
    //Change Lambert Diffuse Color Light
    if(id == "PhongColor"){
        PhongColor = hexToRgb(value);
    }
    //Change Lambert Diffuse Color Light
    if(id == "BlinnColor"){
        BlinnColor = hexToRgb(value);
    }
}
