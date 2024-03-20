"use client"

import { useReducer, useState } from "react";
import Card from "./Card"
import Link from "next/link";

export default function CardPanel(){

    const hospitalData = [
        {
            hid:"001",
            hname:"Chulalongkorn Hospital",
            himg:"/img/chula.jpg"
        },
        {
            hid:"002",
            hname:"Rajavithi Hospital",
            himg:"/img/rajavithi.jpg"
        },
        {
            hid:"003",
            hname:"Thammasat University Hospital",
            himg:"/img/thammasat.jpg"
        },
    ]

    const initialState = new Map<string , number>();
    hospitalData.forEach(element => initialState.set(element.hname,5));

    
    //contain add/remove method of rating state
    const ratingReducer = (ratingMap:Map<string,number>,action:{type:string,hosName:string,star:number})=>{
        switch(action.type){
            case "change":{
                return new Map(ratingMap.set(action.hosName,action.star));
            }
            case "remove":{
                ratingMap.delete(action.hosName)
                return new Map(ratingMap)
            }
            default: return ratingMap
        }
    }

    const [ratingMap , dispatchRating] = useReducer(ratingReducer,new Map(initialState))
    
    
    return(
        <div className="bg-blue-100 h-fit min-h-full">
            {/* <div className="flex flex-row flex-wrap justify-center gap-x-12 gap-y-10 pt-10 pb-10">
                {
                    hospitalData.map((elem , idx)=>(
                        <Link key={idx} href={`/hospital/${elem.hid}`}>
                            <Card onChangeRating={(hosName:string, star:number)=>dispatchRating({type:"change",hosName:hosName,star:star}) } 
                                hid={elem.hid}
                                hospitalName={elem.hname} 
                                imgSrc={elem.himg}
                                />
                        </Link>
                    ))
                }
            </div> */}

            <div className=" bg-sky-800 font-kanit p-5 text-lg space-y-2">
                {
                    Array.from(ratingMap).map((elem , idx) =>(
                        
                        <div data-testid={elem[0]} key={idx}
                            onClick={()=>dispatchRating({type:"remove",hosName:elem[0],star:0})}
                            className="bg-blue-100 w-[400px] text-gray-700 p-2 pl-4 rounded-r-lg cursor-pointer
                                        hover:bg-gradient-to-r hover:shadow-lg hover:w-[450px] hover:to-blue-300 hover:from-blue-200
                                        transition-all duration-300"
                        >
                            {elem[0]} Rating: {elem[1]}
                        </div>
                    ))
                }
            
            </div>
        </div>
    )
}