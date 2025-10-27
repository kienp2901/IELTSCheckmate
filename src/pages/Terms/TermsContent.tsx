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

export default function TermsContent() {
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
            ĐIỀU KHOẢN SỬ DỤNG DỊCH VỤ IELTS Checkmate
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
            Chào mừng bạn đến với IELTS Checkmate. Các Điều khoản Sử dụng này (sau đây gọi là "Điều khoản") quy định việc truy cập và sử dụng dịch vụ của IELTS Checkmate. Vui lòng đọc kỹ trước khi sử dụng.
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
            1. Chấp Thuận Điều Khoản Chung
          </Typography>
          <Typography
            sx={{
              mb: 4,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Việc bạn truy cập, đăng ký hoặc sử dụng dịch vụ IELTS Checkmate đồng nghĩa với việc bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi toàn bộ các Điều khoản này. <strong>Nếu bạn không đồng ý với bất kỳ điều khoản nào, bạn không được phép sử dụng dịch vụ của chúng tôi.</strong>
          </Typography>

          {/* Section 2 */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 600,
            }}
          >
            2. Quy Định Về Tài Khoản Người Dùng
          </Typography>
          <Typography
            sx={{
              mb: 2,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Khi tạo và duy trì tài khoản trên IELTS Checkmate, bạn cam kết:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 3 }}>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                Cung cấp thông tin cá nhân và tài khoản <strong>chính xác, đầy đủ và cập nhật</strong>.
              </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Bảo mật thông tin đăng nhập</strong> của mình (tên người dùng và mật khẩu).
              </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Chịu hoàn toàn trách nhiệm</strong> về mọi hành vi và hoạt động diễn ra dưới tài khoản của mình.
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
            3. Quyền Sở Hữu Trí Tuệ (IP)
          </Typography>
          <Typography
            sx={{
              mb: 2,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Tất cả nội dung có trên IELTS Checkmate, bao gồm (nhưng không giới hạn): văn bản, đồ họa, giao diện, hình ảnh, âm thanh, video, phần mềm, thiết kế và các tài liệu khác, đều thuộc <strong>quyền sở hữu độc quyền</strong> của IELTS Checkmate hoặc bên cấp phép hợp pháp.
          </Typography>
          <Typography
            sx={{
              mb: 4,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Bạn không được phép sao chép, tái bản, phân phối, sửa đổi, chuyển nhượng, tạo ra các sản phẩm phái sinh hoặc sử dụng nội dung này cho mục đích thương mại mà không có sự <strong>cho phép bằng văn bản</strong> của chúng tôi.
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
            4. Quy Tắc Sử Dụng Dịch Vụ
          </Typography>
          <Typography
            sx={{
              mb: 2,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Bạn đồng ý sử dụng dịch vụ IELTS Checkmate một cách hợp pháp và có trách nhiệm. Bạn cam kết không thực hiện các hành vi sau:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 3 }}>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                Sử dụng dịch vụ cho bất kỳ mục đích nào <strong>vi phạm pháp luật</strong> hiện hành.
              </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Xâm phạm quyền sở hữu trí tuệ</strong> của IELTS Checkmate hoặc bất kỳ bên thứ ba nào.
              </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Gây rối, phá hoại</strong> hoặc làm gián đoạn hoạt động bình thường của dịch vụ, máy chủ, hoặc mạng lưới kết nối.
              </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                Thực hiện việc thu thập hoặc khai thác thông tin người dùng khác mà <strong>không được sự cho phép</strong>.
              </Typography>
            </li>
          </Box>

          {/* Section 5 */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 600,
            }}
          >
            5. Thanh Toán và Chính Sách Hoàn Tiền (Đối Với Dịch Vụ Trả Phí)
          </Typography>
          <Typography
            sx={{
              mb: 2,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Đối với các dịch vụ yêu cầu thanh toán:
          </Typography>
          <Box component="ul" sx={{ mb: 4, pl: 3 }}>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                <strong>Giá cả và phương thức thanh toán</strong> sẽ được công bố rõ ràng tại thời điểm mua dịch vụ.
              </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                Chúng tôi có quyền <strong>thay đổi giá dịch vụ</strong> và sẽ thông báo trước cho người dùng.
              </Typography>
            </li>
            <li>
              <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, lineHeight: 1.8 }}>
                Chính sách <strong>hoàn tiền</strong> sẽ được áp dụng theo các quy định và điều kiện cụ thể được công bố cho từng gói dịch vụ.
              </Typography>
            </li>
          </Box>

          {/* Section 6 */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 600,
            }}
          >
            6. Giới Hạn Trách Nhiệm Pháp Lý
          </Typography>
          <Typography
            sx={{
              mb: 4,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            IELTS Checkmate và các bên liên quan sẽ <strong>không chịu trách nhiệm</strong> pháp lý đối với bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên hoặc hậu quả nào phát sinh từ việc bạn sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.
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
            7. Thay Đổi và Sửa Đổi Điều Khoản
          </Typography>
          <Typography
            sx={{
              mb: 2,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Chúng tôi có quyền sửa đổi hoặc cập nhật các Điều khoản này bất cứ lúc nào mà không cần thông báo trước. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên trang web.
          </Typography>
          <Typography
            sx={{
              mb: 4,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Việc bạn <strong>tiếp tục sử dụng</strong> dịch vụ IELTS Checkmate sau khi các thay đổi được đăng tải đồng nghĩa với việc bạn đã chấp nhận và đồng ý với các Điều khoản mới được sửa đổi.
          </Typography>

          {/* Section 8 */}
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: { xs: "20px", md: "24px" },
              fontWeight: 600,
            }}
          >
            8. Thông Tin Liên Hệ
          </Typography>
          <Typography
            sx={{
              mb: 2,
              fontSize: { xs: "14px", md: "16px" },
              lineHeight: 1.8,
            }}
          >
            Nếu bạn có bất kỳ câu hỏi nào liên quan đến các Điều khoản Sử dụng này, vui lòng liên hệ với chúng tôi qua:
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

