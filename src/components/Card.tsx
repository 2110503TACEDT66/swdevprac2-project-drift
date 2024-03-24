import Image from "next/image"
import InteractiveCard from "./InteractiveCard"
import Rating from "./Rating"
import { HotelItem } from "../../interface"

export default function Card(
    {data}:{data:HotelItem}
    ){
    return(
        <InteractiveCard hid={data.id}>
            <Image src={"https://picsum.photos/350/250"} className="rounded-t-lg" width={"350"} height={"250"} alt={""}/>
            <h2 className="text-2xl text-gray-50 flex font-normal w-full min-h-[45px] h-fit mb-2 bg-gray-900 text-center justify-center items-center leading-tight">
                {data.name}
            </h2>

            <ul className="pl-3 text-gray-100 font-light text-lg">
                <li> <b>District:</b> {data.district}</li>
                <li> <b>Address:</b> {data.address}</li>
                <li> <b>Province:</b> {data.province}</li>
                <li> <b>TEL:</b> {data.tel}</li>
            </ul>
     
        </InteractiveCard>
    )
}