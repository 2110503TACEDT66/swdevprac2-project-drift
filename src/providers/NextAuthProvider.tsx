"use client"
import { SessionProvider } from "next-auth/react"


//component which is a wrapper to use Session in client component
export default function NextAuthProvider(
    {children , session} : {children:React.ReactNode,session:any}
    
    ){
        return(
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        )
}