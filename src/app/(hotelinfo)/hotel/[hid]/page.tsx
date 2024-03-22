import getHotel from "@/libs/getHotel";
import Image from "next/image";


export default async function Page({params}:{params:{hid:string}}){


    const hotel= await getHotel(params.hid);  

    return(
        hotel
        ?   
            <div className=" bg-gray-800 border-[1px] border-gray-700 md:h-[70%] w-full md:w-[80%] p-4 ml-auto mr-auto mt-10 justify-center flex flex-row flex-wrap gap-5">            
      
                <Image src={"https://picsum.photos/500/600"} alt={""} width={"500"} height={"600"} className="md:w-[35%] h-auto object-fill" priority={true}/>
     
               <div className=" font-kanit bg-slate-300 rounded-md h-full w-full md:w-[60%] p-3">
                    <div className="text-4xl w-full h-fit border-b-2 border-slate-500">
                        {hotel.data.name}
                    </div>

                    <ul className=" mt-5 w-full space-y-2 indent-2 font-kanit font-light text-[1.25em]">
                        <li> <b>Address:</b> {hotel.data.address}</li>
                        <li> <b>District:</b> {hotel.data.district}</li>
                        <li> <b>Province:</b> {hotel.data.province}</li>
                        <li> <b>Postal Code:</b> {hotel.data.postalcode}</li>
                        <li> <b>TEL:</b> {hotel.data.tel}</li>
                    </ul>
               </div>
            </div>
        :
            <div>
                hotel Data {params.hid} not found
            </div>
    )
}