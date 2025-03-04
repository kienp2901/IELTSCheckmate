"use client"

import { Box, Container, Typography, Avatar, styled, useTheme } from "@mui/material"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@mui/material"
import { useSwipeable } from "react-swipeable"

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
  borderRadius: "12px",
  padding: "1.5rem",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
  willChange: "transform, opacity",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
  },
}))

const RatingCircle = styled(Box)(() => ({
  width: 36,
  height: 36,
  borderRadius: "50%",
  backgroundColor: "#FF7A00",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: "600",
  fontSize: "0.9rem",
}))

const SlideIndicator = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "3rem",
  gap: "0.5rem",
  "& > div": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "#D9D9D9",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
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
    name: "Ali Kumar",
    location: "Học viên Ấn Độ",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel",
    rating: 7.5,
    avatar: "/placeholder.svg?height=48&width=48",
    testType: "IELTS GENERAL",
  },
  {
    name: "Mai Trần",
    location: "Học viên Việt Nam",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel",
    rating: 7.5,
    avatar: "/placeholder.svg?height=48&width=48",
    testType: "IELTS GENERAL",
  },
  {
    name: "Tên học viên",
    location: "Học viên Ấn Độ",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel",
    rating: 7.5,
    avatar: "/placeholder.svg?height=48&width=48",
    testType: "IELTS GENERAL",
  },
  {
    name: "Tên học viên",
    location: "Học viên Ấn Độ",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel",
    rating: 7.5,
    avatar: "/placeholder.svg?height=48&width=48",
    testType: "IELTS GENERAL",
  },
  {
    name: "Tên học viên",
    location: "Địa chỉ",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel",
    rating: 7.5,
    avatar: "/placeholder.svg?height=48&width=48",
    testType: "IELTS GENERAL",
  },
  // Thêm nhiều testimonial khác nếu cần
]

const AUTO_SLIDE_INTERVAL = 3000 // 5 seconds between slides

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
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2.5 }}>
                      <Avatar
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        sx={{
                          width: 40,
                          height: 40,
                          mr: 2,
                          border: "2px solid #F3F4F6",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "600",
                            color: "#111827",
                            fontSize: "1rem",
                            mb: 0.5,
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#6B7280",
                            fontSize: "0.875rem",
                          }}
                        >
                          {testimonial.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2.5,
                        color: "#4B5563",
                        lineHeight: 1.6,
                        fontSize: "0.875rem",
                      }}
                    >
                      {testimonial.content}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: "auto",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#6B7280",
                            fontSize: "0.75rem",
                            display: "block",
                            mb: 0.5,
                          }}
                        >
                          Điểm thi
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "600",
                            color: "#111827",
                            fontSize: "0.875rem",
                          }}
                        >
                          {testimonial.testType}
                        </Typography>
                      </Box>
                      <RatingCircle>{testimonial.rating}</RatingCircle>
                    </Box>
                  </TestimonialCard>
                ))}
            </TestimonialContainer>
          </AnimatePresence>
        </div>

        <SlideIndicator>
          {Array.from({ length: SLIDES_COUNT }).map((_, index) => (
            <div
              key={index}
              onClick={() => handleSlideChange(index)}
              style={{
                backgroundColor: index === activeSlide ? "#FF7A00" : "#D9D9D9",
              }}
            />
          ))}
        </SlideIndicator>
      </SlideContainer>
    </Container>
  )
}

