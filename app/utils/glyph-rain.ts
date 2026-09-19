/**
 * Vue-friendly port of canvasui.dev's Glyph Rain (WebGL2 shader).
 *
 * The original is a React component that captures the page HTML through the
 * experimental html-in-canvas API and relights it. That API isn't shipped in
 * mainstream browsers, so this port keeps only the part that works everywhere:
 * the rain itself (layered glyph columns, glowing heads, cursor "stir" wake),
 * rendered onto a transparent canvas that sits behind the hero content.
 */

export interface GlyphRainOptions {
  charset?: string
  /** Size of one glyph cell in CSS pixels (8 to 64). */
  cell?: number
  /** Rain color as [r, g, b] in 0-1 range. */
  color?: [number, number, number]
  /** Color of the bright head glyph as [r, g, b] in 0-1 range. */
  headColor?: [number, number, number]
  /** Fall speed in screen heights per second (0.05 to 3). */
  speed?: number
  /** Per-column speed variation (0 to 1). */
  speedVariance?: number
  /** Fraction of drops that spawn each cycle (0 to 1). */
  density?: number
  /** Length multiplier for the fading trails (0.2 to 3). */
  trail?: number
  /** Brightness of the drop heads (0 to 3). */
  glow?: number
  /** How fast glyphs mutate into other characters (0 to 4). */
  mutate?: number
  /** Random brightness flicker of the streaks (0 to 1). */
  flicker?: number
  /** Parallax rain layers (1 to 3). */
  layers?: number
  /** How strongly the cursor stirs the rain as it passes (0 to 1). */
  stir?: number
  /** How far the stirring reaches to either side of the cursor, in CSS pixels. */
  stirRadius?: number
  /** Seconds the stirred wake takes to settle back to its own rhythm. */
  settle?: number
}

export interface GlyphRainInstance {
  resize: () => void
  destroy: () => void
}

const DEFAULT_CHARSET
  = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789Z*+-<>¦=:.'

const DEFAULTS: Required<GlyphRainOptions> = {
  charset: DEFAULT_CHARSET,
  cell: 15,
  color: [0.267, 0.455, 1],
  headColor: [0.169, 0.416, 1],
  speed: 0.2,
  speedVariance: 0.5,
  density: 0.15,
  trail: 0.65,
  glow: 1.75,
  mutate: 0,
  flicker: 0,
  layers: 2,
  stir: 0.7,
  stirRadius: 260,
  settle: 0.9
}

const VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
void main () {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;
uniform sampler2D uAtlas;
uniform sampler2D uWake;
uniform vec2 uResolution;
uniform float uTime;
uniform float uCell;
uniform float uGlyphCount;
uniform float uAtlasGrid;
uniform vec3 uColor;
uniform vec3 uHeadColor;
uniform float uSpeed;
uniform float uSpeedVar;
uniform float uDensity;
uniform float uTrail;
uniform float uGlow;
uniform float uMutate;
uniform float uFlicker;
uniform float uLayers;
uniform float uStir;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

float glyphMask(vec2 px, float cell, float seed) {
  vec2 id = floor(px / cell);
  vec2 f = fract(px / cell);
  f = f * 0.74 + 0.13;
  f.x = 1.0 - f.x;
  float tick = floor(uTime * uMutate * 1.6 + hash21(id + seed) * 9.0);
  float idx = floor(
    hash21(id * 1.71 + vec2(seed + tick * 7.31, tick * 0.613)) * uGlyphCount
  );
  float gx = mod(idx, uAtlasGrid);
  float gy = floor(idx / uAtlasGrid);
  vec2 auv = (vec2(gx, gy) + f) / uAtlasGrid;
  return texture(uAtlas, auv).a;
}

float colSpeed(float col, float seed) {
  float variance = mix(0.35, 1.0, hash11(col * 0.37 + seed + 3.1));
  return uSpeed * mix(1.0, variance, uSpeedVar) * 0.5;
}

float colOffset(float col, float seed) {
  return hash11(col * 1.713 + seed) * 9.0;
}

vec2 wakeAt(float xpx) {
  float u = clamp(xpx / max(uResolution.x, 1.0), 0.0, 1.0);
  return texture(uWake, vec2(u, 0.5)).rg;
}

void main () {
  vec2 frag = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y);
  float yn = 1.0 - frag.y / uResolution.y;

  const float scales[3] = float[3](1.0, 1.5, 2.2);
  const float weights[3] = float[3](1.0, 0.45, 0.22);
  const float seeds[3] = float[3](0.0, 19.7, 41.3);

  float g = 0.0;
  float headG = 0.0;
  for (int l = 0; l < 3; l++) {
    if (float(l) >= uLayers) break;
    float cell = uCell * scales[l];
    float col = floor(frag.x / cell);
    float sp = colSpeed(col, seeds[l]);
    float off = colOffset(col, seeds[l]);
    vec2 wk = uStir > 0.0 ? wakeAt((col + 0.5) * cell) : vec2(0.0);
    float exc = uStir * wk.y;
    float T = uTime * sp + off + sp * wk.x;
    float phase = fract(yn + T);
    float cyc = floor(yn + T);
    float gate = step(hash21(vec2(col, cyc) + seeds[l]), uDensity);
    float b = clamp(uTrail / (phase * 22.0), 0.0, 1.3) - 0.04;
    if (b <= 0.0 || gate < 0.5) continue;
    float flick = 1.0 + uFlicker * 0.6 *
      sin(uTime * 14.0 + hash21(vec2(col, cyc)) * 40.0 + phase * 30.0);
    float m = glyphMask(frag, cell, seeds[l] + cyc * 0.173);
    float cellYn = cell / uResolution.y;
    float head = 1.0 - smoothstep(0.0, cellYn * 1.2, phase);
    g += m * b * flick * weights[l] * (1.0 + head * uGlow * 1.4) *
      (1.0 + exc * 1.6);
    headG += m * head * weights[l] * uGlow * (1.0 + exc * 1.1);
  }
  g = max(g, 0.0);

  vec3 rainCol = mix(uColor, uHeadColor, clamp(headG, 0.0, 1.0));
  float a = clamp(g, 0.0, 1.0);
  outColor = vec4(rainCol * a, a);
}`

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

function buildAtlas(charset: string) {
  const glyphs = Array.from(new Set(Array.from(charset))).filter(g => g.trim().length > 0)
  if (glyphs.length === 0) glyphs.push('0', '1')
  const count = glyphs.length
  const grid = Math.max(Math.ceil(Math.sqrt(count)), 1)
  const cellPx = 64
  const canvas = document.createElement('canvas')
  canvas.width = grid * cellPx
  canvas.height = grid * cellPx
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `600 ${Math.round(cellPx * 0.72)}px ui-monospace, SFMono-Regular, Menlo, monospace`
  glyphs.forEach((glyph, i) => {
    ctx.fillText(glyph, ((i % grid) + 0.5) * cellPx, (Math.floor(i / grid) + 0.5) * cellPx)
  })
  return { canvas, count, grid }
}

/** Returns null when WebGL2 is unavailable, so callers can just skip the effect. */
export function createGlyphRain(output: HTMLCanvasElement, options: GlyphRainOptions = {}): GlyphRainInstance | null {
  // Vue props arrive as `undefined` when unset, which would overwrite the
  // defaults on a plain spread - only keep the ones actually provided.
  const provided = Object.fromEntries(Object.entries(options).filter(([, value]) => value !== undefined))
  const config: Required<GlyphRainOptions> = { ...DEFAULTS, ...provided }

  const gl = output.getContext('webgl2', {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    premultipliedAlpha: true
  })
  if (!gl || gl.isContextLost()) return null

  const compile = (type: number, text: string) => {
    const shader = gl.createShader(type)!
    gl.shaderSource(shader, text)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('GlyphRain shader error:', gl.getShaderInfoLog(shader))
    }
    return shader
  }

  const vertexShader = compile(gl.VERTEX_SHADER, VERT)
  const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAG)
  const program = gl.createProgram()!
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null

  const uniforms: Record<string, WebGLUniformLocation> = {}
  const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
  for (let i = 0; i < uniformCount; i++) {
    const info = gl.getActiveUniform(program, i)!
    uniforms[info.name] = gl.getUniformLocation(program, info.name)!
  }

  const quad = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, quad)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  const atlas = buildAtlas(config.charset)
  const atlasTexture = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, atlasTexture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas.canvas)
  gl.generateMipmap(gl.TEXTURE_2D)

  let dpr = 1
  const syncCanvasSize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.max(1, Math.round(output.clientWidth * dpr))
    const height = Math.max(1, Math.round(output.clientHeight * dpr))
    if (output.width !== width || output.height !== height) {
      output.width = width
      output.height = height
    }
  }
  syncCanvasSize()

  // Cursor wake: a 1-D strip (one texel per horizontal slice) holding how far
  // each column has been pushed forward (r) and how excited it is (g).
  const WAKE_RES = 256
  const wakeCharge = new Float32Array(WAKE_RES)
  const wakeField = new Float32Array(WAKE_RES * 2)
  let wakeLive = false
  let wakeTouched = false
  let pointerX = 0
  let tracking = false

  const wakeTexture = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, wakeTexture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RG32F, WAKE_RES, 1, 0, gl.RG, gl.FLOAT, wakeField)

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  let reducedMotion = motionQuery.matches

  const stirAmount = () => clamp(config.stir, 0, 1)
  const wakeSpan = () => {
    const width = Math.max(output.clientWidth, 1)
    return Math.max(clamp(config.stirRadius, 8, 2000) / width, 1 / WAKE_RES)
  }

  function stepWake(delta: number) {
    const stir = stirAmount()
    const decay = Math.exp(-delta / clamp(config.settle, 0.05, 8))
    const span = wakeSpan()
    const drive = stir > 0.001 && !reducedMotion
    const track = drive && tracking
    let live = false
    for (let i = 0; i < WAKE_RES; i++) {
      let charge = wakeCharge[i]! * decay
      if (track) {
        const d = Math.abs((i + 0.5) / WAKE_RES - pointerX) / span
        if (d < 1) {
          const t = 1 - d
          const target = t * t * (3 - 2 * t)
          if (target > charge) charge = target
        }
      }
      if (charge < 1e-4) charge = 0
      wakeCharge[i] = charge
      if (charge > 0) {
        live = true
        if (drive) {
          wakeField[i * 2] = wakeField[i * 2]! + delta * stir * 2.2 * charge
          wakeTouched = true
        }
      }
      wakeField[i * 2 + 1] = charge
    }
    if (!live && !wakeLive) return
    wakeLive = live
    gl!.bindTexture(gl!.TEXTURE_2D, wakeTexture)
    gl!.texSubImage2D(gl!.TEXTURE_2D, 0, 0, 0, WAKE_RES, 1, gl!.RG, gl!.FLOAT, wakeField)
  }

  let time = 7.3

  function render() {
    gl!.useProgram(program)
    gl!.activeTexture(gl!.TEXTURE1)
    gl!.bindTexture(gl!.TEXTURE_2D, atlasTexture)
    gl!.uniform1i(uniforms.uAtlas!, 1)
    gl!.activeTexture(gl!.TEXTURE2)
    gl!.bindTexture(gl!.TEXTURE_2D, wakeTexture)
    gl!.uniform1i(uniforms.uWake!, 2)
    gl!.uniform2f(uniforms.uResolution!, output.width, output.height)
    gl!.uniform1f(uniforms.uTime!, time)
    gl!.uniform1f(uniforms.uCell!, clamp(config.cell, 8, 64) * dpr)
    gl!.uniform1f(uniforms.uGlyphCount!, atlas.count)
    gl!.uniform1f(uniforms.uAtlasGrid!, atlas.grid)
    gl!.uniform3f(uniforms.uColor!, ...config.color)
    gl!.uniform3f(uniforms.uHeadColor!, ...config.headColor)
    gl!.uniform1f(uniforms.uSpeed!, clamp(config.speed, 0.05, 3))
    gl!.uniform1f(uniforms.uSpeedVar!, clamp(config.speedVariance, 0, 1))
    gl!.uniform1f(uniforms.uDensity!, clamp(config.density, 0, 1))
    gl!.uniform1f(uniforms.uTrail!, clamp(config.trail, 0.2, 3))
    gl!.uniform1f(uniforms.uGlow!, clamp(config.glow, 0, 3))
    gl!.uniform1f(uniforms.uMutate!, clamp(config.mutate, 0, 4))
    gl!.uniform1f(uniforms.uFlicker!, clamp(config.flicker, 0, 1))
    gl!.uniform1f(uniforms.uLayers!, Math.round(clamp(config.layers, 1, 3)))
    gl!.uniform1f(uniforms.uStir!, wakeTouched ? stirAmount() : 0)
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, null)
    gl!.viewport(0, 0, output.width, output.height)
    gl!.clearColor(0, 0, 0, 0)
    gl!.clear(gl!.COLOR_BUFFER_BIT)
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4)
  }

  let raf = 0
  let lastTime = performance.now()
  let destroyed = false
  let running = false
  let visible = true

  function frame(now: number) {
    if (destroyed) return
    if (!visible) {
      running = false
      return
    }
    const delta = Math.min((now - lastTime) / 1000, 1 / 30)
    lastTime = now
    if (!reducedMotion) time += delta
    stepWake(delta)
    render()
    if (reducedMotion) {
      running = false
      return
    }
    raf = requestAnimationFrame(frame)
  }

  function start() {
    if (destroyed || running || !visible) return
    running = true
    lastTime = performance.now()
    raf = requestAnimationFrame(frame)
  }
  start()

  const onMotionChange = () => {
    reducedMotion = motionQuery.matches
    start()
  }
  motionQuery.addEventListener('change', onMotionChange)

  // Pointer events go to the parent: the canvas itself is pointer-events: none
  // so the hero's buttons underneath stay clickable.
  const pointerHost = output.parentElement ?? output

  const pointerNorm = (event: PointerEvent) => {
    const box = output.getBoundingClientRect()
    return box.width < 1 ? -1 : (event.clientX - box.left) / box.width
  }

  function onPointerMove(event: PointerEvent) {
    if (reducedMotion) return
    const x = pointerNorm(event)
    if (x < 0) return
    pointerX = x
    tracking = true
    start()
  }
  const onPointerLeave = () => {
    tracking = false
  }
  function onPointerDown(event: PointerEvent) {
    if (reducedMotion || stirAmount() <= 0.001) return
    const x = pointerNorm(event)
    if (x < 0) return
    pointerX = x
    tracking = true
    const span = wakeSpan() * 1.8
    for (let i = 0; i < WAKE_RES; i++) {
      const d = Math.abs((i + 0.5) / WAKE_RES - x) / span
      if (d >= 1) continue
      const t = 1 - d
      const burst = t * t * (3 - 2 * t)
      if (burst > wakeCharge[i]!) wakeCharge[i] = burst
    }
    start()
  }

  pointerHost.addEventListener('pointermove', onPointerMove, { passive: true })
  pointerHost.addEventListener('pointerleave', onPointerLeave, { passive: true })
  pointerHost.addEventListener('pointercancel', onPointerLeave, { passive: true })
  pointerHost.addEventListener('pointerdown', onPointerDown, { passive: true })

  const resizeObserver = new ResizeObserver(() => {
    syncCanvasSize()
    start()
  })
  resizeObserver.observe(output)

  // Pause the render loop entirely once the hero has scrolled out of view.
  const intersection = new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1]?.isIntersecting ?? true
    if (visible) start()
  })
  intersection.observe(output)

  return {
    resize() {
      syncCanvasSize()
      start()
    },
    destroy() {
      destroyed = true
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      intersection.disconnect()
      motionQuery.removeEventListener('change', onMotionChange)
      pointerHost.removeEventListener('pointermove', onPointerMove)
      pointerHost.removeEventListener('pointerleave', onPointerLeave)
      pointerHost.removeEventListener('pointercancel', onPointerLeave)
      pointerHost.removeEventListener('pointerdown', onPointerDown)
      gl.deleteTexture(atlasTexture)
      gl.deleteTexture(wakeTexture)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteBuffer(quad)
    }
  }
}
