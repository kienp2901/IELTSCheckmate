"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { FadeUp, RevealItem, StaggerChildren, usePrefersReducedMotion } from "./motion"

export default function PlatformSection() {
  const reduced = usePrefersReducedMotion()
  const blockRef = useRef<HTMLDivElement | null>(null)
  const inView = useInView(blockRef, { once: true, amount: 0.35 })

  return (
    <section className="section" id="platform">
      <div className="container">
        <FadeUp>
          <div className="section-head">
            <div className="kicker">Learning experience</div>
            <h2>Trải nghiệm học tập toàn diện</h2>
            <p>Live class là nơi giảng viên dẫn đường. Nền tảng là nơi toàn bộ quá trình luyện tập được ghi nhận.</p>
          </div>
        </FadeUp>

        <StaggerChildren className="experience" stagger={0.09}>
          <RevealItem className="exp-card">
            <div className="icon teal">🧑‍🏫</div>
            <h3>Live Class</h3>
            <p>Học trực tiếp cùng giảng viên IELTS, tương tác và nhận phản hồi ngay trong buổi học.</p>
          </RevealItem>
          <RevealItem className="exp-card">
            <div className="icon orange">🤖</div>
            <h3>AI Practice</h3>
            <p>Luyện Speaking/Writing với AI, ghi nhận kết quả và lỗi cần cải thiện.</p>
          </RevealItem>
          <RevealItem className="exp-card">
            <div className="icon teal">📊</div>
            <h3>Skill Tracking</h3>
            <p>Theo dõi xu hướng từng kỹ năng và mức độ hoàn thành theo thời gian.</p>
          </RevealItem>
          <RevealItem className="exp-card">
            <div className="icon orange">🏁</div>
            <h3>Progress Evaluation</h3>
            <p>Kiểm tra định kỳ và cập nhật lộ trình theo band tiếp theo.</p>
          </RevealItem>
        </StaggerChildren>

        <FadeUp delay={0.1}>
          <div className="same-class" ref={blockRef}>
            <div>
              <div className="kicker" style={{ color: "var(--sun)" }}>
                Personalized by data
              </div>
              <h3 style={{ fontSize: 26, margin: "9px 0", fontWeight: 800 }}>
                Cùng một lớp.
                <br />
                Không nhất thiết cùng một ưu tiên.
              </h3>
              <p style={{ color: "rgba(255,255,255,.62)", fontSize: 13 }}>
                Dữ liệu ngoài giờ học giúp giáo viên biết mỗi học viên đang cần gì tiếp theo.
              </p>
            </div>
            <div className="student">
              <strong>Học viên A</strong>
              <span>Writing</span>
              <div className="mini-progress">
                <motion.i
                  initial={reduced ? false : { width: 0 }}
                  animate={inView ? { width: "58%" } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "block" }}
                />
              </div>
              <small>Ưu tiên Task Response</small>
            </div>
            <div className="student">
              <strong>Học viên B</strong>
              <span>Speaking</span>
              <div className="mini-progress">
                <motion.i
                  initial={reduced ? false : { width: 0 }}
                  animate={inView ? { width: "73%" } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: "block" }}
                />
              </div>
              <small>Ưu tiên Fluency &amp; Coherence</small>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
