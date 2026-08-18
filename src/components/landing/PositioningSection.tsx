import SectionContainer from "./SectionContainer"
import SectionHead from "./SectionHead"

export default function PositioningSection() {
  return (
    <SectionContainer mint>
      <SectionHead
        kicker="Why IELTS Checkmate"
        title={
          <>
            Một hệ thống học IELTS,
            <br />
            không chỉ một khóa học.
          </>
        }
        description="Teacher-led × AI-informed × Band-specific — con người dẫn đường, công nghệ giúp việc theo sát chính xác hơn."
      />

      <div className="position-grid">
        <div className="position-card">
          <div className="position-badge t">T</div>
          <h3>Teacher-led</h3>
          <strong>Giảng viên là người ra quyết định.</strong>
          <p>Đọc dữ liệu, xác định điểm nghẽn và điều chỉnh ưu tiên học tập cho từng học viên.</p>
        </div>
        <div className="position-card">
          <div className="position-badge ai">AI</div>
          <h3>AI-informed</h3>
          <strong>AI biến mỗi lần luyện tập thành dữ liệu.</strong>
          <p>AI hỗ trợ Speaking/Writing, ghi nhận bài tập và phát hiện lỗi, xu hướng lặp lại.</p>
        </div>
        <div className="position-card">
          <div className="position-badge b">B</div>
          <h3>Band-specific</h3>
          <strong>Mỗi chặng học có một mục tiêu rõ ràng.</strong>
          <p>Không học IELTS chung chung. Bạn học những gì cần thiết để tiến tới band tiếp theo.</p>
        </div>
      </div>
    </SectionContainer>
  )
}
