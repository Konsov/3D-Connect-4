function loadTextures(){
    var image = new Image();
    image.src = 'models/texture/WoodM1.jpg';
    image.onload = function(e){
        texture= gl.createTexture();
        //In WebGL there are (at least) 8 texture slots, all subsequent
        //function modifying the state will happen on the active slot
        //Slots are numbered gl.TEXTUREi, e.g., gl.TEXTURE1, gl.TEXTURE2
        //Starting from 0
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture); //Bound to slot 0

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); //WebGL has inverted uv coordinates
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
        return texture;
    };
}
