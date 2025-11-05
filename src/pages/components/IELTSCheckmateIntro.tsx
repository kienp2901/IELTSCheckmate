import { Box, Button, Container, Typography, useTheme, useMediaQuery, Stack } from "@mui/material"
import Vector from "../../assets/Vector.png"
import Model21 from "../../assets/model21.png"
import { useDialog } from "@/contexts/DialogContext"
import { useAuth } from "@/contexts/AuthContext"

export default function IELTSCheckmateIntro() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const { openDialog } = useDialog()
  const { isAuthenticated, login } = useAuth()

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
              IELTS Checkmate – Nước cờ quyết định để bạn làm chủ bài thi.
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 2, md: 2 },
                color: "#374151",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.6,
              }}
            >
              Ở đây, chúng tôi không "học cho có".
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 2, md: 2 },
                color: "#374151",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.6,
              }}
            >
              Chúng tôi học để <Box component="strong" sx={{ fontWeight: "bold" }}>ra đòn đúng</Box>, <Box component="strong" sx={{ fontWeight: "bold" }}>đi nước cờ khôn</Box>, và ghi điểm thật.
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 1, md: 1 },
                color: "#374151",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.6,
              }}
            >
              Với Checkmate, bạn không chỉ luyện đề và làm bài.
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 1, md: 1 },
                color: "#374151",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.6,
              }}
            >
              Bạn được học theo chiến lược:
            </Typography>
            
            <Box component="ul" sx={{ mb: { xs: 2, md: 2 }, pl: 3, color: "#374151" }}>
              <Typography
                component="li"
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                  lineHeight: 1.6,
                  mb: 0.5,
                }}
              >
                Hiểu cấu trúc bài thi
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                  lineHeight: 1.6,
                  mb: 0.5,
                }}
              >
                Luyện kỹ năng đúng trọng tâm
              </Typography>
              <Typography
                component="li"
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                  lineHeight: 1.6,
                  mb: 0.5,
                }}
              >
                Sử dụng AI như <Box component="strong" sx={{ fontWeight: "bold" }}>trợ thủ chiến đấu</Box>
              </Typography>
            </Box>
            
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 2, md: 2 },
                color: "#374151",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.6,
              }}
            >
              Và quan trọng nhất: phát triển tư duy ngôn ngữ thật sự.
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 2, md: 2 },
                color: "#374151",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.6,
              }}
            >
              Không áp lực, không "cày cuốc vô nghĩa".
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 2, md: 2 },
                color: "#374151",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.6,
              }}
            >
              Chúng tôi biến hành trình IELTS thành một cuộc chơi có luật, có chiến thuật — và bạn là người cầm bàn cờ.
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 1, md: 1 },
                color: "#374151",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.6,
                fontWeight: "bold",
              }}
            >
              Sẵn sàng chốt ván chưa?
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                mb: { xs: 3, md: 4 },
                color: "#374151",
                fontSize: { xs: "14px", sm: "16px" },
                lineHeight: 1.6,
              }}
            >
              IELTS Checkmate – <Box component="em" sx={{ fontStyle: "italic" }}>Make your move.</Box>
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
              height: { xs: "300px", sm: "400px", md: "550px" },
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

        {/* CTA Section */}
        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            backgroundColor: "#FFF3EB",
            borderRadius: "16px",
            p: { xs: 4, md: 6 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: "20px", sm: "24px", md: "28px" }, 
              lineHeight: 1.4,
              mb: 1,
              color: "#000"
            }}
          >
            Bạn đã sẵn sàng chinh phục mục tiêu chưa?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#0E9F97",
              mb: { xs: 3, md: 4 },
              fontWeight: 500,
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
            }}
          >
            Hãy bắt đầu học ngay thôi
          </Typography>
          
          <Stack spacing={2} alignItems="center" sx={{ maxWidth: "400px", mx: "auto" }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => {
                if (isAuthenticated) {
                  window.location.href = `${process.env.DOMAIN_FE}/dashboard`;
                } else {
                  login();
                }
              }}
              sx={{
                background: "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 100%)",
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(90deg, #0C8C87 -5.95%, #57C0AD 100%)",
                },
              }}
            >
              {isAuthenticated ? "Vào học" : "Bắt đầu học"}
            </Button>
            
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={openDialog}
              sx={{
                background: "linear-gradient(90deg, #F25022 -4.76%, #FFBA33 100%)",
                borderRadius: "25px",
                px: 4,
                py: 1.5,
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  background: "linear-gradient(90deg, #D94419 -4.76%, #E6A829 100%)",
                },
              }}
            >
              Nhận thêm tư vấn
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

