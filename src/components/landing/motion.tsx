"use client"

import { motion, useInView, type Variants } from "framer-motion"
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"

type MotionContextValue = {
  reduced: boolean
}

const MotionContext = createContext<MotionContextValue>({ reduced: false })

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener?.("change", update)
    return () => media.removeEventListener?.("change", update)
  }, [])

  return reduced
}

export function useMotionReduced() {
  return useContext(MotionContext).reduced
}

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeOnlyVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
}

export const staggerContainerVariants = (stagger = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

type FadeUpProps = {
  children: ReactNode
  delay?: number
  once?: boolean
  amount?: number
  className?: string
  style?: CSSProperties
}

export function FadeUp({
  children,
  delay = 0,
  once = true,
  amount = 0.25,
  className,
  style,
}: FadeUpProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once, amount })

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeUpVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

type StaggerChildrenProps = {
  children: ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
  once?: boolean
  amount?: number
  as?: "div" | "ul" | "section"
}

export function StaggerChildren({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.05,
  once = true,
  amount = 0.2,
  as = "div",
}: StaggerChildrenProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLElement | null>(null)
  const inView = useInView(ref, { once, amount })
  const MotionTag = motion[as]

  if (reduced) {
    return (
      <div className={className} ref={ref as any}>
        {children}
      </div>
    )
  }

  return (
    <MotionTag
      ref={ref as any}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerContainerVariants(stagger, delayChildren)}
    >
      {children}
    </MotionTag>
  )
}

type RevealItemProps = {
  children: ReactNode
  className?: string
  as?: "div" | "article" | "li"
  style?: CSSProperties
}

export function RevealItem({ children, className, as = "div", style }: RevealItemProps) {
  const reduced = usePrefersReducedMotion()
  const MotionTag = motion[as]
  const Tag = as

  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag className={className} style={style} variants={fadeUpVariants}>
      {children}
    </MotionTag>
  )
}

type ScaleFadeProps = {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
  amount?: number
}

export function ScaleFade({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.3,
}: ScaleFadeProps) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once, amount })

  if (reduced) {
    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

type TypeWriterProps = {
  text: string
  speed?: number
  delay?: number
  className?: string
  as?: "span" | "h1" | "p" | "div"
  showCursor?: boolean
  onDone?: () => void
  start?: boolean
}

export function TypeWriter({
  text,
  speed = 34,
  delay = 0,
  className,
  as = "span",
  showCursor = true,
  onDone,
  start = true,
}: TypeWriterProps) {
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(reduced ? text : "")
  const [done, setDone] = useState(reduced)
  const onDoneRef = useRef(onDone)
  const Tag = as

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    if (reduced) {
      setShown(text)
      setDone(true)
      onDoneRef.current?.()
      return
    }

    if (!start) {
      setShown("")
      setDone(false)
      return
    }

    setShown("")
    setDone(false)
    let i = 0
    let intervalId: number | undefined
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        i += 1
        setShown(text.slice(0, i))
        if (i >= text.length) {
          if (intervalId) window.clearInterval(intervalId)
          setDone(true)
          onDoneRef.current?.()
        }
      }, speed)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [text, speed, delay, start, reduced])

  return (
    <Tag className={className}>
      {shown}
      {showCursor && !done && start && !reduced ? <span className="type-cursor" aria-hidden /> : null}
    </Tag>
  )
}

type CountUpProps = {
  value: number
  decimals?: number
  duration?: number
  className?: string
  start?: boolean
}

export function CountUp({ value, decimals = 1, duration = 900, className, start = true }: CountUpProps) {
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)

  useEffect(() => {
    if (reduced || !start) {
      if (reduced) setDisplay(value)
      return
    }

    const startAt = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startAt) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, duration, start, reduced])

  return <span className={className}>{display.toFixed(decimals)}</span>
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()
  const value = useMemo(() => ({ reduced }), [reduced])
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
}
