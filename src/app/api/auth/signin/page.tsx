"use client"
import { ClassNames } from "@emotion/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from "@mui/material";
import { getSession, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

export default function SignIn(){
  
  const redirect = useSearchParams();
  const [useremail,setUserEmail] = useState("");
  const [userpassword,setUserPassword] = useState("");
  const errorBox = useRef<HTMLDivElement|null>(null);

  const  [isload , setIsLoad] = useState(false);
  
  const areAllFieldsFilled = () => {
    return useremail && userpassword
  }

  const handleSignIn = async () =>{

    setIsLoad(true)

      await signIn('credentials', {
        email: useremail,
        password: userpassword,
        callbackUrl:redirect.get("callbackUrl")??"/"
      });
  
    setIsLoad(false)
    
    const session = getSession();
    if(!session) errorBox.current!.innerText = "Please try again"
  }

  return (
    
    <div className="relative mx-auto mt-7 flex flex-col items-center gap-y-7 bg-slate-200 p-5 min-w-[400px] w-[50%] max-w-[500px] rounded-lg">

      {
        isload
            ? <div className="absolute top-0 left-0 flex flex-col gap-y-3 justify-center items-center rounded-lg text-slate-50 w-full h-full bg-black/30 z-[9999]">
                <CircularProgress thickness={6}/>
                <div>logging in...</div>
              </div>
            :''
      }

      <h1 className="w-fit text-3xl font-bold mb-2">Login</h1>

      <TextField label="email"
        onChange={(e)=>{setUserEmail(e.target.value); errorBox.current!.innerText = "";}} 
        size="small" className="w-[90%]"
        type="email"
        autoComplete="off"
      />
      
      <TextField label="password" type="password"
        onChange={(e)=>{setUserPassword(e.target.value); errorBox.current!.innerText = ""; }} 
        size="small" className="w-[90%]"
        autoComplete="off"
      />

      <div ref={errorBox} className="w-[85%] min-h-7 text-end text-lg text-red-700 font-normal font-kanit">
 
      </div>

      <Button onClick={handleSignIn}
        variant="contained"
        disabled={!areAllFieldsFilled()}
        className="text-xl bg-blue-500 p-2 font-kanit text-slate-100 rounded-md w-[80%] max-w-[250px] hover:bg-blue-700 transition-colors">
          Login
      </Button>
    
    </div>
  )
}
  