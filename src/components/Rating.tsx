"use client"
import { Rating } from "@mui/material"

export default function rating(data:{hosName:string,star:number|undefined,onChangeRating:Function}){
    
    return(
        <div className="pl-4 pr-4">
            <Rating size="large" defaultValue={5} value={data.star} precision={0.5}
                onChange={(e,value)=>{
                    e.stopPropagation();
                    e.preventDefault()
                    data.onChangeRating(data.hosName,value);
                }}
                onClick={(e)=>e.stopPropagation()}
                
                data-testid={`${data.hosName} Rating`}
                name={`${data.hosName} Rating`}
                id={`${data.hosName} Rating`}
            />
        </div>
    )
}