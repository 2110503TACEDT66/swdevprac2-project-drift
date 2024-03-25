export default async function updateBooking(bid:string, token:string) {
    const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/bookings" + bid,{
        method:"PUT",
        headers: {
            authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({

        })
    })
    if(!response.ok) throw new Error("Cannot UPDATE Booking")
    return response.json()

}