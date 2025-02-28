"use client"

import { type ReactNode, useState } from "react"
import { Box, Button, CssBaseline, Drawer, IconButton, Paper, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Outlet } from "react-router"

import SidebarContent from "./SidebarContent"
import Header from "./Header"
import BannerTop from "../assets/banner-top.png"
import BannerBottom from "../assets/banner-bottom.png"
import BannerRight from "../assets/banner-right.png"
import BannerAvatar from "../assets/banner-avatar.png"
import Footer from "./Footer"
import { CustomBreadcrumbProvider } from "@/contexts/CustomBreadcrumb"
import { useUser } from "@/contexts/UserContext"
import { useAlert } from "@/contexts/AlertContext"
import { useAvatar } from "@/contexts/AvatarContext"
// import he from 'he';
import { MenuIcon } from "lucide-react"
import { useDialog } from "@/contexts/DialogContext"
import { useScroll } from "@/contexts/ScrollContext"

interface LayoutProps {
  children: ReactNode
}
const size = 160
function Banner() {
  var { user } = useUser()

  const { avatar, setAvatar } = useAvatar()
  const [loading, setLoading] = useState(false)
  const alert = useAlert()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const { openDialog } = useDialog()
  const { scrollToAIAssistant } = useScroll()

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(270deg, #002D39 0%, #176969 100.62%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        py: { xs: 4, sm: 5, md: 8 },
        px: { xs: 2, sm: 3, md: 6 },
      }}
    >
      {/* Background grid patterns */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.2,
          pointerEvents: "none",
        }}
      >
        {/* Top grid */}
        <Box
          component="img"
          src={BannerTop}
          alt=""
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
          }}
        />
        {/* Bottom grid */}
        <Box
          component="img"
          src={BannerBottom}
          alt=""
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "auto",
          }}
        />
        {/* Right decoration */}
        <Box
          component="img"
          src={BannerRight}
          alt=""
          sx={{
            position: "absolute",
            right: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "auto",
            height: "80%",
            display: { xs: "none", md: "block" },
            opacity: 0.3,
          }}
        />
      </Box>

      {/* Content container */}
      <Box
        sx={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: { xs: 4, md: 8 },
          position: "relative",
          zIndex: 1,
          // backgroundImage: "linear-gradient(270deg, #002D39 0%, #176969 100.62%)"
        }}
      >
        {/* Left content */}
        <Box sx={{ flex: "1", maxWidth: { xs: "100%", md: "60%" } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: { xs: 1.5, md: 2 },
              fontSize: { xs: "22px", sm: "24px", md: "32px" },
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            Lộ trình Học & Luyện{" "}
            <Box component="span" sx={{ display: "block" }}>
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "28px", sm: "32px", md: "48px" },
                  fontWeight: "bold",
                }}
              >
                IELTS
              </Box>{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, #F25022 -4.76%, #FFBA33 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "28px", sm: "32px", md: "48px" },
                  fontWeight: "bold",
                }}
              >
                toàn diện
              </Box>
            </Box>
          </Typography>

          <Typography
            sx={{
              mb: { xs: 3, md: 4 },
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.6,
              opacity: 0.9,
              maxWidth: "600px",
            }}
          >
            Không còn những giờ học nặng nề, khó hiểu, với <strong>IELTS Checkmate</strong>, bạn được học đúng trình độ
            và mục tiêu. Đảm bảo học tới đâu, hiểu tới đó - Hiểu sâu nhớ lâu, vận dụng nhuần nhuyễn, ứng dụng dễ dàng.
            Học là đạt band!
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 1.5, md: 2 },
              flexWrap: "wrap",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" }, // Giữ kiểu responsive
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundImage: "linear-gradient(90deg, #F25022 -4.76%, #FFBA33 100%)",
                bgcolor: "#FF6B00",
                color: "white",
                px: 3,
                py: { xs: 1.25, md: 1.5 },
                borderRadius: "999px",
                textTransform: "none",
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  bgcolor: "#FF8533",
                },
              }}
              onClick={scrollToAIAssistant}
            >
              Thiết kế lộ trình học
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundImage: "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 100%)",
                color: "white",
                px: 3,
                py: { xs: 1.25, md: 1.5 },
                borderRadius: "999px",
                textTransform: "none",
                fontSize: { xs: "14px", md: "16px" },
                fontWeight: 500,
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  bgcolor: "#059669",
                },
              }}
              onClick={openDialog}
            >
              Nhận tư vấn
            </Button>
          </Box>
        </Box>

        {/* Right content - Character illustration */}
        <Box
          sx={{
            flex: "1",
            position: "relative",
            display: { xs: "flex", md: "block" },
            textAlign: "center",
            justifyContent: "center",
            mt: { xs: 2, md: 0 },
          }}
        >
          <Box
            component="img"
            src={BannerAvatar}
            alt="IELTS Student"
            sx={{
              maxWidth: { xs: "200px", md: "400px" },
              width: "100%",
              height: "auto",
              position: "relative",
              zIndex: 2,
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
const Layout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  // Only keep mobile drawer, remove desktop sidebar completely
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

          

          {/* Mobile drawer - available on all screen sizes */}
          <Drawer
            anchor="left"
            open={mobileDrawerOpen}
            onClose={() => setMobileDrawerOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 280,
              },
            }}
          >
            <SidebarContent drawerWidth={drawerWidth} setDrawerWidth={setDrawerWidth} />
          </Drawer>

          <Box display="flex" minHeight="100vh" flexDirection="column">
            <Banner />
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
        </Box>
      </CustomBreadcrumbProvider>
    </>
  )
}

export default Layout

