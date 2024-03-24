"use client"
import { TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn(){
  
  const [useremail,setUserEmail] = useState("");
  const [userpassword,setUserPassword] = useState("");
  
  const handleSignIn = async () =>{
    await signIn('credentials', {
      email: useremail,
      password: userpassword,
      callbackUrl: '/',
    });
  }

  return (
    
    <div className="mx-auto mt-7 flex flex-col justify-center items-center gap-y-7 bg-slate-200 p-5 min-w-[400px] w-[50%] max-w-[500px] rounded-lg">
      <h1 className="w-fit text-3xl font-bold mb-2">Login</h1>
      
      <TextField label="email" value={useremail} 
        onChange={(e)=>setUserEmail(e.target.value)}
        size="small" className="w-[90%]"
      />
      
      <TextField label="password" value={userpassword} 
        onChange={(e)=>setUserPassword(e.target.value)}
        size="small" className="w-[90%]"
      />

      <button onClick={handleSignIn}
        className="text-lg bg-blue-500 p-2 text-slate-100 rounded-md w-[80%] max-w-[250px] hover:bg-blue-700 transition-colors">
          Login
      </button>
    
    </div>
  )
}
  