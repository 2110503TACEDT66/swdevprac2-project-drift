"use client"
import getUserProfile from "@/libs/getUserProfile"
import { useRouter } from "next/navigation"
import dayjs from 'dayjs';
import createHotel from "@/libs/hotel/createHotel"
import { HotelItem, userProfile } from "../../../../interface";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react"

import { CircularProgress } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';



export default function DashboardPage() {

    const[isCreating, setIsCreating] = useState(false);
    const msg = useRef<HTMLDivElement>(null);
    
    const {data:session,status} = useSession()
    const router = useRouter();
    if(!session || !session.user.token) return null


    const addHotel = (addHotelForm:FormData) => {
        
        if(isCreating) return;
        setIsCreating(true);

        const name = addHotelForm.get("name") as string
        const address = addHotelForm.get("address") as string
        const tel = addHotelForm.get("tel") as string
        const item:HotelItem = {
            name: name,
            address: address,
            tel: tel,
            id: "",
            _id: ""
        }

        createHotel(item, session.user.token)
            .then(res=>{
                msg.current!.innerText = ""
                router.push("/hotel");
            })
            .catch(err=>{
                msg.current!.innerText = "Fail to created hotel. Please try again"
            })
        
        setTimeout(()=>{setIsCreating(false);},1500)
    }

    var [profile,setProfile] = useState<userProfile>();
    var createdAt;
    useEffect(()=>{
        const fetchProfile = async()=>{
            const response = await getUserProfile(session.user.token);
            setProfile(response)
        }
        fetchProfile().catch(console.error)
        
    },[]);
    
    
    // const profile = await getUserProfile(session.user.token);
    // const createdAt = new Date(profile!.data.createdAt)
    if(!profile) {return null}
    createdAt = new Date(profile.data.createdAt)

    return (
        <main className=" mt-5 mx-auto space-y-7 px-3 w-full">
            <table className="bg-slate-100 mx-auto table-auto border-separate border-spacing-2 p-3 rounded-md max-w-xl min-w-[40%]">
                <tbody>
                    <tr><td colSpan={2} className="text-2xl text-center mb-3"> <AccountCircleIcon fontSize="medium" />
                        {profile.data.name} <span className="text-lg text-gray-600"> ({profile!.data.role})</span>
                    </td></tr>
                    <tr><td>Email</td><td>{profile!.data.email}</td></tr>
                    <tr><td>Tel.</td><td>{profile!.data.tel}</td></tr>
                    <tr><td>Member Since</td><td>{dayjs(createdAt).format("DD/MM/YYYY")}</td></tr>
                </tbody>
            </table>

            {
                (profile!.data.role=="admin")?
                <form action={addHotel} className="flex flex-col flex-nowrap mx-auto max-w-[800px] bg-slate-100 rounded-md p-3">

                    {
                      isCreating
                          ? <div className="absolute top-0 left-0 flex flex-col gap-y-3 justify-center items-center rounded-lg text-slate-50 w-full h-full bg-black/30 z-[9999]">
                              <CircularProgress thickness={6}/>
                              <div>creating hotel...</div>
                            </div>
                          :''
                    }
                    

                    <div className="text-xl lg:text-2xl 2xl:text-3xl text-blue-700 text-center">Create Hotel</div>
                        <table className="w-full bg-slate-100 mx-auto table-auto border-separate border-spacing-2 p-3 rounded-md max-w-2xl">
                            <tbody>
                                <tr>
                                    <td>
                                        <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Name</label>
                                    </td>
                                    <td>
                                        <input type='text' required id="name" name="name" placeholder="Hotel Name"
                                        className="bg-white border-2 border-gray-200 rounded w-full h-fit p-2
                                        text-gray-700 focus:outline-none focus-border-blue-400"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="w-auto block text-gray-700 pr-4" htmlFor="address">Address</label>
                                    </td>
                                    <td>
                                        <textarea required id="address" name="address" placeholder="Hotel Address"
                                        className="bg-white border-2 border-gray-200 rounded w-full min-h-24 p-2
                                        text-gray-700 focus:outline-none focus-border-blue-400"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className="w-auto block text-gray-700 pr-4" htmlFor="tel">Tel.</label>
                                    </td>
                                    <td>
                                        <input type='text' required id="tel" name="tel" placeholder="Hotel Tel. number"
                                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                                        text-gray-700 focus:outline-none focus-border-blue-400"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    <div ref={msg} className="text-red-700 text-lg min-h-7 text-center md:text-end md:mr-20">
                        
                    </div>

                    <button type="submit"
                        className="bg-blue-500 mx-auto mt-3 mb-3 hover:bg-blue-600 text-white p-2 w-[90%] max-w-2xl rounded transition-colors"
                    >
                        Add New Hotel
                    </button>
                </form>
                :null
            }

        </main>
    )
}