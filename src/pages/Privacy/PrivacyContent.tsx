"use client";

import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import React from "react";
import BannerTop from "../../assets/banner-top.png";
import BannerBottom from "../../assets/banner-bottom.png";

export default function PrivacyContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(270deg, #002D39 0%, #176969 100.62%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 4, sm: 5, md: 8 },
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
        </Box>

        {/* Content */}
        <Box
          sx={{
            maxWidth: "900px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mb: 2,
              fontSize: { xs: "28px", sm: "32px", md: "36px" },
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            CHÍNH SÁCH BẢO MẬT CỦA IELTS Checkmate
          </Typography>

          <Typography
            sx={{
              mb: 4,
              fontSize: { xs: "14px", md: "16px" },
              textAlign: "center",
              opacity: 0.8,
            }}
          >
            <strong>Cập nhật lần cuối:</strong> 26/10/2025
          </Typography>

          <Typography
            sx={{
              mb: 4,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            IELTS Checkmate cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng. Chính sách này mô tả cách chúng tôi thu thập, sử dụng, bảo mật và chia sẻ thông tin khi bạn sử dụng dịch vụ của chúng tôi.
          </Typography>

          <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

          {/* Section 1 */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 600,
            }}
          >
            1. Các Loại Thông Tin Chúng Tôi Thu Thập
          </Typography>
          <Typography
            sx={{
              mb: 2,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Khi bạn truy cập và sử dụng IELTS Checkmate, chúng tôi thu thập những thông tin sau:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 3 }}>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Thông tin Tài khoản:</strong> Số điện thoại, Email và tên người dùng.
              </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Dữ liệu Học tập:</strong> Tiến độ và kết quả học tập của bạn trên ứng dụng.
              </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Thông tin Kỹ thuật:</strong> Dữ liệu về thiết bị và trình duyệt bạn sử dụng để truy cập dịch vụ.
              </Typography>
            </li>
          </Box>

          {/* Section 2 */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 600,
            }}
          >
            2. Mục Đích Sử Dụng Thông Tin
          </Typography>
          <Typography
            sx={{
              mb: 2,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Chúng tôi sử dụng dữ liệu thu thập được cho các mục đích:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 3 }}>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Vận hành và Cải thiện Dịch vụ:</strong> Cung cấp, duy trì và phát triển các tính năng của IELTS Checkmate.
              </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Cá nhân hóa Trải nghiệm:</strong> Điều chỉnh nội dung và môi trường học tập phù hợp với nhu cầu cá nhân của bạn.
              </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Truyền thông:</strong> Gửi thông báo cần thiết về khóa học, cập nhật dịch vụ và các thông tin liên quan khác.
              </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Phân tích và Hiệu suất:</strong> Đánh giá hiệu suất hệ thống để liên tục tối ưu hóa dịch vụ.
              </Typography>
            </li>
          </Box>

          {/* Section 3 */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 600,
            }}
          >
            3. Bảo Mật Thông Tin Cá Nhân
          </Typography>
          <Typography
            sx={{
              mb: 4,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin của bạn khỏi việc truy cập, sử dụng hoặc tiết lộ trái phép. Tuy nhiên, xin lưu ý rằng không có hệ thống truyền tải dữ liệu nào qua Internet hay phương thức lưu trữ điện tử nào là an toàn tuyệt đối 100%.
          </Typography>

          {/* Section 4 */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 600,
            }}
          >
            4. Chia Sẻ Thông Tin
          </Typography>
          <Typography
            sx={{
              mb: 2,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            IELTS Checkmate <strong>cam kết không bán, trao đổi hoặc chuyển giao thông tin cá nhân</strong> của bạn cho các bên thứ ba vì mục đích thương mại.
          </Typography>
          <Typography
            sx={{
              mb: 4,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Thông tin có thể được chia sẻ với các <strong>bên thứ ba đáng tin cậy</strong> hỗ trợ chúng tôi vận hành trang web và cung cấp dịch vụ, với điều kiện họ đồng ý giữ bí mật thông tin này.
          </Typography>

          {/* Section 5 */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 600,
            }}
          >
            5. Về Cookie
          </Typography>
          <Typography
            sx={{
              mb: 4,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Chúng tôi sử dụng cookie để theo dõi hoạt động và cải thiện trải nghiệm của bạn trên trang web. Bạn có quyền từ chối hoặc quản lý cookie thông qua cài đặt trình duyệt của mình, nhưng việc này có thể làm ảnh hưởng đến chức năng và trải nghiệm của một số phần trong dịch vụ.
          </Typography>

          {/* Section 6 */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 600,
            }}
          >
            6. Thay Đổi Chính Sách Bảo Mật
          </Typography>
          <Typography
            sx={{
              mb: 4,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Chúng tôi có thể cập nhật Chính sách Bảo mật này theo thời gian. Khi có thay đổi quan trọng, chúng tôi sẽ thông báo cho bạn qua email hoặc thông báo rõ ràng trên trang web để bạn có thể xem xét các thay đổi đó.
          </Typography>

          {/* Section 7 */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 600,
            }}
          >
            7. Liên Hệ
          </Typography>
          <Typography
            sx={{
              mb: 2,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào liên quan đến Chính sách Bảo mật này, vui lòng liên hệ với chúng tôi qua:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 3 }}>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Email:</strong> microgem.edtech@gmail.com
              </Typography>
            </li>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

