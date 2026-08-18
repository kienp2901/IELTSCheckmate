export default function PlatformSection() {
  return (
    <section className="section" id="platform">
      <div className="container">
        <div className="section-head">
          <div className="kicker">Learning experience</div>
          <h2>Trải nghiệm học tập toàn diện</h2>
          <p>Live class là nơi giảng viên dẫn đường. Nền tảng là nơi toàn bộ quá trình luyện tập được ghi nhận.</p>
        </div>
        <div className="experience">
          <div className="exp-card">
            <div className="icon teal">🧑‍🏫</div>
            <h3>Live Class</h3>
            <p>Học trực tiếp cùng giảng viên IELTS, tương tác và nhận phản hồi ngay trong buổi học.</p>
          </div>
          <div className="exp-card">
            <div className="icon orange">🤖</div>
            <h3>AI Practice</h3>
            <p>Luyện Speaking/Writing với AI, ghi nhận kết quả và lỗi cần cải thiện.</p>
          </div>
          <div className="exp-card">
            <div className="icon teal">📊</div>
            <h3>Skill Tracking</h3>
            <p>Theo dõi xu hướng từng kỹ năng và mức độ hoàn thành theo thời gian.</p>
          </div>
          <div className="exp-card">
            <div className="icon orange">🏁</div>
            <h3>Progress Evaluation</h3>
            <p>Kiểm tra định kỳ và cập nhật lộ trình theo band tiếp theo.</p>
          </div>
        </div>
        <div className="same-class">
          <div>
            <div className="kicker" style={{ color: "var(--sun)" }}>Personalized by data</div>
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
              <i style={{ width: "58%" }} />
            </div>
            <small>Ưu tiên Task Response</small>
          </div>
          <div className="student">
            <strong>Học viên B</strong>
            <span>Speaking</span>
            <div className="mini-progress">
              <i style={{ width: "73%" }} />
            </div>
            <small>Ưu tiên Fluency &amp; Coherence</small>
          </div>
        </div>
      </div>
    </section>
  )
}
