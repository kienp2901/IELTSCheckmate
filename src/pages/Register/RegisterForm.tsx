"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  MenuItem,
  InputAdornment,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useNavigate } from "react-router"

// Custom styled components
const OrderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  height: "100%",
  border: "1px solid #E5E7EB",
  boxShadow: "none",
}))

const PromotionBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFF9F0",
  borderRadius: 12,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

const CourseItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: "#fff",
  borderRadius: 12,
  border: "1px solid #E5E7EB",
}))

const PriceText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  padding: theme.spacing(1.5, 4),
  textTransform: "none",
}))

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    timeSlot: "9h-11h", // Set default value to first option
    discountRate: "40%", // Giá trị mặc định là tùy chọn đầu tiên
    agreeTerms: false,
    receiveUpdates: false,
  })

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  })

  const navigate = useNavigate()

  useEffect(() => {
    // Đảm bảo giá trị mặc định được chọn khi component mount
    setFormData((prev) => ({
      ...prev,
      discountRate: "40%", // Giá trị mặc định là tùy chọn đầu tiên
    }))
  }, [])

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(0|\+84)(\d{9,10})$/
    return phoneRegex.test(phone)
  }

  const validateEmail = (email: string) => {
    if (!email) return true // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    setFormData({
      ...formData,
      [name]: type === "checkbox" && e.target instanceof HTMLInputElement ? e.target.checked : value,
    });
  
    // Validate on change
    if (name === "phone") {
      setErrors({
        ...errors,
        phone: validatePhone(value) ? "" : "Số điện thoại không hợp lệ",
      });
    } else if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value) ? "" : "Email không hợp lệ",
      });
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields before submission
    const phoneValid = validatePhone(formData.phone)
    const emailValid = validateEmail(formData.email)

    setErrors({
      phone: phoneValid ? "" : "Số điện thoại không hợp lệ",
      email: emailValid ? "" : "Email không hợp lệ",
    })

    if (!phoneValid || !emailValid) {
      return // Don't submit if validation fails
    }

    console.log("Form submitted:", formData)
    // Handle form submission logic here
  }

  const handleConfirm = (()=>{
    window.location.href = `/wordpress/thankyou`;
    // window.location.href = `${process.env.PREFIX}/thankyou`;
  })

  return (
    <Box sx={{ p: 4 }}>
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid container spacing={3}>
          {/* Left side - Order information */}
          <Grid item xs={12} md={6}>
            <OrderPaper elevation={0} variant="outlined">
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Thông tin đơn hàng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mã đơn hàng 123456
                </Typography>
              </Box>

              <CourseItem>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Khóa học IELTS Rock cơ bản
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đầu ra 4.0 - 5.5 IELTS
                  </Typography>
                </Box>
                <PriceText sx={{ fontWeight: 600 }}>2.500.000đ</PriceText>
              </CourseItem>

              <CourseItem>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Khóa học IELTS Knight cơ bản
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đầu ra 5.5-6.5+ IELTS
                  </Typography>
                </Box>
                <PriceText sx={{ fontWeight: 600 }}>4.300.000đ</PriceText>
              </CourseItem>

              <Divider sx={{ my: 3, borderStyle: "dashed" }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="600">
                  Tổng học phí
                </Typography>
                <PriceText sx={{ fontWeight: 600 }}>6.800.000đ</PriceText>
              </Box>

              <PromotionBox>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Ưu đãi
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      select
                      name="discountRate"
                      value={formData.discountRate}
                      onChange={handleChange}
                      size="small"
                      sx={{
                        width: "190px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "16px",
                          backgroundColor: "#fff",
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                        },
                        "& .MuiSelect-select": {
                          paddingY: "6px",
                        },
                      }}
                      SelectProps={{
                        IconComponent: KeyboardArrowDownIcon,
                      }}
                    >
                      <MenuItem value="40%">Đúng ưu đãi 40%</MenuItem>
                      <MenuItem value="50%">Đúng ưu đãi 50%</MenuItem>
                    </TextField>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Giá được giảm</Typography>
                  <Typography variant="body2" fontWeight="bold" color="error">
                    -1.360.000đ
                  </Typography>
                </Box>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Quà tặng
                </Typography>

                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                  <CardGiftcardIcon fontSize="small" sx={{ mr: 1, mt: 0.3, color: "#F59E0B" }} />
                  <Typography variant="body2">
                    Khóa sách độc quyền tự luyện IELTS 4 kỹ năng (trị giá 1.000.000đ)
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <CardGiftcardIcon fontSize="small" sx={{ mr: 1, mt: 0.3, color: "#F59E0B" }} />
                  <Typography variant="body2">Tai nghe bluetooth Xiaomi (trị giá 600.000đ)</Typography>
                </Box>
              </PromotionBox>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="subtitle1" fontWeight="600">
                  Giá sau khuyến mại
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#0E9F97">
                  5.440.000đ
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" color="text.secondary">
                Bạn vẫn còn phân vân? Liên hệ Checkmate để được{" "}
                <Typography component="span" color="#0E9F97" sx={{ fontWeight: "medium" }}>
                  Tư vấn thêm
                </Typography>
              </Typography>
            </OrderPaper>
          </Grid>

          {/* Right side - Customer information */}
          <Grid item xs={12} md={6}>
            <OrderPaper elevation={0} variant="outlined">
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Thông tin của bạn
              </Typography>

              <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 0.5, fontWeight: 500, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                  >
                    Họ và tên (*)
                  </Typography>
                  <TextField
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Nhập tên của bạn"
                    variant="outlined"
                    size="small"
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 25,
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 0.5, fontWeight: 500, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                  >
                    Số điện thoại (*)
                  </Typography>
                  <TextField
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Nhập số điện thoại"
                    variant="outlined"
                    size="small"
                    required
                    error={!!errors.phone}
                    helperText={errors.phone}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 25,
                      },
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">+84</InputAdornment>,
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 0.5, fontWeight: 500, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                  >
                    Email
                  </Typography>
                  <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Nhập email"
                    variant="outlined"
                    size="small"
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 25,
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 0.5, fontWeight: 500, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                  >
                    Khung giờ liên hệ
                  </Typography>
                  <TextField
                    select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Chọn khung giờ"
                    variant="outlined"
                    size="small"
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 25,
                      },
                    }}
                  >
                    <MenuItem value="9h-11h">9h - 11h sáng</MenuItem>
                    <MenuItem value="14h-17h30">14h - 17h30 chiều</MenuItem>
                    <MenuItem value="19h-21h30">19h - 21h30 tối</MenuItem>
                  </TextField>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      borderRadius: "25px",
                      backgroundImage: "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 100%)",
                      "&:hover": {
                        backgroundImage: "linear-gradient(90deg, #0C8C87 -5.95%, #57C0AD 100%)",
                      },
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "white",
                      padding: "8px 16px",
                      minWidth: "120px",
                    }}
                    onClick={handleConfirm}
                  >
                    Xác nhận thanh toán
                  </Button>
                </Box>
              </Box>
            </OrderPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

