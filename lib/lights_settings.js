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

    return [R, G, B];
}

//--------------------------------------------------------


function onSliderChange(value,id){
    
    if(id == "sliderPoint_Px"){
        lightPos[0] = value;
    }
    if(id == "sliderPoint_Py"){
        lightPos[1] = value;
    }
    if(id == "sliderPoint_Pz"){
        lightPos[2] = value;
    }
    if(id == "sliderPoint_Decay"){
        lightDecay = value;
    }
    if(id == "sliderPoint_TargetDistance"){
        lightTarget = value;
    }

}

function onColorChange(value){
    lightColor = hexToRgb(value);
}

