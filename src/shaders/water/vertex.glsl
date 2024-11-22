uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uWaveSpeed;

varying float vElevetion;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  float elevation =
    sin(modelPosition.x * uBigWavesFrequency.x + uTime * uWaveSpeed) *
    sin(modelPosition.z * uBigWavesFrequency.y + uTime * uWaveSpeed) *
    uBigWavesElevation;
  modelPosition.y += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;

  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  vElevetion = elevation;

}
