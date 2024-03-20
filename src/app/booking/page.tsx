import DateResereve from "@/components/DateReserve";
import getUserProfile from "@/libs/getUserProfile";
import { Select, TextField , MenuItem} from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Page(){
    
    const session = await getServerSession(authOptions);
    if(!session || !session.user.token) return null
    const profile = await getUserProfile(session.user.token);
    
    
    return(
        <div className="h-full w-full flex mt-4 flex-col flex-nowrap">

                <div className="self-center p-4 relative bg-slate-100 rounded-md font-light text-lg shadow-md">
                <table cellPadding={5}>
                    <th colSpan={2} className="text-xl">User Profile</th>
                    <tr className="">
                        <td className="font-medium border-r-2 border-r-slate-400">Name</td>
                        <td className="pl-2">{profile.data.name}</td>
                    </tr>
                    <tr className="">
                        <td className="font-medium border-r-2 border-r-slate-400">Email</td>
                        <td className="pl-2">{profile.data.email}</td>
                    </tr>
                    <tr className="">
                        <td className="font-medium border-r-2 border-r-slate-400">Tel</td>
                        <td className="pl-2">{profile.data.tel}</td>
                    </tr>
                    <tr className="">
                        <td className="font-medium border-r-2 border-r-slate-400">Member Since</td>
                        <td className="pl-2">{new Date(profile.data.createdAt).toString()}</td>
                    </tr>
                    
                </table>
                </div>

        <div className="mx-auto mt-5 flex flex-col w-fit h-fit text-center text-2xl font-bold bg-slate-100 rounded-lg pt-10 shadow-md">
   
            Vaccine Booking
            <form action="" method="Post" className="flex flex-col p-10 gap-y-3">
                <TextField variant="standard" name={"Name-Lastname"} label={"Name-Lastname"} className="h-12" required/>
                <TextField variant="standard" name={"Citizen ID"} label={"Citizen ID"} className="h-12" required/>
                
                <div className="self-start text-[16px] text-gray-500 pl-1 mt-2 font-semibold">hospital</div>
                <Select name="hospital" id={"hospital"} labelId="hospital-label" variant="standard" className=" w-full h-12 text-left" required>
                    <MenuItem value={"Chula"}>Chulalongkorn Hospital</MenuItem>
                    <MenuItem value={"Rajavithi"}>Rajavithi Hospital</MenuItem>
                    <MenuItem value={"Thammasat"}>Thammasat University Hospital</MenuItem>
                </Select>
                <div className="self-start text-[16px] text-gray-500 pl-1 mt-2 font-semibold">reserve Date</div>
                <DateResereve/>
                <button type="submit" name="Book Vaccine" className="bg-white text-gray-700 mt-2 border-2 p-2 rounded-lg font-semibold hover:scale-105 hover:border-gray-700 hover:bg-blue-200  transition-all ease-in-out">Book Vaccine</button>
            </form>        
        </div>

        </div>
    )
}