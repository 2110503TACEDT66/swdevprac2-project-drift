"use client"
import React, { useState } from 'react';
import { Drawer, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function DrawerPanel ({children}:{children:React.ReactNode}) {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='w-full flex flex-row'>
        <Button onClick={handleDrawerOpen}>
          <MenuIcon className='text-gray-100'/>
        </Button>
      </div>
      <Drawer anchor="left" open={open} onClose={handleDrawerClose} sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: '#1c1c1c',
          minWidth: '30%',
        },
      }}
      >
        <div className="flex flex-col justify-center items-center py-2">
          {children}
        </div>
      </Drawer>
    </>
  );
};