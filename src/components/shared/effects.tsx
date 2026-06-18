import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Target, TargetAndTransition, Transition, VariantLabels } from 'motion/react'
import { cn } from '../../lib/siteMotion'

class Grad {
  x: number
  y: number
  z: number

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  dot2(x: number, y: number): number {
    return this.x * x + this.y * y
  }
}

class Noise {
  grad3: Grad[]
  p: number[]
  perm: number[]
  gradP: Grad[]

  constructor(seed = 0) {
    this.grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0), new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1), new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)]
    this.p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180]
    this.perm = new Array(512)
    this.gradP = new Array(512)
    this.seed(seed)
  }

  seed(seed: number) {
    if (seed > 0 && seed < 1) seed *= 65536
    seed = Math.floor(seed)
    if (seed < 256) seed |= seed << 8
    for (let i = 0; i < 256; i += 1) {
      const value = i & 1 ? this.p[i] ^ (seed & 255) : this.p[i] ^ ((seed >> 8) & 255)
      this.perm[i] = this.perm[i + 256] = value
      this.gradP[i] = this.gradP[i + 256] = this.grad3[value % 12]
    }
  }

  fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10) }
  lerp(a: number, b: number, t: number) { return (1 - t) * a + t * b }
  perlin2(x: number, y: number) {
    let xFloor = Math.floor(x)
    let yFloor = Math.floor(y)
    x -= xFloor
    y -= yFloor
    xFloor &= 255
    yFloor &= 255
    const n00 = this.gradP[xFloor + this.perm[yFloor]].dot2(x, y)
    const n01 = this.gradP[xFloor + this.perm[yFloor + 1]].dot2(x, y - 1)
    const n10 = this.gradP[xFloor + 1 + this.perm[yFloor]].dot2(x - 1, y)
    const n11 = this.gradP[xFloor + 1 + this.perm[yFloor + 1]].dot2(x - 1, y - 1)
    const u = this.fade(x)
    return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), this.fade(y))
  }
}

type Point = { x: number; y: number; wave: { x: number; y: number }; cursor: { x: number; y: number; vx: number; vy: number } }
type Mouse = { x: number; y: number; lx: number; ly: number; sx: number; sy: number; v: number; vs: number; a: number; set: boolean }
type Config = { lineColor: string; waveSpeedX: number; waveSpeedY: number; waveAmpX: number; waveAmpY: number; friction: number; tension: number; maxCursorMove: number; xGap: number; yGap: number }

