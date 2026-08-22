"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import CheckmateButton from "./CheckmateButton"
import SectionContainer from "./SectionContainer"
import SectionHead from "./SectionHead"
import { FadeUp, usePrefersReducedMotion } from "./motion"

export default function AIDemoSection() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <SectionContainer mint>
      <FadeUp>
        <SectionHead
          kicker="IELTS Checkmate in action"
          title={
            <>
              AI nhìn thấy gì.
              <br />
              <span className="mark-coral">Giảng viên làm gì.</span>
            </>
          }
          description="AI cung cấp dữ liệu và phản hồi. Giảng viên vẫn là người quyết định cách dạy."
        />
      </FadeUp>

      <div className="demo-grid" ref={ref}>
        <motion.div
          className="demo-panel"
          initial={reduced ? false : { opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3>Xu hướng kỹ năng</h3>
          <div className="metric">
            <span>Listening</span>
            <b className="up">6.0 ↗</b>
          </div>
          <div className="metric">
            <span>Reading</span>
            <b className="up">6.5 ↗</b>
          </div>
          <div className="metric">
            <span>Speaking</span>
            <b>5.5 →</b>
          </div>
          <div className="metric">
            <span>Writing</span>
            <b className="down">5.0 ↓</b>
          </div>
          <div className="adjust">
            <b>Điểm nghẽn được phát hiện</b>
            <ul>
              <li>Task Response</li>
              <li>Ý tưởng chưa phát triển đủ</li>
              <li>Lỗi lặp lại trong cấu trúc bài</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="demo-panel"
          initial={reduced ? false : { opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.5, delay: reduced ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center" }}>
            <h3>Giảng viên điều chỉnh</h3>
            <span className="badge live">Dữ liệu tuần 5</span>
          </div>

          <div className="teach-box">
            <div className="row">
              <span>Writing Task Response</span>
              <b>5.0 → 6.0</b>
            </div>
            <div className="progress-bar">
              <motion.i
                initial={reduced ? false : { width: 0 }}
                animate={inView ? { width: "72%" } : { width: 0 }}
                transition={{ duration: 0.9, delay: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "block" }}
              />
            </div>
          </div>

          <ul className="plain">
            <li>Tăng Writing practice</li>
            <li>Tập trung Task Response</li>
            <li>Bổ sung feedback theo lỗi lặp lại</li>
            <li>Kiểm tra lại sau 7 ngày</li>
          </ul>

          <CheckmateButton variant="primary" href="#platform" className="demo-cta-btn">
            Xem nền tảng học tập →
          </CheckmateButton>
        </motion.div>
      </div>
    </SectionContainer>
  )
}
