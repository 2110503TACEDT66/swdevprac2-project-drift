import HotelCatalog from "@/components/HotelCatalog";
import getHotels from "@/libs/getHotels";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";


export default function Page(){

    const hotels = getHotels();

    return(
        <Suspense fallback={<LinearProgress/>}>
            <HotelCatalog hotelsJson={hotels} />
        </Suspense>
    )
}