type WavesProps = { lineColor?: string; backgroundColor?: string; waveSpeedX?: number; waveSpeedY?: number; waveAmpX?: number; waveAmpY?: number; xGap?: number; yGap?: number; friction?: number; tension?: number; maxCursorMove?: number; style?: CSSProperties; className?: string; paused?: boolean }
type Spark = { x: number; y: number; angle: number; startTime: number }
type ClickSparkProps = { sparkColor?: string; sparkSize?: number; sparkRadius?: number; sparkCount?: number; duration?: number; easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'; extraScale?: number; children?: ReactNode }
export type RotatingTextRef = { next: () => void; previous: () => void; jumpTo: (index: number) => void; reset: () => void }
type RotatingTextProps = { texts: string[]; transition?: Transition; initial?: boolean | Target | VariantLabels; animate?: boolean | VariantLabels | TargetAndTransition; exit?: Target | VariantLabels; animatePresenceMode?: 'sync' | 'wait'; animatePresenceInitial?: boolean; rotationInterval?: number; staggerDuration?: number; staggerFrom?: 'first' | 'last' | 'center' | 'random' | number; loop?: boolean; auto?: boolean; splitBy?: 'characters' | 'words' | 'lines' | string; onNext?: (index: number) => void; mainClassName?: string; splitLevelClassName?: string; elementLevelClassName?: string }

export function Waves({ lineColor = 'black', backgroundColor = 'transparent', waveSpeedX = 0.0125, waveSpeedY = 0.005, waveAmpX = 32, waveAmpY = 16, xGap = 10, yGap = 32, friction = 0.925, tension = 0.005, maxCursorMove = 100, style = {}, className = '', paused = false }: WavesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const boundingRef = useRef({ width: 0, height: 0, left: 0, top: 0 })
  const noiseRef = useRef(new Noise(0.42))
  const linesRef = useRef<Point[][]>([])
  const mouseRef = useRef<Mouse>({ x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false })
  const configRef = useRef<Config>({ lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap })
  const frameIdRef = useRef<number | null>(null)
  const pausedRef = useRef(paused)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => { configRef.current = { lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap } }, [lineColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    ctxRef.current = canvas.getContext('2d')
    const setSize = () => { const rect = container.getBoundingClientRect(); boundingRef.current = { width: rect.width, height: rect.height, left: rect.left, top: rect.top }; canvas.width = rect.width; canvas.height = rect.height }
    const setLines = () => { const { width, height } = boundingRef.current; linesRef.current = []; const oWidth = width + 200; const oHeight = height + 30; const { xGap, yGap } = configRef.current; const totalLines = Math.ceil(oWidth / xGap); const totalPoints = Math.ceil(oHeight / yGap); const xStart = (width - xGap * totalLines) / 2; const yStart = (height - yGap * totalPoints) / 2; for (let i = 0; i <= totalLines; i += 1) { const points: Point[] = []; for (let j = 0; j <= totalPoints; j += 1) { points.push({ x: xStart + xGap * i, y: yStart + yGap * j, wave: { x: 0, y: 0 }, cursor: { x: 0, y: 0, vx: 0, vy: 0 } }) } linesRef.current.push(points) } }
    const updateMouse = (x: number, y: number) => { const mouse = mouseRef.current; const bounds = boundingRef.current; mouse.x = x - bounds.left; mouse.y = y - bounds.top; if (!mouse.set) { mouse.sx = mouse.x; mouse.sy = mouse.y; mouse.lx = mouse.x; mouse.ly = mouse.y; mouse.set = true } }
    const moved = (point: Point, withCursor = true) => ({ x: Math.round((point.x + point.wave.x + (withCursor ? point.cursor.x : 0)) * 10) / 10, y: Math.round((point.y + point.wave.y + (withCursor ? point.cursor.y : 0)) * 10) / 10 })
    const movePoints = (time: number) => { const mouse = mouseRef.current; const noise = noiseRef.current; const { waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove } = configRef.current; linesRef.current.forEach((points) => { points.forEach((point) => { const move = noise.perlin2((point.x + time * waveSpeedX) * 0.002, (point.y + time * waveSpeedY) * 0.0015) * 12; point.wave.x = Math.cos(move) * waveAmpX; point.wave.y = Math.sin(move) * waveAmpY; const dx = point.x - mouse.sx; const dy = point.y - mouse.sy; const distance = Math.hypot(dx, dy); const radius = Math.max(175, mouse.vs); if (distance < radius) { const strength = 1 - distance / radius; const force = Math.cos(distance * 0.001) * strength; point.cursor.vx += Math.cos(mouse.a) * force * radius * mouse.vs * 0.00065; point.cursor.vy += Math.sin(mouse.a) * force * radius * mouse.vs * 0.00065 } point.cursor.vx += (0 - point.cursor.x) * tension; point.cursor.vy += (0 - point.cursor.y) * tension; point.cursor.vx *= friction; point.cursor.vy *= friction; point.cursor.x += point.cursor.vx * 2; point.cursor.y += point.cursor.vy * 2; point.cursor.x = Math.min(maxCursorMove, Math.max(-maxCursorMove, point.cursor.x)); point.cursor.y = Math.min(maxCursorMove, Math.max(-maxCursorMove, point.cursor.y)) }) }) }
    const drawLines = () => { const context = ctxRef.current; const { width, height } = boundingRef.current; if (!context) return; context.clearRect(0, 0, width, height); context.beginPath(); context.strokeStyle = configRef.current.lineColor; linesRef.current.forEach((points) => { let point = moved(points[0], false); context.moveTo(point.x, point.y); points.forEach((currentPoint, index) => { const isLast = index === points.length - 1; point = moved(currentPoint, !isLast); const nextPoint = moved(points[index + 1] || points[points.length - 1], !isLast); context.lineTo(point.x, point.y); if (isLast) context.moveTo(nextPoint.x, nextPoint.y) }) }); context.stroke() }
    const tick = (time: number) => { if (pausedRef.current) { frameIdRef.current = window.requestAnimationFrame(tick); return } const mouse = mouseRef.current; mouse.sx += (mouse.x - mouse.sx) * 0.1; mouse.sy += (mouse.y - mouse.sy) * 0.1; const dx = mouse.x - mouse.lx; const dy = mouse.y - mouse.ly; const distance = Math.hypot(dx, dy); mouse.v = distance; mouse.vs += (distance - mouse.vs) * 0.1; mouse.vs = Math.min(100, mouse.vs); mouse.lx = mouse.x; mouse.ly = mouse.y; mouse.a = Math.atan2(dy, dx); container.style.setProperty('--x', `${mouse.sx}px`); container.style.setProperty('--y', `${mouse.sy}px`); movePoints(time); drawLines(); frameIdRef.current = window.requestAnimationFrame(tick) }
    const handleResize = () => { setSize(); setLines() }
    const handleMouseMove = (event: globalThis.MouseEvent) => updateMouse(event.clientX, event.clientY)
    const handleTouchMove = (event: TouchEvent) => { const [touch] = event.touches; if (touch) updateMouse(touch.clientX, touch.clientY) }
    setSize(); setLines(); frameIdRef.current = window.requestAnimationFrame(tick); window.addEventListener('resize', handleResize); window.addEventListener('mousemove', handleMouseMove); window.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('touchmove', handleTouchMove); if (frameIdRef.current !== null) window.cancelAnimationFrame(frameIdRef.current) }
  }, [])

  return <div ref={containerRef} className={`waves ${className}`} style={{ position: 'absolute', top: 0, left: 0, margin: 0, padding: 0, width: '100%', height: '100%', overflow: 'hidden', backgroundColor, opacity: paused ? 0 : 1, transition: 'opacity 400ms ease', ...style }} aria-hidden="true"><canvas ref={canvasRef} className="waves-canvas" /></div>
}

