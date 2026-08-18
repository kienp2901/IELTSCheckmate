"use client"

import { useState } from "react"
import { Drawer, IconButton } from "@mui/material"
import { Menu, X } from "lucide-react"
import logo from "../assets/logo.png"
import { useLocation } from "react-router"
import { useDialog } from "@/contexts/DialogContext"
import { useAuth } from "@/contexts/AuthContext"

type MenuItem = {
  label: string
  href: string
  onClick?: () => void
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openDialog } = useDialog()
  const { isAuthenticated, login } = useAuth()
  const location = useLocation()
  const sectionHref = (hash: string) => (location.pathname === "/" ? hash : `/${hash}`)

  const menuItems: MenuItem[] = [
    { label: "IELTS Checkmate", href: sectionHref("#system") },
    { label: "Lịch khai giảng", href: sectionHref("#schedule") },
    { label: "Khóa học", href: sectionHref("#courses") },
    { label: "Nền tảng", href: sectionHref("#platform") },
    { label: "Giảng viên", href: sectionHref("#teachers") },
    { label: "Học viên", href: sectionHref("#feedback") },
  ]

  const closeDrawer = () => setMobileMenuOpen(false)
  const handleAuthAction = () => {
    if (isAuthenticated) {
      window.location.href = `${process.env.DOMAIN_FE}/dashboard`
      return
    }
    login()
  }

  return (
    <header className="nav">
      <div className="container">
        <a href={sectionHref("#top")} className="logo" aria-label="IELTS Checkmate">
          <img src={logo} alt="IELTS Checkmate" style={{ height: "32px", width: "auto", display: "block" }} />
        </a>

        <nav className="nav-links">
          {menuItems.map((item) => (
            <a key={item.label} href={item.href} onClick={item.onClick}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="btn btn-outline" type="button" onClick={openDialog}>
            Liên hệ tư vấn
          </button>
          <a
            className="btn btn-primary"
            href="#login"
            onClick={(event) => {
              event.preventDefault()
              handleAuthAction()
            }}
          >
            {isAuthenticated ? "Vào học" : "Đăng nhập"}
          </a>
        </div>

        <IconButton className="mobile-menu" onClick={() => setMobileMenuOpen(true)} aria-label="Mở menu">
          <Menu size={22} />
        </IconButton>
      </div>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={closeDrawer}
        className="nav-mobile-drawer-root"
        sx={{
          "& .MuiDrawer-paper": {
            width: "min(320px, 100vw - 32px)",
            border: 0,
            boxShadow: "0 24px 64px rgba(6, 45, 35, 0.18)",
          },
        }}
      >
        <div className="nav-mobile-drawer">
          <div className="nav-mobile-header">
            <a href={sectionHref("#top")} onClick={closeDrawer} aria-label="IELTS Checkmate">
              <img src={logo} alt="IELTS Checkmate" className="nav-mobile-logo" />
            </a>
            <button type="button" className="nav-mobile-close" onClick={closeDrawer} aria-label="Đóng menu">
              <X size={20} />
            </button>
          </div>

          <nav className="nav-mobile-links" aria-label="Menu chính">
            {menuItems.map((item) => (
              <a key={item.label} href={item.href} onClick={closeDrawer}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-mobile-actions">
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => {
                openDialog()
                closeDrawer()
              }}
            >
              Liên hệ tư vấn
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                handleAuthAction()
                closeDrawer()
              }}
            >
              {isAuthenticated ? "Vào học" : "Đăng nhập"}
            </button>
          </div>
        </div>
      </Drawer>
    </header>
  )
}

