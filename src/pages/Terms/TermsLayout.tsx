"use client"

import { Box, CssBaseline } from "@mui/material"
import { Outlet } from "react-router"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ChatButtons from "@/components/ChatButtons"
import { CustomBreadcrumbProvider } from "@/contexts/CustomBreadcrumb"

const TermsLayout = () => {
  return (
    <CustomBreadcrumbProvider>
      <Box
        className="landing-page"
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Header />
        <Box component="main" sx={{ flex: 1 }}>
          <Outlet />
        </Box>
        <Footer />
        <ChatButtons />
      </Box>
    </CustomBreadcrumbProvider>
  )
}

export default TermsLayout
