import { useDialog } from "@/contexts/DialogContext"
import { ScaleFade } from "./motion"

export default function CommitmentSection() {
  const { openDialog } = useDialog()

  return (
    <section className="section">
      <div className="container">
        <ScaleFade>
          <div className="commitment">
            <div>
              <div className="kicker">Commitment</div>
              <h2>Cam kết đồng hành đến khi bạn đạt band mục tiêu*</h2>
              <p>
                Cam kết đầu ra có điều kiện; hỗ trợ bổ sung và duy trì quyền website theo chính sách đến khi đạt band.
              </p>
              <ul>
                <li>Điều kiện cam kết được công khai rõ ràng.</li>
                <li>Tiến độ được theo dõi trong hệ thống.</li>
                <li>Hình thức hỗ trợ bổ sung theo chính sách từng chương trình.</li>
              </ul>
            </div>
            <button className="btn btn-primary" type="button" onClick={openDialog}>
              Tìm hiểu chính sách cam kết →
            </button>
          </div>
        </ScaleFade>
        <p className="foot-star" style={{ color: "#879499" }}>
          * Áp dụng theo điều kiện và chính sách công khai của từng chương trình.
        </p>
      </div>
    </section>
  )
}
