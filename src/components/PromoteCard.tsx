"use client"

import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useWindowListener } from "@/hooks/useWindowListener";


export default function PromoteCard(){
    
    const [vdoPlay,setVdoPlay] = useState(true);

    useWindowListener("contextmenu" ,(e)=>e.preventDefault())

    return(
        <div className="flex flex-col md:flex-row w-fit h-fit p-5 md:pr-20 gap-x-7 mx-auto mt-10 text-slate-200 bg-gray-800 border-[1px] border-gray-700 rounded-sm">
            <VideoPlayer vdoSrc={"/video/enjoyYourTime.mp4"} isPlaying={vdoPlay} />
            <div className="flex flex-col mt-3 flex-nowrap">
                <div className="text-2xl font-normal mb-2">Book your room today</div>
                <div className="text-md font-light text-300 mb-4">
                    We know time is precious so our goal is to help you
                    create wonderful moments with your partner.
                </div>
                <button onClick={()=>setVdoPlay(prev=>!prev)}
                    className="rounded-2xl w-32 h-fit text-xl bg-blue-500 text-slate-100 mt-auto ml-auto p-1 pl-6 pr-6 hover:scale-105 hover:bg-blue-600 transition-all">
                    {vdoPlay? "Pause":"Play"}
                </button>
            </div>
        </div>        
    )
}