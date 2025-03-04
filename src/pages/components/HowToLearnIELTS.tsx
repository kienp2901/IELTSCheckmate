"use client"

import {
  Box,
  Button,
  Card,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  List,
  ListItem,
  ListItemText,
  Paper,
  ListItemIcon,
  FormControl,
} from "@mui/material"
import Frame from "../../assets/Frame.png"
import Frame2 from "../../assets/Frame2.png"
import ImgCourse1 from "../../assets/ImgCourse1.png"
import ImgCourse2 from "../../assets/ImgCourse2.png"
import { CheckCircle } from "@mui/icons-material"
import React, { ChangeEvent } from "react";
import { useDialog } from "@/contexts/DialogContext"
import { useNavigate } from "react-router"

export default function AIAssistant() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const { openDialog } = useDialog()

  const [currentLevel, setCurrentLevel] = React.useState("4.0-5.0")
  const [targetLevel, setTargetLevel] = React.useState("5.5-6.0")

  const handleCurrentLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentLevel(event.target.value);
  };

  const handleTargetLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTargetLevel(event.target.value);
  };

  const navigate = useNavigate();

  const handleClickRegister = (()=>{
    // navigate(`register`)
    window.location.href = `/wordpress/register`;
    // window.location.href = `${process.env.PREFIX}/register`;
  })

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 45.96%, #0E9F97 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 1,
          pointerEvents: "none",
        }}
      >
        <Box
          component="img"
          src={Frame}
          alt=""
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: "auto",
            height: "100%",
            display: { xs: "none", md: "block" },
            opacity: 1,
          }}
        />
        <Box
          component="img"
          src={Frame2}
          alt=""
          sx={{
            position: "absolute",
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            width: "auto",
            height: "100%",
            display: { xs: "none", md: "block" },
            opacity: 1,
          }}
        />
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          py: { xs: 2, md: 4 },
          px: { xs: 2, md: 3 },
        }}
      >
        <Stack spacing={2} sx={{ mb: { xs: 2, md: 4 }, textAlign: "center" }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              sx={{
                color: "#FFF",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              Cách học với IELTS Checkmate?
            </Typography>
          </Stack>
          <Typography variant="subtitle1" sx={{ color: "#FFF", fontSize: { xs: "0.875rem", md: "1rem" } }}>
            Đặt mục tiêu đạt điểm số trong 4 tháng?
            <br />
            Phạm vi điểm số hiện tại cao hơn là bao nhiêu
          </Typography>
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }} justifyContent="space-between">
          <Paper
            sx={{
              p: { xs: 2, md: 3 },
              flex: 1,
              borderRadius: "24px",
              bgcolor: "white",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box
              sx={{
                flex: 1,
                textAlign: "center",
                borderRight: { xs: "none", md: "3px solid #eee" },
                borderBottom: { xs: "3px solid #eee", md: "none" },
                pr: { xs: 0, md: 2 },
                pb: { xs: 2, md: 0 },
                mb: { xs: 2, md: 0 },
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                Trình độ hiện tại của tôi
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  row
                  value={currentLevel}
                  onChange={handleCurrentLevelChange}
                  sx={{
                    gap: { xs: 0.5, md: 1 },
                    mb: 2,
                    "& .MuiFormControlLabel-root": {
                      m: 0,
                      flex: "1 1 auto",
                      justifyContent: "center",
                    },
                    backgroundColor: "#F2F2F2",
                    p: { xs: 1.5, md: 3 },
                    borderRadius: "16px",
                  }}
                >
                  <FormControlLabel
                    value="0-3.5"
                    control={<Radio sx={{ display: "none" }} />}
                    label={
                      <Box
                        sx={{
                          width: "100%",
                          py: 1,
                          px: 3,
                          borderRadius: "100px",
                          textAlign: "center",
                          bgcolor: currentLevel === "0-3.5" ? "white" : "transparent",
                          color: currentLevel === "0-3.5" ? "#0EA882" : "inherit",
                          border: "1px solid transparent",
                          transition: "all 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: currentLevel === "0-3.5" ? "#E8F5E9" : "#F5F5F5",
                          },
                          boxShadow: currentLevel === "0-3.5" ? "0px 1px 3px 0px #525D6633" : "none",
                        }}
                      >
                        Mất gốc - 3.5
                      </Box>
                    }
                    sx={{
                      "& .MuiTypography-root": {
                        width: "100%",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="4.0-5.0"
                    control={<Radio sx={{ display: "none" }} />}
                    label={
                      <Box
                        sx={{
                          width: "100%",
                          py: 1,
                          px: 3,
                          borderRadius: "100px",
                          textAlign: "center",
                          bgcolor: currentLevel === "4.0-5.0" ? "white" : "transparent",
                          color: currentLevel === "4.0-5.0" ? "#0EA882" : "inherit",
                          border: "1px solid transparent",
                          transition: "all 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: currentLevel === "4.0-5.0" ? "#E8F5E9" : "#F5F5F5",
                          },
                          boxShadow: currentLevel === "4.0-5.0" ? "0px 1px 3px 0px #525D6633" : "none",
                        }}
                      >
                        4.0 - 5.0
                      </Box>
                    }
                    sx={{
                      "& .MuiTypography-root": {
                        width: "100%",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="5.5-6.0"
                    control={<Radio sx={{ display: "none" }} />}
                    label={
                      <Box
                        sx={{
                          width: "100%",
                          py: 1,
                          px: 3,
                          borderRadius: "100px",
                          textAlign: "center",
                          bgcolor: currentLevel === "5.5-6.0" ? "white" : "transparent",
                          color: currentLevel === "5.5-6.0" ? "#0EA882" : "inherit",
                          border: "1px solid transparent",
                          transition: "all 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: currentLevel === "5.5-6.0" ? "#E8F5E9" : "#F5F5F5",
                          },
                          boxShadow: currentLevel === "5.5-6.0" ? "0px 1px 3px 0px #525D6633" : "none",
                        }}
                      >
                        5.5 - 6.5+
                      </Box>
                    }
                    sx={{
                      "& .MuiTypography-root": {
                        width: "100%",
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  component="a"
                  href="#"
                  variant="body2"
                  sx={{
                    color: "#000",
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    mr: { xs: 0, sm: 1 },
                    mb: { xs: 0.5, sm: 0 },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  Bạn chưa rõ trình độ bản thân?
                </Typography>
                <Typography
                  component="a"
                  href="#"
                  variant="body2"
                  sx={{
                    color: "#0E9F97",
                    textDecoration: "none",
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  }}
                >
                  Kiểm tra trình độ tiếng Anh
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1, textAlign: "center", pl: { xs: 0, md: 2 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                Mục tiêu điểm số của tôi là
              </Typography>
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  row
                  value={targetLevel}
                  onChange={handleTargetLevelChange}
                  sx={{
                    gap: { xs: 0.5, md: 1 },
                    mb: 2,
                    "& .MuiFormControlLabel-root": {
                      m: 0,
                      flex: "1 1 auto",
                      justifyContent: "center",
                    },
                    backgroundColor: "#F2F2F2",
                    p: { xs: 1.5, md: 3 },
                    borderRadius: "16px",
                  }}
                >
                  <FormControlLabel
                    value="0-3.5"
                    control={<Radio sx={{ display: "none" }} />}
                    label={
                      <Box
                        sx={{
                          width: "100%",
                          py: 1,
                          px: 3,
                          borderRadius: "100px",
                          textAlign: "center",
                          bgcolor: targetLevel === "0-3.5" ? "white" : "transparent",
                          color: targetLevel === "0-3.5" ? "#0EA882" : "inherit",
                          border: "1px solid transparent",
                          transition: "all 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: targetLevel === "0-3.5" ? "#E8F5E9" : "#F5F5F5",
                          },
                          boxShadow: targetLevel === "0-3.5" ? "0px 1px 3px 0px #525D6633" : "none",
                        }}
                      >
                        Mất gốc - 3.5
                      </Box>
                    }
                    sx={{
                      "& .MuiTypography-root": {
                        width: "100%",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="4.0-5.0"
                    control={<Radio sx={{ display: "none" }} />}
                    label={
                      <Box
                        sx={{
                          width: "100%",
                          py: 1,
                          px: 3,
                          borderRadius: "100px",
                          textAlign: "center",
                          bgcolor: targetLevel === "4.0-5.0" ? "white" : "transparent",
                          color: targetLevel === "4.0-5.0" ? "#0EA882" : "inherit",
                          border: "1px solid transparent",
                          transition: "all 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: targetLevel === "4.0-5.0" ? "#E8F5E9" : "#F5F5F5",
                          },
                          boxShadow: targetLevel === "4.0-5.0" ? "0px 1px 3px 0px #525D6633" : "none",
                        }}
                      >
                        4.0 - 5.0
                      </Box>
                    }
                    sx={{
                      "& .MuiTypography-root": {
                        width: "100%",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="5.5-6.0"
                    control={<Radio sx={{ display: "none" }} />}
                    label={
                      <Box
                        sx={{
                          width: "100%",
                          py: 1,
                          px: 3,
                          borderRadius: "100px",
                          textAlign: "center",
                          bgcolor: targetLevel === "5.5-6.0" ? "white" : "transparent",
                          color: targetLevel === "5.5-6.0" ? "#0EA882" : "inherit",
                          border: "1px solid transparent",
                          transition: "all 0.2s",
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: targetLevel === "5.5-6.0" ? "#E8F5E9" : "#F5F5F5",
                          },
                          boxShadow: targetLevel === "5.5-6.0" ? "0px 1px 3px 0px #525D6633" : "none",
                        }}
                      >
                        5.5 - 6.5+
                      </Box>
                    }
                    sx={{
                      "& .MuiTypography-root": {
                        width: "100%",
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Paper>
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 4 }}>
          <Card sx={{ flex: 1, borderRadius: "24px", width: "100%" }}>
            <Box sx={{ position: "relative", textAlign: "center" }}>
              <Box
                component="img"
                src={ImgCourse1}
                alt="IELTS Knight Course"
                sx={{
                  objectFit: "cover",
                  m: 1.5,
                  borderRadius: "24px",
                  width: "calc(100% - 24px)",
                  height: "auto",
                }}
              />
            </Box>
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
                KHÓA HỌC IELTS KNIGHT
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Đầu ra: 4.0 - 5.0 IELTS
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Thời gian: 4-6 giờ
              </Typography>
              <List>
                {[
                  "Phát triển cơ sở vững kiến thức từ khóa học IELTS Introduction",
                  "Nâng cao và vững cấp độ mới từ vựng học thuật đặc giá trị trong phần 6.0 IELTS",
                  "Hiểu vững chiến thuật để xử lý các dạng đề thi IELTS",
                  "Sở hữu thư viện đề thi học thực tế dành trong bài thi Speaking và Writing",
                  "Cải thiện và kỹ năng nghe, Nói, Đọc, Viết lên trình độ Intermediate",
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5, px: { xs: 0, md: 2 } }}>
                    <ListItemIcon sx={{ minWidth: { xs: 24, md: 32 } }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                    />
                  </ListItem>
                ))}
              </List>
              <Stack spacing={1} sx={{ mt: 2, textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                  }}
                >
                  2.500.000VNĐ
                </Typography>
                <Typography variant="h5" color="primary">
                  1.500.000VNĐ
                </Typography>
              </Stack>
            </Box>
          </Card>
          <Card sx={{ flex: 1, borderRadius: "24px", width: "100%" }}>
            <Box sx={{ position: "relative", textAlign: "center" }}>
              <Box
                component="img"
                src={ImgCourse2}
                alt="IELTS Rook Course"
                sx={{
                  objectFit: "cover",
                  m: 1.5,
                  borderRadius: "24px",
                  width: "calc(100% - 24px)",
                  height: "auto",
                }}
              />
            </Box>
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
                KHÓA HỌC IELTS ROOK
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Đầu ra: 5.5 - 6.5 IELTS
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Thời gian: 4-6 giờ
              </Typography>
              <List>
                {[
                  "Phát triển cơ sở vững kiến thức từ khóa học IELTS Expert",
                  "Nâng cao và vững cấp độ mới từ vựng học thuật đặc giá trị trong phần 6.0 IELTS",
                  "Hiểu vững chiến thuật để xử lý các dạng đề thi IELTS",
                  "Sở hữu thư viện đề thi học thực tế dành trong bài thi Speaking và Writing",
                  "Cải thiện và kỹ năng nghe, Nói, Đọc, Viết lên trình độ Intermediate",
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5, px: { xs: 0, md: 2 } }}>
                    <ListItemIcon sx={{ minWidth: { xs: 24, md: 32 } }}>
                      <CheckCircle color="success" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                    />
                  </ListItem>
                ))}
              </List>
              <Stack spacing={1} sx={{ mt: 2, textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                  }}
                >
                  2.500.000VNĐ
                </Typography>
                <Typography variant="h5" color="primary">
                  1.500.000VNĐ
                </Typography>
              </Stack>
            </Box>
          </Card>
        </Stack>
        <Paper sx={{ p: { xs: 2, md: 3 }, maxWidth: 600, mx: "auto", borderRadius: "24px" }}>
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
            Thông tin thanh toán
          </Typography>
          <Stack spacing={2}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "flex-start", sm: "center" }}>
              <Box
                component="img"
                src={ImgCourse1}
                alt="IELTS Knight Course"
                sx={{
                  objectFit: "cover",
                  m: 1,
                  width: { xs: 50, md: 60 },
                  height: { xs: 50, md: 60 },
                  borderRadius: "10px",
                }}
              />
              <Box flex={1}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  Khóa học Ielts Knight
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}>
                  Đầu ra: 4.0 - 5.0 IELTS
                </Typography>
              </Box>
              <Typography variant="subtitle1" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                2.500.000VNĐ
              </Typography>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "flex-start", sm: "center" }}>
              <Box
                component="img"
                src={ImgCourse2}
                alt="IELTS Knight Course"
                sx={{
                  objectFit: "cover",
                  m: 1,
                  width: { xs: 50, md: 60 },
                  height: { xs: 50, md: 60 },
                  borderRadius: "10px",
                }}
              />
              <Box flex={1}>
                <Typography variant="subtitle1" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                  Khóa học Ielts Rook
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}>
                  Đầu ra: 5.0 - 6.0 IELTS
                </Typography>
              </Box>
              <Typography variant="subtitle1" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
                4.300.000VNĐ
              </Typography>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "center", sm: "flex-start" }}
              sx={{ borderTop: 1, borderColor: "divider", pt: 2 }}
            >
              <Stack direction="column" spacing={2} sx={{ width: { xs: "100%", sm: "auto" }, mb: { xs: 2, sm: 0 } }}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    background: "linear-gradient(90deg, #F25022 -4.76%, #FFBA33 100%)",
                    borderRadius: "25px",
                    px: 4,
                    py: 1,
                    width: { xs: "100%", sm: "fit-content" },
                    minWidth: { xs: "100%", sm: "200px" },
                  }}
                  onClick={handleClickRegister}
                >
                  Đăng ký ngay
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    background: "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 100%)",
                    borderRadius: "25px",
                    px: 4,
                    py: 1,
                    width: { xs: "100%", sm: "fit-content" },
                    minWidth: { xs: "100%", sm: "200px" },
                  }}
                  onClick={openDialog}
                >
                  Nhận tư vấn
                </Button>
              </Stack>
              <Stack spacing={1} sx={{ mt: { xs: 2, sm: 0 }, textAlign: "center" }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="h6"
                    sx={{
                      textDecoration: "line-through",
                      color: "text.secondary",
                      mr: 3,
                      fontSize: { xs: "0.875rem", md: "1.25rem" },
                    }}
                  >
                    6.800.000VNĐ
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#F25022", fontSize: { xs: "0.875rem", md: "1.25rem" } }}>
                    -10%
                  </Typography>
                </Stack>
                <Typography variant="h5" color="primary" sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}>
                  6.120.000VNĐ
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}

