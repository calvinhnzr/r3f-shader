// precision of float;
precision mediump float;

varying float vRandom;

void main() {
  // rgba
  gl_FragColor = vec4(vRandom, vRandom, 1.0, 1.0);

}
