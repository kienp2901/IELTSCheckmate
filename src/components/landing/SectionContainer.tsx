import type { CSSProperties, ReactNode } from "react"

type SectionContainerProps = {
  id?: string
  mint?: boolean
  className?: string
  style?: CSSProperties
  children: ReactNode
}

export default function SectionContainer({
  id,
  mint = false,
  className = "",
  style,
  children,
}: SectionContainerProps) {
  const classes = ["section", mint && "section-mint", className].filter(Boolean).join(" ")

  return (
    <section id={id} className={classes} style={style}>
      <div className="container">{children}</div>
    </section>
  )
}
