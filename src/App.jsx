import { useCallback, useEffect, useRef, useState } from 'react'
import { slides } from './slides.jsx'
import { FloatingParticles } from './Decor.jsx'

// Tempo de cada slide em segundos. Pode trocar pela URL: http://localhost:5173/?tempo=15
const params = new URLSearchParams(window.location.search)
const TEMPO = Math.max(3, Number(params.get('tempo')) || 10)
const TRANSICAO = 1200 // ms

const W = 1280
const H = 720

function useStageScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return scale
}

export default function App() {
  const scale = useStageScale()
  const [idx, setIdx] = useState(() => Math.max(0, (Number(params.get("slide")) || 1) - 1) % slides.length)
  const [prev, setPrev] = useState(null)
  const [paused, setPaused] = useState(false)
  const [run, setRun] = useState(0) // reinicia a barra de progresso
  const [idle, setIdle] = useState(false)
  const [isFull, setIsFull] = useState(false)
  const leaveTimer = useRef()

  const go = useCallback((n) => {
    setIdx((cur) => {
      const next = (n + slides.length) % slides.length
      if (next === cur) return cur
      setPrev(cur)
      clearTimeout(leaveTimer.current)
      leaveTimer.current = setTimeout(() => setPrev(null), TRANSICAO)
      return next
    })
    setRun((r) => r + 1)
  }, [])

  // troca automática
  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => go(idx + 1), TEMPO * 1000)
    return () => clearTimeout(t)
  }, [idx, paused, run, go])

  const toggleFull = useCallback(() => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {})
    else document.exitFullscreen?.()
  }, [])

  // teclado: ← → navegar, espaço pausar, F tela cheia
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') go(idx + 1)
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') go(idx - 1)
      else if (e.key === ' ') { e.preventDefault(); setPaused((p) => !p); setRun((r) => r + 1) }
      else if (e.key.toLowerCase() === 'f') toggleFull()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx, go, toggleFull])

  // esconde o cursor e os controles quando ninguém mexe no mouse
  useEffect(() => {
    let t
    const wake = () => { setIdle(false); clearTimeout(t); t = setTimeout(() => setIdle(true), 2500) }
    wake()
    window.addEventListener('mousemove', wake)
    window.addEventListener('touchstart', wake)
    return () => { clearTimeout(t); window.removeEventListener('mousemove', wake); window.removeEventListener('touchstart', wake) }
  }, [])

  // estado da tela cheia + mantém a tela ligada (Wake Lock)
  useEffect(() => {
    let lock
    const requestLock = async () => { try { lock = await navigator.wakeLock?.request('screen') } catch { /* sem suporte */ } }
    const onFs = () => setIsFull(!!document.fullscreenElement)
    const onVis = () => document.visibilityState === 'visible' && requestLock()
    requestLock()
    document.addEventListener('fullscreenchange', onFs)
    document.addEventListener('visibilitychange', onVis)
    return () => { lock?.release?.(); document.removeEventListener('fullscreenchange', onFs); document.removeEventListener('visibilitychange', onVis) }
  }, [])

  const Current = slides[idx]
  const Prev = prev !== null ? slides[prev] : null

  return (
    <div className={`viewport ${idle ? 'idle' : ''}`} onDoubleClick={toggleFull}>
      <div className="stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        {Prev && (
          <div className="slide leaving" key={`p${prev}`}>
            <Prev />
          </div>
        )}
        <div className="slide entering" key={`c${idx}`}>
          <Current />
        </div>
        <FloatingParticles />
        <div className="page-num">{idx + 1}</div>
        <div className="dots">
          {slides.map((_, i) => (
            <button key={i} className={i === idx ? 'on' : ''} onClick={() => go(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="progress">
          <div key={`${idx}-${run}`} className="progress-fill" style={{ animationDuration: `${TEMPO}s`, animationPlayState: paused ? 'paused' : 'running' }} />
        </div>
      </div>

      <div className="controls">
        <button onClick={() => go(idx - 1)} title="Anterior (←)">‹</button>
        <button onClick={() => { setPaused((p) => !p); setRun((r) => r + 1) }} title="Pausar (espaço)">{paused ? '▶' : '❚❚'}</button>
        <button onClick={() => go(idx + 1)} title="Próximo (→)">›</button>
        <button onClick={toggleFull} title="Tela cheia (F)">{isFull ? '⤡' : '⛶'}</button>
      </div>
    </div>
  )
}
