import { Box, Button, Container, Typography, useTheme, useMediaQuery, Stack } from "@mui/material"
import { Play } from "lucide-react"
import Vector from "../../assets/Vector.png"
import Model21 from "../../assets/model21.png"
import { useDialog } from "@/contexts/DialogContext"
import { useScroll } from "@/contexts/ScrollContext"

export default function IELTSCheckmateIntro() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const { openDialog } = useDialog()
  const { scrollToAIAssistant } = useScroll()

  return (
    <Container maxWidth="lg">
      <Stack spacing={{ xs: 3, md: 4 }} sx={{ py: { xs: 4, md: 6 } }}>
        {/* Hero Section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 4 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left Content */}
          <Box sx={{ width: { xs: "100%", md: "50%" } }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", fontSize: { xs: "24px", sm: "28px", md: "32px" }, lineHeight: 1.2 }}
            >
              ELTS Checkmate - Làm chủ kỳ thi, chinh phục band điểm
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 2, md: 3 },
                color: "text.secondary",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.6,
              }}
            >
              "Checkmate" - nước cờ quyết định cho đến chiến thắng. ELTS Checkmate nhằm tạo nguồn cảm hứng học tập cho
              bạn để đạt điểm tốt, chinh phục mục tiêu IELTS của mình.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 3, md: 4 },
                color: "text.secondary",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.6,
              }}
            >
              Không chỉ là một văn bằng học và luyện tập IELTS, @ILTS Checkmate mang đến trải nghiệm học tập thông minh
              với phương pháp học tốt hơn và chiến nghệ AI, giúp bạn rèn luyện kỹ năng, phát triển tư duy và có thêm một
              người bạn đồng hành trên con đường chinh phục kỳ thi IELTS đầy thú vị.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 3 }}
              sx={{ mb: { xs: 3, md: 4 }, width: "100%" }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(90deg, #F25022 -4.76%, #FFBA33 100%)",
                  borderRadius: "25px",
                  px: { xs: 3, sm: 4 },
                  py: 1.5,
                  width: { xs: "100%", sm: "auto" },
                  minWidth: { sm: "200px" },
                  fontSize: { xs: "14px", sm: "16px" },
                }}
                onClick={scrollToAIAssistant}
              >
                Thiết kế lộ trình học
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 100%)",
                  borderRadius: "25px",
                  px: { xs: 3, sm: 4 },
                  py: 1.5,
                  width: { xs: "100%", sm: "auto" },
                  minWidth: { sm: "200px" },
                  fontSize: { xs: "14px", sm: "16px" },
                }}
                onClick={openDialog}
              >
                Nhận tư vấn
              </Button>
            </Stack>
          </Box>

          {/* Right Image */}
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: "45%" },
              height: { xs: "250px", sm: "300px", md: "400px" },
              marginTop: { xs: 2, md: 0 },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "100%",
                backgroundImage: `url(${Vector})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "100%",
                backgroundImage: `url(${Model21})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
          </Box>
        </Stack>

        {/* Video Section */}
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            backgroundColor: "#FFF3EB",
            borderRadius: "16px",
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", fontSize: { xs: "20px", sm: "24px", md: "28px" }, lineHeight: 1.3 }}
          >
            Bắt đầu hành trình chinh phục IELTS ngay hôm nay
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              background: "linear-gradient(90deg, #F25022 -4.76%, #FFBA33 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: { xs: 3, md: 4 },
              fontWeight: 700,
              fontSize: { xs: "18px", sm: "20px", md: "24px" },
            }}
          >
            Bằng việc xây lộ trình học nhé!
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "200px", sm: "300px", md: "400px" },
              bgcolor: "#FFE3CB",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                bgcolor: "#FFD6B3",
              },
            }}
          >
            <Play
              size={isMobile ? 48 : isTablet ? 56 : 64}
              color="white"
              style={{
                filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
              }}
            />
          </Box>
        </Box>
      </Stack>
    </Container>
  )
}

