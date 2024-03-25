import { HotelItem } from "../../../interface"

export default async function createHotel(hotel:HotelItem, token:string) {
    const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/hotels",{
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({
            name: hotel.name,
            address: hotel.address,
            tel: hotel.tel,
        })
    })
    if(!response.ok) throw new Error("Cannot CREATE Hotel")
    return response.json()

}