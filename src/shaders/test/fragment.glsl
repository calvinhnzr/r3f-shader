// precision of float;
precision mediump float;

uniform vec3 uColor;

void main() {
  // rgba
  // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  gl_FragColor = vec4(uColor, 1.0);

}
