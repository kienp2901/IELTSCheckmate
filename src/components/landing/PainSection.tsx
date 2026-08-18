import CheckmateButton from "./CheckmateButton"
import SectionContainer from "./SectionContainer"
import SectionHead from "./SectionHead"

export default function PainSection() {
  return (
    <SectionContainer>
      <SectionHead
        kicker="Mất bản đồ?"
        title={
          <>
            Bạn không mất gốc.
            <br />
            <span className="mark-coral">Bạn đang mất bản đồ.</span>
          </>
        }
        description="Học nhiều nhưng không biết đang ở đâu, đang yếu gì và cần làm gì tiếp theo là lý do rất nhiều người đứng band."
      />

      <div className="pain-grid">
        <div className="card">
          <div className="icon orange">🧭</div>
          <h3>Học nhiều nhưng không biết mình đang ở đâu</h3>
          <p>Không có dữ liệu trình độ đủ rõ, bạn dễ học theo cảm giác và chọn sai điểm bắt đầu.</p>
        </div>
        <div className="card">
          <div className="icon teal">📉</div>
          <h3>Học mãi nhưng band không tăng</h3>
          <p>Cày thêm đề không đồng nghĩa với tiến bộ nếu bạn chưa biết kỹ năng nào đang kéo điểm xuống.</p>
        </div>
        <div className="card">
          <div className="icon sun">🎯</div>
          <h3>Biết mục tiêu nhưng không biết đường đi</h3>
          <p>Bạn cần 5.5, 6.5 hay 7.0 — nhưng chưa biết ưu tiên kỹ năng nào để đi tới đó.</p>
        </div>
      </div>

      <div className="center-cta">
        <CheckmateButton variant="teal" href="#test">
          Kiểm tra band hiện tại miễn phí →
        </CheckmateButton>
      </div>
    </SectionContainer>
  )
}
