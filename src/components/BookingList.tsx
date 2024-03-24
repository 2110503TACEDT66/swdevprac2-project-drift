"use client"
import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import bookSlice, { removeBooking } from "@/redux/features/bookSlice"

export default function BookingList() {

    const bookItems = useAppSelector( (state)=> state.bookSlice.bookItems )
    const dispatch = useDispatch<AppDispatch>() 

    return (
        <>
        <div className="text-slate-100 text-xl mt-5 px-5 md:text-2xl">You have XXX bookings</div>
        {
            bookItems.map((bookingItem)=>(
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
                key={bookingItem.hotel}>
                    <div className="text-xl">{bookingItem.hotel}</div>
                    <div className="text-sm">{bookingItem.name}</div>
                    <div className="text-sm">{bookingItem.surname}</div>
                    <div className="text-sm">{bookingItem.id}</div>
                    <div className="text-sm">{bookingItem.bookDate}</div>
                    <button 
                        className='max-w-[500px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100%] transition-all'
                        onClick={()=> dispatch(removeBooking(bookingItem))}>
                            Remove Booking
                    </button>
                </div>
            ))
        }
        </>
    )
}