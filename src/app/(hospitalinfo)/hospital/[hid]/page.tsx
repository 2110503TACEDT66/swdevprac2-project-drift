import getHospital from "@/libs/getHospital";
import Image from "next/image";


export default async function Page({params}:{params:{hid:string}}){


    const hospital= await getHospital(params.hid);  
    

    return(
        hospital
        ?   
            <div className=" bg-slate-100 h-fit w-fit p-4 ml-auto mr-auto mt-10 justify-center flex flex-row flex-wrap gap-5">            
      
                <Image src={hospital.data.picture} alt={""} width={"500"} height={"600"} className="w-full md:w-[40%] h-auto object-contain" priority={true}/>
     
               <div className=" font-kanit  bg-blue-200 rounded-md h-fit w-full md:w-[55%] p-3">
                    <div className="text-3xl w-full h-fit bg-blue-200 border-b-4 border-blue-950 drop-shadow-lg bg-opacity-60">
                        {hospital.data.name}
                    </div>

                    <ul className=" mt-5 w-full space-y-2 font-kanit font-light text-[1.25em]">
                        <li> <b>Address:</b> {hospital.data.address}</li>
                        <li> <b>District:</b> {hospital.data.district}</li>
                        <li> <b>Province:</b> {hospital.data.province}</li>
                        <li> <b>Postal Code:</b> {hospital.data.postalcode}</li>
                        <li> <b>TEL:</b> {hospital.data.tel}</li>
                    </ul>
               </div>
            </div>
        :
            <div>
                Hospital Data {params.hid} not found
            </div>
    )
}