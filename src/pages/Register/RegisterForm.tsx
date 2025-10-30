"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  MenuItem,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate, useSearchParams } from "react-router";
import { useDialog } from "@/contexts/DialogContext";
import { useAuth } from "@/contexts/AuthContext";
import { portalApi, type IPackageData, type IDiscountCheckData } from "@/api/portal-api";

// Custom styled components
const OrderPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  height: "100%",
  border: "1px solid #E5E7EB",
  boxShadow: "none",
}));

const PromotionBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFF9F0",
  borderRadius: 12,
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const CourseItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: "#fff",
  borderRadius: 12,
  border: "1px solid #E5E7EB",
}));

const PriceText = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  padding: theme.spacing(1.5, 4),
  textTransform: "none",
}));

export default function RegisterForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const { user } = useAuth();

  const [packageData, setPackageData] = useState<IPackageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  
  // Discount code states
  const [discountCode, setDiscountCode] = useState("");
  const [discountData, setDiscountData] = useState<IDiscountCheckData | null>(null);
  const [isCheckingDiscount, setIsCheckingDiscount] = useState(false);
  const [discountError, setDiscountError] = useState("");
  
  // Payment states
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    timeSlot: "9h-11h",
    discountRate: "40%",
    agreeTerms: false,
    receiveUpdates: false,
  });

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });

  // Fetch package data when component mounts
  useEffect(() => {
    const fetchPackageData = async () => {
      const idPackage = searchParams.get('idPackage');
      
      if (!idPackage) {
        setError('Không tìm thấy gói. Vui lòng chọn gói từ trang chủ.');
        setLoading(false);
        return;
      }

      if (!user?.token) {
        setError('Vui lòng đăng nhập để tiếp tục.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await portalApi.package.getById(idPackage, user.token);
        
        if (response.status && response.data) {
          setPackageData(response.data);
          setError('');
        } else {
          setError('Không thể tải thông tin gói. Vui lòng thử lại.');
        }
      } catch (err: any) {
        console.error('Error fetching package:', err);
        setError(err.message || 'Không thể tải thông tin gói. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [searchParams, user]);

  const validatePhone = (phone: string) => {
    const phoneRegex = /^(0|\+84)(\d{9,10})$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string) => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : value,
    });

    // Validate on change
    if (name === "phone") {
      setErrors({
        ...errors,
        phone: validatePhone(value) ? "" : "Số điện thoại không hợp lệ",
      });
    } else if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value) ? "" : "Email không hợp lệ",
      });
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Check if package data exists
    if (!packageData?.idPackage || !user?.token) {
      alert('Không thể tạo đơn hàng. Vui lòng thử lại.');
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Prepare order data
      const orderData: any = {
        items: [
          {
            packageId: packageData.idPackage,
            quantity: 1
          }
        ]
      };

      // Add discount code if available
      if (discountData?.discountInfo?.code) {
        orderData.discountCode = discountData.discountInfo.code;
      }

      console.log('Creating order with data:', orderData);

      // Call API to create order
      const response = await portalApi.order.create(orderData, user.token);

      console.log('Order created successfully:', response);

      if (response.status && response.data?.payUrl) {
        // Redirect to payment URL
        window.location.href = response.data.payUrl;
        
        // Alternative: Open in new tab
        // window.open(response.data.payUrl, '_blank');
      } else {
        throw new Error('Không nhận được URL thanh toán');
      }
    } catch (err: any) {
      console.error('Error creating order:', err);
      alert(err.message || 'Không thể tạo đơn hàng. Vui lòng thử lại.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // Handle check discount code
  const handleCheckDiscount = async () => {
    if (!discountCode.trim()) {
      setDiscountError('Vui lòng nhập mã giảm giá');
      return;
    }

    if (!packageData?.idPackage || !user?.token) {
      setDiscountError('Không thể kiểm tra mã giảm giá');
      return;
    }

    setIsCheckingDiscount(true);
    setDiscountError('');

    try {
      const response = await portalApi.order.checkDiscountCode(
        {
          discountCode: discountCode.trim(),
          items: [
            {
              packageId: packageData.idPackage,
              quantity: 1
            }
          ]
        },
        user.token
      );

      if (response.status && response.data) {
        setDiscountData(response.data);
        setDiscountError('');
      } else {
        setDiscountError('Mã giảm giá không hợp lệ');
        setDiscountData(null);
      }
    } catch (err: any) {
      console.error('Error checking discount:', err);
      setDiscountError(err.message || 'Mã giảm giá không hợp lệ');
      setDiscountData(null);
    } finally {
      setIsCheckingDiscount(false);
    }
  };

  // Calculate total prices
  const getOriginalPrice = () => {
    return packageData?.amount || 0;
  };

  const getDiscountAmount = () => {
    return discountData?.discountAmount || 0;
  };

  const getFinalPrice = () => {
    if (discountData) {
      return discountData.totalAmount;
    }
    return packageData?.amount || 0;
  };

  return (
    <Box sx={{ p: 4 }}>
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {/* Left side - Order information - FULL WIDTH */}
            <Grid item xs={12}>
            <OrderPaper elevation={0} variant="outlined">
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Thông tin đơn hàng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mã gói: {packageData?.idPackage}
                </Typography>
              </Box>

              <CourseItem>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {packageData?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {packageData?.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                    Thời gian: {packageData?.timeStart && formatDate(packageData.timeStart)} - {packageData?.timeEnd && formatDate(packageData.timeEnd)}
                  </Typography>
                </Box>
                <PriceText sx={{ fontWeight: 600 }}>
                  {packageData?.amount && formatPrice(packageData.amount)}
                </PriceText>
              </CourseItem>

              <Divider sx={{ my: 3, borderStyle: "dashed" }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="subtitle1" fontWeight="600">
                  Tổng học phí
                </Typography>
                <PriceText sx={{ fontWeight: 600 }}>
                  {formatPrice(getOriginalPrice())}
                </PriceText>
              </Box>

              {/* Discount Code Section */}
              <PromotionBox>
                <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2 }}>
                  Mã giảm giá
                </Typography>
                
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Nhập mã giảm giá"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value.toUpperCase());
                      setDiscountError('');
                    }}
                    error={!!discountError}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        backgroundColor: "#fff",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleCheckDiscount}
                    disabled={isCheckingDiscount || !discountCode.trim()}
                    sx={{
                      minWidth: "100px",
                      borderRadius: "8px",
                      textTransform: "none",
                      backgroundImage: "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 100%)",
                      "&:hover": {
                        backgroundImage: "linear-gradient(90deg, #0C8C87 -5.95%, #57C0AD 100%)",
                      },
                      "&:disabled": {
                        background: "#E5E7EB",
                        color: "#9CA3AF",
                      }
                    }}
                  >
                    {isCheckingDiscount ? "Đang kiểm tra..." : "Áp dụng"}
                  </Button>
                </Box>

                {discountError && (
                  <Typography variant="caption" color="error" sx={{ display: 'block', mb: 1 }}>
                    {discountError}
                  </Typography>
                )}

                {discountData && (
                  <>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: '#E8F5F3', 
                      borderRadius: 2,
                      border: '1px solid #0E9F97',
                      mb: 2 
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CardGiftcardIcon sx={{ color: '#0E9F97' }} />
                        <Typography variant="subtitle2" fontWeight="600" color="#0E9F97">
                          Mã "{discountData.discountInfo.code}" đã được áp dụng!
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Giảm {discountData.discountInfo.type === 'percent' 
                          ? `${discountData.discountInfo.amount}%` 
                          : formatPrice(discountData.discountInfo.amount)
                        }
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="body2">Giá được giảm</Typography>
                      <Typography variant="body2" fontWeight="bold" color="error">
                        -{formatPrice(getDiscountAmount())}
                      </Typography>
                    </Box>
                  </>
                )}
              </PromotionBox>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="subtitle1" fontWeight="600">
                  Tổng thanh toán
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#0E9F97">
                  {formatPrice(getFinalPrice())}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isProcessingPayment}
                  sx={{
                    textTransform: "none",
                    borderRadius: "25px",
                    backgroundImage:
                      "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 100%)",
                    "&:hover": {
                      backgroundImage:
                        "linear-gradient(90deg, #0C8C87 -5.95%, #57C0AD 100%)",
                    },
                    "&:disabled": {
                      background: "#E5E7EB",
                      color: "#9CA3AF",
                    },
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "20px",
                    color: "white",
                    padding: "12px 48px",
                    minWidth: "200px",
                  }}
                >
                  {isProcessingPayment ? "Đang xử lý..." : "Thanh toán ngay"}
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="body2" color="text.secondary" textAlign="center">
                Bạn vẫn còn phân vân? Liên hệ Checkmate để được{" "}
                <Typography
                  component="span"
                  color="#0E9F97"
                  sx={{ 
                    fontWeight: "medium", 
                    cursor: "pointer"
                  }}
                  onClick={openDialog}
                >
                  Tư vấn thêm
                </Typography>
              </Typography>
            </OrderPaper>
          </Grid>
        </Grid>
        )}

        {/* Right side - Customer information */}
          {/* <Grid item xs={12} md={6}>
            <OrderPaper elevation={0} variant="outlined">
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                Thông tin của bạn
              </Typography>
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 0.5,
                        fontWeight: 500,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                      }}
                    >
                      Họ và tên (*)
                    </Typography>
                    <TextField
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      placeholder="Nhập tên của bạn"
                      variant="outlined"
                      size="small"
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 25,
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 0.5,
                        fontWeight: 500,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                      }}
                    >
                      Số điện thoại (*)
                    </Typography>
                    <TextField
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      fullWidth
                      placeholder="Nhập số điện thoại"
                      variant="outlined"
                      size="small"
                      required
                      error={!!errors.phone}
                      helperText={errors.phone}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 25,
                        },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+84</InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 0.5,
                        fontWeight: 500,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                      }}
                    >
                      Email
                    </Typography>
                    <TextField
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      placeholder="Nhập email"
                      variant="outlined"
                      size="small"
                      error={!!errors.email}
                      helperText={errors.email}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 25,
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mb: 0.5,
                        fontWeight: 500,
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                      }}
                    >
                      Khung giờ liên hệ
                    </Typography>
                    <TextField
                      select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      fullWidth
                      placeholder="Chọn khung giờ"
                      variant="outlined"
                      size="small"
                      required
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 25,
                        },
                      }}
                    >
                      <MenuItem value="9h-11h">9h - 11h sáng</MenuItem>
                      <MenuItem value="14h-17h30">14h - 17h30 chiều</MenuItem>
                      <MenuItem value="19h-21h30">19h - 21h30 tối</MenuItem>
                    </TextField>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        textTransform: "none",
                        borderRadius: "25px",
                        backgroundImage:
                          "linear-gradient(90deg, #0E9F97 -5.95%, #63D0BD 100%)",
                        "&:hover": {
                          backgroundImage:
                            "linear-gradient(90deg, #0C8C87 -5.95%, #57C0AD 100%)",
                        },
                        fontFamily:
                          "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
                        fontWeight: 500,
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "white",
                        padding: "8px 16px",
                        minWidth: "120px",
                      }}
                    >
                      Xác nhận thanh toán
                    </Button>
                  </Box>
                </Box>
              </form>
            </OrderPaper>
          </Grid> */}

      </Container>
    </Box>
  );
}
