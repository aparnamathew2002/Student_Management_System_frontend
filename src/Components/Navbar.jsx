import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

function Navbar() {
   const content = "The Student Management System is an efficient platform designed to manage and organize student records with ease. By combining a simple interface with powerful CRUD functionalities, this system enables users to add, edit, view, and delete student information seamlessly. It streamlines academic data management, ensuring accuracy, accessibility, and better decision-making."
  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
  <AppBar position="static" sx={{ backgroundColor: "#2E3B55" }}>
    <Toolbar>
      <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Student Management System
      </Typography>
        <Tooltip title={content}><Button color="inherit">About Us</Button></Tooltip>
    </Toolbar>
  </AppBar>
</Box>
    </>
  )
}

export default Navbar