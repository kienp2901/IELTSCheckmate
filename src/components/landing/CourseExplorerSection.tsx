import { useState } from "react"
import { useDialog } from "@/contexts/DialogContext"

const COURSES = [
  {
    id: "foundation",
    dot: "c1",
    tabName: "Foundation",
    tabSub: "0 → 2.5+",
    eyebrow: "Foundation · Nền tảng",
    title: "Xây nền tảng để bắt đầu hành trình IELTS.",
    desc: "Dành cho học viên cần xây dựng lại nền tảng tiếng Anh và từng bước làm quen với tư duy, cấu trúc và kỹ năng IELTS.",
    target: "Foundation / 2.5+",
    sessionsPerWeek: 2,
    features: [
      { label: "✓ Adaptive Learning", text: "Nội dung học được định hướng theo năng lực và tiến độ." },
      { label: "✓ Thư viện luyện tập", text: "Practicing for IELTS · Vocabulary · Reading Techniques & Strategies." },
      { label: "✓ Thi thử không giới hạn", text: "Thực hành và kiểm tra thường xuyên trên hệ thống." },
    ],
  },
  {
    id: "level35",
    dot: "c2",
    tabName: "IELTS Level 3.5",
    tabSub: "2.5 → 3.5",
    eyebrow: "IELTS Level 3.5",
    title: "Từ nền tảng lên năng lực IELTS cơ bản.",
    desc: "Tập trung xây kỹ năng theo cấu trúc bài thi và tạo nền tảng đủ chắc để tiến tới band 3.5.",
    target: "IELTS 3.5",
    sessionsPerWeek: 2,
    features: [
      { label: "✓ Học theo kỹ năng", text: "Reading · Listening · Writing · Speaking và kiến thức nền." },
      { label: "✓ Luyện tập trên nền tảng", text: "Bài luyện và thư viện học tập đi kèm khóa." },
      { label: "✓ Thi thử không giới hạn", text: "Kiểm tra mức độ sẵn sàng và theo dõi tiến bộ." },
    ],
  },
  {
    id: "level45",
    dot: "c3",
    tabName: "IELTS Level 4.5",
    tabSub: "3.5 → 4.5",
    eyebrow: "IELTS Level 4.5",
    title: "Chuẩn hóa kỹ năng để chạm band 4.5.",
    desc: "Hệ thống hóa chiến lược làm bài, củng cố từ vựng và ngữ pháp, đồng thời tăng độ chính xác ở cả 4 kỹ năng.",
    target: "IELTS 4.5",
    sessionsPerWeek: 2,
    features: [
      { label: "✓ Adaptive Learning", text: "Ưu tiên luyện tập theo dữ liệu và điểm nghẽn." },
      { label: "✓ Thư viện IELTS", text: "Practicing · Vocabulary · Reading Techniques & Strategies." },
      { label: "✓ Chấm bài thực hành", text: "Hỗ trợ phản hồi và cải thiện bài làm." },
    ],
  },
  {
    id: "level55",
    dot: "c4",
    tabName: "IELTS Level 5.5",
    tabSub: "4.5 → 5.5",
    eyebrow: "IELTS Level 5.5",
    title: "Tăng tốc từ nền tảng lên band 5.5.",
    desc: "Tập trung vào chiến lược làm bài, độ chính xác và khả năng vận dụng ngôn ngữ để tạo bước nhảy band rõ ràng.",
    target: "IELTS 5.5",
    sessionsPerWeek: 3,
    features: [
      { label: "✓ Học theo điểm nghẽn", text: "Dữ liệu luyện tập giúp xác định kỹ năng cần ưu tiên." },
      { label: "✓ AI Practice", text: "Luyện Speaking/Writing và nhận phản hồi trên nền tảng." },
      { label: "✓ Thi thử không giới hạn", text: "Liên tục kiểm tra mức độ sẵn sàng cho band mục tiêu." },
    ],
  },
  {
    id: "level65",
    dot: "c5",
    tabName: "IELTS Level 6.5+",
    tabSub: "5.5 → 6.5",
    eyebrow: "IELTS Level 6.5+",
    title: "Chinh phục band 6.5 bằng chiến lược đúng.",
    desc: "Đi sâu vào tiêu chí chấm điểm, chiến lược xử lý bài và khả năng kiểm soát chất lượng đầu ra ở cả 4 kỹ năng.",
    target: "IELTS 6.5+",
    sessionsPerWeek: 3,
    features: [
      { label: "✓ Band-specific", text: "Nội dung tập trung vào yêu cầu của band mục tiêu." },
      { label: "✓ Feedback chuyên sâu", text: "Phân tích lỗi và phản hồi để cải thiện chất lượng bài." },
      { label: "✓ Thi thử không giới hạn", text: "Đo độ ổn định trước khi bước vào kỳ thi." },
    ],
  },
]

