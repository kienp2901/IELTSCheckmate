import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react"

export type CheckmateButtonVariant = "primary" | "teal" | "outline" | "ghost"

type CheckmateButtonProps = {
  variant?: CheckmateButtonVariant
  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  children: ReactNode
  className?: string
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  disabled?: boolean
}

const variantClass: Record<CheckmateButtonVariant, string> = {
  primary: "btn-primary",
  teal: "btn-teal",
  outline: "btn-outline",
  ghost: "btn-ghost",
}

export default function CheckmateButton({
  variant = "primary",
  href,
  onClick,
  children,
  className = "",
  type = "button",
  disabled,
}: CheckmateButtonProps) {
  const classes = ["btn", variantClass[variant], className].filter(Boolean).join(" ")

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
