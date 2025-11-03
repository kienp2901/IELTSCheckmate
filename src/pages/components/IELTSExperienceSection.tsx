"use client"

import { useState, useEffect } from "react"
import { Box, Container, Typography, List, ListItem, ListItemText, useTheme, useMediaQuery, IconButton } from "@mui/material"
import Layer1 from "../../assets/Layer_1.png"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSwipeable } from "react-swipeable"

// Import ảnh từng folder
import topicTalk1 from "../../assets/IELTSExperienceSectionImage/1-topic-talk/topic-talk-1.png"
import topicTalk2 from "../../assets/IELTSExperienceSectionImage/1-topic-talk/topic-talk-2.png"
import topicTalk3 from "../../assets/IELTSExperienceSectionImage/1-topic-talk/topic-talk-3.png"
import topicTalk4 from "../../assets/IELTSExperienceSectionImage/1-topic-talk/topic-talk-4.png"
import topicTalk5 from "../../assets/IELTSExperienceSectionImage/1-topic-talk/topic-talk-5.png"

import writing1 from "../../assets/IELTSExperienceSectionImage/2-writing/writing-1.png"
import writing2 from "../../assets/IELTSExperienceSectionImage/2-writing/writing-2.png"
import writing3 from "../../assets/IELTSExperienceSectionImage/2-writing/writing-3.png"
import writing4 from "../../assets/IELTSExperienceSectionImage/2-writing/writing-4.png"
import writing5 from "../../assets/IELTSExperienceSectionImage/2-writing/writing-5.png"

import listening1 from "../../assets/IELTSExperienceSectionImage/3-listening/listening-1.png"
import listening2 from "../../assets/IELTSExperienceSectionImage/3-listening/listening-2.png"
import listening3 from "../../assets/IELTSExperienceSectionImage/3-listening/listening-3.png"

import reading1 from "../../assets/IELTSExperienceSectionImage/4-reading/reading-1.png"
import reading2 from "../../assets/IELTSExperienceSectionImage/4-reading/reading-2.png"
import reading3 from "../../assets/IELTSExperienceSectionImage/4-reading/reading-3.png"

import speaking1 from "../../assets/IELTSExperienceSectionImage/5-speaking/speaking-1.png"
import speaking2 from "../../assets/IELTSExperienceSectionImage/5-speaking/speaking-2.png"
import speaking3 from "../../assets/IELTSExperienceSectionImage/5-speaking/speaking-3.png"
import speaking4 from "../../assets/IELTSExperienceSectionImage/5-speaking/speaking-4.png"

import allSkill1 from "../../assets/IELTSExperienceSectionImage/6-all-skill/all-skill-1.png"

const AUTO_SLIDE_INTERVAL = 3000 // 3 giây tự chuyển ảnh

// Animation variants
const imageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

