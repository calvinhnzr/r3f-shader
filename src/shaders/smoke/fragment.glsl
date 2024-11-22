// Sampler2D for Images
uniform sampler2D uPerlinTexture;
uniform float uTime;
// uv Coordinates
varying vec2 vUv;

void main() {
  // Scale and Animate
  vec2 smokeUv = vUv;
  smokeUv.x *= 0.5;
  smokeUv.y *= 0.3;
  smokeUv.y -= uTime * 0.03;

  // Smoke
  // One Channel for GrayScale Picture
  float smoke = texture(uPerlinTexture, smokeUv).r;

  // Final Color
  vec4 finalColor = vec4(vec3(1.0), smoke);
  gl_FragColor = finalColor;

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
