"use client"

import { Box, IconButton, useMediaQuery } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { useEffect, useMemo, useState } from "react"
import { useSwipeable } from "react-swipeable"
import boonImage from "../../assets/boon.png"
import maiImage from "../../assets/mai-tran.png"
import aliImage from "../../assets/ali.png"
import vangieImage from "../../assets/vangie.png"
import ducnamImage from "../../assets/duc-nam.jpg"
import thibichImage from "../../assets/thi-bich.jpg"
import vanhungImage from "../../assets/van-hung.jpg"
import myduyenImage from "../../assets/my-duyen.jpg"
import thanhmaiImage from "../../assets/thanh-mai.jpg"

const AVATAR_CLASSES = ["", "teal-avatar", "purple-avatar", "sun-avatar"]

const testimonials = [
  {
    name: "Minh Khang",
    location: "TP. Hồ Chí Minh",
    content:
      "Phòng luyện Speaking AI thực sự là cứu cánh cho mình. Phản hồi chi tiết về phát âm và ngữ pháp giúp mình tự tin hơn hẳn. Từ 5.5 lên 7.0 chỉ sau 3 tháng!",
    rating: 7.0,
    avatar: aliImage,
  },
  {
    name: "Thanh Mai",
    location: "Hà Nội",
    content:
      "Tính năng chấm Writing AI nhanh và chính xác không ngờ. Mình không còn phải chờ giáo viên hàng tuần khi học trên trung tâm nữa nữa. Các gợi ý từ vựng và cấu trúc câu rất giá trị.",
    rating: 7.5,
    avatar: thanhmaiImage,
  },
  {
    name: "Quốc Bảo",
    location: "Đà Nẵng",
    content:
      "Checkmate Pass đúng là khoản đầu tư xứng đáng! Các buổi chữa bài trực tiếp với giáo viên đã giúp mình xác định và sửa triệt để các lỗi sai cố hữu.",
    rating: 6.5,
    avatar: "",
  },
  {
    name: "Ngọc Anh",
    location: "Hải Phòng",
    content:
      "Checkmate Pass đúng là khoản đầu tư xứng đáng! Có tất cả mọi thứ và buổi chữa bài trực tiếp với giáo viên đã giúp mình xác định và sửa triệt để các lỗi sai cố hữu.",
    rating: 8.0,
    avatar: maiImage,
  },
  {
    name: "Văn Hùng",
    location: "Cần Thơ",
    content:
      "Luyện đề Mock Test full 4 kỹ năng trong môi trường mô phỏng thi thật giúp mình quen với áp lực thời gian. Kết quả thi thật rất sát với điểm Mock mình làm trên Checkmate.",
    rating: 6.0,
    avatar: vanhungImage,
  },
  {
    name: "Mỹ Duyên",
    location: "Bình Dương",
    content:
      "Mình là người đi làm, không có nhiều thời gian. Các bài giảng ngắn gọn, súc tích và AI hỗ trợ hỏi đáp bài học rất phù hợp để mình học tranh thủ.",
    rating: 7.0,
    avatar: myduyenImage,
  },
  {
    name: "Hoàng Phúc",
    location: "Đồng Nai",
    content:
      "Tính năng Topic Talk vô cùng tiện lợi! Mình có thể luyện nói các chủ đề bất cứ lúc nào, bất cứ nơi đâu mà không sợ ai đánh giá. Phân tích kết quả rất chuyên nghiệp.",
    rating: 6.5,
    avatar: boonImage,
  },
  {
    name: "Trần Thảo",
    location: "Nghệ An",
    content: "Các tính năng ở Checkmate được cập nhật liên tục và rất thú vị. Giá thì hạt rẻ nữa",
    rating: 7.5,
    avatar: vangieImage,
  },
  {
    name: "Đức Nam",
    location: "Huế",
    content:
      "Bộ đề IELTS được cập nhật liên tục giúp mình chuẩn bị kỹ lưỡng cho phần Speaking Part 2 và Part 3. Mình đã gặp lại chủ đề đã luyện trong phòng thi!",
    rating: 7.0,
    avatar: ducnamImage,
  },
  {
    name: "Thị Bích",
    location: "Quảng Ninh",
    content:
      "Mình chỉ dùng gói Test Pass để luyện đề, và 10 lượt chấm Speaking/Writing AI giới hạn ban đầu đã đủ để mình hiểu được tiêu chí chấm điểm và tự điều chỉnh. Đạt được band 6.0 sau 4 tháng!",
    rating: 6.0,
    avatar: thibichImage,
  },
]

const getInitials = (name: string) => {
  const names = name.split(" ")
  if (names.length >= 2) return names[0][0] + names[names.length - 1][0]
  return name.substring(0, 2)
}

