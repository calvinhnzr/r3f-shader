uniform float uTime;

varying vec3 vPostion;
varying vec3 vNormal;

void main() {
  // Absolute Postion
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  // Model Normal
  vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

  vPostion = modelPosition.xyz;
  vNormal = modelNormal.xyz;
}
