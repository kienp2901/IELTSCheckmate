import type { ReactNode } from "react"

type SectionHeadProps = {
  kicker: string
  title: ReactNode
  description?: ReactNode
  align?: "center" | "left"
}

export default function SectionHead({
  kicker,
  title,
  description,
  align = "center",
}: SectionHeadProps) {
  return (
    <div className={`section-head${align === "left" ? " left" : ""}`}>
      <div className="kicker">{kicker}</div>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  )
}
