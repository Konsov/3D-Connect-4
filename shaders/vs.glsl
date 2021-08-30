#version 300 es
in vec3 inPosition;
in vec3 inNormal;
in vec2 a_uv;

out vec2 uvCoord;
out vec3 fsNormal;
out vec3 fsPos;

uniform mat4 matrix;      //For world space transformo normal and postions:
uniform mat4 nMatrix;     //matrix to transform normals
uniform mat4 pMatrix;     //matrix to transform positions

void main() {
    uvCoord = a_uv;
    fsNormal = mat3(nMatrix) * inNormal; 
    fsPos = (pMatrix * vec4(inPosition, 1.0)).xyz;
    gl_Position = matrix * vec4(inPosition, 1.0);
}