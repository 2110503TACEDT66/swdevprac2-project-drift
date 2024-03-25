export default async function createBooking(hid:string, token:string) {
    const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/hotels/" + hid + "/bookings",{
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({
            bookDate: Date.now()
        })
    })
    if(!response.ok) throw new Error("Cannot CREATE booking")
    return response.json()

}