import { useDialog } from "@/contexts/DialogContext"

export default function FinalCTASection() {
  const { openDialog } = useDialog()

  return (
    <section className="section" id="test">
      <div className="container">
        <div className="final-cta">
          <div className="checker-fade" />
          <div className="kicker">Bắt đầu từ trình độ của bạn</div>
          <h2>
            Đừng đoán band của bạn.
            <br />
            Hãy đo nó.
          </h2>
          <p>
            Test đầu vào miễn phí để biết bạn đang ở đâu, điểm nghẽn nằm ở đâu và chặng tiếp theo của bạn là gì.
          </p>
          <button className="btn btn-primary" type="button" onClick={openDialog}>
            Làm test đầu vào miễn phí →
          </button>
        </div>
      </div>
    </section>
  )
}
