export default async function getBooking(bid:string, token:string) {
    const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/bookings" + bid,{
       method:"GET",
       headers:{
           authorization:`Bearer ${token}`   
       }
    })
    if(!response.ok) throw new Error("Cannot GET Booking")
    return response.json()

}