"use client"

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


export default function DateResereve(){
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker className=" mt-4 mb-4"/>
        </LocalizationProvider>
    )
}