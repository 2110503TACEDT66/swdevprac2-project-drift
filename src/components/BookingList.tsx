"use client"
import { populatedBookingItem } from "../../interface"
import deleteBooking from "@/libs/booking/deleteBooking"
import { useSession } from "next-auth/react"
import { useRef } from "react"

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from "@mui/material"

import { useState } from "react";

export default function BookingList({ myBookingData }: { myBookingData: populatedBookingItem[] }) {
    const { data: session, status } = useSession();
    const errorBox = useRef<HTMLDivElement>(null);
    const popupBox = useRef<HTMLDivElement>(null);

    const [bookings, setBookings] = useState<populatedBookingItem[]>(myBookingData);

    const removeBooking = async (bookingId: string) => {

        if (errorBox.current) {
            errorBox.current.innerText = "";
        }
        try {
            await deleteBooking(bookingId, session!.user.token);
            setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
            if (popupBox.current) {
                popupBox.current.style.display = "flex";
            }
        } catch (error) {
            if (errorBox.current) {
                errorBox.current.innerText = "Cannot delete booking. Please try again.";
            }
        }

    }

    return (
        <>
            <div className="text-slate-100 text-xl mt-5 px-5 md:text-2xl">You have {bookings.length} bookings</div>
            {bookings.length > 0 ? (
                bookings.map((bookingItem: populatedBookingItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-5" key={bookingItem._id}>
                        <div className="text-xl">{bookingItem.bookDate}</div>
                        <div className="text-xl">Booking id: {bookingItem._id}</div>
                        <div className="text-xl">Hotel: {bookingItem.hotel.name}</div>
                        <button
                            className='max-w-[500px] ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100%] transition-all'
                            onClick={() => removeBooking(bookingItem._id)}>
                            Remove Booking
                        </button>
                    </div>
                ))
            ) : (
                <div className="w-full text-center text-white mt-4 text-2xl">
                    You have no booking reservations
                </div>
            )}
            {
          <div className='absolute top-0 left-0 z-[9999] hidden items-center w-full h-full bg-black/30' ref={popupBox}>
            <div className="relative flex flex-col gap-y-3 mx-auto p-2 justify-center text-center
                            rounded-lg text-green-500 text-2xl bg-slate-50 
                            border-2 border-slate-400 w-[450px] h-[250px]">
              <button className='absolute top-3 right-3'
                onClick={()=>popupBox.current!.style.display = "none"}>
                <CloseIcon fontSize="large" className=' text-slate-400 hover:text-slate-600'/>
              </button>
              <CheckCircleOutlineIcon fontSize="large" className='self-center'/>
              <div>YOUR BOOKING HAS BEEN DELETED !</div>
            </div>
          
          </div>
        }
        </>
    )
}
