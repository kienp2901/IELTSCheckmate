"use client"

import { Box, Container, Typography, Avatar, styled, useTheme, IconButton } from "@mui/material"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@mui/material"
import { useSwipeable } from "react-swipeable"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SlideContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem 0",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    padding: "1rem 0",
  },
}))

const TestimonialContainer = styled(motion.div)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "2rem",
  width: "100%",
  marginTop: "2rem",
  willChange: "transform, opacity",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}))

const TestimonialCard = styled(motion.div)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "white",
  borderRadius: "16px",
  padding: "1.5rem",
  // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
  border: "1px solid #E5E7EB",
  willChange: "transform, opacity",
  height: "100%",
  // transition: "all 0.3s ease",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  },
}))


const SlideIndicator = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "3rem",
  gap: "0.75rem",
}))

const NavigationButton = styled(IconButton)(() => ({
  width: 40,
  height: 40,
  backgroundColor: "#E5E7EB",
  color: "#6B7280",
  "&:hover": {
    backgroundColor: "#D1D5DB",
  },
  "&:disabled": {
    backgroundColor: "#F3F4F6",
    color: "#D1D5DB",
  },
}))

const VNBadge = styled(Box)(() => ({
  position: "absolute",
  bottom: -2,
  right: -2,
  width: 16,
  height: 16,
  borderRadius: "50%",
  backgroundColor: "#0E9F97",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.5rem",
  fontWeight: 700,
  color: "white",
  border: "2px solid white",
}))

// Animation variants
const containerVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0,
  }),
}

const cardVariants = {
  initial: { scale: 0.96, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.02, transition: { duration: 0.1 } },
}

const testimonials = [
  {
    name: "Minh Khang",
    location: "TP. Hồ Chí Minh",
    content: "Phòng luyện Speaking AI thực sự là cứu cánh cho mình. Phản hồi chi tiết về phát âm và ngữ pháp giúp mình tự tin hơn hẳn. Từ 5.5 lên 7.0 chỉ sau 3 tháng!",
    rating: 7.0,
    avatar: "https://lumetest.com/assets/avatar/student/ali.png",
    testType: "IELTS ACADEMIC",
  },
  {
    name: "Thanh Mai",
    location: "Hà Nội",
    content: "Tính năng chấm Writing AI nhanh và chính xác không ngờ. Mình không còn phải chờ giáo viên hàng tuần khi học trên trung tâm nữa nữa. Các gợi ý từ vựng và cấu trúc câu rất giá trị.",
    rating: 7.5,
    avatar: "https://ieltsscience.fun/wp-content/uploads/avatars/91194/avatar-bpfull.jpg",
    testType: "IELTS ACADEMIC",
  },
  {
    name: "Quốc Bảo",
    location: "Đà Nẵng",
    content: "Checkmate Pass đúng là khoản đầu tư xứng đáng! Các buổi chữa bài trực tiếp với giáo viên đã giúp mình xác định và sửa triệt để các lỗi sai cố hữu.",
    rating: 6.5,
    avatar: "",
    testType: "IELTS ACADEMIC",
  },
  {
    name: "Ngọc Anh",
    location: "Hải Phòng",
    content: "Checkmate Pass đúng là khoản đầu tư xứng đáng! Có tất cả mọi thứ và buổi chữa bài trực tiếp với giáo viên đã giúp mình xác định và sửa triệt để các lỗi sai cố hữu.",
    rating: 8.0,
    avatar: "https://lumetest.com/assets/avatar/student/mai-tran.png",
    testType: "IELTS ACADEMIC",
  },
  {
    name: "Văn Hùng",
    location: "Cần Thơ",
    content: "Luyện đề Mock Test full 4 kỹ năng trong môi trường mô phỏng thi thật giúp mình quen với áp lực thời gian. Kết quả thi thật rất sát với điểm Mock mình làm trên Checkmate.",
    rating: 6.0,
    avatar: "",
    testType: "IELTS ACADEMIC",
  },
  {
    name: "Mỹ Duyên",
    location: "Bình Dương",
    content: "Mình là người đi làm, không có nhiều thời gian. Các bài giảng ngắn gọn, súc tích và AI hỗ trợ hỏi đáp bài học rất phù hợp để mình học tranh thủ.",
    rating: 7.0,
    avatar: "https://ieltsscience.fun/wp-content/uploads/avatars/91037/avatar-bpfull.jpg",
    testType: "IELTS ACADEMIC",
  },
  {
    name: "Hoàng Phúc",
    location: "Đồng Nai",
    content: "Tính năng Topic Talk vô cùng tiện lợi! Mình có thể luyện nói các chủ đề bất cứ lúc nào, bất cứ nơi đâu mà không sợ ai đánh giá. Phân tích kết quả rất chuyên nghiệp.",
    rating: 6.5,
    avatar: "https://lumetest.com/assets/avatar/student/boon.png",
    testType: "IELTS ACADEMIC",
  },
  {
    name: "Trần Thảo",
    location: "Nghệ An",
    content: "Các tính năng ở Checkmate được cập nhật liên tục và rất thú vị. Giá thì hạt rẻ nữa",
    rating: 7.5,
    avatar: "",
    testType: "IELTS ACADEMIC",
  },
  {
    name: "Đức Nam",
    location: "Huế",
    content: "Bộ đề IELTS được cập nhật liên tục giúp mình chuẩn bị kỹ lưỡng cho phần Speaking Part 2 và Part 3. Mình đã gặp lại chủ đề đã luyện trong phòng thi!",
    rating: 7.0,
    avatar: "https://ieltsscience.fun/wp-content/uploads/avatars/100297/avatar-bpfull.jpg",
    testType: "IELTS ACADEMIC",
  },
  {
    name: "Thị Bích",
    location: "Quảng Ninh",
    content: "Mình chỉ dùng gói Test Pass để luyện đề, và 10 lượt chấm Speaking/Writing AI giới hạn ban đầu đã đủ để mình hiểu được tiêu chí chấm điểm và tự điều chỉnh. Đạt được band 6.0 sau 4 tháng!",
    rating: 6.0,
    avatar: "https://ieltsscience.fun/wp-content/uploads/avatars/100298/avatar-bpfull.jpg",
    testType: "IELTS ACADEMIC",
  },
]

