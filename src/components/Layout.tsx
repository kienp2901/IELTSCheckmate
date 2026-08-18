"use client"

import { Box, CssBaseline } from "@mui/material"
import { Outlet } from "react-router"

import Header from "./Header"
import Footer from "./Footer"
import ChatButtons from "./ChatButtons"
import { CustomBreadcrumbProvider } from "@/contexts/CustomBreadcrumb"
import HeroBanner from "@/components/landing/HeroBanner"

const Layout = () => {
  return (
    <>
      <CustomBreadcrumbProvider>
        <Box
          className="landing-page"
          sx={{
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CssBaseline />
          <Header />

          <Box display="flex" minHeight="100vh" flexDirection="column">
            <HeroBanner />
            <Box component="main" sx={{ flex: 1, overflow: "hidden" }}>
              <Outlet />
            </Box>
          </Box>

          <Footer />
          <ChatButtons />
        </Box>
      </CustomBreadcrumbProvider>
    </>
  )
}

export default Layout

