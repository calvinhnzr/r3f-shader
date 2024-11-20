uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;

attribute vec3 position;

void main() {
  // mesh related transformations
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  modelPosition.z += sin(modelPosition.x * uFrequency.x) * 0.1;
  modelPosition.z += sin(modelPosition.y * uFrequency.y) * 0.1;

  // camera related transformations
  vec4 viewPosition = viewMatrix * modelPosition;

  // clipspace
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

}
