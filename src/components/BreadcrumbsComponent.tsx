import React,{useState,useEffect} from 'react';
import { Breadcrumbs, Button, Link } from '@mui/material';
import {  useLocation, useNavigate } from 'react-router';

import { ICustomBreadcrumbRoute, useCustomBreadcrumb } from '../contexts/CustomBreadcrumb';

const BreadcrumbsComponent: React.FC = () => {
  
    const navigate = useNavigate();
    const {customBreadcrumbs} = useCustomBreadcrumb();
    const [breadcrumbDisplay,setBreadcrumbDisplay]=useState<ICustomBreadcrumbRoute[]>([]);
    useEffect(()=>{
      // console.log("customBreadcrumbs",customBreadcrumbs);
        setBreadcrumbDisplay(customBreadcrumbs);
    },[customBreadcrumbs])
    
    
    // Lấy giá trị PREFIX từ biến môi trường (hoặc mặc định)
    const PREFIX = process.env.PREFIX_ADMIN || '';
  
    // Lấy đường dẫn hiện tại
    const path = window.location.pathname;
  
    // Tìm chỉ số của PREFIX trong URL
    const prefixIndex = path.indexOf(PREFIX);
  
    // Nếu PREFIX có trong đường dẫn, lấy phần sau PREFIX
    let breadcrumbPathnames: string[] = [];
    if (prefixIndex !== -1) {
      // Cắt phần trước PREFIX và lấy phần sau nó
      breadcrumbPathnames = path.slice(prefixIndex + PREFIX.length).split('/').filter(x => x);
    }

    if (breadcrumbPathnames.length < 2) {
      return null; // Trả về null để không hiển thị breadcrumb
    }

    const convertToTitleCase = (str: string) => {
      return str
          .replace(/-/g, ' ') // Thay thế dấu gạch ngang bằng khoảng trắng
          .split(' ') // Tách chuỗi thành mảng từ
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Viết hoa chữ cái đầu và viết thường phần còn lại
          .join(' '); // Nối lại các từ với khoảng trắng
    };

    const decodeId = (encodedId: string) => {
      const decoded = decodeURIComponent(encodedId);
      const parts = decoded.split('__'); // Dùng '__' thay vì '_'
      if (parts.length < 2) {
          return { name: convertToTitleCase(decoded), id: null }; // Chuyển đổi name khi không có ID
      }
      const id = parseInt(parts.pop()!); // Lấy phần cuối làm ID
      const name = parts.join('__'); // Ghép lại phần còn lại làm tên
      return { name: convertToTitleCase(name), id }; // Chuyển đổi name khi có ID
    };
    const userNamesById:any = { 1: "John" };
    const DynamicUserBreadcrumb = ({match}:{match:any}) => {
      const userId = match.params.userId;
      const userName = userNamesById[userId];
      return userName;
    };
    
    // const breadcrumbsTree = [
    //   { path: "some where custom users/:userId", breadcrumb: DynamicUserBreadcrumb },
    //   { path: '', breadcrumb: null  },
    //   { path: PREFIX, breadcrumb: null  },
    //   { path: `${PREFIX}/contest-badge`, breadcrumb: 'Contest Badge'  },
    //   { path: `${PREFIX}/contest-badge/add-badge`, breadcrumb: 'Add Badge'  },
    //   { path: `${PREFIX}/contest-badge/:id`, breadcrumb: null  },
    //   { path: `${PREFIX}/contest-badge/badge-rules/:id`, breadcrumb: 'Badge Rules'  },
    //   { path: `${PREFIX}/contest-badge/edit-badge/:id`, breadcrumb: 'Edit Badge'  },
    // ].map((breadcrumb)=>{
    //   // add prefix "/" to all routes
    //   breadcrumb.path = "/"+breadcrumb.path.replace(/^\/+/g,"");
    //   return breadcrumb;
    // });
    // // const location =  useLocation();
    // const breadcrumbs = getBreadcrumbs({
    //   routes: breadcrumbsTree,
    //   location: {pathname:window.location.pathname} as any
      
    // }).filter((breadcrumb) => breadcrumb.match.route);
    // const routesDisplay=breadcrumbs.map((breadcrumb) => {
    //   return breadcrumb.match.route;
    // });
    
   const renderBreadcrumbsPath=()=>{
    return breadcrumbDisplay.map((route: any, index: any) => (
      <Button
        key={index}
        onClick={() => {
          navigate(route?.path || '');
        }}
        color={(index === breadcrumbDisplay.length - 1 ? "text.disabled" : "primary") as any}
        sx={{
          textDecoration: 'none',
          pointerEvents: index === breadcrumbDisplay.length - 1 ? 'none' : 'auto',
        }}
      >
        {route?.breadcrumb as any || ""}
      </Button>
    ))
   }
   
    return (
      <Breadcrumbs aria-label="breadcrumb" sx={{
        // background: '#f1ecec/
        paddingBottom: '10px'
      }}>
        {breadcrumbDisplay.length>0?renderBreadcrumbsPath():breadcrumbPathnames.map((value, index) => {
            const to = `/${PREFIX}/${breadcrumbPathnames.slice(0, index + 1).join('/')}`;
            const isCurrentPage = `${to}` === `${window.location.pathname}`;
            
            // Chuyển tên breadcrumb từ kebab-case sang Title Case
            const decoded = decodeId(value); // Giải mã giá trị breadcrumb
            const breadcrumbLabel = decoded.name ? decoded.name : convertToTitleCase(value);
            return (
                <Button
                    key={to}
                    // href={isCurrentPage ? "#" : to}
                    onClick={()=>{
                        navigate(to);
                    }}
                    color={(isCurrentPage ? "text.disabled" : "primary") as any}
                    sx={{
                    textDecoration: 'none',
                    pointerEvents: isCurrentPage ? 'none' : 'auto',
                    }}
                >
                    {breadcrumbLabel}
                </Button>
            );
        })}
      </Breadcrumbs>
    );
  };
  
  export default BreadcrumbsComponent;