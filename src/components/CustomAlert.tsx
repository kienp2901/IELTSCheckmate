import React, { useEffect } from 'react';
import { Snackbar, SnackbarContent, AlertColor } from '@mui/material';

// Mở rộng kiểu AlertColor để bao gồm warning và info
type AlertType = 'success' | 'error' | 'info' | 'warning';

interface CustomAlertProps {
    message: string;
    type: AlertType; // Thay AlertColor thành AlertType đã mở rộng
    duration?: number;
    onClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, type, duration = 3000, onClose }) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                if (onClose) onClose();
            }, duration);
            return () => clearTimeout(timer); 
        }
    }, [duration, onClose]);

    return (
        <Snackbar
            open={true}
            autoHideDuration={duration}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <SnackbarContent 
                message={message}
                sx={{
                    backgroundColor: type === 'success' ? 'green' :
                                     type === 'error' ? 'red' :
                                     type === 'warning' ? 'orange' :
                                     'gray', // Màu cho warning
                    color: 'white',
                    padding: '10px',
                }}
            />
        </Snackbar>
    );
};

export default CustomAlert;