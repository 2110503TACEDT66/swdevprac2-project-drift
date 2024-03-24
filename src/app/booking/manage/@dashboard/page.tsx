import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import getUserProfile from "@/libs/getUserProfile"
import Hotel from "@/db/names/Hotel"
import { dbConnect } from "@/db/dbConnect"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export default async function DashboardPage() {

    const addHotel = async (addHotelForm:FormData) => {
        "use server"
        const name =addHotelForm.get("name")
        const address =addHotelForm.get("address")
        const district =addHotelForm.get("district")
        const province =addHotelForm.get("province")
        const postalcode =addHotelForm.get("postalcode")
        const tel =addHotelForm.get("tel")
        const region =addHotelForm.get("region")

        try {
            await dbConnect()
            const hotels = await Hotel.create({
                "name": name,
                "address": address,
                "district": district,
                "province": province,
                "postalcode": postalcode,
                "tel": tel,
                "region": region,
            })
        }
        catch(error) {
            console.log(error)
        }
        revalidateTag("hotels")
        redirect("/hotel")
    }

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null

    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt)

    return (
        <main className="bg-slate-100 m-5 p-5">
            <div className="text-2xl">{profile.data.name}</div>
            <table className="table-auto border-separate border-spaceing-2"><tbody>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.tel}</td></tr>
                <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
            </tbody></table>

            {
                (profile.data.role=="admin")?
                <form action={addHotel}>
                    <div className="text-xl text-blue-700">Create Hotel Catalog</div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Name</label>
                        <input type='text' required id="name" name="name" placeholder="Hotel Name"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus-border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="address">Address</label>
                        <input type='text' required id="address" name="address" placeholder="Hotel Address"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus-border-blue-400"
                        />
                    </div>    
                        <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="district">District</label>
                        <input type='text' required id="district" name="district" placeholder="Hotel District"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus-border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="province">Province</label>
                        <input type='text' required id="province" name="province" placeholder="Hotel Province"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus-border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="postalcode">Postalcode</label>
                        <input type='text' required id="postalcode" name="postalcode" placeholder="Hotel Postalcode"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus-border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="tel">Tel.</label>
                        <input type='text' required id="tel" name="tel" placeholder="Hotel Tel. number"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus-border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="region">Region</label>
                        <input type='text' required id="region" name="region" placeholder="Hotel Region"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus-border-blue-400"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700
                    text-white p-2 rounded">Add New Hotel</button>
                </form>
                :null
            }

        </main>
    )
}