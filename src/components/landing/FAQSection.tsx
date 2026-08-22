"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { FadeUp, RevealItem, StaggerChildren, usePrefersReducedMotion } from "./motion"

const FAQS = [
  { q: "Checkmate có phải app tự học không?", a: "Không. Checkmate kết hợp lớp IELTS trực tiếp với website học tập và dữ liệu để giảng viên theo sát tiến độ." },
  { q: "AI có thay giáo viên không?", a: "Không. AI cung cấp dữ liệu và phản hồi; giảng viên vẫn là người đưa ra quyết định dạy học." },
  { q: "Tôi không biết band hiện tại thì sao?", a: "Bắt đầu bằng bài test đầu vào để xác định trình độ và điểm nghẽn theo từng kỹ năng." },
  { q: "Tôi đang band 4.0 thì nên học khóa nào?", a: "Khóa phù hợp được xác định từ kết quả test và ngưỡng học thuật, không chỉ dựa trên tự đánh giá." },
  { q: "Tôi có thể xem lịch khai giảng trước không?", a: "Có. Lịch khai giảng được cập nhật theo trình độ và khung giờ học. Tất cả lớp đều học live qua nền tảng IELTS Checkmate." },
  { q: "Cam kết đầu ra hoạt động thế nào?", a: "Cam kết có điều kiện và theo chính sách công khai của từng chương trình. Hãy xem chi tiết trước khi đăng ký." },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const reduced = usePrefersReducedMotion()

  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button
        type="button"
        className="faq-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{q}</span>
        <span className="faq-icon" aria-hidden>
          {open ? "–" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            className="faq-answer"
            key="answer"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : { height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.22 } }
            }
          >
            <p>{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default function FAQSection() {
  return (
    <section className="section">
      <div className="container">
        <FadeUp>
          <div className="section-head left">
            <div className="kicker">FAQ</div>
            <h2>Câu hỏi thường gặp</h2>
          </div>
        </FadeUp>
        <StaggerChildren className="faq" stagger={0.07} delayChildren={0.05}>
          {FAQS.map((item, i) => (
            <RevealItem key={i}>
              <FaqItem q={item.q} a={item.a} />
            </RevealItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
