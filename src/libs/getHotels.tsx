export default async function getHotels(){
    const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/hotels");
    if(!response.ok) {throw new Error("cannot fetch hotels")}
    return await response.json()
}