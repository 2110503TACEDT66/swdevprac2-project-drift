import HotelCatalog from "@/components/HotelCatalog";
import getHotels from "@/libs/hotel/getHotels";
import { LinearProgress } from "@mui/material";
import { revalidateTag } from "next/cache";
import { Suspense } from "react";


export default async function Page(){

    const hotels = await getHotels();
    revalidateTag('hotelData')
    return(
        <Suspense fallback={<LinearProgress/>}>
            <HotelCatalog hotelsJson={hotels} />
        </Suspense>
    )
}