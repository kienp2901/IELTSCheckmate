"use client";

import { Box, Container, Typography, Card, Grid } from "@mui/material";
import { motion } from "framer-motion";
import MsLienImage from "../../assets/Ms-Lien.jpg";
import MrBachImage from "../../assets/Mr-Bach.jpg";

const councilMembers = [
  {
    name: "Cô Liên Phạm",
    image: MsLienImage,
    credentials: [
      "👩‍🎓 Thủ khoa đầu vào ngành Ngôn ngữ Anh ULIS, Bằng Giỏi Cử nhân NNA",
      "👩‍🎓 Thạc sĩ Ngôn ngữ Anh, Đại học Ngoại ngữ - Đại học Quốc gia Hà Nội",
      "⭐IELTS: 8.5",
      "🏵 Cựu giảng viên khoa Tiếng Anh - Đại học Mở Hà Nội với kinh nghiệm dạy IELTS 10 năm",
      "📖 Biên dịch sách 'Buddha's Diet' - 'Ăn kiêng kiểu Đức Phật'",
    ],
  },
  {
    name: "Thầy Phan Tất Bách",
    image: MrBachImage,
    credentials: [
      "👩‍🎓 Nghiên cứu sinh (Tiến Sĩ) ngành Ngôn Ngữ Học Tính Toán tại đại học Leuven (học bổng MSCA của EU)",
      "👩‍🎓 Thủ khoa đầu ra khoá Thạc Sĩ Ngôn Ngữ Học tại đại học Stirling",
      "⭐ IELTS 8.5",
      "⭐ 7 năm kinh nghiệm dạy IELTS",
    ],
  },
];

export default function AcademicCouncil() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        bgcolor: "#F9FAFB",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "28px", sm: "36px", md: "40px" },
              color: "#111827",
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            🎓 Hội đồng Học thuật
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "16px", md: "18px" },
              color: "#0E9F97",
              fontWeight: 600,
              mb: 3,
            }}
          >
            Đội ngũ đứng sau sự khác biệt của IELTS Checkmate
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: "900px",
              mx: "auto",
              color: "#4B5563",
              fontSize: { xs: "14px", sm: "15px", md: "16px" },
              lineHeight: 1.8,
              px: { xs: 2, md: 0 },
            }}
          >
            Tại IELTS Checkmate, đội ngũ chuyên gia học thuật của chúng tôi vừa giỏi chuyên môn, vừa xuất sắc trong truyền đạt, và luôn khao khát đổi mới cách người Việt học tiếng Anh. Họ tiên phong kết hợp sư phạm và công nghệ AI để tạo ra phương pháp giúp người học hiểu sâu, luyện chắc và tiến bộ thực sự.
          </Typography>
        </Box>

        {/* Council Members Cards */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {councilMembers.map((member, index) => (
            <Grid item xs={12} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                style={{ height: "100%" }}
              >
                <Card
                  sx={{
                    height: "500px",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    bgcolor: "#FFFFFF",
                    borderRadius: "12px",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    border: "1px solid #E5E7EB",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                    "&:hover": {
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {/* Text Content Section */}
                  <Box
                    sx={{
                      flex: { xs: "1", md: "0 0 55%" },
                      p: { xs: 3, md: 4 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                      justifyContent: "center",
                    }}
                  >
                    {/* Name */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "20px", md: "24px" },
                        color: "#111827",
                        mb: 1,
                        lineHeight: 1.3,
                      }}
                    >
                      {member.name}
                    </Typography>

                    {/* Credentials List */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      {member.credentials.map((credential, credIndex) => (
                        <Typography
                          key={credIndex}
                          sx={{
                            fontSize: { xs: "13px", md: "14px" },
                            color: "#4B5563",
                            lineHeight: 1.7,
                          }}
                        >
                          {credential}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                  {/* Image Section - Right Side */}
                  <Box
                    sx={{
                      position: "relative",
                      flex: { xs: "1", md: "0 0 45%" },
                      height: { xs: "250px", md: "100%" },
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 15%",
                        display: "block",
                        filter: "brightness(0.95)",
                      }}
                    />

                    {/* Subtle gradient overlay */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: {
                          xs: "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 100%)",
                          md: "linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 20%)",
                        },
                      }}
                    />
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

