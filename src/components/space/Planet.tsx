import { useRef, useState, useEffect } from 'react'

export type PlanetKind =
  | 'earth'
  | 'moon'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'sun'

interface Props {
  kind: PlanetKind
  size: number
  target: string
  frac?: number
  side?: 'left' | 'right'
  offset?: number
  opacity?: number
  scrollSpeed?: number
}

export default function Planet({
  kind,
  size,
  target,
  frac = 0.5,
  side = 'right',
  offset = -120,
  opacity = 0.85,
  scrollSpeed = 1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ top: 0, ready: false })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const compute = () => {
      const tgt = document.querySelector(target)
      const page = document.querySelector('.page')
      if (!tgt || !page) return
      const pageRect = page.getBoundingClientRect()
      const tgtRect = tgt.getBoundingClientRect()
      const top = tgtRect.top - pageRect.top + tgtRect.height * frac - size / 2
      setPos({ top, ready: true })
    }
    compute()
    window.addEventListener('resize', compute)
    const t1 = setTimeout(compute, 300)
    const t2 = setTimeout(compute, 1200)
    return () => {
      window.removeEventListener('resize', compute)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [target, frac, size])

  useEffect(() => {
    const el = ref.current
    if (!el || !pos.ready) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { rootMargin: '15% 0px 15% 0px', threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [pos.ready])

  useEffect(() => {
    const el = ref.current
    if (!el || !pos.ready) return
    let raf = 0
    const update = () => {
      const r = el.getBoundingClientRect()
      const center = r.top + r.height / 2 - window.innerHeight / 2
      el.style.setProperty('--parallax', -center * 0.08 * scrollSpeed + 'px')
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [scrollSpeed, pos.ready])

  const style: React.CSSProperties = {
    top: pos.top,
    width: size,
    height: size,
    opacity: pos.ready && visible ? opacity : 0,
    transform: 'translateY(var(--parallax, 0px))',
    ...(side === 'left' ? { left: offset } : { right: offset }),
  }

  return (
    <div
      ref={ref}
      className={`planet planet-${kind}${visible ? ' visible' : ''}`}
      style={style}
      aria-hidden="true"
    >
      <div className="planet-wrap" style={{ width: '100%', height: '100%' }}>
        <div className="planet-inner">
          {(kind === 'saturn' || kind === 'uranus') && <div className="rings" />}
        </div>
      </div>
    </div>
  )
}
