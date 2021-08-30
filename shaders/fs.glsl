#version 300 es

precision mediump float;

in vec2 uvCoord;
in vec3 fsNormal;
in vec3 fsPos; 
out vec4 outColor;

uniform vec3 mDiffColor; //material diffuse color 
uniform vec3 LAlightColor; //point light color 
uniform vec3 pointPos; //point light position
uniform float pointTargetG; //point light target
uniform float pointDecay; //point light decay

uniform sampler2D sampler;

void main() {
    vec3 nNormal = normalize(fsNormal);
    vec3 textureCol = texture(sampler, uvCoord).rgb;

    vec3 lightColorA = LAlightColor * pow(pointTargetG / length(pointPos - fsPos), pointDecay);
    vec3 lightDirNorm = normalize(pointPos - fsPos);

    vec3 diffColor = mDiffColor * 0.1 + textureCol * 0.9;

    vec3 lambertColour = diffColor * lightColorA * dot(lightDirNorm,nNormal);

    outColor = vec4(clamp(lambertColour, 0.0, 1.0), 1.0);
   
}