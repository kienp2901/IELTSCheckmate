export default function ProofSection() {
  return (
    <section className="section section-mint">
      <div className="container">
        <div className="section-head">
          <div className="kicker">Proof</div>
          <h2>Tiến bộ phải có biên lai.</h2>
          <p>Không chỉ kể cảm nhận. Theo dõi bằng bài tập, biểu đồ kỹ năng, kiểm tra định kỳ và kết quả thật.</p>
        </div>
        <div className="proof">
          <div className="proof-item"><b>Before</b><span>Band / skill ban đầu</span></div>
          <div className="proof-item"><b>Week 1–5</b><span>Dữ liệu luyện tập</span></div>
          <div className="proof-item"><b>Feedback</b><span>Lỗi được xác định</span></div>
          <div className="proof-item"><b>Adjust</b><span>Giáo viên điều chỉnh</span></div>
          <div className="proof-item"><b>After</b><span>Kết quả kiểm tra</span></div>
        </div>
        <div className="proof-stats">
          <div><b style={{ color: "var(--coral)" }}>4 kỹ năng</b><span>được theo dõi xuyên suốt</span></div>
          <div><b style={{ color: "var(--jade-dark)" }}>IELTS Checkmate</b><span>vòng lặp học tập – dữ liệu – điều chỉnh</span></div>
          <div><b style={{ color: "var(--coral)" }}>1 → 1</b><span>tư vấn lộ trình theo band</span></div>
        </div>
      </div>
    </section>
  )
}
