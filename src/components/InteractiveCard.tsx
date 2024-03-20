"use client"
import Link from "next/link";
import React from "react"


export default function InteractiveCard(props:{children:React.ReactNode , hid:string}){
    
    const onCardSelected = (e:React.SyntheticEvent)=>{
        if(e.type == "mouseover"){
            e.currentTarget.classList.remove("shadow-lg");
            e.currentTarget.classList.remove("bg-white");
            e.currentTarget.classList.add("shadow-2xl");
            e.currentTarget.classList.add("bg-neutral-200");
        }
        else{
            e.currentTarget.classList.remove("shadow-2xl");
            e.currentTarget.classList.remove("bg-neutral-200");
            e.currentTarget.classList.add("shadow-lg");
            e.currentTarget.classList.add("bg-white");
        }
    }

    return(

        <div className="flex flex-col flex-nowrap bg-white w-[320px] h-[450px] gap-x-[15px] rounded-lg shadow-lg" 
            onMouseOver={(e)=>onCardSelected(e)} onMouseOut={(e)=>onCardSelected(e)}
        >
            {props.children}
        </div>
    )
}