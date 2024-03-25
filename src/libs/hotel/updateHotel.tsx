import { HotelItem } from "../../../interface"

export default async function updateHotel(hid:string, token:string, hotelUpdate:HotelItem) {
    const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/hotels" + hid,{
        method:"PUT",
        headers: {
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({
            name: hotelUpdate.name,
            address: hotelUpdate.address,
            tel: hotelUpdate.tel
        })
    })
    if(!response.ok) throw new Error("Cannot UPDATE Hotel")
    return response.json()

}