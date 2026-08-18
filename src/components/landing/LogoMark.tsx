import logo from "@/assets/logo.png"

type LogoMarkProps = {
  variant?: "header" | "footer"
  href?: string
  showText?: boolean
}

export default function LogoMark({
  variant = "header",
  href = "#top",
  showText = true,
}: LogoMarkProps) {
  const isFooter = variant === "footer"
  const logoHeight = isFooter ? 48 : 32

  return (
    <a href={href} className="logo" aria-label="IELTS Checkmate">
      <img
        src={logo}
        alt={showText ? "IELTS Checkmate" : "IELTS"}
        style={{
          height: `${logoHeight}px`,
          width: "auto",
          display: "block",
        }}
      />
    </a>
  )
}
