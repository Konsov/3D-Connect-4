#version 300 es

precision mediump float;

in vec3 fsPos;
in vec3 fsNormal; 
in vec2 uvCoord;
out vec4 outColor;
uniform vec4 colour;
uniform sampler2D sampler;

uniform vec3 eyePosition;

// Help variables
uniform float lightType;
uniform float lightAmbient;
uniform float diffuseReflection;
uniform float diffuseSpecular;

// // Direct
uniform vec3 directDir;
uniform vec4 directColor;
uniform vec4 pointColor;

// // Point
uniform vec3 pointPos;
uniform float pointDecay;
uniform float pointTargetG;

// // Spot
uniform vec3 spotPos;
uniform float spotDecay;
uniform float spotTargetG;
uniform vec3 spotDir;
uniform float spotConeIn;
uniform float spotConeOut;
uniform vec4 spotColor;

// Lambert
uniform float lambertTexture;
uniform vec4 lambertColor;
//Ambient
uniform vec4 ambientColor;

// Hemispheric
uniform vec3 hemisphericDir;
uniform vec4 ambientLowerColor;
uniform vec4 ambientUpperColor;

// Specular Phong
uniform float phongShiny;
uniform vec4 phongColor;

// Specula Blinn
uniform float blinnShiny;
uniform vec4 blinnColor;


// Compute light direction
vec3 computeLightDir(vec3 sPos, vec3 pPos, vec3 Dir, float lType) {
  if (lType == 0.0) {
    // Direct
    return Dir;
  } else if (lType == 1.0) {
    // Point 
    return normalize(pPos - fsPos);
  } else if (lType == 2.0) {
    // Spot
    return normalize(sPos - fsPos);
  } else {
    return Dir;
  }
}

// Compute light color
vec4 computeLightColor(vec4 dColor, vec4 sColor, vec4 pColor, float pDecay, vec3 pPos, float sDecay, vec3 spotPosition, float sConeIn, float sConeOut, vec3 dir, float lType) {
  if (lType == 0.0) {
    // Direct
    return dColor;
  } else if (lType == 1.0) {
    // Point
    return pColor * pow(pointTargetG / length(pPos - fsPos), pDecay);
  } else if (lType == 2.0) {
    // Spot
    vec3 spotLightDir = normalize(spotPosition - fsPos);
    float cosAngle = dot(spotLightDir, spotDir);
    return sColor * pow(spotTargetG/length(spotPosition - fsPos), sDecay) * clamp(((cosAngle - sConeOut) / (sConeIn - sConeOut)), 0.0, 1.0);
    } else {
    return dColor * vec4(0.0, 0.0, 0.0, 1.0);
  }
}

// Compute diffuse light
vec4 computeDiffuse(vec3 lightDirection, vec4 lightColor, vec3 nVec, vec4 diffLColor, float diffuseReflection) {
    float dotN = clamp(dot(nVec, lightDirection), 0.0, 1.0);    
    if (diffuseReflection == 0.0) { //Lamber
        vec4 col = lightColor * diffLColor;
        return dotN * col;
    } else {
        // None
        return vec4(0.0, 0.0, 0.0, 1.0);
    }
}

// Compute ambient light
vec4 computeAmbient(vec4 ambColor, vec3 normalVec, float type, vec3 hemisphericDir,vec4 ambientUpperColor,vec4 ambientLowerColor) {
  if (type == 0.0) {
    // Ambient
    return ambColor * ambientColor;
  } else if (type == 1.0) {
    // Hemispheric
    float blend = (dot(normalVec, hemisphericDir) + 1.0) / 2.0;
    return (ambientUpperColor * blend + ambientLowerColor * (1.0 - blend)) * ambColor;
  } else {
    // None
    return vec4(0.0, 0.0, 0.0, 1.0);
  }
}

// Compute specular light
vec4 computeSpecular(vec3 lightDir, vec4 lightCol, vec3 normalVec, vec3 eyeDir, float type) {
  float dotN = clamp(dot(normalVec, lightDir), 0.0, 1.1);
  vec3 ref = -reflect(lightDir, normalVec);
  float dotR = clamp(dot(ref, eyeDir), 0.0, 1.0);
  vec3 halfVec = (normalize(lightDir + eyeDir));
  float hDotN = clamp(dot(normalVec, halfVec), 0.0, 1.0);
  if (type == 0.0) {
    // Phong
    return lightCol * phongColor * max(sign(dotN), 0.0) * pow(dotR, phongShiny);
  } else if (type == 1.0) {
    // Blinn
    return lightCol * blinnColor * max(sign(dotN), 0.0) * pow(hDotN, blinnShiny);
  } else {
    return vec4(0.0, 0.0, 0.0, 0.0);
  }
}

void main() {
 
    vec3 nEyeDirection = normalize(eyePosition - fsPos);
    vec3 nNormal = normalize(fsNormal);
    vec4 textureColor = texture(sampler, uvCoord);

    vec4 diffLColor = lambertColor * (1.0 - lambertTexture) + textureColor * (lambertTexture);
 
    vec4 ambientMatColor = ambientColor * 0.2 + textureColor * 0.8;

    vec3 lightDir = computeLightDir(spotPos, pointPos, directDir, lightType);
    vec4 lightCol = computeLightColor(directColor, spotColor, pointColor, pointDecay, pointPos, spotDecay, spotPos, spotConeIn/100.0, spotConeOut, lightDir, lightType);

    vec4 diffuse = computeDiffuse(lightDir, lightCol, nNormal, diffLColor, diffuseReflection);

    vec4 ambient = computeAmbient(ambientMatColor, nNormal, lightAmbient, hemisphericDir, ambientUpperColor, ambientLowerColor);

    vec4 specular = computeSpecular(lightDir, lightCol, nNormal, nEyeDirection, diffuseSpecular);

    outColor = clamp(diffuse + ambient + specular, 0.0, 1.0);
    outColor = vec4(outColor.rgb, 1.0);
}
