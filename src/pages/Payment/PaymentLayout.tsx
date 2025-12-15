"use client"

import { type ReactNode, useState } from "react"
import { Box, CssBaseline, Paper, useMediaQuery, useTheme } from "@mui/material"
import { Outlet } from "react-router"
import { CustomBreadcrumbProvider } from "@/contexts/CustomBreadcrumb"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import ChatButtons from "@/components/ChatButtons"

interface LayoutProps {
  children: ReactNode
}

const PaymentLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <>
      <CustomBreadcrumbProvider>
        <Box
          sx={{
            backgroundColor: "#F9F9F9",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <CssBaseline />
          <Header />

          <Box display="flex" flexDirection="column" flex={1}>
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

export default PaymentLayout

