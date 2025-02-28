"use client";

import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  List,
  ListItem,
  ListItemText,
  Avatar,
  LinearProgress,
  ListItemAvatar,
} from "@mui/material";
import {
  Star,
  Users,
  Brain,
  PlayCircle,
  Download,
  ThumbsUp,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import IELTSExperienceSection from "./components/IELTSExperienceSection";
import IELTSLearningVideos from "./components/IELTSLearningVideos";
import IELTSCheckmateIntro from "./components/IELTSCheckmateIntro";
import HowToLearnIELTS from "./components/HowToLearnIELTS";
import CheckmateTestimonials from "./components/CheckmateTestimonials";
import { useScroll } from "@/contexts/ScrollContext";

export default function LandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { aiAssistantRef } = useScroll();

  return (
    <Box>
      {/* IELTSExperienceSection */}
      <IELTSExperienceSection/>

      {/* Upcoming Workshops */}
      <IELTSLearningVideos/>

      {/* IELTSCheckmateIntro */}
      <IELTSCheckmateIntro/>

      <Box ref={aiAssistantRef} sx={{ p: 4, bgcolor: "#f9f9f9" }}>
        <HowToLearnIELTS/>
      </Box>
      

      <CheckmateTestimonials/>

    </Box>
  );
}
