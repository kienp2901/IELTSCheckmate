"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  List,
  ListItem,
  ListItemText,
  Paper,
  ListItemIcon,
  FormControl,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import React, { ChangeEvent, useState } from "react";
import { useDialog } from "@/contexts/DialogContext";
import BannerTop from "../../assets/banner-top.png";
import BannerBottom from "../../assets/banner-bottom.png";
import BannerRight from "../../assets/banner-right.png";
import BannerAvatar from "../../assets/banner-avatar.png";
import model_check_mate_1 from "../../assets/model_check_mate_1.png";
import Group_3 from "../../assets/Group_3.png";
import { useUser } from "@/contexts/UserContext";
import { useAvatar } from "@/contexts/AvatarContext";
import { useAlert } from "@/contexts/AlertContext";
import { useScroll } from "@/contexts/ScrollContext";

export default function ThankyouForm() {
  var { user } = useUser();

  const { avatar, setAvatar } = useAvatar();
  const [loading, setLoading] = useState(false);
  const alert = useAlert();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { openDialog } = useDialog();
  const { scrollToAIAssistant } = useScroll();

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(270deg, #002D39 0%, #176969 100.62%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        //   py: { xs: 4, sm: 5, md: 8 },
        px: { xs: 2, sm: 3, md: 6 },
        // pt: { xs: 4, sm: 5, md: 20 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
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
          {/* <Box
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
          /> */}
        </Box>

        {/* Content container */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            gap: { xs: 4, md: 0 },
            // backgroundImage: "linear-gradient(270deg, #002D39 0%, #176969 100.62%)"
          }}
        >
          {/* Left content */}
          <Box sx={{ flex: "1", maxWidth: { xs: "100%", md: "17%" } }}>
          </Box>
          <Box sx={{ width: { xs: "100%", md: "43%" } }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                Bước 1
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  opacity: 0.9,
                }}
              >
                Đăng ký học thành công
              </Typography>
            </Box>

            <Box
              sx={{
                mb: 3,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-start", md: "flex-start" },
                justifyContent: "space-between",
                gap: { xs: 1, md: 2 },
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    mb: 0.5,
                  }}
                >
                  Bước 2
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    opacity: 0.9,
                  }}
                >
                  Đăng ký tài khoản học
                </Typography>
              </Box>
              <Button
                variant="contained"
                href="https://ieltscheckmate.edu.vn/signin"
                sx={{
                  backgroundImage: "linear-gradient(90deg, #F25022 -4.76%, #FFBA33 100%)",
                  borderRadius: "100px",
                  textTransform: "none",
                  px: 4,
                  py: 1,
                  fontSize: "16px",
                  boxShadow: "none",
                  whiteSpace: "nowrap",
                  alignSelf: { xs: "flex-start", md: "center" },
                  mt: { xs: 0, md: 0 },
                  "&:hover": {
                    backgroundColor: "#EA580C",
                    boxShadow: "none",
                  },
                }}
              >
                Đăng ký ngay
              </Button>
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                Bước 3
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  opacity: 0.9,
                  lineHeight: 1.5,
                }}
              >
                Để ý điện thoại để nhận tư vấn từ bộ phận tuyển sinh của IELTS Checkmate
              </Typography>
            </Box>
          </Box>
          {/* Right content - Character illustration */}
          <Box
            sx={{
              flex: "1",
              position: "relative",
              pt: { xs: 4, sm: 5, md: 20 },
              display: { xs: "flex", md: "block" },
              textAlign: "end",
              justifyContent: "center",
              mt: { xs: 2, md: 0 },
            }}
          >
            <Box
              component="img"
              src={Group_3}
              alt="IELTS Student"
              sx={{
                maxWidth: { xs: "200px", md: "400px" },
                width: "100%",
                height: "auto",
                position: "absolute",
                bottom: "1%",
                zIndex: 2,
              }}
            />
            <Box
              component="img"
              src={model_check_mate_1}
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
      </Container>
    </Box>
  );
}
