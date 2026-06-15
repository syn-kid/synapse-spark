// SynapseSpark — Iridescence WebGL Background
// Vanilla JS port of the Iridescence React component, using OGL

import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;

const DEFAULTS = {
  color: [0.486, 0.227, 0.929],
  speed: 1.0,
  amplitude: 0.1,
  mouseReact: true,
};

export function initIridescence(options = {}) {
  const opts = { ...DEFAULTS, ...options };

  const container = document.createElement('div');
  container.className = 'iridescence-container';
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;overflow:hidden;';
  if (document.body.firstChild) {
    document.body.insertBefore(container, document.body.firstChild);
  } else {
    document.body.appendChild(container);
  }

  const renderer = new Renderer({
    alpha: false,
    antialias: false,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
  });
  const gl = renderer.gl;
  gl.clearColor(1, 1, 1, 1);

  const canvas = gl.canvas;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const mousePos = { x: 0.5, y: 0.5 };

  let program;

  function resize() {
    const scale = 1;
    renderer.setSize(container.offsetWidth * scale, container.offsetHeight * scale);
    if (program) {
      program.uniforms.uResolution.value = new Color(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    }
  }

  window.addEventListener('resize', resize, false);
  resize();

  const geometry = new Triangle(gl);
  program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new Color(...opts.color) },
      uResolution: {
        value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
      },
      uMouse: { value: new Float32Array([mousePos.x, mousePos.y]) },
      uAmplitude: { value: opts.amplitude },
      uSpeed: { value: opts.speed }
    }
  });

  const mesh = new Mesh(gl, { geometry, program });

  let raf = 0;
  let isVisible = true;
  let isPageVisible = !document.hidden;

  function update(t) {
    program.uniforms.uTime.value = t * 0.001;
    renderer.render({ scene: mesh });
    raf = requestAnimationFrame(update);
  }

  function tryStart() {
    if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(update);
  }
  function tryStop() {
    if (raf !== 0) { cancelAnimationFrame(raf); raf = 0; }
  }

  const io = new IntersectionObserver(
    ([entry]) => { isVisible = entry.isIntersecting; isVisible ? tryStart() : tryStop(); },
    { threshold: 0 },
  );
  io.observe(container);

  function onVisibility() {
    isPageVisible = !document.hidden;
    isPageVisible ? tryStart() : tryStop();
  }
  document.addEventListener('visibilitychange', onVisibility);

  function handleMouseMove(e) {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    mousePos.x = x;
    mousePos.y = y;
    program.uniforms.uMouse.value[0] = x;
    program.uniforms.uMouse.value[1] = y;
  }

  if (opts.mouseReact) {
    window.addEventListener('mousemove', handleMouseMove);
  }

  tryStart();

  return {
    canvas,
    container,
    destroy() {
      tryStop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resize);
      if (opts.mouseReact) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      try { container.removeChild(canvas); } catch {}
      try { document.body.removeChild(container); } catch {}
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}
