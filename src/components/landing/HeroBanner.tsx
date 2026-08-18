import CheckmateButton from "./CheckmateButton"

export default function HeroBanner() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="checkzone checker" />
      </div>
      <div className="container hero-inner">
        <div>
          <span className="eyebrow">
            <i /> Học có người dẫn · Luyện có AI · Học theo band
          </span>
          <h1>
            Luyện IELTS
            <br />
            có chiến lược.
            <span className="line2">
              Từ band hiện tại đến <span className="mark">band mục tiêu</span>.
            </span>
          </h1>
          <p>
            IELTS Checkmate kết hợp giảng viên, AI và dữ liệu học tập để xác định đúng điểm nghẽn, xây lộ trình theo
            band và liên tục điều chỉnh cách học theo tiến bộ thực tế.
          </p>
          <div className="hero-actions">
            <CheckmateButton variant="primary" href="#test">
              Làm test đầu vào miễn phí →
            </CheckmateButton>
            <CheckmateButton variant="ghost" href="#system">
              Khám phá IELTS Checkmate
            </CheckmateButton>
          </div>
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
        </div>

        <div className="hero-visual" aria-label="Minh họa bảng theo dõi tiến bộ">
          <div className="moveboard">
            <div className="mb-top">
              <div className="mb-brand">
                <i /> BẢNG THEO DÕI TIẾN BỘ
              </div>
              <small>Cập nhật hôm nay</small>
            </div>
            <div className="mb-body">
              <div className="clock">
                <div className="clock-box">
                  <b>5.5</b>
                  <span>Band hiện tại</span>
                </div>
                <div className="clock-arrow">→</div>
                <div className="clock-box">
                  <b>6.5</b>
                  <span>Mục tiêu</span>
                </div>
              </div>
              <div className="mb-chart">
                <div className="mb-chart-head">
                  <b>Xu hướng tiến bộ theo tuần</b>
                  <span>+0.4 / 6 tuần</span>
                </div>
                <div className="pawns">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="mb-skills">
                <div className="sq">
                  <b>Listening</b>
                  <span className="up">↗ 6.0</span>
                </div>
                <div className="sq">
                  <b>Reading</b>
                  <span className="up">↗ 6.5</span>
                </div>
                <div className="sq">
                  <b>Speaking</b>
                  <span>→ 5.5</span>
                </div>
                <div className="sq">
                  <b>Writing</b>
                  <span className="down">↓ 5.0</span>
                </div>
              </div>
              <div className="mb-insight">
                <span>♟</span>
                <span>
                  <strong>Điểm nghẽn:</strong> Writing · Task Response — giáo viên ưu tiên luyện tập tuần này.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
