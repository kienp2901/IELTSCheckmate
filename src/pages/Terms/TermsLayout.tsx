"use client"

import { type ReactNode, useState } from "react"
import { Box, Button, CssBaseline, Drawer, IconButton, Paper, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Outlet } from "react-router"
import BannerTop from "../../assets/banner-top.png"
import BannerBottom from "../../assets/banner-bottom.png"
import BannerRight from "../../assets/banner-right.png"
import BannerAvatar from "../../assets/banner-avatar.png"
import { CustomBreadcrumbProvider } from "@/contexts/CustomBreadcrumb"
import { useUser } from "@/contexts/UserContext"
import { useAlert } from "@/contexts/AlertContext"
import { useAvatar } from "@/contexts/AvatarContext"
import { MenuIcon } from "lucide-react"
import { useDialog } from "@/contexts/DialogContext"
import { useScroll } from "@/contexts/ScrollContext"
import Header from "@/components/Header"
import SidebarContent from "@/components/SidebarContent"
import Footer from "@/components/Footer"
import ChatButtons from "@/components/ChatButtons"

interface LayoutProps {
  children: ReactNode
}

const TermsLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileDrawerOpen(!mobileDrawerOpen)
  }

  const drawerWidth = 280;
  const setDrawerWidth = (width: number) => {
    console.log("New drawer width:", width);
  };

  return (
    <>
      <CustomBreadcrumbProvider>
        <Box
          sx={{
            backgroundColor: "#F9F9F9",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CssBaseline />
          <Header />

          <Box display="flex" flexDirection="column">
            <Box
              sx={{
                display: "flex",
                flex: 1,
                borderTop: "1px solid #ddd",
              }}
            >
              <Box
                component="main"
                sx={{
                  flex: 1,
                  overflow: "hidden",
                }}
              >
                <Paper
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    background: "unset",
                    boxShadow: "unset",
                  }}
                >
                  <Outlet />
                </Paper>
              </Box>
            </Box>
          </Box>

          <Footer />
          <ChatButtons />
        </Box>
      </CustomBreadcrumbProvider>
    </>
  )
}

export default TermsLayout

