"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import CheckmateButton from "./CheckmateButton"
import { CountUp, FadeUp, TypeWriter, usePrefersReducedMotion } from "./motion"

const PAWN_HEIGHTS = ["44%", "56%", "50%", "68%", "80%", "96%"]

export default function HeroBanner() {
  const reduced = usePrefersReducedMotion()
  const [line1PartDone, setLine1PartDone] = useState(reduced)
  const [line1Done, setLine1Done] = useState(reduced)
  const [boardReady, setBoardReady] = useState(reduced)
  const boardRef = useRef<HTMLDivElement | null>(null)
  const boardInView = useInView(boardRef, { once: true, amount: 0.35 })

  useEffect(() => {
    if (reduced) {
      setLine1PartDone(true)
      setLine1Done(true)
      setBoardReady(true)
    }
  }, [reduced])

  useEffect(() => {
    if (boardInView) setBoardReady(true)
  }, [boardInView])

  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="checkzone checker" />
      </div>
      <div className="container hero-inner">
        <div>
          <FadeUp>
            <span className="eyebrow">
              <i /> Học có người dẫn · Luyện có AI · Học theo band
            </span>
          </FadeUp>

          <h1 className={reduced ? undefined : "hero-title"}>
            {reduced ? (
              <HeroTitleFull />
            ) : (
              <>
                <span className="hero-title-sizer" aria-hidden>
                  <HeroTitleFull />
                </span>
                <span className="hero-title-typed">
                  <TypeWriter
                    as="span"
                    text="Luyện IELTS"
                    delay={280}
                    speed={36}
                    showCursor
                    onDone={() => setLine1PartDone(true)}
                  />
                  <br />
                  <TypeWriter
                    as="span"
                    text="có chiến lược."
                    start={line1PartDone}
                    speed={36}
                    showCursor={!line1Done}
                    onDone={() => setLine1Done(true)}
                  />
                  <span className="line2">
                    {line1Done ? <TypeWriterLine2 /> : null}
                  </span>
                </span>
              </>
            )}
          </h1>

          <FadeUp delay={0.1}>
            <p>
              IELTS Checkmate kết hợp giảng viên, AI và dữ liệu học tập để xác định đúng điểm nghẽn, xây lộ trình
              theo band và liên tục điều chỉnh cách học theo tiến bộ thực tế.
            </p>
          </FadeUp>

          <FadeUp delay={0.18}>
            <div className="hero-actions">
              <CheckmateButton variant="primary" href="#test">
                Làm test đầu vào miễn phí →
              </CheckmateButton>
              <CheckmateButton variant="ghost" href="#system">
                Khám phá IELTS Checkmate
              </CheckmateButton>
            </div>
          </FadeUp>

          <FadeUp delay={0.26}>
            <div className="hero-strip">
              <span>
                <i>✓</i> Test đầu vào
              </span>
              <span>
                <i>✓</i> Live Class
              </span>
              <span>
                <i>✓</i> AI Practice
              </span>
              <span>
                <i>✓</i> Theo dõi tiến bộ
              </span>
            </div>
          </FadeUp>
        </div>

        <div className="hero-visual" aria-label="Minh họa bảng theo dõi tiến bộ" ref={boardRef}>
          <motion.div
            className="moveboard"
            initial={reduced ? false : { opacity: 0, y: 28, rotate: -4 }}
            animate={
              boardReady
                ? { opacity: 1, y: 0, rotate: -1 }
                : { opacity: 0, y: 28, rotate: -4 }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-top">
              <div className="mb-brand">
                <i /> BẢNG THEO DÕI TIẾN BỘ
              </div>
              <motion.small
                animate={
                  reduced || !boardReady
                    ? undefined
                    : { opacity: [0.55, 1, 0.55] }
                }
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              >
                Cập nhật hôm nay
              </motion.small>
            </div>
            <div className="mb-body">
              <div className="clock">
                <div className="clock-box">
                  <b>
                    <CountUp value={5.5} start={boardReady} />
                  </b>
                  <span>Band hiện tại</span>
                </div>
                <div className="clock-arrow">→</div>
                <div className="clock-box">
                  <b>
                    <CountUp value={6.5} start={boardReady} duration={1100} />
                  </b>
                  <span>Mục tiêu</span>
                </div>
              </div>
              <div className="mb-chart">
                <div className="mb-chart-head">
                  <b>Xu hướng tiến bộ theo tuần</b>
                  <span>+0.4 / 6 tuần</span>
                </div>
                <div className="pawns">
                  {PAWN_HEIGHTS.map((height, index) => (
                    <motion.i
                      key={index}
                      initial={reduced ? false : { height: 0, opacity: 0.4 }}
                      animate={
                        boardReady
                          ? {
                              height,
                              opacity: 1,
                            }
                          : { height: 0, opacity: 0.4 }
                      }
                      transition={{
                        duration: 0.55,
                        delay: reduced ? 0 : 0.2 + index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-skills">
                {[
                  { label: "Listening", value: "↗ 6.0", className: "up" },
                  { label: "Reading", value: "↗ 6.5", className: "up" },
                  { label: "Speaking", value: "→ 5.5", className: "" },
                  { label: "Writing", value: "↓ 5.0", className: "down" },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.label}
                    className="sq"
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    animate={boardReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                    transition={{ delay: reduced ? 0 : 0.45 + index * 0.08, duration: 0.35 }}
                  >
                    <b>{skill.label}</b>
                    <span className={skill.className}>{skill.value}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="mb-insight"
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={boardReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: reduced ? 0 : 0.85, duration: 0.4 }}
              >
                <span>♟</span>
                <span>
                  <strong>Điểm nghẽn:</strong> Writing · Task Response — giáo viên ưu tiên luyện tập tuần này.
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroTitleFull() {
  return (
    <>
      Luyện IELTS
      <br />
      có chiến lược.
      <span className="line2">
        Từ band hiện tại đến <span className="mark">band mục tiêu</span>.
      </span>
    </>
  )
}

function TypeWriterLine2() {
  const [prefixDone, setPrefixDone] = useState(false)
  const [markDone, setMarkDone] = useState(false)

  return (
    <>
      {prefixDone ? (
        "Từ band hiện tại đến "
      ) : (
        <TypeWriter
          as="span"
          text="Từ band hiện tại đến "
          speed={32}
          showCursor
          onDone={() => setPrefixDone(true)}
        />
      )}
      {prefixDone ? (
        <>
          <span className="mark">
            {markDone ? (
              "band mục tiêu"
            ) : (
              <TypeWriter
                as="span"
                text="band mục tiêu"
                speed={32}
                showCursor
                onDone={() => setMarkDone(true)}
              />
            )}
          </span>
          .
        </>
      ) : null}
    </>
  )
}
