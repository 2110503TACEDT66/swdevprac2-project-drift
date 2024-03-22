"use client"

import Image from "next/image"
import styles from "./banner.module.css"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"


export default function Banner(){

    const router = useRouter()
    const {data:session} = useSession();
    const imgSrcs = [
                    "/img/cover1.jpg" , 
                    "/img/cover2.jpg", 
                    "/img/cover3.jpg", 
                    "/img/cover4.jpg"
                    ]

    const [imgIdx , setImgIdx] = useState(0);
    

    return(
        <div className="relative h-[91svh] w-full" onClick={()=>setImgIdx(prev => (prev+1)%4)}>
            
            <Image className="absolute object-cover" src={imgSrcs[imgIdx]} alt={"Banner"} fill={true} priority={true}/>
            {
                session
                    ?<div className="absolute top-3 right-1 z-50 p-2 font-medium text-xl text-slate-100 border-l-4 border-white bg-black/35 backdrop-blur-lg shadow-lg">
                        <span className="text-green-500">Welcome </span>
                        {session?.user.name}
                     </div>
                    :""
            }

            <div className="absolute top-16 left-1/2 -translate-x-1/2 pt-7 pb-4 pl-2 pr-2 w-[90%] text-center rounded-sm bg-white/40 backdrop-blur-md shadow-xl z-50">
                <h1 className="text-5xl mb-5">Hotel Booking</h1>
                <p className="text-2xl font-[300]">Fast and Easy - For you to spend your time enjoying your vacation</p>
            </div>

            <button onClick={(e)=>{e.stopPropagation(); router.push("/hotel")}} className="absolute font-[400] text-2xl right-12 bottom-10 w-fit h-fit p-3 rounded-lg bg-white/30 backdrop-blur-md shadow-xl z-40 hover:text-slate-100 hover:ring-2 hover:ring-slate-100 transition-all">
                Select Hotel
            </button>
        </div>
    )
}