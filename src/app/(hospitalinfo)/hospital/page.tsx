import HospitalCatalog from "@/components/HospitalCatalog";
import getHospitals from "@/libs/getHospitals";
import getHotels from "@/libs/getHotels";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";


export default function Page(){

    const hotels = getHotels();

    return(
        <Suspense fallback={<LinearProgress/>}>
            <HospitalCatalog hotelsJson={hotels} />
        </Suspense>
    )
}