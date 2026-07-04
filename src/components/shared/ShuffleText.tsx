import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './ShuffleText.css'

type ShuffleTextProps = {
  text: string
  className?: string
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  startDelay?: number
  stagger?: number
  duration?: number
  accentColor?: string
  finalColor?: string
}

export function ShuffleText({
  text,
  className = '',
  threshold = 0.2,
  rootMargin = '0px 0px -10% 0px',
  triggerOnce = true,
  startDelay = 0,
  stagger = 120,
  duration = 720,
  accentColor = '#D26D45',
  finalColor = 'currentColor',
}: ShuffleTextProps) {
  const reducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLSpanElement>(null)
  const hasPlayedRef = useRef(false)
  const [isActive, setIsActive] = useState(false)
  const [runId, setRunId] = useState(0)

  const tokens = useMemo(() => text.split(/(\s+)/), [text])

  useEffect(() => {
    const node = containerRef.current
    if (!node || reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (triggerOnce && hasPlayedRef.current) return
        hasPlayedRef.current = true
        setRunId((current) => current + 1)
        setIsActive(false)
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            setIsActive(true)
          })
        })
        if (triggerOnce) observer.disconnect()
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion, rootMargin, threshold, triggerOnce])

  if (reducedMotion) {
    return <span className={className}>{text}</span>
  }

  let wordIndex = -1

  return (
    <span
      ref={containerRef}
      className={`shuffle-text ${isActive ? 'is-active' : ''} ${className}`.trim()}
      aria-label={text}
      style={
        {
          '--shuffle-accent-color': accentColor,
          '--shuffle-final-color': finalColor,
          '--shuffle-duration': `${duration}ms`,
          '--shuffle-stagger': `${stagger}ms`,
          '--shuffle-start-delay': `${startDelay}ms`,
        } as CSSProperties
      }
    >
      {tokens.map((token, index) => {
        if (token.includes('\n')) {
          return token.split('\n').map((part, partIndex, parts) => (
            <span key={`line-${index}-${partIndex}`}>
              {part}
              {partIndex < parts.length - 1 && <br />}
            </span>
          ))
        }

        if (token.trim().length === 0) {
          return (
            <span key={`space-${index}`} className="shuffle-text__space" aria-hidden="true">
              {token}
            </span>
          )
        }

        wordIndex += 1

        return (
          <span
            key={`word-${index}-${runId}`}
            className="shuffle-text__word"
            style={{
              ['--word-index' as string]: String(wordIndex),
              ['--word-duration' as string]: `${duration}ms`,
              ['--word-delay' as string]: `calc(var(--shuffle-start-delay, 0ms) + ${wordIndex} * var(--shuffle-stagger, 120ms))`,
            }}
            aria-hidden="true"
          >
            {token}
          </span>
        )
      })}
    </span>
  )
}