const AUTO_SLIDE_INTERVAL = 3000 // 5 seconds between slides

// Helper function to get initials from name
const getInitials = (name: string) => {
  const names = name.split(' ')
  if (names.length >= 2) {
    return names[0][0] + names[names.length - 1][0]
  }
  return name.substring(0, 2)
}

// Helper function to generate color from name
const stringToColor = (string: string) => {
  let hash = 0
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = hash % 360
  return `hsl(${hue}, 65%, 50%)`
}

export default function TestimonialSlider() {
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"))
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"))
  const itemsPerPage = isLargeScreen ? 4 : isMediumScreen ? 2 : 1
  const SLIDES_COUNT = Math.ceil(testimonials.length / itemsPerPage)
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSlideChange((activeSlide + 1) % SLIDES_COUNT),
    onSwipedRight: () => handleSlideChange((activeSlide - 1 + SLIDES_COUNT) % SLIDES_COUNT),
  })

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setDirection(1)
      setActiveSlide((prevSlide) => (prevSlide + 1) % SLIDES_COUNT)
    }, AUTO_SLIDE_INTERVAL)

    return () => clearInterval(timer)
  }, [SLIDES_COUNT, isPaused])

  const handleSlideChange = (index: number) => {
    setDirection(index > activeSlide ? 1 : -1)
    setActiveSlide(index)
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 3, md: 6 },
        px: { xs: 2, md: 4 },
        backgroundColor: "#F9F9F9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <SlideContainer>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="700"
            sx={{ mb: 2, color: "#111827", fontSize: { xs: "1.75rem", md: "2.5rem" } }}
          >
            Đánh giá từ người dùng của IELTS Checkmate
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              color: "#6B7280",
              fontSize: { xs: "1rem", md: "1.125rem" },
              lineHeight: 1.6,
            }}
          >
            Đây là sự ghi nhận quý giá nhất dành cho Checkmate, tiếp thêm động lực để không ngừng cải tiến và mang đến
            trải nghiệm học tập tuyệt vời nhất cho bạn.
          </Typography>
        </Box>

        <div {...handlers} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <TestimonialContainer
              key={activeSlide}
              custom={direction}
              variants={containerVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.3,
                type: "tween",
                stiffness: 300,
                damping: 30,
              }}
            >
              {testimonials
                .slice(activeSlide * itemsPerPage, (activeSlide + 1) * itemsPerPage)
                .map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    transition={{ delay: index * 0.05 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Box sx={{ position: "relative", mr: 2 }}>
                        <Avatar
                          src={testimonial.avatar || undefined}
                          alt={testimonial.name}
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: testimonial.avatar ? 'transparent' : stringToColor(testimonial.name),
                            color: 'white',
                            fontWeight: 700,
                            fontSize: '0.875rem',
                          }}
                        >
                          {!testimonial.avatar && getInitials(testimonial.name)}
                        </Avatar>
                        <VNBadge>VN</VNBadge>
                      </Box>
                      <Box sx={{ textAlign: "left" }}>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: "#111827",
                            fontSize: "0.875rem",
                            mb: 0.25,
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#6B7280",
                            fontSize: "0.75rem",
                          }}
                        >
                          {testimonial.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1, mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#4B5563",
                          lineHeight: 1.6,
                          fontSize: "0.875rem",
                        }}
                      >
                        "{testimonial.content}"
                      </Typography>
                    </Box>

                    {/* Divider */}
                    <Box
                      sx={{
                        borderTop: "1px solid #E5E7EB",
                        my: 2,
                      }}
                    />

                    {/* Exam Details */}
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#6B7280",
                          fontSize: "0.75rem",
                          display: "block",
                          mb: 1,
                          fontWeight: 600,
                        }}
                      >
                        ĐIỂM THI
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "1fr auto",
                          alignItems: "baseline",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "500",
                            color: "#111827",
                            fontSize: "0.875rem",
                          }}
                        >
                          {testimonial.testType}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "1.125rem",
                            fontWeight: 700,
                            color: "#0E9F97",
                            textAlign: "right",
                          }}
                        >
                          {testimonial.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </TestimonialCard>
                ))}
            </TestimonialContainer>
          </AnimatePresence>
        </div>

        <SlideIndicator>
          <NavigationButton
            onClick={() => handleSlideChange((activeSlide - 1 + SLIDES_COUNT) % SLIDES_COUNT)}
            disabled={activeSlide === 0}
          >
            <ChevronLeft size={20} />
          </NavigationButton>
          
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {Array.from({ length: SLIDES_COUNT }).map((_, index) => (
              <Box
                key={index}
                onClick={() => handleSlideChange(index)}
                sx={{
                  width: index === activeSlide ? "24px" : "8px",
                  height: "8px",
                  borderRadius: index === activeSlide ? "4px" : "50%",
                  backgroundColor: index === activeSlide ? "#0E9F97" : "#D9D9D9",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </Box>
          
          <NavigationButton
            onClick={() => handleSlideChange((activeSlide + 1) % SLIDES_COUNT)}
            disabled={activeSlide === SLIDES_COUNT - 1}
          >
            <ChevronRight size={20} />
          </NavigationButton>
        </SlideIndicator>
      </SlideContainer>
    </Container>
  )
}

