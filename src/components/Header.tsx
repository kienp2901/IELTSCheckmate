"use client"

import {
  AppBar,
  Toolbar,
  Button,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  IconButton,
} from "@mui/material"
import { MenuIcon, DoorClosedIcon as CloseIcon } from "lucide-react"
import { useState } from "react"
import type { ReactNode } from "react"
import { useNavigate } from "react-router"
import logo from "../assets/logo.png"

const HeaderBtn = ({
  children,
  href,
  isActive = false,
  onClick,
}: {
  children: ReactNode
  href: string
  isActive?: boolean
  onClick?: () => void
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (href.startsWith("http")) {
      window.location.href = href
    } else if (href === "/") {
      window.location.href = "/"
    } else {
      navigate(href)
    }
    if (onClick) onClick()
  }

  return (
    <Button
      color="inherit"
      sx={{
        fontSize: "14px",
        textTransform: "none",
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
        fontStyle: "normal",
        lineHeight: "20px",
        color: isActive ? "#0EA882" : "#000",
        fontWeight: 500,
        padding: "8px 16px",
        backgroundColor: isActive ? "#FFFFFF" : "transparent",
        borderRadius: isActive ? "24px" : "6px",
        boxShadow: isActive ? "0px 1px 3px 0px #525D6633" : "unset",
        minWidth: "unset",
        "&:hover": {
          color: "#10B981",
        },
      }}
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}

export default function Header() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"))
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const menuItems = [
    { label: "Trang chủ", href: "/", isActive: true },
    { label: "Lộ trình", href: "/lo-trinh" },
    { label: "Liên hệ tư vấn", href: "/lien-he" },
  ]

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Toolbar
        sx={{
          height: "64px",
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          // padding: {
          //   xs: "0 16px",
          //   sm: "0 24px",
          // },
          padding: {
            xs: "0 0",
            sm: "0 0",
          },
          display: "flex",
          justifyContent: "space-between",
          gap: "32px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <img
            src={logo || "/placeholder.svg"}
            alt="logo"
            style={{
              height: "32px",
              width: "auto",
              marginRight: "16px",
            }}
          />

          {!isMobile && (
            <Box sx={{ display: "flex", gap: "8px" }}>
              {menuItems.map((item) => (
                <HeaderBtn key={item.label} href={item.href} isActive={item.isActive}>
                  {item.label}
                </HeaderBtn>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {isMobile ? (
          <>
            <IconButton
              onClick={handleMobileMenuToggle}
              sx={{
                color: "#374151",
                padding: "8px",
              }}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>

            <Drawer
              anchor="right"
              open={mobileMenuOpen}
              onClose={handleMobileMenuToggle}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "280px",
                  pt: 2,
                  px: 2,
                },
              }}
            >
              <List>
                {menuItems.map((item) => (
                  <ListItem key={item.label} sx={{ padding: "4px 0" }}>
                    <HeaderBtn href={item.href} onClick={() => setMobileMenuOpen(false)} isActive={item.isActive}>
                      {item.label}
                    </HeaderBtn>
                  </ListItem>
                ))}
                <ListItem sx={{ padding: "4px 0", mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    href="/login"
                    sx={{
                      textTransform: "none",
                      borderRadius: "6px",
                      backgroundColor: "#10B981",
                      "&:hover": {
                        backgroundColor: "#059669",
                      },
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "20px",
                      color: "white",
                      padding: "8px 16px",
                    }}
                  >
                    Đăng nhập
                  </Button>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Button
            variant="contained"
            href="/login"
            sx={{
              textTransform: "none",
              borderRadius: "25px",
              backgroundImage: "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 100%)",
              "&:hover": {
                backgroundImage: "linear-gradient(90deg, #0C8C87 -5.95%, #57C0AD 100%)",
              },
              fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "20px",
              color: "white",
              padding: "8px 16px",
              minWidth: "120px",
            }}
          >
            Đăng nhập
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

