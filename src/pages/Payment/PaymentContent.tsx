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
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { CheckCircle, Warning, Info, Error as ErrorIcon } from "@mui/icons-material";
import { useSearchParams, useNavigate } from "react-router";
import { paymentApi, type ITransactionData, type IPaymentDetails, type TransactionStatus } from "@/api/payment-api";

export default function PaymentContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [transactionData, setTransactionData] = useState<ITransactionData | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<IPaymentDetails | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  
  const transactionId = searchParams.get('transactionId');

  // Fetch transaction info and payment details
  useEffect(() => {
    const fetchData = async () => {
      if (!transactionId) {
        setError('Không tìm thấy mã giao dịch');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Get transaction info
        const transactionResponse = await paymentApi.transaction.getInfo(transactionId);
        
        if (transactionResponse.code === 200 && transactionResponse.data) {
          setTransactionData(transactionResponse.data);
          
          // Get payment details
          const paymentResponse = await paymentApi.transaction.getPaymentDetails(transactionId);
          
          if (paymentResponse.code === 200 && paymentResponse.data) {
            setPaymentDetails(paymentResponse.data);
          }
        } else {
          setError('Không thể tải thông tin giao dịch');
        }
      } catch (err: any) {
        console.error('Error fetching payment data:', err);
        setError(err.message || 'Không thể tải thông tin thanh toán');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [transactionId]);

  // Poll transaction status every 5 seconds
  useEffect(() => {
    if (!transactionId || !transactionData) return;

    // Only poll if status is pending
    if (transactionData.status !== 'pending') {
      return;
    }

    const pollInterval = setInterval(async () => {
      try {
        console.log('🔄 Polling transaction status...');
        const response = await paymentApi.transaction.getInfo(transactionId);
        
        if (response.code === 200 && response.data) {
          setTransactionData(response.data);
          
          // Stop polling if status changed
          if (response.data.status !== 'pending') {
            console.log('✅ Transaction status changed:', response.data.status);
            clearInterval(pollInterval);
          }
        }
      } catch (err) {
        console.error('Error polling transaction:', err);
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(pollInterval);
  }, [transactionId, transactionData]);

  // Open cancel dialog
  const handleOpenCancelDialog = () => {
    setCancelDialogOpen(true);
  };

  // Close cancel dialog
  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
  };

  // Confirm cancel transaction
  const handleConfirmCancel = async () => {
    if (!transactionId || !transactionData) return;

    setIsCancelling(true);
    
    try {
      const response = await paymentApi.transaction.cancel(transactionId);
      
      if (response.code === 200) {
        // Close dialog
        setCancelDialogOpen(false);
        
        // Refresh transaction data
        const updatedResponse = await paymentApi.transaction.getInfo(transactionId);
        if (updatedResponse.data) {
          setTransactionData(updatedResponse.data);
        }
      }
    } catch (err: any) {
      console.error('Error cancelling transaction:', err);
      alert(err.message || 'Không thể hủy đơn hàng');
    } finally {
      setIsCancelling(false);
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Get status label and color
  const getStatusInfo = (status: TransactionStatus) => {
    const statusMap: Record<TransactionStatus, { label: string; color: 'warning' | 'success' | 'error' | 'info' | 'default' }> = {
      pending: { label: 'Đang chờ thanh toán ⏳', color: 'warning' },
      success: { label: 'Thanh toán thành công ✅', color: 'success' },
      failed: { label: 'Thanh toán thất bại ❌', color: 'error' },
      refunded: { label: 'Đã hoàn tiền 💰', color: 'info' },
      expired: { label: 'Hết hạn thanh toán ⏰', color: 'error' },
      cancelled: { label: 'Đã hủy thanh toán 🚫', color: 'default' },
    };
    return statusMap[status] || { label: status, color: 'default' };
  };

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

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : !transactionData ? (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Không tìm thấy thông tin giao dịch
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {/* Success Alert */}
            {transactionData.status === 'success' && (
              <Grid item xs={12}>
                <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 2 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    🎉 Thanh toán thành công!
                  </Typography>
                  <Typography variant="body2">
                    Cảm ơn bạn đã thanh toán. Gói học của bạn đã được kích hoạt. Vui lòng vào học để bắt đầu!
                  </Typography>
                </Alert>
              </Grid>
            )}

            {/* Cancelled/Expired Alert */}
            {(transactionData.status === 'cancelled' || transactionData.status === 'expired') && (
              <Grid item xs={12}>
                <Alert severity="error" icon={<ErrorIcon />} sx={{ mb: 2 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {transactionData.status === 'cancelled' ? 'Đơn hàng đã bị hủy' : 'Đơn hàng đã hết hạn'}
                  </Typography>
                  <Typography variant="body2">
                    Vui lòng tạo đơn hàng mới nếu bạn vẫn muốn đăng ký gói học.
                  </Typography>
                </Alert>
              </Grid>
            )}

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
                      {transactionData.items[0]?.name || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Mã đơn hàng
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight={600}>
                      {transactionData.transactionId}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Giá gốc
                    </Typography>
                    <Typography variant="body1" sx={{ textDecoration: transactionData.discountAmount > 0 ? "line-through" : "none" }}>
                      {formatPrice(transactionData.totalAmount + transactionData.discountAmount)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Tổng tiền
                    </Typography>
                    <Typography variant="h5" color="error" fontWeight={700}>
                      {formatPrice(transactionData.totalAmount)}
                    </Typography>
                  </Grid>
                  {transactionData.discountAmount > 0 && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Giảm giá
                      </Typography>
                      <Typography variant="body1" color="success.main" fontWeight={600}>
                        -{formatPrice(transactionData.discountAmount)}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Tình trạng
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip 
                        label={getStatusInfo(transactionData.status).label}
                        color={getStatusInfo(transactionData.status).color}
                        size="small"
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Hạn thanh toán
                    </Typography>
                    <Typography variant="body1">{formatDate(transactionData.expiredAt)}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Thời gian tạo
                    </Typography>
                    <Typography variant="body1">{formatDate(transactionData.createdAt)}</Typography>
                  </Grid>
                  {transactionData.status === 'pending' && (
                    <Grid item xs={12}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Nếu bạn muốn thay đổi - ấn vào
                      </Typography>
                      <Button 
                        variant="outlined" 
                        color="error" 
                        size="small"
                        onClick={handleOpenCancelDialog}
                      >
                        Hủy đơn hàng
                      </Button>
                    </Grid>
                  )}
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
            {agreedTerms && paymentDetails && (
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
                      src={paymentDetails.qrUrl}
                      alt="Payment QR Code"
                      sx={{
                        maxWidth: "100%",
                        width: "300px",
                        height: "auto",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        p: 1,
                      }}
                      onError={(e: any) => {
                        e.target.style.display = 'none';
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
                        Đảm bảo nội dung chuyển khoản là <strong>{paymentDetails.description}</strong>.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2" paragraph>
                        Thực hiện thanh toán số tiền <strong>{formatPrice(paymentDetails.amount)}</strong>.
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
                        {paymentDetails.config.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Số tài khoản
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {paymentDetails.config.accountNumber}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Tên người nhận
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {paymentDetails.config.accountName}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Số tiền
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="error">
                        {formatPrice(paymentDetails.amount)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Nội dung (Mã đơn hàng)
                      </Typography>
                      <Typography variant="body2" fontWeight={600} color="primary">
                        {paymentDetails.description}
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
            {agreedTerms && !paymentDetails && (
              <Alert severity="info" icon={<Info />}>
                <Typography variant="body2">
                  Đang tải thông tin thanh toán...
                </Typography>
              </Alert>
            )}
          </Grid>
        </Grid>
        )}
      </Container>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={cancelDialogOpen}
        onClose={handleCloseCancelDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            p: 1,
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: '#FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ErrorIcon sx={{ color: '#DC2626', fontSize: 28 }} />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              Xác nhận hủy đơn hàng
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <DialogContentText sx={{ color: '#374151', fontSize: '15px', lineHeight: 1.6 }}>
            Bạn có chắc chắn muốn hủy đơn hàng{' '}
            <Typography component="span" fontWeight={600} color="primary">
              {transactionData?.transactionId}
            </Typography>
            {' '}không?
          </DialogContentText>
          
          {transactionData && (
            <Box sx={{ mt: 2, p: 2, bgcolor: '#FFF9F0', borderRadius: 2, border: '1px solid #FEE2E2' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Thông tin đơn hàng:
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {transactionData.items[0]?.name}
              </Typography>
              <Typography variant="body2" color="error" fontWeight={600}>
                {formatPrice(transactionData.totalAmount)}
              </Typography>
            </Box>
          )}
          
          <Alert severity="warning" sx={{ mt: 2 }} icon={<Warning />}>
            <Typography variant="body2">
              ⚠️ Sau khi hủy, bạn sẽ cần tạo đơn hàng mới nếu muốn đăng ký gói học này.
            </Typography>
          </Alert>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button
            onClick={handleCloseCancelDialog}
            variant="outlined"
            sx={{
              borderRadius: '25px',
              textTransform: 'none',
              px: 3,
              borderColor: '#D1D5DB',
              color: '#6B7280',
              '&:hover': {
                borderColor: '#9CA3AF',
                backgroundColor: '#F9FAFB',
              }
            }}
          >
            Không, giữ lại
          </Button>
          <Button
            onClick={handleConfirmCancel}
            variant="contained"
            disabled={isCancelling}
            sx={{
              borderRadius: '25px',
              textTransform: 'none',
              px: 3,
              backgroundColor: '#DC2626',
              '&:hover': {
                backgroundColor: '#B91C1C',
              },
              '&:disabled': {
                backgroundColor: '#FCA5A5',
              }
            }}
          >
            {isCancelling ? 'Đang hủy...' : 'Có, hủy đơn hàng'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

