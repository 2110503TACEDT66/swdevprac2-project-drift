import Image from "next/image";
import Link from "next/link";
import Card from "./Card";

export default async function HotelCatalog({hotelsJson}:{hotelsJson:Promise<HotelJson>}){
    
    const hotelsReady = await hotelsJson;

    return(
        <div className="mt-7 w-[95%] mx-auto">
            <h1 className="text-slate-100 text-2xl">{hotelsReady.count} hotels Available</h1>
            <div className="flex flex-row flex-wrap justify-start  gap-x-5 gap-y-10 pt-10 pb-10">
                {
                    hotelsReady.data.map((elem , idx)=>(
                        <Link key={idx} href={`/hotel/${elem.id}`} className="">
                            <Card data={elem}/>
                        </Link>
                    ))
                }
            </div>
        </div>
        )
}