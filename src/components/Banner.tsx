"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"


export default function Banner(){

    const router = useRouter()
    const {data:session} = useSession();
    console.log(session?.user.name)
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

            <div className="absolute top-16 left-1/2 -translate-x-1/2 pt-6 pb-4 pl-2 pr-2 w-[90%] text-center rounded-sm bg-white/40 backdrop-blur-md shadow-xl z-50">
                <h1 className="text-3xl mb-3 sm:text-4xl md:text-5xl md:mb-4 2xl:text-7xl">Hotel Booking</h1>
                <p className="text-sm font-light sm:text-lg md:text-xl 2xl:text-3xl">Fast and Easy - For you to spend your time enjoying your vacation</p>
            </div>

            <button onClick={(e)=>{e.stopPropagation(); router.push("/hotel")}} className="
                absolute font-[100] text-lg translate-x-1/2 right-1/2 bottom-8 w-[70%] h-fit p-3 rounded-lg bg-white/30 backdrop-blur-md shadow-xl z-40 
                hover:text-slate-100 hover:ring-2 hover:ring-slate-100
                sm:text-2xl sm:right-10 sm:bottom-8 sm:translate-x-0 sm:w-fit
                md:text-2xl md:right-10 md:bottom-8 md:translate-x-0 md:w-fit
                lg:text-2xl lg:right-12 lg:bottom-10 lg:translate-x-0 lg:w-fit
                xl:text-2xl xl:right-12 xl:bottom-10 xl:p-4 xl:rounded-xl xl:translate-x-0 xl:w-fit
                transition-all
            ">
                Select Hotel
            </button>
        </div>
    )
}