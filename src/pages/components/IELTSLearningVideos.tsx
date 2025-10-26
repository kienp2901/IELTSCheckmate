import { Box, Container, Typography, useTheme, useMediaQuery } from "@mui/material"
import Vector from "../../assets/Vector.png"
import MyCourseScreen from "../../assets/my-course-screen.png"

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
          display: { xs: "none", md: "none" },
          opacity: { xs: 0.5, md: 1 }, // Reduce opacity on mobile for better readability
        }}
      />

      <Container maxWidth="lg">
        {/* Text Content - Ở trên đầu */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 3, md: 6 },
            position: "relative",
            zIndex: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "20px", sm: "24px", md: "28px" },
              mb: { xs: 2, md: 3 },
              lineHeight: 1.4,
              background: "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Các khóa học được xây dựng bởi đội ngũ giáo viên giỏi cùng hệ thống luyện tập đi kèm
          </Typography>

          <Typography
            sx={{
              color: "#374151",
              fontSize: { xs: "12px", sm: "14px", md: "18px" },
              lineHeight: 1.6,
              maxWidth: "1200px",
              mx: "auto",
            }}
          >
            Toàn bộ nội dung học được thiết kế theo hệ thống kỹ năng (Reading - Listening - Writing - Speaking - Vocabulary - Grammar).<br />
            Mỗi khóa học được chia thành bài học nhỏ (micro learning units) giúp học viên tự học dễ tiếp cận, rõ tiến độ.
          </Typography>
        </Box>

        {/* Image Preview Area - Ở bên dưới */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            // minHeight: { xs: "200px", sm: "250px", md: "400px" },
            // bgcolor: "#0E9F97",
            borderRadius: { xs: "12px", md: "16px" },
            overflow: "hidden",
            cursor: "pointer",
            // transition: "all 0.2s",
            // "&:hover": {
            //   transform: "scale(1.01)",
            // },
            zIndex: 2,
          }}
        >
          <Box
            component="img"
            src={MyCourseScreen}
            alt="My Course Dashboard"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      </Container>
    </Box>
  )
}

