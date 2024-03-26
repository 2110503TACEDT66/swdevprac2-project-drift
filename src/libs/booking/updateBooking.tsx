import { HotelItem } from "../../../interface"

export default async function updateBooking(bid:string, token:string, hotel:HotelItem, bookDate:string) {
    const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/bookings/" + bid,{
        method:"PUT",
        headers: {
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({
            hotel: hotel,
            bookDate: bookDate
        })
    })
    if(!response.ok) throw new Error("Cannot UPDATE Booking")
    return response.json()

}