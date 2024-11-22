uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying float vElevetion;

void main() {
  float mixStrength = (vElevetion + uColorOffset) * uColorMultiplier;

  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
  gl_FragColor = vec4(vec3(color), 1.0);

  #include <colorspace_fragment>

}
