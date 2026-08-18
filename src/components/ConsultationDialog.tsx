"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Dialog } from "@mui/material"
import { api } from "../api"
import girl3d1 from "../assets/girl3d1.png"
import Group3 from "../assets/Group3.png"
import Ellipse2553 from "../assets/Ellipse2553.png"

interface ConsultationDialogProps {
  open: boolean
  onClose: () => void
}

type FormState = {
  name: string
  phone: string
  email: string
  message: string
  timeSlot: string
}

const INITIAL_FORM: FormState = {
  name: "",
  phone: "",
  email: "",
  message: "",
  timeSlot: "",
}

const INITIAL_ERRORS = {
  phone: "",
  email: "",
}

export default function ConsultationDialog({ open, onClose }: ConsultationDialogProps) {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState(INITIAL_ERRORS)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return

    const timeout = window.setTimeout(() => {
      nameInputRef.current?.focus({ preventScroll: true })
    }, 120)

    return () => window.clearTimeout(timeout)
  }, [open])

  const validatePhone = (phone: string) => /^(0|\+84)(\d{9,10})$/.test(phone)
  const validateEmail = (email: string) => !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "phone") {
      setErrors((prev) => ({
        ...prev,
        phone: validatePhone(value) ? "" : "Số điện thoại không hợp lệ",
      }))
    }

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Email không hợp lệ",
      }))
    }
  }

  const resetForm = () => {
    setFormData(INITIAL_FORM)
    setErrors(INITIAL_ERRORS)
  }

  const handleClose = () => {
    if (isSubmitting) return
    onClose()
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const phoneValid = validatePhone(formData.phone)
    const emailValid = validateEmail(formData.email)

    setErrors({
      phone: phoneValid ? "" : "Số điện thoại không hợp lệ",
      email: emailValid ? "" : "Email không hợp lệ",
    })

    if (!phoneValid || !emailValid) return

    setIsSubmitting(true)

    try {
      await api.contact.create({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        timeSlot: formData.timeSlot,
        message: formData.message,
      })

      resetForm()
      onClose()
      window.location.href = `${process.env.PREFIX}/contact`
    } catch (error: any) {
      alert(error?.message || "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại!")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      slotProps={{
        backdrop: {
          sx: {
            background: "rgba(5, 30, 24, 0.7)",
            backdropFilter: "blur(5px)",
          },
        },
      }}
      PaperProps={{
        sx: {
          width: "min(900px, calc(100vw - 44px))",
          maxWidth: "none",
          background: "transparent",
          boxShadow: "none",
          overflow: "visible",
          m: 0,
        },
      }}
    >
      <div className="consult-modal" role="dialog" aria-modal="true" aria-labelledby="consultTitle">
        <button className="consult-close" onClick={handleClose} aria-label="Đóng" type="button">
          ×
        </button>

        <div className="consult-visual">
          <div className="cchecker" />
          <div className="consult-visual-copy">
            <div className="consult-mini-label">IELTS CHECKMATE</div>
            <h2 id="consultTitle">
              Tư vấn
              <br />
              chương trình học
            </h2>
            <p>Bạn để lại thông tin, Checkmate sẽ liên hệ tư vấn lộ trình phù hợp ngay nhé.</p>
          </div>
          <div className="consult-badge-row">
            <span>✓ Miễn phí</span>
            <span>✓ Không ràng buộc</span>
            <span>✓ Phản hồi trong 24h</span>
          </div>
          <div className="consult-visual-art">
            <img src={Ellipse2553} alt="" className="consult-art-ellipse" />
            <img src={Group3} alt="" className="consult-art-group" />
            <img src={girl3d1} alt="IELTS Checkmate" className="consult-art-character" />
          </div>
        </div>

        <div className="consult-form-panel">
          <form onSubmit={handleSubmit}>
            <label>
              Họ và tên (*)
              <input
                ref={nameInputRef}
                name="name"
                required
                placeholder="Nhập họ và tên"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Số điện thoại (*)
              <input
                name="phone"
                required
                inputMode="tel"
                placeholder="+84"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone ? <small style={{ color: "#d14343", display: "block", marginTop: 8 }}>{errors.phone}</small> : null}
            </label>

            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="Nhập địa chỉ email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email ? <small style={{ color: "#d14343", display: "block", marginTop: 8 }}>{errors.email}</small> : null}
            </label>

            <label>
              Khung giờ nhận tư vấn (*)
              <select name="timeSlot" required value={formData.timeSlot} onChange={handleChange}>
                <option value="">Chọn khung giờ</option>
                <option value="9h - 11h sáng">9h - 11h sáng</option>
                <option value="11h - 13h">11h - 13h</option>
                <option value="14h - 16h">14h - 16h</option>
                <option value="16h - 18h">16h - 18h</option>
                <option value="19h - 21h">19h - 21h</option>
              </select>
            </label>

            <label>
              Nội dung
              <textarea
                name="message"
                rows={5}
                placeholder={"Bạn có câu hỏi gì?\n• Hãy cho Checkmate biết trình độ hiện tại của bạn?\n• Mục tiêu mong muốn"}
                value={formData.message}
                onChange={handleChange}
              />
            </label>

            <button className="btn btn-teal consult-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang gửi..." : "Liên hệ ngay"}
            </button>
            <p className="consult-note">Thông tin của bạn chỉ được sử dụng để liên hệ tư vấn chương trình học.</p>
          </form>
        </div>
      </div>
    </Dialog>
  )
}
