"use client"

import { Box, Container, Typography, Card, Link, IconButton, useTheme, useMediaQuery } from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { useSwipeable } from "react-swipeable"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import { FadeUp } from "./motion"
import MsLienImage from "../../assets/Ms-Lien.jpg"
import MrBachImage from "../../assets/Mr-Bach.jpg"
import MsThaoImage from "../../assets/Ms-Thao.jpg"
import MrDuyAnhImage from "../../assets/Mr-DuyAnh1.jpg"

const councilMembers = [
  {
    name: "Cô Phạm Ngọc Liên",
    image: MsLienImage,
    sections: [
      {
        title: "🎓 Học thuật",
        items: [
          "👩‍🎓 Thủ khoa đầu vào ngành Ngôn ngữ Anh – ULIS; tốt nghiệp loại Giỏi",
          "👩‍🎓 Thạc sĩ Ngôn ngữ Anh – Trường Đại học Ngoại ngữ, ĐHQGHN",
        ],
      },
      {
        title: "💼 Kinh nghiệm & Vai trò",
        items: [
          "⭐ Cựu giảng viên Khoa Tiếng Anh – Đại học Mở Hà Nội",
          "⭐ Phiên dịch viên cho các hội thảo của Chính phủ, NGOs và tập đoàn quốc tế (Google, FPT, …)",
          "⭐ 10 năm kinh nghiệm giảng dạy IELTS",
          "⭐ IELTS 8.5",
        ],
      },
    ],
  },
  {
    name: "Thầy Phan Tất Bách",
    image: MrBachImage,
    sections: [
      {
        title: "🎓 Học thuật & Nghiên cứu",
        items: [
          "👩‍🎓 Nghiên cứu sinh Tiến sĩ Ngôn ngữ học Tính toán – Đại học Leuven (Học bổng Marie Skłodowska-Curie của EU)",
          "👩‍🎓 Thủ khoa đầu ra Thạc sĩ Ngôn ngữ học – Đại học Stirling",
        ],
      },
      {
        title: "💼 Kinh nghiệm & Vai trò",
        items: ["⭐ 7 năm kinh nghiệm giảng dạy IELTS", "⭐ IELTS 8.5"],
      },
    ],
  },
  {
    name: "Cô Vũ Phương Thảo",
    image: MsThaoImage,
    sections: [
      {
        title: "🎓 Học thuật",
        items: [
          "👩‍🎓 Cử nhân Sư phạm Anh – Đại học Sư phạm Hà Nội",
          "👩‍🎓 Học bổng toàn phần chương trình trao đổi – Đại học Sư phạm Aichi",
          "👩‍🎓 Đang theo học Thạc sĩ Applied Data Science – University of Michigan",
        ],
      },
      {
        title: "💼 Kinh nghiệm & Vai trò",
        items: [
          "⭐ EdTech Innovator – VinUniversity",
          "⭐ 5 năm kinh nghiệm Quản lý Chất lượng học tập & Sản phẩm – Galaxy Education",
          "⭐ 7+ năm làm việc trong lĩnh vực EdTech",
          "⭐ IELTS 8.5",
        ],
      },
    ],
    profileLink: "https://www.linkedin.com/in/phuongthaovu1005/",
  },
  {
    name: "Thầy Nguyễn Duy Anh",
    image: MrDuyAnhImage,
    sections: [
      {
        title: "🎓 Học thuật",
        items: [
          "👩‍🎓 Cử nhân Học viện báo chí và tuyên truyền - Khoa Quan Hệ Quốc Tế",
          "👩‍🎓 Chứng chỉ giảng dạy TESOL",
        ],
      },
      {
        title: "💼 Kinh nghiệm & Vai trò",
        items: [
          "⭐ Giám đốc học thuật IELTS Checkmate",
          "⭐ 4 năm kinh nghiệm giảng dạy IELTS tại các trung tâm lớn. Đã hỗ trợ 100+ học sinh đạt band 6.5+ IELTS",
          "⭐ 5 năm kinh nghiệm Quản lý Chất lượng học tập & Sản phẩm – Galaxy Education",
          "⭐ IELTS 8.0",
        ],
      },
    ],
  },
]

