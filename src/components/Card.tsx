"use client"
import Image from "next/image"
import InteractiveCard from "./InteractiveCard"
import Rating from "./Rating"
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
            if (session)
                deleteHotel(hotelId, session.user.token)
        }

        const confirmDelete = () => {
            handleDelete(data.id);
            setShowConfirmation(false); // Close the confirmation pop-up
        }
    
        const cancelDelete = () => {
            setShowConfirmation(false); // Close the confirmation pop-up
        }

    return(
        <InteractiveCard hid={data.id}>
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
                            <Button variant="contained" className="bg-red-500" onClick={() => {setShowConfirmation(true)}}>
                                Delete
                            </Button>
                            {
                                showConfirmation && (
                                    <ConfirmationPopup msg="Are you sure you want to delete this hotel?" confirm={confirmDelete} cancel={cancelDelete}/>
                                )
                            }
                        </div>
                    : null
                }

                {
                    session
                    ?   <Link href={`/booking?id=${data.id}&name=${data.name}`}>
                            <Button variant="contained" className="bg-blue-500">
                                Book Now
                            </Button>
                        </Link>
                    : null
                }
                </div>
        </InteractiveCard>
    )
}