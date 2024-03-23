"use client"
import Link from "next/link";
import React from "react"


export default function InteractiveCard(props:{children:React.ReactNode , hid:string}){

    return(

        <div className="flex flex-col box-border flex-nowrap bg-gray-800 w-[320px] h-[450px] gap-x-[15px] rounded-lg shadow-lg border-[1px] border-gray-700
                        hover:border-gray-300
                        transition-all"
        >
            {props.children}
        </div>
    )
}