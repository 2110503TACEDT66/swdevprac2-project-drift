import TopMenuItem from "./TopMenuItem"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Link } from "@mui/material"

export default async function TopMenu(){

    const session = await getServerSession(authOptions)

    return(
        <div className=" flex flex-row flex-nowrap h-16 w-full justify-end bg-gray-950 text-gray-100 gap-x-4 pl-4 pr-4 border-b-[3px] border-b-gray-600">
            {
                session
                    ?   <Link href={"api/auth/signout"} className="w-fit h-fit text-gray-100 p-2 pl-3 pr-3 mt-auto mb-auto text-xl font-bold hover:bg-slate-700 hover:rounded-2xl" underline="none">
                            <div>Sign-Out</div>
                        </Link>
                    :   <Link href={"api/auth/signin"} className="w-fit h-fit text-gray-100 p-1 pl-3 pr-3 mt-auto mb-auto text-xl font-bold hover:bg-slate-700 hover:rounded-2xl" underline="none">
                            <div>Sign-In</div>
                        </Link>
            }
            
            <TopMenuItem title={"Booking"} pageRef="/booking"/>
            <Link href={"/"}>
                <Image src={"/img/logo.png"} width={800} height={800} alt="logo"
                    className=" size-16 p-1"
                />
            </Link>
        </div>
    )
}