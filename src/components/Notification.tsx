import { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Button,
  Fab,
  Link,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Fab size="small" color="secondary" 
    onClick={handleOpen}
    sx={{
        position: 'absolute',
        right: -20,
        top: -20,
        p: 0
    }}
    >
        <NotificationsIcon />
    </Fab>
      {/* <IconButton 
        onClick={handleOpen}
        sx={{
          color: 'black',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
          position: 'absolute',
          right: 0,
          top: 0,
          p: 0
        }}
      >
        <NotificationsIcon sx={{fontSize: '30px'}} />
      </IconButton> */}

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '300px',
            maxWidth: '90vw',
            position: 'absolute',
            top: '60px',
            right: '20px'
          }
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Button
            onClick={handleClose}
            sx={{
              width: '100%',
              backgroundColor: '#ff7675',
              color: 'white',
              borderRadius: 0,
              '&:hover': {
                backgroundColor: '#ff5f5f',
              }
            }}
          >
            <CloseIcon />
          </Button>
        </Box>

        <DialogTitle sx={{ 
          textAlign: 'center',
          color: '#2196f3',
          fontWeight: 'bold',
          pb: 1
        }}>
          Notification
        </DialogTitle>

        <DialogContent>
          <Box sx={{
            backgroundColor: '#fff3f0',
            p: 2,
            textAlign: 'center'
           }}>
            <Typography>
              Get ready to showcase your skills — complete 
               <Link href={process.env.URL_DO_QUIZ} target="_blank" rel="noopener noreferrer"> the quiz </Link> 
              now to advance to the next stage of the competition
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}