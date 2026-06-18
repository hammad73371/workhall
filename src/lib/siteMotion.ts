export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function getEnterMotionProps(
  reducedMotion: boolean,
  options: {
    y?: number
    x?: number
    scale?: number
    duration?: number
    delay?: number
  } = {},
) {
  const { y = 24, x = 0, scale = 0.985, duration = 0.82, delay = 0 } = options

  if (reducedMotion) {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true, amount: 0.2 },
      transition: { duration: 0.01, delay: 0 },
    }
  }

  return {
    initial: { opacity: 0, y, x, scale },
    whileInView: { opacity: 1, y: 0, x: 0, scale: 1 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration, delay, ease: 'easeOut' as const },
  }
}

export function getRevealMotionProps(
  reducedMotion: boolean,
  options: {
    y?: number
    x?: number
    scale?: number
    duration?: number
    delay?: number
    amount?: number
  } = {},
) {
  const { amount = 0.18, ...rest } = options
  const props = getEnterMotionProps(reducedMotion, rest)

  return {
    ...props,
    viewport: { once: true, amount },
  }
}


