import React, { ReactNode, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Drawer,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

import SidebarContent from "./SidebarContent";
import DttHeader from "./Header";
import logo from "../images/admin.png";
import {
  Camera,
  CameraAltOutlined,
  CameraAltRounded,
  SpaceBar,
} from "@mui/icons-material";
import DttTableData from "@/components/TableData";
import DttFooter from "./Footer";
import BreadcrumbsComponent from "./BreadcrumbsComponent";
import NotificationBell from "./Notification";
import { CustomBreadcrumbProvider } from "@/contexts/CustomBreadcrumb";
import { useUser } from "@/contexts/UserContext";
import { relative } from "path";
import { apiRemote } from "@/api";
import { useAlert } from "@/contexts/AlertContext";
import { useAvatar } from "@/contexts/AvatarContext";
import Chatbox from "./Chatbox";
import he from 'he';
import { MenuIcon } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}
const size = 160;
function AdminHeader() {
  var { user } = useUser();

  const { avatar, setAvatar } = useAvatar();
  const [loading, setLoading] = useState(false);
  const alert = useAlert();
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    if (user?.avatar_url) {
      setAvatar(user?.avatar_url);
    }
  }, [user, setAvatar]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        flex: 1,
        maxHeight: { xs: "auto", md: size },
        height: { xs: "auto", md: size },
        minHeight: { xs: "auto", md: size },
        backgroundColor: "#f0f7ff",
        margin: { xs: "0.5rem", md: "1rem" },
        padding: { xs: "1rem", md: 0 },
        alignItems: { xs: "center", md: "flex-end" },
        gap: { xs: 2, md: 0 },
      }}
    >
      <Box
        className="relative overflow-hidden rounded-full bg-blue-500"
        sx={{
          width: { xs: "120px", md: "150px" },
          height: { xs: "120px", md: "150px" },
        }}
        m={1}
      >
        <div className="relative">
          <div
            className={`relative w-16 h-16 rounded-full overflow-hidden border-2 border-white ${
              loading ? "opacity-50" : ""
            }`}
            style={{
              position: "relative",
            }}
          >
            <img
              src={avatar}
              alt="logo"
              style={{
                borderRadius: "75px",
                objectFit: "cover",
                width: "150px",
                height: "150px",
              }}
              className="rounded-full"
            />
          </div>
        </div>
      </Box>
      <Typography
        variant="h4"
        sx={{
          color: "#fc6700",
          fontSize: { xs: "1.5rem", md: "2rem" },
          textAlign: { xs: "center", md: "left" },
          mt: { xs: 1, md: "auto" },
        }}
        gutterBottom
      >
        {he.decode(user?.display_name || '')}
      </Typography>
      <Box
        flex={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
          my: { xs: 2, md: 0 },
        }}
      >
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
          color: "#fc6700",
          textAlign: "center",
          fontStyle: "italic",
          mt: { xs: 1, md: "auto" },
        }}
      >
        EDUCATALYST
      </Typography>
    </Box>
  );
}
const LayoutManager = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  const toggleSidebar = () => {
    console.log(123)
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    setSidebarOpen(!isMobile)
  }, [isMobile])
  return (
    <>
      <CustomBreadcrumbProvider>
        {/* <Container maxWidth="xl"> */}
        <Box
          sx={{
            backgroundColor: "#f0f7ff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CssBaseline />
          <DttHeader />
          <Box display="flex" minHeight="100vh" flexDirection="column">
            <AdminHeader />
            <Box
              sx={{
                display: "flex",
                flex: 1,
                borderTop: "1px solid #ddd",
                marginTop: "1.5rem",
              }}
            >
              {isMobile ? (
                <Drawer
                  anchor="left"
                  open={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                  sx={{
                    "& .MuiDrawer-paper": {
                      width: "240px",
                      position: "absolute",
                    },
                  }}
                >
                  <Sidebar />
                </Drawer>
              ) : (
                <Sidebar />
              )}
              <Box
                component="main"
                sx={{
                  flex: 1,
                  overflow: "hidden",
                  p: { xs: 1, md: 3 },
                }}
              >
                {isMobile && (
                  <IconButton onClick={toggleSidebar} sx={{ mb: 2 }}>
                    <MenuIcon />
                  </IconButton>
                )}

                <BreadcrumbsComponent />
                <Paper
                  sx={{
                    mb: 2,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    background: "unset",
                    boxShadow: "unset",
                  }}
                >
                  <NotificationBell />
                  <Outlet />
                </Paper>
              </Box>
            </Box>
          </Box>

          <DttFooter />

          <Chatbox />
        </Box>
      </CustomBreadcrumbProvider>
      {/* </Container> */}
    </>
  );
};

export default LayoutManager;
