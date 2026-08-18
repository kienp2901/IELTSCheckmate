import { useState } from "react"
import { api } from "@/api/api"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    currentBand: "",
    target: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)
    try {
      await api.contact.create({
        name: formData.name,
        phone: formData.phone,
        currentBand: formData.currentBand,
        target: formData.target,
        message: formData.message,
      })

      setSubmitted(true)
      setFormData({
        name: "",
        phone: "",
        currentBand: "",
        target: "",
        message: "",
      })

      setTimeout(() => {
        setSubmitted(false)
      }, 1800)
    } catch (error: any) {
      alert(error?.message || "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className="section section-mint" style={{ paddingTop: 20 }}>
      <div className="container">
        <div className="section-head">
          <div className="kicker">Tư vấn lộ trình</div>
          <h2>Bắt đầu bằng một cuộc trò chuyện đúng vấn đề.</h2>
          <p>Để lại thông tin. Đội ngũ Checkmate sẽ tư vấn band hiện tại, mục tiêu và lớp phù hợp.</p>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="grid2">
            <input name="name" value={formData.name} onChange={handleChange} required placeholder="Họ và tên" />
            <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="Số điện thoại" />
            <select name="currentBand" value={formData.currentBand} onChange={handleChange} required>
              <option value="" disabled>Band hiện tại</option>
              <option>Chưa biết</option>
              <option>0–2.5</option>
              <option>2.5–3.5</option>
              <option>3.5–4.5</option>
              <option>4.5–5.5</option>
              <option>5.5+</option>
            </select>
            <select name="target" value={formData.target} onChange={handleChange} required>
              <option value="" disabled>Mục tiêu</option>
              <option>5.5</option>
              <option>6.0</option>
              <option>6.5</option>
              <option>7.0+</option>
            </select>
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Bạn đang gặp khó khăn gì?"
            rows={4}
          />
          <button
            className="btn btn-primary"
            type="submit"
            disabled={isSubmitting || submitted}
            style={isSubmitting || submitted ? { opacity: 0.75 } : undefined}
          >
            {isSubmitting ? "Đang gửi..." : submitted ? "Đã nhận thông tin ✓" : "Nhận tư vấn lộ trình →"}
          </button>
        </form>
      </div>
    </section>
  )
}
