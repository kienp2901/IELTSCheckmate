import { FadeUp, RevealItem, StaggerChildren } from "./motion"

export default function ProofSection() {
  return (
    <section className="section section-mint">
      <div className="container">
        <FadeUp>
          <div className="section-head">
            <div className="kicker">Proof</div>
            <h2>Tiến bộ phải có biên lai.</h2>
            <p>Không chỉ kể cảm nhận. Theo dõi bằng bài tập, biểu đồ kỹ năng, kiểm tra định kỳ và kết quả thật.</p>
          </div>
        </FadeUp>

        <StaggerChildren className="proof" stagger={0.08}>
          <RevealItem className="proof-item">
            <b>Before</b>
            <span>Band / skill ban đầu</span>
          </RevealItem>
          <RevealItem className="proof-item">
            <b>Week 1–5</b>
            <span>Dữ liệu luyện tập</span>
          </RevealItem>
          <RevealItem className="proof-item">
            <b>Feedback</b>
            <span>Lỗi được xác định</span>
          </RevealItem>
          <RevealItem className="proof-item">
            <b>Adjust</b>
            <span>Giáo viên điều chỉnh</span>
          </RevealItem>
          <RevealItem className="proof-item">
            <b>After</b>
            <span>Kết quả kiểm tra</span>
          </RevealItem>
        </StaggerChildren>

        <StaggerChildren className="proof-stats" stagger={0.1} delayChildren={0.12}>
          <RevealItem>
            <b style={{ color: "var(--coral)" }}>4 kỹ năng</b>
            <span>được theo dõi xuyên suốt</span>
          </RevealItem>
          <RevealItem>
            <b style={{ color: "var(--jade-dark)" }}>IELTS Checkmate</b>
            <span>vòng lặp học tập – dữ liệu – điều chỉnh</span>
          </RevealItem>
          <RevealItem>
            <b style={{ color: "var(--coral)" }}>1 → 1</b>
            <span>tư vấn lộ trình theo band</span>
          </RevealItem>
        </StaggerChildren>
      </div>
    </section>
  )
}
