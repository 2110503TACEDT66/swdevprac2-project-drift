"use client"
import { populatedBookingItem } from "../../interface"

export default function BookingList({myBookingData}:{myBookingData:populatedBookingItem[]}) {


    return (
        <>
        <div className="text-slate-100 text-xl mt-5 px-5 md:text-2xl">You have {myBookingData.length} bookings</div>
        {
            myBookingData.length > 0
            ?   myBookingData.map((bookingItem:populatedBookingItem)=>(
                  <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-5"
                  key={bookingItem._id}>
                      <div className="text-xl">{bookingItem.bookDate}</div>
                      <div className="text-xl">Booking id: {bookingItem._id}</div>
                      <div className="text-xl">Hotel: {bookingItem.hotel.name}</div>
                      <button 
                          className='max-w-[500px] ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100%] transition-all'
                          onClick={()=> ""}>
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