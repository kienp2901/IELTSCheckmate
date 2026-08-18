import CheckmateButton from "./CheckmateButton"
import SectionContainer from "./SectionContainer"
import SectionHead from "./SectionHead"

export default function AIDemoSection() {
  return (
    <SectionContainer mint>
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

      <div className="demo-grid">
        <div className="demo-panel">
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
        </div>

        <div className="demo-panel">
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
              <i style={{ width: "72%" }} />
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
        </div>
      </div>
    </SectionContainer>
  )
}