export default function CourseExplorerSection() {
  const [activeTab, setActiveTab] = useState("foundation")
  const { openDialog } = useDialog()
  const activeCourse = COURSES.find((c) => c.id === activeTab)!

  return (
    <section className="section section-mint" id="courses">
      <div className="container">
        <div className="course-heading">
          <div>
            <div className="kicker">Chương trình học</div>
            <h2>
              Chọn đúng khóa học
              <br />
              <span className="mark-jade">cho band tiếp theo.</span>
            </h2>
            <p>
              IELTS Checkmate thiết kế lộ trình theo từng mốc band, kết hợp lớp học live và hệ thống luyện tập trên nền
              tảng.
            </p>
          </div>
          <a href="#schedule" className="btn btn-outline">
            Xem lịch khai giảng →
          </a>
        </div>

        <div className="course-explorer">
          <aside className="course-list">
            <div className="course-list-label">IELTS Checkmate</div>
            {COURSES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`course-tab${activeTab === c.id ? " active" : ""}`}
                aria-pressed={activeTab === c.id}
                onClick={(event) => {
                  setActiveTab(c.id)
                  event.currentTarget.closest(".course-list")?.querySelectorAll(".course-tab").forEach((tab) => {
                    ;(tab as HTMLButtonElement).blur()
                  })
                }}
              >
                <span className={`course-dot ${c.dot}`} />
                <span>
                  <b>{c.tabName}</b>
                  <small>{c.tabSub}</small>
                </span>
                <span className="course-arrow">→</span>
              </button>
            ))}
            <div className="course-list-note">
              <strong>Chưa biết mình phù hợp band nào?</strong>
              <span>Làm bài test đầu vào để được tư vấn khóa học phù hợp.</span>
              <a href="#test">Test đầu vào miễn phí →</a>
            </div>
          </aside>

          <div className="course-detail">
            <article key={activeTab} className="course-panel active">
              <div className="course-detail-top">
                <div>
                  <span className="course-eyebrow">{activeCourse.eyebrow}</span>
                  <h3>{activeCourse.title}</h3>
                  <p>{activeCourse.desc}</p>
                </div>
                <div className="course-target">
                  <small>Đầu ra</small>
                  <strong>{activeCourse.target}</strong>
                </div>
              </div>

              <div className="course-info-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                <div>
                  <span>Thời lượng</span>
                  <b>10 tuần / khóa</b>
                  <small>{activeCourse.sessionsPerWeek} buổi / tuần</small>
                </div>
                <div>
                  <span>Phòng tự học</span>
                  <b>1 năm</b>
                  <small>Truy cập nền tảng</small>
                </div>
                <div>
                  <span>Hình thức</span>
                  <b>Live qua nền tảng</b>
                  <small>Giảng viên đồng hành</small>
                </div>
              </div>

              <div className="course-features">
                {activeCourse.features.map((f, i) => (
                  <div key={i}>
                    <b>{f.label}</b>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="course-bottom">
                <div className="class-size-highlight">
                  <span className="class-size-icon">10</span>
                  <span>
                    <small>QUY MÔ LỚP</small>
                    <strong>10 học viên / lớp</strong>
                  </span>
                </div>
                <div>
                  <button className="btn btn-primary" type="button" onClick={openDialog}>
                    Đăng ký khóa học →
                  </button>
                  <button className="btn btn-outline" type="button" onClick={openDialog}>
                    Tư vấn khóa học
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
