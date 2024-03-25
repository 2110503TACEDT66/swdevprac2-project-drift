export default async function deleteHotel(hid:string, token:string) {
    const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/hotels" + hid,{
        method:"DELETE",
        headers: {
            authorization:`Bearer ${token}`,
        }
    })
    if(!response.ok) throw new Error("Cannot DELETE Hotel")
    return response.json()

}