"use client";

import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import PaymentQRCode from "../../assets/payment-qrcode.jpg";
import { CheckCircle, Warning, Info } from "@mui/icons-material";

export default function PaymentContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [agreedTerms, setAgreedTerms] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "#F5F5F5",
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="xl">
        {/* Tiêu đề */}
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 700,
            fontSize: { xs: "24px", md: "32px" },
          }}
        >
          Thông tin đơn hàng
        </Typography>

        <Grid container spacing={3}>
          {/* Cột trái - Thông tin đơn hàng & Điều khoản */}
          <Grid item xs={12} md={7}>
            {/* Thông tin đơn hàng */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tên gói đăng ký
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    Study Pass - 1 tháng
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Mã đơn hàng
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight={600}>
                    PPNLM8YX
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Giá gốc
                  </Typography>
                  <Typography variant="body1" sx={{ textDecoration: "line-through" }}>
                    299.000 VND
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tổng tiền
                  </Typography>
                  <Typography variant="h5" color="error" fontWeight={700}>
                    199.000 VND
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tình trạng
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body1" color="warning.main">
                      Đang chờ thanh toán ⏳
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Hạn thanh toán
                  </Typography>
                  <Typography variant="body1">10/26/2025, 12:25:16 PM</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Nếu bạn muốn thay đổi - ấn vào
                  </Typography>
                  <Button variant="outlined" color="error" size="small">
                    Hủy đơn hàng
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Lưu ý trước khi thanh toán */}
            <Alert severity="warning" icon={<Warning />} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                ⚠ Lưu ý trước khi thanh toán
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <li>
                  <Typography variant="body2">
                    Hệ thống sẽ thông báo nhận được thanh toán trong vòng 2 phút ngay sau khi giao dịch.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    Sau khi thanh toán trong 20 phút nếu chưa thấy được kích hoạt gói học, vui lòng liên hệ ngay bộ phận hỗ trợ qua zalo và gửi số điện thoại tài khoản + bill chuyển khoản để được kích hoạt ngay.
                  </Typography>
                </li>
              </Box>
            </Alert>

            {/* Điều khoản thanh toán */}
            <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                ✓ Điều khoản thanh toán
              </Typography>
              <Typography variant="body2">
                Xin vui lòng xem kỹ các bài học thử và lộ trình học đã được công bố trước khi quyết định thanh toán. Bọn mình sẽ không hoàn tiền khóa học trong mọi tình huống.
              </Typography>
            </Alert>

            {/* Vì sao */}
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Vì sao
              </Typography>
              <Typography variant="body2" paragraph>
                Bọn mình đã dùng chất xám để chọn lọc, tổng kết và tóm tắt kiến thức một cách dễ hiểu nhất để dung nạp. Sau khi dung nạp vào đầu bạn, những kiến thức này không thể thu hồi lại được.
              </Typography>
              <Typography variant="body2" paragraph>
                Khi nâng cấp gói học cao hơn, bên mình sẽ phụ thu thêm phí nâng cấp tài khoản 150.000/lần + chênh lệch gói. (Thời gian có thể nâng cấp trong 48h kể từ lúc đăng ký)
              </Typography>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Ví dụ
              </Typography>
              <Typography variant="body2" paragraph>
                Bạn đã đăng ký gói Study Pass - 1 tháng (119k), cần nâng gói Master Pass - 1 tháng (299.000).
              </Typography>
              <Typography variant="body2" paragraph>
                Như vậy, bạn cần thanh toán: 180.000 + 150.000 = 330.000 VND
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" paragraph fontStyle="italic">
                - Mong bạn sẽ là một người văn minh, trân trọng quá trình cũng như kiến thức từ khóa học. Xin vui lòng bảo vệ tài nguyên bằng cách giữ lại cho bản thân bạn. Không chia sẻ tài nguyên, ghi hình hoặc bán lại khóa học dưới bất kì hình thức nào. -
              </Typography>
              <Alert severity="warning" sx={{ mt: 2 }}>
                <Typography variant="body2" paragraph sx={{ mb: 1 }}>
                  Bạn chỉ có thể truy cập tối đa hai (02) thiết bị với mỗi tài khoản mua khóa học.
                </Typography>
                <Typography variant="body2">
                  Hệ thống sẽ tự động hạn chế tài khoản nếu phát hiện các hành động bất thường (nhiều thiết bị, sử dụng VPN, lưu ảnh/clip, sử dụng devtool).
                </Typography>
              </Alert>
            </Paper>
          </Grid>

          {/* Cột phải - Phương thức thanh toán */}
          <Grid item xs={12} md={5}>
            {/* Checkbox xác nhận */}
            <Paper sx={{ p: 3, mb: 3, bgcolor: "#FFFBEA" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    sx={{ 
                      color: "#FFA500",
                      alignSelf: "flex-start",
                      mt: 0.5,
                    }}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      🤝 Tôi đã đọc kỹ và đồng ý với điều khoản thanh toán!
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      🎓 Cam kết không ghi hình, lưu trữ, bán lại khóa học dưới mọi hình thức.
                    </Typography>
                    <Typography variant="body2">
                      💡 Cam kết không đòi lại tiền, như thầy cô không đòi lại kiến thức đã truyền đạt.
                    </Typography>
                  </Box>
                }
                sx={{ alignItems: "flex-start" }}
              />
              {!agreedTerms && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block", ml: 4 }}>
                  (Thông tin thanh toán sẽ hiện sau khi xác nhận)
                </Typography>
              )}
            </Paper>

            {/* Chuyển khoản bằng QR */}
            {agreedTerms && (
              <>
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Chuyển khoản bằng QR
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      my: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src={PaymentQRCode}
                      alt="Payment QR Code"
                      sx={{
                        maxWidth: "100%",
                        width: "300px",
                        height: "auto",
                      }}
                    />
                  </Box>
                  <Box component="ol" sx={{ pl: 2 }}>
                    <li>
                      <Typography variant="body2" paragraph>
                        Mở app ngân hàng và quét mã QR (hoặc lưu ảnh mã QR về máy).
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" paragraph>
                        Đảm bảo nội dung chuyển khoản là <strong>PPNLM8YX</strong>.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" paragraph>
                        Thực hiện thanh toán số tiền <strong>199.000</strong>.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        Nếu ảnh bị lỗi, vui lòng chuyển khoản thủ công với thông tin bên dưới.
                      </Typography>
                    </li>
                  </Box>
                </Paper>

                {/* Chuyển khoản thủ công */}
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Chuyển khoản thủ công
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Ngân hàng
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        TECHCOM BANK
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Số tài khoản
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        837155472
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Tên người nhận
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        Công ty TNHH Công nghệ giáo dục MicroGEM
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Số tiền
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="error">
                        199.000 VNĐ
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Nội dung (Mã đơn hàng)
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="primary">
                        PPNLM8YX
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>

                {/* Kênh thanh toán khác */}
                <Alert severity="info" icon={<Info />}>
                  <Typography variant="body2">
                    Nếu bạn cần thanh toán qua các kênh khác (Momo, VNPAY, ...) vui lòng liên hệ bộ phận hỗ trợ của IELTS Checkmate qua zalo để lấy thông tin thanh toán!
                  </Typography>
                </Alert>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

