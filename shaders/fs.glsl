#version 300 es
precision mediump float;

in vec3 fsNormal;
in vec3 fsPosition; 
out vec4 outColor;

uniform vec3 mDiffColor; //material diffuse color 
uniform vec3 LAlightColor; //point light color 
uniform vec3 LAPos; //point light position
uniform float LATarget; //point light target
uniform float LADecay; //point light decay

void main() {
  
  vec3 lightColorA = LAlightColor * pow(LATarget / length(LAPos - fsPosition), LADecay);

  vec3 nNormal = normalize(fsNormal);
  vec3 lightDirNorm = normalize(LAPos - fsPosition);
  vec3 lambertColour = mDiffColor * lightColorA * dot(lightDirNorm,nNormal);

  outColor = vec4(clamp(lambertColour, 0.0, 1.0),1.0); 
}