import HospitalCatalog from "@/components/HospitalCatalog";
import getHospitals from "@/libs/getHospitals";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";


export default function Page(){

    const hospitals = getHospitals();

    return(
        <Suspense fallback={<LinearProgress/>}>
            <HospitalCatalog hospitalsJson={hospitals} />
        </Suspense>
    )
}