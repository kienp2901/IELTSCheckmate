"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  TextField,
  Button,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme,
  FormGroup,
  IconButton,
  MenuItem,
  InputAdornment,
} from "@mui/material"
import girl3d1 from "../assets/girl3d1.png"
import Group3 from "../assets/Group3.png"
import Ellipse2553 from "../assets/Ellipse2553.png"
import { Close } from "@mui/icons-material"
import {  useLocation, useNavigate } from 'react-router';

interface ConsultationDialogProps {
  open: boolean
  onClose: () => void
}

export default function ConsultationDialog({ open, onClose }: ConsultationDialogProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    timeSlot: "9h-11h", // Set default value to first option
    agreeTerms: false,
    receiveUpdates: false,
  })
  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  })
  const navigate = useNavigate();

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(0|\+84)(\d{9,10})$/
    return phoneRegex.test(phone)
  }

  const validateEmail = (email: string) => {
    if (!email) return true // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Validate on change
    if (name === "phone") {
      setErrors({
        ...errors,
        phone: validatePhone(value) ? "" : "Số điện thoại không hợp lệ",
      })
    } else if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value) ? "" : "Email không hợp lệ",
      })
    }
  }

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
    onClose()
  }

  const hanldeContact = (()=>{
    // navigate(`${process.env.PREFIX}/contact`);
    // window.location.reload();
    // window.location.href = `/wordpress/contact`;
    window.location.href = `${process.env.PREFIX}/contact`;
    onClose()
  })

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          m: { xs: 1, sm: 2, md: 4 },
          // width: "100%",
          // maxWidth: { xs: "95%", sm: "90%", md: "80%" },
          width: { xs: "95%", sm: "90%", md: "900px" },
          height: "auto",
          p: 0,
          background: "linear-gradient(90deg, #9FF8E8 -5.95%, #62CDC7 100%)",
          pt: { xs: 3, md: 6 },
          overflowY: "auto", // Cho phép cuộn
          scrollbarWidth: "none", // Ẩn scrollbar trên Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Ẩn scrollbar trên Chrome, Edge
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100%",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey.500",
            zIndex: 10,
            p: 0,
            bgcolor: "rgba(255, 255, 255, 0.7)",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          <Close />
        </IconButton>

        {/* Left side with background and character */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            position: "relative",
            p: { xs: 1, sm: 2 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            minHeight: { xs: "180px", sm: "220px", md: "auto" },
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              color: "#000",
              fontWeight: "bold",
              mb: 1,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            Tư vấn Chương Trình Học
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#000",
              mb: 2,
              maxWidth: "80%",
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
            }}
          >
            Bạn hãy để lại thông tin, Checkmate sẽ liên hệ tư vấn cho mình ngay nha
          </Typography>

          <Box
            sx={{
              position: { xs: "absolute", md: "absolute" },
              bottom: { xs: "-30px", sm: "-40px", md: "0" },
              left: 0,
              width: "100%",
              height: { xs: "180px", sm: "220px", md: "100%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <Box
              component="img"
              src={Ellipse2553}
              alt="Background"
              sx={{
                objectFit: "contain",
                width: { xs: "200px", sm: "250px", md: "300px" },
                position: "absolute",
                bottom: { xs: "-20px", md: "100px" },
                opacity: 0.9,
              }}
            />
            <Box
              component="img"
              src={Group3}
              alt="Background Element"
              sx={{
                objectFit: "contain",
                width: { xs: "110px", sm: "280px", md: "350px" },
                position: "absolute",
                left: { sm: "30px", md: "50px" },
                bottom: { md: "100px" },
                zIndex: 2,
              }}
            />
            <Box
              component="img"
              src={girl3d1}
              alt="IELTS Rook Course"
              sx={{
                objectFit: "contain",
                width: { xs: "90px", sm: "220px", md: "300px" },
                position: "relative",
                bottom: { xs: "0", md: "100px" },
                zIndex: 3,
              }}
            />
          </Box>
        </Box>

        {/* Right side with form */}
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            p: { xs: 1, sm: 2 },
            // pt: { xs: 4, sm: 5, md: 3 }, // Add extra padding on top for mobile to account for image overlap
            position: "relative",
            zIndex: 5,
          }}
        >
          <Box
            sx={{
              background: "#fff",
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: { xs: 2, md: 3 } }}>
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
                  placeholder="Nhập họ và tên"
                  variant="outlined"
                  size="small"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 5,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: { xs: 2, md: 3 } }}>
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
                  // placeholder="+84"
                  variant="outlined"
                  size="small"
                  required
                  error={!!errors.phone}
                  helperText={errors.phone}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 5,
                    },
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">+84</InputAdornment>,
                  }}
                />
              </Box>

              <Box sx={{ mb: { xs: 2, md: 3 } }}>
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
                  placeholder="Nhập địa chỉ email"
                  variant="outlined"
                  size="small"
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 5,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: { xs: 2, md: 3 } }}>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 0.5, fontWeight: 500, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                >
                  Khung giờ nhận tư vấn (*)
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
                      borderRadius: 5,
                    },
                  }}
                >
                  <MenuItem value="9h-11h">9h - 11h sáng</MenuItem>
                  <MenuItem value="14h-17h30">14h - 17h30 chiều</MenuItem>
                  <MenuItem value="19h-21h30">19h - 21h30 tối</MenuItem>
                </TextField>
              </Box>

              <Box sx={{ mb: { xs: 2, md: 3 } }}>
                <Typography
                  variant="subtitle1"
                  sx={{ mb: 0.5, fontWeight: 500, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                >
                  Nội dung
                </Typography>
                <TextField
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Bạn có câu hỏi gì?
• Hãy cho Checkmate biết trình độ hiện tại của bạn?
• Mục tiêu mong muốn"
                  variant="outlined"
                  size="small"
                  multiline
                  rows={isSmallMobile ? 7 : 8}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>

              {/* <FormGroup sx={{ mb: { xs: 2, md: 3 } }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      sx={{
                        color: "#4DD0C9",
                        "&.Mui-checked": {
                          color: "#4DD0C9",
                        },
                        padding: { xs: "4px", md: "9px" },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                      Tôi đã đọc và đồng ý với các điều khoản của quý công ty
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="receiveUpdates"
                      checked={formData.receiveUpdates}
                      onChange={handleChange}
                      sx={{
                        color: "#4DD0C9",
                        "&.Mui-checked": {
                          color: "#4DD0C9",
                        },
                        padding: { xs: "4px", md: "9px" },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                      Nhận thông tin mới
                    </Typography>
                  }
                />
              </FormGroup> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#4DD0C9",
                  borderRadius: 6,
                  py: { xs: 1, md: 1.5 },
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#3CB0AA",
                  },
                }}
                onClick={hanldeContact}
              >
                Liên hệ ngay
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Dialog>
  )
}

