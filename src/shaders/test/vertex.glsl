uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main() {
  // mesh related transformations
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  // modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;

  modelPosition.z += aRandom * 0.1;
  // camera related transformations
  vec4 viewPosition = viewMatrix * modelPosition;

  // clipspace
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vRandom = aRandom;
}