const getCourseByScore = (score: number) => {
  if (score <= 2.5) return "Foundation"
  if (score <= 3.5) return "IELTS Level 3.5"
  if (score <= 4.5) return "IELTS Level 4.5"
  if (score <= 5.5) return "IELTS Level 5.5"
  return "IELTS Level 6.5+"
}

const formatScore = (score: number) => score.toFixed(1)

export default function FeedbackSection() {
  const isLargeScreen = useMediaQuery("(min-width:1051px)")
  const isMediumScreen = useMediaQuery("(min-width:651px)")
  const itemsPerPage = isLargeScreen ? 4 : isMediumScreen ? 2 : 1
  const slideCount = Math.ceil(testimonials.length / itemsPerPage)
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSlideChange((activeSlide + 1) % slideCount),
    onSwipedRight: () => handleSlideChange((activeSlide - 1 + slideCount) % slideCount),
  })

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setDirection(1)
      setActiveSlide((prev) => (prev + 1) % slideCount)
    }, 4000)
    return () => clearInterval(timer)
  }, [slideCount, isPaused])

  const handleSlideChange = (index: number) => {
    setDirection(index > activeSlide ? 1 : -1)
    setActiveSlide(index)
  }

  const visibleTestimonials = useMemo(() => {
    const start = activeSlide * itemsPerPage
    return testimonials.slice(start, start + itemsPerPage)
  }, [activeSlide, itemsPerPage])

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35 } },
    exit: (dir: number) => ({ x: dir < 0 ? 100 : -100, opacity: 0, transition: { duration: 0.25 } }),
  }

  return (
    <section className="section" id="feedback">
      <div className="container">
        <div className="section-head">
          <div className="kicker">User feedback</div>
          <h2>
            Học viên nói gì về
            <br />
            <span className="mark-coral">IELTS Checkmate?</span>
          </h2>
          <p>Những phản hồi đi cùng kết quả thực tế: học viên học khóa nào và đạt band bao nhiêu trong kỳ thi.</p>
        </div>

        <Box
          {...handlers}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          sx={{ position: "relative", minHeight: { xs: 380, md: 400 } }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <Box
              key={activeSlide}
              component={motion.div}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="feedback-grid"
            >
              {visibleTestimonials.map((item, index) => (
                <article key={`${item.name}-${index}`} className="feedback-card">
                  <div className="feedback-top">
                    <div
                      className={`feedback-avatar ${AVATAR_CLASSES[index % AVATAR_CLASSES.length]}`}
                      style={{ overflow: "hidden" }}
                    >
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      ) : (
                        getInitials(item.name).toUpperCase()
                      )}
                    </div>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <div className="stars">★★★★★</div>
                  <p>"{item.content}"</p>
                  <div className="feedback-result">
                    <div>
                      <span>ĐIỂM THI THỰC TẾ</span>
                      <b>{formatScore(item.rating)}</b>
                    </div>
                    <div>
                      <span>KHÓA ĐÃ HỌC</span>
                      <strong>{getCourseByScore(item.rating)}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </Box>
          </AnimatePresence>

          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1.5, mt: { xs: 3, md: 4 } }}>
            <IconButton
              onClick={() => handleSlideChange((activeSlide - 1 + slideCount) % slideCount)}
              disabled={activeSlide === 0}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#E5E7EB",
                color: "#6B7280",
                "&:hover": { bgcolor: "#D1D5DB" },
                "&:disabled": { bgcolor: "#F3F4F6", color: "#D1D5DB" },
              }}
            >
              <ChevronLeft />
            </IconButton>

            <Box sx={{ display: "flex", gap: 1 }}>
              {Array.from({ length: slideCount }).map((_, idx) => (
                <Box
                  key={idx}
                  onClick={() => handleSlideChange(idx)}
                  sx={{
                    width: idx === activeSlide ? 22 : 8,
                    height: 8,
                    borderRadius: idx === activeSlide ? 4 : "50%",
                    bgcolor: idx === activeSlide ? "#0E9F97" : "#D9D9D9",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </Box>

            <IconButton
              onClick={() => handleSlideChange((activeSlide + 1) % slideCount)}
              disabled={activeSlide === slideCount - 1}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#E5E7EB",
                color: "#6B7280",
                "&:hover": { bgcolor: "#D1D5DB" },
                "&:disabled": { bgcolor: "#F3F4F6", color: "#D1D5DB" },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>

        <div className="feedback-disclaimer">
          <span>✓ Kết quả hiển thị theo từng học viên</span>
          <span>✓ Điểm thi thực tế</span>
          <span>✓ Khóa học đã tham gia</span>
        </div>
      </div>
    </section>
  )
}
