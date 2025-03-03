import { Box, Container, Typography, useTheme, useMediaQuery } from "@mui/material"
import { Play } from "lucide-react"
import Vector from "../../assets/Vector.png"

export default function IELTS_Video_Courses() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Box
      sx={{
        bgcolor: "#EDFFFA",
        py: { xs: 3, sm: 4, md: 8 },
        px: { xs: 2, sm: 3, md: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Vector Background */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: "50%", md: "43%" },
          left: { xs: "50%", md: "20%" },
          transform: "translate(-50%, -50%)",
          width: { xs: "150%", sm: "120%", md: "100%" },
          height: { xs: "150%", sm: "120%", md: "100%" },
          backgroundImage: `url(${Vector})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
          pointerEvents: "none",
          display: { xs: "none", md: "block" },
          opacity: { xs: 0.5, md: 1 }, // Reduce opacity on mobile for better readability
        }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, sm: 4, md: 8 },
            alignItems: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Video Preview Area */}
          <Box
            sx={{
              flex: "1",
              position: "relative",
              width: "100%",
              minHeight: { xs: "200px", sm: "250px", md: "400px" },
              bgcolor: "#0E9F97",
              borderRadius: { xs: "12px", md: "16px" },
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                transform: "scale(1.01)",
              },
              zIndex: 3,
            }}
          >
            {/* Play Button */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 4,
              }}
            >
              <Play
                size={isSmallMobile ? 48 : isMobile ? 56 : 64}
                color="white"
                style={{
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                }}
              />
            </Box>
          </Box>

          {/* Content */}
          <Box
            sx={{
              flex: "1",
              maxWidth: { xs: "100%", md: "50%" },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "20px", sm: "24px", md: "32px" },
                mb: { xs: 2, md: 3 },
                lineHeight: 1.4,
                background: "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Các khóa học Video được xây dựng bởi đội ngũ giáo viên giỏi cùng hệ thống luyện tập đi kèm
            </Typography>

            <Typography
              sx={{
                color: "#374151",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.6,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Các bài tập nhỏ sau các bài học sẽ giúp bạn kiểm tra kiến thức bạn vừa học, tăng khả năng ghi nhớ hiệu
              quả.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

