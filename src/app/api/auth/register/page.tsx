"use client"
import { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';

import userRegister from "@/libs/userRegister";
import userLogIn from "@/libs/userLogIn";

import { getSession, signIn } from 'next-auth/react';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [userTel, setUserTel] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true) // Set loading to true when registration starts

      // Call registration function
      const userData = await userRegister(userName, userTel, userEmail, userPassword);

      // Handle success
      console.log('Registration successful!', userData);

      // Log in the user after successful registration
      const loginResponse = await userLogIn(userEmail, userPassword); // Manually log in the user
      if (loginResponse) {
          // Update session with new user data
          const session = await getSession();
          await signIn('credentials', {
              email: userEmail,
              password: userPassword,
              callbackUrl: '/',
          });
      }

    } catch (error) {
      // Handle error
      console.error('Failed to register user', error);
      setErrorMessage('Registration failed. Please try again.');
    } finally {
      setLoading(false); // Set loading back to false when registration process finishes
    }
  };

  const areAllFieldsFilled = () => {
    return userName && userTel && userEmail && userPassword;
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
        className="bg-slate-400 rounded-lg p-5 flex flex-col justify-center items-center"
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
        {errorMessage && (
          <p className="text-red-500 mb-2">{errorMessage}</p> // Render error message if exists
        )}
        <Button variant='contained' color='primary' onClick={handleRegister} className='w-full mt-4 bg-blue-500' disabled={!areAllFieldsFilled()}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
        </Button>
      </Box>
    </Box>
  );
}
