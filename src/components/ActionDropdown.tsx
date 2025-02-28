import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon } from 'lucide-react';

// Định nghĩa loại dữ liệu cho action
interface Action {
  label: string; // Nhãn hiển thị trên nút
  onClick: () => void; // Hàm thực thi khi nhấn nút
}

interface ActionDropdownProps {
  actions: Action[]; // Mảng các hành động động
}

export default function ActionDropdown({ actions }: ActionDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        className="bg-blue-500 hover:bg-blue-600"
        onClick={handleClick}
      >
        <MenuIcon className="h-4 w-4 text-white" />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* Render các nút action từ danh sách actions */}
        {actions.map((action, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              action.onClick();
              handleClose();
            }}
            className={action.label === 'Delete' ? 'text-red-600' : ''}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}