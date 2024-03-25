
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
    if(!response.ok){
        const errResult = await response.json()
        throw new Error(errResult.message)
    }
    return await response.json()
}