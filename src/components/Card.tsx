"use client"
import Image from "next/image"
import Link from "next/link";
import { HotelItem } from "../../interface"
import { Button } from "@mui/material"
import { Session } from "next-auth"
import { useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";
import deleteHotel from "@/libs/hotel/deleteHotel";

export default function Card(
    {data, session}:{data:HotelItem, session:Session|null}
    ){

        const [showConfirmation, setShowConfirmation] = useState(false);
        const handleDelete = (hotelId: string) => {
            if (session){
                try {
                    deleteHotel(hotelId, session.user.token)
                    setTimeout(() => window.location.reload(), 1000);
                } catch (error) {
                    console.error(error)
                }
            }
        }

        const confirmDelete = () => {
            handleDelete(data.id);
            setShowConfirmation(false); // Close the confirmation pop-up
        }
    
        const cancelDelete = () => {
            setShowConfirmation(false); // Close the confirmation pop-up
        }

    return(
        <div className="flex flex-col box-border flex-nowrap bg-gray-800 w-[320px] h-[450px] gap-x-[15px] rounded-lg shadow-lg border-[1px] border-gray-700
            hover:border-gray-300
            transition-all">
            <Image src={"https://picsum.photos/350/250"} className="rounded-t-lg" width={"350"} height={"250"} alt={""}/>
            <h2 className="text-2xl text-gray-50 flex font-normal w-full min-h-[45px] h-fit mb-2 bg-gray-900 text-center justify-center items-center leading-tight">
                {data.name}
            </h2>

            <ul className="pl-3 text-gray-100 font-light text-lg">
                <li> <b>Address:</b> {data.address}</li>
                <li> <b>TEL:</b> {data.tel}</li>
            </ul>

            <div className="w-full flex justify-end mt-auto p-3 gap-x-2" onClick={(e) => e.preventDefault()}>
                {
                    session?.user.role === "admin"
                        ?   
                            <div>
                                <Button variant="contained" color="error" className="bg-red-600 hover:bg-red-700" onClick={() => {setShowConfirmation(true)}}>
                                    Delete
                                </Button>
                                {
                                    showConfirmation && (
                                        <ConfirmationPopup msg="Are you sure you want to delete this hotel?" confirm={confirmDelete} cancel={cancelDelete}/>
                                    )
                                }
                            </div>
                        : ''
                }
            </div>
        </div>
    )
}