export function ClickSpark({ sparkColor = '#6d4b2f', sparkSize = 12, sparkRadius = 18, sparkCount = 8, duration = 420, easing = 'ease-out', extraScale = 1, children }: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Spark[]>([])
  useEffect(() => { const canvas = canvasRef.current; const parent = canvas?.parentElement; if (!canvas || !parent) return; let resizeTimeout = 0; const resizeCanvas = () => { const { width, height } = parent.getBoundingClientRect(); const pixelRatio = window.devicePixelRatio || 1; const nextWidth = Math.max(1, Math.floor(width * pixelRatio)); const nextHeight = Math.max(1, Math.floor(height * pixelRatio)); if (canvas.width !== nextWidth || canvas.height !== nextHeight) { canvas.width = nextWidth; canvas.height = nextHeight; canvas.style.width = `${width}px`; canvas.style.height = `${height}px` } }; const handleResize = () => { window.clearTimeout(resizeTimeout); resizeTimeout = window.setTimeout(resizeCanvas, 100) }; const observer = new ResizeObserver(handleResize); observer.observe(parent); resizeCanvas(); return () => { observer.disconnect(); window.clearTimeout(resizeTimeout) } }, [])
  const easeFunc = useCallback((progress: number) => { switch (easing) { case 'linear': return progress; case 'ease-in': return progress * progress; case 'ease-in-out': return progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress; case 'ease-out': default: return progress * (2 - progress) } }, [easing])
  useEffect(() => { const canvas = canvasRef.current; const context = canvas?.getContext('2d'); if (!canvas || !context) return; let animationFrame = 0; const draw = (timestamp: number) => { const pixelRatio = window.devicePixelRatio || 1; context.clearRect(0, 0, canvas.width, canvas.height); sparksRef.current = sparksRef.current.filter((spark) => { const elapsed = timestamp - spark.startTime; if (elapsed >= duration) return false; const progress = elapsed / duration; const eased = easeFunc(progress); const distance = eased * sparkRadius * extraScale * pixelRatio; const lineLength = sparkSize * (1 - eased) * pixelRatio; const originX = spark.x * pixelRatio; const originY = spark.y * pixelRatio; const x1 = originX + distance * Math.cos(spark.angle); const y1 = originY + distance * Math.sin(spark.angle); const x2 = originX + (distance + lineLength) * Math.cos(spark.angle); const y2 = originY + (distance + lineLength) * Math.sin(spark.angle); context.strokeStyle = sparkColor; context.globalAlpha = Math.max(0, 1 - eased); context.lineWidth = 2 * pixelRatio; context.lineCap = 'round'; context.beginPath(); context.moveTo(x1, y1); context.lineTo(x2, y2); context.stroke(); context.globalAlpha = 1; return true }); animationFrame = window.requestAnimationFrame(draw) }; animationFrame = window.requestAnimationFrame(draw); return () => window.cancelAnimationFrame(animationFrame) }, [duration, easeFunc, extraScale, sparkColor, sparkRadius, sparkSize])
  const handleClick = (event: ReactMouseEvent<HTMLDivElement>) => { const canvas = canvasRef.current; if (!canvas) return; const rect = canvas.getBoundingClientRect(); const x = event.clientX - rect.left; const y = event.clientY - rect.top; const now = performance.now(); const newSparks = Array.from({ length: sparkCount }, (_, index) => ({ x, y, angle: (2 * Math.PI * index) / sparkCount, startTime: now })); sparksRef.current.push(...newSparks) }
  return <div className="click-spark" onClick={handleClick}><canvas ref={canvasRef} className="click-spark__canvas" aria-hidden="true" />{children}</div>
}

