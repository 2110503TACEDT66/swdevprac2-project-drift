export default async function deleteBooking(bid:string, token:string) {
    const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/bookings" + bid,{
        method:"DELETE",
        headers: {
            authorization:`Bearer ${token}`,
        }
    })
    if(!response.ok) throw new Error("Cannot DELETE Booking")
    return response.json()

}