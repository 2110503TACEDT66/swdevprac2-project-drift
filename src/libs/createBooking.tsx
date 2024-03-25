import dayjs from "dayjs";
import { BookingItem} from "../../interface";

export default async function createBooking(hid:string , date:string ,token:string){
    const response = await fetch(`https://swd-hotel-backend.vercel.app/api/v1/hotels/${hid}/bookings/`,{
        method:"POST",
        mode:"cors",
        cache:"no-cache",
        headers:{
            "Content-Type":"application/json",
            authorization:`Bearer ${token}`   
        },
        body: JSON.stringify({
            bookDate:date
        })
    })
    if(!response.ok) throw new Error("cannot create booking")
    return await response.json()
}