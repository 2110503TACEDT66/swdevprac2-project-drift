export default async function getHotel(hid:string){
    const response = await fetch("https://swd-hotel-backend.vercel.app/api/v1/hotels/"+hid)
    if(!response.ok) throw new Error("Cannot fetch hotel id " + hid)
    return await response.json()
}