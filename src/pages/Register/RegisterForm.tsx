"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Avatar,
  Chip,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CheckIcon from "@mui/icons-material/Check"
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

// Custom styled components
const OrderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  height: "100%",
}))

const PromotionBox = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 222, 173, 0.5)",
  borderRadius: 8,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

const CourseItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.default,
  borderRadius: 8,
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
  const [contactTime, setContactTime] = useState("9h - 11h sáng")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  return (
    <Box sx={{ p: 4, maxWidth: 1200 }}>
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
                <PriceText>2.500.000₫</PriceText>
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
                <PriceText>4.300.000₫</PriceText>
              </CourseItem>

              <Divider sx={{ my: 2, borderStyle: "dashed" }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Tổng học phí
                </Typography>
                <PriceText>6.800.000₫</PriceText>
              </Box>

              <PromotionBox>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    Ưu đãi
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Chip label="Đúng ưu đãi" size="small" variant="outlined" icon={<CheckIcon fontSize="small" />} />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Giá được giảm</Typography>
                  <Typography variant="body2" fontWeight="bold" color="error">
                    -1.360.000₫
                  </Typography>
                </Box>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Quà tặng
                </Typography>

                <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                  <CardGiftcardIcon fontSize="small" sx={{ mr: 1, mt: 0.3 }} />
                  <Typography variant="body2">
                    Khóa sách độc quyền tự luyện IELTS 4 kỹ năng (trị giá 1.000.000₫)
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <CardGiftcardIcon fontSize="small" sx={{ mr: 1, mt: 0.3 }} />
                  <Typography variant="body2">Tai nghe bluetooth Xiaomi (trị giá 600.000₫)</Typography>
                </Box>
              </PromotionBox>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium">
                  Giá sau khuyến mại
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  5.440.000₫
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary">
                Bạn vẫn còn phân vân? Liên hệ Checkmate để được{" "}
                <Typography component="span" color="primary" sx={{ fontWeight: "medium" }}>
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
                <TextField
                  fullWidth
                  label="Họ và tên (*)"
                  placeholder="Nhập tên của bạn"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <TextField
                  fullWidth
                  label="Số điện thoại (*)"
                  placeholder="Nhập số điện thoại"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+84</InputAdornment>,
                  }}
                />

                <TextField
                  fullWidth
                  label="Email"
                  placeholder="Nhập email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <FormControl fullWidth>
                  <InputLabel id="contact-time-label">Khung giờ liên hệ</InputLabel>
                  <Select
                    labelId="contact-time-label"
                    value={contactTime}
                    onChange={(e) => setContactTime(e.target.value)}
                    label="Khung giờ liên hệ"
                    IconComponent={KeyboardArrowDownIcon}
                  >
                    <MenuItem value="9h - 11h sáng">9h - 11h sáng</MenuItem>
                    <MenuItem value="13h - 15h chiều">13h - 15h chiều</MenuItem>
                    <MenuItem value="19h - 21h tối">19h - 21h tối</MenuItem>
                  </Select>
                </FormControl>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <StyledButton variant="contained" color="primary" size="large" sx={{ minWidth: 200 }}>
                    Xác nhận thanh toán
                  </StyledButton>
                </Box>
              </Box>
            </OrderPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

