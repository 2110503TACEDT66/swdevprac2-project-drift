import Image from "next/image"
import InteractiveCard from "./InteractiveCard"
import Rating from "./Rating"

export default function Card(
    {data}:{data:HospitalItem}
    ){
    return(
        <InteractiveCard hid={data.id}>
            <Image src={data.picture} className="  rounded-t-lg" width={"350"} height={"250"} alt={""}/>
            <h2 className=" font-kanit text-[20px] text-slate-700 flex font-medium w-full min-h-[45px] h-fit mb-2 bg-sky-200 text-center justify-center items-center leading-tight">
                {data.name}
            </h2>

            <ul className="pl-3">
                <li> <b>Address:</b> {data.address}</li>
                <li> <b>District:</b> {data.district}</li>
                <li> <b>Province:</b> {data.province}</li>
                <li> <b>Postal Code:</b> {data.postalcode}</li>
                <li> <b>TEL:</b> {data.tel}</li>
            </ul>
     
        </InteractiveCard>
    )
}