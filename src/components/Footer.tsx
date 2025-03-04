"use client"

import { Box, Container, Typography, useTheme, useMediaQuery, Stack } from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import logo from "../assets/logo.png"
import facebook from "../assets/facebook_social.png"
import zalo from "../assets/zalo_social.png"
import youtube from "../assets/youtube_social.png"

const footerLinks = [
  {
    title: "Về IELTS Checkmate",
    href: "/about",
  },
  {
    title: "Liên hệ",
    href: "/contact",
  },
  {
    title: "Điều Khoản & Điều Kiện",
    href: "/terms",
  },
  {
    title: "Chính Sách Bảo Mật",
    href: "/privacy",
  },
]

const socialLinks = [
  {
    icon: youtube,
    href: "https://youtube.com",
    label: "Youtube",
  },
  {
    icon: zalo,
    href: "https://zalo.me/562435418985235142",
    label: "Zalo",
  },
  {
    icon: facebook,
    href: "https://www.facebook.com/ieltscheckmate",
    label: "Facebook",
  },
]

export default function Footer() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#fff",
        py: { xs: 4, sm: 6, md: 8 },
        borderTop: "1px solid #EAECF0",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "2.5fr 1fr 1fr" },
            gap: { xs: 4, sm: 6, md: 8 },
          }}
        >
          {/* Logo and Description */}
          <Box sx={{ maxWidth: { xs: "100%", md: "400px" } }}>
            <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
              <img
                src={logo || "/placeholder.svg"}
                alt="logo"
                style={{
                  height: "48px",
                  width: "auto",
                }}
              />
            </Box>
            <Typography
              sx={{
                color: "#667085",
                fontSize: { xs: "12px", sm: "14px" },
                lineHeight: { xs: "20px", sm: "24px" },
              }}
            >
              ELTS Checkmate - Làm chủ kỳ thi, chinh phục band điểm.
              <br />
              Nền tảng học tập tiên tiến với công nghệ độc quyền, kết hợp luyện tập cùng AI đánh giá 24/7, chuẩn hóa mọi kỹ năng, giúp bạn chinh phục điểm số tối đa trong kỳ thi IELTS.
            </Typography>
          </Box>

          {/* Links */}
          <Stack spacing={{ xs: 2, sm: 3 }}>
            {footerLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                style={{
                  textDecoration: "none",
                  color: "#344054",
                  fontSize: isMobile ? "14px" : "16px",
                  fontWeight: 500,
                  lineHeight: isMobile ? "20px" : "24px",
                }}
              >
                {link.title}
              </Link>
            ))}
          </Stack>

          {/* Social Links */}
          <Box>
            <Typography
              sx={{
                color: "#101828",
                fontSize: { xs: "14px", sm: "16px" },
                fontWeight: 600,
                mb: { xs: 2, sm: 3 },
              }}
            >
              Kết nối với chúng tôi
            </Typography>
            <Stack direction="row" spacing={{ xs: 2, sm: 3 }}>
              {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                  <img
                    src={social.icon || "/placeholder.svg"}
                    alt={social.label}
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                  />
                </Link>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Copyright */}
        <Typography
          sx={{
            color: "#667085",
            fontSize: { xs: "12px", sm: "14px" },
            textAlign: "center",
            borderTop: "1px solid #EAECF0",
            mt: { xs: 4, sm: 6, md: 8 },
            pt: { xs: 3, sm: 4 },
          }}
        >
          Bản quyền © 2025 IELTS Checkmate. Tất cả các quyền được bảo lưu
        </Typography>
      </Container>
    </Box>
  )
}

