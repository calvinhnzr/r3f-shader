// Sampler2D for Images
uniform sampler2D uPerlinTexture;

varying vec2 vUv;

void main() {
  // Smoke
  // One Channel for GrayScale Picture
  float smoke = texture(uPerlinTexture, vUv).r;

  // Final Color
  vec4 color = vec4(smoke, smoke, 1.0, 1.0);
  gl_FragColor = color;

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
