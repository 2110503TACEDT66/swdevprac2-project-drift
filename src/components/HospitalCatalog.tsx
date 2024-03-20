import Image from "next/image";
import Link from "next/link";
import Card from "./Card";

export default async function HospitalCatalog({hospitalsJson}:{hospitalsJson:Promise<HospitalJson>}){
    
    const hospitalReady = await hospitalsJson;

    return(
        <div className="flex flex-row flex-nowrap gap-x-4 w-full justify-center">

            <div className="bg-blue-100 h-fit min-h-full">
                <div className="flex flex-row flex-wrap justify-center gap-x-12 gap-y-10 pt-10 pb-10">
                    {
                        hospitalReady.data.map((elem , idx)=>(
                            <Link key={idx} href={`/hospital/${elem.id}`}>
                                <Card data={elem}/>
                            </Link>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}