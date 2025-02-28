"use client"

import { useState, useRef, useEffect } from "react"
import { Box, Container, Typography, List, ListItem, ListItemText, useTheme, useMediaQuery } from "@mui/material"
import Layer1 from "../../assets/Layer_1.png"
import { motion, AnimatePresence } from "framer-motion"

export default function IELTS_Learning_Experience() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [selectedFeature, setSelectedFeature] = useState(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const features = [
    {
      title: "Luyện Speaking hằng ngày",
      description:
        "Cùng AI luyện kỹ năng Speaking mỗi ngày! IELTS Checkmate AI sẽ giúp bạn cải thiện cách phát âm, ngữ điệu, để tự tin nói tiếng Anh hơn.",
      video_url: "https://video-study-centre.lumeprep.com/Lume%20Landing%20Page/video_1_pte_magic.mp4",
    },
    {
      title: "Chấm bài Writing toàn diện",
      description:
        "Sau mỗi bài viết của bạn, AI sẽ đưa ra các khuyến nghị về tự vựng, ngữ pháp cùng các nhận xét chi tiết về tất cả các khía cạnh cùng điểm số mà bạn nhận được! Từ đó bạn sẽ cải thiện nhanh chóng",
      video_url: "https://video-study-centre.lumeprep.com/Lume%20Landing%20Page/video_2_pte_magic.mp4",
    },
    {
      title: "Luyện đề Reading",
      description:
        "Với việc thực hành làm các đề Reading, bạn sẽ tặng cường kỹ năng đọc hiểu để nhanh chóng nắm bắt ý chính của bài đọc",
      video_url: "https://video-study-centre.lumeprep.com/Lume%20Landing%20Page/video_4_pte_magic.mp4",
    },
    {
      title: "Luyện đề Listening",
      description:
        "Với việc thực hành làm các đề Listening, bạn sẽ tặng cường kỹ năng nghe hiểu đoạn hội thoại từ đó phát triển được việc nắm bắt ý chính và phản xạ nhanh nhạy",
      video_url: "https://video-study-centre.lumeprep.com/Lume%20Landing%20Page/video_5_pte_magic.mp4",
    },
    {
      title: "Phòng thi thử 4 kỹ năng",
      description:
        "IELTS Checkmate tích hợp chế độ thi thử 4 kỹ năng trong 1 lần làm bài. Giúp bạn có thể rèn luyện tâm lý phòng thi và nhận về kết quả đánh giá tổng quát",
      video_url: "https://video-study-centre.lumeprep.com/Lume%20Landing%20Page/video_6_pte_magic.mp4",
    },
  ]

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load() // Reset lại video
      videoRef.current.onloadeddata = () => {
        videoRef.current?.play().catch((error) => console.log("Autoplay was prevented:", error))
      }
    }
  }, [selectedFeature])

  const handleFeatureClick = (index: number) => {
    setSelectedFeature(index)
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
              fontSize: { xs: "14px", sm: "16px", md: "24px" },
            }}
          >
            Trải nghiệm học chủ động, thông minh
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: { xs: 1, md: 2 } }}>
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
          </Box>

          <Typography
            sx={{
              mt: { xs: 1, md: 2 },
              maxWidth: "800px",
              mx: "auto",
              color: "#374151",
              fontSize: { xs: "12px", sm: "14px", md: "18px" },
            }}
          >
            Trên nền tảng công nghệ mạnh mẽ, công cụ chấm điểm, đánh giá của IELTS Checkmate đang tiên phong trong việc
            đánh giá các kỹ năng của người dùng một cách nhanh chóng và chính xác
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

          <Box
            sx={{
              flex: 1,
              bgcolor: "#FF6B00",
              borderRadius: { xs: "8px", md: "12px" },
              overflow: "hidden",
              minHeight: { xs: "200px", sm: "300px", md: "400px" },
              order: { xs: 1, md: 2 },
            }}
          >
            <AnimatePresence mode="wait">
              <motion.video
                key={selectedFeature}
                ref={videoRef}
                src={features[selectedFeature].video_url}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                controls
                muted
                playsInline
              />
            </AnimatePresence>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