export default function IELTS_Learning_Experience() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const features = [
    {
      title: "Trò chuyện tiếng Anh hàng ngày",
      description:
        "Thực hành giao tiếp tiếng Anh theo chủ đề và nhận đánh giá chi tiết tức thì với Trợ lý ngôn ngữ AI sẽ giúp bạn cải thiện cách phát âm, ngữ điệu, để tự tin nói tiếng Anh hơn.",
      images: [topicTalk1, topicTalk2, topicTalk3, topicTalk4, topicTalk5],
    },
    {
      title: "Chấm bài Writing toàn diện",
      description:
        "Sau mỗi bài viết của bạn, AI sẽ đưa ra các khuyến nghị về tự vựng, ngữ pháp cùng các nhận xét chi tiết về tất cả các khía cạnh cùng điểm số mà bạn nhận được! Từ đó bạn sẽ cải thiện nhanh chóng",
      images: [writing1, writing2, writing3, writing4, writing5],
    },
    {
      title: "Luyện đề Listening",
      description:
        "Với việc thực hành làm các đề Listening, bạn sẽ tặng cường kỹ năng nghe hiểu đoạn hội thoại từ đó phát triển được việc nắm bắt ý chính và phản xạ nhanh nhạy",
      images: [listening1, listening2, listening3],
    },
    {
      title: "Luyện đề Reading",
      description:
        "Với việc thực hành làm các đề Reading, bạn sẽ tặng cường kỹ năng đọc hiểu để nhanh chóng nắm bắt ý chính của bài đọc",
      images: [reading1, reading2, reading3],
    },
    {
      title: "Luyện đề Speaking",
      description:
        "Luyện đề Speaking với AI chấm điểm IELTS chuẩn. Phân tích phát âm, ngữ pháp và từ vựng giúp bạn biết điểm mạnh, điểm yếu và cải thiện band Speaking hiệu quả!",
      images: [speaking1, speaking2, speaking3, speaking4],
    },
    {
      title: "Phòng thi thử 4 kỹ năng",
      description:
        "IELTS Checkmate tích hợp chế độ thi thử 4 kỹ năng trong 1 lần làm bài. Giúp bạn có thể rèn luyện tâm lý phòng thi và nhận về kết quả đánh giá tổng quát",
      images: [allSkill1],
    },
  ]

  const currentImages = features[selectedFeature].images

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextImage(),
    onSwipedRight: () => handlePrevImage(),
    trackMouse: true,
  })

  // Auto-play slideshow
  useEffect(() => {
    if (isPaused || currentImages.length <= 1) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
    }, AUTO_SLIDE_INTERVAL)

    return () => clearInterval(interval)
  }, [selectedFeature, isPaused, currentImages.length])

  // Reset về ảnh đầu tiên khi đổi feature
  useEffect(() => {
    setCurrentImageIndex(0)
    setDirection(0)
  }, [selectedFeature])

  const handleFeatureClick = (index: number) => {
    setSelectedFeature(index)
  }

  const handlePrevImage = () => {
    setDirection(-1)
    setCurrentImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setDirection(1)
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
  }

  return (
    <Box
      sx={{
        position: "relative",
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        backgroundImage: `url(${Layer1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        bgcolor: "white",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 3, md: 6 },
            py: { xs: 2, md: 4 },
            px: { xs: 1, md: 2 },
            borderRadius: "16px 16px 0 0",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "#0E9F97",
              fontWeight: 500,
              mb: { xs: 1, md: 2 },
              fontSize: { xs: "20px", sm: "24px", md: "28px" },
            }}
          >
            Bạn nhận được gì khi đến với IELTS Checkmate?
          </Typography>

          {/* <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: { xs: 1, md: 2 } }}>
            <Typography
              variant="h3"
              sx={{
                color: "#FF7700",
                fontWeight: 700,
                fontSize: { xs: "24px", sm: "32px", md: "48px" },
                lineHeight: { xs: 1.3, md: 1.2 },
              }}
            >
              Từ Phòng Luyện Thi IELTS Ảo Siêu Cấp
            </Typography>
          </Box> */}

          <Typography
            sx={{
              mt: { xs: 1, md: 2 },
              maxWidth: "800px",
              mx: "auto",
              color: "#374151",
              fontSize: { xs: "12px", sm: "14px", md: "18px" },
            }}
          >
            Trên nền tảng công nghệ mạnh mẽ và chương trình học thú vị.  IELTS Checkmate có thể giúp bạn đạt mục tiêu thi IELTS với chi phí và thời gian tối ưu nhất
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, md: 4 },
            alignItems: "stretch",
            bgcolor: "white",
            borderRadius: { xs: "16px", md: "24px" },
            p: { xs: 2, md: 4 },
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            border: "1px solid #CFCFCF",
          }}
        >
          <Box
            sx={{
              flex: { xs: "1 1 auto", md: "0 0 300px" },
              width: { xs: "100%", md: "auto" },
              order: { xs: 2, md: 1 },
            }}
          >
            <List
              sx={{
                "& .MuiListItem-root": {
                  px: { xs: 1, md: 2 },
                  py: { xs: 1, md: 1.5 },
                  borderBottom: "1px solid #E5E7EB",
                  fontSize: { xs: "16px", md: "20px" },
                  "&:last-child": {
                    borderBottom: "none",
                  },
                },
              }}
            >
              {features.map((feature, index) => (
                <ListItem
                  key={index}
                  component={motion.div}
                  initial={false}
                  animate={{
                    backgroundColor: index === selectedFeature ? "rgba(16, 185, 129, 0.1)" : "rgba(255, 255, 255, 0)",
                  }}
                  transition={{ duration: 0.3 }}
                  sx={{
                    cursor: "pointer",
                    borderBottom: index === selectedFeature ? "2px solid" : "1px solid #E5E7EB",
                    borderImageSource:
                      index === selectedFeature
                        ? "linear-gradient(90deg, #4CF8DB 22%, rgba(255, 128, 0, 0.2) 100%)"
                        : "none",
                    borderImageSlice: index === selectedFeature ? 1 : "none",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                  onClick={() => handleFeatureClick(index)}
                >
                  <ListItemText
                    primary={feature.title}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      color: "#374151",
                      fontSize: { xs: "14px", sm: "16px", md: "18px" },
                    }}
                  />
                  <AnimatePresence mode="wait">
                    {(index === selectedFeature || isMobile) && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mt: 1,
                            fontSize: { xs: "12px", sm: "14px", md: "16px" },
                            display: isMobile && index !== selectedFeature ? "none" : "block",
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Container khung bao quanh ảnh và controls */}
          <Box
            sx={{
              flex: 1,
              order: { xs: 1, md: 2 },
              bgcolor: "#FF6B00",
              borderRadius: { xs: "12px", md: "16px" },
              p: { xs: 2, md: 3 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Image Container */}
            <Box
              {...handlers}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              sx={{
                position: "relative",
                borderRadius: { xs: "8px", md: "12px" },
                overflow: "hidden",
                minHeight: { xs: "200px", sm: "300px", md: "400px" },
                bgcolor: "#ffffff",
                flex: 1,
              }}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={`${selectedFeature}-${currentImageIndex}`}
                  src={currentImages[currentImageIndex]}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "tween", duration: 0.3 },
                    opacity: { duration: 0.2 },
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  alt={`${features[selectedFeature].title} - Slide ${currentImageIndex + 1}`}
                />
              </AnimatePresence>
            </Box>

            {/* Navigation Controls - Dưới ảnh */}
            {currentImages.length > 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.75rem",
                  py: 1,
                }}
              >
                <IconButton
                  onClick={handlePrevImage}
                  disabled={currentImageIndex === 0}
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "#E5E7EB",
                    color: "#6B7280",
                    "&:hover": {
                      bgcolor: "#D1D5DB",
                    },
                    "&:disabled": {
                      bgcolor: "#F3F4F6",
                      color: "#D1D5DB",
                    },
                  }}
                >
                  <ChevronLeft size={20} />
                </IconButton>

                {/* Indicators */}
                <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  {currentImages.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => {
                        setDirection(index > currentImageIndex ? 1 : -1)
                        setCurrentImageIndex(index)
                      }}
                      sx={{
                        width: index === currentImageIndex ? "24px" : "8px",
                        height: "8px",
                        borderRadius: index === currentImageIndex ? "4px" : "50%",
                        bgcolor: index === currentImageIndex ? "#0E9F97" : "#D9D9D9",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: index === currentImageIndex ? "#0E9F97" : "#BFBFBF",
                        },
                      }}
                    />
                  ))}
                </Box>

                <IconButton
                  onClick={handleNextImage}
                  disabled={currentImageIndex === currentImages.length - 1}
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "#E5E7EB",
                    color: "#6B7280",
                    "&:hover": {
                      bgcolor: "#D1D5DB",
                    },
                    "&:disabled": {
                      bgcolor: "#F3F4F6",
                      color: "#D1D5DB",
                    },
                  }}
                >
                  <ChevronRight size={20} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

