"use client"
import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import bookSlice, { removeBooking } from "@/redux/features/bookSlice"

export default function BookingList() {

    const bookItems = useAppSelector( (state)=> state.bookItems )
    const dispatch = useDispatch<AppDispatch>() 

    return (
        <>
        {
            bookItems.length > 0
            ?   bookItems.map((bookingItem)=>(
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
            :   <div className="w-full text-center text-white mt-4 text-2xl">
                    You have no booking reservation
                </div>
        }
        </>
    )
}