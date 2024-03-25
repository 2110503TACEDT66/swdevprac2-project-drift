import getHotel from "@/libs/hotel/getHotel";
import Image from "next/image";
import Link from "next/link";

export default async function Page({params}:{params:{hid:string}}){


    const hotel = await getHotel(params.hid);

    return(
        hotel
        ?   
            <div className="space-y-5 flex flex-col pb-7">
                <div className=" bg-gray-800 border-[1px] border-gray-700 md:h-[70%] w-full md:w-[80%] items-stretch  p-4 ml-auto mr-auto md:mt-10 justify-center flex flex-row flex-wrap gap-5">            
        
                    <Image src={"https://picsum.photos/500/600"} alt={""} width={"500"} height={"600"} className="md:w-[35%] h-auto object-fill" priority={true}/>
        
                   <div className=" font-kanit bg-slate-300 rounded-sm  w-full md:w-[60%] p-3">
                        <div className="text-4xl w-full h-fit border-b-2 border-slate-500">
                            {hotel.data.name}
                        </div>
                        <ul className=" mt-5 w-full space-y-2 indent-2 font-kanit font-light text-[1.25em]">
                            <li> <b>Address:</b> {hotel.data.address}</li>
                            <li> <b>TEL:</b> {hotel.data.tel}</li>
                        </ul>
                   </div>
                </div>
                <Link href={`/booking?id=${params.hid}&name=${hotel.data.name}`} className="mx-auto w-fit h-fit">
                    <button className=" bg-white font-medium text-xl rounded-md p-3 hover:scale-105 hover:bg-indigo-600 hover:text-slate-100 transition-all">
                        BOOK NOW
                    </button>
                </Link>
            </div>
            :   
            <div>
                hotel Data {params.hid} not found
            </div>
    )
}