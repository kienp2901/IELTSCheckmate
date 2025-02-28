import React, { useState } from 'react';
import { Box, Drawer, Toolbar } from '@mui/material';
import SidebarContent from './SidebarContent';
// import './sidebar-select.scss';

// const drawerWidth = 250;

const Sidebar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerWidth,setDrawerWidth] = useState(250);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    
     
      <Drawer
        variant="permanent"
        
        
        sx={{
          display: 'flex',
         
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { position: 'initial', width: drawerWidth },
        }}
        open
      >
        {/* <Toolbar /> */}
        <Box >
          <SidebarContent  drawerWidth={drawerWidth}  setDrawerWidth={setDrawerWidth} />
        </Box>
      </Drawer>
    
  );
};

export default Sidebar;

