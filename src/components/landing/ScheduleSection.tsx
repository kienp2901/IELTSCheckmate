import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useDialog } from "@/contexts/DialogContext"
import { FadeUp, usePrefersReducedMotion } from "./motion"

const FILTERS = [
  { label: "Tất cả", value: "all" },
  { label: "Band 2.5", value: "2.5" },
  { label: "Band 3.5", value: "3.5" },
  { label: "Band 4.5", value: "4.5" },
  { label: "Band 5.5", value: "5.5" },
  { label: "Band 6.5+", value: "6.5+" },
  { label: "Học Online", value: "online" },
]

const SCHEDULE_DATA = [
  { level: "2.5", format: "online", name: "Foundation", date: "26/10/2026", days: "Thứ 2,5", sessionsPerWeek: 2, time: "20:00 - 22:00", size: "10" },
  { level: "3.5", format: "online", name: "IELTS Level 3.5", date: "27/10/2026", days: "Thứ 3,6", sessionsPerWeek: 2, time: "20:00 - 22:00", size: "10" },
  { level: "4.5", format: "online", name: "IELTS Level 4.5", date: "3/11/2025", days: "Thứ 3,5", sessionsPerWeek: 2, time: "19:30 - 21:30", size: "10" },
  { level: "5.5", format: "online", name: "IELTS Level 5.5", date: "4/11/2025", days: "Thứ 3,5,7", sessionsPerWeek: 3, time: "19:30 - 21:30", size: "10" },
  { level: "6.5+", format: "online", name: "IELTS Level 6.5+", date: "4/11/2025", days: "Thứ 2,4,6", sessionsPerWeek: 3, time: "20:00 - 22:00", size: "10" },
]

export default function ScheduleSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const { openDialog } = useDialog()
  const reduced = usePrefersReducedMotion()

  const filteredRows = SCHEDULE_DATA.filter((row) => {
    if (activeFilter === "all") return true
    if (activeFilter === "online") return row.format === "online"
    return row.level === activeFilter
  })

  return (
    <section className="section" id="schedule">
      <div className="container">
        <FadeUp>
          <div className="schedule-head-row">
            <div>
              <div className="kicker">Live class</div>
              <h2>Lịch khai giảng sắp tới</h2>
              <p>Chọn theo trình độ và lịch phù hợp. Tất cả lớp đều học live qua nền tảng IELTS Checkmate.</p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="schedule-wrap">
            <div className="schedule-toolbar">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  className={`filter${activeFilter === f.value ? " active" : ""}`}
                  onClick={() => setActiveFilter(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Khóa học</th>
                  <th>Khai giảng</th>
                  <th>Buổi</th>
                  <th>Ca học</th>
                  <th>Hình thức học</th>
                  <th>Size lớp</th>
                </tr>
              </thead>
              <AnimatePresence mode="wait">
                <motion.tbody
                  key={activeFilter}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {filteredRows.map((row) => (
                    <tr key={`${row.name}-${row.date}-${row.time}`}>
                      <td>
                        <b>{row.name}</b>
                      </td>
                      <td>{row.date}</td>
                      <td>
                        <b>{row.sessionsPerWeek} buổi/tuần</b>
                        <br />
                        {row.days}
                      </td>
                      <td>{row.time}</td>
                      <td>
                        <span className="badge live">● Học live qua nền tảng</span>
                      </td>
                      <td>{row.size}</td>
                    </tr>
                  ))}
                </motion.tbody>
              </AnimatePresence>
            </table>

            <div className="schedule-more">
              <button className="btn btn-outline" type="button" onClick={openDialog}>
                Xem tất cả lịch khai giảng →
              </button>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
