import Image from "next/image";
import Link from "next/link";
import Card from "./Card";

export default async function HospitalCatalog({hotelsJson}:{hotelsJson:Promise<HotelJson>}){
    
    const hotelsReady = await hotelsJson;

    return(
            <div className="flex flex-row flex-wrap justify-start mx-auto w-[95%] gap-x-5 gap-y-10 pt-10 pb-10">
                {
                    hotelsReady.data.map((elem , idx)=>(
                        <Link key={idx} href={`/hospital/${elem.id}`} className="">
                            <Card data={elem}/>
                        </Link>
                    ))
                }
            </div>
        )
}