export const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(function RotatingText({ texts, transition = { type: 'spring', damping: 25, stiffness: 300 }, initial = { y: '100%', opacity: 0 }, animate = { y: 0, opacity: 1 }, exit = { y: '-120%', opacity: 0 }, animatePresenceMode = 'wait', animatePresenceInitial = false, rotationInterval = 2200, staggerDuration = 0, staggerFrom = 'first', loop = true, auto = true, splitBy = 'characters', onNext, mainClassName, splitLevelClassName, elementLevelClassName }, ref) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const elements = useMemo(() => { const currentText = texts[currentTextIndex] ?? ''; if (splitBy === 'characters') return currentText.split(' ').map((word, index, array) => ({ characters: Array.from(word), needsSpace: index !== array.length - 1 })); if (splitBy === 'words') return currentText.split(' ').map((word, index, array) => ({ characters: [word], needsSpace: index !== array.length - 1 })); if (splitBy === 'lines') return currentText.split('\n').map((line, index, array) => ({ characters: [line], needsSpace: index !== array.length - 1 })); return currentText.split(splitBy).map((part, index, array) => ({ characters: [part], needsSpace: index !== array.length - 1 })) }, [currentTextIndex, splitBy, texts])
  const getStaggerDelay = useCallback((index: number, total: number) => { if (staggerFrom === 'first') return index * staggerDuration; if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration; if (staggerFrom === 'center') return Math.abs(Math.floor(total / 2) - index) * staggerDuration; if (staggerFrom === 'random') return Math.abs(((index * 7) % Math.max(total, 1)) - index) * staggerDuration; return Math.abs(staggerFrom - index) * staggerDuration }, [staggerDuration, staggerFrom])
  const handleIndexChange = useCallback((newIndex: number) => { setCurrentTextIndex(newIndex); onNext?.(newIndex) }, [onNext])
  const next = useCallback(() => { const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1; if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex) }, [currentTextIndex, handleIndexChange, loop, texts.length])
  const previous = useCallback(() => { const previousIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1; if (previousIndex !== currentTextIndex) handleIndexChange(previousIndex) }, [currentTextIndex, handleIndexChange, loop, texts.length])
  const jumpTo = useCallback((index: number) => { const validIndex = Math.max(0, Math.min(index, texts.length - 1)); if (validIndex !== currentTextIndex) handleIndexChange(validIndex) }, [currentTextIndex, handleIndexChange, texts.length])
  const reset = useCallback(() => { if (currentTextIndex !== 0) handleIndexChange(0) }, [currentTextIndex, handleIndexChange])
  useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [jumpTo, next, previous, reset])
  useEffect(() => { if (!auto || texts.length < 2) return; const intervalId = window.setInterval(next, rotationInterval); return () => window.clearInterval(intervalId) }, [auto, next, rotationInterval, texts.length])
  const totalCharacters = elements.reduce((sum, word) => sum + word.characters.length, 0)
  return <motion.span className={cn('text-rotate', mainClassName)} layout transition={transition}><span className="text-rotate-sr-only">{texts[currentTextIndex]}</span><AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}><motion.span key={currentTextIndex} className={cn(splitBy === 'lines' ? 'text-rotate-lines' : 'text-rotate')} layout aria-hidden="true">{elements.map((word, wordIndex, array) => { const previousCharacters = array.slice(0, wordIndex).reduce((sum, previousWord) => sum + previousWord.characters.length, 0); return <span key={`${texts[currentTextIndex]}-${wordIndex}`} className={cn('text-rotate-word', splitLevelClassName)}>{word.characters.map((character, characterIndex) => <motion.span key={`${character}-${characterIndex}`} initial={initial} animate={animate} exit={exit} transition={{ ...transition, delay: getStaggerDelay(previousCharacters + characterIndex, totalCharacters) }} className={cn('text-rotate-element', elementLevelClassName)}>{character}</motion.span>)}{word.needsSpace && <span className="text-rotate-space"> </span>}</span> })}</motion.span></AnimatePresence></motion.span>
})


