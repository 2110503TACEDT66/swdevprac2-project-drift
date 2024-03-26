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
  const [isLoad, setIsLoad] = useState(false);

  const handleRegister = async () => {
    try {
      setIsLoad(true) // Set loading to true when registration starts

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
      setIsLoad(false); // Set loading back to false when registration process finishes
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
      {
        isLoad
            ? <div className="absolute top-0 left-0 flex flex-col gap-y-3 justify-center items-center rounded-lg text-slate-50 w-full h-full bg-black/30 z-[9999]">
                <CircularProgress thickness={6}/>
                <div>registering...</div>
              </div>
            :''
      }


      <Box
        className="bg-slate-200 rounded-lg p-5 flex flex-col justify-center items-center"
        sx={{ minWidth:'400px', width: '50%', maxWidth: '500px' }}
      >
        <h1 className='text-3xl font-bold mb-2'>Register</h1>

        <TextField size="small" label="Name" value={userName} fullWidth margin="normal"
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField size="small" label="Telephone" value={userTel} fullWidth margin="normal"
          onChange={(e) => setUserTel(e.target.value)}
        />
        <TextField size="small" label="Email" type="email" value={userEmail} margin="normal" fullWidth
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <TextField size="small" label="Password" type="password" value={userPassword} fullWidth margin="normal"
          onChange={(e) => setUserPassword(e.target.value)}
        />


          <p className="text-red-700 self-end text-lg min-h-10 mb-2">{errorMessage}</p>
 

        <Button variant='contained' color='primary' onClick={handleRegister} className='w-full mt-4 bg-blue-500 text-xl font-kanit' disabled={!areAllFieldsFilled()}>
            Register
        </Button>

      </Box>
    </Box>
  );
}
