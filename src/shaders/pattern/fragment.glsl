varying vec2 vUv;
varying vec3 vPosition;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  // RGB 0.0 -> 1.0
  // Strength
  vec3 pattern1 = vec3(vUv.x, vUv.y, 1.0);
  vec3 pattern1a = vec3(vUv, 0.5);
  vec3 pattern2 = vec3(vUv, 0.0);
  vec3 pattern3 = vec3(vUv.x);
  vec3 pattern4 = vec3(vUv.y);
  // Invert direction
  vec3 pattern5 = vec3(1.0 - vUv.y);
  vec3 pattern6 = vec3(vUv.y * 10.0);
  vec3 pattern7 = vec3(mod(vUv.y * 10.0, 1.0));
  vec3 pattern8 = vec3(mod(vUv.y * 10.0, 1.0));
  pattern8 = step(0.5, pattern8);
  vec3 pattern9 = vec3(mod(vUv.y * 10.0, 1.0));
  pattern9 = step(0.8, pattern9);
  vec3 pattern10 = vec3(mod(vUv.x * 10.0, 1.0));
  pattern10 = step(0.8, pattern10);
  // grid
  float pattern11 = step(0.8, mod(vUv.x * 10.0, 1.0));
  pattern11 += step(0.8, mod(vUv.y * 10.0, 1.0));
  // white dots
  float pattern12 = step(0.8, mod(vUv.x * 10.0, 1.0));
  pattern12 *= step(0.8, mod(vUv.y * 10.0, 1.0));
  // stripes
  float pattern13 = step(0.4, mod(vUv.x * 10.0, 1.0));
  pattern13 *= step(0.8, mod(vUv.y * 10.0, 1.0));
  // edges
  float barX14 = step(0.4, mod(vUv.x * 10.0, 1.0));
  barX14 *= step(0.8, mod(vUv.y * 10.0, 1.0));
  float barY14 = step(0.8, mod(vUv.x * 10.0, 1.0));
  barY14 *= step(0.4, mod(vUv.y * 10.0, 1.0));
  float pattern14 = barX14 + barY14;
  // crosses
  float barX15 = step(0.4, mod(vUv.x * 10.0, 1.0));
  barX15 *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
  float barY15 = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
  barY15 *= step(0.4, mod(vUv.y * 10.0, 1.0));
  float pattern15 = barX15 + barY15;
  // centered gradient
  float pattern16 = abs(vUv.x - 0.5);
  // cross gradient
  float pattern17 = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
  // box gradient
  float pattern18 = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
  // black box
  float pattern19 = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
  pattern19 = step(0.2, pattern19);
  // white box
  float pattern19a = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
  pattern19a = step(pattern19a, 0.2);
  // bigger black box
  float pattern20 = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
  pattern20 = step(0.2, pattern20 * 0.5);
  // gradient hard
  float pattern21 = floor(vUv.x * 10.0) / 10.0;
  // pixel gradient
  float pattern22 = floor(vUv.x * 10.0) / 10.0;
  pattern22 *= floor(vUv.y * 10.0) / 10.0;
  // random noise
  float pattern23 = random(vUv);
  // pixel random noise
  vec2 gridUv24 = vec2(
    floor(vUv.x * 10.0) / 10.0,
    //
    floor(vUv.y * 10.0) / 10.0
  );
  float pattern24 = random(gridUv24);
  // offset pixel random noise
  vec2 gridUv25 = vec2(
    floor(vUv.x * 10.0) / 10.0,
    //
    floor((vUv.y + vUv.x * 0.5) * 10.0) / 10.0
  );
  float pattern25 = random(gridUv25);
  float pattern26 = length(vUv);
  // centered circle
  float pattern27 = distance(vUv, vec2(0.5, 0.5));
  // inverted centered circle
  float pattern28 = 1.0 - distance(vUv, vec2(0.5, 0.5));
  // small circle
  float pattern29 = 0.02 / distance(vUv, vec2(0.5));
  // stretched circle
  vec2 lightUv30 = vec2(
    vUv.x * 0.2 + 0.4,
    //
    vUv.y * 0.5 + 0.25
  );
  float pattern30 = 0.02 / distance(lightUv30, vec2(0.5));

  gl_FragColor = vec4(vec3(patternX), 1.0);
}
