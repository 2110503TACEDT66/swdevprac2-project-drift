"use client"
import { useEffect, useRef, useState } from "react"


export default function VideoPlayer({vdoSrc,isPlaying}:{vdoSrc:string , isPlaying:boolean}){
    
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(()=>{
        isPlaying
                ? videoRef.current?.play()
                :videoRef.current?.pause()

    },[isPlaying])

    return(
        <video ref={videoRef} loop muted width={"400px"}>
            <source src={vdoSrc}/>
        </video>
    )
}