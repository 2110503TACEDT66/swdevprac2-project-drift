"use client"
import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import userRegister from "@/libs/userRegister";

export default function Register() {
  const [userName, setUserName] = useState('');
  const [userTel, setUserTel] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Call your registration function
      const userData = await userRegister(userName, userTel, userEmail, userPassword);
      
      // Handle success (redirect, display success message, etc.)
      console.log('Registration successful!', userData);
    } catch (error) {
      // Handle error (display error message, log error, etc.)
      console.error('Failed to register user', error);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={4}
    >
      <Box
        className="bg-slate-700 rounded-lg p-5 flex flex-col justify-center items-center"
        sx={{ width: '50%', maxWidth: '500px' }}
      >
        <h1 className='text-3xl font-bold mb-2'>Register</h1>
        <TextField
          label="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Telephone"
          value={userTel}
          onChange={(e) => setUserTel(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleRegister} className='w-full mt-4'>Register</Button>
      </Box>
    </Box>
  );
}
