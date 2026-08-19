"use client"

import logo from "../assets/logo_checkmate_white.png"
import { useLocation } from "react-router"
import { useDialog } from "@/contexts/DialogContext"

export default function Footer() {
  const { openDialog } = useDialog()
  const location = useLocation()
  const sectionHref = (hash: string) => (location.pathname === "/" ? hash : `/${hash}`)

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a className="logo" href={sectionHref("#top")} aria-label="IELTS Checkmate">
              <img src={logo} alt="IELTS Checkmate" style={{ height: "48px", width: "auto", display: "block" }} />
            </a>
            <p style={{ marginTop: "16px", maxWidth: "340px" }}>
              Học có người dẫn. Luyện có AI. Lộ trình thay đổi theo chính bạn.
            </p>
          </div>
          <div>
            <h4>Sản phẩm</h4>
            <p>
              <a href={sectionHref("#courses")}>Khóa học</a>
            </p>
            <p>
              <a href={sectionHref("#platform")}>Nền tảng học tập</a>
            </p>
            <p>
              <a href={sectionHref("#system")}>IELTS Checkmate</a>
            </p>
          </div>
          <div>
            <h4>Hỗ trợ</h4>
            <p>
              <a href={sectionHref("#schedule")}>Lịch khai giảng</a>
            </p>
            <p>
              <button type="button" onClick={openDialog}>
                Tư vấn lộ trình
              </button>
            </p>
            <p>
              <a href={sectionHref("#test")}>Test đầu vào</a>
            </p>
            <p>
              <a href="/terms">Điều Khoản & Điều Kiện</a>
            </p>
            <p>
              <a href="/privacy">Chính Sách Bảo Mật</a>
            </p>
          </div>
          <div>
            <h4>IELTS Checkmate</h4>
            <p>
              <a href={sectionHref("#teachers")}>Đội ngũ</a>
            </p>
            <p>
              <button type="button" onClick={openDialog}>
                Liên hệ
              </button>
            </p>
            <p>© 2026 IELTS Checkmate · Make your move.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Teacher-led × AI-informed × Band-specific</span>
          <span>Make your move.</span>
        </div>
      </div>
    </footer>
  )
}

