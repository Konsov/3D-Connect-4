#version 300 es


precision mediump float;
in vec3 fs_pos;
out vec4 outColor;

void main() {
  outColor = vec4(fs_pos,1.0);
}