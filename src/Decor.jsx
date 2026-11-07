// Elementos decorativos animados: borboletas, brilhos, bolhas, nuvens, penas.

let gid = 0

export function Butterfly({ x, y, size = 80, rot = 0, blur = 2, delay = 0, drift = true }) {
  const id = `bf${++gid}`
  return (
    <div
      className={`butterfly ${drift ? 'drift' : ''}`}
      style={{ left: x, top: y, width: size, height: size * 0.8, '--rot': `${rot}deg`, '--delay': `${delay}s`, filter: `blur(${blur}px)` }}
    >
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6a6dc" />
            <stop offset="0.55" stopColor="#c6a4f4" />
            <stop offset="1" stopColor="#9fb4ff" />
          </linearGradient>
        </defs>
        <g className="wing wing-l" fill={`url(#${id})`}>
          <path d="M50 40 C34 2 2 4 6 26 C9 42 32 46 50 40Z" />
          <path d="M50 42 C36 48 16 66 28 76 C40 82 48 62 50 42Z" />
        </g>
        <g className="wing wing-r" fill={`url(#${id})`}>
          <path d="M50 40 C66 2 98 4 94 26 C91 42 68 46 50 40Z" />
          <path d="M50 42 C64 48 84 66 72 76 C60 82 52 62 50 42Z" />
        </g>
        <ellipse cx="50" cy="44" rx="2.6" ry="15" fill="#a98be6" />
      </svg>
    </div>
  )
}

export function Sparkle({ x, y, size = 40, delay = 0, color = '#8ff3ff' }) {
  return (
    <div className="sparkle" style={{ left: x, top: y, width: size, height: size, '--delay': `${delay}s`, color }}>
      <svg viewBox="0 0 40 40" width="100%" height="100%">
        <path d="M20 0 C21 15 25 19 40 20 C25 21 21 25 20 40 C19 25 15 21 0 20 C15 19 19 15 20 0Z" fill="currentColor" />
      </svg>
    </div>
  )
}

export function Bubble({ x, y, size = 160, delay = 0 }) {
  return <div className="bubble" style={{ left: x, top: y, width: size, height: size, '--delay': `${delay}s` }} />
}

export function Clouds({ bottom = 0, left = 0, width = 1280, opacity = 1, tint = '#ffffff' }) {
  const puffs = [
    [0, 90, 210], [150, 40, 240], [330, 100, 200], [470, 30, 260], [680, 90, 220],
    [840, 20, 270], [1050, 80, 230], [1180, 50, 200],
  ]
  return (
    <div className="clouds" style={{ bottom, left, width, opacity }}>
      {puffs.map(([px, py, s], i) => (
        <span
          key={i}
          style={{ left: (px / 1280) * width, top: py, width: s, height: s, background: `radial-gradient(circle at 45% 35%, ${tint} 0%, ${tint}ee 45%, #efe4fb 75%, #e2d2f7 100%)`, '--delay': `${i * 0.7}s` }}
        />
      ))}
    </div>
  )
}

export function Feather({ x, y, size = 180, rot = -15, delay = 0 }) {
  return (
    <div className="feather" style={{ left: x, top: y, width: size, height: size * 0.35, '--rot': `${rot}deg`, '--delay': `${delay}s` }}>
      <svg viewBox="0 0 200 70" width="100%" height="100%">
        <defs>
          <linearGradient id="fth" x1="0" x2="1">
            <stop offset="0" stopColor="#e9dcff" />
            <stop offset="1" stopColor="#b79cf0" />
          </linearGradient>
        </defs>
        <path d="M6 52 C40 10 120 0 194 18 C150 34 90 64 6 52Z" fill="url(#fth)" opacity=".9" />
        <path d="M2 58 C60 40 120 26 194 18" stroke="#fff" strokeWidth="2" fill="none" opacity=".8" />
      </svg>
    </div>
  )
}

export function Glow({ x, y, w, h, colors = ['#f7b7d7', '#c9b3f5'], opacity = 0.8 }) {
  return (
    <div
      className="glow"
      style={{ left: x, top: y, width: w, height: h, opacity, background: `radial-gradient(ellipse at center, ${colors[0]} 0%, ${colors[1]} 45%, transparent 72%)` }}
    />
  )
}

export function MiniLogo({ x = 1086, y = 64, light = false }) {
  return (
    <div className={`mini-logo ${light ? 'light' : ''}`} style={{ left: x, top: y }}>
      <svg viewBox="0 0 100 80" width="46" height="40">
        <path d="M50 40 C34 2 2 4 6 26 C9 42 32 46 50 40Z M50 42 C36 48 16 66 28 76 C40 82 48 62 50 42Z" fill="currentColor" />
        <path d="M50 40 C66 10 90 14 92 30 C93 42 68 46 50 40Z" fill="currentColor" opacity=".75" />
      </svg>
      <span>LUMI</span>
    </div>
  )
}

/** Partículas de brilho que flutuam por cima de todos os slides */
export function FloatingParticles() {
  const dots = Array.from({ length: 26 }, (_, i) => ({
    left: (i * 137) % 1280,
    size: 2 + ((i * 7) % 5),
    dur: 14 + ((i * 3) % 12),
    delay: -((i * 1.9) % 20),
  }))
  return (
    <div className="particles">
      {dots.map((d, i) => (
        <span key={i} style={{ left: d.left, width: d.size, height: d.size, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }} />
      ))}
    </div>
  )
}
