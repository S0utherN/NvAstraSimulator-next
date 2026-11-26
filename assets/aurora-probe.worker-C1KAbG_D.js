const O0=`
// Jarzynski & Olano 2020, "Hash Functions for GPU Rendering", pcg4d.
uvec4 pcg4d(uvec4 v) {
  v = v * 1664525u + 1013904223u;
  v.x += v.y * v.w; v.y += v.z * v.x; v.z += v.x * v.y; v.w += v.y * v.z;
  v ^= v >> 16u;
  v.x += v.y * v.w; v.y += v.z * v.x; v.z += v.x * v.y; v.w += v.y * v.z;
  return v;
}

uvec4 g_key;
uvec4 g_block;
int g_used;

void rngInit(uvec4 key) { g_key = key; g_block = pcg4d(key); g_used = 0; }

// Uniform on (0, 1], 24-bit resolution; never returns 0 so log() is safe.
float rngU01() {
  if (g_used == 4) { g_block = pcg4d(g_block ^ g_key.wzyx); g_used = 0; }
  uint u = g_block[g_used];
  g_used++;
  return (float(u >> 8u) + 1.0) * (1.0 / 16777216.0);
}

float rngNormal() {
  float r = sqrt(-2.0 * log(rngU01()));
  return r * cos(6.283185307179586 * rngU01());
}

const float LOG_FACT[10] = float[10](0.0, 0.0, 0.6931471805599453, 1.791759469228055,
  3.1780538303479458, 4.787491742782046, 6.579251212010101, 8.525161361065415,
  10.60460290274525, 12.801827480081469);

// log(mu^k e^-mu / k!) written as a Stirling difference so float32 does not
// cancel k*log(mu) against log(k!) for large means.
float logPoissonPmf(float k, float mu) {
  if (k < 10.0) return -mu + k * log(mu) - LOG_FACT[int(k)];
  float inv = 1.0 / k;
  return -k * log(k / mu) + (k - mu) - 0.5 * log(k) - 0.9189385332046727
    - inv / 12.0 + inv * inv * inv / 360.0;
}

float poissonSample(float mu) {
  if (mu <= 0.0) return 0.0;
  if (mu < 10.0) {
    float limit = exp(-mu), p = 1.0, n = 0.0;
    for (int i = 0; i < 96; i++) {
      p *= rngU01();
      if (p <= limit) return n;
      n += 1.0;
    }
    return n;
  }
  if (mu >= 1.0e4) {
    // Skewness 1/sqrt(mu) <= 0.01: continuity-corrected normal.
    return max(0.0, floor(mu + sqrt(mu) * rngNormal() + 0.5));
  }
  // PTRS, Hoermann 1993 (same constants as physics/noise/distributions.ts).
  float b = 0.931 + 2.53 * sqrt(mu), a = -0.059 + 0.02483 * b;
  float invAlpha = 1.1239 + 1.1328 / (b - 3.4), vr = 0.9277 - 3.6224 / (b - 2.0);
  for (int i = 0; i < 64; i++) {
    float u = rngU01() - 0.5, v = rngU01(), us = 0.5 - abs(u);
    float k = floor((2.0 * a / us + b) * u + mu + 0.43);
    if (k < 0.0) continue;
    if (us >= 0.07 && v <= vr) return k;
    if (us < 0.013 && v > us) continue;
    if (log(v) + log(invAlpha) - log(a / (us * us) + b) <= logPoissonPmf(k, mu)) return k;
  }
  return floor(mu + 0.5);
}

// Marsaglia-Tsang, scale 1; shape < 1 boosted by U^(1/shape).
float gammaSample(float shape) {
  float boost = 1.0;
  if (shape < 1.0) { boost = pow(rngU01(), 1.0 / shape); shape += 1.0; }
  float d = shape - 1.0 / 3.0, c = 1.0 / sqrt(9.0 * d);
  for (int i = 0; i < 64; i++) {
    float x = rngNormal(), t = 1.0 + c * x;
    if (t <= 0.0) continue;
    float v = t * t * t, u = rngU01();
    if (u < 1.0 - 0.0331 * x * x * x * x || log(u) < 0.5 * x * x + d * (1.0 - v + log(v))) return d * v * boost;
  }
  return d * boost;
}

// Output charge (electrons) for n input events with mean gain G and excess
// noise factor F2 = E[g^2]/E[g]^2: sum of n Gamma(1/(F2-1)) gains.
float mcpCharge(float n, float gain, float f2) {
  if (n <= 0.0) return 0.0;
  if (f2 <= 1.0000001) return n * gain;
  return gammaSample(n / (f2 - 1.0)) * (f2 - 1.0) * gain;
}
`,qo={gain:.3,sat:.25,hzMin:3,hzMax:14},ze=`#version 300 es
precision highp float;
precision highp int;
precision highp sampler2D;
`,eo=e=>ze.replace("#version 300 es",`#version 300 es
#define ${e}`),ys=/^[ \t]*\/\*@slot:([\w-]+)\*\/[ \t]*\n/gm,Gt=e=>e.replace(ys,""),k0=(e,t)=>e.replace(ys,(o,a)=>t(a)),yt=ze+`
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() { gl_Position = vec4(P[gl_VertexID], 0.0, 1.0); }
`,pt=`
uniform sampler2D u_lut;
uniform int u_nodes;
uniform float u_maxAngle;
vec4 lutAt(int row, float angle) {
  float x = clamp(angle / u_maxAngle, 0.0, 1.0) * float(u_nodes - 1);
  int i0 = int(floor(x));
  int i1 = min(i0 + 1, u_nodes - 1);
  return mix(texelFetch(u_lut, ivec2(i0, row), 0), texelFetch(u_lut, ivec2(i1, row), 0), x - float(i0));
}
uniform int u_tNodes;
uniform vec2 u_logT;          // log(Tmin), log(Tmax)
float starWeight(float temperature, float angle) {
  float x = clamp((log(temperature) - u_logT.x) / (u_logT.y - u_logT.x), 0.0, 1.0) * float(u_tNodes - 1);
  int k0 = int(floor(x));
  int k1 = min(k0 + 1, u_tNodes - 1);
  return mix(lutAt(2 + k0, angle).x, lutAt(2 + k1, angle).x, x - float(k0));
}
#if defined(SKY_DIRECT) || defined(STAR_SKY)
// Horizon mode (D155), free sky only. u_hz (RGBA32F, HZ_WIDTH wide): columns 0..u_hzNodes-1 are altitude nodes at
// 90 (i / (n - 1))^2 degrees (dense near the horizon). Row 0: the four map channels' atmospheric factor, row 1: x the
// sky's factor, y (column 0) the ground's rate over the reference sky rate; rows 2..: each star colour temperature's
// factor (x). All are relative to the spectral LUT's own altitude (u_lut is computed there). Row 2 + u_tNodes: the
// landscape, per quarter degree of azimuth (column = 4 x azimuth): x = sin of the true altitude below which the ground hides
// the sky (refraction and the silhouette, D156), 4 columns per degree (1440 wide). u_hzOn 0: nothing here is read.
uniform sampler2D u_hz;
uniform int u_hzOn;
uniform int u_hzNodes;
uniform vec3 u_zenith, u_hzNorth, u_hzEast;  // ICRS unit vectors of the observer's up, north and east
uniform float u_hzEdgeMax;                   // the edge row's maximum: above it nothing can be hidden (skips the azimuth lookup)
float hzX(float s) { return sqrt(asin(clamp(s, 0.0, 1.0)) * 0.63661977) * float(u_hzNodes - 1); }
vec4 hzAt(int row, float x) {
  int i0 = int(floor(x));
  int i1 = min(i0 + 1, u_hzNodes - 1);
  return mix(texelFetch(u_hz, ivec2(i0, row), 0), texelFetch(u_hz, ivec2(i1, row), 0), x - float(i0));
}
// sin(altitude) of the ground's edge towards direction d (linear between quarter degrees of azimuth).
float hzEdge(vec3 d) {
  float az = degrees(atan(dot(d, u_hzEast), dot(d, u_hzNorth)));
  float a = (az < 0.0 ? az + 360.0 : az) * 4.0;
  int i0 = min(int(floor(a)), 1439);
  int i1 = i0 == 1439 ? 0 : i0 + 1;
  int row = 2 + u_tNodes;
  return mix(texelFetch(u_hz, ivec2(i0, row), 0).x, texelFetch(u_hz, ivec2(i1, row), 0).x, a - float(i0));
}
// A catalogue star's factor: 0 behind the ground, else its colour's atmospheric factor at its altitude.
float hzStar(vec3 d, float temperature) {
  if (u_hzOn == 0) return 1.0;
  float s = dot(d, u_zenith);
  if (s < u_hzEdgeMax) { if (s < hzEdge(d)) return 0.0; }
  float x = hzX(s);
  float t = clamp((log(temperature) - u_logT.x) / (u_logT.y - u_logT.x), 0.0, 1.0) * float(u_tNodes - 1);
  int k0 = int(floor(t));
  int k1 = min(k0 + 1, u_tNodes - 1);
  return mix(hzAt(2 + k0, x).x, hzAt(2 + k1, x).x, t - float(k0));
}
#ifdef SKY_DIRECT
// 1.3.2 (D170, sim/horizon-table.ts moonGain): the moonlight share of the sky's factor (row 1 z) rescaled by the
// direction's angle from the Moon over the table geometry's at its altitude, Krisciunas & Schaefer's Rayleigh + Mie
// terms with the band's weights; rho at least 2 degrees. u_moonOn 0: the table's factor as it is.
uniform int u_moonOn;
uniform vec3 u_moonDir;    // the Moon's direction (ICRS)
uniform vec2 u_moonTable;  // sin(Moon altitude), cos(Moon altitude) cos(view centre's azimuth from the Moon)
uniform vec2 u_moonMix;    // the band's Rayleigh and Mie weights
float moonScatter(float c) {
  float r = max(2.0, degrees(acos(clamp(c, -1.0, 1.0))));
  float k = cos(radians(r));
  return u_moonMix.x * (1.06 + k * k) + u_moonMix.y * pow(10.0, 0.79 - r / 40.0);
}
float hzMoon(vec3 d, float s, vec4 row1) {
  if (u_moonOn == 0) return row1.x;
  float cTable = s * u_moonTable.x + sqrt(max(0.0, 1.0 - s * s)) * u_moonTable.y;
  return row1.x + row1.z * (moonScatter(dot(d, u_moonDir)) / moonScatter(cTable) - 1.0);
}
// D171: the Moon's disk on the sky's factor (radiance over the LUT's sky): x sunlit, y earthshine, z angular radius (rad).
// A sphere lit from u_sunDir: the point of the disk at d has the normal -m sqrt(1 - r^2) + o r (o: the direction of d
// from the disk's centre m on the sky, r its distance over the radius); sunlit where it faces the Sun. The edge is
// anti-aliased over one cell (edgeTan, the cell pitch in TAN units). The angle comes from |d - m (d.m)| = sin, not acos.
uniform vec3 u_moonDisk;
uniform vec3 u_sunDir;
float moonDisk(vec3 d, float edgeTan) {
  if (u_moonOn == 0 || u_moonDisk.x <= 0.0) return 0.0;
  float c = dot(d, u_moonDir);
  if (c <= 0.0) return 0.0;
  vec3 o = d - u_moonDir * c;
  float a = u_moonDisk.z, ang = asin(min(1.0, length(o)));
  if (ang > a + edgeTan) return 0.0;
  float cover = clamp((a - ang) / max(edgeTan, 1e-7) + 0.5, 0.0, 1.0), r = min(ang / a, 1.0);
  vec3 n = -u_moonDir * sqrt(max(0.0, 1.0 - r * r)) + (ang > 0.0 ? normalize(o) : vec3(0.0)) * r;
  float lit = smoothstep(-0.03, 0.03, dot(n, u_sunDir));
  return cover * mix(u_moonDisk.y, u_moonDisk.x, lit);
}
#endif
// 1.3.2 (D169, small twinkle at the zenith, large at the horizon): a star's own airmass (Kasten & Young 1989, true altitude, at least 0) over the
// airmass the seeing was computed at (u_hzXRef; 0 = no rescaling). Image motion grows as its square root (tilt variance
// ~ r0^-5/3 ~ X), the scintillation index (u_scintIndex, unsaturated, at u_hzXRef) as the cube (Young), saturating at 1.
uniform float u_hzXRef;
uniform float u_scintIndex;
float hzAirmass(float s) { float h = max(degrees(asin(clamp(s, -1.0, 1.0))), 0.0); return 1.0 / (sin(radians(h)) + 0.50572 * pow(h + 6.07995, -1.6364)); }
vec2 hzSeeing(vec3 d, float tiltMm, float scint) {
  if (u_hzOn == 0 || u_hzXRef <= 0.0) return vec2(tiltMm, scint);
  float q = hzAirmass(dot(d, u_zenith)) / u_hzXRef;
  return vec2(tiltMm * sqrt(q), scint > 0.0 ? sqrt(log(1.0 + min(1.0, u_scintIndex * q * q * q))) : 0.0);
}
#endif
`,ws=`
#ifdef STAR_SKY
layout(location=0) in vec4 a_dir;             // ICRS unit vector, F_lambda(550 nm) W/m^2/nm
layout(location=1) in uint a_seed;            // stable global sky ID
layout(location=2) in float a_T;              // colour temperature K
uniform vec3 u_axis, u_west, u_north;         // the virtual plane's TAN frame (tangent point = the view axis)
vec4 starAttr() { float dz = dot(a_dir.xyz, u_axis); return vec4(dz > 1e-6 ? vec2(dot(a_dir.xyz, u_west), dot(a_dir.xyz, u_north)) / dz : vec2(1e9), a_dir.w, a_T); }
#else
layout(location=0) in vec4 a_star;            // TAN-plane X (west+), Y (north+), F_lambda(550 nm) W/m^2/nm, colour temperature K
layout(location=1) in uint a_seed;            // original catalogue ordinal or stable global sky ID
vec4 starAttr() { return a_star; }
#endif
`,Lr=ws+`
uniform vec2 u_originMm;   // mm position of texel (0,0) centre
uniform float u_pitchMm;
uniform float u_focalMm;
uniform float u_cathodeR;
uniform float u_sceneScale;
uniform vec2 u_size;
// Moving seeing (0 = static): one-axis rms image motion (mm), log-normal scintillation sigma, time (s), frame.
uniform float u_tiltMm;
uniform float u_scint;
uniform float u_time;       // exposure midpoint (s)
uniform float u_exposureS;  // rectangular window duration (s)
uniform uint u_frame;
uniform mat3 u_point;      // camera -> atlas axes (telescope pointing); its transpose maps atlas -> camera
out vec2 v_cell;
out float v_rate;
#ifdef STAR_SKY
// 1.4.0-pre.3 (sim/twinkle.ts): the horizon mode's twinkle. Amplitude: the variance saturates softly (and lower than the old
// hard clip at 1) as TW_SAT * tanh(TW_GAIN * index / TW_SAT); time: see main(). Only the free sky's stars; the default sky keeps hzSeeing's.
const float TW_GAIN = ${qo.gain.toFixed(4)};
const float TW_SAT = ${qo.sat.toFixed(4)};
const float TW_HZ_MIN = ${qo.hzMin.toFixed(4)};
const float TW_HZ_LN = ${Math.log(qo.hzMax/qo.hzMin).toFixed(6)};  // ln(max / min): f = min * exp(h * this), h in [0, 1)
float hzTwinkleSigma(vec3 d) {
  float q = hzAirmass(dot(d, u_zenith)) / u_hzXRef;
  return sqrt(log(1.0 + TW_SAT * tanh(TW_GAIN * u_scintIndex * q * q * q / TW_SAT)));
}
#endif
/*@slot:star-vs-uniforms*/
uint hashU(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hashF(uint x) { return float(hashU(x) >> 8) * (1.0 / 16777216.0); }
void main() {
  vec4 star = starAttr();
  vec3 cam = transpose(u_point) * vec3(star.xy, 1.0);
  vec2 mm = cam.z > 1e-6 ? cam.xy / cam.z * u_focalMm : vec2(1e9);
  float r = length(mm);
  // Point source: total rate = F550 * w(T, angle) * f^2 (w already includes the band width).
  float rate = star.z * starWeight(star.w, atan(r / u_focalMm)) * u_sceneScale * u_focalMm * u_focalMm * 1.0e-3;
  vec2 seeing = vec2(u_tiltMm, u_scint);
#ifdef STAR_SKY
  rate *= hzStar(a_dir.xyz, star.w);  // D155 horizon mode: hidden by the ground, else its altitude's extinction (1 when off)
  seeing = hzSeeing(a_dir.xyz, u_tiltMm, u_scint);  // 1.3.2 horizon mode: its own airmass (unchanged when off)
  if (u_hzOn != 0 && u_hzXRef > 0.0 && u_scint > 0.0) seeing.y = hzTwinkleSigma(a_dir.xyz);  // 1.4.0-pre.3: the horizon's twinkle law
#endif
  uint id = a_seed * 7919u + 17u;
  if (seeing.x > 0.0) {
    // Exact rectangular average of three sinusoids per star/axis (0.7-14 Hz).
    // The unresolved within-window motion is an input-side Gaussian ensemble-variance blur.
    // Equal amplitudes a with 3 a^2 / 2 = tilt^2. Different stars move independently
    // (separations far beyond the isoplanatic angle).
    vec2 d = vec2(0.0);
    for (int k = 0; k < 6; k++) {
      uint h = hashU(id + uint(k) * 104729u);
      float f = 0.7 * exp(hashF(h) * 3.0), ph = 6.2831853 * hashF(h ^ 0x9e3779b9u);
      float v = sin(6.2831853 * f * u_time + ph);
      // Live observation keeps the original instantaneous path; only frozen snapshots integrate a trajectory.
      if (u_exposureS > 0.0) {
        float z = 3.14159265 * f * u_exposureS;
        v *= abs(z) < 1e-6 ? 1.0 : sin(z) / z;
      }
      if (k < 3) d.x += v; else d.y += v;
    }
    mm += d * seeing.x * 0.8164966;
  }
  if (seeing.y > 0.0) {
    // Finite-exposure scintillation: unit-mean log-normal approximation scaled by window duration.
    float u1 = max(1e-7, hashF(hashU(id ^ (u_frame * 2654435761u)))), u2 = hashF(hashU(id + u_frame * 40503u + 1u));
    float n = sqrt(-2.0 * log(u1)) * cos(6.2831853 * u2);
#ifdef STAR_SKY
    if (u_hzOn != 0 && u_hzXRef > 0.0) {
      // 1.4.0-pre.3 (sim/twinkle.ts): in horizon mode the star's log-intensity wanders smoothly (four sinusoids of
      // TW_HZ_MIN..TW_HZ_MAX hertz, unit variance) instead of a new random number every frame.
      n = 0.0;
      for (int k = 0; k < 4; k++) {
        uint h = hashU(id + uint(k) * 15485863u + 7u);
        n += cos(6.2831853 * TW_HZ_MIN * exp(hashF(h) * TW_HZ_LN) * u_time + 6.2831853 * hashF(h ^ 0x85ebca6bu));
      }
      n *= 0.7071068;
    }
#endif
    rate *= exp(seeing.y * n - 0.5 * seeing.y * seeing.y);
  }
  v_rate = rate;
  vec2 cell = (mm - u_originMm) / u_pitchMm;
  v_cell = cell;
  gl_PointSize = 3.0;
/*@slot:star-vs-size*/
  gl_Position = r > u_cathodeR || !(rate > 0.0) ? vec4(2.0, 2.0, 2.0, 1.0) : vec4((cell + 0.5) / u_size * 2.0 - 1.0, 0.0, 1.0);
}
`;Gt(ze+pt+Lr);const P0=Gt(eo("STAR_SKY")+pt+Lr),z0=ze+`
in vec2 v_cell;
in float v_rate;
out vec4 o;
/*@slot:star-fs-uniforms*/
void main() {
  vec2 d = abs(gl_FragCoord.xy - 0.5 - v_cell);
  vec2 w = max(vec2(0.0), 1.0 - d);
  o = vec4(v_rate * w.x * w.y, 0.0, 0.0, 0.0);
/*@slot:star-fs-main*/
}
`,D0=Gt(z0),I0=ws+`
uniform vec2 u_originMm;
uniform float u_pitchMm;
uniform float u_focalMm;
uniform float u_cathodeR;
uniform vec2 u_size;
uniform mat3 u_point;
uniform float u_radius;
out vec2 v_cell;
out float v_logFlux;
void main() {
  vec4 star = starAttr();
  vec3 cam = transpose(u_point) * vec3(star.xy, 1.0);
  vec2 mm = cam.z > 1e-6 ? cam.xy / cam.z * u_focalMm : vec2(1e9);
  vec2 cell = (mm - u_originMm) / u_pitchMm;
  v_cell = cell;
  v_logFlux = log(max(star.z, 1e-30));
  gl_PointSize = 2.0 * u_radius + 2.0;
  gl_Position = length(mm) > u_cathodeR ? vec4(2.0, 2.0, 2.0, 1.0) : vec4((cell + 0.5) / u_size * 2.0 - 1.0, 0.0, 1.0);
}
`;eo("STAR_SKY")+I0;const G0=ze+`
uniform float u_radius;
uniform float u_variance;
in vec2 v_cell;
in float v_logFlux;
out vec4 o;
/*@slot:star-map-uniforms*/
void main() {
  vec2 d = v_cell - (gl_FragCoord.xy - 0.5);
  float r2 = dot(d, d);
  if (r2 > u_radius * u_radius) discard;
/*@slot:star-map-main*/
  // ln F550 spans about -40..-10 here; the score only orders stars, so any monotone map into [0, 1] will do.
  gl_FragDepth = clamp((0.5 * r2 / u_variance - v_logFlux) / 160.0, 0.0, 1.0);
  o = vec4(d, 0.0, 1.0);
}
`;Gt(G0);const $0=`
#ifdef SKY_DIRECT
uniform vec3 u_axis, u_west, u_north;  // the virtual plane's TAN frame in ICRS (tangent point = the view axis)
uniform float u_pixelTan;              // HEALPix pixel spacing of the primary order (TAN units): sub-samples per cell
uniform float u_subSlack;              // an extension's slack: cells this much (in pixels) larger than a map pixel keep one fewer sample row; 0 in the product
#else
uniform sampler2D u_atlas;   // RGBA32F: Hα, [O III] 5007, [S II] (W/m^2/sr), continuum (W/m^2/sr/nm @550); Hα < 0 = invalid
// D119 (sim/cluster-profile.ts): a globular cluster's modelled unresolved light, added to the continuum. R32F table:
// column i at ln r = u_profileGeom.z + i / u_profileGeom.w around u_profileGeom.xy (TAN), row j smoothed by a Gaussian
// of sigma0 2^j; samples that lie a distance s apart read sigma = s (between two rows). u_profileSize.x = 0: none.
uniform sampler2D u_profile;
uniform ivec2 u_profileSize;
uniform vec4 u_profileGeom;
uniform float u_profileLogSigma0;
#endif
uniform int u_atlasSize;
uniform float u_atlasStep;   // TAN-plane units per atlas pixel
uniform vec2 u_atlasRef;     // pixel-centre coordinate of the tangent point
uniform sampler2D u_level0;  // finer levels: RGBA Hα, [O III] or -1, [S II] or -1 (keep coarser), validity
uniform sampler2D u_level1;
uniform sampler2D u_level2;  // levels 2-4: further non-overlapping regional patches (D88, D89)
uniform sampler2D u_level3;
uniform sampler2D u_level4;
uniform int u_levels;
uniform ivec2 u_levelSize[5];
uniform float u_levelStep[5];
uniform vec2 u_levelOrigin[5]; // TAN coordinate of level pixel (0,0) centre
// D123: 1 = a continuum level (R holds the F550 continuum, G/B unused): it replaces the continuum band, not the lines.
uniform float u_levelCont[5];
// D124: mip levels 1..u_mips of the atlas and of every level (MIP_FS: 2x2 means, a mip texel invalid where any of its
// four is). A cell reads each image at the coarsest mip whose texels are at most half the cell (the full-resolution
// image when it is coarser than that), so it needs at most 2 x 2 sub-samples where it took up to 8 x 8.
uniform int u_mips;
uniform mat3 u_point;        // camera -> atlas axes (telescope pointing)
uniform float u_cellTan;     // cell pitch in TAN units: sub-samples average the cell area (flux-conserving)
uniform sampler2D u_stars;   // R16F/R32F: star electron/s per texel x1e-3, bright stars (static mean positions)
uniform sampler2D u_starsFaint; // same, the fainter stars, which never move with the seeing (0.6.1)
uniform vec2 u_originMm;
uniform float u_pitchMm;
uniform float u_focalMm;
uniform float u_cathodeR;
uniform float u_sceneScale;
uniform float u_starsInRate;  // 1: bright stars are part of the static rate; 0: rendered per frame (moving seeing)
uniform float u_maxSub;       // cap on k (8 at rest; lower while the view is dragged)
// D79 (naked eye, blurred base map): 0 = everything; 1 = target + sky only; 2 = the stars added to u_base (R rate, G mask,
// both blurred: 1.3.3 normalises the rate by the mask).
uniform int u_part;
uniform sampler2D u_base;
/*@slot:rate-outputs*/
out vec4 o;
/*@slot:rate-outputs-end*/

// D124: the mip of an image of pixel step "step" for this cell (see u_mips): the coarsest whose texels are at most half
// the cell, so 2 x 2 to 4 x 4 sub-samples; an image less than four texels across the cell is read at full resolution as
// before. "single": a one-sample cell (a drag) reads the coarsest mip whose texels are at most the cell.
int mipFor(float step, bool single) {
  float r = u_cellTan / (step * (single ? 1.0 : 2.0));
  return r < 2.0 ? 0 : min(u_mips, int(floor(log2(r) + 1e-4)));
}
// Mip m of an image: texel j covers full-resolution texels [2^m j, 2^m (j + 1)), centre at 2^m (j + 0.5) - 0.5.
vec2 mipCoord(vec2 s, int m) { return m == 0 ? s : (s + 0.5) / float(1 << m) - 0.5; }
// A complete mipmap halves rounding down (renderer.buildMips stops before a side would reach 1).
ivec2 mipSize(ivec2 size, int m) { return size >> m; }
#ifndef SKY_DIRECT
vec4 atlasTexel(ivec2 q, int m) {
  int n = u_atlasSize >> m;
  if (q.x < 0 || q.y < 0 || q.x >= n || q.y >= n) return vec4(-1.0);
  return texelFetch(u_atlas, q, m);
}
vec4 atlasBilinear(vec2 tan, int m, out bool ok) {
  vec2 s = mipCoord(tan / u_atlasStep + u_atlasRef, m);
  ivec2 i0 = ivec2(floor(s));
  vec2 f = s - vec2(i0);
  vec4 a = atlasTexel(i0, m), b = atlasTexel(i0 + ivec2(1, 0), m), c = atlasTexel(i0 + ivec2(0, 1), m), d = atlasTexel(i0 + ivec2(1, 1), m);
  ok = min(min(a.x, b.x), min(c.x, d.x)) >= 0.0;
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float profileRow(int j, int i, float fx) {
  return mix(texelFetch(u_profile, ivec2(i, j), 0).r, texelFetch(u_profile, ivec2(i + 1, j), 0).r, fx);
}
float profileAt(vec2 t, float spacing) {
  if (u_profileSize.x == 0) return 0.0;
  float x = max(0.0, (log(max(length(t - u_profileGeom.xy), 1e-12)) - u_profileGeom.z) * u_profileGeom.w);
  if (x >= float(u_profileSize.x - 1)) return 0.0;
  float y = clamp((log(max(spacing, 1e-30)) - u_profileLogSigma0) * 1.44269504, 0.0, float(u_profileSize.y - 1));
  int i = int(x), j0 = int(y), j1 = min(j0 + 1, u_profileSize.y - 1);
  float fx = x - float(i);
  return mix(profileRow(j0, i, fx), profileRow(j1, i, fx), y - float(j0));
}
#endif
vec4 levelTexel(int k, ivec2 q, int m) {
  ivec2 n = mipSize(u_levelSize[k], m);
  if (q.x < 0 || q.y < 0 || q.x >= n.x || q.y >= n.y) return vec4(0.0);
  return k == 0 ? texelFetch(u_level0, q, m) : k == 1 ? texelFetch(u_level1, q, m) : k == 2 ? texelFetch(u_level2, q, m) : k == 3 ? texelFetch(u_level3, q, m) : texelFetch(u_level4, q, m);
}
// Bilinear level sample at mip m; w = coverage weight (0 outside, feathered over 6 full-resolution px at the edge).
vec4 levelSample(int k, vec2 tan, int m, out float w) {
  vec2 s0 = (tan - u_levelOrigin[k]) / u_levelStep[k];
  float edge = min(min(s0.x, s0.y), min(float(u_levelSize[k].x - 1) - s0.x, float(u_levelSize[k].y - 1) - s0.y));
  // Outside the feather's support the contribution is exactly zero. Wide fields spend most pixels here.
  if (edge <= 0.0) { w = 0.0; return vec4(0.0); }
  vec2 s = mipCoord(s0, m);
  ivec2 i0 = ivec2(floor(s));
  vec2 f = s - vec2(i0);
  vec4 a = levelTexel(k, i0, m), b = levelTexel(k, i0 + ivec2(1, 0), m), c = levelTexel(k, i0 + ivec2(0, 1), m), d = levelTexel(k, i0 + ivec2(1, 1), m);
  if (m == 0) {
    w = min(min(a.w, b.w), min(c.w, d.w)) * clamp(edge / 6.0, 0.0, 1.0);
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  // A mip texel's A is the share of its area the level covers (MIP_FS): the corners count by bilinear weight x share,
  // the level's value is their weighted mean, and a band unmeasured (-1) in most of that weight keeps the coarser one.
  vec4 q = vec4((1.0 - f.x) * (1.0 - f.y), f.x * (1.0 - f.y), (1.0 - f.x) * f.y, f.x * f.y) * vec4(a.w, b.w, c.w, d.w);
  float W = q.x + q.y + q.z + q.w;
  w = W * clamp(edge / 6.0, 0.0, 1.0);
  if (!(W > 0.0)) return vec4(0.0);
  vec4 y = vec4(a.y, b.y, c.y, d.y), z = vec4(a.z, b.z, c.z, d.z), qy = q * step(0.0, y), qz = q * step(0.0, z);
  float Wy = dot(qy, vec4(1.0)), Wz = dot(qz, vec4(1.0));
  return vec4(dot(q, vec4(a.x, b.x, c.x, d.x)) / W, 2.0 * Wy >= W ? dot(qy, y) / Wy : -1.0, 2.0 * Wz >= W ? dot(qz, z) / Wz : -1.0, W);
}
bool inLevel(int k, vec2 tan, float margin) {
  vec2 lo = u_levelOrigin[k] - margin, hi = u_levelOrigin[k] + vec2(u_levelSize[k]) * u_levelStep[k] + margin;
  return all(greaterThan(tan, lo)) && all(lessThan(tan, hi));
}

void main() {
/*@slot:rate-main*/
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec2 mm = u_originMm + vec2(p) * u_pitchMm;
  float r = length(mm);
  if (r > u_cathodeR) { o = vec4(0.0); return; }
  float star = (u_starsInRate * texelFetch(u_stars, p, 0).r + texelFetch(u_starsFaint, p, 0).r) * 1.0e3 / (u_pitchMm * u_pitchMm);
  // 1.3.3 (the user's dark ring at the field's edge in naked-eye drags with staged frames): u_base holds the blurred map AND the blurred cathode
  // mask (G); dividing by it averages over the cathode only, so the blur no longer darkens the edge with the dark beyond
  // the field stop. That dark rim moved with the sky when frames were staged (a ring inside the field); the field stop's
  // edge is the display's, which stays put.
  if (u_part == 2) { vec2 base = texelFetch(u_base, p, 0).rg; o = vec4(base.r / max(base.g, 0.05) + star, 1.0, 0.0, 0.0); return; }
  float angle = atan(r / u_focalMm);
  vec4 w = lutAt(0, angle);
  vec4 sky = lutAt(1, angle);
  // Ideal rectilinear objective: the direction (x/f, y/f, 1) in camera axes, rotated into the atlas and projected.
  vec3 v = u_point * vec3(mm / u_focalMm, 1.0);
  bool front = v.z > 1e-6;
  vec2 tan = front ? v.xy / v.z : vec2(1e9);
  // k x k sub-samples over the cell: at least one per source pixel (base or level, at the mip it is read from), at most 8 x 8.
#ifdef RATE_SINGLE_SAMPLE
  const int n = 1;
  const bool single = true;
#else
  const bool single = false;
#endif
#ifndef SKY_DIRECT
  int baseMip = mipFor(u_atlasStep, single);
  int levelMip[5];
  for (int l = 0; l < 5; l++) levelMip[l] = l < u_levels ? mipFor(u_levelStep[l], single) : 0;
#endif
#ifndef RATE_SINGLE_SAMPLE
#ifdef SKY_DIRECT
  float k = ceil(u_cellTan / u_pixelTan - u_subSlack);
#else
  float k = ceil(u_cellTan / (u_atlasStep * float(1 << baseMip)));
  for (int l = 0; l < 5; l++) if (l < u_levels && inLevel(l, tan, u_cellTan)) k = max(k, ceil(u_cellTan / (u_levelStep[l] * float(1 << levelMip[l]))));
#endif
  int n = int(clamp(k, 1.0, min(8.0, max(1.0, u_maxSub))));
#endif
  vec4 bands = vec4(0.0);
  bool valid = front;
  for (int j = 0; j < 8; j++) {
    if (j >= n) break;
    for (int i = 0; i < 8; i++) {
      if (i >= n) break;
      vec2 t = tan + ((vec2(float(i), float(j)) + 0.5) / float(n) - 0.5) * u_cellTan;
#ifdef SKY_DIRECT
      vec4 b = skyValue(normalize(u_axis + t.x * u_west + t.y * u_north));
      bool ok = b.x >= 0.0;
#else
      bool ok;
      vec4 b = atlasBilinear(t, baseMip, ok);
      for (int l = 0; l < 5; l++) {
        if (l >= u_levels) break;
        float wl;
        vec4 h = levelSample(l, t, levelMip[l], wl);
        if (wl > 0.0) {
          if (u_levelCont[l] > 0.5) b.w = mix(b.w, h.x, wl);
          else b.xyz = vec3(mix(b.x, h.x, wl), h.y >= 0.0 ? mix(b.y, h.y, wl) : b.y, h.z >= 0.0 ? mix(b.z, h.z, wl) : b.z);
        }
      }
      b.w += profileAt(t, u_cellTan / float(n));
#endif
      valid = valid && ok;
      bands += b;
    }
  }
  bands /= float(n * n);
#ifdef SKY_DIRECT
  // The runtime check reads the sampled bands themselves (u_part 3, one sample per cell, RGBA target).
  if (u_part == 3) { o = valid ? bands : vec4(-1.0, 0.0, 0.0, 0.0); return; }
#endif
  float target = valid ? u_sceneScale * (dot(bands.xyz, w.xyz) + bands.w * w.w) : 0.0;
#ifdef SKY_DIRECT
  // D155 horizon mode: the cell centre's altitude scales each map channel (extinction) and the sky (brighter low down);
  // below the ground's edge the map is hidden and the ground's own radiance (sky illuminance x albedo / pi) replaces
  // the sky. Everything enters before the tube, so noise, halo and ABC act on it as on the sky. Off: untouched.
  float hzSky = 1.0;
  if (u_hzOn == 1 && front) {
    vec3 d = normalize(u_axis + tan.x * u_west + tan.y * u_north);
    float hs = dot(d, u_zenith);
    if (hs < u_hzEdgeMax && hs < hzEdge(d)) { bands = vec4(0.0); target = 0.0; hzSky = texelFetch(u_hz, ivec2(0, 1), 0).y; }
    else {
      float hx = hzX(hs);
      bands *= hzAt(0, hx);
      target = valid ? u_sceneScale * (dot(bands.xyz, w.xyz) + bands.w * w.w) : 0.0;
      hzSky = hzMoon(d, hs, hzAt(1, hx)) + moonDisk(d, u_cellTan);
    }
    sky *= hzSky;
  }
#endif
/*@slot:rate-cover*/
  o = vec4(target + sky.x + (u_part == 1 ? 0.0 : star), 1.0, 0.0, 0.0);
/*@slot:rate-colour*/
}
`,q0=Gt($0),K0=ze+pt+q0;K0.replace("#version 300 es",`#version 300 es
#define RATE_SINGLE_SAMPLE`);const H0=ze+`
uniform sampler2D u_prev;
uniform sampler2D u_after;
uniform sampler2D u_before;
uniform sampler2D u_acc;
uniform sampler2D u_glow;
uniform float u_factor;
uniform float u_accScale;
uniform float u_alpha;
uniform float u_skyI;
uniform int u_hasCur;
uniform int u_k;
uniform ivec4 u_region;   // x0, y0, x1, y1 (fine cells, exclusive)
// Thin cloud round 3: u_hasT 1 = the picture went through the cloud: the halo and the own light × its direct beam T_dir
// (u_tdir: the cloud's rateEff, B, read at the light's cell + u_tShift); 0: as before, bit for bit.
uniform sampler2D u_tdir;
uniform int u_hasT;
uniform ivec2 u_tShift;
out vec4 o;
void main() {
  ivec2 c = ivec2(gl_FragCoord.xy), lim = textureSize(u_prev, 0) - 1;
  vec2 prev = texelFetch(u_prev, c, 0).rg, cur = vec2(0.0);
  bool even = (u_k / 2) * 2 == u_k;
  ivec2 m = even ? ((2 * c + 1) * u_k) / 2 : ((2 * c + 1) * u_k - 1) / 2;
  bool inside = m.x >= u_region.x && m.y >= u_region.y && m.x < u_region.z && m.y < u_region.w;
  // The first cell carries a share of this node's halo (all ≥ 0): none there, none at the node — and the meteor's own
  // light (its core: always inside its halo) not taken either; most of the grid stops here.
  if (u_hasCur == 1 && inside && texelFetch(u_after, m, 0).r != texelFetch(u_before, m, 0).r) {
    vec2 w = vec2(even ? 1.5 : 1.0);
    if (m.x + 1 >= u_region.z) w.x = 1.0;
    if (m.y + 1 >= u_region.w) w.y = 1.0;
    float halo = 0.0, own = 0.0, n = 0.0;
    for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
      ivec2 q = m + ivec2(i, j);
      if (q.x >= u_region.z || q.y >= u_region.w) continue;
      halo += (i == 0 ? w.x : 1.0 - w.x) * (j == 0 ? w.y : 1.0 - w.y) * (texelFetch(u_after, q, 0).r - texelFetch(u_before, q, 0).r);
    }
    // Round 4: the own light centred on the node (the display reads it there): the two cells either side for an even k,
    // the cell on it for an odd one.
    ivec2 o0 = even ? m - 1 : m;
    for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
      ivec2 q = o0 + ivec2(i, j);
      if ((!even && (i > 0 || j > 0)) || q.x < u_region.x || q.y < u_region.y || q.x >= u_region.z || q.y >= u_region.w) continue;
      own += texelFetch(u_before, q, 0).r; n += 1.0;
    }
    cur = vec2(max(0.0, halo), n > 0.0 ? max(0.0, own / n) : 0.0) * u_factor;
    if (u_hasT == 1) cur *= texelFetch(u_tdir, clamp(m + u_tShift, ivec2(0), textureSize(u_tdir, 0) - 1), 0).b;
  }
  vec2 now = u_alpha >= 1.0 ? cur : prev + u_alpha * (cur - prev);
  float sky = 0.0, weight = 0.0;
  // The local sky only within the blurs' reach of a halo (the last blurred map, twice as coarse, has its glow there).
  if (inside && texelFetch(u_glow, c / 2, 0).r > 0.0) {
    float near = max(texelFetch(u_prev, clamp(c + ivec2(1, 0), ivec2(0), lim), 0).r, texelFetch(u_prev, clamp(c - ivec2(1, 0), ivec2(0), lim), 0).r);
    near = max(near, max(texelFetch(u_prev, clamp(c + ivec2(0, 1), ivec2(0), lim), 0).r, texelFetch(u_prev, clamp(c - ivec2(0, 1), ivec2(0), lim), 0).r));
    if (max(near, max(now.x, prev.x)) < 0.05 * u_skyI && max(now.y, prev.y) < 0.5 * u_skyI) {
      float s = 0.0, k = 0.0;
      for (int j = 0; j < 2; j++) for (int i = 0; i < 2; i++) {
        ivec2 q = m + ivec2(i, j);
        if (q.x >= u_region.z || q.y >= u_region.w) continue;
        s += texelFetch(u_acc, q, 0).r; k += 1.0;
      }
      sky = min(s / k * u_accScale, 4.0 * u_skyI); weight = 1.0;
    }
  }
  o = vec4(now, sky * weight, weight);
}
`;H0.replace("out vec4 o;",`
uniform float u_cloudSkyScale;
uniform int u_prevCloudy;
out vec4 o;`).replace("  if (u_hasCur == 1 && inside && texelFetch(u_after, m, 0).r != texelFetch(u_before, m, 0).r) {",`  vec2 cloud = vec2(1.0, 0.0);
  if (u_hasT == 1 && inside) cloud = texelFetch(u_tdir, clamp(m + u_tShift, ivec2(0), textureSize(u_tdir, 0) - 1), 0).ba;
  if (u_hasCur == 1 && inside && texelFetch(u_after, m, 0).r != texelFetch(u_before, m, 0).r) {`).replace("if (u_hasT == 1) cur *= texelFetch(u_tdir, clamp(m + u_tShift, ivec2(0), textureSize(u_tdir, 0) - 1), 0).b;","if (u_hasT == 1) cur *= cloud.x;").replace("if (inside && texelFetch(u_glow, c / 2, 0).r > 0.0) {",`
  // In cloud, use the composed background at the node, including its scatter, under the halo and the head itself.
  if (u_hasT == 1 && inside) {
    vec2 old = texelFetch(u_prev, c, 0).ba;
    float background = cloud.y * u_cloudSkyScale;
    sky = u_alpha >= 1.0 || u_prevCloudy == 0 || old.y == 0.0 ? background : old.x + u_alpha * (background - old.x);
    weight = 1.0;
  } else if (inside && texelFetch(u_glow, c / 2, 0).r > 0.0) {`);const Ss=ze+O0+`
uniform sampler2D u_rate;   // R: electron/s/mm^2 after input diffusion, G: cathode mask
uniform float u_areaTime;   // texel area (mm^2) x frame time (s)
uniform float u_dark;       // event/s/mm^2
uniform float u_gain;
uniform float u_f2;
uniform uint u_frame;
uniform uint u_seed;
uniform int u_mean;
uniform float u_ramp;       // power-on ramp of the photocathode signal only
uniform sampler2D u_starsDyn; // per-frame star rate (moving seeing), texel units x1e-3 e/s
uniform float u_starsScale;   // 1e3 / pitch^2 x (1 - halo weight), or 0
uniform float u_snowRate;     // bright scintillations ("snow"), event/s/mm^2
uniform float u_snowCharge;   // their mean charge in single-electron units (exponential distribution)
// 1.4 (sim/tube-saturation.ts, 示意): the MCP's local saturation — knee and ceiling of the expected output density
// (e/s/mm²); x <= 0 (never set): none.
uniform vec2 u_mcpSat;
/*@slot:sample-uniforms*/
// 0.9.46: two RG32F targets (formerly one RGBA32F), so the output spot reads 8 instead of 16 bytes per tap.
layout(location = 0) out vec2 oCharge;   // R: ordinary charge, G: snow charge
layout(location = 1) out vec2 oExpected; // their conditional expectations
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec2 rv = texelFetch(u_rate, p, 0).rg;
/*@slot:sample-rate-fetch*/
  float signal = rv.r + u_starsScale * texelFetch(u_starsDyn, p, 0).r;
  float mu = (signal * u_ramp + u_dark * rv.g) * u_areaTime;
  float muSnow = u_snowRate * rv.g * u_areaTime;
  // R: ordinary events (output spot = tube PSF); G: snow events (wider spot, see SPOT_H_FS).
  vec2 expected = vec2(mu * u_gain, muSnow * u_snowCharge * u_gain);
  // 1.4 highlight round (T1): past the knee a channel's gain drops (the output tends to the ceiling, slope 1 at the
  // knee: sim/tube-saturation.ts saturatedDensity); the charge drawn below is scaled alike. Below the knee, or with
  // u_mcpSat unset, nothing here changes a value.
  float depress = 1.0;
  if (u_mcpSat.x > 0.0) {
    float density = expected.x / u_areaTime, room = u_mcpSat.y - u_mcpSat.x;
    if (density > u_mcpSat.x) { depress = (u_mcpSat.x + room * (1.0 - exp((u_mcpSat.x - density) / room))) / density; expected.x *= depress; }
  }
  if (u_mean == 1) { oCharge = expected; oExpected = expected; return; }
  rngInit(uvec4(uint(p.x), uint(p.y), u_frame, u_seed));
  float q = mcpCharge(poissonSample(mu), u_gain, u_f2), qs = 0.0;
/*@slot:sample-lattice*/
  if (depress < 1.0) q *= depress;
  if (u_snowRate > 0.0) {
    float k = poissonSample(muSnow);
    if (k > 0.0) qs = gammaSample(k) * u_snowCharge * u_gain;
  }
  oCharge = vec2(q, qs); oExpected = expected;
}
`;Gt(Ss);const W0=ze+`
uniform sampler2D u_frame;
uniform sampler2D u_prev;
uniform sampler2D u_expected;
uniform float u_invAreaTime;
uniform float u_alpha;
// D125: the view moved; the running sum is read at p + u_shift (whole pixels, renderer.reprojection). Where that lies
// outside the last frame's region or field (u_originMm: that grid's origin) there is no history: this frame alone.
uniform int u_reproject;
uniform ivec2 u_shift;
uniform ivec4 u_region;
uniform vec2 u_originMm;
uniform float u_pitchMm;
uniform float u_cathodeR;
out vec4 o;
/*@slot:accum-uniforms*/
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec2 cur = vec2(texelFetch(u_frame, p, 0).r, texelFetch(u_expected, p, 0).r) * u_invAreaTime;
/*@slot:accum-main*/
  ivec2 q = p;
  if (u_reproject == 1) {
    q = p + u_shift;
    if (q.x < u_region.x || q.y < u_region.y || q.x >= u_region.z || q.y >= u_region.w || length(u_originMm + vec2(q) * u_pitchMm) > u_cathodeR) { o = vec4(cur, 0.0, 0.0); return; }
  }
  vec2 prev = texelFetch(u_prev, q, 0).rg;
  o = vec4(u_alpha >= 1.0 ? cur : prev + u_alpha * (cur - prev), 0.0, 0.0);
}
`;Gt(W0);const B0=ze+pt+`
uniform int u_eyeTube;
uniform float u_focalMm;
uniform vec2 u_eyeTubeMechanism; // working gain, dark rate (MCP input); display-only sky reference
uniform float u_eyeReferenceY; // fixed display scale; independent of all sky components
uniform float u_eyeSourceGain; // D114: 2^EV from the total sky SQM, on the source increment only
uniform vec4 u_eyeSourceShoulder;
// D181 the visual model on the virtual eye tube (eye-vision.ts; D183: also on the tube's screen, where
// u_eyeTubeMechanism is (1, 0) and x is the screen's cd/m² per intensity). u_eyeVisionCurve: x cd/m² at the eye per unit of
// (intensity / gain - dark rate), y the response's centre sigma (cd/m², adaptation included), z its exponent n, w the
// white level. u_eyeVisionBlur: x 1 = u_medium holds the Gaussian blur of the picture's part below the threshold (soft-
// clipped as in PAIR_BLUR_FS), y that threshold (screen intensity), z the clip's sharpness, w the blur's sigma (mm, for
// the field stop's edge).
uniform int u_eyeVision;
uniform vec4 u_eyeVisionCurve;
uniform vec4 u_eyeVisionBlur;
uniform float u_eyeSP;
uniform sampler2D u_intensity; // electron/s/mm^2 at the screen
uniform sampler2D u_medium;
uniform sampler2D u_coarse;
uniform int u_eyeMode;
uniform vec2 u_eyeContrast; // contrast threshold and field adapting intensity, independent of EV
uniform int u_eyeLocal;     // 1 (naked eye, D68): each band's contrast is taken against the next coarser band, not the pixel itself
uniform int u_margin;
uniform vec2 u_half;           // canvas half-size, px
uniform float u_viewRadius;    // the eyepiece's round field stop (px); 1.3.2: very large on the full-screen view (none)
// D116: grid texels per canvas pixel (1 at rest; below 1 while a dragged free sky runs on a reduced grid) and the
// texel coordinate of the view centre (margin + n / 2, margin + ny / 2). Texel positions are scaled about the view centre.
uniform float u_viewScale;
uniform vec2 u_gridCentre;
// D152: 1 = the shown picture was accumulated in another view (frames staged): each pixel reads the picture where the
// picture's camera saw this pixel's sky. u_warpD = M − I with picture direction M·(mm / focal, 1); u_warpMm: the live
// view centre, the picture grid's origin (mm); u_warpScale: focal, grid pitch (mm). Past u_warpHalf.x texels from the
// picture's centre (u_warpBox 1, the full-screen view: past u_warpHalf on either axis) the picture has nothing: see u_fill.
uniform int u_warp;
uniform mat3 u_warpD;
uniform vec4 u_warpMm;
uniform vec2 u_warpScale;
uniform vec2 u_warpHalf;
uniform int u_warpBox;
// 1.3.3: 1 = the picture is from another horizon instant (the time slider): only its sky follows the turn. u_enuNow /
// u_enuThen take a camera direction (mm / focal, 1) of the live view / of the picture to the observer's (east, north,
// up); u_skyline is the ground's edge (sin of the true altitude per quarter degree of azimuth), u_skylineMax its top.
uniform int u_warpGround;
uniform mat3 u_enuNow;
uniform mat3 u_enuThen;
uniform highp sampler2D u_skyline;
uniform float u_skylineMax;
bool onGround(vec3 v) {
  float s = v.z / length(v);
  if (s >= u_skylineMax) return false;
  float az = degrees(atan(v.x, v.y));
  float a = (az < 0.0 ? az + 360.0 : az) * 4.0;
  int i0 = min(int(floor(a)), 1439);
  int i1 = i0 == 1439 ? 0 : i0 + 1;
  return s < mix(texelFetch(u_skyline, ivec2(i0, 0), 0).x, texelFetch(u_skyline, ivec2(i1, 0), 0).x, a - float(i0));
}
// 1.1.3: 1 = sky the picture never saw is drawn from the rate map of the frame in flight (u_fillRate: R rate, G cathode
// mask; u_fillStars: its moving stars), made for a view u_fillD = M − I and grid origin u_fillOrigin (mm) away, as its
// expected light: u_fillMech = stars' scale, power-on ramp, dark rate, gain; u_fillSnow = the snow's mean charge rate.
uniform int u_fill;
uniform mat3 u_fillD;
uniform vec2 u_fillOrigin;
uniform sampler2D u_fillRate;
uniform sampler2D u_fillStars;
uniform vec4 u_fillMech;
uniform float u_fillSnow;
uniform vec3 u_xyz;            // XYZ per (electron/s/mm^2) at the screen
uniform float u_scale;         // 683 / 10 cd/m^2 * 2^EV
uniform float u_gammaInv;
uniform vec2 u_centerMm;
uniform float u_pitchMm;
uniform float u_cathodeR;
// Highlight shoulder (display only): knee (display luminance), log slope k, log normalizer, level of the peak; k <= 0 = off.
uniform vec4 u_shoulder;
uniform vec2 u_auroraShoulder; // first-channel ceiling, transition share
// 1.4 highlight round 2 (sim/meteor-highlight.ts): bright meteors' heads on the tube's display. u_hlLocal: x 1 = on (0 or
// never set: off, nothing below changes a value), y u_hlMap's linear scale, z the veil's strength, w the own light's gate
// (× the map's own light); u_hlGlow: x the glow's gain, y its floor, z 1 / ln(1 + full / floor), w u_hlHalo's scale
// (display Y); u_hlCore: x white, y the own light's start (× the sky), z 1 / ln(its span), w the glow's ceiling;
// u_hlOwn (round 4): x the halo's share in the own light's start, y the own light's, zw the veil's exemption's start and
// end (× the sky); u_hlUv: xy 1 / (the halo's coarse factor × u_hlHalo's size), zw the same for u_hlMap (twice
// as coarse). renderer hlTargets: u_hlHalo the integrated map (R the halo, G the meteors' own light, on the halo's own
// coarse nodes), u_hlMap (HL_BLUR_V_FS) R the blurred halo, B the local sky.
uniform vec4 u_hlLocal;
uniform vec4 u_hlGlow;
uniform vec4 u_hlCore;
uniform vec4 u_hlOwn;
uniform vec4 u_hlUv;
uniform sampler2D u_hlMap;
uniform sampler2D u_hlHalo;
// D115 star reshaping (display only; renderer.setStarShape): thinner bright catalogue stars, same light.
uniform sampler2D u_starMap;  // RG = offset to the star covering this texel (texels), A = 1; see STAR_MAP_FS
uniform vec4 u_starShape;     // c0 (1 = off), knee (x white), physical PSF variance (texel^2), SHARP_REF (D118)
uniform vec4 u_starProfA;     // peak-normalised amplitudes of the grid's star profile, four Gaussian components (sum 1)
uniform vec4 u_starProfV;     // their variances (texel^2)
uniform vec4 u_starProfW;     // D118: the components' light shares (sum 1)
uniform vec4 u_starProfP;     // D118: their physical variances (texel^2; no deposit or tap discretisation)
uniform float u_starSynth;    // D118: 1 = draw sharp stars' cores from the PSF at this finer canvas's pixels
uniform int u_compose;        // D118: 1 = finer canvas; outside bright stars' discs copy u_gridDisplay (the grid-sized picture)
uniform sampler2D u_gridDisplay;
uniform float u_starRing;     // radius of the background ring around a star (texels)
uniform float u_starNoise;    // D118: the star's own light is reshaped above this many noise sigmas of its background ring
uniform float u_starWhite;    // "white" for the star reshaping: this display-linear level (the shoulder's top is the scene's brightest)
uniform sampler2D u_gridBright; // D118: texels a star was reshaped in, written by the grid-sized pass (R8)
// 1.4 bright edges supersampled (gpu/display-upsample.ts): 1 = inside a bright meteor's glow, a cell next to a clipped
// one is drawn by edgeSupersampled. Set with the heads' uniforms only (read only while u_hlLocal.x is on).
uniform int u_hlEdges;
layout(location = 0) out vec4 o;
// D118: second target of the grid-sized pass, 1 where a star was reshaped (discarded when drawing to the canvas).
layout(location = 1) out vec4 oBright;
float starReshaped = 0.0;
const mat3 XYZ_TO_SRGB = mat3(3.2406255, -0.9689307, 0.0557101,
                              -1.537208, 1.8757561, -0.2040211,
                              -0.4986286, 0.0415175, 1.0569959);
float encodeSrgb(float v) { return v <= 0.0031308 ? 12.92 * v : 1.055 * pow(v, 1.0 / 2.4) - 0.055; }
float contrastBand(float delta, float base, float threshold) {
  if (threshold <= 0.0) return delta;
  float t = max(base, 1e-12) * threshold, d2 = delta * delta;
  return delta * d2 / (d2 + t * t);
}
float limitT(float t, float c, float grey) {
  float d = c - grey;
  if (d < 0.0) return min(t, grey / -d);
  if (d > 0.0) return min(t, (1.0 - grey) / d);
  return t;
}
// The virtual eye is monochrome, but retains the same shoulder, gamut and gamma as the tube. D121: above the shoulder's
// top the log shoulder's slow rise ends in an exponential approach to white (same slope at the top), so a core brighter
// than the sampled peak (a knot between the readout's samples) keeps some gradation instead of clipping.
vec3 eyeTubeTone(float intensity, vec4 shoulder) {
  vec3 xyz = u_xyz * (max(0.0, intensity) * u_scale);
  if (shoulder.y > 0.0 && xyz.y > shoulder.x) {
    float knee = shoulder.x, y = xyz.y, top = shoulder.w;
    float shown = knee + (top - knee) * log(1.0 + shoulder.y * (y - knee)) / shoulder.z;
    if (shown > top) shown = top + (1.0 - top) * (1.0 - exp(-(shown - top) / (1.0 - top)));
    xyz *= shown / y;
  }
  vec3 rgb = XYZ_TO_SRGB * xyz;
  float grey = min(1.0, xyz.y), t = 1.0;
  t = limitT(t, rgb.r, grey); t = limitT(t, rgb.g, grey); t = limitT(t, rgb.b, grey);
  return pow(clamp(grey + t * (rgb - grey), 0.0, 1.0), vec3(u_gammaInv));
}
// CIE 191:2010 mesopic weight (same bisection as eyeMesopicWeight in naked-eye.ts).
float mesopicWeight(float p, float s) {
  if (max(p, s) <= 0.005) return 0.0;
  if (min(p, s) >= 5.0) return 1.0;
  const float V0 = 683.0 / 1699.0;
  float lo = 0.0, hi = 1.0;
  for (int i = 0; i < 14; i++) {
    float m = 0.5 * (lo + hi), l = (m * p + (1.0 - m) * V0 * s) / (m + (1.0 - m) * V0);
    if (clamp(0.767 + 0.3334 * log(max(l, 1e-30)) * 0.4342945, 0.0, 1.0) > m) lo = m; else hi = m;
  }
  return 0.5 * (lo + hi);
}
// Luminance before the highlight shoulder that it shows as y (inverse of the log shoulder; identity when off or below the knee).
float unshoulder(vec4 sh, float y) {
  if (sh.y <= 0.0 || y <= sh.x) return y;
  y = min(y, sh.x + 0.999 * (sh.w - sh.x));
  return sh.x + (exp((y - sh.x) * sh.z / (sh.w - sh.x)) - 1.0) / sh.y;
}
// The virtual eye's gain on a source increment over a sky of screen intensity "total": D84 de Vries-Rose x D114's sky gain.
float eyeSourceSensitivity(float total, float perIntensity) {
  return u_eyeSourceGain * sqrt(2.0 * u_eyeReferenceY / (u_eyeReferenceY + total * perIntensity));
}
// D181: the luminance at the eye (cd/m²) of a screen intensity, and the visual model's display-linear response to it.
float eyeVisionLum(float intensity) { return max(0.0, intensity / u_eyeTubeMechanism.x - u_eyeTubeMechanism.y) * u_eyeVisionCurve.x; }
float eyeVisionY(float L) { float x = pow(max(L, 0.0) / u_eyeVisionCurve.y, u_eyeVisionCurve.z); return u_eyeVisionCurve.w * x / (1.0 + x); }
// The part of an intensity below the threshold c.x (PAIR_BLUR_FS's soft clip, sharpness c.y).
float visionBelow(float r, vec2 c) {
  if (r <= 0.0) return r;
  float l = c.y * log2(r / c.x);
  return l > 60.0 ? c.x : r * exp2(-log2(1.0 + exp2(l)) / c.y);
}
// D182: a triangular dither of +-1 code (interleaved gradient noise, Jimenez 2014) on the naked eye's sRGB before the
// 8-bit canvas: its dark, smooth gradients (sky glow, the blurred Milky Way) sit on a few codes near black and stepped
// into visible bands. Fixed in the pixel grid, so a still view stays still.
float ditherCode() {
  vec2 p = gl_FragCoord.xy, q = p + vec2(17.0, 31.0);
  float a = fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
  float b = fract(52.9829189 * fract(dot(q, vec2(0.06711056, 0.00583715))));
  return (a + b - 1.0) / 255.0;
}
/*@slot:display-functions*/
// erf, |error| < 2e-4 (Winitzki): the blurred picture's share of the cathode at the field stop.
float erfApprox(float x) { float a = x * x; return sign(x) * sqrt(1.0 - exp(-a * (1.2732395 + 0.147 * a) / (1.0 + 0.147 * a))); }
// D115: screen intensity above b that this pixel shows as white (tube; or the virtual eye's source path).
float whiteExcess(float b, vec2 mm) {
  float perIntensity = max(u_xyz.y * u_scale, 1e-30);
  if (u_eyeVision == 1) {
    // D183 (the virtual eye tube or the tube's screen): the knee (KNEE x this) lands where the response shows what the
    // classic knee shows, KNEE x white before gamma (at most KNEE x the curve's own white). D181 put white itself at the
    // response 0.8: at the asymptote once the curve's white was 0.8 (D182's default), and on a soft curve (n 0.7) the
    // visible discs lie far below it anyway, so the star reshaping did nothing.
    float y = u_starShape.y * min(u_starWhite, u_eyeVisionCurve.w);
    float L = u_eyeVisionCurve.y * pow(y / (u_eyeVisionCurve.w - y), 1.0 / u_eyeVisionCurve.z);
    return ((L / u_eyeVisionCurve.x + u_eyeTubeMechanism.y) * u_eyeTubeMechanism.x - b) / u_starShape.y;
  }
  if (u_eyeTube == 1) {
    float total = max(0.0, lutAt(1, atan(length(mm) / u_focalMm)).x + u_eyeTubeMechanism.y) * u_eyeTubeMechanism.x;
    float sensitivity = eyeSourceSensitivity(total, perIntensity);
    float source = unshoulder(u_eyeSourceShoulder, u_starWhite) / perIntensity - u_eyeReferenceY / perIntensity;
    return min(b, total) + source / sensitivity - b;
  }
  return unshoulder(u_shoulder, u_starWhite) / perIntensity - b;
}
ivec2 starTexel(vec2 p) { return clamp(ivec2(floor(p + 0.5)), ivec2(0), textureSize(u_intensity, 0) - 1); }
#define CE(a, b) { float lo = min(a, b); b = max(a, b); a = lo; }
// D115/D118: the star's own light in texel q (index units, centres at integers): its excess over the background b
// above the noise allowance, at most a generous (wider) model of its profile scaled to the measured peak.
float starOwnAt(vec2 q, vec2 c, float b, float allowance, float peak) {
  vec2 d = q - c;
  float excess = texelFetch(u_intensity, starTexel(q), 0).r - b;
  return min(max(excess - allowance, 0.0), peak * dot(u_starProfA, exp(-0.5 * dot(d, d) / (1.6 * u_starProfV))));
}
// D115: the star at texel position c seen from texel p. Background = median of eight texels on a ring just outside the
// star's disc, peak = brightest of the 3x3 around its centre (both from the picture itself, so moving and twinkling
// stars and the tube's noise are taken as they are). A peak above the knee K is lowered to K (P/K)^c (c < 1) by scaling
// the star's whole profile, which stays smooth and round: the white core and the visible disc shrink, brighter stars
// still grow (more slowly), and stars that only just reached white turn a little grey, so the brightest stand out.
// (Sharpening the profile instead made blocky cores: a steep edge aliases on the grid.) Only the star's own light is
// scaled: not a neighbour inside its disc, nor the noise in its faint wings.
float reshapeStar(vec2 p, vec2 c, float intensity, vec2 mm) {
  float peak = 0.0, sum = 0.0; vec2 peakAt = c;
  for (int dy = -1; dy <= 1; dy++) for (int dx = -1; dx <= 1; dx++) {
    vec2 q = vec2(starTexel(c + vec2(dx, dy)));
    float t = texelFetch(u_intensity, ivec2(q), 0).r; sum += t;
    if (t > peak) { peak = t; peakAt = q; }
  }
  float s0 = texelFetch(u_intensity, starTexel(c + vec2(u_starRing, 0.0)), 0).r, s1 = texelFetch(u_intensity, starTexel(c - vec2(u_starRing, 0.0)), 0).r;
  float s2 = texelFetch(u_intensity, starTexel(c + vec2(0.0, u_starRing)), 0).r, s3 = texelFetch(u_intensity, starTexel(c - vec2(0.0, u_starRing)), 0).r;
  float e = u_starRing * 0.7071068;
  float s4 = texelFetch(u_intensity, starTexel(c + vec2(e, e)), 0).r, s5 = texelFetch(u_intensity, starTexel(c - vec2(e, e)), 0).r;
  float s6 = texelFetch(u_intensity, starTexel(c + vec2(e, -e)), 0).r, s7 = texelFetch(u_intensity, starTexel(c + vec2(-e, e)), 0).r;
  CE(s0, s2) CE(s1, s3) CE(s4, s6) CE(s5, s7) CE(s0, s4) CE(s1, s5) CE(s2, s6) CE(s3, s7)
  CE(s0, s1) CE(s2, s3) CE(s4, s5) CE(s6, s7) CE(s2, s4) CE(s3, s5) CE(s1, s4) CE(s3, s6) CE(s1, s2) CE(s3, s4) CE(s5, s6)
  float b = 0.5 * (s3 + s4), x = intensity - b, w = whiteExcess(b, mm), knee = u_starShape.y * w;
  peak -= b;
  // The model's amplitude at the star's true centre: the brightest texel may sit up to half a texel off it (a star on a
  // texel edge puts half its light in each neighbour), so it is divided by the profile there (D118).
  vec2 dp = peakAt - c;
  float top = peak / max(dot(u_starProfA, exp(-0.5 * dot(dp, dp) / u_starProfV)), 0.05);
  if (x <= 0.0 || knee <= 0.0 || top <= knee) return intensity;
  starReshaped = 1.0;
  vec2 d = p - c;
  // D118: the allowance is the local noise (the ring's interquartile spread / 1.35, times u_starNoise sigmas), not a
  // fixed share of white: a fixed 4 % was never scaled and stayed as a faint glow ring around the shrunken core. In a
  // noiseless view (naked eye, mean frame) it is ~0 and the whole wing shrinks with the core.
  float r2 = dot(d, d), allowance = u_starNoise * (s5 - s2) / 1.349;
  // The star's own light here is at most this generous (wider) model of its profile; above the allowance (which keeps
  // the background's noise as it is) that part is scaled, the rest (a neighbour, noise) is left. No weight depends on
  // the pixel's own value, so the mapping stays monotone: no dark rings. Taken at the four texel centres around this
  // pixel and interpolated exactly as the picture is (bilinear on a finer canvas; the texel itself at rest), so between
  // texels nothing of the star is left behind (D118).
  vec2 i0 = floor(p), f = p - i0;
  float own = min(x, mix(mix(starOwnAt(i0, c, b, allowance, top), starOwnAt(i0 + vec2(1.0, 0.0), c, b, allowance, top), f.x),
    mix(starOwnAt(i0 + vec2(0.0, 1.0), c, b, allowance, top), starOwnAt(i0 + vec2(1.0, 1.0), c, b, allowance, top), f.x), f.y));
  // Unscaled only at the very edge of the disc (radius u_starRing - 1 = 8 sigma of the broadest component), so a
  // very wide star can never show a seam there.
  float edge = 1.0 - smoothstep(0.85 * (u_starRing - 1.0), u_starRing - 1.0, sqrt(r2));
  // D118: the exponent follows the pixel actually drawn (u_viewScale texels a side; 1 at rest on a full grid).
  float pixel = u_viewScale * u_viewScale / 6.0, c0 = u_starShape.x;
  float cExp = c0 * clamp(u_starShape.z / (u_starShape.z + pixel) / u_starShape.w, 0.1, 1.0);
  float shaped = own * (peak > knee ? pow(knee * pow(peak / knee, cExp) / peak, edge) : 1.0);
  if (u_starSynth > 0.0) {
    // D118: on a canvas finer than the grid, draw the core of the star's own light from its flux (the 3x3 sum; a sharp
    // star keeps nearly all of it there) and the physical PSF at these pixels, centred on its catalogue position, so a
    // star on a texel corner is no longer a 2x2 block. Its peak is compressed like the D115 one; blended in above the
    // knee so the stars just reaching it change smoothly.
    vec4 vt = u_starProfP + pixel, at = u_starProfW / vt;
    float norm = dot(at, vec4(1.0)), coreTop = max(sum - 9.0 * b, 0.0) * norm / 6.2831853;
    float topShown = coreTop > knee ? knee * pow(coreTop / knee, cExp) : coreTop;
    float core = topShown * dot(at / norm, exp(-0.5 * r2 / vt));
    shaped = mix(shaped, core, u_starSynth * smoothstep(knee, 2.0 * knee, coreTop) * edge);
  }
  return intensity - own + shaped;
}
// Catmull-Rom (Keys, a = -0.5) of a picture at p in texel units (centres at half-integers), 4x4 texels, clamped at the
// edges and to the display range (the kernel overshoots a little at sharp edges).
vec4 catmullRom(sampler2D s, vec2 p) {
  vec2 q = p - 0.5, i0 = floor(q), f = q - i0;
  vec2 f2 = f * f, f3 = f2 * f;
  vec2 w0 = 0.5 * (-f3 + 2.0 * f2 - f), w1 = 0.5 * (3.0 * f3 - 5.0 * f2 + 2.0), w2 = 0.5 * (-3.0 * f3 + 4.0 * f2 + f), w3 = 0.5 * (f3 - f2);
  ivec2 lim = textureSize(s, 0) - 1, b = ivec2(i0) - 1;
  vec4 row[4];
  for (int j = 0; j < 4; j++) {
    int y = clamp(b.y + j, 0, lim.y);
    row[j] = w0.x * texelFetch(s, ivec2(clamp(b.x, 0, lim.x), y), 0) + w1.x * texelFetch(s, ivec2(clamp(b.x + 1, 0, lim.x), y), 0)
      + w2.x * texelFetch(s, ivec2(clamp(b.x + 2, 0, lim.x), y), 0) + w3.x * texelFetch(s, ivec2(clamp(b.x + 3, 0, lim.x), y), 0);
  }
  return clamp(w0.y * row[0] + w1.y * row[1] + w2.y * row[2] + w3.y * row[3], 0.0, 1.0);
}
// 1.4 highlight round 2 (sim/meteor-highlight.ts meteorHighlight): filtered reads of the maps at texel position p
// (centres at half-integers; u_hlHalo bilinear on the halo's own coarse nodes: the halo and the own light as the add
// pass had them). The pixel relative to the halo (its flat disc and steep edge become the local sky's level S, at least
// the pixel's own up to S); round 4: around the halo the sky's detail veiled toward S (brighter pixels keep their light),
// the meteor's own light inside the halo white by its level against the sky (its expected light ye less the sky and the
// halo, gated by the map's own light), then the glow of the halo blurred. Continuous, monotone in y; an empty map
// changes nothing.
float meteorHighlight(float y, float ye, vec2 p) {
  vec4 m = texture(u_hlMap, p * u_hlUv.zw);
  float g = m.x * u_hlLocal.y, W = u_hlCore.x, S = max(m.z * u_hlLocal.y, 1e-6);
  // Away from every halo the blurred one is 0 or a few 10⁻⁵ of the sky (its Gaussian's tail: veil and glow under 10⁻⁴ of
  // the pixel there; the halo and its own light are well inside).
  if (g <= 1e-5 * S) return y;
  // The halo, at least a quarter of what a fine cell either way has: the output spot spreads the picture's halo past its
  // steep edge (well under that), while a trail crossing the edge keeps its contrast against the halo where it is.
  vec2 q = p * u_hlUv.xy, c1 = u_hlUv.xy, ho = texture(u_hlHalo, q).rg;
  float A = max(ho.x, 0.25 * max(max(texture(u_hlHalo, q + vec2(c1.x, 0.0)).r, texture(u_hlHalo, q - vec2(c1.x, 0.0)).r),
    max(texture(u_hlHalo, q + vec2(0.0, c1.y)).r, texture(u_hlHalo, q - vec2(0.0, c1.y)).r)));
  A = max(A * u_hlGlow.w, 0.0);
  float O = max(ho.y * u_hlGlow.w, 0.0);
  float h = A / (S + A), yk = max(y * (1.0 - h), min(y, S));
  // The veil (v·g / (S + v·g): the halo's share at its edge, where g is half its disc); pixels past the exemption (× S,
  // smooth) keep their light.
  float vg = u_hlLocal.z * g;
  float t = yk + vg / (S + vg) * (1.0 - smoothstep(u_hlOwn.z, u_hlOwn.w, yk / S)) * (S - yk);
  // The own light (most pixels have none: no logarithm there).
  float f = min(max(0.0, ye - S - A), u_hlLocal.w * O), f0 = u_hlCore.y * S + u_hlOwn.x * A + u_hlOwn.y * O;
  if (f > f0) t += max(0.0, W - t) * h * min(1.0, log(f / f0) * u_hlCore.z);
  // The glow takes the pixel the share G of the way to the ceiling (cyan, below the first channel's clip).
  float G = min(1.0, u_hlGlow.x * log(1.0 + g / u_hlGlow.y) * u_hlGlow.z);
  return t + max(0.0, u_hlCore.w - t) * G;
}
// A light (screen intensity, its expected light ye) as the bright meteors' heads show it (their maps at hp).
float hlIntensity(float intensity, float ye, vec2 hp) {
  float yPer = max(u_xyz.y * u_scale, 1e-30);
  return meteorHighlight(intensity * yPer, max(ye, 0.0) * yPer, hp) / yPer;
}
// The tube's display of a light (screen intensity): the highlight shoulder, the phosphor's colour brought into the
// display's gamut towards grey; display-linear, before gamma.
vec3 tubeLinear(float intensity) {
  vec3 xyz = u_xyz * (intensity * u_scale);
  // Above the knee: y -> knee + (top - knee) ln(1 + k (y - knee)) / ln(1 + k (peak - knee)); same slope at the knee.
  if (u_shoulder.y > 0.0 && xyz.y > u_shoulder.x) {
    float knee = u_shoulder.x, y = xyz.y;
    xyz *= (knee + (u_shoulder.w - knee) * log(1.0 + u_shoulder.y * (y - knee)) / u_shoulder.z) / y;
  }
  // Finish the shoulder above its nominal top when the aurora's measured peak trails what is in the picture.
  // Unit slope at the knee and a smooth ceiling below the first clipping channel preserve the phosphor colour.
  if (u_auroraShoulder.y > 0.0) {
    float knee = u_auroraShoulder.x * (0.9 / 0.972), y = xyz.y;
    if (y > knee) {
      float width = u_auroraShoulder.x - knee, excess = y - knee;
      xyz *= mix(1.0, (knee + width * (excess / (width + excess))) / y, u_auroraShoulder.y);
    }
  }
  vec3 rgb = XYZ_TO_SRGB * xyz;
  float grey = min(1.0, xyz.y), t = 1.0;
  t = limitT(t, rgb.r, grey); t = limitT(t, rgb.g, grey); t = limitT(t, rgb.b, grey);
  return clamp(grey + t * (rgb - grey), 0.0, 1.0);
}
// Bright edges supersampled (gpu/display-upsample.ts). Each of the 3 × 3 cells around "pixel" is clipped or not as the
// display draws it (the heads' display at its centre, hlIntensity, then the shoulder and the gamut: its brightest channel
// at EDGE_LEVEL). 3 × 3 sub-cell samples of this cell take that light bilinearly in log between the centres and are
// clipped from halfway (in log) between the dimmest clipped and the brightest unclipped of the centres each one reads
// (taken over the whole 3 × 3, a bright head's corner put grey nubs on a straight side); the cell becomes its own
// colour and the other side's brightest one in proportion to its sub-samples on each side. So the white's edge cuts the
// cells' steps along the light's own contour, and on average sits where the cells put it (halfway between centres): the
// white keeps its width. (Clipping the interpolated light at the clip itself put the edge most of the way to the next
// centre — a head's core is many times white, its glow just under it — and widened the white past round 5's widths; the
// expected light's contour, smoother, left grey nubs where the head's white does not follow it; the heads' display
// evaluated between centres left spikes where the head narrows, its maps being tuned at the centres.) Only inside the
// glow (meteorHighlight's own test at this cell) and where the 3 × 3 has both sides; elsewhere the cell's own display,
// lin, bit for bit.
const float EDGE_LEVEL = 0.95;
vec3 edgeSupersampled(ivec2 pixel, float own, vec3 lin) {
  vec4 m = texture(u_hlMap, (vec2(pixel) + 0.5) * u_hlUv.zw);
  if (m.x * u_hlLocal.y <= 1e-5 * max(m.z * u_hlLocal.y, 1e-6)) return lin;
  ivec2 lim = textureSize(u_intensity, 0) - 1;
  bool inside = max(lin.r, max(lin.g, lin.b)) >= EDGE_LEVEL;
  // Each centre's light (log) and side; the dimmest clipped and the brightest unclipped centre; the other side's
  // brightest light (the white, or the glow next to it).
  // (Clipped cells' lights are offset by +1e4 in k*: one number carries the light and the side.)
  vec3 k0 = vec3(0.0), k1 = vec3(0.0), k2 = vec3(0.0);
  float other = -1.0;
  for (int j = 0; j < 3; j++) for (int i = 0; i < 3; i++) {
    float x = own;
    ivec2 c = clamp(pixel + ivec2(i - 1, j - 1), ivec2(0), lim);
    vec2 v = texelFetch(u_intensity, c, 0).rg;
    if (i != 1 || j != 1) x = hlIntensity(max(v.r, 0.0), v.g, vec2(c) + 0.5);
    vec3 d = tubeLinear(x);
    bool clipped = max(d.r, max(d.g, d.b)) >= EDGE_LEVEL;
    float l = log(max(x, 1e-30)) + (clipped ? 1e4 : 0.0);
    if (j == 0) k0[i] = l; else if (j == 1) k1[i] = l; else k2[i] = l;
    if (clipped != inside) other = max(other, x);
  }
  if (other < 0.0) return lin;
  // Sub-sample (i, j) at (i − 1, j − 1) / 3 of a cell from the centre reads the centres a (this cell), b (beside it),
  // c (above or below), d (diagonal): their light bilinear in log, clipped from halfway (in log) between the dimmest
  // clipped and the brightest unclipped of those four (none of the other side: it stays on this cell's). n on the other
  // side.
  float n = 0.0;
  for (int j = 0; j < 3; j++) for (int i = 0; i < 3; i++) {
    vec3 row = j == 0 ? k0 : j == 1 ? k1 : k2;
    vec4 q = vec4(k1[1], k1[i], row[1], row[i]);
    bvec4 hot = greaterThan(q, vec4(5e3));
    q -= vec4(hot) * 1e4;
    float wMin = min(min(hot.x ? q.x : 1e30, hot.y ? q.y : 1e30), min(hot.z ? q.z : 1e30, hot.w ? q.w : 1e30));
    float gMax = max(max(hot.x ? -1e30 : q.x, hot.y ? -1e30 : q.y), max(hot.z ? -1e30 : q.z, hot.w ? -1e30 : q.w));
    if (wMin > 1e29 || gMax < -1e29) continue;
    float ax = i == 1 ? 0.0 : 1.0 / 3.0, ay = j == 1 ? 0.0 : 1.0 / 3.0;
    bool clipped = mix(mix(q.x, q.y, ax), mix(q.z, q.w, ax), ay) >= 0.5 * (wMin + gMax);
    n += clipped != inside ? 1.0 : 0.0;
  }
  return n == 0.0 ? lin : mix(lin, tubeLinear(other), n / 9.0);
}
void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 rel = frag - u_half;
  float view = clamp(u_viewRadius - length(rel) + 0.5, 0.0, 1.0);
  oBright = vec4(0.0);
  if (view <= 0.0) { o = vec4(0.0); return; }
  vec2 mm = u_centerMm + rel * u_pitchMm;
  float cath = clamp((u_cathodeR - length(mm)) / u_pitchMm + 0.5, 0.0, 1.0);
  // At rest u_viewScale is 1 and this is exactly ivec2(frag) + u_margin (frag sits at a half-integer).
  vec2 tex = rel * u_viewScale + u_gridCentre;
  // 1.1.3: this pixel's expected light from the frame in flight (u_fill), or -1.
  float filled = -1.0;
  if (u_warp == 1) {
    // The field stop (view circle, cathode mask) stays; the sky moved under it. A pure move lands on whole texels
    // (centres at half-integers keep floor() exact against float rounding).
    vec2 live = tex;
    vec3 c = vec3((u_warpMm.xy + (tex - u_gridCentre) * u_warpScale.y) / u_warpScale.x, 1.0);
    vec3 r = c + u_warpD * c;
    // 1.3.3: across a new instant the ground stays where it is; a sky pixel whose sky the picture had behind the ground
    // (or outside it) keeps the picture's own pixel until the next one.
    bool turned = u_warpGround == 1;
    if (r.z > 0.0 && !(turned && onGround(u_enuNow * c))) {
      tex = (u_warpScale.x * r.xy / r.z - u_warpMm.zw) / u_warpScale.y + 0.5;
      vec2 d = tex - u_gridCentre;
      float l = length(d), R = u_warpHalf.x;
      bool outside = u_warpBox == 1 ? any(greaterThan(abs(d), u_warpHalf)) : l > R;
      if (turned && (outside || onGround(u_enuThen * r))) { tex = live; outside = false; }
      if (outside) {
        // Sky the picture never saw (the leading edge until the next picture) is drawn from the frame in flight, which
        // began at the view ahead: its rates, as expected light without the grain. 1.1.4 repeated the edge texel and
        // pre.3 mirrored the picture at its circle (pulled in to half the radius past 1.5 radii), both of which drew
        // radial streaks once a fast drag left much of the field uncovered (the user's "optical flow" on fast flicks). Where
        // the frame in flight has nothing either, small gaps keep the mirror and larger ones the picture unmoved.
        if (u_fill == 1) {
          vec3 rf = c + u_fillD * c;
          vec2 tf = (u_warpScale.x * rf.xy / rf.z - u_fillOrigin) / u_warpScale.y + 0.5, df = tf - u_gridCentre;
          if (rf.z > 0.0 && (u_warpBox == 1 ? all(lessThanEqual(abs(df), u_warpHalf)) : length(df) <= R)) {
            ivec2 q = ivec2(floor(tf));
            vec2 rv = texelFetch(u_fillRate, q, 0).rg;
            if (rv.g > 0.5) filled = ((rv.r / rv.g + u_fillMech.x * texelFetch(u_fillStars, q, 0).r) * u_fillMech.y + u_fillMech.z) * u_fillMech.w + u_fillSnow;
          }
        }
        if (filled < 0.0) {
          if (u_warpBox == 1) {
            // The full-screen view mirrors at its picture's edges, each axis on its own, as the round view does at its circle.
            vec2 a = abs(d);
            tex = all(lessThan(a, 1.5 * u_warpHalf)) ? u_gridCentre + sign(d) * mix(a, 2.0 * u_warpHalf - a, step(u_warpHalf, a)) : live;
          } else tex = l < 1.5 * R ? u_gridCentre + d * ((2.0 * R - l) / l) : live;
        }
      }
    }
  }
  ivec2 pixel = ivec2(floor(tex));
  if (u_compose == 1 && filled < 0.0) {
    // D118: only texels where the grid-sized pass reshaped a star are drawn again at these pixels; elsewhere that
    // pass's picture is copied. 0.9.59: Catmull-Rom, not bilinear: the browser's own scaling of a grid-sized canvas is
    // sharper than bilinear, and the bilinear copy softened the Milky Way's fine structure by about 14 % on phones.
    ivec2 g = clamp(pixel - ivec2(u_margin), ivec2(0), textureSize(u_gridBright, 0) - 1);
    if (texelFetch(u_gridBright, g, 0).r < 0.5) {
      o = catmullRom(u_gridDisplay, tex - float(u_margin));
      return;
    }
  }
  vec2 screen;
  if (filled >= 0.0) screen = vec2(filled);
  else if (u_viewScale < 1.0) {
    // D116: a coarser drag grid is drawn bilinearly between texel centres (the grain softens; no new statistics).
    vec2 q = tex - 0.5; ivec2 i0 = ivec2(floor(q)), lim = textureSize(u_intensity, 0) - 1; vec2 f = q - vec2(i0);
    vec2 a = texelFetch(u_intensity, clamp(i0, ivec2(0), lim), 0).rg, b = texelFetch(u_intensity, clamp(i0 + ivec2(1, 0), ivec2(0), lim), 0).rg;
    vec2 c = texelFetch(u_intensity, clamp(i0 + ivec2(0, 1), ivec2(0), lim), 0).rg, d = texelFetch(u_intensity, clamp(i0 + ivec2(1, 1), ivec2(0), lim), 0).rg;
    screen = mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  } else screen = texelFetch(u_intensity, pixel, 0).rg;
  float intensity = max(screen.r, 0.0);
  if (u_eyeMode == 2 && u_eyeContrast.x > 0.0 && filled >= 0.0) {
    // Expected light has no finer detail than its coarse band.
    float adapting = max(u_eyeContrast.y, 1e-12);
    intensity = max(0.0, adapting + contrastBand(intensity - adapting, adapting, u_eyeContrast.x));
  } else if (u_eyeMode == 2 && u_eyeContrast.x > 0.0) {
    float medium = texelFetch(u_medium, pixel, 0).r, coarse = texelFetch(u_coarse, pixel, 0).r;
    float adapting = max(u_eyeContrast.y, 1e-12), base = max(screen.g, adapting * 0.1), threshold = u_eyeContrast.x;
    // Naked eye: an increment is judged against its surroundings (a star is far above the sky around it).
    float baseMedium = u_eyeLocal == 1 ? max(coarse, adapting * 0.1) : base, baseFine = u_eyeLocal == 1 ? max(medium, adapting * 0.1) : base;
    intensity = max(0.0, adapting + contrastBand(coarse - adapting, adapting, threshold)
      + contrastBand(medium - coarse, baseMedium, threshold * 1.3)
      + contrastBand(screen.r - medium, baseFine, threshold * 2.0));
  }
  if (u_starShape.x < 1.0 && filled < 0.0) {
    vec4 star = texelFetch(u_starMap, pixel, 0);
    // Positions in texel-index units (texel centres at integers): this pixel's own, sub-texel on a finer canvas (D118).
    if (star.a > 0.0) intensity = reshapeStar(tex - 0.5, vec2(pixel) + star.xy, intensity, mm);
  }
  if (u_eyeVision == 1) {
    // D181: the luminance at the eye; its part below the threshold is seen blurred (rod pooling), the excess sharp.
    float L = eyeVisionLum(intensity);
    if (u_eyeVisionBlur.x > 0.5 && filled < 0.0) {
      // The blur averaged in the dark beyond the field stop: divide by the share of the cathode it covered.
      float edge = 0.5 + 0.5 * erfApprox((u_cathodeR - length(mm)) / (u_eyeVisionBlur.w * 1.4142136));
      vec2 clip = u_eyeVisionBlur.yz;
      L = eyeVisionLum(texelFetch(u_medium, pixel, 0).r / max(edge, 0.05)) + L - eyeVisionLum(visionBelow(intensity, clip));
    }
    /*@slot:display-vision-hdr*/
    float y = clamp(eyeVisionY(L), 0.0, 1.0);
    if (u_eyeTube == 1) {
      float lin = pow(y, u_gammaInv);
/*@slot:display-vision-colour*/
      o = vec4(vec3(clamp(encodeSrgb(lin) + ditherCode(), 0.0, 1.0)) * cath * view, view); oBright = vec4(starReshaped);
      return;
    }
    // D183: the tube's screen through the same model: its phosphor's colour at the response's luminance, brought into
    // the display's gamut towards grey as the classic path does. No dither: the tube's own grain breaks up bands, and a
    // dither fixed in the screen's pixels would differ between a staged picture moved by the warp and its redraw.
    vec3 rgb = XYZ_TO_SRGB * (u_xyz * (y / max(u_xyz.y, 1e-30)));
    float t = 1.0;
    t = limitT(t, rgb.r, y); t = limitT(t, rgb.g, y); t = limitT(t, rgb.b, y);
    vec3 lin = pow(clamp(y + t * (rgb - y), 0.0, 1.0), vec3(u_gammaInv));
    o = vec4(vec3(encodeSrgb(lin.r), encodeSrgb(lin.g), encodeSrgb(lin.b)) * cath * view, view); oBright = vec4(starReshaped);
    return;
  }
  if (u_eyeTube == 1) {
    vec4 sky = lutAt(1, atan(length(mm) / u_focalMm));
    // D84: every sky component is background. D83's moving natural-sky reference boosted detail with airglow.
    // Isolate the source, apply bounded sensitivity that decreases with TOTAL sky, then the fixed response.
    float total = max(0.0, sky.x + u_eyeTubeMechanism.y) * u_eyeTubeMechanism.x;
    // Preserve dark blurred edges: the analytic background cannot exceed what the pixel actually received.
    float background = min(intensity, total), perIntensity = max(u_xyz.y * u_scale, 1e-30);
    float reference = u_eyeReferenceY / perIntensity;
    // D114: times the sky-linked gain, which keeps rising where this bounded sqrt flattens (darker than the default sky).
    float sensitivity = eyeSourceSensitivity(total, perIntensity);
    float source = (intensity - background) * sensitivity;
    vec3 increment = max(vec3(0.0), eyeTubeTone(reference + source, u_eyeSourceShoulder) - eyeTubeTone(reference, u_eyeSourceShoulder));
    vec3 lin = clamp(eyeTubeTone(background, u_shoulder) + increment, 0.0, 1.0);
    vec3 srgb = clamp(vec3(encodeSrgb(lin.r), encodeSrgb(lin.g), encodeSrgb(lin.b)) + ditherCode(), 0.0, 1.0);
    o = vec4(srgb * cath * view, view); oBright = vec4(starReshaped);
    return;
  }
  // The meteors' maps at the cell's centre the intensity was read at (a coarser drag grid reads between centres).
  bool hl = u_hlLocal.x > 0.0 && filled < 0.0;
  if (hl) intensity = hlIntensity(intensity, screen.g, u_viewScale < 1.0 ? tex : vec2(pixel) + 0.5);
  vec3 lin = tubeLinear(intensity);
  // 1.4 bright edges supersampled, on the resting grid without the star reshaping (a staged picture's warp lands on
  // whole cells: the cell's own result moves with it).
  if (hl && u_hlEdges == 1 && u_viewScale == 1.0 && u_starShape.x >= 1.0 && u_eyeMode != 2) lin = edgeSupersampled(pixel, intensity, lin);
  lin = pow(lin, vec3(u_gammaInv));
  vec3 srgb = vec3(encodeSrgb(lin.r), encodeSrgb(lin.g), encodeSrgb(lin.b));
  o = vec4(srgb * cath * view, view); oBright = vec4(starReshaped);
}
`,Rs=Gt(B0);Rs.replace("float meteorHighlight(",`float highlightSky(vec4 blurred, vec2 p) {
  vec2 cloud = texture(u_hlHalo, p * u_hlUv.xy).ba;
  if (cloud.y > 0.0) return max(cloud.x / cloud.y * u_hlGlow.w, 1e-6);
  return max(blurred.z * u_hlLocal.y, 1e-6);
}
float meteorHighlight(`).replace("S = max(m.z * u_hlLocal.y, 1e-6);","S = highlightSky(m, p);").replace("1e-5 * max(m.z * u_hlLocal.y, 1e-6)) return lin;","1e-5 * highlightSky(m, vec2(pixel) + 0.5)) return lin;");Rs.replace("float whiteExcess(float b, vec2 mm)",`
uniform sampler2D u_eyeCloudRate; // rateEff.a is diffuse sky before the cathode mask
uniform ivec2 u_eyeCloudShift;
float eyeCloudSky(vec2 mm, ivec2 cell) {
  // With a frame in flight the cloud map belongs to its projected view.
  if (u_fill == 1) {
    vec3 c = vec3(mm / u_warpScale.x, 1.0);
    vec3 f = c + u_fillD * c;
    if (f.z > 0.0) cell = ivec2(floor((u_warpScale.x * f.xy / f.z - u_fillOrigin) / u_warpScale.y + 0.5));
  }
  ivec2 p = cell + u_eyeCloudShift;
  if (all(greaterThanEqual(p, ivec2(0))) && all(lessThan(p, textureSize(u_eyeCloudRate, 0)))) return texelFetch(u_eyeCloudRate, p, 0).a;
  return lutAt(1, atan(length(mm) / u_focalMm)).x;
}
float whiteExcess(float b, vec2 mm, ivec2 cell)`).replace("lutAt(1, atan(length(mm) / u_focalMm)).x + u_eyeTubeMechanism.y","eyeCloudSky(mm, cell) + u_eyeTubeMechanism.y").replace("whiteExcess(b, mm)","whiteExcess(b, mm, starTexel(p))").replace("vec4 sky = lutAt(1, atan(length(mm) / u_focalMm));","float sky = eyeCloudSky(mm, pixel);").replace("sky.x + u_eyeTubeMechanism.y","sky + u_eyeTubeMechanism.y");const Y0={STAR_SKY_VS:eo("STAR_SKY")+pt+Lr,SAMPLE_FS:Ss},V0=[{id:"n2-nir",name:"N2 first positive + N2+ Meinel",reference:"OI 557.7",tauS:0,heightsKm:[100,110,125],features:[{fromNm:1042.8,toNm:1050.8,r:335,id:"N2_1PG (0,0)"},{fromNm:883.3,toNm:891.3,r:849,id:"N2_1PG (1,0)"},{fromNm:767.3,toNm:775.3,r:654,id:"N2_1PG (2,0)",rTable:440},{fromNm:860.2,toNm:868.2,r:618,id:"N2_1PG (2,1)"},{fromNm:980.9,toNm:988.9,r:120,id:"N2_1PG (2,2)"},{fromNm:679.5,toNm:687.5,r:99,id:"N2_1PG (3,0)",rTable:102},{fromNm:754.7,toNm:762.7,r:548.9,id:"N2_1PG (3,1)",rTable:565},{fromNm:846.3,toNm:854.3,r:199,id:"N2_1PG (3,2)"},{fromNm:960,toNm:968,r:244,id:"N2_1PG (3,3)"},{fromNm:610.7,toNm:618.7,r:19.3,id:"N2_1PG (4,0)",rTable:17},{fromNm:670.9,toNm:678.9,r:222.3,id:"N2_1PG (4,1)",rTable:229},{fromNm:742.4,toNm:750.4,r:476.5,id:"N2_1PG (4,2)",rTable:498},{fromNm:829,toNm:837,r:9,id:"N2_1PG (4,3)"},{fromNm:935.6,toNm:943.6,r:149,id:"N2_1PG (4,4)"},{fromNm:1067.6,toNm:1075.6,r:43,id:"N2_1PG (4,5)"},{fromNm:604.7,toNm:612.7,r:35.3,id:"N2_1PG (5,1)",rTable:31},{fromNm:662.5,toNm:670.5,r:223.2,id:"N2_1PG (5,2)",rTable:230},{fromNm:730.7,toNm:738.7,r:260.3,id:"N2_1PG (5,3)",rTable:272},{fromNm:599,toNm:607,r:40.9,id:"N2_1PG (6,2)",rTable:36},{fromNm:654.4,toNm:662.4,r:187.3,id:"N2_1PG (6,3)",rTable:193},{fromNm:719.4,toNm:727.4,r:148.3,id:"N2_1PG (6,4)",rTable:155},{fromNm:796.6,toNm:804.6,r:52.5,id:"N2_1PG (6,5)",rTable:40},{fromNm:593.4,toNm:601.4,r:46.6,id:"N2_1PG (7,3)",rTable:41},{fromNm:646.5,toNm:654.5,r:138.8,id:"N2_1PG (7,4)",rTable:143},{fromNm:707.3,toNm:715.3,r:41.1,id:"N2_1PG (7,5)",rTable:43},{fromNm:781.7,toNm:789.7,r:85,id:"N2_1PG (7,6)",rTable:49},{fromNm:587.9,toNm:595.9,r:39.8,id:"N2_1PG (8,4)",rTable:35},{fromNm:638.9,toNm:646.9,r:85.8,id:"N2_1PG (8,5)",rTable:88},{fromNm:582.6,toNm:590.6,r:31.8,id:"N2_1PG (9,5)",rTable:28},{fromNm:631.5,toNm:639.5,r:50,id:"N2_1PG (9,6)"},{fromNm:577.5,toNm:585.5,r:18.6,id:"N2_1PG (10,6)",rTable:17},{fromNm:623.7,toNm:631.7,r:15,id:"N2_1PG (10,7)",rTable:14},{fromNm:572.4,toNm:580.4,r:14.1,id:"N2_1PG (11,7)",rTable:14},{fromNm:567.5,toNm:575.5,r:15,id:"N2_1PG (12,8)"},{fromNm:560.4,toNm:568.4,r:5,id:"N2_1PG (13,9)"},{fromNm:914.6,toNm:929.3,r:971,id:"N2+ Meinel (1,0)"},{fromNm:782.9,toNm:795.5,r:1321.3,id:"N2+ Meinel (2,0)",rTable:762},{fromNm:943.1,toNm:958.2,r:428,id:"N2+ Meinel (2,1)"},{fromNm:685.4,toNm:697.1,r:115.5,id:"N2+ Meinel (3,0)",rTable:119},{fromNm:805.5,toNm:818.7,r:285,id:"N2+ Meinel (3,1)"},{fromNm:973.3,toNm:989,r:46,id:"N2+ Meinel (3,2)"},{fromNm:610.7,toNm:621.7,r:29.6,id:"N2+ Meinel (4,0)",rTable:26},{fromNm:704.3,toNm:716.3,r:98.6,id:"N2+ Meinel (4,1)",rTable:103},{fromNm:829.6,toNm:843,r:111,id:"N2+ Meinel (4,2)"},{fromNm:626.9,toNm:638,r:32.4,id:"N2+ Meinel (5,1)",rTable:32},{fromNm:724.1,toNm:736.3,r:63.2,id:"N2+ Meinel (5,2)",rTable:66}],note:"prompt; near infrared; 800 nm and beyond rests on the 1974 table as reproduced in the 1985 handbook, without a measured check; below 800 nm scaled to the TREx frame (trexShape)"},{id:"n2-blue",name:"N2+ first negative + N2 second positive",reference:"OI 557.7",tauS:0,heightsKm:[100,110,125],features:[{fromNm:387.9,toNm:391.4,r:980,id:"N2plus_1NG (0,0)"},{fromNm:424.3,toNm:427.8,r:323,id:"N2plus_1NG (0,1)"},{fromNm:467.4,toNm:470.9,r:88,id:"N2plus_1NG (0,2)"},{fromNm:519.3,toNm:522.8,r:14,id:"N2plus_1NG (0,3)"},{fromNm:583,toNm:586.5,r:2,id:"N2plus_1NG (0,4)"},{fromNm:662.7,toNm:666.2,r:1,id:"N2plus_1NG (0,5)"},{fromNm:354.8,toNm:358.3,r:51,id:"N2plus_1NG (1,0)"},{fromNm:385,toNm:388.5,r:42,id:"N2plus_1NG (1,1)"},{fromNm:420.2,toNm:423.7,r:47,id:"N2plus_1NG (1,2)"},{fromNm:461.7,toNm:465.2,r:20,id:"N2plus_1NG (1,3)"},{fromNm:511.4,toNm:514.9,r:5,id:"N2plus_1NG (1,4)"},{fromNm:571.8,toNm:575.3,r:2,id:"N2plus_1NG (1,5)"},{fromNm:352.9,toNm:356.4,r:11,id:"N2plus_1NG (2,1)"},{fromNm:382.3,toNm:385.8,r:1,id:"N2plus_1NG (2,2)"},{fromNm:416.5,toNm:420,r:5,id:"N2plus_1NG (2,3)"},{fromNm:456.5,toNm:460,r:3,id:"N2plus_1NG (2,4)"},{fromNm:504.2,toNm:507.7,r:2,id:"N2plus_1NG (2,5)"},{fromNm:452.1,toNm:455.6,r:2,id:"N2plus_1NG (3,5)"},{fromNm:448.2,toNm:451.7,r:1,id:"N2plus_1NG (4,6)"},{fromNm:376.5,toNm:380.5,r:56,id:"N2_2PG (0,2)"},{fromNm:401.9,toNm:405.9,r:19,id:"N2_2PG (0,3)"},{fromNm:430.4,toNm:434.4,r:5,id:"N2_2PG (0,4)"},{fromNm:462.6,toNm:466.6,r:1,id:"N2_2PG (0,5)"},{fromNm:371.5,toNm:375.5,r:62,id:"N2_2PG (1,3)"},{fromNm:395.8,toNm:399.8,r:26,id:"N2_2PG (1,4)"},{fromNm:422.8,toNm:426.8,r:11,id:"N2_2PG (1,5)"},{fromNm:453.3,toNm:457.3,r:3,id:"N2_2PG (1,6)"},{fromNm:487.8,toNm:491.8,r:1,id:"N2_2PG (1,7)"},{fromNm:367,toNm:371,r:18,id:"N2_2PG (2,4)"},{fromNm:390.2,toNm:394.2,r:12,id:"N2_2PG (2,5)"},{fromNm:416,toNm:420,r:4,id:"N2_2PG (2,6)"},{fromNm:444.9,toNm:448.9,r:3,id:"N2_2PG (2,7)"},{fromNm:410,toNm:414,r:3,id:"N2_2PG (3,7)"}],note:"prompt; blue-violet"},{id:"green",name:"O I 557.7",reference:"OI 557.7",tauS:.8,heightsKm:[100,110,125],features:[{nm:557.7,r:1e3,id:"O I 557.7"}],note:"the reference line; quenched below about 100 km (not modelled here)"},{id:"red",name:"O I 630.0 / 636.4",reference:"OI 630.0",tauS:110,heightsKm:[220,300,400],features:[{nm:630,r:1e3,id:"O I 630.0"},{nm:636.4,r:333.3,id:"O I 636.4"}],perKR5577:{arc:.1,range:[.02,.2]},note:"per 1 kR of 630.0; in an ordinary arc 630.0 is `perKR5577.arc` of the green line (survey: 0.02–0.2), in soft high aurora it exceeds it"},{id:"nir-atomic",name:"O I 777.4, O I 844.6, O2 (0,1) 864.5",reference:"OI 557.7",tauS:0,heightsKm:[100,110,125],features:[{nm:777.4,r:96,id:"O I 777.4"},{nm:844.6,r:115,id:"O I 844.6"},{fromNm:860,toNm:869,r:245,id:"O2 atmospheric (0,1)",range:[64,489]}],note:"treated as prompt (the plan); the O2 band is in fact slow (about 12 s) and its value is derived, range 64–489"}],X0={labels:["weak","medium","strong","great storm"],auroralZoneGreenKR:[1,10,100,100],lowLatitudeRedKR:[10,50,70,150],lowLatitudeGreenKR:[.5,1,1.5,2],lowLatitudeOverheadGreenKR:[3,10,30,30]},j0={"low-latitude-red":{rise:{durationS:600,toElevationDeg:81,knots:[[0,3.93],[60,4.41],[120,5.03],[180,5.82],[210,6.37],[270,7.86],[330,10.1],[390,13.77],[450,20.28],[480,27.3],[510,36.6],[540,48],[560,57],[580,68],[600,81]],pillarsFromDeg:-8,pillarsFullDeg:-3,greenFromDeg:5,greenFullDeg:35}}},Z0=6371;var Q0={components:V0,levels:X0,scenes:j0,earthRadiusKm:Z0};const wt=Q0,J0=wt,Jo=wt.components.map(e=>e.id),eu=e=>wt.components.find(t=>t.id===e),bs=wt.levels.labels.length;function tu(e,t){const o=Math.min(bs-1,Math.max(0,Math.round(t)));{const a=wt.levels.auroralZoneGreenKR[o];return{"n2-nir":a,"n2-blue":a,green:a,red:a*(eu("red").perKR5577?.arc??.1),"nir-atomic":a}}}const Xe=wt.scenes["low-latitude-red"].rise,ou=450,pa=(e,t,o)=>{const a=Math.min(1,Math.max(0,(o-e)/(t-e)));return a*a*(3-2*a)},Hi=(()=>{const e=Xe.knots,t=e.length,o=e.slice(1).map((a,n)=>(a[1]-e[n][1])/(a[0]-e[n][0]));return e.map((a,n)=>{if(n===0||n===t-1||o[n-1]*o[n]<=0)return 0;const r=e[n][0]-e[n-1][0],i=e[n+1][0]-e[n][0],s=2*i+r,l=i+2*r;return(s+l)/(s/o[n-1]+l/o[n])})})();function au(e){const t=Xe.knots;if(!(e>t[0][0]))return t[0][1];for(let o=0;o<t.length-1;o++){const[a,n]=t[o],[r,i]=t[o+1];if(e>r)continue;const s=r-a,l=(e-a)/s,c=l*l,h=c*l;return n*(2*h-3*c+1)+Hi[o]*s*(h-2*c+l)+i*(3*c-2*h)+Hi[o+1]*s*(h-c)}return t[t.length-1][1]}const Es=240,nu=70,ru=[14,44],iu=[58,88],su=[.5,.8],lu=[1,1.5],Gn=[.25,1];function cu(e){let t=e>>>0;return t=(t^t>>>16)>>>0,t=Math.imul(t,2146121005)>>>0,t=(t^t>>>15)>>>0,t=Math.imul(t,2221713035)>>>0,(t^t>>>16)>>>0}function $n(e){if(e<=0)return[0,Xe.toElevationDeg,1,1];const t=cu((e^739982445)>>>0),o=(t&255)/255,a=(t>>>8&255)/255,n=(t>>>16&255)/255,r=(t>>>24)/255,i=(e&1)===1,s=i?ru:iu,l=i?su:lu;return[Es*e+nu*(2*r-1),s[0]+(s[1]-s[0])*o,l[0]+(l[1]-l[0])*a,Gn[0]+(Gn[1]-Gn[0])*n]}function Fr(e){const t=e===1/0?ou:Number.isFinite(e)?Math.max(0,e):0;if(t<Xe.durationS){const c=au(t);return{edgeElevationDeg:c,pillars:pa(Xe.pillarsFromDeg,Xe.pillarsFullDeg,c),green:pa(Xe.greenFromDeg,Xe.greenFullDeg,c),risen:!1,bright:1}}const o=t-Xe.durationS,a=Math.floor(o/Es);let n=Math.max(0,a-1);for(;n<a+2&&$n(n+1)[0]<=o;)n++;const r=$n(n),i=$n(n+1),s=pa(r[0],i[0],o),l=r[1]+(i[1]-r[1])*s;return{edgeElevationDeg:l,pillars:r[3]+(i[3]-r[3])*s,green:pa(Xe.greenFromDeg,Xe.greenFullDeg,l),risen:!0,bright:r[2]+(i[2]-r[2])*s}}function uu(e,t){const o=Math.min(bs-1,Math.max(0,Math.round(e))),a=t.green*wt.levels.lowLatitudeOverheadGreenKR[o],n=t.bright??1;return{"n2-nir":a*n,"n2-blue":a*n,green:(wt.levels.lowLatitudeGreenKR[o]+a)*n,red:wt.levels.lowLatitudeRedKR[o]*n,"nir-atomic":a*n}}const X=2*Math.PI,ia=Math.PI/180,qe=J0.earthRadiusKm,hu=78,Ta=1/Math.tan(hu*ia),Na=110,fu=[0,.8,110],nt=3,mu=[107,240,300],_u=[8,60,80],du=[25,80,150];function pu(e){const t=Math.abs(e),o=1/(1+.3275911*t),a=o*(.254829592+o*(-.284496736+o*(1.421413741+o*(-1.453152027+o*1.061405429))))*Math.exp(-t*t);return e>=0?a:2-a}function xu(e,t){const o=mu[e],a=_u[e],n=du[e],r=a*Math.sqrt(Math.PI/2),i=r+n,s=t*i;if(s>=r)return o-n*Math.log(1-(s-r)/n);let l=0,c=12;for(let h=0;h<80;h++){const m=(l+c)/2;pu(m/Math.SQRT2)*r>s?l=m:c=m}return o-a*(l+c)/2}const Ls=e=>{const t=new Float64Array(9),o=new Float64Array(9),a=[];for(let n=0;n<3;n++){const r=e[n];a.push(r.length),r.forEach((i,s)=>{t[n*3+s]=xu(n,i),o[n*3+s]=1/r.length})}return{km:t,w:o,n:a}},Tr=Ls([[1/6,1/2,5/6],[1/6,1/2,5/6],[1/6,1/2,5/6]]),Nr=Ls([[1/4,3/4],[1/2],[1/2]]),Ua=Tr.km,Ur=Tr.w,Ca=Nr.km,Cr=Nr.w,Oa=Tr.n,ka=Nr.n,It=120,pn=.22,xn=.56,Ye=140,Fs=1.5,Or=18,An=.15,vn=5,ea=2.4,gn=.55,Mn=.9,kr=2,Pr=1.4,ge=12,Bo=1.5,Ts=2,Ns=1,zr=.75,Dr=.5,Ir=2.5,Au=.15,Gr=2.4,$r=1.8,qr=1.4,Kr=.9,Us=3,ir=1-Dr-1/(2*Ir),Hr=[.8,.6,.35,.25],Cs=[.6,.9,1.1,1.2],Wr=[2,2.5,4,4],Br=[.1,.15,.2,.2],Os=Float64Array.from([0,.5,1,0,.5,1,0,.5,1]),ks=Float64Array.from([.15,.85,0,.5,0,0,.5,0,0]),qn=.4,Yr=10,Vr=20,So=78,Ro=60,Pa=125,Xr=95,Ps=[qn,.7,qn,qn],jr=(e,t)=>{const o=Ps[t];return o+(1-o)*(e>>>16&15)/15},yn=[64,165,196,248],zs=[[0,150,300,450],[-400,-250,300,450],[-500,-300,400,600],[-700,-450,600,800]],wn=1,sr=4,Ds=e=>Math.min(sr-1,Math.max(0,Math.round(Number.isFinite(e)?e:wn))),Q=16,vu=2,gu=1800,sa=.2,la=4095,Mu=[35,90],yu=[.45,.4],wu=2,Is=150,Su=45,Ru=[12,36,60,68],Gs=[3600,3600,2400,1600],$s=[0,.6,.95,1],qs=[1,1,3,3],Yo=[[0,0],[.5,.9],[1,1.5],[1.3,1.9]],bu=[.5,1],Eu=[.2,.45],Lu=[360,900],Fu=[230,580],Ks=[70,200],Tu=[240,600],Nu=[200,500],Uu=[300,700],Hs=[0,25,40,60],Ws=[0,40,70,110],Cu=[0,100,250,350],lr=.7,Bs=[1,1.8,1.35],Wi=[1.5,4],Bi=[.25,.45],Yi=.5,ya=[.35,1.2],Ou=[.1,.4,.9],Vi=[.6,.5,.4],ku=1,wa=[.5,1.2],Zr=[1,.9411,.6457,.4731];Math.max(...Zr.map((e,t)=>e*(1+qs[t]*Yo[t][1])))-1;const Pu=Math.max(1,...Bs),Xi=e=>2*jt(j((e^1779033703)>>>0)^1013904242)-1,Kn=e=>Is*e+Su*(2*jt(j((e^528734635)>>>0)^1541459225)-1),Ne=(e,t)=>e[0]+(e[1]-e[0])*t,me=(e,t)=>(e>>>8*t&255)/255,uo=e=>{const t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)},xa=new Map;function zu(e,t){const o=e*4+t,a=xa.get(o);if(a!==void 0)return a;let n=null;const r=j((e*4+t^2050759141)>>>0);if((r>>>8)/16777216<$s[t]){const i=j((r^729683222)>>>0),s=j((i^1818371886)>>>0),l=Gs[t],c=Ne(Lu,me(i,0)),h=e*l+.15*l*me(i,1)+c,m=1+(i>>>16)%qs[t],p=(s&255)%3,d=s>>>8&1,_=[],x=[],f=[],v=[],g=[];for(let M=0;M<m;M++){const b=j((i^Math.imul(M+1,2654435761))>>>0),w=j((b^1540483477)>>>0);f.push(Ne(Fu,me(b,0))),v.push(Ne(Ks,me(b,1))),x.push(M===0?Ne(Yo[t],me(b,2)):x[0]*Ne(bu,me(b,2))),_.push(M===0?h+f[0]:_[M-1]+Ne(Tu,me(b,3))),g.push(me(w,0)<Ou[p]*(t===1?.5:1)?w:0)}const y=(x[0]-Yo[t][0])/Math.max(1e-9,Yo[t][1]-Yo[t][0]);n={on:h,growth:c,n:m,peak:_,amp:x,rise:f,half:v,hold:Ne(Nu,me(s,2)),fade:Ne(Uu,me(s,3)),kind:p,tail:d,growthKm:Hs[t]*(.6+.4*me(i,3)),poleKm:Ws[t]*(.6+.4*y),vortex:g}}return xa.size>256&&xa.clear(),xa.set(o,n),n}function Du(e,t,o){const a=j((e^320440878)>>>0),n=j((a^57701188)>>>0),r=Ne(Zu,me(a,1)),i=Ne(Qu,me(a,2)),s=Ne(Ju,me(a,3)),l=o-t;if(!(l>0&&l<r+i+s))return null;const c=l<r?uo(l/r):l<r+i?1:1-uo((l-r-i)/s),h=n&1?-1:1,m=Ne(th,me(n,1)),p=n&2?-1:1;return[Ne(oh,me(n,2)),Ne(ah,me(n,3))+p*nh*l,h*Ne(eh,me(n,0))*c,1/(m*m)]}const Iu=e=>({shift:0,bright:Zr[e]-1,act:0,rec:0,ext:0,ray:e>0?lr:1,diffuse:1,env:Lo,fold:0,jitter:e>0?ya[0]:1,own:e>0?wa[0]:1,vortex:[0,0,0,1]}),Gu=(e,t,o)=>(o>0?Vi[t]+(ku-Vi[t])*e.act:1)*(t>0?1+e.fold:1);function cr(e,t){const o=Iu(t);if(t<=0||!($s[t]>0))return o;const a=Math.floor(e/Gs[t]),n=Math.LN2;let r=0,i=0,s=0,l=0,c=0,h=0,m=0,p=-1/0;for(let x=a-3;x<=a;x++){const f=zu(x,t);if(!f)continue;const v=f.peak[f.n-1],g=v+f.hold+f.fade;if(!(e>f.on-f.growth&&e<g+8*Ks[1]))continue;const y=uo((e-f.on)/f.rise[0]),M=uo((e-v-f.hold)/f.fade),b=uo((e-f.on+f.growth)/f.growth);let w=0,R=0,T=0,N=0;for(let F=0;F<f.n;F++){const k=f.peak[F],D=f.rise[F],I=e-k,Y=I<-D?0:I<0?uo((I+D)/D):Math.exp(-I*n/f.half[F]),H=I>0?(1-Math.exp(-I*n/f.half[F]))*(1-M):0;T+=f.amp[F]*(Y+Eu[f.tail]*H),w+=Y,R+=H,F>0&&(N+=.4*f.poleKm*Y*f.amp[F]/f.amp[0]);const z=f.vortex[F];if(z){const K=k-.5*D+.8*D*me(z,1);if(K>p&&e>K){const Z=Du(z,K,e);Z&&(p=K,o.vortex=Z)}}}const S=Math.min(1,w),L=Math.min(1,R)*(1-S);o.shift+=-f.growthKm*b*(1-y)+f.poleKm*y*(1-M)+N,o.ext=Math.max(o.ext,Cu[t]*y*(1-M)*(.6+.4*S)),r+=T,i+=S,s+=L,l+=(Bs[f.kind]-lr)*S,c+=(Wi[f.tail]-1)*L,h+=(Bi[f.tail]-Lo)*L,f.kind===2&&(m+=Yi*Math.min(1,S+.5*L))}const d=Math.min(1,i),_=1.2*(Hs[t]+Ws[t]);return o.act=d,o.rec=Math.min(1,s),o.shift=Math.min(_,Math.max(-_,o.shift)),o.bright=Zr[t]*(1+r)-1,o.ray=Math.min(Pu,lr+l),o.diffuse=1+Math.min(Wi[1]-1,c),o.env=Math.min(Bi[1],Lo+h),o.fold=Math.min(Yi,m),o.jitter=ya[0]+(ya[1]-ya[0])*d,o.own=wa[0]+(wa[1]-wa[0])*d,o}function ji(e,t){const o=Ru[t],a=Math.floor(e/Is);let n=a-1;for(;n<a+2&&Kn(n+1)<=e;)n++;const r=Kn(n),i=Kn(n+1),s=Math.min(1,Math.max(0,(e-r)/(i-r))),l=s*s*(3-2*s),c=Xi(n),h=Xi(n+1),m=cr(e,t);return[o*(c+(h-c)*l)*m.jitter+m.shift,m.bright]}function $u(e,t,o,a){const n=e-Math.max(0,t)/2;if(!(o>0))return ji(n,a);const r=Math.min(6,o/8),i=Math.ceil(7*o/r);let s=0,l=0,c=0;for(let h=0;h<i;h++){const m=(h+.5)*r,p=Math.exp(-m/o),d=ji(n-m,a);s+=p,l+=p*d[0],c+=p*d[1]}return[l/s,c/s]}const qu=50,Ku=1800,Hu=[10,10],Wu=[400,900],Bu=.25,Yu=.25,Sn=25,Zi=[6,22],Ys=Float64Array.from([3,6,14,12,22,40,12,22,40]),Vs=Float64Array.from([4,10,0,22,0,0,22,0,0]),Xs=1.5,ur=8.5,ta=3,Qr=[1300,620,310],js=[2*Math.PI/2600,2*Math.PI/1400,2*Math.PI/700],Vu=[[25,15,8],[60,35,20],[90,50,28],[120,70,35]],Xu=[.75,-1.2,1.8],Zs=300,Qi=.35,ju=.8,hr=[-Math.PI/8,-Math.PI/24,Math.PI/24,Math.PI/8],Qs=.8,Js=.4,fr=[-Math.PI/5,-Math.PI/15,Math.PI/15,Math.PI/5],Zu=[12,30],Qu=[40,100],Ju=[30,60],eh=[.45*Math.PI,.75*Math.PI],th=[50,90],oh=[-150,250],ah=[-250,250],nh=.3,it=4,Jr=[2.6,4.2,7.3,13],el=[.3,.4,.45,.35],rh=[-Bo,-Bo,-Bo,-Bo],tl=el.map(e=>Au*e),ih=[0,0,0,0],sh=.25,_t=sh*ia,ol=8,al=12,nl=2.4,ei=.3,lh=1,ho=70,Xt=4,ch=[6,9,14,24],rl=[[250,120,-400,-600],[-60,-150,-500,-700],[-60,-150,-500,-700],[-60,-150,-550,-750]],uh=[4,.1,.02,.01],jo=95,il=[4,.1,.025,.013],sl=.4,ll=.12,fo=ho*1.2,za=62,ht=3,Pe=8,hh=250,fh=200,po=3e3,mh=4,_h=4,dh=[200,200,280,340],Hn=[20,80],Ji=2500,mo=[600,800],mr=.25,_r=[30,120,230,370,540,760],es=[.92,.42,.28,.27,.22,.16],Rn=_r.length,cl=Rn/2,Da=-.155,xo=[.35,.415],ph=260,xh=360,ul=[.85,1,1.1,1.3],bn=105,Ia=25,bo=700,Ga=Math.sqrt(bo*(2*qe+bo)),hl=95,fl=140,ml=.18,dr=.045,_l=.22,$a=.18,dl=11,pl=[42,.92,.075,.7],Yt=[.75,.18,.58,.42,.68,.065],xl=[585,330,4.2,.88,2.6],Al=[155,50,.16],vl=[1200,700,.18,.75],gl=[560,700,980,1040],Ao=[89,.158,10],qa=[3,7],pr=[.36,.24],Ml=.43,Sa=[4,30],Ka=[825,.05],yl=[805,105,14],wl=.93,Sl=.32,Ha=[29,56],_o=[4.4,3],Wa=[.51,1.15],Rl=445,bl=320,Ah=.06,ti=Ah*ia,El=[128,48,16,8,3],Vt=24576,Ll=[1.24,.86,.43,.58,.95],Fl=8.8,Ba=[.34,.22],Tl=.57,Nl=.42,Ul=.82,Cl=.52,Ra=[.65,2.5,.88],Ol=.42,Ya=1.48,kl=.18,vh=.04,Pl=[2,-1,3,-2,1,-3],gh=.15,zl=[3,2,4,-3,2,-4],Mh=90,yh=60,Dl=.6,Il=.15,Gl=.1,$l=.4,ts=(e,t)=>e/Math.sqrt(1+(e/t)**2),ft=[2.3,3.1,4.3],wh=.4,Eo=.75,xr=.3,oi=.5,We=[.12,.45,.35,.4,.4,.2],ql=400,Ar=.25,ai=80,ni=30,Kl=60,Hl=.85,Wl=[.4,.7,1,1],Sh=1,Rh=1,Pt=(e,t)=>((e>>>8*t&15)+(e>>>8*t+4&15))/15-1,bh=(e,t)=>Math.fround((e/ft[t]%4096+4096)%4096),Eh=(e,t,o)=>{const a=t.fold[14+o]+(e>>>26&7)*.125,n=Math.floor(a),r=j((e^Math.imul(n,2654435761))>>>0),i=(Math.imul(r,739982445)^r>>>16)>>>0;return[a,n,r,i]};function Lh(e,t,o,a){const n=a.fold[17];if(!(n>0))return 0;const r=(e>>>13)%3,i=ft[r],s=O[0],l=Math.exp(-Math.max(0,o-s)/Kl),c=n*Hl*Wl[a.level]*l;if(a.pulseMean)return a.rayCrest?c*Sh:c*Eo*.5*Nh(o-s)/i;const h=a.fold[14+r]+(e>>>26&7)*.125,m=Math.floor(h);return c*(os(e,t,o,h,m,i)+os(e,t,o,h,m-1,i))}const Va=1.5,Xa=80,Vo=.25,zt=[20,25,60,110],Bl=.6,Yl=30,vr=.6,Dt=[.12,1.55,1.85],Vl=e=>{const t=256*Vo;return e<t?zt[0]+zt[1]*e/t:zt[2]+zt[3]*(e-t)/(256-t)},Xl=(e,t)=>{const o=Math.max(Bl*t,Yl);return 1-C((e-t+o)/o)};function os(e,t,o,a,n,r){const i=We,s=O[0],l=a-n,c=j((e^Math.imul(n&4095,2654435761))>>>0),h=(Math.imul(c,739982445)^c>>>16)>>>0;if((h>>>24&255)>=256*Eo)return 0;const m=j((h^1481765933)>>>0),p=ql*(1+i[4]*Pt(c,3)),d=X*(h&255)/256,_=X*(h>>>8&255)/256,x=X*(m>>>16&255)/256,f=.5+.5*Math.cos(X*t/p+d),v=Ar*(Math.cos(X*t/(.618*p)+_)+vr*(m>>>8&255)/255*Math.cos(X*t/(.27*p)+x)),g=(l-xr-i[0]*Pt(c,0))*r-v,y=ni*(1+i[3]*Pt(c,2)),M=s-y+ai*(1+i[2]*Pt(c,1))*g,b=Math.max(0,M-s),w=y*(1+b/Xa),R=(o-M)/w,T=R>=0?R<1?(1-R*R)**2:0:Math.exp(-((R/Va)**2)),N=C(l/Dt[0])*(1-C((l-Dt[1])/(Dt[2]-Dt[1])));return(1+i[1]*Pt(h,2))*f*T*Xl(b,Vl(m&255))*N}let Fh=null;const Th=()=>{let e=0;for(let a=0;a<256;a++)e+=1/(1+We[2]*Pt(a,0));e/=256;const t=8/15+Va*Math.sqrt(Math.PI)/2,o=new Float64Array(401);for(let a=0;a<=400;a++){let n=0;for(let r=0;r<256;r++)n+=Xl(a,Vl(r));o[a]=ni*(1+a/Xa)/ai*e*t*n/256}return o};function Nh(e){const t=Fh??=Th(),o=Math.min(400,Math.max(0,e)),a=Math.min(399,Math.floor(o)),n=o-a;return t[a]+(t[a+1]-t[a])*n}const gr=360,ri=90,jl=60,Zl=160,ja=.12,ii=.12,Ql=.6,Jl=bn+ri*((1-ja)*Math.max(...ft)+ii);function Uh(e,t,o,a){const n=a.fold[17];if(!(n>0)||o>=Jl)return 0;const r=gr,i=t/r,s=Math.floor(i),l=i-s-.5,c=Math.cos(Math.PI*l),h=jl,m=ri,p=bn;let d=0;for(let _=0;_<2;_++){const x=_===0?s:s+(l>=0?1:-1),f=_===0?.5+.5*c:.5-.5*c,v=j((x&4095)*65536+9541+131*e>>>0),g=(v>>>13)%3,y=ft[g];if(a.pulseMean){const Y=ja+(o-p+h)/(m*y);Y>0&&Y<1&&(d+=f*Eo*.5*(16/15)*h/(m*y)*Math.sin(Math.PI*Y)**2);continue}const[M,b,w,R]=Eh(v,a,g),T=M-b;if((R>>>24&255)>=256*Eo)continue;const N=r*(1+We[4]*Pt(w,3)),S=X*(R&255)/256,L=X*(R>>>8&255)/256,F=.5+.5*Math.cos(X*t/N+S),k=(T-ja)*y-ii*Math.cos(X*t/(.618*N)+L),D=(o-(p-h+m*k))/h,I=Math.max(0,1-D*D);d+=f*(1+We[1]*Pt(R,2))*F*(.5-.5*Math.cos(X*T))*I*I}return n*Ql*d*Math.exp(-Math.max(0,o-p)/Zl)}const Ch=68,Oh=Math.atan(Math.tan(Ch*ia)/2);function Mr(e){const t=e/qe,o=Math.atan(2*Math.tan(Oh+t));return 1/Math.tan(o+t)}function Wn(e,t=Mr(e)){const o=qe,a=e/o,n=o+fh;return[n*Math.sin(a)+t*(n*Math.cos(a)-o),t]}const kh=1380,Ph=150,zh=[700,null,null,null];function as(e,t){const o=e*ia,a=Math.sin(o),n=Math.cos(o)**2,r=hh;return 2*r/(a+Math.sqrt(a*a+2*r*n/qe))*Math.cos(o)-dh[t]*C((e-Hn[0])/(Hn[1]-Hn[0]))}function Dh(e,t){const o=Math.min(3,Math.max(0,Math.round(t))),a=zh[o]??null,n=as(e,a===null?o:2),r=kh,i=Ph;if(a===null||!(n<r))return n;const s=(r-a-i/2)/(r-as(88,2)-i/2),l=r-n;return r-(l<i?l-(1-s)*l*l/(2*i):i*(1+s)/2+s*(l-i))}function ec(e,t,o=!1){const a=new Float64Array(24),n=Dh(e,t),r=Mr(n+Ji/3);a[0]=Wn(n,r)[0],a[1]=Wn(n+Ji,r)[0],a[2]=r,a[3]=n,a[4]=Mr(0),a[5]=C((ph-n)/xh);const i=o?2:1;for(let s=0;s<Rn;s+=i){const l=es[s],c=o?es[s+1]:0,h=_r[s],m=o?_r[s+1]:h,p=n+(l*h+c*m)/(l+c),[d,_]=Wn(p);a.set([d,_,l+c],6+3*s/i)}return a}const Ih={foldLambdaKm:Qr,rayLambdaKm:Jr},ba=(e,t)=>X*(.6180339887*(e*7+t+1)%1);function tc(e){return e==="red"?2:e==="green"?1:0}const Bn=(e,t)=>Zs*(t+(2*jt(j(t*3+e^797598657)^31773)-1)/3),Yn=(e,t,o)=>jt(j((t*3+e^1374496523)>>>0)^521288629+o);function Gh(e,t,o){const a=Math.floor(t/Zs);let n=a-1;for(;n<a+2&&Bn(e,n+1)<=t;)n++;const r=Bn(e,n),i=Bn(e,n+1),s=Math.min(1,Math.max(0,(t-r)/(i-r))),l=s*s*(3-2*s),c=p=>Yn(e,n,p)+(Yn(e,n+1,p)-Yn(e,n,p))*l,h=Vu[o][e]*(Qi+(1-Qi)*c(0)),m=X/Qr[e];return[h,Zo(m*Xu[e]*t+ba(1,e)+ju*(2*c(1)-1))]}function oc(e,t,o){const a=o.fold,n=a[8];if(n===0)return[e,t];const r=e-a[6],i=t-a[7],s=n*Math.exp(-(r*r+i*i)*a[9]),l=Math.cos(s),c=Math.sin(s);return[a[6]+l*r-c*i,a[7]+c*r+l*i]}const yr=10,ac=1.5,nc=.5,rc=.7,ic=2.5;function $h(e,t,o){const a=o.fold,n=a[8];if(n===0)return 0;const r=e-a[6],i=t-a[7],s=(r*r+i*i)*a[9];return Math.abs(n)*(2*s+nc)*Math.exp(-s)}function sc(e,t,o){const a=[0,0,0,0,0];for(let n=0;n<ta;n++){const r=X/Qr[n]*t+js[n]*e-o.fold[2*n+1],i=o.fold[2*n],s=i*Math.cos(r);a[0]+=s,n>0&&(a[2*n-1]=s,a[2*n]=i*Math.sin(r))}return a}function si(e){const t=hr[(e>>>10^e>>>19)&3],o=fr[(e>>>3^e>>>27)&3],a=Qs+Js*((e>>>14^e>>>23)&3)/3;return[Math.cos(t)-1,Math.sin(t),a*Math.cos(o)-1,a*Math.sin(o)]}function Ea(e){return Math.abs(e)<1e-6?1:Math.sin(e)/e}function Zo(e){const t=e%X;return t<0?t+X:t}function ns(e,t,o,a,n,r){const i=t*a,s=Math.max(0,r);return[e*Ea(t*s/2)/Math.sqrt(1+i*i),Zo(t*(n-s/2)-o-Math.atan(i))]}const qh=4;function Kh(e){return e>0?C(e/qh):0}function Hh(e,t=0,o=wn){const a=Number.isFinite(e)?e:0,n=Ds(o),r=new Float64Array(nt*Q),i=new Float64Array(nt*ta*2),s=new Float64Array(nt*it*2),l=new Float64Array(nt*Xt*ht*2),c=new Float64Array(nt*mh*2),h=new Float64Array(nt*_h*2),m=new Float64Array(nt),p=new Float64Array(2*nt);for(let d=0;d<nt;d++){const _=fu[d];{const[f,v]=ns(qu,X/Ku,ba(0,0),_,a,t);r[d*Q]=f*Math.cos(v)}for(let f=0;f<vu;f++){const v=X/Wu[f],g=v*_,y=Math.max(0,t),M=Hu[f]*Ea(v*y/2)/Math.sqrt(1+g*g),b=Zo(v*(a-y/2)-Math.atan(g));r[d*Q+1+2*f]=M*Math.cos(b),r[d*Q+2+2*f]=M*Math.sin(b)}const x=cr(a-Math.max(0,t)/2-_,n).own;for(let f=0;f<wu;f++){const v=X/Mu[f],g=v*_,y=Math.max(0,t),M=x*yu[f]*Ea(v*y/2)/Math.sqrt(1+g*g),b=Zo(v*(a-y/2)-Math.atan(g)+ba(4,f));r[d*Q+5+2*f]=M*Math.cos(b),r[d*Q+6+2*f]=M*Math.sin(b)}{const[f,v]=$u(a,t,_,n);r[d*Q]=r[d*Q]+f,r[d*Q+9]=f,r[d*Q+10]=v}r[d*Q+11]=n;{const f=(a-Math.max(0,t)/2-_)/gu,v=Math.floor(f);r[d*Q+12]=f-v,r[d*Q+13]=(v%4096+4096)%4096;const g=a-Math.max(0,t)/2-_,y=w=>(w%4096+4096)%4096,M=y(Fs*g/Ye),b=y(Bo*g/ge);r[d*Q+14]=M-Math.floor(M),r[d*Q+15]=b-Math.floor(b),p[2*d]=Math.floor(M),p[2*d+1]=Math.floor(b)}if(d===0){const f=a-Math.max(0,t)/2,v=cr(f,n);for(let g=0;g<ta;g++){const[y,M]=Gh(g,f,n);i[2*g]=y*Gu(v,g,n),i[2*g+1]=M}i.set(v.vortex,6),i[10]=v.ext,i[11]=v.ray-1,i[12]=v.diffuse-1,i[13]=v.env-Lo;for(let g=0;g<3;g++)i[14+g]=bh(f,g);i[17]=Rh*Math.min(1,wh/Math.max(1e-9,t))}for(let f=0;f<it;f++){const v=X/Jr[f],[g,y]=ns(el[f],v*rh[f],ba(2,f),_,a,t);s[(d*it+f)*2]=g,s[(d*it+f)*2+1]=y}for(let f=0;f<Xt;f++)for(let v=0;v<ht;v++){const g=v+1,y=g*X/ch[f],M=y*_,b=Math.max(0,t),w=2/(g*Math.PI)*Math.sin(g*Math.PI*ei)*Ea(y*b/2)/Math.sqrt(1+M*M),R=Zo(y*(a-b/2)-Math.atan(M)+Math.PI/2),T=((d*Xt+f)*ht+v)*2;l[T]=w,l[T+1]=R}}return yf(c,a,t),r.set([p[0],p[1],p[4],p[5]],Q+12),{arcY:r,fold:i,ray:s,patch:l,pillar:c,bundle:h,lowDrift:m,level:n}}function j(e){let t=e>>>0;return t=(t^t>>>16)>>>0,t=Math.imul(t,2146121005)>>>0,t=(t^t>>>15)>>>0,t=Math.imul(t,2221713035)>>>0,t=(t^t>>>16)>>>0,t}function jt(e){return(j(e)>>>8)/16777216}const C=e=>{const t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)};function rs(e,t,o=0,a=0){const n=Math.floor(t),r=t-n,i=r*r*(3-2*r),s=n+a|0,l=j((e^Math.imul(s&4095,668265261))>>>0),c=j((e^Math.imul(s+1&4095,668265261))>>>0),h=(m,p)=>{const d=m>>>8*p&255,_=m>>>8*(p+1&3)&255,x=o+(m>>>16&255)/256+.25*p,f=x-Math.floor(x),v=1-Math.abs(2*f-1);return(d+(_-d)*(v*v*(3-2*v)))/255};return[0,1,2,3].map(m=>h(l,m)+(h(c,m)-h(l,m))*i)}const lc=Fs,oa=2,aa=2;function Za(e){const t=j((e^1663821227)>>>0),o=t&2?-1:1;return[o*(1+(t&1)),o]}const li=(e,t)=>(Math.imul(e&4095,t)>>>20)/4096;function vo(e,t,o,a,n,r){const i=Math.abs(n),s=t+n*o,l=Math.floor(s),c=s-l,h=c*c*(3-2*c),m=l+n*a,p=r*i*a,d=r*i*o,_=v=>{const g=(e^Math.imul(v&4095,668265261))>>>0,y=d+li(v,2654435761),M=Math.floor(y),b=y-M,w=b*b*(3-2*b),R=p+M,T=j((g^Math.imul(R,374761393))>>>0),N=j((g^Math.imul(R+1,374761393))>>>0),S=1/Math.sqrt((1-w)*(1-w)+w*w);return[0,1,2,3].map(L=>{const F=T>>>8*L&255,k=N>>>8*L&255;return Math.min(1,Math.max(0,.5+((F+(k-F)*w)/255-.5)*S))})},x=_(m),f=_(m+1);return[0,1,2,3].map(v=>x[v]+(f[v]-x[v])*h)}const wr=3,ci=[4,10,16,22],go=[.22,.32],Qo=[.55,.85],Qa=[.35,.3],cc=.4,Mo=[.65,1],rt=[.5,.8,.85],uc=1.5,hc=2.2;function Wh(e,t,o,a,n,r){const i=Math.abs(n),s=t+n*a,l=s&4095,c=wr*i*o+li(s,2246822519),h=Math.floor(c),m=c-h,p=wr*i*a+h,d=j((e^Math.imul(l,668265261)^Math.imul(p,374761393))>>>0),_=ci[r]*(.35+.65*(d&255)/255)*(d&2147483648?-1:1),x=C(m/cc)*(1-C((m-Mo[0])/(Mo[1]-Mo[0]))),f=C((m-rt[0])/(rt[1]-rt[0]))*(1-C((m-rt[2])/(1-rt[2])));return[t+Qa[0]+Qa[1]*(d>>>8&255)/255,go[0]+(go[1]-go[0])*(d>>>16&255)/255,_*x,X*(d>>>24&127)/128,f]}function is(e,t){const o=Qo[1]**2,a=Qo[0]**2,n=e-t[0],r=n/t[1],i=Math.exp(-r*r)*C((o-n*n)/(o-a));return[t[2]*Math.cos(hc*r+t[3])*i,t[4]*i]}function Bh(e,t,o,a,n,r){const i=t.map(c=>Math.floor(c-.5)),s=Math.min(...i),l=[0,1,2].map(c=>Wh(e,s+c,o,a,n,r));return t.map((c,h)=>{const m=i[h]===s?0:1,p=is(c,l[m]),d=is(c,l[m+1]);return[p[0]+d[0],p[1]+d[1]]})}function ui(e,t=wn,o=0){const a=zs[Ds(t)];return C((e-a[0])/(a[1]-a[0]))*C((a[3]+o-e)/(a[3]-a[2]))}const hi=e=>j((e+1024)*65536+4099>>>0),fi=(e,t)=>j((e^Math.imul(t,2654435761))>>>0);function Yh(e,t,o,a,n=0,r=0,i=0,s,l){const c=o*Q,h=a.level,m=ui(e-a.arcY[c+9],h,a.fold[10]);if(!(m>0))return 0;const p=Math.min(Sn,r)**2,d=(o>=2?2:0)*Q,_=e-a.arcY[c],x=Math.floor((e-a.arcY[d])/It),f=yn[h],v=So*So,g=Ro*Ro;let y=0;const M=a.arcY[d+12],b=a.arcY[d+13],w=a.arcY[d+14],R=a.arcY[d+15],T=a.arcY[Q+(o>=2?14:12)],N=a.arcY[Q+(o>=2?15:13)],S=I=>I-Math.floor(I),L=S(w*Ts),F=S(R*Ns),k=Math.exp(-.5*(Math.PI*n/Ye)**2),D=Math.exp(-.5*(Math.PI*n/ge)**2);for(let I=-1;I<=1;I++){const Y=x+I,H=hi(Y),z=M+(H>>>8)/16777216,K=Math.floor(z),Z=z-K,W=b+K&la,U=fi(H,W);if((U&255)>=f)continue;const oe=C(Math.min(Z,1-Z)/sa),G=(Y+pn+xn*(U>>>8&255)/256)*It,P=X*((U>>>12^U>>>21)&7)/Pe,V=X*((U>>>5^U>>>18)&7)/Pe,ee=1+a.arcY[c+5]*Math.sin(P)+a.arcY[c+6]*Math.cos(P)+a.arcY[c+7]*Math.sin(V)+a.arcY[c+8]*Math.cos(V),ce=o<2,Me=o>=2?vo((U^2246822507)>>>0,t/Ye,a.arcY[14],a.arcY[Q+12],Za(U)[0],oa):rs((U^2246822507)>>>0,t/Ye+w,L,T),_e=ce?rs((U^3266489909)>>>0,t/ge+R,F,N):ih,se=Math.max(0,Me[1]-An),be=Math.min(ea,vn*se*se*(ce?1+Br[h]*D*(_e[0]+_e[2]-1):1)),re=jr(U,h)*oe*ee*be*(1+(2*i-1)*zr*(2*Me[2]-1)),ne=(Yr+Vr*(U>>>20&15)/15)/2.3548200450309493*(gn+Mn*Me[3]),de=U>>>24&1,ue=U>>>25&7,ye=(U>>>29)+(U>>>8)&7,pe=X*ue/Pe,bt=X*ye/Pe,$t=a.arcY[c+1+2*de]*Math.sin(pe)+a.arcY[c+2+2*de]*Math.cos(pe),Ee=s?si(U):null,Et=Or*k*(2*Me[0]-1)+(ce?Wr[h]*D*(_e[0]-_e[1]):0)+(Ee?s[0]*Ee[0]-s[1]*Ee[1]+s[2]*Ee[2]-s[3]*Ee[3]:0);let te=0,ie=0;for(let le=0;ce&&le<it;le++){const we=(o*it+le)*2,Ve=X/Jr[le],Ke=ir+(Math.min(1,Math.max(0,(_e[le]-Dr)*Ir))-ir)*D;te+=Ke*a.ray[we]*Math.exp(-.5*(Ve*n)**2)*Math.cos(Ve*t+bt-a.ray[we+1]),ie+=Ke*tl[le]}const he=Math.min(Pr,Math.max(0,kr*Me[2]-Hr[h])),fe=Math.min(qr,Math.max(0,1+i*(Gr*_e[3]-$r))),xe=Math.min(Kr,he*fe*(ie+te));let Ue=1;if(l){const le=Za(U)[1],we=n0((U^461845907)>>>0,t-le*l[0],a.arcY[15],a.arcY[Q+13],le,l[1]);Ue=1+Math.min(1,he)*(Ei*(we[0]-1)+(2*i-1)*Li*(we[1]-1))}const De=_-G-$t,Lt=s?C((Pa**2-De*De)/(Pa**2-Xr**2)):1,Fe=De-Et,xt=C((v-Fe*Fe)/(v-g))*Lt,et=ne*ne+p;y+=re*Math.sqrt(ne*ne/et)*Math.exp(-.5*Fe*Fe/et)*xt*Math.max(0,1+Cs[h]*xe)*Ue}return m*(1+a.arcY[c+10])*y*(l?bi:1)}function Vh(e,t,o){const a=2*Q,n=t.level,r=e[e.length>>1],i=t.arcY[a+12],s=t.arcY[a+13],l=t.arcY[14],c=t.arcY[Q+12],h=t.arcY[15],m=t.arcY[Q+13],p=yn[n],d=So*So,_=Ro*Ro,x=Pa**2,f=Xr**2,v=e.map(M=>({s:M,wb:M.w*ui(M.xn-t.arcY[a+9],n,t.fold[10]),xg:M.xn-t.arcY[a],sn2:Math.min(Sn,M.sn)**2,fa:Math.exp(-.5*(Math.PI*M.sx/Ye)**2),acc:0})),g=Math.floor((r.xn-t.arcY[a])/It-.5);for(let M=-1;M<=En-2;M++){const b=g+M,w=hi(b),R=i+(w>>>8)/16777216,T=Math.floor(R),N=R-T,S=fi(w,s+T&la);if((S&255)>=p)continue;const L=(b+pn+xn*(S>>>8&255)/256)*It,F=X*((S>>>12^S>>>21)&7)/Pe,k=X*((S>>>5^S>>>18)&7)/Pe,D=1+t.arcY[a+5]*Math.sin(F)+t.arcY[a+6]*Math.cos(F)+t.arcY[a+7]*Math.sin(k)+t.arcY[a+8]*Math.cos(k),I=S>>>24&1,Y=X*(S>>>25&7)/Pe,H=t.arcY[a+1+2*I]*Math.sin(Y)+t.arcY[a+2+2*I]*Math.cos(Y),z=si(S),K=o[0]*z[0]-o[1]*z[1]+o[2]*z[2]-o[3]*z[3],[Z,W]=Za(S),U=(Yr+Vr*(S>>>20&15)/15)/2.3548200450309493,oe=jr(S,n)*C(Math.min(N,1-N)/sa)*D,G=vo((S^2246822507)>>>0,r.xe/Ye,l,c,Z,oa),P=n0((S^461845907)>>>0,e[0].xe-W*e[0].red[0],h,m,W,1),V=Math.max(0,G[1]-An),ee=oe*Math.min(ea,vn*V*V),ce=zr*(2*G[2]-1),Me=U*(gn+Mn*G[3]),_e=Me*Me,se=Or*(2*G[0]-1),be=Math.min(1,Math.min(Pr,Math.max(0,kr*G[2]-Hr[n])));for(const re of v){const ne=re.xg-L-H;if(!(ne*ne<x))continue;const de=re.s,ue=2*de.top-1,ye=ne-(se*re.fa+K),pe=_e+re.sn2;re.acc+=ee*(1+ue*ce)*Math.sqrt(_e/pe)*Math.exp(-.5*ye*ye/pe)*C((d-ye*ye)/(d-_))*C((x-ne*ne)/(x-f))*(1+be*de.red[1]*(Ei*(P[0]-1)+ue*Li*(P[1]-1)))}}let y=0;for(const M of v)y+=M.wb*M.acc;return y*(1+t.arcY[a+10])*bi}function Xh(e,t,o,a,n=0,r=0,i=0,s,l){const c=Yh(e,t,o,a,n,r,i,s,l);return o>=2?c:c+fc(e,t,o,a)}function fc(e,t,o,a,n){const r=n??mc(e,a.level);let i=0;if(r>0){const s=Math.floor(t/ho),l=Math.floor(e/ho);for(let c=-1;c<=1;c++)for(let h=-1;h<=1;h++){const m=j((s+h+1024)*65536+(l+c+1024)>>>0),p=(s+h+.2+.6*jt(m^1759714724))*ho,d=(l+c+.2+.6*jt(m^3039394381))*ho,_=ol+al*jt(m^458671337),x=nl*_,f=j(m^2135587861),v=f%Xt,g=X*(j(m^625341585)%Pe)/Pe,y=sl+ll*(f>>>8&255)/255;let M=0;for(let S=0;S<ht;S++){const L=((o*Xt+v)*ht+S)*2;M+=a.patch[L]*Math.sin((S+1)*g+a.patch[L+1])}const b=Math.min(1,Math.max(0,ei+M)),w=t-p,R=e-d,T=w*w+R*R,N=C((fo*fo-T)/(fo*fo-za*za));i+=y*b*Math.exp(-(w*w/(x*x)+R*R/(_*_)))*N}}return il[a.level]*(1+a.fold[12])*r*(1+i)}function mc(e,t){const o=rl[t];return C((o[0]-e)/(o[0]-o[1]))*C((e-o[3])/(o[2]-o[3]))}function _c(e,t){const o=qe*Math.sqrt(Math.max(0,1-e*e))/(qe+t);return 1/Math.sqrt(Math.max(1e-6,1-o*o))}const O=Float64Array.from([101,107,125,175]),jh=(e,t)=>{let o=0;for(let a=0;a+1<e.length;a++)o+=(e[a+1]-e[a])*(t[a]+t[a+1])/2;return Float64Array.from(t.map(a=>a/o))},Re=jh(O,[0,1,Math.exp(-18/25),0]),dc=Float64Array.from([0,.5,1]),mi=125,En=4,Ja=180,en=140,Qt=.5,Jt=1.5,_i=.7,pc=12,Vn=.35,xc=[Vn,.55,Vn,Vn],Ac=18/68,Lo=.1,vc=20,gc=2,Mc=[.6,1,1.6,1.8],yc=.6,wc=2,di=3,pi=10,Zh=[2,1.5,1,.7],na=2.5,$e=ge,Qh=.2,Xn=[.15,.4],Aa=[35,.45,15,110],jn=[.4,.4,2.2],Zn=[.4,1.2,5],Sc=.55;function xi(e){const t=[-39.69683028665376,220.9460984245205,-275.9285104469687,138.357751867269,-30.66479806614716,2.506628277459239],o=[-54.47609879822406,161.5858368580409,-155.6989798598866,66.80131188771972,-13.28068155288572],a=[-.007784894002430293,-.3223964580411365,-2.400758277161838,-2.549732539343734,4.374664141464968,2.938163982698783],n=[.007784695709041462,.3224671290700398,2.445134137142996,3.754408661907416];if(e<.02425){const s=Math.sqrt(-2*Math.log(e));return(((((a[0]*s+a[1])*s+a[2])*s+a[3])*s+a[4])*s+a[5])/((((n[0]*s+n[1])*s+n[2])*s+n[3])*s+1)}if(e>1-.02425)return-xi(1-e);const r=e-.5,i=r*r;return(((((t[0]*i+t[1])*i+t[2])*i+t[3])*i+t[4])*i+t[5])*r/(((((o[0]*i+o[1])*i+o[2])*i+o[3])*i+o[4])*i+1)}const Ai=(e,t,o,a,n,r)=>{const i=Float64Array.from({length:16},(l,c)=>n(Math.min(a,Math.max(o,e*Math.exp(t*xi((c+.5)/16))))));let s=0;for(const l of i)s+=l;return i.map(l=>l*r*16/s)},vi=Ai(Aa[0],Aa[1],Aa[2],Aa[3],e=>Math.exp(-18/e)/Math.exp(-18/25),1),gi=Ai(1,jn[0],jn[1],jn[2],e=>e,1),Rc=Ai(na,Zn[0],Zn[1],Zn[2],e=>e,na),Jh=e=>{const t=Xn[0],o=Xn[1]-Xn[0],a=t+o/2;return[t,o,e<1?(1-e*a)/(1-e):1]},tn=Math.round(256*Qh),yo=Jh(tn/256),ef=.08,tf=[.5,.75,1,1.25],mt=[.5,1.2],bc=.3,Ec=.4,on=tf.map(e=>Math.min(128,Math.round(256*ef*e))),Mi=on.map(e=>e/256*.5*(mt[0]+mt[1]));function ss(e,t){const o=e&255,a=tn,n=gi[e>>>16&15],r=on[t],i=o<a?yo[0]+yo[1]*(o+.5)/a:yo[2],s=o>=256-r?mt[0]+(mt[1]-mt[0])*(o-(256-r)+.5)/r:0;return[n*i,n*vi[e>>>8&15],n,Rc[e>>>24&15],n*s]}const yi=4096*(ge/$e);function of(e,t,o,a,n,r,i=2){const s=ge/$e,l=t/$e+n*s*o,c=Math.floor(l),h=l-c,m=h*h*(3-2*h),p=c+n*s*a,d=yi,_=(p%d+d)%d,x=(_+1)%d,f=ss(j((e^Math.imul(_,797598657))>>>0),i),v=ss(j((e^Math.imul(x,797598657))>>>0),i),g=[1,1,1,na,Mi[i]];return[0,1,2,3,4].map(y=>g[y]+(f[y]+(v[y]-f[y])*m-g[y])*r)}const an=4,Sr=2,Lc=.55,Fc=.82,Tc=.86,nn=[.4,1.2],rn=[.31,.45],sn=[.014,.036],Nc=.45,Uc=.35;function af(e,t,o,a,n,r,i,s,l=!1){const c=Lc*(2*r-1)+Fc*s*(2*i-1),h=C(nn[0]+nn[1]*c),m=an*(t/ge+n*o),p=Math.floor(m),d=p+an*n*a,_=aa*o,x=aa*a,f=m-p,v=R=>{const T=e^2510076637^Math.imul(R&4095,668265261),N=_+li(R,2654435761),S=Math.floor(N),L=C(N-S),F=x+S,k=j((T^Math.imul(F,374761393))>>>0),D=j((T^Math.imul(F+1,374761393))>>>0),I=Math.sqrt((1-L)**2+L*L),Y=H=>{const z=k>>>H&255,K=D>>>H&255;return Math.min(1,Math.max(0,.5+((z+(K-z)*L)/255-.5)/I))};return[Y(0),Y(8)]},g=l?[1+Sr/4,.5]:v(d),y=l?g:v(d+1),M=g[0]+(y[0]-g[0])*C(f)+Sr*f*(1-f)*((1-f)*(2*g[1]-1)-f*(2*y[1]-1)),b=s*s,w=rn[0]*c+Tc*h*b*(2*M-1)-sn[0]-sn[1]*s;return[rn[1]*(2**w-1),1+Nc*h]}const Je=89,nf=4,ls=[-8,12],Cc=7,Oc=2,wo=.1,kc=.9,Pc=12,zc=.2,Dc=25,Ic=4,Gc=.6,wi=[0,.1,.25,.35],Si=.9,$c=(e,t,o)=>Float64Array.from({length:16},(a,n)=>Math.min(o,Math.max(t,e*xi((n+.5)/16)))),qc=$c(nf,ls[0],ls[1]),rf=[6,5.6,5.6,5.7],sf=.6,cs=[1.5,25],Kc=.8,Hc=.8,Ri=rf.map(e=>$c(sf,Math.log(cs[0]/e),Math.log(cs[1]/e)).map(t=>e*Math.exp(t))),lf=[1.17,1.25,1.23,1.17],Wc=Ri.map((e,t)=>Math.min(1,(di+pi/2)/(e.reduce((o,a)=>o+a,0)/16)/lf[t])),Qn=[.06,.3],cf=.65,Bc=15,Yc=2.5,Vc=.6,Xc=Float64Array.from({length:16},(e,t)=>Qn[0]*(Qn[1]/Qn[0])**((t+.5)/16)),jc=Math.round(256*cf),Zc=6,Qc=10;function uf(e,t,o,a,n=!1){return n?(di+pi*(e>>>20&15)/15)/2.3548200450309493*(gn+Mn*o):Ri[t][e>>>20&15]/2.3548200450309493*Math.exp(Kc*(2*o-1))*(1+Hc*Math.abs(a)/ci[t])}function hf(e){const t=j((e^1663821227)>>>0);return[qc[t>>>8&15],Xc[t>>>12&15],(t>>>16&255)<jc?1:-1]}const ff=(e,t,o,a)=>e+Cc*(1-2*t)+Oc*(o-.5)*a;function mf(e,t,o,a){const n=O[0]-Je,r=wo*(O[1]-O[0]),i=e<-r?Math.min(kc,wo*n/Math.max(n+r+e,1e-6)):Math.max(0,-e*wo/r),s=Math.min(1,Math.max(zc,1-e/Pc)),l=o*(1+Math.max(0,e)/Dc),c=i+t*Math.max(0,(1+Gc)*s-i),h=O[0]-Je,m=O[1]-O[0],p=O[2]-O[1],d=(O[3]-O[2])*a,_=.5*(m+p+(p+d)*o),x=.5*((h+m)*c+(m+p)*s+(p+d)*l),f=_/x;return[c*f,s*f,l*f]}const Jc=wi.map(e=>{if(!(e>0))return 2;const t=[];for(let n=0;n<4096;n++)t.push(vo((Math.imul(n,2654435761)^625341585)>>>0,.37+n*.731,.3,17,1,aa)[2]);let o=0,a=1;for(let n=0;n<40;n++){const r=.5*(o+a);let i=0;for(const s of t)i+=C((s-r)/Si+.5);i/t.length>e?o=r:a=r}return .5*(o+a)}),_f=(e,t,o)=>{const a=wi[e];return a+(C((t-Jc[e])/Si+.5)-a)*o},bi=2,Ei=1,Li=1,e0=1/110,t0=.098,o0=42,a0=$e/.7429;function df(e){const t=lc/(e0+t0*Math.exp(-(e-200)/o0));return[t,1/Math.sqrt(1+2*t/a0)]}function n0(e,t,o,a,n,r){const i=ge/$e,s=t/$e+n*i*o,l=Math.floor(s),c=s-l,h=c*c*(3-2*c),m=l+n*i*a,p=yi,d=(m%p+p)%p,_=(d+1)%p,x=g=>{const y=vi[g>>>8&15];return[gi[g>>>16&15]*y,y]},f=x(j((e^Math.imul(d,797598657))>>>0)),v=x(j((e^Math.imul(_,797598657))>>>0));return[1+(f[0]+(v[0]-f[0])*h-1)*r,1+(f[1]+(v[1]-f[1])*h-1)*r]}const pf=()=>{const e=O,t=Re,o=e.length;let a=0;const n=2e3;for(let r=0;r<n;r++){const i=(r+.5)/n,s=Qt+Jt*i*i,l=Array.from(t);l[o-2]=l[o-2]*(1+_i*i*i);for(let c=0;c+1<o;c++)a+=(e[c+1]-e[c])*(c+2===o?s:1)*.5*(l[c]+l[c+1])/n}return 1/a},Ln=pf(),ln=[-4,Qt+Jt+1],r0=1.5,i0=10,cn=4,un=2,s0=40,l0=.15,Rr=Math.sqrt(2*Math.PI);function us(e){const t=Math.exp(-.5*e*e),o=1/(1+.3275911*e*Math.SQRT1_2);return[.5*o*(.254829592+o*(-.284496736+o*(1.421413741+o*(-1.453152027+o*1.061405429))))*t,t]}function Jn(e,t,o,a){const n=t-e,r=e/a,i=t/a,[s,l]=us(Math.abs(r)),[c,h]=us(Math.abs(i));if(Math.abs(n)<l0*a){const _=i-r,x=Math.sqrt(l*h)*(1+_*_/8),f=o/(6*Rr*a);return[f*(l+2*x),f*(2*x+h)]}const m=r*i>=0?r+i>=0?s-c:c-s:(i>=0?1-c:c)-(r>=0?1-s:s),p=(a*a*(l-h)/(Rr*a)-e*m)/n,d=o/n;return[Math.max(0,d*(m-p)),Math.max(0,d*p)]}if(Re[0]!==0||Re[Re.length-1]!==0||O.length!==4)throw new Error("aurora-morph: the curtain profile has 4 nodes, no density at its ends (zoneCurtainE)");const Fi=(Math.PI/$e)**2,xf=(e,t,o)=>{const a=qe,n=a*t,r=(2*a*e+e*e)/(n+Math.sqrt(n*n+2*a*e+e*e));return[r,a*Math.atan2(r*o,a+r*t)]};function c0(e,t,o,a,n){const r=qe,i=Math.sqrt(e*e+t*t),s=i>1e-9?t/i:1,l=i>1e-9?e/i:0,c=O,h=Re,m=c.length,p=[],d=[],_=[],x=[],f=[];for(let w=0;w<m;w++){const R=c[w],T=r*o,N=(2*r*R+R*R)/(T+Math.sqrt(T*T+2*r*R+R*R)),S=r*Math.atan2(N*i,r+N*o);p.push(N),d.push(S*s+(R-Na)*Ta),_.push(S*l)}let v=0;for(let w=0;w<m;w++){const R=w>0?(p[w]-p[w-1])/(c[w]-c[w-1]):0,T=w+1<m?(p[w+1]-p[w])/(c[w+1]-c[w]):0,N=w===0?T:w+1===m?R:.5*(R+T),S=s*s*(N*N-1);x.push(Math.min(s0,p[w]*n*wc*Math.sqrt(1+Math.max(0,S)))),f.push(p[w]*_t),w+1<m&&(v+=(p[w+1]-p[w])*.5*(h[w]+h[w+1]))}const g=2,y=(mi-c[g])/(c[g+1]-c[g]),[M,b]=xf(Je,o,i);return{L:p,xn:d,xe:_,sn:x,sx:f,km:c,rho:h,top:dc,xr:d[g]+(d[g+1]-d[g])*y,xer:_[g]+(_[g+1]-_[g])*y,slant:v,lowL:M,lowXn:b*s+(Je-Na)*Ta,lowXe:b*l}}function Af(e){if(jo>=O[0])return[e.xr,e.xer];const t=(O[0]-jo)/(O[0]-Je);return[e.xn[0]+(e.lowXn-e.xn[0])*t,e.xe[0]+(e.lowXe-e.xe[0])*t]}function vf(e,t,o,a,n=!1,r=_t){if(!(o>0))return[0,0];const i=c0(e,t,o,n,r),s=i.km.length,l=a.level,c=[0,0],h=a.arcY[12],m=a.arcY[13],p=a.arcY[14],d=a.arcY[15],_=a.arcY[Q+12],x=a.arcY[Q+13],f=i.xn.map((z,K)=>oc(z,i.xe[K],a)),v=f.map(z=>z[1]),g=f.map(([z,K])=>sc(z,K,a)),y=f.map(([z],K)=>z-g[K][0]),M=(mi-i.km[2])/(i.km[3]-i.km[2]),b=y[2]+(y[3]-y[2])*M,w=i.sn[2]+(i.sn[3]-i.sn[2])*M,R=Math.floor((b-a.arcY[0])/It-.5),T=yn[l],N=Ja*Ja,S=en*en,L=cn*cn,F=i.sx.map(z=>Math.exp(-.5*(Math.PI*z/Ye)**2)),k=$h(i.xr,i.xer,a),D=(yr*k)**2,I=1/(1+ac*k),Y=i.lowXn-i.xn[0],H=!!a.shape17;for(let z=-1;z<=En-2;z++){const K=R+z,Z=hi(K),W=h+(Z>>>8)/16777216,U=Math.floor(W),oe=W-U,G=fi(Z,m+U&la);if((G&255)>=T)continue;const P=(K+pn+xn*(G>>>8&255)/256)*It,V=G>>>24&1,ee=X*(G>>>25&7)/Pe,ce=[0,1].map(E=>a.arcY[E*Q+1+2*V]*Math.sin(ee)+a.arcY[E*Q+2+2*V]*Math.cos(ee)),Me=b-a.arcY[0]-P-ce[0],_e=C((N-Me*Me)/(N-S));if(!(_e>0))continue;const se=[0,1].map(E=>ui(a.arcY[E*Q]+P+ce[E]-a.arcY[E*Q+9],l,a.fold[10]));if(!(se[0]>0||se[1]>0))continue;const[be,re]=Za(G),ne=hf(G),de=vo((G^2246822507)>>>0,v[1]/Ye,p,_,be,oa),ue=vo((G^2246822507)>>>0,v[3]/Ye,p,_,be,oa),ye=[de,de,de.map((E,q)=>E+(ue[q]-E)*Ac),ue],pe=Bh((G^1291169091)>>>0,[1,2,3].map(E=>v[E]/Ye+be*p),p,_,be,l),bt=[pe[0][0],pe[0][0],pe[1][0],pe[2][0]],$t=(pe[0][1]+pe[1][1]+pe[2][1])/3,Ee=si(G),Et=ye.map((E,q)=>pc*F[q]*(2*E[0]-1)+bt[q]+g[q][1]*Ee[0]-g[q][2]*Ee[1]+g[q][3]*Ee[2]-g[q][4]*Ee[3]),te=[0,1].map(E=>y.map((q,Te)=>q-a.arcY[E*Q]-P-ce[E]-Et[Te]));let ie=0,he=0,fe=0,xe=0,Ue=0,De=0,Lt=0;const Fe=[0,0,0,0];for(let E=0;E+1<s;E++){const q=E===0?ln[0]:0,Te=E+2===s?ln[1]:1,Ut=te[0][E],Ct=te[0][E+1]-Ut,Bt=Ut+Ct*q,io=Ut+Ct*Te,so=Bt*io<=0?0:Math.min(Math.abs(Bt),Math.abs(io)),In=(i.rho[E]+i.rho[E+1])*(i.km[E+1]-i.km[E])/(1+so*so/L),_a=.5+i0/((i.km[E+1]-i.km[E])*(Te-q)),lo=Bt-io,$o=q+(Te-q)*(.5+Math.min(_a,Math.max(-_a,(Bt+io)*lo/(2*(lo*lo+r0**2+so*so))))),da=Math.min(1,Math.max(0,$o)),co=$o,Oe=In;ie+=Oe,he+=Oe*(v[E]+(v[E+1]-v[E])*co),fe+=Oe*(i.L[E]+(i.L[E+1]-i.L[E])*co),xe+=Oe*(i.sn[E]+(i.sn[E+1]-i.sn[E])*co),Lt+=Oe*(i.km[E]+(i.km[E+1]-i.km[E])*co);for(let at=0;at<4;at++)Fe[at]=Fe[at]+Oe*(ye[E][at]+(ye[E+1][at]-ye[E][at])*da);Ue+=Oe*Math.abs(v[E+1]-v[E]),De+=Oe*Math.abs(Ct)}const xt=he/ie,et=fe/ie,le=xe/ie,we=Fe.map(E=>E/ie),Ve=Ue/Math.max(De,.001),Ke=(et*_t)**2+(le*le+un*un)*Ve*Ve,tt=uf(G,l,we[3],bt[2],H),At=Math.sqrt(tt*tt+le*le+D),He=xc[l],Ft=Math.max(0,we[1]-An),Ie=vn*Ft*Ft,ot=jr(G,l)*C(Math.min(oe,1-oe)/sa)*_e*(H?1:Wc[l]),vt=X*((G>>>12^G>>>21)&7)/Pe,qt=X*((G>>>5^G>>>18)&7)/Pe,Kt=[0,1].map(E=>{const q=E*Q;return 1+a.arcY[q+5]*Math.sin(vt)+a.arcY[q+6]*Math.cos(vt)+a.arcY[q+7]*Math.sin(qt)+a.arcY[q+8]*Math.cos(qt)}),Tt=H?vc+gc*tt:Bc+Yc*tt,to=H?w:i.sn[1],gt=Tt*Tt+to*to,oo=(H?Lo:ne[1])+a.fold[13],Co=He+(1-He)*Math.min(ea,Ie);for(let E=0;E<2;E++){const q=H?te[E][2]+(te[E][3]-te[E][2])*M:te[E][1]+ne[2]*Vc*Tt;c[E]=c[E]+se[E]*Kt[E]*ot*(oo*Co*i.slant*tt/Math.sqrt(gt))*Math.exp(-.5*q*q/gt)}const ao=Zc*At+Qc,Oo=Qt+Jt,no=[0,1].flatMap(E=>{const q=te[E];return[q[0]+Y,q[0],q[1],q[2],q[3],q[2]+Oo*(q[3]-q[2])]});if(no.every(E=>E>ao)||no.every(E=>E<-ao))continue;const Ht=Math.exp(-.5*Math.PI*Math.PI*Ke/(ge*ge)),Ce=vo((G^3266489909)>>>0,xt/ge,d,x,re,aa),Nt=a.rayCrest?0:Ht,On=Wr[l]*Nt*(Ce[0]-Ce[1])*(1+uc*$t),kn=He+(1-He)*Math.min(ea,Ie*(1+Br[l]*Nt*(Ce[0]+Ce[2]-1))),ko=xt+Us*Ht*(Ce[0]-Ce[2]),[ro,fa]=af(G,ko,d,x,re,we[2],Ce[3],Ht,a.rayCrest),Pn=ro*I,zn=ot*kn,Po=we[2]*we[2],zo=Qt+Jt*Po,Do=H?0:ff(ne[0],we[1],Ce[1],Nt),ma=Re[2]/Re[1]*(1+_i*Po),Io=Re[1]*Ln,Go=H?0:_f(l,Ce[2],Nt),E0=[0,1].map(E=>mf(E===0&&!H?Do-Ic:Do,E===0?Go:0,ma,zo).map(q=>q*Io)),Dn=Mc[l]*(1+a.fold[11]),L0=Dn/yc,F0=Lh(G,xt,Lt/ie,a),Wt=a.rayCrest?[1,1,1,na,Mi[l]]:of((G^461845907)>>>0,ko,d,x,re,Math.exp(-.5*Fi*Ke),l),T0=H?0:1,N0=Math.min(qr,Math.max(0,1+Gr*Ce[3]-$r)),Di=(E,q)=>{const Te=Math.min(Kr,E*Pn);if(!(Te>0))return 1+Dn*Te/(1-Te*L0);const Ut=Te*(1+Uc*Wt[3]*Te)*q;return 1+Dn*Ut/Math.sqrt(1+(Ut/Sc)**2)};for(let E=0;E<2;E++){const q=te[E].map(Ot=>Ot-On),Te=(Ot,Ki)=>{const C0=q[Ot]+(q[Ot+1]-q[Ot])*Ki;return Jn(q[Ot],C0,(i.L[Ot+1]-i.L[Ot])*Ki,At)},[,Ut]=Jn(q[0]+Y,q[0],i.L[0]-i.lowL,At),Ct=E0[E],[Bt,io]=Te(0,1),[so,In]=Te(1,1),[_a]=Te(2,zo),lo=Ct[0]*(Ut+Bt),$o=Ct[1]*(io+so),da=Ct[2]*(In+_a),co=lo+$o+da,Oe=Di(1,Wt[0]),at=Oe>1?(Oe-1)*Wt[4]/Wt[0]*T0*(E===1?bc:1):0,Ii=Math.min(1,Math.max(Ec,fa*Wt[4]/(Math.max(Wt[2],.001)*mt[1]))),U0=at>0?Jn(q[0]+Y*Ii,q[0],(i.L[0]-i.lowL)*Ii,At)[1]:0;let Gi=lo*(Oe<1?Oe:1)+Ct[1]*(U0+Bt)*at+$o*Oe+da*Di(N0,Wt[1]);const $i=co/(Io*ic),qi=$i*$i;Gi/=Math.sqrt(Math.sqrt(1+qi*qi)),c[E]=c[E]+se[E]*Kt[E]*zn*(1-oo)*tt*Rr*Gi*(1+F0*(E===1?oi:1))}}for(let z=0;z<2;z++){const K=c[z]/(rc*i.slant),Z=K*K;c[z]=c[z]/Math.sqrt(Math.sqrt(1+Z*Z))}return c[0]*=1+a.arcY[10],c[1]*=1+a.arcY[Q+10],c}function er(e,t,o,a,n,r,i=!1,s=_t){if(!(o>0))return 0;if(a===0){const S=c0(e,t,o,i,s);let L=0;for(const D of S.xn)L+=mc(D,r.level);const[F,k]=Af(S);return vf(e,t,o,r,i,s)[n===1?1:0]+S.slant*fc(F,k,n,r,L/S.xn.length)}const l=qe,c=Math.sqrt(e*e+t*t),h=i?Ca:Ua,m=i?Cr:Ur,p=(i?ka:Oa)[a],d=c>1e-9?t/c:1,_=c>1e-9?e/c:0,x=[0,0,0],f=[0,0,0];for(let S=0;S<p;S++){const L=h[a*3+S];x[S]=-l*o+Math.sqrt(l*l*o*o+2*l*L+L*L),f[S]=l*Math.atan2(x[S]*c,l+x[S]*o)}const v=p===3?f[1]:p===2?.5*(f[0]+f[1]):f[0],[g,y]=oc(v*d,v*_,r),M=sc(g,y,r),b=g-M[0]-v*d,w=y-v*_,R=M.slice(1);let T=0;const N=a===1&&n===2?[]:null;for(let S=0;S<p;S++){const L=h[a*3+S],F=x[S],k=_c(o,L),D=(i?Vs:Ys)[a*3+S],I=d*d*(k*k-1),Y=F*_t,H=Math.sqrt((F*s)**2*(1+I)+D*D*I),z=Math.min(Sn,H),K=Xs*Math.sqrt(ur*ur+z*z)/Math.max(Math.abs(d),.05),Z=v+Math.min(K,Math.max(-K,f[S]-v)),W=Z*d+(L-Na)*Ta,U=Z*_,oe=n>=2?df(L):null,G=oe?[oe[0],oe[1]*Math.exp(-.5*Fi*Y*Y)]:void 0,P=(i?ks:Os)[a*3+S];N?N.push({xn:W+b,xe:U+w,sx:Y,sn:H,top:P,w:m[a*3+S]*k,red:G}):T+=m[a*3+S]*k*Xh(W+b,U+w,n,r,Y,H,P,R,G)}return N?Vh(N,r,R):T}function tr(e,t,o,a,n,r,i,s,l,c,h=!1,m=h?_t:ti){return o>0?Rf(e,t,o,a,n,ec(r,c.level,h),i,c,h,m)[s?2:l===1?1:0]:0}function Ko(e,t,o){const a=e/t,n=Math.floor(a),r=a-n,i=Vt/t,s=x=>j((x%i+i)%i*65536+o>>>0),l=s(n),c=s(n+1),h=r*r*(3-2*r),m=(l&255)*(2/255)-1,p=(c&255)*(2/255)-1,d=(l>>>8&255)*(3/255)-1.5,_=(c>>>8&255)*(3/255)-1.5;return m+(p-m)*h+r*(1-r)*((1-r)*d-r*_)}function Ho(e,t){const o=1.6*e/t,a=1+o*o;return 1/(a*a)}function gf(e,t,o,a,n,r,i,s,l,c,h=0,m=0,p=1,d=0){const _=El,x=Ll,f=e-r,v=Ko(f+19.7,_[0],l+11),g=Ko(f-51.3,_[1],l+61),y=Ko(f+6.7,_[2],l+131),M=Ho(o,_[0]),b=Ho(o,_[1]),w=Ho(o,_[2]),R=x[0]*M*v+x[1]*b*g+x[2]*w*y,T=x[0]**2*(1-M*M)+x[1]**2*(1-b*b)+x[2]**2*(1-w*w),N=Math.exp(Ya*R+.5*Ya**2*kl*T),S=C(.48+.43*R),L=176-36*S+6*g*b,F=bn+8-16*S,k=h-Ao[2]*S+qa[0]*g*b+qa[1]*y*w,D=p*(1-Tl*m),I=(49+61*C(.5+.42*g*b+.28*R))*c*(1-Ba[0]*D),Y=t-L,H=t-F,z=Math.max(0,Y),K=C(z/105),Z=m*C((t-k-14)/58),W=Ho(o,_[3]),U=Ho(o,_[4]);let oe=0,G=0,P=1,V=0;if(W>.003){const At=e-n+Fl*y,He=Ko(At+2.4,_[3],l+193),Ft=U>.003?Ko(At-1.1,_[4],l+269):0,Ie=U/W*Ft,ot=x[3]*He+x[4]*(1+Ul*Z)*Ie,vt=C(.6+.53*R);G=(vt+Z*(.66-.76*vt))*C((W-.003)/.018)*W,oe=G*C((ot+.16-.28*K)/1.02);const[Kt,Tt,to]=Ra,gt=Kt*W*He+Tt*U*Ft;if(P+=to*Z*gt/Math.sqrt(1+gt*gt),d>0){const[oo,Co,ao,Oo,no,Ht]=Yt,Ce=oo+Co*He/Math.sqrt(1+He*He),Nt=ao+Oo*Ie/Math.sqrt(.22+Ie*Ie);V=no*W/(W+Ht)*Ce*Nt*C((W-.003)/.018)}}const ee=i+.37*v+.29*g+l/601,ce=ee-Math.floor(ee),Me=C(Math.min(ce-Gl,1-ce)/$l),_e=C(Math.min(ce,Dl-ce)/Il),se=Math.cos(X*(s+.32*v+l/911)),be=Math.exp(-z*z/((z+25)*I)-.5*Math.min(0,Y)**2/((25+7*S)**2+a*a)),re=Y+23+m*(L-23-k),ne=17+7*S+5*C(re/35),de=ne+m*(14+4*S-ne),ue=Math.hypot(de,a),ye=(re/ue)**2,pe=Math.exp(-.5*ye),[bt,$t]=pr,[Ee,Et]=Sa,te=1-C((ye-Ee)/(Et-Ee)),ie=pe*(1+Ml*m),he=re>0?ie+$t*m*te*(P/(1+bt*ye)-pe):ie,fe=de/ue*he,xe=C((R+.22+.5*g*b+.35*y*w)*.95),Ue=.12+1.85*xe,De=21*xe*C((k-85)/45),Lt=(39+54*C((125-k)/35))*xe,Fe=(36+14*S)*(1-Ba[1]*D),xt=Math.exp(-Math.max(0,H)/Fe-.5*Math.min(0,H)**2/(16**2+a*a)),et=Math.max(0,t-k-23)*(1-Nl*m)/(51+27*S),le=1-m*(1-1/(1+et*(1+.5*et))),we=1+.32*m*oe,Ve=P/(1+Cl*Z*Math.max(0,R)),Ke=((.25-.16*m)*(1-.8*G)+1.03*oe*le+.12*(1-p))*Ve,tt=(.72-.62*G+1.43*oe*le+.12*(1-p))*Ve;return[N*(.74+.26*Me)*(1+.07*se)*(fe*we*(Ue+m*(De-Ue))+be*Ke),N*(.61+.39*_e)*(1+.21*se)*(xt*tt+m*Lt*fe*we),V]}function Mf(e,t,o,a,n,r,i=0,s=0,l=1,c=0){const h=r.pillar;return gf(t,o,a,n,(Pl[e]??0)*h[0],(zl[e]??0)*h[2],h[4],h[6],1347+977*e,ul[r.level]??1,i,s,l,c)}function yf(e,t,o){const a=t-Math.max(0,o)/2,n=Vt,r=s=>s*a-n*Math.round(s*a/n),i=s=>a/s-Math.floor(a/s);e[0]=r(vh),e[2]=r(gh),e[4]=i(Mh),e[6]=i(yh)}function wf(e,t,o,a,n){const r=e+n*o,i=t*t*(.5/po),s=r*r-4*i*a;if(!(s>0))return null;const l=Math.sqrt(s),c=r+l,h=a>0&&c>0?2*a/c:0,m=a<0&&r<0?2*a/(r-l):c>0&&c<2*i*Ga?c/(2*i):0;return[h,m,s]}function Sf(e,t,o,a){if(!(e>0&&e<Ga))return null;const n=qe,r=e*e+2*n*e*o,i=r/(Math.sqrt(r+n*n)+n);return i>Ia&&i<bo?[e,i,e*t,a]:null}function Rf(e,t,o,a,n,r,i,s,l=!1,c=l?_t:ti,h=c){if(!(o>0))return[0,0,0];const m=e*a+t*n,p=e*n-t*a,d=qe,_=.5/po,x=l?Ca:Ua,f=l?Cr:Ur,v=l?ka:Oa,g=r[0],y=r[1],M=r[2],b=d*o,w=[0,0];for(const[te,ie]of[[2,1],[0,0]])for(let he=0;he<v[te];he++){const fe=x[te*3+he],xe=(2*d*fe+fe*fe)/(b+Math.sqrt(b*b+2*d*fe+fe*fe)),Ue=xe*(m+M*o)-(xe*p)**2*_,De=C((Ue-g)/mo[0]+mr)*C((y-Ue)/mo[1]+.5);De>0&&(w[ie]=w[ie]+f[te*3+he]*_c(o,fe)*De)}let R=0,T=0,N=0,S=0,L=0,F=0;const k=l?cl:Rn,D=p+Da*o,I=r[3],[Y,H,z,K]=gl,Z=s.level===1?C((I-Y)/(H-Y))*C((K-I)/(K-z)):0,[W,U,oe]=yl,G=Ao[0]+Ao[1]*(Math.min(z,Math.max(H,I))-H)-Ka[1]*Math.max(0,Math.min(z,I)-Ka[0])-oe*C((W-I)/U),P=_o[0]+Z*(Ha[0]-_o[0]),V=_o[1]+Z*(Ha[1]-_o[1]),ee=r[5],[ce,Me,_e,se,be]=xl,re=(1-se*ee)*C((ce-I)/Me),ne=c*(1+_e*re),de=be*re,ue=1/Math.sqrt(Math.max(.05,1-p*p)),[ye,pe,bt,$t]=pl;for(let te=0;te<k;te++){const ie=r[6+3*te],he=r[7+3*te],fe=r[8+3*te],xe=l?2*te:te,Ue=wf(m,D,o,ie,he);if(!Ue)continue;const[De,Lt,Fe]=Ue,xt=Math.sqrt(Fe),et=1/Math.sqrt(Fe+_l**2),le=C(Fe/$a**2),we=le*et,Ve=dl*et,Ke=ee*C(-ie/ye)*le,tt=Ve*(1-pe*Ke),At=Math.abs(D)/Math.max(xt,$a);for(const He of[De,Lt]){const Ft=Sf(He,D,o,Fe);if(!Ft)continue;const[Ie,ot,vt]=Ft,qt=vt/po,Kt=he-Da*qt,Tt=Math.sqrt(1+Kt*Kt+qt*qt),to=C((ot-Ia)/hl)*C((bo-ot)/fl),gt=we*to*Tt,oo=Ie*ne*(ue+At*Tt),Co=Math.hypot(oo,D*tt,de),ao=Math.hypot(Ie*h,(d*o+Ie)/(d+ot)*Ve),[Oo,no,Ht]=Mf(xe,vt,ot,Co,ao,s,G,Z,1-ee,Ke),[Ce,Nt,On]=Al,kn=1-On*ee*C((Ce-Ie)/Nt),ko=fe*kn,ro=ko*(1-(1-bt)*Ke*(1-Ht)),fa=C((Rl-Ie)/bl),Pn=P+fa*(Wa[0]-P),zn=V+fa*(Wa[1]-V),Po=ts(gt*wl*i*Oo,Pn),zo=ts(gt*Sl*i*no,zn),Do=Uh(xe,vt,ot,s),ma=zo*(1+Do),Io=zo*(1+oi*Do);if(R+=ro*ma,T+=ro*Io,N+=ro*Po,Ke>0){const Go=ko-ro;S+=Go*ma,L+=Go*Io,F+=Go*Po}}}if(ee>0){const te=(ie,he)=>1+ee*(1/Math.sqrt(1+(ie/he)**2)-1);R*=te(R+S,xo[1]),T*=te(T+L,xo[1]),N*=te(N+F,xo[0])}if(l){const[te,ie,he,fe]=vl,xe=1-he*C((te-I)/ie)*(1-fe*ee);R*=xe,T*=xe,N*=xe}const Ee=(1+Z*(Ol-1))*(1-$t*ee*C(-m/.6)),Et=Ee*dr*w[0];return[R+Et,T+Et,N+Ee*ml*w[1]]}const hs=Math.PI/180,Ae={size:256,lattice:8,octaves:4,seed:1592639757,weights:[.7,.3],contrast:.8,baseKm:3,tileKm:[160,32],windKmS:[.008,.006],sinFloor:.05,tileDeg:[40,8],driftDegS:[.05,.03]};function bf(e){let t=e>>>0;return t=(t^t>>>16)>>>0,t=Math.imul(t,2146121005)>>>0,t=(t^t>>>15)>>>0,t=Math.imul(t,2221713035)>>>0,(t^t>>>16)>>>0}const va=(e,t,o,a)=>{const n=(t%a+a)%a,r=(o%a+a)%a;return(bf(Ae.seed^Math.imul(e+1,2654435761)^Math.imul(n+1,2246822507)^Math.imul(r+1,3266489909))>>>8)/16777216},fs=e=>e*e*(3-2*e);let or=null;function Ti(){if(or)return or;const e=Ae.size,t=new Uint8Array(e*e);let o=0;for(let a=0;a<Ae.octaves;a++)o+=.5**a;for(let a=0;a<e;a++)for(let n=0;n<e;n++){let r=0;for(let i=0;i<Ae.octaves;i++){const s=Ae.lattice<<i,l=(n+.5)/e*s,c=(a+.5)/e*s,h=Math.floor(l),m=Math.floor(c),p=fs(l-h),d=fs(c-m),_=va(i,h,m,s),x=va(i,h+1,m,s),f=va(i,h,m+1,s),v=va(i,h+1,m+1,s);r+=.5**i*((_*(1-p)+x*p)*(1-d)+(f*(1-p)+v*p)*d)}t[a*e+n]=Math.round(255*Math.min(1,Math.max(0,r/o)))}return or=t,t}let ar=-1;function u0(){if(ar<0){const e=Ti();let t=0;for(let o=0;o<e.length;o++)t+=e[o];ar=t/e.length/255}return ar}function hn(e,t){const o=Ti(),a=Ae.size,n=e*a-.5,r=t*a-.5,i=Math.floor(n),s=Math.floor(r),l=n-i,c=r-s,h=(m,p)=>o[(p%a+a)%a*a+(m%a+a)%a]/255;return(h(i,s)*(1-l)+h(i+1,s)*l)*(1-c)+(h(i,s+1)*(1-l)+h(i+1,s+1)*l)*c}const kt=e=>e-Math.floor(e);function Ni(e){const t=Number.isFinite(e)?e:0,o=Ae;return{horizon:[kt(o.windKmS[0]*t/o.tileKm[0]),kt(o.windKmS[1]*t/o.tileKm[0]),kt(o.windKmS[0]*t/o.tileKm[1]),kt(o.windKmS[1]*t/o.tileKm[1])],sky:[kt(o.driftDegS[0]*t/o.tileDeg[0]),kt(o.driftDegS[1]*t/o.tileDeg[0]),kt(o.driftDegS[0]*t/o.tileDeg[1]),kt(o.driftDegS[1]*t/o.tileDeg[1])]}}const h0=e=>Math.max(0,1+Ae.contrast*(e-u0())/.5);function Ef(e,t,o,a){if(!(o>0))return{factor:0,airmass:1};const n=Ae,r=Math.max(o,n.sinFloor),i=n.baseKm/r,s=Ni(a).horizon,l=e*i,c=t*i,h=n.weights[0]*hn(l/n.tileKm[0]-s[0],c/n.tileKm[0]-s[1])+n.weights[1]*hn(l/n.tileKm[1]-s[2],c/n.tileKm[1]-s[3]);return{factor:h0(h),airmass:1/r}}function Lf(e,t,o,a){const n=Ae,r=Ni(a).sky,i=e*e*e*e,s=t*t*t*t,l=o*o*o*o,c=i+s+l,h=(p,d)=>{const _=p/hs,x=d/hs;return n.weights[0]*hn(_/n.tileDeg[0]-r[0],x/n.tileDeg[0]-r[1])+n.weights[1]*hn(_/n.tileDeg[1]-r[2],x/n.tileDeg[1]-r[3])},m=(l*h(e,t)+i*h(t,o)+s*h(o,e))/(c>0?c:1);return{factor:h0(m),airmass:1}}function Ff(e,t=!1){const o=new URLSearchParams(e??"");if(t)for(const c of["tour","eyecal","news","ach"])o.has(c)||o.set(c,"0");if(t)for(const c of["meteors","aurora"])o.has(c)||o.set(c,"0");const a=o.get("lang"),n=o.get("warp"),r=o.get("skyCheck"),i=Number(o.get("zoneCurtainDebug")??0),s=o.get("zoneSeed"),l=s===null||s.trim()===""?NaN:Number(s);return{hasLocation:e!==null,lang:a==="zh"||a==="en"?a:null,noGl:o.has("nogl"),crashTest:o.has("crashtest"),devHooks:o.get("sky")==="free"||r==="1",skyCheck:r==="1",skyCheckValue:r,verify:o.has("verify"),verifyQuick:o.get("verify")==="quick",tour:o.get("tour"),ach:o.get("ach"),news:o.get("news"),eyecal:o.get("eyecal"),intro:o.has("intro"),adapt:o.get("adapt")==="1",warp:n==="1"?1:n==="2"?2:n==="3"?3:null,zoomPitch:o.get("zoomPitch"),deepStars:o.get("deepStars"),starSubtract:o.get("starSubtract")==="1",installSheet:o.get("installSheet")==="1",continuousHighlight:o.get("continuousHighlight")!=="0",shaderFail:o.get("shaderFail"),spotPairOff:o.get("spotPair")==="0",probeFault:o.get("probeFault"),meteors:o.get("meteors"),aurora:o.get("aurora"),decodeWorkers:o.get("decodeWorkers")==="1"?1:o.get("decodeWorkers")==="2"?2:null,zoneCurtain:o.get("zoneCurtain")==="1"||i>0,zoneCurtainDebug:Number.isFinite(i)&&i>0?i:0,zoneSeed:Number.isInteger(l)?l>>>0:null,search:e??""}}const Tf=e=>!1,Nf=typeof location>"u"?null:location.search??"",ms=Ff(Nf,Tf()),f0={bench:"iit-eyepiece-bench",deskMenus:"iit-desk-menus",deskCards:"iit-desk-cards-v1",quality:"iit-eyepiece-quality",warp:"iit-eyepiece-warp",eyeGamma:"iit-eye-gamma",eyeGammaAsked:"iit-eye-gamma-asked",eyeVision:"iit-eye-vision-v1",tubeVision:"iit-tube-vision-v1",eyeEv:"iit-eye-ev",starShapeEye:"iit-star-shape",starShapeTube:"iit-star-shape-tube",telescopeAperture:"iit-telescope-aperture",observerOptics:"iit-observer-optics",advancedGroups:"iit-eyepiece-advanced",dragHint:"iit-eyepiece-drag-hint",tourSeen:"iit-onboarding-seen-v3",tourSeenV2:"iit-onboarding-seen-v2",tourSeenV1:"iit-onboarding-seen-v1",skyAssist:"iit-sky-assist-v1",horizon:"iit-horizon",arLocation:"iit-ar-location",arIntroSeen:"iit-ar-intro-seen",fullLens:"iit-full-lens",debugMode:"iit-debug-mode-v1",installHint:"iit-install-hint",installSheet:"iit-install-sheet",myTube:"iit-my-tube",achievements:"iit-achievements",theme:"iit-theme-v1",themeRedView:"iit-theme-red-view-v1",themeMotion:"iit-theme-motion-v1",lang:"iit-lang",offlineAll:"iit-offline-all",offlineOnInstall:"iit-offline-on-install",storageRecord:"iit-storage-record",errorLog:"iit-error-log",visits:"iit-visits",seenVersion:"iit-seen-version",swAutoUpdate:"iit-sw-auto-update",inAppHint:"iit-inapp-hint"},B=(e,t,o,a="local")=>({name:e,key:f0[e],storage:a,feature:t,clear:o}),Uf=[B("bench","filter workbench: tab, comparison, sliders",!0),B("deskMenus","desktop: which floating cards are open",!0),B("deskCards","desktop: where the floating cards were dragged",!0),B("quality","picture quality choice",!0),B("warp","frame interpolation choice",!0),B("eyeGamma","naked eye: calibrated screen gamma",!0),B("eyeGammaAsked","naked eye: the calibration was offered",!0),B("eyeVision","naked eye: visual model tuning (D181)",!0),B("tubeVision","tube screen: visual model tuning (D183)",!0),B("eyeEv","naked eye: debug display EV (D179)",!0),B("starShapeEye","star reshaping strength, naked eye",!0),B("starShapeTube","star reshaping strength, tube",!0),B("telescopeAperture","aperture of the telescope last taken off (D120)",!0),B("observerOptics","optics kept across observer switches (D121)",!0),B("advancedGroups",'which "advanced" groups are unfolded',!0),B("dragHint","the eyepiece drag hint was seen",!0),B("tourSeen","guide version last shown",!0),B("tourSeenV2","guide seen (before 1.1.0)",!0),B("tourSeenV1","guide seen (0.9.x)",!0),B("skyAssist","sky overlays: switches and sliders",!0),B("horizon","horizon mode: typed latitude, landscape",!0),B("arLocation","AR / horizon: last position (0.01 deg)",!0),B("arIntroSeen","AR mode: introduction seen",!0),B("fullLens","full screen: the wide lens picked there (16 mm by default)",!0),B("debugMode","debug mode switch",!0),B("installHint","install hint dismissed for good",!0),B("installSheet","install sheet: times shown, snooze",!0),B("myTube","my tube (the user's own parameters; reset in the tube panel)",!1),B("achievements","achievements, visited targets, share flag (reset in the achievements drawer)",!1),B("theme","theme choice",!1),B("themeRedView","theme: red view",!1),B("themeMotion","theme: background motion",!1),B("lang","interface language",!1),B("offlineAll","offline: keep all data",!1),B("offlineOnInstall","offline: download when installed",!1),B("storageRecord","offline: storage diagnostics",!1),B("errorLog","local error log (cleared in the settings)",!1),B("visits","visit count (install prompt timing)",!1),B("seenVersion","release notes: version last seen",!1),B("swAutoUpdate","automatic update switch throttle",!1,"session"),B("inAppHint","in-app browser hint closed",!1,"session")],Cf=new Set(Uf.filter(e=>e.storage==="session").map(e=>e.name)),Of=e=>Cf.has(e)?sessionStorage:localStorage,kf=e=>Of(e).getItem(f0[e]);function Pf(){if(ms.lang)return ms.lang;try{const e=kf("lang");if(e==="zh"||e==="en")return e}catch{}return navigator.webdriver||/^zh\b/i.test(navigator.language||"")?"zh":"en"}const zf=typeof window>"u"?"zh":Pf();let Df={};function A(e,t){let o=e;if(zf==="en"){const n=Df[e];n!==void 0&&(o=n)}if(!t)return o;const a=t;return o.replace(/\{(\w+)\}/g,(n,r)=>r in a?String(a[r]):n)}const nr=["veil","north-america","butterfly","crescent"];A("M42 猎户星云"),A("北天 NSNS"),A("马头与火焰星云"),A("马头"),A("北天 NSNS"),A("M27 哑铃星云"),A("北天 NSNS"),A("NGC 2237 玫瑰星云"),A("玫瑰"),A("北天 NSNS"),A("M31 仙女座星系"),A("北天 NSNS 连续谱"),A("M8 礁湖星云"),A("南天 SHASSA + VPHAS+"),A("M16 鹰状星云"),A("NSNS + VPHAS+ 核心"),A("NGC 7293 上帝之眼"),A("上帝之眼"),A("南天 SHASSA + DSS2"),A("NGC 3372 船底座大星云"),A("船底座"),A("南天 SHASSA + VPHAS+"),A("心脏／灵魂星云"),A("心脏／灵魂"),A("NSNS · Gaia G<16（外圈 G<14.5 按需）"),A("英仙座双星团"),A("双星团"),A("NGC 869 / 884 · Gaia G<17"),A("NGC 7000 北美洲星云"),A("北美洲星云"),A("NSNS 三线 · 可拖到面纱、新月、蝴蝶"),A("北美／鹈鹕、面纱、蝴蝶 IC 1318、新月四块 Hα／OIII／SII 精细层：先载入望远镜附近的一块，拖向别处时再补载，到达前那里先显示较粗的公共细节层。局部星表补到 Gaia G<16；区域之外拖出时补到 G<14.5。"),A("NGC 6888 新月星云"),A("新月"),A("NSNS 三线精细层"),A("北美／鹈鹕、面纱、蝴蝶 IC 1318、新月四块 Hα／OIII／SII 精细层：先载入望远镜附近的一块，拖向别处时再补载，到达前那里先显示较粗的公共细节层。局部星表补到 Gaia G<16；区域之外拖出时补到 G<14.5。"),A("面纱星云 · 天鹅座环"),A("面纱"),A("NSNS 三线精细层"),A("北美／鹈鹕、面纱、蝴蝶 IC 1318、新月四块 Hα／OIII／SII 精细层：先载入望远镜附近的一块，拖向别处时再补载，到达前那里先显示较粗的公共细节层。局部星表补到 Gaia G<16；区域之外拖出时补到 G<14.5。"),A("象鼻星云 IC 1396"),A("象鼻"),A("NSNS 三线 · Gaia G<16（外圈 G<14.5 按需）"),A("加州星云 NGC 1499"),A("加州"),A("NSNS 三线 · Gaia G<16（外圈 G<14.5 按需）"),A("飞蝠星云 Sh2-129 · 乌贼 Ou4"),A("飞蝠／乌贼"),A("NSNS 三线 · Gaia G<16（外圈 G<14.5 按需）"),A("西门子 147 · Sh2-240"),A("西门子 147"),A("NSNS 三线 · Gaia G<16（外圈 G<14.5 按需）"),A("火焰星 IC 405 · 蝌蚪 IC 410"),A("火焰星／蝌蚪"),A("NSNS 三线 · Gaia G<16（外圈 G<14.5 按需）"),A("气泡星云 NGC 7635 · M52"),A("气泡"),A("NSNS 三线 · Gaia G<16"),A("洞穴星云 Sh2-155"),A("洞穴"),A("NSNS 三线 · Gaia G<16"),A("水母星云 IC 443"),A("水母"),A("NSNS 三线 · Gaia G<16"),A("圣诞树／锥状星云 NGC 2264"),A("圣诞树"),A("NSNS 三线 · Gaia G<16"),A("吃豆人星云 NGC 281"),A("吃豆人"),A("NSNS 三线 · Gaia G<16"),A("半人马 ω 球状星团"),A("半人马 ω"),A("Gaia G<{0} · 核心光按模型",[18]),A("杜鹃座 47 球状星团"),A("杜鹃 47"),A("Gaia G<{0} · 核心光按模型",[18]),A("M22 人马座球状星团"),A("Gaia G<{0} · 核心光按模型",[16.5]),A("M13 武仙座球状星团"),A("Gaia G<{0} · 核心光按模型",[18]),A("M4 天蝎座球状星团"),A("Gaia G<{0} · 核心光按模型",[18]),A("M5 巨蛇座球状星团"),A("Gaia G<{0} · 核心光按模型",[18]),A("NGC 6752 孔雀座球状星团"),A("Gaia G<{0} · 核心光按模型",[18]),A("NGC 6397 天坛座球状星团"),A("Gaia G<{0} · 核心光按模型",[18]),A("M33 三角座星系"),A("NSNS · Pan-STARRS g · Gaia G<{0}",[19]),A("M51 涡状星系"),A("NSNS · Pan-STARRS g · Gaia G<{0}",[19]),A("M81 波德星系 · M82 雪茄星系"),A("M81／M82"),A("NSNS · Pan-STARRS g · Gaia G<{0}",[19]),A("M101 风车星系"),A("NSNS · Pan-STARRS g · Gaia G<{0}",[19]),A("狮子座三重奏 M65 · M66 · NGC 3628"),A("狮子座三重奏"),A("NSNS · Pan-STARRS g · Gaia G<{0}",[19]),A("海鸥星云 IC 2177"),A("海鸥星云"),A("NSNS · Gaia G<16（外圈 G<14.5 按需）"),A("M1 蟹状星云"),A("蟹状星云"),A("NSNS 三线 + PS1 形态 · Gaia G<17"),A("M45 昴星团"),A("昴星团"),A("NSNS · Pan-STARRS g · Gaia G<{0}",[17]),A("M104 草帽星系"),A("草帽星系"),A("NSNS 连续谱 + PS1 形态 · Gaia G<19"),A("猎户座 · 巴纳德环"),A("巴纳德环"),A("天鹅座"),A("天鹅座"),A("仙王—仙后"),A("仙王—仙后"),A("英仙—御夫"),A("英仙—御夫"),A("银心"),A("银心"),A("甘姆星云 · 船底座"),A("甘姆"),A("大麦哲伦云"),A("大麦哲伦云");A("普通二代"),A("红拓二代"),A("经典美三"),A("蓝延伸三代"),A("定制版三代");A("双窄"),A("红外通过"),A("无滤镜");class Fn extends Map{constructor(t){super(),this.limit=t}limit;get(t){const o=super.get(t);return o!==void 0&&(super.delete(t),super.set(t,o)),o}set(t,o){for(super.delete(t),super.set(t,o);this.size>this.limit;)super.delete(this.keys().next().value);return this}}A("前置（物镜前）"),A("后置（物镜后）"),A("减焦镜前"),A("目镜入光端"),A("目镜与夜视物镜之间"),A("夜视物镜后");Array.from({length:161},(e,t)=>300+5*t);new Fn(16);new Fn(16);new Fn(64);new Fn(4);const If={trains:{phases:[{id:"afterglow",tauS:1,share:.85},{id:"recombination",tauS:14,share:.13},{id:"continuum",tauS:120,share:.02}],startMagBelowPeak:6}};var Gf={kinematics:If};const $f=Gf,qf=$f,m0=4,je=360*m0,Se=46,Kf=Math.PI/180;function fn(e,t){const o=Math.max(2,e),a=Math.cos(o*Kf);return t.rayleigh*(1.06+a*a)+t.mie*10**(.79-o/40)}function Hf(e,t=.25){const o=new Float32Array((2+e)*Se*4);for(let a=0;a<2+e;a++)for(let n=0;n<Se;n++){const r=4*(a*Se+n);a===0?o.set([1,1,1,1],r):o[r]=1,a===1&&(o[r+1]=t)}return{rows:o,tNodes:e,groundRatio:t}}const Wf=(e=0)=>new Float32Array(je).fill(Math.sin(e*Math.PI/180));function Bf(e,t){const o=3+e.tNodes,a=new Float32Array(je*o*4);for(let n=0;n<2+e.tNodes;n++)a.set(e.rows.subarray(4*n*Se,4*(n+1)*Se),4*n*je);a[4*je+1]=e.groundRatio;for(let n=0;n<je;n++)a[4*((2+e.tNodes)*je+n)]=t[n];return{width:je,height:o,data:a}}function mn(e,t,o){const a=i=>i[0]*o[0]+i[1]*o[1]+i[2]*o[2],n=a(t.zenith),r=Math.atan2(a(t.east),a(t.north))*180/Math.PI;return n<Yf(e,r)?{ground:!0,x:0}:{ground:!1,x:_0(n)}}function _0(e){return Math.sqrt(Math.asin(Math.min(1,Math.max(0,e)))*2/Math.PI)*(Se-1)}function Yf(e,t){const o=(t%360+360)%360*m0,a=Math.min(Math.floor(o),je-1),n=a===je-1?0:a+1;return e[a]*(1-(o-a))+e[n]*(o-a)}const Vf=Math.PI/180,dt={g:.75,twoStreamK:.75,rayleighTau550:.0965},Ui=e=>Math.max(0,e.tau)*Math.min(1,Math.max(0,e.cover)),d0=e=>Math.min(.99,Math.max(0,e.g??dt.g)),Xf=e=>e?1/(1+dt.twoStreamK*(1-d0(e))*Ui(e)):1,jf=e=>e?Math.exp(-Ui(e)):1;function Zf(e,t){const o=Math.cos(e*Vf);return(1-t*t)/(1+t*t-2*t*o)**1.5}function Qf(e,t,o={rayleigh:1,mie:1}){if(!e)return 0;const a=Ui(e);if(!(a>0))return 0;const n=Math.max(2,t);return a*Zf(n,d0(e))/(.75*dt.rayleighTau550*fn(n,o))}const _n=Math.PI/180;function ra(e,t,o){const a=e.originMm[0]+t*e.pitchMm,n=e.originMm[1]+o*e.pitchMm;if(Math.hypot(a,n)>e.cathodeR)return null;const r=[a/e.focalMm,n/e.focalMm,1],i=e.point,s=[0,1,2].map(p=>i[p]*r[0]+i[3+p]*r[1]+i[6+p]*r[2]);if(!(s[2]>1e-6))return null;const l=s[0]/s[2],c=s[1]/s[2],h=[0,1,2].map(p=>e.axis[p]+l*e.west[p]+c*e.north[p]),m=Math.hypot(h[0],h[1],h[2]);return[h[0]/m,h[1]/m,h[2]/m]}function Jf(e,t,o,a){if(e.mode==="horizon"){if(!o||a)return 0;const n=Ef(o[0],o[1],o[2],e.timeS);return Math.max(0,e.tau)*n.factor*n.airmass}return Math.max(0,e.tau)*Lf(t[0],t[1],t[2],e.timeS).factor}const e1=(e,t)=>t===void 0?{tau:e,cover:1}:{tau:e,cover:1,g:t};function t1(e,t,o){return 1}const Ci=1,Oi=1,o1=64;function p0(e){const t=Hh(e.timeS,e.windowS,e.level??wn);if(e.still&&(t.fold[17]=0),e.detail==="lite")for(let o=0;o<nt;o++){for(let a=Ci;a<it;a++)t.ray[(o*it+a)*2]=0;for(let a=0;a<Xt;a++)for(let n=Oi;n<ht;n++)t.patch[((o*Xt+a)*ht+n)*2]=0}return t}const a1=(e,t,o)=>e*e*.001*2**-o/(1-t);function x0(e){const t=a1(e.pitchMm,e.haloShare,e.scaleExp),o=e.scene==="low-latitude-red";return Jo.map(a=>{const n=o?Kh(e.elapsedS):1;return(e.rates[a]??0)*(e.kR[a]??0)*n*t})}function n1(e,t,o){if(!e)return 1;const a=Math.floor(o),n=Math.min(a+1,Se-1);return e[t*Se+a]*(1-(o-a))+e[t*Se+n]*(o-a)}function r1(e,t,o,a,n){const r=e.detail==="lite";if(e.scene==="auroral-zone")return[er(o,a,n,0,0,t,r),er(o,a,n,0,1,t,r),er(o,a,n,1,2,t,r)];const i=Fr(e.elapsedS),s=e.facingAzDeg*_n,l=Math.sin(s),c=Math.cos(s),h=i.edgeElevationDeg,m=i.pillars;return[tr(o,a,n,l,c,h,m,!1,0,t,r),tr(o,a,n,l,c,h,m,!1,1,t,r),tr(o,a,n,l,c,h,m,!0,2,t,r)]}function i1(e,t,o,a,n,r,i=0){const s=a[2];if(n||!(s>0))return 0;const l=r1(e,t,a[0],a[1],s),c=Math.min(Se-1,Math.max(0,_0(s)+i));let h=0;return Jo.forEach((m,p)=>{h+=o[p]*l[tc(m)]*n1(e.extinction,p,c)}),e.cloud?h*t1(r,e.cloud.g):h}function s1(e,t,o,a){const n=e1(o,e.cloud.g),r=Xf(n),i=jf(n),s=t.offAxis??1;let l=0;if(e.moon&&o>0){const c=Math.acos(Math.min(1,Math.max(-1,a)))/_n;l=e.moon.viewRate*fn(c,e.moon.weights)/fn(e.moon.viewAngleDeg,e.moon.weights)*Qf(n,c,e.moon.weights)}return(t.rate+t.light)*i+(r-i)*(t.sky+t.mask*s*(t.veil+(t.halo??0)))+t.mask*s*((1-r)*e.cityRate+l)}function l1(e){let t=0,o=0,a=0,n=0;for(const r of e)t+=r.rate-r.sky-(r.disk??0),o+=r.offAxis,a++,n+=r.light??0;return{map:t,off:o,count:a,light:n,veil:o>0?Math.max(0,t)/o:0}}const Ze={radiusDeg:12,coreDeg:2,reach:9};function c1(e,t=dt.g){const o=Math.min(1,Math.max(-1,e)),a=Math.acos(o),n=Ze.radiusDeg*_n;if(a>=n)return 0;const r=Math.min(o,Math.cos(Ze.coreDeg*_n)),i=1-(a/n)**2;return(1-t*t)/(1+t*t-2*t*r)**1.5*i*i}function A0(e,t){const[o,a,n,r]=e;return{origin:[o+(t-1)/2,a+(t-1)/2],block:t,size:[Math.ceil(Math.max(1,n)/t),Math.ceil(Math.max(1,r)/t)]}}function u1(e,t,o,a){const n=t.originMm[0]+(e.origin[0]+e.block*o)*t.pitchMm,r=t.originMm[1]+(e.origin[1]+e.block*a)*t.pitchMm,i=Math.hypot(n,r,t.focalMm);return[n/i,r/i,t.focalMm/i]}function _s(e,t,o,a,n=dt.g,r=null){const[i,s]=e.size,l=Ze.reach,c=new Float64Array(i*s),h=Array.from({length:i*s},(d,_)=>u1(e,t,_%i,Math.floor(_/i))),m=(d,_)=>{const x=t.originMm[0]+d*t.pitchMm,f=t.originMm[1]+_*t.pitchMm,v=Math.hypot(x,f,t.focalMm);return[x/v,f/v,t.focalMm/v]},p=r&&a?Array.from({length:i*s},(d,_)=>o[_]>0?m(r[2*_]/o[_],r[2*_+1]/o[_]):h[_]):h;for(let d=0;d<s;d++)for(let _=0;_<i;_++){const x=h[d*i+_];let f=0;for(let v=-l;v<=l;v++)for(let g=-l;g<=l;g++){const y=_+g,M=d+v;if(g*g+v*v>l*l||y<0||M<0||y>=i||M>=s)continue;const b=M*i+y;let w=o[b];if(!(w>0))continue;if(a){const T=a[b];w=T>0?w/T:0}const R=p[b];f+=c1(x[0]*R[0]+x[1]*R[1]+x[2]*R[2],n)*w}c[d*i+_]=f}return c}const ds=e=>[(1-e)**3/6,(3*e**3-6*e*e+4)/6,(-3*e**3+3*e*e+3*e+1)/6,e**3/6];function h1(e,t,o,a){const[n,r]=e.size,i=(o-e.origin[0])/e.block,s=(a-e.origin[1])/e.block,l=Math.floor(i),c=Math.floor(s),h=ds(i-l),m=ds(s-c),p=(_,x)=>t[Math.min(r-1,Math.max(0,x))*n+Math.min(n-1,Math.max(0,_))];let d=0;for(let _=0;_<4;_++){let x=0;for(let f=0;f<4;f++)x+=h[f]*p(l-1+f,c-1+_);d+=m[_]*x}return d}function f1(e){return e.moon?e.moon.viewRate/(.75*dt.rayleighTau550*fn(e.moon.viewAngleDeg,e.moon.weights)):0}const u=e=>{if(!Number.isFinite(e))throw new RangeError(`transient-shaders: ${e} is not a GLSL float`);const t=e.toPrecision(9);return/[.e]/.test(t)?t:`${t}.0`},$=(e,t)=>`const float ${e}[${t.length}] = float[${t.length}](${Array.from(t,u).join(", ")});
`,Xo=2*Math.PI,Tn=`
uniform mat3 u_point;                  // camera -> virtual plane axes (the telescope's pointing)
uniform vec3 u_axis, u_west, u_north;  // the virtual plane's TAN frame in ICRS
uniform vec2 u_originMm;               // mm position of texel (0, 0)'s centre
uniform float u_pitchMm;
uniform float u_focalMm;
uniform float u_cathodeR;
// xyz: the cell's ICRS unit direction; w: 1, or 0 outside the cathode or behind the plane (xyz then 0).
vec4 cellDir(ivec2 p) {
  vec2 mm = u_originMm + vec2(p) * u_pitchMm;
  if (length(mm) > u_cathodeR) return vec4(0.0);
  vec3 v = u_point * vec3(mm / u_focalMm, 1.0);
  if (!(v.z > 1e-6)) return vec4(0.0);
  vec2 t = v.xy / v.z;
  return vec4(normalize(u_axis + t.x * u_west + t.y * u_north), 1.0);
}
`,ki=`
uint hashU(uint x) { x ^= x >> 16; x *= 0x7feb352du; x ^= x >> 15; x *= 0x846ca68bu; x ^= x >> 16; return x; }
float hashF(uint x) { return float(hashU(x) >> 8) * (1.0 / 16777216.0); }
float atanSeries(float t) {
  float t2 = t * t;
  return t * (1.0 - t2 * (0.333333333 - t2 * (0.2 - t2 * (0.142857143 - t2 * (0.111111111 - t2 * 0.0909090909)))));
}
float atanP(float y, float x) {
  float ax = abs(x), ay = abs(y);
  if (!(ax > 0.0) && !(ay > 0.0)) return x < 0.0 ? 3.14159265 : 0.0;
  bool swap = ay > ax;
  float t = swap ? ax / ay : ay / ax;
  t = t / (1.0 + sqrt(1.0 + t * t));
  t = t / (1.0 + sqrt(1.0 + t * t));
  float a = 4.0 * atanSeries(t);
  if (swap) a = 1.57079633 - a;
  if (x < 0.0) a = 3.14159265 - a;
  return y < 0.0 ? -a : a;
}
float sinSeries(float r) { float r2 = r * r; return r * (1.0 - r2 * (0.166666667 - r2 * (0.00833333333 - r2 * (1.98412698e-4 - r2 * 2.75573192e-6)))); }
float cosSeries(float r) { float r2 = r * r; return 1.0 - r2 * (0.5 - r2 * (0.0416666667 - r2 * (0.00138888889 - r2 * (2.48015873e-5 - r2 * 2.75573192e-7)))); }
float cosR(float x) {
  float k = floor(x * 0.636619772 + 0.5), r = (x - k * 1.5703125) - k * 4.83826795e-4;
  int q = int(k) & 3;
  return q == 0 ? cosSeries(r) : q == 1 ? -sinSeries(r) : q == 2 ? -cosSeries(r) : sinSeries(r);
}
float sinR(float x) {
  float k = floor(x * 0.636619772 + 0.5), r = (x - k * 1.5703125) - k * 4.83826795e-4;
  int q = int(k) & 3;
  return q == 0 ? sinSeries(r) : q == 1 ? cosSeries(r) : q == 2 ? -sinSeries(r) : -cosSeries(r);
}
`,v0=`
uniform sampler2D u_cloud;
uniform int u_cloudMode;
uniform vec4 u_cloudOffset;
uniform vec4 u_cloudTile;
uniform vec4 u_cloudShape;
uniform vec2 u_cloudTau;
float cloudTexel(ivec2 q) { return texelFetch(u_cloud, q, 0).r; }
float cloudNoise(vec2 uv) {
  vec2 x = fract(uv) * ${u(Ae.size)} - 0.5;
  vec2 x0 = floor(x), f = x - x0;
  ivec2 a = (ivec2(x0) + ${Ae.size}) & ${Ae.size-1}, b = (ivec2(x0) + ${Ae.size+1}) & ${Ae.size-1};
  return mix(mix(cloudTexel(ivec2(a.x, a.y)), cloudTexel(ivec2(b.x, a.y)), f.x), mix(cloudTexel(ivec2(a.x, b.y)), cloudTexel(ivec2(b.x, b.y)), f.x), f.y);
}
float cloudFactor(float n) { return max(0.0, 1.0 + u_cloudShape.x * (n - u_cloudShape.y)); }
float cloudPair(vec2 q) { return u_cloudTile.z * cloudNoise(q * u_cloudTile.x - u_cloudOffset.xy) + u_cloudTile.w * cloudNoise(q * u_cloudTile.y - u_cloudOffset.zw); }
// The slant optical depth tau * factor * air mass along the ICRS direction d; 0 on the ground or without a cloud.
float cloudTauN(vec3 d) {
  if (u_cloudMode == 1) {
    float up = dot(d, u_zenith);
    if (!(up > 0.0)) return 0.0;
    if (up < u_hzEdgeMax) { if (up < hzEdge(d)) return 0.0; }
    float s = max(up, u_cloudShape.w), k = u_cloudShape.z / s;
    vec2 q = vec2(dot(d, u_hzEast), dot(d, u_hzNorth)) * k;
    return u_cloudTau.x * cloudFactor(cloudPair(q)) / s;
  }
  if (u_cloudMode == 2) {
    vec3 w = d * d * d * d, g = degrees(d);
    float sum = w.x + w.y + w.z;
    float n = (w.z * cloudPair(g.xy) + w.x * cloudPair(g.yz) + w.y * cloudPair(g.zx)) / (sum > 0.0 ? sum : 1.0);
    return u_cloudTau.x * cloudFactor(n);
  }
  return 0.0;
}
`,ps=Ih,xs=e=>{const t=[];for(let o=0;o<ht;o++)for(let a=0;a<Pe;a++)t.push(e((o+1)*Xo*a/Pe));return t},m1=e=>$("AU_SHELL_KM",e?Ca:Ua)+$("AU_SHELL_W",e?Cr:Ur)+`const int AU_NS_E = ${(e?ka:Oa)[0]};
const int AU_NS_F = ${(e?ka:Oa)[1]};
`+$("AU_FOLD_K",ps.foldLambdaKm.map(t=>Xo/t))+$("AU_WARP_KAPPA",js)+$("AU_RAY_K",ps.rayLambdaKm.map(t=>Xo/t))+$("AU_PH_S",xs(Math.sin))+$("AU_PH_C",xs(Math.cos))+`const uint AU_ARC_PRESENT[${sr}] = uint[${sr}](${yn.map(t=>`${t}u`).join(", ")});
`+$("AU_SHELL_SLAB",e?Vs:Ys)+$("AU_SHELL_TOP",e?ks:Os)+$("AU_BUNCH_OFF",Hr)+$("AU_RAY_BETA",Cs)+$("AU_FINE_FOLD",Wr)+$("AU_FINE_BRIGHT",Br)+`const vec4 AU_RAY_DCV = vec4(${tl.map(u).join(", ")});
`+$("AU_OVAL",zs.flat())+$("AU_PBAND",rl.flat())+$("AU_DIFFUSE",uh)+$("AU_CK",O)+$("AU_CRAY_BETA",Mc)+$("AU_CRAY_W",Zh)+$("AU_FLAME_LV",Wl)+$("AU_CW",Array.from({length:O.length-1},(t,o)=>(Re[o]+Re[o+1])*(O[o+1]-O[o])))+$("AU_CRN",Array.from(Re,t=>t*Ln))+$("AU_CTOPS",dc)+$("AU_ARC_AMP0",Ps)+$("AU_CALONG0",xc)+$("AU_INV_RH",Array.from(e?Ca:Ua,t=>1/(qe+t)))+[["AU_CPRECAP",s0],["AU_CUT2",Ja*Ja],["AU_CFADE2",en*en],["AU_CROSS2",cn*cn],["AU_CROSS_EPS2",r0**2],["AU_RAY_DEPTH2",un*un],["AU_FINE_K2",(Math.PI/ge)**2],["AU_CTOP_MIN",Qt],["AU_CTOP_SPAN",Jt],["AU_CMID_EPS",l0],["AU_CTALL_R",_i],["AU_NZ_MIX",Ac],["AU_ENV_SHARE",Lo],["AU_ENV_W0",vc],["AU_ENV_K",gc],["AU_RAY_FM",Us],["AU_LR0",Qs],["AU_LRD",Js/3],["AU_SQRT2PI",Math.sqrt(2*Math.PI)],["AU_NT_P",.3275911*Math.SQRT1_2]].map(([t,o])=>`const float ${t} = ${u(o)};
`).join("")+[["AU_R",qe],["AU_REF_H",Na],["AU_PREFILTER",_t],["AU_ARC_CELL",It],["AU_ARC_PRECAP",Sn],["AU_MERGE_K",Xs],["AU_MERGE_S",ur],["AU_N_KM",Ye],["AU_MEANDER",Or],["AU_FOLD_PRE",Xo/(2*Ye)],["AU_F_KM",ge],["AU_FINE_PRE",Xo/(2*ge)],["AU_MORPH_C",Ts],["AU_MORPH_F",Ns],["AU_GATE_T",Dr],["AU_GATE_G",Ir],["AU_GATE_MEAN",ir],["AU_RAY_TALL",Gr],["AU_RAY_SHORT",$r],["AU_RAY_HMAX",qr],["AU_RAY_MAX",Kr],["AU_ALONG_FLOOR",An],["AU_ALONG_GAIN",vn],["AU_ALONG_MAX",ea],["AU_THICK0",gn],["AU_THICK_D",Mn],["AU_BUNCH_GAIN",kr],["AU_BUNCH_MAX",Pr],["AU_ARC_FOLD0",Bu],["AU_ARC_FOLD_STEP",Yu],["AU_SLAB_E",Zi[0]],["AU_SLAB_F",Zi[1]],["AU_ARC_POS0",pn],["AU_ARC_POS_SPAN",xn],["AU_ARC_W0",Yr],["AU_ARC_DW",Vr],["AU_CARC_W0",di],["AU_CARC_DW",pi],["AU_ARC_REACH2",So*So],["AU_ARC_FADE2",Ro*Ro],["AU_PATCH_RN0",ol],["AU_PATCH_DRN",al],["AU_PATCH_ASPECT",nl],["AU_PATCH_DUTY",ei],["AU_PATCH_SHARE",lh],["AU_PATCH_CELL",ho],["AU_PATCH_A0",sl],["AU_PATCH_DA",ll/255],["AU_PATCH_REACH2",fo*fo],["AU_PATCH_FADE2",za*za],["AU_ARC_TALL",zr],["AU_TWO_OVER_PI",2/Math.PI],["AU_PULSE_GREEN",oi]].map(([t,o])=>`const float ${t} = ${u(o)};
`).join(""),Fo=["x","y","z","w"],_1=()=>{const e=O,t=e.length,o=`vec${t}`,a=l=>Fo[l],n=2,r=(mi-e[n])/(e[n+1]-e[n]),i=[];for(let l=0;l<t;l++)i.push(`  vec2 k${l} = shellGL(AU_CK[${l}], up, ch);`);i.push(`  ${o} LL = ${o}(${Array.from(e,(l,c)=>`k${c}.y`).join(", ")}), GG = ${o}(${Array.from(e,(l,c)=>`k${c}.x`).join(", ")});`),i.push(`  ${o} XN = GG * hn + (${o}(${Array.from(e,u).join(", ")}) - AU_REF_H) * u_auCotDip, XE = GG * he;`),i.push("  vec2 kLo = shellGL(AU_CLOW, up, ch);"),i.push("  float LLo = kLo.y, dXo = kLo.x * hn + (AU_CLOW - AU_REF_H) * u_auCotDip - XN.x, dEo = kLo.x * he - XE.x;");for(let l=0;l+1<t;l++)i.push(`  float o${l} = (LL.${a(l+1)} - LL.${a(l)}) / ${u(e[l+1]-e[l])};`);const s=l=>l===0?"o0":l===t-1?`o${t-2}`:`0.5 * (o${l-1} + o${l})`;return i.push(`  ${o} OB = ${o}(${Array.from(e,(l,c)=>s(c)).join(", ")});`),i.push(`  ${o} SN = min(${o}(AU_CPRECAP), LL * ${u(_t*wc)} * sqrt(1.0 + max(${o}(0.0), hn * hn * (OB * OB - 1.0))));`),i.push(`  ${o} FA = exp(-0.5 * (AU_FOLD_PRE * AU_PREFILTER * LL) * (AU_FOLD_PRE * AU_PREFILTER * LL));`),i.push(`  float slant = ${Array.from({length:t-1},(l,c)=>`(LL.${a(c+1)} - LL.${a(c)}) * ${u(.5*(Re[c]+Re[c+1]))}`).join(" + ")};`),i.push(`  float xr = XN.${a(n)} + (XN.${a(n+1)} - XN.${a(n)}) * ${u(r)}, xer = XE.${a(n)} + (XE.${a(n+1)} - XE.${a(n)}) * ${u(r)};`),i.push(`  ${o} XQN = XN, XQ = XE;`),i.push("  if (u_auFold[4].x != 0.0) swirl4(XQN, XQ);"),i.push(`  ${o} WX1, WY1, WX2, WY2;`),i.push(`  ${o} XW = XQN - auWarp4(XQN, XQ, WX1, WY1, WX2, WY2);`),i.push(`  float xw = XW.${a(n)} + (XW.${a(n+1)} - XW.${a(n)}) * ${u(r)}, snr = SN.${a(n)} + (SN.${a(n+1)} - SN.${a(n)}) * ${u(r)};`),i.join(`
`)},dn=yi-1,d1=()=>{const e=O;if(e.length!==4)throw new Error("transient-shaders: the curtain profile has 4 nodes (vec4)");return`
// ½·erfc(z/√2) (the normal tail beyond z ≥ 0) and e^(−z²/2), both classes (aurora-morph.ts normTail; A&S 7.1.26).
vec4 normTail2(vec2 z) {
  vec2 e = exp(-0.5 * z * z), t = 1.0 / (1.0 + AU_NT_P * z);
  return vec4(0.5 * t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429)))) * e, e);
}
// One straight piece of the line of sight through a sheet, both E classes (aurora-morph.ts curtainSlab); ta / tb: the
// ends' normTail2(|d|/σ'), computed once per node (shared by the pieces either side).
// Round 15 (aurora-morph.ts curtainSlabAB): the piece's column split by its ends' densities, (A, B) of both classes as
// (A.xy, B.xy): the column = ra·A + rb·B.
vec4 curtainSlabAB(vec2 da, vec2 db, vec4 ta, vec4 tb, float dL, float sp) {
  vec2 D = db - da, mid = step(abs(D), vec2(AU_CMID_EPS * sp)), Ds = mix(D, vec2(1.0), mid);
  vec2 pa = mix(ta.xy, 1.0 - ta.xy, step(0.0, da)), pb = mix(tb.xy, 1.0 - tb.xy, step(0.0, db));
  vec2 dPhi = mix(pb - pa, (2.0 * step(0.0, da + db) - 1.0) * (ta.xy - tb.xy), step(0.0, da * db));
  vec2 k = dL / Ds, Q = (sp * ${u(1/Math.sqrt(2*Math.PI))} * (ta.zw - tb.zw) - da * dPhi) / Ds;
  vec2 dx = D / sp, em = sqrt(ta.zw * tb.zw) * (1.0 + dx * dx * 0.125), km = vec2(dL / (6.0 * AU_SQRT2PI * sp));
  return mix(vec4(max(vec2(0.0), k * (dPhi - Q)), max(vec2(0.0), k * Q)), vec4(km * (ta.zw + 2.0 * em), km * (2.0 * em + tb.zw)), vec4(mid, mid));
}
// Round 15 (aurora-morph.ts rayAttr, rayNode): a ray's attributes (T1, T2, g, s) at x in the rays' frame (the fine
// lattice's offset × ARC_FINE_KM / RAY_ID_KM, sign sf), deviations × att. Node indices mod AU_RAYID_WRAP (|i| < 2^15).
// Round 18 (aurora-morph.ts rayNode, B5): + gt0, g·T₀ of the deep feet (the top of byte 0, by level).
vec4 rayNode(uint x, int lv, out float gt0) {
  float b0 = float(x & 255u);
  float t1 = b0 < ${u(tn)} ? ${u(yo[0])} + ${u(yo[1]/Math.max(1,tn))} * (b0 + 0.5) : ${u(yo[2])};
  float g = AU_RG[int((x >> 16u) & 15u)];
  gt0 = b0 >= AU_DEEP_LO[lv] ? g * (${u(mt[0])} + AU_DEEP_K[lv] * (b0 - AU_DEEP_LO[lv] + 0.5)) : 0.0;
  return vec4(g * t1, g * AU_RT2[int((x >> 8u) & 15u)], g, AU_RS[int((x >> 24u) & 15u)]);
}
vec4 rayAttr(uint h, float x, float f, int wh, int sf, float att, int lv, out float gt0) {
  float p = x * ${u(1/$e)} + float(sf * ${ge/$e}) * f, fi = floor(p), s = p - fi;
  s = s * s * (3.0 - 2.0 * s);
  int ia = (int(fi) + sf * ${ge/$e} * wh) & ${dn};
  int ib = (ia + 1) & ${dn};
  float ta, tb;
  vec4 a = rayNode(hashU(h ^ (uint(ia) * 0x2f8a63c1u)), lv, ta), b = rayNode(hashU(h ^ (uint(ib) * 0x2f8a63c1u)), lv, tb);
  const vec4 m = vec4(1.0, 1.0, 1.0, ${u(na)});
  gt0 = AU_DEEP_M[lv] + (ta + (tb - ta) * s - AU_DEEP_M[lv]) * att;
  return m + (a + (b - a) * s - m) * att;
}
// Log precipitation flux along one field line (aurora-morph.ts zoneRayPrecipitation).
vec2 zoneRayPrecipitation(uint h, float x, float f, int wh, int sf, float coarse, float mid, float att) {
  float wide = ${u(Lc)} * (2.0 * coarse - 1.0) + ${u(Fc)} * att * (2.0 * mid - 1.0);
  float gate = smooth01(${u(nn[0])} + ${u(nn[1])} * wide);
  float att2 = att * att;
  float fine = 0.5;
  if (gate * att2 > 0.0) {
    float p = ${u(an)} * (x / AU_F_KM + float(sf) * f), fi = floor(p), t = p - fi;
    int i = int(fi) + ${an} * sf * wh, eb = AU_FLOW_LF * wh;
    float lf = float(AU_FLOW_LF) * f;
    vec2 a = flowNode(h ^ 0x959cbaddu, i, lf, eb).xy, b = flowNode(h ^ 0x959cbaddu, i + 1, lf, eb).xy;
    fine = a.x + (b.x - a.x) * smooth01(t) + ${u(Sr)} * t * (1.0 - t) * ((1.0 - t) * (2.0 * a.y - 1.0) - t * (2.0 * b.y - 1.0));
  }
  float logFlux = ${u(rn[0])} * wide + ${u(Tc)} * gate * att2 * (2.0 * fine - 1.0)
    - ${u(sn[0])} - ${u(sn[1])} * att;
  return vec2(${u(rn[1])} * (exp2(logFlux) - 1.0), 1.0 + ${u(Nc)} * gate);
}
// Relative emission at a node (aurora-morph.ts zoneCurtainE rayAt), common to both species' profiles.
float rayAt(float xc, float gT, float s, float cBeta, float icn) {
  float e = xc * (1.0 + ${u(Uc)} * s * xc) * gT;
  float br = e * inversesqrt(1.0 + e * e * ${u(1/Sc**2)}), dk = xc / (1.0 + max(-xc, 0.0) * icn);
  return 1.0 + cBeta * mix(dk, br, step(0.0, xc));
}
// (cos x, sin x) with one Cody–Waite reduction (cosR / sinR's).
vec2 sinCosR(float x) {
  float k = floor(x * 0.636619772 + 0.5), r = (x - k * 1.5703125) - k * 4.83826795e-4;
  int q = int(k) & 3;
  float s = sinSeries(r), co = cosSeries(r);
  return q == 0 ? vec2(co, s) : q == 1 ? vec2(-s, co) : q == 2 ? vec2(-co, -s) : vec2(s, -co);
}
// z in [-1, 1] from the byte at bit s of w: its two nibbles summed (aurora-morph.ts zNib).
float zNib(uint w, uint s) { return float(((w >> s) & 15u) + ((w >> (s + 4u)) & 15u)) * ${u(1/15)} - 1.0; }
// Round 12b: the flame wave on arc h at the crossing (xs along the arc, hs its height), the prompt class's lift − 1
// (aurora-morph.ts flameZone; u_auFold[7].xy, [8].x the clocks, [8].y the window factor).
// Round 14 (aurora-morph.ts flameWave): one wave of epoch ep — a sharp front with a tail below, widening as it climbs,
// ending at its own height, its life faded in and out over the two periods it is drawn.
float flameWave(uint h, float xs, float hs, float x0, float ep, float P) {
  float age = x0 - ep;
  uint hp = hashU(h ^ (uint(int(ep) & 4095) * 0x9e3779b1u)), hq = (hp * 0x2c1b3c6du) ^ (hp >> 16u);
  if (float((hq >> 24u) & 255u) >= ${u(256*Eo)}) return 0.0;
  uint hr = hashU(hq ^ 0x5851f42du);
  // Round 16 (cost): nothing to draw — the wave not born yet or gone (life 0), its front still below this height for any
  // lag (q ≥ 1: front 0), or past its end for any lag (rise ≥ end: fin 0) — before the three cosines (the same 0).
  float life = smooth01(age * ${u(1/Dt[0])}) * (1.0 - smooth01((age - ${u(Dt[1])}) * ${u(1/(Dt[2]-Dt[1]))}));
  float eb = float(hr & 255u), end = eb < ${u(256*Vo)} ? ${u(zt[0])} + ${u(zt[1]/(256*Vo))} * eb
    : ${u(zt[2])} + ${u(zt[3]/(256-256*Vo))} * (eb - ${u(256*Vo)});
  float t0 = ${u(ni)} * (1.0 + ${u(We[3])} * zNib(hp, 16u)), vf = ${u(ai)} * (1.0 + ${u(We[2])} * zNib(hp, 8u));
  float tb = (age - ${u(xr)} - ${u(We[0])} * zNib(hp, 0u)) * P, lagMax = ${u(1.001*Ar*(1+vr))};
  float hfMax = ${u(O[0])} - t0 + vf * (tb + lagMax), hfMin = ${u(O[0])} - t0 + vf * (tb - lagMax);
  if (!(life > 0.0) || hs - hfMax >= t0 * (1.0 + max(0.0, hfMax - ${u(O[0])}) * ${u(1/Xa)}) || max(0.0, hfMin - ${u(O[0])}) >= end) return 0.0;
  float ik =${u(2*Math.PI/ql)} / (1.0 + ${u(We[4])} * zNib(hp, 24u));
  float c = 0.5 + 0.5 * cosR(xs * ik + float(hq & 255u) * ${u(2*Math.PI/256)});
  float lag = ${u(Ar)} * (cosR(xs * ik * ${u(1/.618)} + float((hq >> 8u) & 255u) * ${u(2*Math.PI/256)})
    + ${u(vr/255)} * float((hr >> 8u) & 255u) * cosR(xs * ik * ${u(1/.27)} + float((hr >> 16u) & 255u) * ${u(2*Math.PI/256)}));
  float tau = (age - ${u(xr)} - ${u(We[0])} * zNib(hp, 0u)) * P - lag;
  float hf = ${u(O[0])} - t0 + vf * tau;
  float rise = max(0.0, hf - ${u(O[0])}), q = (hs - hf) / (t0 * (1.0 + rise * ${u(1/Xa)}));
  float b = max(0.0, 1.0 - q * q), front = q >= 0.0 ? b * b : exp(-q * q * ${u(1/(Va*Va))});
  float fs = max(${u(Bl)} * end, ${u(Yl)}), fin = 1.0 - smooth01((rise - end + fs) / fs);
  return (1.0 + ${u(We[1])} * zNib(hq, 16u)) * c * front * fin * life;
}
float flameZone(uint h, float xs, float hs, int lv) {
  int j = int((h >> 13u) % 3u);
  float x0 = (j == 0 ? u_auFold[7].x : j == 1 ? u_auFold[7].y : u_auFold[8].x) + float((h >> 26u) & 7u) * 0.125, ep = floor(x0);
  float P = j == 0 ? ${u(ft[0])} : j == 1 ? ${u(ft[1])} : ${u(ft[2])};
  return u_auFold[8].y * ${u(Hl)} * AU_FLAME_LV[lv] * exp(-max(0.0, hs - ${u(O[0])}) * ${u(1/Kl)})
    * (flameWave(h, xs, hs, x0, ep, P) + flameWave(h, xs, hs, x0, ep - 1.0, P));
}
// Round 18 (aurora-morph.ts curtainProfile): the node densities (ρ101, ρ107, ρ125) of both classes for the lower edge's
// shift e and the hem's weight, rescaled to the e = 0 profile's column (r2: ρ125's base over the peak; topS: the top piece).
void curtainProfile(vec2 e, vec2 hem, float r2, float topS, out vec2 a, out vec2 b, out vec2 c) {
  vec2 a0 = mix(max(-e * AU_LE_A1, vec2(0.0)), min(vec2(AU_LE_R101), AU_LE_A0 / max(AU_LE_A2 + e, vec2(1e-6))), step(e, vec2(-AU_LE_S0)));
  b = clamp(1.0 - e * AU_LE_I107, AU_LE_R107, 1.0); c = r2 * (1.0 + max(e, 0.0) * AU_LE_I125);
  a = a0 + hem * max((1.0 + AU_HEM_GAIN) * b - a0, vec2(0.0));
  float k12 = AU_CK_1 + AU_CK_2 * topS;
  vec2 sc = AU_CRN1 * (AU_CK_01 + k12 * r2) / (AU_CK_L0 * a + AU_CK_01 * b + k12 * c);
  a *= sc; b *= sc; c *= sc;
}
// The E layer's arcs as curtains along the line of sight, (prompt, 557.7) (aurora-morph.ts zoneCurtainE).
// Round 8: XN / XE / xr are the turned and warped coordinates (zoneMorph: XW, XQ, xw); slant, snr for the envelope.
// Round 9: WX1 … WY2 the warp's 620 / 310 km parts at the nodes (each arc's own layer shift, aurora-morph.ts layerCoef).
// Round 18: LLo, dXo the CURTAIN_LOW_KM node's slant distance and x_n step from node 0 (aurora-morph.ts curtainNodes).
vec2 curtainE(vec4 XN, vec4 XE, vec4 LL, vec4 SN, vec4 FA, float xr, int lv, float slant, float snr, vec4 WX1, vec4 WY1, vec4 WX2, vec4 WY2, float vs, float LLo, float dXo) {
  // Round 12b: the vortex's shear vs (aurora-morph.ts vortexStrain): the sheets widened, the rays faded.
  float vs2 = ${u(yr)} * vs * ${u(yr)} * vs, vRay = 1.0 / (1.0 + ${u(ac)} * vs);
  float ef = arcV(12), offC = arcV(14), offF = arcV(15);
  int c = int(floor((xr - arcV(0)) / AU_ARC_CELL - 0.5)), eb = int(arcV(13) + 0.5), wC = int(arcV(28) + 0.5), wF = int(arcV(29) + 0.5);
  uint present = AU_ARC_PRESENT[lv];
  vec2 o0 = vec2(arcV(0), arcV(16)), sh = vec2(arcV(9), arcV(25)), col = vec2(0.0);
  // Round 10: the waves' ray gain and envelope share (aurora-morph.ts zoneWave, fold slots 11, 13).
  // Round 18 (B3): the share per arc (AU_SKIRT), the waves' change of it esW.
  float cBeta = AU_CRAY_BETA[lv] * (1.0 + u_auFold[5].y), esW = u_auFold[6].y;
  // Round 12: the rays' dark side eased to a floor (aurora-morph.ts CURTAIN_RAY_DARK).
  float icn = cBeta * ${u(1/yc)};
  for (int dc = -1; dc <= ${En-2}; dc++) {
    int id = c + dc;
    uint h0 = hashU(uint(id + 1024) * 65536u + 4099u);
    float x = ef + float(h0 >> 8u) * (1.0 / 16777216.0), fx = floor(x), u = x - fx;
    uint h = hashU(h0 ^ (uint((eb + int(fx)) & ${la}) * 0x9e3779b1u));
    if ((h & 255u) >= present) continue;
    float pos = (float(id) + AU_ARC_POS0 + AU_ARC_POS_SPAN * float((h >> 8u) & 255u) / 256.0) * AU_ARC_CELL;
    int j = int((h >> 24u) & 1u), qd = int((h >> 25u) & 7u);
    vec2 drift = vec2(arcV(1 + 2 * j) * AU_PH_S[qd] + arcV(2 + 2 * j) * AU_PH_C[qd], arcV(17 + 2 * j) * AU_PH_S[qd] + arcV(18 + 2 * j) * AU_PH_C[qd]);
    float rel = xr - o0.x - pos - drift.x, cut = smooth01((AU_CUT2 - rel * rel) / (AU_CUT2 - AU_CFADE2));
    if (!(cut > 0.0)) continue;
    vec2 band = vec2(arcBand(o0.x + pos + drift.x - sh.x, lv), arcBand(o0.y + pos + drift.y - sh.y, lv));
    if (!(band.x > 0.0 || band.y > 0.0)) continue;
    uint hc = h ^ 0x85ebca6bu;
    // The meander at each node's own place along the arc; d (km) from the sheet's centre plane, per class.
    // Round 8: the coarse lattice at nodes 1 and 3; node 0 = node 1, node 2 = the blend at its height's share.
    // Round 14: in the arc's own moving frame (aurora-morph.ts arcFlow: sm the coarse frame's ±1, ±2, sf the fine frame's
    // sign), the nodes living (noiseFlow); the fold events at the same two nodes (foldEvents: km, break).
    uint ha = hashU(h ^ 0x632be5abu);
    int sf = (ha & 2u) != 0u ? -1 : 1, sm = sf * (1 + int(ha & 1u));
    // Round 16 (cost): the three nodes' fold events from three shared cells (foldEvents3, aurora-morph.ts).
    vec4 n1 = noiseFlow(hc, XE.y / AU_N_KM, offC, wC, sm, AU_FLOW_LC), n3 = noiseFlow(hc, XE.w / AU_N_KM, offC, wC, sm, AU_FLOW_LC);
    vec4 n0 = n1, n2 = n1 + (n3 - n1) * AU_NZ_MIX;
    uint hfe = h ^ 0x4cf5ad43u;
    vec2 fe1, fe2, fe3;
    foldEvents3(hfe, vec3(XE.y, XE.z, XE.w) / AU_N_KM + float(sm) * offC, offC, wC, sm, lv, fe1, fe2, fe3);
    float brk = (fe1.y + fe2.y + fe3.y) * (1.0 / 3.0);
    // Round 9: + the arc's layer shift (aurora-morph.ts layerCoef: δ₁ from AU_LD1, δ₂ one of the 8 phases, r₂ from 2 bits).
    // Round 14: δ₂ one of AU_LD2 (±π/5, ±π/15), r₂ 0.8–1.2 — neighbouring sheets out of step but never through each other.
    int ql1 = int(((h >> 10u) ^ (h >> 19u)) & 3u), ql2 = int(((h >> 3u) ^ (h >> 27u)) & 3u);
    float lr2 = AU_LR0 + AU_LRD * float(((h >> 14u) ^ (h >> 23u)) & 3u);
    vec4 f = AU_CMEANDER * FA * (2.0 * vec4(n0.x, n1.x, n2.x, n3.x) - 1.0) + vec4(fe1.x, fe1.x, fe2.x, fe3.x) + WX1 * AU_LD1C[ql1] - WY1 * AU_LD1S[ql1] + WX2 * (lr2 * AU_LD2C[ql2] - 1.0) - WY2 * (lr2 * AU_LD2S[ql2]);
    vec4 d0 = XN - o0.x - pos - drift.x - f, d1 = XN - o0.y - pos - drift.y - f;
    // Where the line of sight crosses the sheet (class 0): each piece's zero of d (regularised), weighted.
    float W = 0.0, XS = 0.0, LS = 0.0, SS = 0.0, DX = 0.0, DD = 0.0, HS = 0.0;
    vec4 NZ = vec4(0.0);
${[0,1,2].map(o=>{const a=Fo[o],n=Fo[o+1],r=o===0?ln[0]:0,i=o===2?ln[1]:1,s=r===0&&i===1,l=.5+i0/((e[o+1]-e[o])*(i-r));return`    {
      float a0 = d0.${a}, g0 = d0.${n} - a0, a = ${r===0?"a0":`a0 + g0 * ${u(r)}`}, b = ${i===1?`d0.${n}`:`a0 + g0 * ${u(i)}`}, D = a - b;
      float dm = a * b <= 0.0 ? 0.0 : min(abs(a), abs(b)), w = AU_CW[${o}] / (1.0 + dm * dm / AU_CROSS2);
      float t = ${s?"":`${u(r)} + ${u(i-r)} * `}(0.5 + clamp((a + b) * D / (2.0 * (D * D + AU_CROSS_EPS2 + dm * dm)), ${u(-l)}, ${u(l)})), tc = clamp(t, 0.0, 1.0);
      float hz = ${u(e[o])} + ${u(e[o+1]-e[o])} * t;
      W += w; XS += w * (XE.${a} + (XE.${n} - XE.${a}) * t); LS += w * (LL.${a} + (LL.${n} - LL.${a}) * t); SS += w * (SN.${a} + (SN.${n} - SN.${a}) * t);
      NZ += w * (n${o} + (n${o+1} - n${o}) * tc); DX += w * abs(XE.${n} - XE.${a}); DD += w * abs(g0);
      HS += w * hz;
    }`}).join(`
`)}
    float xs = XS / W, ls = LS / W, sns = SS / W, ratio = DX / max(DD, 1e-3);
    vec4 nzs = NZ / W;
    float sr2 = (ls * AU_PREFILTER) * (ls * AU_PREFILTER) + (sns * sns + AU_RAY_DEPTH2) * ratio * ratio;
    // Round 18 (B1, aurora-morph.ts curtainSigma): each arc's own width by level, along it × e^(A(2w − 1)), thicker in a fold.
    float sigma = AU_CFWHM[lv * 16 + int((h >> 20u) & 15u)] * exp(AU_THICK_A * (2.0 * nzs.w - 1.0)) * (1.0 + AU_THICK_F * abs(fe2.x) / AU_FOLD_KM[lv]);
    float sp = sqrt(sigma * sigma + sns * sns + vs2);
    float al = max(0.0, nzs.y - AU_ALONG_FLOOR), ag = AU_ALONG_GAIN * al * al;
    int qb0 = int(((h >> 12u) ^ (h >> 21u)) & 7u), qb1 = int(((h >> 5u) ^ (h >> 18u)) & 7u);
    vec2 own = vec2(1.0 + arcV(5) * AU_PH_S[qb0] + arcV(6) * AU_PH_C[qb0] + arcV(7) * AU_PH_S[qb1] + arcV(8) * AU_PH_C[qb1],
                    1.0 + arcV(21) * AU_PH_S[qb0] + arcV(22) * AU_PH_C[qb0] + arcV(23) * AU_PH_S[qb1] + arcV(24) * AU_PH_C[qb1]);
    vec2 base = band * own * ((AU_ARC_AMP0[lv] + (1.0 - AU_ARC_AMP0[lv]) * float((h >> 16u) & 15u) / 15.0) * smooth01(min(u, 1.0 - u) * ${u(1/sa)}) * cut * AU_WNORM[lv]);
    // Round 8: the curtain's diffuse envelope (aurora-morph.ts CURTAIN_ENV_*) at the reference foot.
    // Round 18 (B3, aurora-morph.ts SKIRT_*): one-sided, each arc's own share and side, read at the 107 km node; its
    // brightness along the arc the coarse lattice's alone, no flame wave (aurora-morph.ts zoneCurtainE).
    float se = AU_SKIRT_W0 + AU_SKIRT_K * sigma, se2 = se * se + SN.y * SN.y, es = AU_SKIRT[int((ha >> 12u) & 15u)] + esW;
    vec2 dr = vec2(d0.y, d1.y) + (((ha >> 16u) & 255u) < ${jc}u ? AU_SKIRT_OFF : -AU_SKIRT_OFF) * se;
    col += base * ((es * (AU_CALONG0[lv] + (1.0 - AU_CALONG0[lv]) * min(AU_ALONG_MAX, ag)) * slant * sigma / sqrt(se2)) * exp(-0.5 * dr * dr / se2));
    // Round 18 (cost, aurora-morph.ts CURTAIN_FAR): a sheet whose every node (the CURTAIN_LOW_KM node to the tallest top)
    // lies on one side of the line of sight beyond CURTAIN_FAR·σ' + CURTAIN_FAR_KM (the fine pleats' reach): its envelope only.
    vec4 fa0 = vec4(d0.x + dXo, d0.xyz), fa1 = vec4(d1.x + dXo, d1.xyz);
    vec4 fb = vec4(d0.w, d0.z + ${u(Qt+Jt)} * (d0.w - d0.z), d1.w, d1.z + ${u(Qt+Jt)} * (d1.w - d1.z));
    float thr = AU_FAR * sp + AU_FAR_KM;
    if (all(greaterThan(fa0, vec4(thr))) && all(greaterThan(fa1, vec4(thr))) && all(greaterThan(fb, vec4(thr)))) continue;
    if (all(lessThan(fa0, vec4(-thr))) && all(lessThan(fa1, vec4(-thr))) && all(lessThan(fb, vec4(-thr)))) continue;
    float fineAtt = exp(-0.5 * AU_FINE_K2 * sr2);
    vec4 nf = noiseFlow(h ^ 0xc2b2ae35u, xs / AU_F_KM, offF, wF, sf, AU_FLOW_LF);
    float ff = AU_FINE_FOLD[lv] * fineAtt * (nf.x - nf.y) * (1.0 + AU_BREAK_PLEAT * brk);
    float along = AU_CALONG0[lv] + (1.0 - AU_CALONG0[lv]) * min(AU_ALONG_MAX, ag * (1.0 + AU_FINE_BRIGHT[lv] * fineAtt * (nf.x + nf.z - 1.0)));
    // Both E classes see the same precipitation at the crossing, with different emission profiles.
    float xsr = xs + AU_RAY_FM * fineAtt * (nf.x - nf.z);
    vec2 rain = zoneRayPrecipitation(h, xsr, offF, wF, sf, nzs.z, nf.w, fineAtt);
    float drive = rain.x * vRay;
    float zz = nzs.z * nzs.z, topS = AU_CTOP_MIN + AU_CTOP_SPAN * zz;
    // The densities at the nodes × CURTAIN_NORM, the top piece's lower node lifted where rayed.
    // Round 18 (B4): the lower edge moved by e (aurora-morph.ts lowerE, curtainProfile), both classes.
    float e = AU_LE0[int((ha >> 8u) & 15u)] + AU_LE_C * (1.0 - 2.0 * nzs.y) + AU_LE_F * (nf.y - 0.5) * fineAtt;
    vec2 pa, pb, pc;
    // Round 18 (B8, B7): the prompt class AU_PROMPT_LOW lower, its hem (aurora-morph.ts hemWeight) where the fine lattice says.
    float hw = AU_HEM_SHARE[lv] + (smooth01((nf.z - AU_HEM_THR[lv]) * AU_HEM_ISOFT + 0.5) - AU_HEM_SHARE[lv]) * fineAtt;
    curtainProfile(vec2(e - AU_PROMPT_LOW, e), vec2(hw, 0.0), AU_CR21 * (1.0 + AU_CTALL_R * zz), topS, pa, pb, pc);
    // Each node's d (both classes; the top node at the arc's own height) and its normal tail, once.
    vec2 q0 = vec2(d0.x, d1.x) - ff, q1 = vec2(d0.y, d1.y) - ff, q2 = vec2(d0.z, d1.z) - ff, q3 = q2 + (vec2(d0.w, d1.w) - ff - q2) * topS;
    vec4 t0 = normTail2(abs(q0) / sp), t1 = normTail2(abs(q1) / sp), t2 = normTail2(abs(q2) / sp), t3 = normTail2(abs(q3) / sp);
    // Round 15: each ray's own attributes (aurora-morph.ts rayAttr: T1, T2, g, s) and its factor at the nodes 1 and 2
    // (rayAt); the pieces' columns split by node (curtainSlabAB: C1, C2 the columns of the 107 and 125 km densities).
    // (Round 16: the rays' lattice is the fine lattice's 12 km: its pre-filter is fineAtt.)
    float gt0;
    vec4 ra = rayAttr(h ^ 0x1b873593u, xsr, offF, wF, sf, fineAtt, lv, gt0);
    float tall2 = clamp(1.0 + AU_RAY_TALL * nf.w - AU_RAY_SHORT, 0.0, AU_RAY_HMAX);
    float R1 = rayAt(min(AU_RAY_MAX, drive), ra.x, ra.w, cBeta, icn);
    float R2 = rayAt(min(AU_RAY_MAX, tall2 * drive), ra.y, ra.w, cBeta, icn);
    vec4 s0 = curtainSlabAB(q0, q1, t0, t1, LL.y - LL.x, sp), s1 = curtainSlabAB(q1, q2, t1, t2, LL.z - LL.y, sp), s2 = curtainSlabAB(q2, q3, t2, t3, (LL.w - LL.z) * topS, sp);
    // Round 18 (B4): + the piece from the CURTAIN_LOW_KM node (no density) to node 0 (ρ101); node 0's rays: node 1's dark side only.
    vec2 qL = q0 + dXo;
    vec4 sL = curtainSlabAB(qL, q0, normTail2(abs(qL) / sp), t0, LL.x - LLo, sp);
    vec2 C0 = pa * (sL.zw + s0.xy), C1 = pb * (s0.zw + s1.xy), C2 = pc * (s1.zw + s2.xy);
    // Round 18 (B5): + the deep feet (aurora-morph.ts zoneCurtainE D0): T₀ × the ray's excess, over ρ107, the 557.7 × AU_DEEP_G.
    vec2 D0 = max(R1 - 1.0, 0.0) * (gt0 / ra.x) * vec2(1.0, AU_DEEP_G);
    // Round 18b: each foot to its own depth (aurora-morph.ts DEEP_Q_MIN): the piece below node 0 × q, q = T₀ / T₀max.
    vec2 deepB = vec2(0.0);
    if (D0.x != 0.0) {
      float qDp = clamp(rain.y * gt0 / (max(ra.z, 1e-3) * ${u(mt[1])}), ${u(Ec)}, 1.0);
      vec2 qF = q0 + dXo * qDp;
      deepB = curtainSlabAB(qF, q0, normTail2(abs(qF) / sp), t0, (LL.x - LLo) * qDp, sp).zw;
    }
    vec2 pl = C0 + C1 + C2, cc = C0 * min(R1, 1.0) + pb * (deepB + s0.xy) * D0 + C1 * R1 + C2 * R2;
    // Round 13: the sheet's own grazing gain eased to CURTAIN_STRETCH_MAX (aurora-morph.ts).
    vec2 gq = pl * ${u(1/(Re[1]*Ln*ic))}, gq2 = gq * gq;
    cc *= inversesqrt(sqrt(1.0 + gq2 * gq2));
    // Round 12b: the flame wave (flameZone) on the curtain, 557.7 at AU_PULSE_GREEN of it (round 18: the sheet's alone).
    float fl = u_auFold[8].y > 0.0 ? flameZone(h, xs, HS / W, lv) : 0.0;
    col += base * (along * (1.0 - es) * sigma * AU_SQRT2PI) * cc * (1.0 + fl * vec2(1.0, AU_PULSE_GREEN));
  }
  // Round 12b: the arcs' sum eased towards CURTAIN_GRAZE_CAP × the profile's slant (aurora-morph.ts).
  // Round 13: the knee to the 4th power (aurora-morph.ts).
  vec2 gr = col * (${u(1/rc)} / slant), gr2 = gr * gr;
  return col * inversesqrt(sqrt(1.0 + gr2 * gr2)) * (1.0 + vec2(arcV(10), arcV(26)));
}
`},p1=()=>`
float arcSumF3(vec3 FXG, vec3 FXE, vec3 FSN2, vec3 FFA, vec3 FWB, vec3 FTOP, vec3 FRL, vec3 FRR, vec4 lw, int lv) {
  float ef = arcV(44), offC = arcV(14), offF = arcV(15);
  int eb = int(arcV(45) + 0.5), wC = int(arcV(28) + 0.5), wF = int(arcV(29) + 0.5);
  uint present = AU_ARC_PRESENT[lv];
  int c = int(floor((AU_NS_F == 3 ? FXG.y : FXG.x) * ${u(1/It)} - 0.5));
  vec3 acc = vec3(0.0);
  for (int dc = -1; dc <= ${En-2}; dc++) {
    int id = c + dc;
    uint h0 = hashU(uint(id + 1024) * 65536u + 4099u);
    float x = ef + float(h0 >> 8u) * (1.0 / 16777216.0), fx = floor(x), u = x - fx;
    uint h = hashU(h0 ^ (uint((eb + int(fx)) & ${la}) * 0x9e3779b1u));
    if ((h & 255u) >= present) continue;
    float pos = (float(id) + AU_ARC_POS0 + AU_ARC_POS_SPAN * float((h >> 8u) & 255u) / 256.0) * AU_ARC_CELL;
    int qb0 = int(((h >> 12u) ^ (h >> 21u)) & 7u), qb1 = int(((h >> 5u) ^ (h >> 18u)) & 7u);
    float own = 1.0 + arcV(37) * AU_PH_S[qb0] + arcV(38) * AU_PH_C[qb0] + arcV(39) * AU_PH_S[qb1] + arcV(40) * AU_PH_C[qb1];
    int j = int((h >> 24u) & 1u), qd = int((h >> 25u) & 7u);
    float drift = arcV(33 + 2 * j) * AU_PH_S[qd] + arcV(34 + 2 * j) * AU_PH_C[qd];
    uint ha = hashU(h ^ 0x632be5abu);
    int sf = (ha & 2u) != 0u ? -1 : 1, sm = sf * (1 + int(ha & 1u));
    int ql1 = int(((h >> 10u) ^ (h >> 19u)) & 3u), ql2 = int(((h >> 3u) ^ (h >> 27u)) & 3u);
    float lr2 = AU_LR0 + AU_LRD * float(((h >> 14u) ^ (h >> 23u)) & 3u);
    float shift = lw.x * AU_LD1C[ql1] - lw.y * AU_LD1S[ql1] + lw.z * (lr2 * AU_LD2C[ql2] - 1.0) - lw.w * (lr2 * AU_LD2S[ql2]);
    float sig0 = (AU_ARC_W0 + AU_ARC_DW * float((h >> 20u) & 15u) / 15.0) / 2.35482004;
    float a0 = (AU_ARC_AMP0[lv] + (1.0 - AU_ARC_AMP0[lv]) * float((h >> 16u) & 15u) / 15.0) * smooth01(min(u, 1.0 - u) * ${u(1/sa)}) * own;
    // The arc's coarse lattice and its rays' red once, at the middle shell (aurora-morph.ts arcSumF3).
    float xm = AU_NS_F == 3 ? FXE.y : FXE.x;
    vec4 nz = noiseFlow(h ^ 0x85ebca6bu, xm / AU_N_KM, offC, wC, sm, AU_FLOW_LC);
    vec2 rt = redAttr(h ^ 0x1b873593u, FXE.x - float(sf) * FRL.x, offF, wF, sf, 1.0) - 1.0;
    float al = max(0.0, nz.y - AU_ALONG_FLOOR), along = a0 * min(AU_ALONG_MAX, AU_ALONG_GAIN * al * al), tall = AU_ARC_TALL * (2.0 * nz.z - 1.0);
    float sigma = sig0 * (AU_THICK0 + AU_THICK_D * nz.w), sg2 = sigma * sigma, wr = min(1.0, clamp(AU_BUNCH_GAIN * nz.z - AU_BUNCH_OFF[lv], 0.0, AU_BUNCH_MAX));
    float mea = AU_MEANDER * (2.0 * nz.x - 1.0);
${[0,1,2].map(e=>{const t=Fo[e];return`    if (${e} < AU_NS_F) {
      float dn = FXG.${t} - pos - drift, d = dn - (mea * FFA.${t} + shift), s2 = sg2 + FSN2.${t}, tp = 2.0 * FTOP.${t} - 1.0;
      acc.${t} += along * (1.0 + tp * tall) * sqrt(sg2 / s2) * exp(-0.5 * d * d / s2) * smooth01((AU_ARC_REACH2 - d * d) / (AU_ARC_REACH2 - AU_ARC_FADE2))
        * smooth01((AU_ARC_NOM2 - dn * dn) / (AU_ARC_NOM2 - AU_ARC_NOMF2)) * (1.0 + wr * FRR.${t} * (AU_RED_B * rt.x + tp * AU_RED_H * rt.y));
    }`}).join(`
`)}
  }
  return dot(acc, FWB) * (1.0 + arcV(42)) * AU_RED_GAIN;
}
`,x1=(e,t)=>`
const int AU_FOLDS = ${ta};
const int AU_RAYS = ${e};
const int AU_HARMONICS = ${t};
uniform vec4 u_auArcY[12];
uniform vec2 u_auFold[9];
uniform vec2 u_auRay[12];
uniform vec2 u_auPatch[36];
uniform vec2 u_auPillar[12];
uniform vec2 u_auBundle[12];
uniform vec3 u_auLowDrift;
uniform int u_auScene;
uniform vec4 u_auLow;
uniform float u_auCotDip;
uniform float u_auRate[5];
uniform int u_auClass[5];
uniform sampler2D u_auExt;
uniform int u_auExtOn;
uniform float u_auRatioCap;
out vec4 o;
float smooth01(float x) { float t = clamp(x, 0.0, 1.0); return t * t * (3.0 - 2.0 * t); }
float arcV(int idx) { return u_auArcY[idx >> 2][idx & 3]; }
`,A1=()=>$("AU_LD1C",hr.map(e=>Math.cos(e)-1))+$("AU_LD1S",hr.map(Math.sin))+$("AU_LD2C",fr.map(Math.cos))+$("AU_LD2S",fr.map(Math.sin))+`const float AU_ARC_NOM2 = ${u(Pa**2)};
const float AU_ARC_NOMF2 = ${u(Xr**2)};
const int AU_FLOW_LC = ${oa};
const int AU_FLOW_LF = ${aa};
const int AU_FOLD_LIFE = ${wr};
`+$("AU_FOLD_KM",ci)+$("AU_RT2",vi)+$("AU_RG",gi)+$("AU_RS",Rc)+`const float AU_RAYID_K2 = ${u(Fi)};
const float AU_RED_GAIN = ${u(bi)};
const float AU_RED_B = ${u(Ei)};
const float AU_RED_H = ${u(Li)};
`+$("AU_LE0",qc)+[["AU_CLOW",Je],["AU_LE_C",Cc],["AU_LE_F",Oc],["AU_LE_S0",wo*(O[1]-O[0])],["AU_LE_A1",1/(O[1]-O[0])],["AU_LE_A0",wo*(O[0]-Je)],["AU_LE_A2",O[0]-Je+wo*(O[1]-O[0])],["AU_LE_R101",kc],["AU_LE_I107",1/Pc],["AU_LE_R107",zc],["AU_LE_I125",1/Dc],["AU_CRN1",Re[1]*Ln],["AU_CR21",Re[2]/Re[1]],["AU_CK_L0",O[1]-Je],["AU_CK_01",O[2]-O[0]],["AU_CK_1",O[2]-O[1]],["AU_CK_2",O[3]-O[2]],["AU_DEEP_G",bc],["AU_PROMPT_LOW",Ic],["AU_HEM_GAIN",Gc],["AU_HEM_ISOFT",1/Si]].map(([e,t])=>`const float ${e} = ${u(t)};
`).join("")+$("AU_DEEP_LO",on.map(e=>256-e))+$("AU_DEEP_K",on.map(e=>(mt[1]-mt[0])/Math.max(1,e)))+$("AU_DEEP_M",Mi)+$("AU_HEM_SHARE",wi)+$("AU_HEM_THR",Jc)+$("AU_CFWHM",Ri.flatMap(e=>Array.from(e,t=>t/2.3548200450309493)))+$("AU_WNORM",Wc)+`const float AU_THICK_A = ${u(Kc)};
const float AU_THICK_F = ${u(Hc)};
`+$("AU_ZDIFFUSE",il)+`const float AU_FAR = ${u(Zc)};
const float AU_FAR_KM = ${u(Qc)};
`+$("AU_SKIRT",Xc)+`const float AU_SKIRT_W0 = ${u(Bc)};
const float AU_SKIRT_K = ${u(Yc)};
const float AU_SKIRT_OFF = ${u(Vc)};
`+[["AU_FOLD_CTR0",Qa[0]],["AU_FOLD_CTRD",Qa[1]/255],["AU_FOLD_W0",go[0]],["AU_FOLD_DW",(go[1]-go[0])/255],["AU_FOLD_R2",Qo[1]**2],["AU_FOLD_IRF",1/(Qo[1]**2-Qo[0]**2)],["AU_BREAK_PLEAT",uc],["AU_CMEANDER",pc]].map(([e,t])=>`const float ${e} = ${u(t)};
`).join(""),v1=()=>A1()+`
// The level index (u_auArcY slot 11, the same in every class).
int auLevel() { return int(arcV(11) + 0.5); }
// The arcs' band at xn for level lv (aurora-morph.ts arcBand; the caller subtracts the class's band shift). Round 10: the
// poleward edges moved by a wave's widening u_auFold[5].x (km).
float arcBand(float xn, int lv) { int b = lv * 4; return smooth01((xn - AU_OVAL[b]) / (AU_OVAL[b + 1] - AU_OVAL[b])) * smooth01((AU_OVAL[b + 3] + u_auFold[5].x - xn) / (AU_OVAL[b + 3] - AU_OVAL[b + 2])); }
// Four channels of 1-D value noise in [0, 1] at u (lattice units), seed h (aurora-morph.ts noise4): lattice mod 4096.
// A node's four channels: channel n swings between the hash's byte n and byte n + 1 (mod 4) on a smoothed triangle wave of
// tau + the node's phase (byte 2 / 256) + n/4 (aurora-morph.ts noise4, round 5).
vec4 noiseNode(uint a, float tau) {
  vec4 b = vec4(float(a & 255u), float((a >> 8u) & 255u), float((a >> 16u) & 255u), float(a >> 24u));
  vec4 m = fract(tau + b.z * (1.0 / 256.0) + vec4(0.0, 0.25, 0.5, 0.75));
  vec4 t = 1.0 - abs(2.0 * m - 1.0);
  return (b + (b.yzwx - b) * (t * t * (3.0 - 2.0 * t))) * (1.0 / 255.0);
}
vec4 noise4(uint h, float u, float tau, int whole) {
  float fi = floor(u), f = u - fi, s = f * f * (3.0 - 2.0 * f);
  int i = int(fi) + whole;
  vec4 va = noiseNode(hashU(h ^ (uint(i & 4095) * 0x27d4eb2du)), tau), vb = noiseNode(hashU(h ^ (uint((i + 1) & 4095) * 0x27d4eb2du)), tau);
  return va + (vb - va) * s;
}
vec2 smooth01(vec2 x) { vec2 t = clamp(x, 0.0, 1.0); return t * t * (3.0 - 2.0 * t); }
// Round 14 (aurora-morph.ts noiseFlow): node i of seed h, its value crossfading between the hashes of its lives eb + ⌊lf + φᵢ⌋
// and the next (φᵢ the node's own phase); the four 8-bit channels in [0, 1].
vec4 flowNode(uint h, int i, float lf, int eb) {
  uint ci = uint(i & 4095), hi = h ^ (ci * 0x27d4eb2du);
  float lam = lf + float((ci * 0x9e3779b1u) >> 20u) * (1.0 / 4096.0), el = floor(lam), w = lam - el;
  int e = eb + int(el);
  uint a = hashU(hi ^ (uint(e) * 0x165667b1u)), b = hashU(hi ^ (uint(e + 1) * 0x165667b1u));
  vec4 va = vec4(float(a & 255u), float((a >> 8u) & 255u), float((a >> 16u) & 255u), float(a >> 24u));
  vec4 vb = vec4(float(b & 255u), float((b >> 8u) & 255u), float((b >> 16u) & 255u), float(b >> 24u));
  float s = w * w * (3.0 - 2.0 * w);
  return clamp(0.5 + ((va + (vb - va) * s) * (1.0 / 255.0) - 0.5) * inversesqrt((1.0 - s) * (1.0 - s) + s * s), 0.0, 1.0);
}
// Value noise at u (lattice units) in an arc's moving frame u + sm·(wh + f), its nodes living at lk·|sm| lives per unit travelled.
vec4 noiseFlow(uint h, float u, float f, int wh, int sm, int lk) {
  int m = sm < 0 ? -sm : sm;
  float p = u + float(sm) * f, fi = floor(p), s = p - fi;
  s = s * s * (3.0 - 2.0 * s);
  int i = int(fi) + sm * wh, eb = lk * m * wh;
  float lf = float(lk * m) * f;
  vec4 va = flowNode(h, i, lf, eb), vb = flowNode(h, i + 1, lf, eb);
  return va + (vb - va) * s;
}
// Round 16 (cost): foldEvents' event of cell c (its life's hash, centre, half-width, A·E, phase; B its break) and its
// packet at xi (foldEvents' terms one by one), and the three curtain nodes' events from shared cells.
vec4 foldCell(uint h, float c, float f, int wh, int sm, int lv, out float B) {
  int m = sm < 0 ? -sm : sm, cg = int(c) + sm * wh;
  uint ci = uint(cg & 4095);
  float lam = float(AU_FOLD_LIFE * m) * f + float((ci * 0x85ebca77u) >> 20u) * (1.0 / 4096.0), el = floor(lam), a = lam - el;
  int e = AU_FOLD_LIFE * m * wh + int(el);
  uint H = hashU(h ^ (ci * 0x27d4eb2du) ^ (uint(e) * 0x165667b1u));
  float A = AU_FOLD_KM[lv] * (0.35 + 0.65 / 255.0 * float(H & 255u)) * ((H & 0x80000000u) != 0u ? -1.0 : 1.0);
  float E = smooth01(a * ${u(1/cc)}) * (1.0 - smooth01((a - ${u(Mo[0])}) * ${u(1/(Mo[1]-Mo[0]))}));
  B = smooth01((a - ${u(rt[0])}) * ${u(1/(rt[1]-rt[0]))}) * (1.0 - smooth01((a - ${u(rt[2])}) * ${u(1/(1-rt[2]))}));
  return vec4(c + AU_FOLD_CTR0 + AU_FOLD_CTRD * float((H >> 8u) & 255u), AU_FOLD_W0 + AU_FOLD_DW * float((H >> 16u) & 255u), A * E, float((H >> 24u) & 127u) * ${u(2*Math.PI/128)});
}
vec2 foldAt(float xi, vec4 P, float B) {
  float d = xi - P.x, z = d / P.y, g = exp(-z * z) * smooth01((AU_FOLD_R2 - d * d) * AU_FOLD_IRF);
  return vec2(P.z * cosR(${u(hc)} * z + P.w), B) * g;
}
void foldEvents3(uint h, vec3 xi, float f, int wh, int sm, int lv, out vec2 fe1, out vec2 fe2, out vec2 fe3) {
  vec3 c0 = floor(xi - 0.5);
  float cm = min(c0.x, min(c0.y, c0.z));
  {
    float B0, B1, B2;
    vec4 P0 = foldCell(h, cm, f, wh, sm, lv, B0), P1 = foldCell(h, cm + 1.0, f, wh, sm, lv, B1), P2 = foldCell(h, cm + 2.0, f, wh, sm, lv, B2);
    // Each node's two cells (its own c0 and c0 + 1) picked, then foldEvents' two packets.
    bool l1 = c0.x == cm, l2 = c0.y == cm, l3 = c0.z == cm;
    fe1 = foldAt(xi.x, l1 ? P0 : P1, l1 ? B0 : B1) + foldAt(xi.x, l1 ? P1 : P2, l1 ? B1 : B2);
    fe2 = foldAt(xi.y, l2 ? P0 : P1, l2 ? B0 : B1) + foldAt(xi.y, l2 ? P1 : P2, l2 ? B1 : B2);
    fe3 = foldAt(xi.z, l3 ? P0 : P1, l3 ? B0 : B1) + foldAt(xi.z, l3 ? P1 : P2, l3 ? B1 : B2);
  }
}
// Round 16 (aurora-morph.ts redTrail, redAttr): a shell's red trail (L km, ρ) at height h; the rays' lattice (rayAttr's
// nodes and frame) as (g·T2, T2), deviations × att.
vec2 redTrail(float h) {
  float L = ${u(lc)} / (${u(e0)} + ${u(t0)} * exp((200.0 - h) * ${u(1/o0)}));
  return vec2(L, inversesqrt(1.0 + L * ${u(2/a0)}));
}
vec2 redAttr(uint h, float x, float f, int wh, int sf, float att) {
  float p = x * ${u(1/$e)} + float(sf * ${ge/$e}) * f, fi = floor(p), s = p - fi;
  s = s * s * (3.0 - 2.0 * s);
  int ia = (int(fi) + sf * ${ge/$e} * wh) & ${dn};
  int ib = (ia + 1) & ${dn};
  uint a = hashU(h ^ (uint(ia) * 0x2f8a63c1u)), b = hashU(h ^ (uint(ib) * 0x2f8a63c1u));
  float ta = AU_RT2[int((a >> 8u) & 15u)], tb = AU_RT2[int((b >> 8u) & 15u)];
  vec2 va = vec2(AU_RG[int((a >> 16u) & 15u)] * ta, ta), vb = vec2(AU_RG[int((b >> 16u) & 15u)] * tb, tb);
  return 1.0 + (va + (vb - va) * s - 1.0) * att;
}
${p1()}${d1()}
// Round 8: (cos x, sin x) of four angles (sinCosR's reduction and series, vectorised; the quadrant by steps).
vec4 sinSeries(vec4 r) { vec4 r2 = r * r; return r * (1.0 - r2 * (0.166666667 - r2 * (0.00833333333 - r2 * (1.98412698e-4 - r2 * 2.75573192e-6)))); }
vec4 cosSeries(vec4 r) { vec4 r2 = r * r; return 1.0 - r2 * (0.5 - r2 * (0.0416666667 - r2 * (0.00138888889 - r2 * (2.48015873e-5 - r2 * 2.75573192e-7)))); }
void sinCos4(vec4 x, out vec4 c, out vec4 s) {
  vec4 k = floor(x * 0.636619772 + 0.5), r = (x - k * 1.5703125) - k * 4.83826795e-4, q = k - 4.0 * floor(k * 0.25);
  vec4 s0 = sinSeries(r), c0 = cosSeries(r), odd = step(0.5, q) - step(1.5, q) + step(2.5, q);
  s = (1.0 - 2.0 * step(1.5, q)) * mix(s0, c0, odd);
  c = (1.0 - 2.0 * (step(0.5, q) - step(2.5, q))) * mix(c0, s0, odd);
}
// The vortex (aurora-morph.ts swirlAt): (x_n, x_e) turned about u_auFold[3] by u_auFold[4].x · exp(−r² · u_auFold[4].y).
void swirl4(inout vec4 xn, inout vec4 xe) {
  vec4 dn = xn - u_auFold[3].x, de = xe - u_auFold[3].y, c, s;
  sinCos4(u_auFold[4].x * exp(-(dn * dn + de * de) * u_auFold[4].y), c, s);
  xn = u_auFold[3].x + c * dn - s * de; xe = u_auFold[3].y + s * dn + c * de;
}
// The common warp (aurora-morph.ts warpAt): Σ_m (A cos Φ) cos θ + (A sin Φ) sin θ, θ = K_m x_e + κ_m x_n.
// Round 9 (warpParts): also the 620 / 310 km terms' A cos(θ − Φ), A sin(θ − Φ) (x1, y1, x2, y2: the layers' shifts).
vec4 auWarp4(vec4 xn, vec4 xe, out vec4 x1, out vec4 y1, out vec4 x2, out vec4 y2) {
  vec4 c, s;
  sinCos4(AU_FOLD_K[0] * xe + AU_WARP_KAPPA[0] * xn, c, s);
  vec4 w = u_auFold[0].x * c + u_auFold[0].y * s;
  sinCos4(AU_FOLD_K[1] * xe + AU_WARP_KAPPA[1] * xn, c, s);
  x1 = u_auFold[1].x * c + u_auFold[1].y * s; y1 = u_auFold[1].x * s - u_auFold[1].y * c;
  sinCos4(AU_FOLD_K[2] * xe + AU_WARP_KAPPA[2] * xn, c, s);
  x2 = u_auFold[2].x * c + u_auFold[2].y * s; y2 = u_auFold[2].x * s - u_auFold[2].y * c;
  return w + x1 + x2;
}
// The pulsating zone of classes 0 and 1: its diffuse glow × (1 + the patches' lifts) (aurora-morph.ts morphAt's patch part).
// The pulsating zone's band at xn (aurora-morph.ts patchMask).
float patchMask(float xn, int lv) {
  int pb = lv * 4;
  return smooth01((AU_PBAND[pb] - xn) / (AU_PBAND[pb] - AU_PBAND[pb + 1])) * smooth01((xn - AU_PBAND[pb + 3]) / (AU_PBAND[pb + 2] - AU_PBAND[pb + 3]));
}
// Round 7: the band's value given (the mean over the E profile's nodes), the patches at (xn, xe).
vec2 patchSum(float mask, float xn, float xe, int lv) {
  vec2 patches = vec2(0.0);
  if (mask > 0.0) {
    int cx = int(floor(xe / AU_PATCH_CELL)), cy = int(floor(xn / AU_PATCH_CELL));
    for (int dy = -1; dy <= 1; dy++) for (int dx = -1; dx <= 1; dx++) {
      uint h = hashU(uint(cx + dx + 1024) * 65536u + uint(cy + dy + 1024));
      float px = (float(cx + dx) + 0.2 + 0.6 * hashF(h ^ 0x68e31da4u)) * AU_PATCH_CELL, py = (float(cy + dy) + 0.2 + 0.6 * hashF(h ^ 0xb5297a4du)) * AU_PATCH_CELL;
      // Round 16 (cost): beyond the patch's reach its cut is 0 — skip its size, period and harmonics.
      if ((xe - px) * (xe - px) + (xn - py) * (xn - py) >= AU_PATCH_REACH2) continue;
      float rn = AU_PATCH_RN0 + AU_PATCH_DRN * hashF(h ^ 0x1b56c4e9u), re = AU_PATCH_ASPECT * rn;
      uint hj = hashU(h ^ 0x7f4a7c15u);
      int j = int(hj % 4u), q = int(hashU(h ^ 0x2545f491u) % 8u);
      float a = AU_PATCH_A0 + AU_PATCH_DA * float((hj >> 8u) & 255u);
      vec2 s = vec2(0.0);
      for (int n = 0; n < AU_HARMONICS; n++) {
        float sn = AU_PH_S[n * 8 + q], cn = AU_PH_C[n * 8 + q];
        vec2 a0 = u_auPatch[j * 3 + n], a1 = u_auPatch[(4 + j) * 3 + n];
        s += vec2(sn * a0.x + cn * a0.y, sn * a1.x + cn * a1.y);
      }
      vec2 on = clamp(AU_PATCH_DUTY + s, 0.0, 1.0);
      float ddx = xe - px, ddy = xn - py, e2 = ddx * ddx + ddy * ddy;
      float cut = smooth01((AU_PATCH_REACH2 - e2) / (AU_PATCH_REACH2 - AU_PATCH_FADE2));
      patches += on * (a * exp(-(ddx * ddx / (re * re) + ddy * ddy / (rn * rn))) * cut);
    }
  }
  return (AU_ZDIFFUSE[lv] * (1.0 + u_auFold[6].x) * mask) * (1.0 + patches);
}
// Obliquity 1/cos(chi) at a thin shell of height h (km), sin(elevation) sinE (aurora-morph.ts shellObliquity).
float shellObliquity(float sinE, float h) {
  float c = AU_R * sqrt(max(0.0, 1.0 - sinE * sinE)) / (AU_R + h);
  return 1.0 / sqrt(max(1e-6, 1.0 - c * c));
}
// A shell's crossing: (ground distance to its sub-point, slant distance L) km (aurora-morph.ts zoneSlantMorph).
vec2 shellGL(float h, float up, float ch) {
  float ru = AU_R * up;
  float L = (2.0 * AU_R * h + h * h) / (ru + sqrt(ru * ru + 2.0 * AU_R * h + h * h));
  return vec2(AU_R * atanP(L * ch, AU_R + L * up), L);
}
// A shell's sample: its ground distance kept within the merge limit of the middle shell's gm (third round), carried down the
// field to 110 km: (x_n, x_e, the east–west footprint L·PREFILTER_RAD, the north–south one with the slab's spread).
vec4 shellSample(float h, vec2 gl, float gm, float ob, float hn, float he, float slab) {
  float c2 = hn * hn * (ob * ob - 1.0), sx = gl.y * AU_PREFILTER, sn = sqrt(sx * sx * (1.0 + c2) + slab * slab * c2);
  float sp = min(AU_ARC_PRECAP, sn), lim = AU_MERGE_K * sqrt(AU_MERGE_S * AU_MERGE_S + sp * sp) / max(abs(hn), 0.05);
  float g = gm + clamp(gl.x - gm, -lim, lim);
  return vec4(g * hn + (h - AU_REF_H) * u_auCotDip, g * he, sx, sn);
}
// Auroral zone: the slant columns (prompt, 557.7, 630.0) along (east, north, up) (aurora-morph.ts zoneSlantMorph, three classes).
vec3 zoneMorph(float east, float north, float up) {
  float ch = sqrt(east * east + north * north);
  float hn = ch > 1e-9 ? north / ch : 1.0, he = ch > 1e-9 ? east / ch : 0.0;
  vec3 m = vec3(0.0);
  // E (round 7): the arcs as standing curtains through the profile's nodes (curtainE), the pulsating zone once at the
  // reference foot × the profile's slant. The arcs' north–south footprint at a node: × √(1 + ĥn²(o² − 1)) of the east–west
  // one, o the chord obliquity of its pieces.
${_1()}
  int lv = auLevel();
  float xb = xw - arcV(9);
  vec2 cE = vec2(0.0);
  // Round 12b: the vortex's shear at the reference foot (aurora-morph.ts vortexStrain).
  float vs = 0.0;
  if (u_auFold[4].x != 0.0) { float dn = xr - u_auFold[3].x, de = xer - u_auFold[3].y, u = (dn * dn + de * de) * u_auFold[4].y; vs = abs(u_auFold[4].x) * (2.0 * u + ${u(nc)}) * exp(-u); }
  // Outside the oval's reach of every arc the cut admits (180 km + drift + the 557.7's lag): nothing to draw.
  if (!(xb + 200.0 <= AU_OVAL[lv * 4] || xb - 200.0 >= AU_OVAL[lv * 4 + 3] + u_auFold[5].x)) cE = curtainE(XW, XQ, LL, SN, FA, xw, lv, slant, snr, WX1, WY1, WX2, WY2, vs, LLo, dXo);
  float pm = (${Array.from(O,(e,t)=>`patchMask(XN.${Fo[t]}, lv)`).join(" + ")}) * ${u(1/O.length)};
  // Round 18 (B9, aurora-morph.ts patchFoot): the pulsating layer read at ZONE_PATCH_KM.
  m.xy = cE + slant * patchSum(pm, ${jo>=O[0]?"xr, xer":`XN.x + dXo * ${u((O[0]-jo)/(O[0]-Je))}, XE.x + dEo * ${u((O[0]-jo)/(O[0]-Je))}`}, lv);
  // F: the shells (crossings merged towards the middle one's, slab spreads AU_SLAB_F).
  vec2 f0 = shellGL(AU_SHELL_KM[3], up, ch);
  vec2 f1 = AU_NS_F > 1 ? shellGL(AU_SHELL_KM[4], up, ch) : f0;
  vec2 f2 = AU_NS_F > 2 ? shellGL(AU_SHELL_KM[5], up, ch) : f1;
  float gmF = AU_NS_F == 3 ? f1.x : AU_NS_F == 2 ? 0.5 * (f0.x + f1.x) : f0.x;
  // Round 8: the vortex and the warp once at the middle crossing, as a shift of every shell (aurora-morph.ts zoneSlantMorph).
  float qn = gmF * hn, qe = gmF * he, wf = 0.0;
  if (u_auFold[4].x != 0.0) {
    float dn = qn - u_auFold[3].x, de = qe - u_auFold[3].y;
    vec2 cs = sinCosR(u_auFold[4].x * exp(-(dn * dn + de * de) * u_auFold[4].y));
    qn = u_auFold[3].x + cs.x * dn - cs.y * de; qe = u_auFold[3].y + cs.y * dn + cs.x * de;
  }
  // Round 14: the 620 / 310 km terms' A cos(θ − Φ), A sin(θ − Φ) kept (lw: the arcs' layer shifts, aurora-morph.ts warpParts).
  vec4 lw = vec4(0.0);
  for (int i = 0; i < AU_FOLDS; i++) {
    vec2 cs = sinCosR(AU_FOLD_K[i] * qe + AU_WARP_KAPPA[i] * qn);
    vec2 xy = vec2(u_auFold[i].x * cs.x + u_auFold[i].y * cs.y, u_auFold[i].x * cs.y - u_auFold[i].y * cs.x);
    wf += xy.x;
    if (i == 1) lw.xy = xy; else if (i == 2) lw.zw = xy;
  }
  float dNF = qn - wf - gmF * hn, dEF = qe - gmF * he;
  // Round 16: the shells' samples (x_n − the arcs' origin, x_e, the pre-filters, weight × obliquity × band, place in the
  // layer, red trail), then all shells in one pass over the arcs (aurora-morph.ts zoneSlantMorph, arcSumF3).
  vec3 FXG = vec3(0.0), FXE = vec3(0.0), FSN2 = vec3(0.0), FFA = vec3(0.0), FWB = vec3(0.0), FTOP = vec3(0.0), FRL = vec3(0.0), FRR = vec3(0.0);
${[0,1,2].map(e=>{const t=Fo[e];return`  if (${e} < AU_NS_F) {
    float h = AU_SHELL_KM[${3+e}], ob = shellObliquity(up, h);
    vec4 x = shellSample(h, f${e}, gmF, ob, hn, he, AU_SHELL_SLAB[${3+e}]);
    float xn = x.x + dNF, fk = AU_FOLD_PRE * x.z, snc = min(AU_ARC_PRECAP, x.w);
    vec2 rd = redTrail(h);
    FXG.${t} = xn - arcV(32); FXE.${t} = x.y + dEF; FSN2.${t} = snc * snc; FFA.${t} = exp(-0.5 * fk * fk);
    FWB.${t} = AU_SHELL_W[${3+e}] * ob * arcBand(xn - arcV(41), lv); FTOP.${t} = AU_SHELL_TOP[${3+e}]; FRL.${t} = rd.x; FRR.${t} = rd.y * exp(-0.5 * AU_RAYID_K2 * x.z * x.z);
  }`}).join(`
`)}
  m.z = arcSumF3(FXG, FXE, FSN2, FFA, FWB, FTOP, FRL, FRR, lw, lv);
  return m;
}
`,g1=e=>{const t=I=>u(1/I),o=El,a=Ll,n=2*Math.PI,r=bn,i=jl,[s,l,c,h]=gl,[m,p,d]=yl,[_,x,f,v]=pl,[g,y,M,b,w]=xl,[R,T,N]=Al,[S,L,F,k]=vl,D=e?`(1.0 - ${u(F)} * smooth01((${u(S)} - x0) * ${t(L)}) * (1.0 - ${u(k)} * corona)) * `:"";return`
const int AU_LOW_SHEETS = ${e?cl:Rn};
const float AU_LOW_PREFILTER = ${u(e?_t:ti)};
${$("AU_LOW_TOPLV",ul)}${$("AU_LOW_DK",Pl)}${$("AU_LOW_BK",zl)}
// z in [-1, 1] from the byte at bit s of w: its two nibbles summed (aurora-morph.ts zNib).
float zNib(uint w, uint s) { return float(((w >> s) & 15u) + ((w >> (s + 4u)) & 15u)) * ${t(15)} - 1.0; }
float lowP(int i) { return u_auPillar[i >> 1][i & 1]; }
float lowB(int i) { return u_auBundle[i >> 1][i & 1]; }
// The rays' soft knee x/sqrt(1 + x²/κ²), ik2 = 1/κ² (aurora-morph.ts lowKnee).
float lowKnee(float x, float ik2) { return x * inversesqrt(1.0 + x * x * ik2); }
// Curtain-local source; mirrors precipitationProfile in aurora-morph.ts.
float precipitationNoise(float x, float invKm, float period, uint seed) {
  float t = x * invKm, cell = floor(t), f = t - cell;
  uint a = hashU(uint(mod(cell, period)) * 65536u + seed);
  uint b = hashU(uint(mod(cell + 1.0, period)) * 65536u + seed);
  float va = float(a & 255u) * ${u(2/255)} - 1.0, vb = float(b & 255u) * ${u(2/255)} - 1.0;
  float da = float((a >> 8u) & 255u) * ${u(3/255)} - 1.5, db = float((b >> 8u) & 255u) * ${u(3/255)} - 1.5;
  return mix(va, vb, smooth01(f)) + f * (1.0 - f) * ((1.0 - f) * da - f * db);
}
float precipitationFilter(float q) {
  float d = 1.0 + q * q;
  return 1.0 / (d * d);
}
vec3 precipitationProfile(float xs, float h, float sx, float sh, float driftKm, float travelKm,
    float lifePhase, float swingPhase, uint seed, float top, float nozzleKm, float nozzleMix, float shortTail, float threads) {
  float x = xs - travelKm;
  float a = precipitationNoise(x + 19.7, ${t(o[0])}, ${u(Vt/o[0])}, seed + 11u);
  float b = precipitationNoise(x - 51.3, ${t(o[1])}, ${u(Vt/o[1])}, seed + 61u);
  float c = precipitationNoise(x + 6.7, ${t(o[2])}, ${u(Vt/o[2])}, seed + 131u);
  float pa = precipitationFilter(sx * ${u(1.6/o[0])}), pb = precipitationFilter(sx * ${u(1.6/o[1])}), pc = precipitationFilter(sx * ${u(1.6/o[2])});
  float logFlux = ${u(a[0])} * pa * a + ${u(a[1])} * pb * b + ${u(a[2])} * pc * c;
  float missingVar = ${u(a[0]**2)} * (1.0 - pa * pa) + ${u(a[1]**2)} * (1.0 - pb * pb) + ${u(a[2]**2)} * (1.0 - pc * pc);
  float flux = exp(${u(Ya)} * logFlux + ${u(.5*Ya**2*kl)} * missingVar);
  float hardness = smooth01(0.48 + 0.43 * logFlux);
  float dr = h - (176.0 - 36.0 * hardness + 6.0 * b * pb), dp = h - (${u(r+8)} - 16.0 * hardness);
  float nozzle = nozzleKm - ${u(Ao[2])} * hardness + ${u(qa[0])} * b * pb + ${u(qa[1])} * c * pc;
  float tailCut = shortTail * (1.0 - ${u(Tl)} * nozzleMix);
  float redUp = (49.0 + 61.0 * smooth01(0.5 + 0.42 * b * pb + 0.28 * logFlux)) * top * (1.0 - ${u(Ba[0])} * tailCut);
  float above = max(0.0, dr), below = min(0.0, dr), pBelow = min(0.0, dp), width = 25.0 + 7.0 * hardness;
  float taper = smooth01(above * ${t(105)}), upper = nozzleMix * smooth01((h - nozzle - 14.0) * ${t(58)});
  float fineFoot = precipitationFilter(sx * ${u(1.6/o[3])}), thinFoot = precipitationFilter(sx * ${u(1.6/o[4])});
  float ridge = 0.0, modulation = 0.0, fineGain = 1.0, coverage = 0.0;
  if (fineFoot > 0.003) {
    float u = xs - driftKm + ${u(Fl)} * c, f = precipitationNoise(u + 2.4, ${t(o[3])}, ${u(Vt/o[3])}, seed + 193u);
    float g = thinFoot > 0.003 ? precipitationNoise(u - 1.1, ${t(o[4])}, ${u(Vt/o[4])}, seed + 269u) : 0.0;
    float thin = thinFoot / fineFoot * g;
    float detail = ${u(a[3])} * f + ${u(a[4])} * (1.0 + ${u(Ul)} * upper) * thin;
    float fluxGate = smooth01(0.60 + 0.53 * logFlux);
    float resolved = smooth01((fineFoot - 0.003) * ${t(.018)});
    float gate = (fluxGate + upper * (0.66 - 0.76 * fluxGate)) * resolved;
    modulation = gate * fineFoot;
    ridge = modulation * smooth01((detail + 0.16 - 0.28 * taper) * ${t(1.02)});
    float contrast = ${u(Ra[0])} * fineFoot * f + ${u(Ra[1])} * thinFoot * g;
    fineGain += ${u(Ra[2])} * upper * contrast * inversesqrt(1.0 + contrast * contrast);
    if (threads > 0.0) {
      float fineShare = ${u(Yt[0])} + ${u(Yt[1])} * f * inversesqrt(1.0 + f * f);
      float thinShare = ${u(Yt[2])} + ${u(Yt[3])} * thin * inversesqrt(0.22 + thin * thin);
      coverage = ${u(Yt[4])} * fineFoot / (fineFoot + ${u(Yt[5])}) * fineShare * thinShare * resolved;
    }
  }
  float phase = fract(lifePhase + 0.37 * a + 0.29 * b + float(seed) * ${t(601)});
  float lifeR = smooth01(min(phase - ${u(Gl)}, 1.0 - phase) * ${t($l)});
  float lifeP = smooth01(min(phase, ${u(Dl)} - phase) * ${t(Il)});
  float swing = cosR(${u(n)} * (swingPhase + 0.32 * a + float(seed) * ${t(911)}));
  float redShape = exp(-above * above / ((above + 25.0) * redUp) - 0.5 * below * below / (width * width + sh * sh));
  float root = mix(dr + 23.0, h - nozzle, nozzleMix);
  float rootSigma = mix(17.0 + 7.0 * hardness + 5.0 * smooth01(root * ${t(35)}), 14.0 + 4.0 * hardness, nozzleMix);
  float invRootSigma = inversesqrt(rootSigma * rootSigma + sh * sh), zRoot = root * invRootSigma;
  float rootQ2 = zRoot * zRoot, core = exp(-0.5 * rootQ2);
  float wing = 1.0 - smooth01((rootQ2 - ${u(Sa[0])}) * ${t(Sa[1]-Sa[0])});
  float rootProfile = mix(core, fineGain / (1.0 + ${u(pr[0])} * rootQ2), step(0.0, root) * ${u(pr[1])} * nozzleMix * wing)
    + ${u(Ml)} * nozzleMix * core;
  float redRoot = rootSigma * invRootSigma * rootProfile;
  float rootGate = smooth01((logFlux + 0.22 + 0.50 * b * pb + 0.35 * c * pc) * 0.95);
  float redNozzle = 21.0 * rootGate * smooth01((nozzle - 85.0) * ${t(45)});
  float promptNozzle = (39.0 + 54.0 * smooth01((125.0 - nozzle) * ${t(35)})) * rootGate;
  float promptUp = (36.0 + 14.0 * hardness) * (1.0 - ${u(Ba[1])} * tailCut);
  float promptShape = exp(-max(0.0,dp) / promptUp - 0.5 * pBelow * pBelow / (256.0 + sh * sh));
  float decayHeight = max(0.0, h - nozzle - 23.0) * (1.0 - ${u(Nl)} * nozzleMix) / (51.0 + 27.0 * hardness);
  float rayFade = mix(1.0, 1.0 / (1.0 + decayHeight * (1.0 + 0.5 * decayHeight)), nozzleMix);
  float rootLift = 1.0 + 0.32 * nozzleMix * ridge;
  float columnGain = fineGain / (1.0 + ${u(Cl)} * upper * max(0.0, logFlux));
  float stem = ((0.25 - 0.16 * nozzleMix) * (1.0 - 0.8 * modulation) + 1.03 * ridge * rayFade + 0.12 * (1.0 - shortTail)) * columnGain;
  float promptStem = (0.72 - 0.62 * modulation + 1.43 * ridge * rayFade + 0.12 * (1.0 - shortTail)) * columnGain;
  return vec3(flux * vec2((0.74 + 0.26 * lifeR) * (1.0 + 0.07 * swing) * (redRoot * rootLift * mix(0.12 + 1.85 * rootGate, redNozzle, nozzleMix) + redShape * stem),
    (0.61 + 0.39 * lifeP) * (1.0 + 0.21 * swing) * (promptShape * promptStem + nozzleMix * promptNozzle * redRoot * rootLift)), coverage);
}
// The flame waves on curtain s at x_s, height H (aurora-morph.ts flameLow; u_auFold[7].xy, [8].x the clocks, [8].y the window factor).
float flameLow(int s, float xs, float H) {
  float xc = xs * ${t(gr)}, c0 = floor(xc), dl = xc - c0 - 0.5, tp = cosR(${u(Math.PI)} * dl), sum = 0.0;
  for (int i = 0; i < 2; i++) {
    float cf = i == 0 ? c0 : c0 + (dl >= 0.0 ? 1.0 : -1.0), tap = 0.5 + (i == 0 ? 0.5 : -0.5) * tp;
    uint h = hashU(uint(int(cf) & 4095) * 65536u + (9541u + 131u * uint(s)));
    int j = int((h >> 13u) % 3u);
    float x0 = (j == 0 ? u_auFold[7].x : j == 1 ? u_auFold[7].y : u_auFold[8].x) + float((h >> 26u) & 7u) * 0.125, ep = floor(x0), ph = x0 - ep;
    uint hp = hashU(h ^ (uint(ep) * 0x9e3779b1u)), hq = (hp * 0x2c1b3c6du) ^ (hp >> 16u);
    if (float((hq >> 24u) & 255u) >= ${u(256*Eo)}) continue;
    float P = j == 0 ? ${u(ft[0])} : j == 1 ? ${u(ft[1])} : ${u(ft[2])};
    float lam = ${u(gr)} * (1.0 + ${u(We[4])} * zNib(hp, 24u));
    float lobe = 0.5 + 0.5 * cosR(${u(n)} * xs / lam + float(hq & 255u) * ${u(n/256)});
    float tau = (ph - ${u(ja)}) * P - ${u(ii)} * cosR(${u(n/.618)} * xs / lam + float((hq >> 8u) & 255u) * ${u(n/256)});
    float q = (H - ${u(r-i)} - ${u(ri)} * tau) * ${t(i)}, b = max(0.0, 1.0 - q * q);
    sum += tap * (1.0 + ${u(We[1])} * zNib(hq, 16u)) * lobe * (0.5 - 0.5 * cosR(${u(n)} * ph)) * b * b;
  }
  return u_auFold[8].y * ${u(Ql)} * sum * exp(-max(0.0, H - ${u(r)}) * ${t(Zl)});
}
// Low latitude: (prompt, 557.7, 630.0) along (east, north, up) (aurora-morph.ts lowColumns).
vec3 lowMorph(float east, float north, float up) {
  float a = east * u_auLow.x + north * u_auLow.y, b = east * u_auLow.y - north * u_auLow.x, ru = AU_R * up, ru2 = ru * ru;
  float kLo = lowB(0), kHi = lowB(1), dc0 = a + lowB(2) * up, bb = b * b * ${u(.5/po)}, ce = AU_R * sqrt(max(0.0, 1.0 - up * up));
  // The diffuse band: each shell's crossing in G0 and its mask (x: E, the green under the band; y: the red).
  vec2 dif = vec2(0.0);
  for (int i = 0; i < 3; i++) {
    if (i < AU_NS_F) {
      float h = AU_SHELL_KM[6 + i], L = (2.0 * AU_R * h + h * h) / (ru + sqrt(ru2 + 2.0 * AU_R * h + h * h)), G = L * dc0 - L * L * bb, c = ce * AU_INV_RH[6 + i];
      float m = smooth01((G - kLo) * ${t(mo[0])} + ${u(mr)}) * smooth01((kHi - G) * ${t(mo[1])} + 0.5);
      if (m > 0.0) dif.y += AU_SHELL_W[6 + i] * inversesqrt(max(1e-6, 1.0 - c * c)) * m;
    }
    if (i < AU_NS_E) {
      float h = AU_SHELL_KM[i], L = (2.0 * AU_R * h + h * h) / (ru + sqrt(ru2 + 2.0 * AU_R * h + h * h)), G = L * dc0 - L * L * bb, c = ce * AU_INV_RH[i];
      float m = smooth01((G - kLo) * ${t(mo[0])} + ${u(mr)}) * smooth01((kHi - G) * ${t(mo[1])} + 0.5);
      if (m > 0.0) dif.x += AU_SHELL_W[i] * inversesqrt(max(1e-6, 1.0 - c * c)) * m;
    }
  }
  int lv = int(arcV(11) + 0.5);
  vec3 m = vec3(0.0), masked = vec3(0.0);
  float x0 = lowB(3);
  float nozzleMix = lv == 1 ? smooth01((x0 - ${u(s)}) * ${t(l-s)}) * smooth01((${u(h)} - x0) * ${t(h-c)}) : 0.0;
  float nozzleKm = ${u(Ao[0])} + ${u(Ao[1])} * (clamp(x0, ${u(l)}, ${u(c)}) - ${u(l)})
    - ${u(Ka[1])} * max(0.0, min(${u(c)}, x0) - ${u(Ka[0])})
    - ${u(d)} * smooth01((${u(m)} - x0) * ${t(p)});
  float farRedKnee = mix(${u(_o[0])}, ${u(Ha[0])}, nozzleMix);
  float farFootKnee = mix(${u(_o[1])}, ${u(Ha[1])}, nozzleMix);
  float corona = lowB(5);
  float nearWidth = (1.0 - ${u(b)} * corona) * smooth01((${u(g)} - x0) * ${t(y)});
  float rayPrefilter = AU_LOW_PREFILTER * (1.0 + ${u(M)} * nearWidth);
  float softFoot = ${u(w)} * nearWidth;
  float rayAngular = inversesqrt(max(0.05, 1.0 - b * b));
  float top = AU_LOW_TOPLV[lv], side = b + ${u(Da)} * up, side2 = side * side * ${u(.5/po)};
  for (int s = 0; s < AU_LOW_SHEETS; s++) {
    float K = lowB(6 + 3 * s), c = lowB(7 + 3 * s), w = lowB(8 + 3 * s), D = a + c * up, disc = D * D - 4.0 * side2 * K;
    if (!(disc > 0.0)) continue;
    float sq = sqrt(disc), sum = D + sq;
    float near = K > 0.0 && sum > 0.0 ? 2.0 * K / sum : 0.0;
    float far = K < 0.0 && D < 0.0 ? 2.0 * K / (D - sq)
      : sum > 0.0 && sum < side2 * ${u(2*Ga)} ? sum / (2.0 * side2) : 0.0;
    float slant = inversesqrt(disc + ${u(_l**2)}), grazingFade = smooth01(disc * ${t($a**2)}), grazing = grazingFade * slant;
    float thickness = ${u(dl)} * slant;
    float threads = corona * smooth01(-K * ${t(_)}) * grazingFade;
    float transverseThickness = thickness * (1.0 - ${u(x)} * threads);
    float sheetAngular = abs(side) / max(sq, ${u($a)});
    int id = ${e?"2 * s":"s"};
    for (int crossing = 0; crossing < 2; crossing++) {
      float L = crossing == 0 ? near : far;
      if (!(L > 0.0 && L < ${u(Ga)})) continue;
      float l2 = L * L + 2.0 * AU_R * L * up, H = l2 / (sqrt(l2 + AU_R * AU_R) + AU_R);
      if (!(H > ${u(Ia)} && H < ${u(bo)})) continue;
      float xs = L * side, bSlope = xs * ${t(po)}, cSlope = c - ${u(Da)} * bSlope;
      float gn = sqrt(1.0 + cSlope * cSlope + bSlope * bSlope);
      float edge = smooth01((H - ${u(Ia)}) * ${t(hl)}) * smooth01((${u(bo)} - H) * ${t(fl)});
      float ob = grazing * edge * gn, pitch = L * AU_LOW_PREFILTER;
      float angular = L * rayPrefilter * (rayAngular + sheetAngular * gn);
      float sx = length(vec3(angular, side * transverseThickness, softFoot)), sh = length(vec2(pitch, (ru + L) / (AU_R + H) * thickness));
      vec3 rays = precipitationProfile(xs, H, sx, sh, AU_LOW_DK[id] * lowP(0), AU_LOW_BK[id] * lowP(2),
        lowP(4), lowP(6), 1347u + 977u * uint(id), top, nozzleKm, nozzleMix, 1.0 - corona, threads);
      float nearCore = 1.0 - ${u(N)} * corona * smooth01((${u(R)} - L) * ${t(T)});
      float weight = w * nearCore;
      float covered = weight * (1.0 - ${u(1-f)} * threads * (1.0 - rays.z));
      float close = smooth01((${u(Rl)} - L) * ${t(bl)});
      float redKnee = mix(farRedKnee, ${u(Wa[0])}, close), footKnee = mix(farFootKnee, ${u(Wa[1])}, close);
      float red = lowKnee(ob * ${u(wl)} * u_auLow.w * rays.x, 1.0 / (redKnee * redKnee));
      float prompt = lowKnee(ob * ${u(Sl)} * u_auLow.w * rays.y, 1.0 / (footKnee * footKnee));
      float fl = u_auFold[8].y > 0.0 && H < ${u(Jl)} ? flameLow(id, xs, H) : 0.0;
      vec3 column = vec3(prompt * (1.0 + fl * vec2(1.0, AU_PULSE_GREEN)), red);
      m += covered * column;
      if (threads > 0.0) masked += (weight - covered) * column;
    }
  }
  if (corona > 0.0) {
    vec3 q = (m + masked) * vec3(${t(xo[1])}, ${t(xo[1])}, ${t(xo[0])});
    m *= mix(vec3(1.0), inversesqrt(vec3(1.0) + q * q), corona);
  }
  float diffuseGain = mix(1.0, ${u(Ol)}, nozzleMix) * (1.0 - ${u(v)} * corona * smooth01(-a * ${t(.6)}));
  return ${D}m + diffuseGain * vec3(${u(dr)} * dif.x, ${u(dr)} * dif.x, ${u(ml)} * dif.y);
}
// Close to the horizon the extinction table is steep. This polynomial is asin(up) through up^7;
// its truncation error below 0.25 is much smaller than the D3D11 built-in's error there.
float lowExtinctionIndex(float up) {
  if (up >= 0.25) return hzX(up);
  float q = up * up;
  float elevation = up * (1.0 + q * (0.1666666667 + q * (0.075 + q * 0.04464285714)));
  return sqrt(elevation * 0.63661977) * float(u_hzNodes - 1);
}
`},M1=e=>`
float auExt(int c, float x) {
  if (u_auExtOn == 0) return 1.0;
  int i0 = int(floor(x)), i1 = min(i0 + 1, u_hzNodes - 1);
  return mix(texelFetch(u_auExt, ivec2(i0, c), 0).r, texelFetch(u_auExt, ivec2(i1, c), 0).r, x - float(i0));
}
void main() {
  vec4 cd = cellDir(ivec2(gl_FragCoord.xy));
  if (cd.w == 0.0 || u_hzOn == 0) { o = vec4(0.0); return; }
  vec3 d = cd.xyz;
  float up = dot(d, u_zenith);
  if (!(up > 0.0)) { o = vec4(0.0); return; }
  if (up < u_hzEdgeMax) { if (up < hzEdge(d)) { o = vec4(0.0); return; } }
  float east = dot(d, u_hzEast), north = dot(d, u_hzNorth);
  vec3 m = ${e==="zone"?"zoneMorph":"lowMorph"}(east, north, up);
  float x = ${e==="zone"?"hzX(up)":"lowExtinctionIndex(up)"}, v = 0.0;
  for (int c = 0; c < 5; c++) {
    int k = u_auClass[c];
    v += u_auRate[c] * (k == 0 ? m.x : k == 1 ? m.y : m.z) * auExt(c, x);
  }
  if (u_cloudMode != 0) {
    float tn = cloudTauN(d);
    if (tn > 0.0) v *= min(u_auRatioCap, exp(min(tn, 80.0)) / (1.0 + u_cloudTau.y * tn));
  }
  o = vec4(v, 0.0, 0.0, 0.0);
}
`,Nn=(e,t,o,a)=>eo("STAR_SKY")+pt+Tn+ki+v0+m1(o)+x1(e,t)+(a==="zone"?v1():g1(o))+M1(a),y1=Nn(it,ht,!1,"zone"),w1=Nn(it,ht,!1,"low"),S1=Nn(Ci,Oi,!0,"zone"),R1=Nn(Ci,Oi,!0,"low");function b1(e,t){const o=e==="auroral-zone",a=t==="lite";return o?a?{name:"AURORA_ZONE_LITE_FS",text:S1}:{name:"AURORA_ZONE_FS",text:y1}:a?{name:"AURORA_LOW_LITE_FS",text:R1}:{name:"AURORA_LOW_FS",text:w1}}function E1(e){const t=p0(e),o=e.facingAzDeg*Math.PI/180,a=new Float32Array(48);a.set(t.arcY);const n=F1(e),r=e.scene!=="auroral-zone";return{u_auArcY:a,u_auFold:L1(t.fold),u_auRay:La(t.ray),u_auPatch:La(t.patch),u_auPillar:Float32Array.from(t.pillar),u_auBundle:r?Float32Array.from(ec(n.edge,t.level,e.detail==="lite")):La(t.bundle),u_auLowDrift:Float32Array.from(t.lowDrift),u_auScene:e.scene==="auroral-zone"?0:1,u_auLow:Float32Array.of(Math.sin(o),Math.cos(o),n.edge,n.pillars),u_auCotDip:Ta,u_auRate:Float32Array.from(x0(e)),u_auClass:Int32Array.from(Jo.map(tc)),u_auExtOn:e.extinction?1:0,u_auRatioCap:e.cloudRatioCap??o1}}const La=e=>{const t=new Float32Array(e.length);for(let o=0;o<e.length;o+=2)t[o]=e[o]*Math.cos(e[o+1]),t[o+1]=e[o]*Math.sin(e[o+1]);return t},L1=e=>{const t=Float32Array.from(e);return t.set(La(e.subarray(0,2*ta))),t},F1=e=>{const t=Fr(e.elapsedS);return{edge:t.edgeElevationDeg,pillars:t.pillars}};function T1(e){const t=new Float32Array(Se*Jo.length).fill(1);return e.extinction&&t.set(e.extinction.subarray(0,t.length)),{width:Se,height:Jo.length,data:t}}function g0(e){const t=Ae,o=Math.min(.99,Math.max(0,e?.g??dt.g)),a=Float32Array.of(t.contrast/.5,u0(),t.baseKm,t.sinFloor),n=Float32Array.of(Math.max(0,e?.tau??0),dt.twoStreamK*(1-o));if(!e)return{u_cloudMode:0,u_cloudOffset:new Float32Array(4),u_cloudTile:new Float32Array(4),u_cloudShape:a,u_cloudTau:n};const r=Ni(e.timeS),i=e.mode==="horizon",s=i?t.tileKm:t.tileDeg;return{u_cloudMode:i?1:2,u_cloudOffset:Float32Array.from(i?r.horizon:r.sky),u_cloudTile:Float32Array.of(1/s[0],1/s[1],t.weights[0],t.weights[1]),u_cloudShape:a,u_cloudTau:n}}const N1=eo("STAR_SKY")+pt+Tn+ki+v0+`
uniform sampler2D u_rate;
uniform sampler2D u_rateSky;
uniform sampler2D u_meanMap;
uniform sampler2D u_halo;
uniform int u_hlBackground;
uniform vec4 u_haloGrid;
uniform sampler2D u_light;
uniform float u_lightScale;
uniform float u_cloudCity;
uniform vec4 u_cloudMoon;
uniform float u_cloudG;
uniform vec2 u_cloudShift;
out vec4 o;
// Cubic B-spline weights at fraction f (texels i − 1 .. i + 2).
vec4 bspline(float f) {
  float f2 = f * f, f3 = f2 * f, g = 1.0 - f;
  return vec4(g * g * g, 3.0 * f3 - 6.0 * f2 + 4.0, -3.0 * f3 + 3.0 * f2 + 3.0 * f + 1.0, f3) / 6.0;
}
// The halo grid at cell c: a cubic B-spline over the texel centres (4 × 4 texels, clamped to the grid; bilinear left the
// coarse texels' steps visible at a bright halo's edge), transient-reference.ts cloudHaloAt.
float haloAt(vec2 c) {
  ivec2 n = textureSize(u_halo, 0);
  vec2 u = (c - u_haloGrid.xy) / u_haloGrid.z, f0 = floor(u), f = u - f0;
  vec4 wx = bspline(f.x), wy = bspline(f.y);
  ivec2 i0 = ivec2(f0) - 1;
  float s = 0.0;
  for (int j = 0; j < 4; j++) {
    float row = 0.0;
    for (int i = 0; i < 4; i++) row += wx[i] * texelFetch(u_halo, clamp(i0 + ivec2(i, j), ivec2(0), n - 1), 0).r;
    s += wy[j] * row;
  }
  return s;
}
// Henyey-Greenstein (4 pi normalised) at cos(angle) c, the angle at least 2 degrees (transient-meter.ts moonCloudRatio).
float hg(float c) {
  float g = u_cloudG, k = min(c, ${u(Math.cos(2*Math.PI/180))});
  return (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * k, 1.5);
}
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  // The hand-held view's whole-cell shift k: the sample reads this map at p + k, so the cell shown at d = p − k is this one:
  // its rate and stars are the map's own (p), its per-frame light, its direction (the cloud, the Moon, the field angle)
  // are the shown cell's (d). k = 0 is d = p, the unshifted composite.
  ivec2 d = p - ivec2(u_cloudShift);
  vec2 rv = texelFetch(u_rate, p, 0).rg;
  float sky = texelFetch(u_rateSky, p, 0).r;
  vec4 mean = texelFetch(u_meanMap, ivec2(0), 0);
  float veil = mean.g > 0.0 ? max(0.0, mean.r) / mean.g : 0.0;
  ivec2 ts = textureSize(u_light, 0);
  bool inside = d.x >= 0 && d.y >= 0 && d.x < ts.x && d.y < ts.y;
  float light = u_lightScale > 0.0 && inside ? texelFetch(u_light, d, 0).r * u_lightScale : 0.0;
  float halo = u_lightScale > 0.0 && u_haloGrid.w > 0.0 ? haloAt(vec2(d)) * u_lightScale : 0.0;
  vec4 cd = cellDir(d);
  float tn = cd.w > 0.0 ? cloudTauN(cd.xyz) : 0.0;
  float tTot = 1.0 / (1.0 + u_cloudTau.y * tn), tDir = exp(-tn);
  float moon = u_cloudMoon.w > 0.0 && tn > 0.0 ? u_cloudMoon.w * tn * hg(dot(cd.xyz, u_cloudMoon.xyz)) : 0.0;
  // The layer's own light reaches the cathode through the optics as the sky's does: the LUT's sky row at the cell's field
  // angle over the axis's (vignetting, the filter's angle shift, a field stop).
  float sky0 = lutAt(1, 0.0).x, off = sky0 > 0.0 ? max(0.0, lutAt(1, atanP(length(u_originMm + vec2(d) * u_pitchMm), u_focalMm)).x) / sky0 : 1.0;
  float r = (rv.r + light) * tDir + (tTot - tDir) * (sky + rv.g * off * (veil + halo)) + rv.g * off * ((1.0 - tTot) * u_cloudCity + moon);
  // B: the direct beam for meteor heads. A: diffuse sky for the classic eye display, or the underlying cloud
  // background for the tube's meteor highlight (including atmospheric scatter, excluding the direct meteor).
  float eyeSky = rv.g > 1e-6 ? sky * tTot / rv.g + off * ((1.0 - tTot) * u_cloudCity + moon) : 0.0;
  float background = rv.g * (eyeSky + (tTot - tDir) * off * (veil + halo));
  o = vec4(r, rv.g, tDir, u_hlBackground == 1 ? background : eyeSky);
}
`;function U1(e,t){const o=e.moon;return{u_lightScale:t,u_cloudCity:e.cityRate,u_cloudMoon:Float32Array.of(o?.dir[0]??0,o?.dir[1]??0,o?.dir[2]??1,f1(e)),u_cloudG:Math.min(.99,Math.max(0,e.cloud.g??dt.g)),u_cloudShift:Float32Array.of(e.shift?.[0]??0,e.shift?.[1]??0),u_haloGrid:M0(e.halo??null,!!e.halo)}}const M0=(e,t=!1)=>Float32Array.of(e?.origin[0]??0,e?.origin[1]??0,e?.block??1,e&&t?1:0),C1=eo("SKY_DIRECT")+pt+Tn+`
uniform sampler2D u_rate;
uniform int u_skyHz;
uniform float u_cellTan;
out vec4 o;
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec4 cd = cellDir(p);
  if (!(cd.w > 0.0)) { o = vec4(0.0); return; }
  float mask = texelFetch(u_rate, p, 0).g;
  vec2 mm = u_originMm + vec2(p) * u_pitchMm;
  float sky = lutAt(1, atan(length(mm) / u_focalMm)).x, disk = 0.0;
  if (u_skyHz == 1) {
    float hs = dot(cd.xyz, u_zenith);
    if (hs < u_hzEdgeMax) { if (hs < hzEdge(cd.xyz)) { o = vec4(0.0); return; } }
    disk = sky * moonDisk(cd.xyz, u_cellTan);
    sky *= hzMoon(cd.xyz, hs, hzAt(1, hzX(hs)));
  }
  o = vec4(sky * mask, 1.0, disk * mask, 0.0);
}
`,Fa=4,As=8,O1=ze+pt+ki+`
uniform sampler2D u_rate;
uniform sampler2D u_rateSky;
uniform sampler2D u_stars;
uniform float u_starsScale;
uniform ivec4 u_meanRegion;
uniform vec2 u_originMm;
uniform float u_pitchMm;
uniform float u_focalMm;
out vec4 o;
void main() {
  ivec2 b = u_meanRegion.xy + ivec2(gl_FragCoord.xy) * ${Fa}, e = u_meanRegion.xy + u_meanRegion.zw;
  float sky0 = lutAt(1, 0.0).x;
  vec4 s = vec4(0.0);
  for (int j = 0; j < ${Fa}; j++) {
    for (int i = 0; i < ${Fa}; i++) {
      ivec2 p = b + ivec2(i, j);
      if (p.x >= e.x || p.y >= e.y) continue;
      vec4 sk = texelFetch(u_rateSky, p, 0);
      if (!(sk.g > 0.0)) continue;
      float off = sky0 > 0.0 ? max(0.0, lutAt(1, atanP(length(u_originMm + vec2(p) * u_pitchMm), u_focalMm)).x) / sky0 : 1.0;
      float rate = texelFetch(u_rate, p, 0).r;
      // Round 3: the moving stars (not in the rate map) at their mean positions, so their scattered light is in the veil
      // as the other stars' (u_starsScale 0 when the stars do not move: the sum as before, bit for bit).
      if (u_starsScale > 0.0) rate += texelFetch(u_stars, p, 0).r * u_starsScale;
      s += vec4(rate - sk.r - sk.b, off, 1.0, rate - sk.b);
    }
  }
  o = s;
}
`,k1=ze+`
uniform sampler2D u_src;
uniform sampler2D u_mask;
uniform int u_masked;
uniform int u_moments;
uniform int u_block;
uniform ivec4 u_srcRegion;
out vec4 o;
void main() {
  ivec2 b = u_srcRegion.xy + ivec2(gl_FragCoord.xy) * u_block, e = min(u_srcRegion.xy + u_srcRegion.zw, b + u_block);
  vec4 s = vec4(0.0);
  for (int j = 0; j < ${As}; j++) {
    for (int i = 0; i < ${As}; i++) {
      ivec2 p = b + ivec2(i, j);
      if (p.x < e.x && p.y < e.y && (u_masked == 0 || texelFetch(u_mask, p, 0).g > 0.0)) {
        vec4 v = texelFetch(u_src, p, 0);
        s += u_moments == 1 ? vec4(v.r, v.r * vec2(p), 0.0) : v;
      }
    }
  }
  o = s;
}
`,P1=ze+`
uniform sampler2D u_src;
uniform sampler2D u_norm;
uniform int u_haloMode;
uniform vec4 u_haloGrid;
uniform vec4 u_haloK;
uniform vec2 u_originMm;
uniform float u_pitchMm;
uniform float u_focalMm;
out vec4 o;
vec3 cellDirOf(vec2 c) { return normalize(vec3(u_originMm + c * u_pitchMm, u_focalMm)); }
vec3 texDir(ivec2 q) { return cellDirOf(u_haloGrid.xy + vec2(q) * u_haloGrid.z); }
float kern(float c) {
  float th = acos(clamp(c, -1.0, 1.0));
  if (th >= u_haloK.z) return 0.0;
  float g = u_haloK.x, k = min(c, u_haloK.y), t = 1.0 - th * th * u_haloK.w;
  return (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * k, 1.5) * t * t;
}
void main() {
  ivec2 x = ivec2(gl_FragCoord.xy), n = textureSize(u_src, 0);
  vec3 a = texDir(x);
  float s = 0.0;
  for (int j = -${Ze.reach}; j <= ${Ze.reach}; j++) {
    for (int i = -${Ze.reach}; i <= ${Ze.reach}; i++) {
      ivec2 y = x + ivec2(i, j);
      if (i * i + j * j > ${Ze.reach*Ze.reach} || y.x < 0 || y.y < 0 || y.x >= n.x || y.y >= n.y) continue;
      vec4 v = texelFetch(u_src, y, 0);
      float w = u_haloMode == 0 ? v.g : v.r;
      if (!(w > 0.0)) continue;
      vec3 b = texDir(y);
      if (u_haloMode == 1) { float nn = texelFetch(u_norm, y, 0).r; w = nn > 0.0 ? w / nn : 0.0; b = cellDirOf(v.gb / v.r); }
      s += kern(dot(a, b)) * w;
    }
  }
  o = vec4(s, 0.0, 0.0, 0.0);
}
`;function z1(e,t){const o=Ze.radiusDeg*Math.PI/180;return{u_haloGrid:M0(e),u_haloK:Float32Array.of(Math.min(.99,Math.max(0,dt.g)),Math.cos(Ze.coreDeg*Math.PI/180),o,1/(o*o))}}const rr={strideBytes:24,attributes:[{name:"a_dir",location:0,size:4,type:"float",offset:0},{name:"a_T",location:2,size:1,type:"float",offset:16},{name:"a_seed",location:1,size:1,type:"uint",offset:20}]};function D1(e){const o=e.coarse,a={u_tiltMm:0,u_scint:0,u_exposureS:0,u_time:0};return o?{...a,u_sceneScale:1/(o.k*o.k),u_pitchMm:o.k*e.pitchMm,u_originMm:Float32Array.of(e.originMm[0]+(o.k-1)/2*e.pitchMm,e.originMm[1]+(o.k-1)/2*e.pitchMm),u_size:Float32Array.from(o.size)}:{...a,u_sceneScale:e.halo?1:1/(1-e.haloShare),u_pitchMm:e.pitchMm,u_originMm:Float32Array.from(e.originMm),u_size:Float32Array.from(e.size)}}const I1=ze+`
uniform sampler2D u_core;
uniform sampler2D u_halo;
uniform float u_haloW;
uniform int u_k;
out vec4 o;
float haloAt(ivec2 q, ivec2 size) { return texelFetch(u_halo, clamp(q, ivec2(0), size - 1), 0).r; }
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy), size = textureSize(u_halo, 0);
  vec2 rg = texelFetch(u_core, p, 0).rg;
  vec2 x = (vec2(p) + 0.5) / float(u_k) - 0.5;
  ivec2 i0 = ivec2(floor(x));
  vec2 f = x - vec2(i0);
  float h = mix(mix(haloAt(i0, size), haloAt(i0 + ivec2(1, 0), size), f.x), mix(haloAt(i0 + ivec2(0, 1), size), haloAt(i0 + ivec2(1, 1), size), f.x), f.y);
  o = vec4(rg.r + u_haloW * h, rg.g, 0.0, 0.0);
}
`;function G1(e,t){return{u_haloW:e/(1-e),u_k:t}}const vs=new WeakMap;function $1(e,t){let o=vs.get(t);if(o)return o;o=new Map;const a=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let n=0;n<a;n++){const r=e.getActiveUniform(t,n);r&&o.set(r.name.replace(/\[0\]$/,""),{type:r.type,loc:e.getUniformLocation(t,r.name)})}return vs.set(t,o),o}function q1(e,t,o){const a=$1(e,t.prog);for(const[n,r]of Object.entries(o)){const i=a.get(n);if(!i)continue;const s=typeof r=="number"?[r]:r;switch(i.type){case e.FLOAT:e.uniform1fv(i.loc,Float32Array.from(s));break;case e.FLOAT_VEC2:e.uniform2fv(i.loc,Float32Array.from(s));break;case e.FLOAT_VEC3:e.uniform3fv(i.loc,Float32Array.from(s));break;case e.FLOAT_VEC4:e.uniform4fv(i.loc,Float32Array.from(s));break;case e.FLOAT_MAT3:e.uniformMatrix3fv(i.loc,!1,Float32Array.from(s));break;case e.INT:case e.BOOL:e.uniform1iv(i.loc,Int32Array.from(s));break;case e.UNSIGNED_INT:e.uniform1uiv(i.loc,Uint32Array.from(s));break;default:throw new Error(`setUniforms: ${n} of type 0x${i.type.toString(16)} not handled`)}}}const K1=eo("STAR_SKY")+pt+Tn+`
uniform sampler2D u_coarse;
uniform int u_k;
out vec4 o;
float coarseAt(ivec2 q, ivec2 size) { return texelFetch(u_coarse, clamp(q, ivec2(0), size - 1), 0).r; }
void main() {
  ivec2 p = ivec2(gl_FragCoord.xy);
  vec4 cd = cellDir(p);
  if (cd.w == 0.0 || u_hzOn == 0) { o = vec4(0.0); return; }
  float up = dot(cd.xyz, u_zenith);
  if (!(up > 0.0)) { o = vec4(0.0); return; }
  if (up < u_hzEdgeMax) { if (up < hzEdge(cd.xyz)) { o = vec4(0.0); return; } }
  ivec2 size = textureSize(u_coarse, 0);
  vec2 x = (vec2(p) + 0.5) / float(u_k) - 0.5;
  ivec2 i0 = ivec2(floor(x));
  vec2 f = x - vec2(i0);
  float h = mix(mix(coarseAt(i0, size), coarseAt(i0 + ivec2(1, 0), size), f.x), mix(coarseAt(i0 + ivec2(0, 1), size), coarseAt(i0 + ivec2(1, 1), size), f.x), f.y);
  float r = length(u_originMm + vec2(p) * u_pitchMm), sky0 = lutAt(1, 0.0).x;
  float off = sky0 > 0.0 ? max(0.0, lutAt(1, atan(r / u_focalMm)).x) / sky0 : 1.0;
  o = vec4(h * off, 0.0, 0.0, 0.0);
}
`,H1=k0(Y0.SAMPLE_FS,e=>e==="sample-uniforms"?`uniform ivec2 u_rateShift;  // the rate map's whole-cell shift (gpu/pointing-shift.ts)
uniform vec4 u_slackCathode; // texel (0, 0)'s centre (mm), pitch (mm), the cathode's radius (mm)
`:e==="sample-rate-fetch"?["  rv = texelFetch(u_rate, p + u_rateShift, 0).rg;","  rv.g = length(u_slackCathode.xy + vec2(p) * u_slackCathode.z) <= u_slackCathode.w ? 1.0 : 0.0;","  rv.r *= rv.g;",""].join(`
`):""),W1=qf.kinematics,y0=W1,To={light:{startBelowPeak:{atMag0:6},phases:[{tauS:1,share:.85},{tauS:14,share:.13}],smokeSlowFainterMag:0},wind:{meanMS:35,meanPeriodS:6*3600,modes:[{ampMS:45,lambdaZKm:24,periodS:12*3600,lambdaHKm:0},{ampMS:25,lambdaZKm:11,periodS:2*3600,lambdaHKm:400},{ampMS:10.5,lambdaZKm:5.5,periodS:2400,lambdaHKm:150},{ampMS:5.25,lambdaZKm:2.6,periodS:900,lambdaHKm:60}]}},br=y0.trains.phases.slice(1);[...To.light.phases.map(e=>e.tauS),...br.map(e=>e.tauS)];function w0(e){const t=br.length-1;return[...To.light.phases.map(o=>o.share),...br.map((o,a)=>a<t?0:o.share*e)]}w0(10**(-.4*To.light.smokeSlowFainterMag));w0(10**(-.4*(y0.trains.startMagBelowPeak-To.light.startBelowPeak.atMag0)));Array.from({length:To.wind.modes.length+1},(e,t)=>{const o=To.wind,a=t===0?o.meanPeriodS:o.modes[t-1].periodS;return 2*(t===0?o.meanMS:o.modes[t-1].ampMS)/(2*Math.PI/a)});const B1=Math.PI/180,gs={wall:1,wallSigma:.45};function Y1(e,t){const o=Math.exp(-.5*e*e);if(!(t>0))return o;const a=gs.wall,n=gs.wallSigma,r=(e-a)/n,i=(e+a)/n;return(1-t)*o+t*.5*(Math.exp(-.5*r*r)+Math.exp(-.5*i*i))/n}const V1=0;function X1(e,t,o,a=V1,n){const r=new Uint32Array(o.buffer,o.byteOffset,o.length),i=Math.floor(o.length/6),s=em(),l=s?Q1:null,c=(_,x)=>_.kind==="train"&&x>=Z1*2*J1*n*B1;let h=0;const m=(_,x,f,v)=>{const g=_.flux*t(_.speedKmS),y=_.seg,M=_.wid;if((x<=1||!y)&&(f<=1||!M)){const P=6*h++;o[P]=_.dir[0],o[P+1]=_.dir[1],o[P+2]=_.dir[2],o[P+3]=g,o[P+4]=4500,r[P+5]=_.seed;return}x>1&&y||(x=1),f>1&&M||(f=1);const b=_.slope??0,w=_.curv??0,R=_.knots,T=R?R.length-1:0,N=b!==0||w!==0||T>0,S=P=>{const V=Math.min(T,Math.max(0,(P+.5)*T)),ee=Math.min(T-1,Math.floor(V));return R[ee]+(R[ee+1]-R[ee])*(V-ee)},L=M?Math.sqrt(M[0]*M[0]+M[1]*M[1]+M[2]*M[2]):0,F=y?Math.sqrt(y[0]*y[0]+y[1]*y[1]+y[2]*y[2]):0,k=j1*L,D=k>0&&x>1&&c(_,L)&&F>0,I=D?1+k/F:1,Y=.5*(F+k),H=Math.min(F,k),z=P=>{const V=D?Math.min(1,Math.max(0,(Y-Math.abs(P)*F)/H)):1,ee=D?Math.min(.5,Math.max(-.5,P)):P;return T>0?V*S(ee):N?V*Math.exp((b+w*ee)*ee):V};let K=x;if(N||D){Wo.length<x&&(Wo=new Float64Array(Math.max(x,2*Wo.length))),K=0;for(let P=0;P<x;P++){const V=z(((P+.5)/x-.5)*I);Wo[P]=V,K+=V}}let Z=!(N||D);K>0||(Z=!0,K=x);const W=f>1?2*v/(f-1):0;ga.length<4*f&&(ga=new Float64Array(Math.max(4*f,2*ga.length)));const U=ga;let oe=0;const G=_.hollow??0;for(let P=0;P<f;P++){const V=f>1?(P-.5*(f-1))*W:0,ee=f>1?G>0?Y1(V,G):Math.exp(-.5*V*V):1;U[4*P]=f>1?M[0]*V:0,U[4*P+1]=f>1?M[1]*V:0,U[4*P+2]=f>1?M[2]*V:0,U[4*P+3]=ee,oe+=ee}for(let P=0;P<x&&h<i;P++){const V=x>1?((P+.5)/x-.5)*I:0,ee=g*(Z?1:Wo[P])/K/oe,ce=_.dir[0]+(x>1?y[0]*V:0),Me=_.dir[1]+(x>1?y[1]*V:0),_e=_.dir[2]+(x>1?y[2]*V:0);for(let se=0;se<f&&h<i;se++){const be=ce+U[4*se],re=Me+U[4*se+1],ne=_e+U[4*se+2],de=1/Math.sqrt(be*be+re*re+ne*ne),ue=6*h++;o[ue]=be*de,o[ue+1]=re*de,o[ue+2]=ne*de,o[ue+3]=ee*U[4*se+3],o[ue+4]=4500,r[ue+5]=_.seed}}},p=_=>_.apparentMag<a&&_.kind!=="train";for(let _=0;_<e.length&&h<i;_++)!p(e[_])&&!e[_].hidden&&m(e[_],s?s[_]:1,l?l[_]:1,l?Ms[_]:0);const d=h;for(let _=0;_<e.length&&h<i;_++)p(e[_])&&!e[_].hidden&&m(e[_],s?s[_]:1,l?l[_]:1,l?Ms[_]:0);return{count:h,haloFrom:d}}const j1=.5,Z1=.5;let Q1=new Uint16Array(0),ga=new Float64Array(0),Wo=new Float64Array(0),Ms=new Float64Array(0);const J1=.5;function em(e,t,o){return null}const Pi=.2,tm=.1,S0=[{id:"aurora",program:"AURORA_ZONE_FS + AURORA_LOW_FS",label:"极光（完整档，极光带与低纬红极光两个场景的程序）"},{id:"auroraLite",program:"AURORA_ZONE_LITE_FS + AURORA_LOW_LITE_FS",label:"极光（省电档，两个场景的程序）"},{id:"auroraUpsample",program:"AURORA_UPSAMPLE_FS",label:"极光（粗网格加回细网格）"},{id:"cloud",program:"CLOUD_FS",label:"薄云（含手持平移）"},{id:"cloudSky",program:"CLOUD_SKY_FS + CLOUD_MEAN_FS + CLOUD_SUM_FS + CLOUD_HALO_FS",label:"薄云（天光图与均值）"},{id:"meteorHalo",program:"TRANSIENT_HALO_ADD_FS",label:"流星的亮光晕"},{id:"meteorDeposit",program:"starSky + 流星记录",label:"流星（画点）"},{id:"handShift",program:"SAMPLE_SHIFT_FS",label:"手持（整格平移）"}];let Er=!1;const Le=Math.PI/180,Ge=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],R0=(e,t)=>[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]],No=e=>{const t=Math.hypot(e[0],e[1],e[2]);return[e[0]/t,e[1]/t,e[2]/t]},Un=(...e)=>[0,1,2].map(t=>e.reduce((o,a)=>o+a[t],0)),Zt=(e,t)=>[e[0]*t,e[1]*t,e[2]*t],om=(e,t)=>[Math.cos(t*Le)*Math.cos(e*Le),Math.cos(t*Le)*Math.sin(e*Le),Math.sin(t*Le)],am=e=>new Promise(t=>setTimeout(t,e));async function st(e,t,o,a){const n=e.createProgram(),r=[];Er&&(o=`#version 300 es
precision highp float;
out vec4 outColor;
void main() { outColor = undeclaredSymbolForProbeFaultTest; }
`);for(const[s,l]of[[e.VERTEX_SHADER,t],[e.FRAGMENT_SHADER,o]]){const c=e.createShader(s);e.shaderSource(c,l),e.compileShader(c),e.attachShader(n,c),r.push(c)}if(e.linkProgram(n),e.getExtension("KHR_parallel_shader_compile"))for(let s=0;s<4e3&&e.getProgramParameter(n,37297)!==!0;s++)await am(4);const i=[];r.forEach((s,l)=>{e.getShaderParameter(s,e.COMPILE_STATUS)||i.push(`${l===0?"vertex":"fragment"}: ${e.getShaderInfoLog(s)??""}`)}),!i.length&&!e.getProgramParameter(n,e.LINK_STATUS)&&i.push(`link: ${e.getProgramInfoLog(n)??""}`);for(const s of r)e.detachShader(n,s),e.deleteShader(s);if(i.length)throw e.deleteProgram(n),new Error(`${a}: ${i.join(`
`)}`);return{p:n,gl:e,name:a}}const nm=e=>({prog:e.p,loc:{get:t=>e.gl.getUniformLocation(e.p,t)}}),Qe=(e,t)=>{e.gl.useProgram(e.p),q1(e.gl,nm(e),t)};function ve(e,t,o,a,n,r,i){const s=e.createTexture();e.bindTexture(e.TEXTURE_2D,s),e.pixelStorei(e.UNPACK_ALIGNMENT,1),e.texImage2D(e.TEXTURE_2D,0,a,t,o,0,n,r,i);for(const[l,c]of[[e.TEXTURE_MIN_FILTER,e.NEAREST],[e.TEXTURE_MAG_FILTER,e.NEAREST],[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE]])e.texParameteri(e.TEXTURE_2D,l,c);return s}function Be(e,t,o,a=e.RGBA32F){const n=ve(e,t,o,a,a===e.RG32F?e.RG:a===e.R32F?e.RED:e.RGBA,e.FLOAT,null),r=e.createFramebuffer();if(e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE)throw new Error("float render target incomplete");return{tex:n,fbo:r,w:t,h:o}}function J(e,t,o,a){const n=e.gl;n.activeTexture(n.TEXTURE0+t),n.bindTexture(n.TEXTURE_2D,o),n.uniform1i(n.getUniformLocation(e.p,a),t)}function Mt(e,t,o=!1){const a=e.gl;a.useProgram(e.p),a.bindFramebuffer(a.FRAMEBUFFER,t.fbo),a.viewport(0,0,t.w,t.h),a.disable(a.SCISSOR_TEST),o?(a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE)):a.disable(a.BLEND),a.drawArrays(a.TRIANGLES,0,3),a.disable(a.BLEND)}function lt(e,t){e.bindFramebuffer(e.FRAMEBUFFER,t.fbo);const o=new Float32Array(t.w*t.h*4);return e.readPixels(0,0,t.w,t.h,e.RGBA,e.FLOAT,o),o}const St=(e,t)=>{const o=new Float32Array(e.length>>2);for(let a=0;a<o.length;a++)o[a]=e[4*a+t];return o};function Rt(e,t){for(const o of t.progs??[])e.deleteProgram(o.p);for(const o of t.texs??[])o&&e.deleteTexture(o);for(const o of t.tgts??[])e.deleteTexture(o.tex),e.deleteFramebuffer(o.fbo)}const rm=(e,t)=>{const o=om(t,e),a=No(Un([0,0,1],Zt(o,-o[2])));return{zenith:o,north:a,east:R0(a,o)}},b0=(e,t,o)=>Un(Zt(e.east,Math.cos(t*Le)*Math.sin(o*Le)),Zt(e.north,Math.cos(t*Le)*Math.cos(o*Le)),Zt(e.zenith,Math.sin(t*Le))),Ma=2;function ca(e,t){const o=rm(t.latDeg,t.lstDeg),a=No(b0(o,t.altDeg,t.azDeg)),n=No(Un(o.zenith,Zt(a,-Ge(o.zenith,a)))),r=R0(n,a),i=2*t.cathodeR/t.n,s=[-(t.n-1)/2*i,-(t.n-1)/2*i],l={originMm:s,pitchMm:i,focalMm:t.focalMm,cathodeR:t.cathodeR,point:[1,0,0,0,1,0,0,0,1],axis:a,west:r,north:n},c=Bf(Hf(Ma),t.edge);let h=-1;for(const m of t.edge)h=Math.max(h,m);return{n:t.n,view:l,obs:o,edge:t.edge,viewUniforms:{u_point:l.point,u_axis:a,u_west:r,u_north:n,u_originMm:s,u_pitchMm:i,u_focalMm:t.focalMm,u_cathodeR:t.cathodeR},hzUniforms:{u_hzOn:1,u_hzNodes:Se,u_zenith:o.zenith,u_hzNorth:o.north,u_hzEast:o.east,u_hzEdgeMax:h,u_tNodes:Ma,u_logT:[Math.log(2500),Math.log(4e4)],u_nodes:2,u_maxAngle:1},hz:ve(e,c.width,c.height,e.RGBA32F,e.RGBA,e.FLOAT,c.data),lut:ve(e,2,2+Ma,e.RGBA32F,e.RGBA,e.FLOAT,new Float32Array(2*(2+Ma)*4).fill(1)),cloud:ve(e,Ae.size,Ae.size,e.R8,e.RED,e.UNSIGNED_BYTE,Ti())}}const ua=(e,t)=>Rt(e,{texs:[t.hz,t.lut,t.cloud]});function Cn(e=1,t=2){const o=new Float32Array(je);for(let a=0;a<je;a++){const n=a/4*Le;o[a]=Math.sin((e+t*Math.sin(3*n)+.5*t*Math.cos(7*n+1))*Le)}return o}const Uo={zone:{n:32,latDeg:69.6,lstDeg:30,altDeg:22,azDeg:0,focalMm:25,cathodeR:8},low:{n:32,latDeg:45,lstDeg:200,altDeg:14,azDeg:10,focalMm:25,cathodeR:8}},ha=(e,t)=>{const o=[];for(let a=Math.floor(t/2);a<e;a+=t)for(let n=Math.floor(t/2);n<e;n+=t)o.push(a*e+n);return o};function ct(e,t,o){let a=0,n=0,r=0;for(let h=0;h<e.length;h++){const m=e[h];Number.isFinite(m)?n=Math.max(n,Math.abs(m)):a++}for(let h=0;h<t.length;h++)r=Math.max(r,Math.abs(o[h]));const i=.02*r;let s=0,l=0,c=0;for(let h=0;h<t.length;h++){const m=e[t[h]],p=o[h],d=Number.isFinite(m)?Math.abs(m-p)/Math.max(Math.abs(p),i):1/0;d>Pi&&s++,Math.abs(p)>=.1*r&&(c++,l=Math.max(l,d))}return{points:t.length,maxRel:l,badShare:t.length?s/t.length:0,nonFinite:a,gpuMax:n,zero:n===0&&r>0,degenerate:!(r>0)||c<8}}function im(e){return e.nonFinite>0?{verdict:"bad",note:`${e.nonFinite} 个值不是有限数`}:e.zero?{verdict:"bad",note:"全部为零，CPU 参照不为零"}:e.degenerate?{verdict:"skipped",note:"参照场景里可比较的点太少（探测本身的问题，不判）"}:e.badShare>tm?{verdict:"suspect",note:`${(100*e.badShare).toFixed(0)}% 的点与 CPU 相差超过 ${100*Pi}%`}:{verdict:"ok",note:""}}function ut(e,t){if(!t||t==="compile")return e;const o=new Float32Array(e);for(let a=0;a<o.length;a++)o[a]=t==="zero"?0:t==="nan"?a%3===0?NaN:o[a]:o[a]*1.6;return o}const sm={"n2-nir":3,"n2-blue":.5,green:2,red:1,"nir-atomic":1.5};function lm(e){const o=e.scene==="low-latitude-red"?uu(e.level,Fr(e.elapsedS)):tu("auroral-zone",e.level);return{scene:e.scene,level:e.level,timeS:e.timeS,windowS:0,rates:sm,kR:o,elapsedS:e.elapsedS,facingAzDeg:0,pitchMm:e.pitchMm,haloShare:.05,scaleExp:0,detail:e.detail,extinction:e.extinction,cloud:null}}function cm(){const e=new Float32Array(5*Se);for(let t=0;t<5;t++)for(let o=0;o<Se;o++){const a=90*(o/(Se-1))**2;e[t*Se+o]=1-(.5+.075*t)*Math.exp(-a/12)}return e}function zi(e){const t=e.reduce((o,a)=>o+a.points,0);return{points:t,maxRel:Math.max(...e.map(o=>o.maxRel)),badShare:t?e.reduce((o,a)=>o+a.badShare*a.points,0)/t:0,nonFinite:e.reduce((o,a)=>o+a.nonFinite,0),gpuMax:Math.max(...e.map(o=>o.gpuMax)),zero:e.some(o=>o.zero),degenerate:e.every(o=>o.degenerate)}}async function um(e,t,o,a){const n=[];for(const r of[!1,!0]){const i=b1(r?"low-latitude-red":"auroral-zone",t?"lite":"full"),s=await ae(o,"compileMs",()=>st(e,yt,i.text,i.name));try{const l=ca(e,{...r?Uo.low:Uo.zone,edge:Cn()}),c=lm({scene:r?"low-latitude-red":"auroral-zone",level:2,timeS:r?1120:120,elapsedS:r?120:0,detail:t?"lite":"full",pitchMm:16/l.n,extinction:cm()}),h=Be(e,l.n,l.n),m=T1(c),p=ve(e,m.width,m.height,e.R32F,e.RED,e.FLOAT,m.data);try{const d=await ae(o,"drawMs",()=>(Qe(s,{...l.viewUniforms,...l.hzUniforms,...E1(c),...g0(null)}),J(s,0,l.hz,"u_hz"),J(s,1,l.lut,"u_lut"),J(s,2,p,"u_auExt"),J(s,3,l.cloud,"u_cloud"),e.bindFramebuffer(e.FRAMEBUFFER,h.fbo),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),Mt(s,h),ut(St(lt(e,h),0),a)));n.push(await ae(o,"refMs",()=>{const _=p0(c),x=x0(c),f=ha(l.n,4),v=new Float64Array(f.length);return f.forEach((g,y)=>{const M=ra(l.view,g%l.n,Math.floor(g/l.n));M&&(v[y]=i1(c,_,x,[Ge(M,l.obs.east),Ge(M,l.obs.north),Ge(M,l.obs.zenith)],mn(l.edge,l.obs,M).ground,0))}),ct(d,f,v)}))}finally{Rt(e,{texs:[p],tgts:[h]}),ua(e,l)}}finally{Rt(e,{progs:[s]})}}return zi(n)}async function hm(e,t,o){const a=ca(e,{...Uo.zone,edge:Wf(1)}),n=2,r=a.n/n+1,i=new Float32Array(r*r);for(let h=0;h<r;h++)for(let m=0;m<r;m++)i[h*r+m]=1+.5*m+.25*h;const s=await ae(t,"compileMs",()=>st(e,yt,K1,"AURORA_UPSAMPLE_FS")),l=Be(e,a.n,a.n),c=ve(e,r,r,e.R32F,e.RED,e.FLOAT,i);try{const h=await ae(t,"drawMs",()=>(Qe(s,{...a.viewUniforms,...a.hzUniforms,u_k:n}),J(s,0,a.hz,"u_hz"),J(s,1,a.lut,"u_lut"),J(s,2,c,"u_coarse"),Mt(s,l),ut(St(lt(e,l),0),o)));return await ae(t,"refMs",()=>{const m=[],p=[],d=Math.sin(1*Le),_=(x,f)=>i[Math.min(r-1,Math.max(0,f))*r+Math.min(r-1,Math.max(0,x))];for(const x of ha(a.n,2)){const f=x%a.n,v=Math.floor(x/a.n),g=ra(a.view,f,v);if(!g)continue;const y=Ge(g,a.obs.zenith);if(Math.abs(y-d)<.02)continue;if(m.push(x),y<d){p.push(0);continue}const M=(f+.5)/n-.5,b=(v+.5)/n-.5,w=Math.floor(M),R=Math.floor(b),T=M-w,N=b-R;p.push((_(w,R)*(1-T)+_(w+1,R)*T)*(1-N)+(_(w,R+1)*(1-T)+_(w+1,R+1)*T)*N)}return ct(h,m,p)})}finally{Rt(e,{progs:[s],texs:[c],tgts:[l]}),ua(e,a)}}function ke(e){let t=e>>>0;return t=(t^t>>>16)>>>0,t=Math.imul(t,2146121005)>>>0,t=(t^t>>>15)>>>0,t=Math.imul(t,2221713035)>>>0,t=(t^t>>>16)>>>0,(t>>>8)/16777216}async function fm(e,t,o){const a=ca(e,{...Uo.zone,edge:Cn()}),n=a.n,r=new Float32Array(n*n*2),i=new Float32Array(n*n*4),s=new Float32Array(n*n);for(let F=0;F<n*n;F++){const k=30*ke(F*3+1)**4,D=60+20*ke(F*3+4);i[4*F]=D,i[4*F+1]=1,r[2*F]=D+20*ke(F*3+2)+k,r[2*F+1]=1,s[F]=4*ke(F*3+3)**3}const l=Float32Array.of(2400,120,125,0),c=2400/120,h=A0([1,2,30,29],4),[m,p]=h.size,d=new Float32Array(m*p*4),_=new Float64Array(m*p);for(let F=0;F<m*p;F++)d[4*F]=_[F]=3+9*ke(F*5+7)**2;const x=b0(a.obs,30,25),f=a.view.axis,v=Math.acos(Math.min(1,Math.max(-1,Ge(No(f),No(x)))))/Le,g=F=>({cloud:{tau:.3,mode:"horizon",timeS:600},cityRate:20,moon:{dir:x,viewRate:300,viewAngleDeg:v,weights:{rayleigh:1,mie:.6}},shift:F,halo:h}),y=2.5,M=await ae(t,"compileMs",()=>st(e,yt,N1,"CLOUD_FS")),b=Be(e,n,n),w=ve(e,n,n,e.RG32F,e.RG,e.FLOAT,r),R=ve(e,n,n,e.RGBA32F,e.RGBA,e.FLOAT,i),T=ve(e,n,n,e.R32F,e.RED,e.FLOAT,s),N=ve(e,1,1,e.RGBA32F,e.RGBA,e.FLOAT,l),S=ve(e,m,p,e.RGBA32F,e.RGBA,e.FLOAT,d),L=[];try{for(const F of[[0,0],[3,-2]]){const k=g(F),D=await ae(t,"drawMs",()=>(Qe(M,{...a.viewUniforms,...a.hzUniforms,...g0(k.cloud),...U1(k,y)}),J(M,0,w,"u_rate"),J(M,1,R,"u_rateSky"),J(M,2,T,"u_light"),J(M,3,a.cloud,"u_cloud"),J(M,4,a.hz,"u_hz"),J(M,5,a.lut,"u_lut"),J(M,6,N,"u_meanMap"),J(M,7,S,"u_halo"),Mt(M,b),ut(St(lt(e,b),0),o)));L.push(await ae(t,"refMs",()=>{const I=ha(n,4),Y=new Float64Array(I.length);return I.forEach((H,z)=>{const K=H%n,Z=Math.floor(H/n),W=K-F[0],U=Z-F[1],oe=W>=0&&W<n&&U>=0&&U<n?U*n+W:-1,G=ra(a.view,K-F[0],Z-F[1]);let P=0,V=1;G&&(P=Jf(k.cloud,G,[Ge(G,a.obs.east),Ge(G,a.obs.north),Ge(G,a.obs.zenith)],mn(a.edge,a.obs,G).ground),V=Ge(G,x)),Y[z]=s1(k,{rate:r[2*H],mask:r[2*H+1],sky:i[4*H],light:oe>=0?s[oe]*y:0,veil:c,halo:h1(h,_,W,U)*y},P,V)}),ct(D,I,Y)}))}}finally{Rt(e,{progs:[M],texs:[w,R,T,N,S],tgts:[b]}),ua(e,a)}return zi(L)}async function mm(e,t,o){const a=ca(e,{...Uo.zone,edge:Cn()}),n=a.n,r=new Float32Array(n*n*2);for(let L=0;L<n*n;L++)r[2*L]=2+40*ke(L+5)**3,r[2*L+1]=.5+.5*ke(L+9);const i=[];i.push(await ae(t,"compileMs",()=>st(e,yt,C1,"CLOUD_SKY_FS"))),i.push(await ae(t,"compileMs",()=>st(e,yt,O1,"CLOUD_MEAN_FS"))),i.push(await ae(t,"compileMs",()=>st(e,yt,k1,"CLOUD_SUM_FS"))),i.push(await ae(t,"compileMs",()=>st(e,yt,P1,"CLOUD_HALO_FS")));const[s,l,c,h]=i,m=Fa,p=Math.ceil(n/m),d=Be(e,n,n),_=Be(e,p,p),x=Be(e,1,1),f=ve(e,n,n,e.RG32F,e.RG,e.FLOAT,r),v=A0([1,2,30,29],4),[g,y]=v.size,M=new Float32Array(g*y*4),b=new Float32Array(g*y*4),w=new Float64Array(2*g*y);for(let L=0;L<g*y;L++){const F=L%7===3?50+400*ke(L+21):0,k=v.origin[0]+v.block*(L%g)+3*ke(L+41)-1.5,D=v.origin[1]+v.block*Math.floor(L/g)+3*ke(L+51)-1.5;M[4*L+1]=4+12*ke(L+33),b[4*L]=F,b[4*L+1]=F*k,b[4*L+2]=F*D,w[2*L]=b[4*L+1],w[2*L+1]=b[4*L+2]}const R=ve(e,g,y,e.RGBA32F,e.RGBA,e.FLOAT,M),T=ve(e,g,y,e.RGBA32F,e.RGBA,e.FLOAT,b),N=Be(e,g,y),S=Be(e,g,y);try{const L=await ae(t,"drawMs",()=>{Qe(s,{...a.viewUniforms,...a.hzUniforms,u_skyHz:1,u_cellTan:a.view.pitchMm/a.view.focalMm,u_moonOn:0}),J(s,0,f,"u_rate"),J(s,1,a.hz,"u_hz"),J(s,2,a.lut,"u_lut"),Mt(s,d);const F=St(lt(e,d),0);Qe(l,{...a.viewUniforms,...a.hzUniforms}),e.uniform4i(e.getUniformLocation(l.p,"u_meanRegion"),0,0,n,n),J(l,0,f,"u_rate"),J(l,1,d.tex,"u_rateSky"),J(l,2,a.lut,"u_lut"),Mt(l,_),Qe(c,{u_masked:0,u_block:p}),e.uniform4i(e.getUniformLocation(c.p,"u_srcRegion"),0,0,p,p),J(c,0,_.tex,"u_src"),J(c,1,_.tex,"u_mask"),Mt(c,x);const k={...a.viewUniforms,...z1(v,void 0)};return Qe(h,{...k,u_haloMode:0}),J(h,0,R,"u_src"),J(h,1,R,"u_norm"),Mt(h,N),Qe(h,{...k,u_haloMode:1}),J(h,0,T,"u_src"),J(h,1,N.tex,"u_norm"),Mt(h,S),{skyR:ut(F,o),sums:ut(lt(e,x).subarray(0,3),o),norm:ut(St(lt(e,N),0),o),halo:ut(St(lt(e,S),0),o)}});return await ae(t,"refMs",()=>{const F=ha(n,2),k=[],D=[];for(let W=0;W<n*n;W++){const U=ra(a.view,W%n,Math.floor(W/n));U&&!mn(a.edge,a.obs,U).ground&&D.push({rate:r[2*W],sky:r[2*W+1],offAxis:1})}for(const W of F){const U=ra(a.view,W%n,Math.floor(W/n));k.push(U&&!mn(a.edge,a.obs,U).ground?r[2*W+1]:0)}const I=l1(D),Y=Array.from({length:g*y},(W,U)=>U),H=Array.from({length:g*y},(W,U)=>M[4*U+1]),z=Array.from({length:g*y},(W,U)=>b[4*U]),K=_s(v,a.view,H,null),Z=_s(v,a.view,z,K,void 0,w);return zi([ct(L.skyR,F,k),ct(L.sums,[0,1,2],[I.map,I.off,I.count]),ct(L.norm,Y,K),ct(L.halo,Y,Z)])})}finally{Rt(e,{progs:i,texs:[f,R,T],tgts:[d,_,x,N,S]}),ua(e,a)}}async function _m(e,t,o){const i=new Float32Array(2048),s=new Float32Array(64);for(let d=0;d<1024;d++)i[2*d]=100*ke(d+7)+1,i[2*d+1]=ke(d+11)>.1?1:0;for(let d=0;d<64;d++)s[d]=10*ke(d+13)+1;const l=G1(.05,4),c=await ae(t,"compileMs",()=>st(e,yt,I1,"TRANSIENT_HALO_ADD_FS")),h=Be(e,32,32),m=ve(e,32,32,e.RG32F,e.RG,e.FLOAT,i),p=ve(e,8,8,e.R32F,e.RED,e.FLOAT,s);try{const d=await ae(t,"drawMs",()=>(Qe(c,{...l}),J(c,0,m,"u_core"),J(c,1,p,"u_halo"),Mt(c,h),ut(St(lt(e,h),0),o)));return await ae(t,"refMs",()=>{const _=ha(32,2),x=new Float64Array(_.length),f=(v,g)=>s[Math.min(7,Math.max(0,g))*8+Math.min(7,Math.max(0,v))];return _.forEach((v,g)=>{const y=v%32,M=Math.floor(v/32),b=(y+.5)/4-.5,w=(M+.5)/4-.5,R=Math.floor(b),T=Math.floor(w),N=b-R,S=w-T;x[g]=i[2*v]+l.u_haloW*((f(R,T)*(1-N)+f(R+1,T)*N)*(1-S)+(f(R,T+1)*(1-N)+f(R+1,T+1)*N)*S)}),ct(d,_,x)})}finally{Rt(e,{progs:[c],texs:[m,p],tgts:[h]})}}async function dm(e,t,o){const a=ca(e,{...Uo.zone,edge:Cn()}),n=a.n,r=a.view,i=r.focalMm,s=P0,l=await ae(t,"compileMs",()=>st(e,s,D0,"starSky")),c={dir:No(Un(r.axis,Zt(r.west,.4*Le),Zt(r.north,.3*Le))),flux:10,apparentMag:0,speedKmS:40,seed:2147483712,kind:"head"},h=new Float32Array(6);X1([c],()=>1,h);const m=Be(e,n,n),p=e.createVertexArray(),d=e.createBuffer();try{const _=await ae(t,"drawMs",()=>{e.bindVertexArray(p),e.bindBuffer(e.ARRAY_BUFFER,d),e.bufferData(e.ARRAY_BUFFER,h,e.STREAM_DRAW);for(const x of rr.attributes)e.enableVertexAttribArray(x.location),x.type==="uint"?e.vertexAttribIPointer(x.location,x.size,e.UNSIGNED_INT,rr.strideBytes,x.offset):e.vertexAttribPointer(x.location,x.size,e.FLOAT,!1,rr.strideBytes,x.offset);return Qe(l,{...a.viewUniforms,...a.hzUniforms,u_hzOn:0,u_frame:0,u_hzXRef:0,u_scintIndex:0,...D1({scaleExp:0,haloShare:0,halo:!1,originMm:r.originMm,pitchMm:r.pitchMm,size:[n,n]})}),J(l,0,a.lut,"u_lut"),J(l,1,a.hz,"u_hz"),e.bindFramebuffer(e.FRAMEBUFFER,m.fbo),e.viewport(0,0,n,n),e.disable(e.SCISSOR_TEST),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.BLEND),e.blendFunc(e.ONE,e.ONE),e.drawArrays(e.POINTS,0,1),e.disable(e.BLEND),e.bindVertexArray(null),ut(St(lt(e,m),0),o)});return await ae(t,"refMs",()=>{let x=0,f=0,v=0;for(let N=0;N<_.length;N++){const S=_[N];Number.isFinite(S)&&(x+=S,f+=S*(N%n),v+=S*Math.floor(N/n))}const g=c.dir,y=Ge(g,r.axis),M=[(Ge(g,r.west)/y*i-r.originMm[0])/r.pitchMm,(Ge(g,r.north)/y*i-r.originMm[1])/r.pitchMm],b=h[3]*i*i*.001,w=x>0?Math.hypot(f/x-M[0],v/x-M[1]):1/0,R=ct(_,[0],[0]),T=Math.abs(x/b-1);return{...R,points:1,maxRel:Math.max(T,w),badShare:T>Pi||w>1?1:0,zero:R.gpuMax===0,degenerate:!1,centroidErr:w}})}finally{e.deleteVertexArray(p),e.deleteBuffer(d),Rt(e,{progs:[l],tgts:[m]}),ua(e,a)}}async function pm(e,t,o){const s=[3,-2],l=new Float32Array(1024*2);for(let x=0;x<32;x++)for(let f=0;f<32;f++)l[2*(x*32+f)]=1+f+64*x,l[2*(x*32+f)+1]=1;const c=await ae(t,"compileMs",()=>st(e,yt,H1,"SAMPLE_SHIFT_FS")),h=Be(e,32,32,e.RG32F),m=Be(e,32,32,e.RG32F),p=ve(e,32,32,e.RG32F,e.RG,e.FLOAT,l),d=ve(e,32,32,e.R32F,e.RED,e.FLOAT,new Float32Array(1024)),_=e.createFramebuffer();try{const x=await ae(t,"drawMs",()=>{if(e.bindFramebuffer(e.FRAMEBUFFER,_),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,h.tex,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT1,e.TEXTURE_2D,m.tex,0),e.drawBuffers([e.COLOR_ATTACHMENT0,e.COLOR_ATTACHMENT1]),e.checkFramebufferStatus(e.FRAMEBUFFER)!==e.FRAMEBUFFER_COMPLETE)throw new Error("two float render targets incomplete");return e.useProgram(c.p),Qe(c,{u_areaTime:1,u_dark:0,u_gain:1,u_f2:1,u_ramp:1,u_starsScale:0,u_snowRate:0,u_snowCharge:0,u_slackCathode:[-7.75,-7.75,.5,6]}),e.uniform2i(e.getUniformLocation(c.p,"u_rateShift"),s[0],s[1]),e.uniform1ui(e.getUniformLocation(c.p,"u_frame"),0),e.uniform1ui(e.getUniformLocation(c.p,"u_seed"),0),e.uniform1i(e.getUniformLocation(c.p,"u_mean"),1),J(c,0,p,"u_rate"),J(c,1,d,"u_starsDyn"),e.viewport(0,0,32,32),e.disable(e.SCISSOR_TEST),e.disable(e.BLEND),e.drawArrays(e.TRIANGLES,0,3),e.drawBuffers([e.COLOR_ATTACHMENT0,e.NONE]),ut(St(lt(e,h),0),o)});return await ae(t,"refMs",()=>{const f=[],v=[];for(let g=0;g<32;g++)for(let y=0;y<32;y++){const M=y+s[0],b=g+s[1];M<0||M>=32||b<0||b>=32||(y+g)%3!==0||(f.push(g*32+y),v.push(Math.hypot(-7.75+y*.5,-7.75+g*.5)<=6?l[2*(b*32+M)]:0))}return ct(x,f,v)})}finally{e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(_),Rt(e,{progs:[c],texs:[p,d],tgts:[h,m]})}}async function ae(e,t,o){const a=performance.now();try{return await o()}finally{e[t]+=performance.now()-a}}function xm(){try{const t=(typeof OffscreenCanvas<"u"?new OffscreenCanvas(4,4):Object.assign(document.createElement("canvas"),{width:4,height:4})).getContext("webgl2",{antialias:!1,depth:!1,stencil:!1,alpha:!1,preserveDrawingBuffer:!1});return!t||!t.getExtension("EXT_color_buffer_float")?null:{gl:t,release:()=>{try{t.getExtension("WEBGL_lose_context")?.loseContext()}catch{}}}}catch{return null}}async function Am(e,t,o,a=!1){const n=S0.find(s=>s.id===t),r={compileMs:0,drawMs:0,refMs:0},i=s=>({id:t,program:n.program,verdict:"ok",log:"",points:0,maxRel:0,badShare:0,nonFinite:0,gpuMax:0,note:"",...s,compileMs:r.compileMs,drawMs:r.drawMs,refMs:r.refMs});for(;e.getError(););if(a&&(t==="aurora"||t==="auroraLite")&&!e.getExtension("KHR_parallel_shader_compile"))return i({verdict:"skipped",note:"这个浏览器没有后台编译，为免卡住页面，运行时不探测（自检页里仍会测）"});Er=o==="compile";try{const s=t==="aurora"||t==="auroraLite"?await um(e,t==="auroraLite",r,o):t==="auroraUpsample"?await hm(e,r,o):t==="cloud"?await fm(e,r,o):t==="cloudSky"?await mm(e,r,o):t==="meteorHalo"?await _m(e,r,o):t==="meteorDeposit"?await dm(e,r,o):await pm(e,r,o),l=im(s),c=e.getError(),h=t==="meteorDeposit"?` 质心偏差 ${s.centroidErr.toFixed(3)} 格`:"";return i({verdict:c!==e.NO_ERROR&&l.verdict==="ok"?"suspect":l.verdict,note:`${l.note}${c!==e.NO_ERROR?` GL 错误 0x${c.toString(16)}`:""}${h}`.trim(),points:s.points,maxRel:s.maxRel,badShare:s.badShare,nonFinite:s.nonFinite,gpuMax:s.gpuMax})}catch(s){const l=s instanceof Error?s.message:String(s);return/^(AURORA|CLOUD|TRANSIENT|SAMPLE|starSky)\S*: /.test(l)?i({verdict:"compile-failed",log:l.split(`
`).slice(0,6).join(`
`).slice(0,600)}):i({verdict:"skipped",note:`探测没能运行：${l.slice(0,200)}`})}finally{Er=!1}}async function vm(e,t=S0.map(n=>n.id),o,a=!1){const n=[];for(const r of t)n.push(await Am(e,r,o,a));return n}self.onmessage=async e=>{const t=xm();let o=null;if(t)try{o=await vm(t.gl,e.data.ids,e.data.fault)}catch{}finally{t.release()}self.postMessage(o)};
