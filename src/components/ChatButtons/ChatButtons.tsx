import iconZalo from "../../assets/icon-zalo.png";
import messenger from "../../assets/messenger.png";
import "./ChatButtons.css";

// Danh sách các route được phép hiển thị ChatButtons
// Mặc định hiển thị trên tất cả các pages của plugin
// Có thể tùy chỉnh danh sách này nếu muốn ẩn ở một số route cụ thể
const ALLOWED_ROUTES = [
  "/wordpress/",
  "/wordpress/contact",
  "/wordpress/register",
  "/wordpress/thankyou",
  "/wordpress/terms",
  "/wordpress/privacy",
  "/wordpress/payment",
];

/**
 * Kiểm tra xem route hiện tại có được phép hiển thị ChatButtons không
 * @param pathname - Route hiện tại
 * @returns true nếu được phép hiển thị, false nếu không
 */
const isRouteAllowed = (pathname: string): boolean => {
  // Normalize pathname: remove trailing slash
  const normalizedPathname = pathname.endsWith("/") && pathname !== "/" 
    ? pathname.slice(0, -1) 
    : pathname;

  // Kiểm tra exact match hoặc startsWith cho các route trong danh sách
  return ALLOWED_ROUTES.some((route) => {
    // Exact match
    if (normalizedPathname === route) {
      return true;
    }
    // Nếu route là "/", chỉ match exact, không match sub-routes
    if (route === "/" || route === "/wordpress/") {
      return normalizedPathname === route || normalizedPathname === "/wordpress";
    }
    // Cho các route khác, check startsWith để hỗ trợ sub-routes
    return normalizedPathname.startsWith(route + "/");
  });
};

const ChatButtons = () => {
  // Mặc định hiển thị trên tất cả pages của plugin
  // Nếu muốn ẩn ở một số route cụ thể, uncomment code bên dưới và chỉnh sửa ALLOWED_ROUTES
  // const location = useLocation();
  // const [shouldShow, setShouldShow] = useState(true);
  // useEffect(() => {
  //   setShouldShow(isRouteAllowed(location.pathname));
  // }, [location.pathname]);
  // if (!shouldShow) {
  //   return null;
  // }

  const zaloUrl = "https://zalo.me/562435418985235142";
  const messengerUrl = "https://m.me/110441372084396";

  return (
    <div className="chat-buttons-container">
      {/* Text bubble phía trên */}
      <div className="chat-bubble-text">
        Nhận tư vấn ngay 👋
      </div>

      {/* Buttons */}
      <div className="zalome">
        <a href={zaloUrl} target="_blank" rel="noopener noreferrer">
          <img alt="icon zalo" src={iconZalo} />
        </a>
      </div>

      <div className="messengerme">
        <a href={messengerUrl} target="_blank" rel="noopener noreferrer">
          <img alt="icon messenger" src={messenger} />
        </a>
      </div>
    </div>
  );
};

export default ChatButtons;