export default function TeachersSection() {
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"))
  const itemsPerPage = isMdUp ? 2 : 1
  const slideCount =
    isMdUp && councilMembers.length > itemsPerPage
      ? councilMembers.length - itemsPerPage + 1
      : Math.ceil(councilMembers.length / itemsPerPage)
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSlideChange((activeSlide + 1) % slideCount),
    onSwipedRight: () => handleSlideChange((activeSlide - 1 + slideCount) % slideCount),
  })

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setDirection(1)
      setActiveSlide((prev) => (prev + 1) % slideCount)
    }, 3500)
    return () => clearInterval(timer)
  }, [slideCount, isPaused])

  const handleSlideChange = (index: number) => {
    setDirection(index > activeSlide ? 1 : -1)
    setActiveSlide(index)
  }

  const visibleMembers = useMemo(() => {
    const start =
      isMdUp && councilMembers.length > itemsPerPage ? activeSlide : activeSlide * itemsPerPage
    return councilMembers.slice(start, start + itemsPerPage)
  }, [activeSlide, itemsPerPage, isMdUp])

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.35 } },
    exit: (dir: number) => ({ x: dir < 0 ? 100 : -100, opacity: 0, transition: { duration: 0.25 } }),
  }

  return (
    <section className="section section-mint" id="teachers">
      <div className="container">
        <FadeUp>
          <div className="section-head">
            <div className="kicker">Teacher-led</div>
            <h2>
              Công nghệ giúp giáo viên
              <br />
              nhìn thấy nhiều hơn.
            </h2>
            <p>
              Đội ngũ giảng viên là người chịu trách nhiệm đọc dữ liệu, điều chỉnh ưu tiên và dẫn học viên tới band
              tiếp theo.
            </p>
          </div>
        </FadeUp>
      </div>

      {/* Slide area uses wider MUI Container to match original AcademicCouncil */}
      <Container maxWidth="xl">
        <Box
          {...handlers}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          sx={{ position: "relative" }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <Box
              key={activeSlide}
              component={motion.div}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: { xs: 3, md: 4 },
                alignItems: "stretch",
              }}
            >
              {visibleMembers.map((member, index) => (
                <Card
                  key={member.name + index}
                  component={motion.div}
                  whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
                  sx={{
                    height: { xs: "auto", md: "500px" },
                    minHeight: { xs: "auto", md: "500px" },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    bgcolor: "#FFFFFF",
                    borderRadius: "12px",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    border: "1px solid #E5E7EB",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      flex: { xs: "1", md: "0 0 55%" },
                      p: { xs: 2, md: 3 },
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "20px", md: "22px" },
                        color: "#111827",
                        mb: 1,
                        lineHeight: 1.3,
                      }}
                    >
                      {member.name}
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                      {member.sections?.map((section, sectionIdx) => (
                        <Box key={sectionIdx} sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              color: "#0F172A",
                              fontSize: { xs: "14px", md: "15px" },
                              letterSpacing: 0.2,
                            }}
                          >
                            {section.title}
                          </Typography>
                          <Box
                            component="ul"
                            sx={{
                              m: 0,
                              pl: 2.5,
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.75,
                              color: "#4B5563",
                              fontSize: { xs: "13px", md: "14px" },
                              lineHeight: 1.7,
                            }}
                          >
                            {section.items.map((item, itemIdx) => (
                              <Box component="li" key={itemIdx}>
                                {item}
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      ))}

                      {member.profileLink && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                          <LinkedInIcon sx={{ fontSize: { xs: "18px", md: "20px" }, color: "#0077B5" }} />
                          <Link
                            href={member.profileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            sx={{
                              fontSize: { xs: "13px", md: "14px" },
                              color: "#2563EB",
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            LinkedIn Profile
                          </Link>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      position: "relative",
                      flex: { xs: "0 0 auto", md: "0 0 45%" },
                      height: { xs: "360px", md: "100%" },
                      minHeight: { md: 360 },
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      component="img"
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: { xs: "center center", md: "center 15%" },
                        display: "block",
                        filter: "brightness(0.95)",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: {
                          xs: "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 100%)",
                          md: "linear-gradient(to right, rgba(0,0,0,0.1) 0%, transparent 20%)",
                        },
                      }}
                    />
                  </Box>
                </Card>
              ))}
            </Box>
          </AnimatePresence>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1.5,
              mt: { xs: 3, md: 4 },
            }}
          >
            <IconButton
              onClick={() => handleSlideChange((activeSlide - 1 + slideCount) % slideCount)}
              disabled={activeSlide === 0}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#E5E7EB",
                color: "#6B7280",
                "&:hover": { bgcolor: "#D1D5DB" },
                "&:disabled": { bgcolor: "#F3F4F6", color: "#D1D5DB" },
              }}
            >
              <ChevronLeft />
            </IconButton>

            <Box sx={{ display: "flex", gap: 1 }}>
              {Array.from({ length: slideCount }).map((_, idx) => (
                <Box
                  key={idx}
                  onClick={() => handleSlideChange(idx)}
                  sx={{
                    width: idx === activeSlide ? 22 : 8,
                    height: 8,
                    borderRadius: idx === activeSlide ? 4 : "50%",
                    bgcolor: idx === activeSlide ? "#0E9F97" : "#D9D9D9",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </Box>

            <IconButton
              onClick={() => handleSlideChange((activeSlide + 1) % slideCount)}
              disabled={activeSlide === slideCount - 1}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#E5E7EB",
                color: "#6B7280",
                "&:hover": { bgcolor: "#D1D5DB" },
                "&:disabled": { bgcolor: "#F3F4F6", color: "#D1D5DB" },
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </section>
  )
}
