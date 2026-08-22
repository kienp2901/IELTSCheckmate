import SectionContainer from "./SectionContainer"
import { FadeUp, RevealItem, StaggerChildren } from "./motion"

export default function CheckmateSystemSection() {
  return (
    <SectionContainer id="system">
      <div className="cmate">
        <div className="cmate-checker" />
        <FadeUp>
          <div className="cmate-head">
            <div className="kicker" style={{ color: "var(--sun)" }}>
              IELTS Checkmate Learning System
            </div>
            <h2>
              Học tập tạo dữ liệu.
              <br />
              Dữ liệu thay đổi cách bạn được học.
            </h2>
            <p>IELTS Checkmate là cơ chế vận hành biến dữ liệu học tập thành quyết định dạy học cá nhân hóa.</p>
          </div>
        </FadeUp>
        <StaggerChildren className="spell" stagger={0.1} delayChildren={0.12}>
          <RevealItem className="spell-sq">
            <div className="letter">C</div>
            <b>Check</b>
            <span>Test đầu vào và đánh giá từng kỹ năng.</span>
          </RevealItem>
          <RevealItem className="spell-sq">
            <div className="letter">M</div>
            <b>Map</b>
            <span>Tạo lộ trình ban đầu theo band và mục tiêu.</span>
          </RevealItem>
          <RevealItem className="spell-sq">
            <div className="letter">A</div>
            <b>AI Practice</b>
            <span>AI hỗ trợ luyện và phản hồi Speaking/Writing.</span>
          </RevealItem>
          <RevealItem className="spell-sq">
            <div className="letter">T</div>
            <b>Track & Teach</b>
            <span>Theo dõi xu hướng để giáo viên điều chỉnh.</span>
          </RevealItem>
          <RevealItem className="spell-sq">
            <div className="letter">E</div>
            <b>Evaluate & Evolve</b>
            <span>Kiểm tra định kỳ và cập nhật chặng tiếp theo.</span>
          </RevealItem>
        </StaggerChildren>
        <FadeUp delay={0.2}>
          <div className="spell-word">
            Check → Map → AI Practice → Track & Teach → Evaluate. Ghép các bước lại, bạn được{" "}
            <b>CHECK + M·A·T·E = CHECKMATE.</b>
          </div>
        </FadeUp>
      </div>
    </SectionContainer>
  )
}
