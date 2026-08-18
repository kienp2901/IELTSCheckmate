const FAQS = [
  { q: "Checkmate có phải app tự học không?", a: "Không. Checkmate kết hợp lớp IELTS trực tiếp với website học tập và dữ liệu để giảng viên theo sát tiến độ." },
  { q: "AI có thay giáo viên không?", a: "Không. AI cung cấp dữ liệu và phản hồi; giảng viên vẫn là người đưa ra quyết định dạy học." },
  { q: "Tôi không biết band hiện tại thì sao?", a: "Bắt đầu bằng bài test đầu vào để xác định trình độ và điểm nghẽn theo từng kỹ năng." },
  { q: "Tôi đang band 4.0 thì nên học khóa nào?", a: "Khóa phù hợp được xác định từ kết quả test và ngưỡng học thuật, không chỉ dựa trên tự đánh giá." },
  { q: "Tôi có thể xem lịch khai giảng trước không?", a: "Có. Lịch khai giảng được cập nhật theo trình độ và khung giờ học. Tất cả lớp đều học live qua nền tảng IELTS Checkmate." },
  { q: "Cam kết đầu ra hoạt động thế nào?", a: "Cam kết có điều kiện và theo chính sách công khai của từng chương trình. Hãy xem chi tiết trước khi đăng ký." },
]

export default function FAQSection() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head left">
          <div className="kicker">FAQ</div>
          <h2>Câu hỏi thường gặp</h2>
        </div>
        <div className="faq">
          {FAQS.map((item, i) => (
            <details key={i}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
