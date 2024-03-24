import TopMenuItem from "./TopMenuItem"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Link, Hidden } from "@mui/material"
import DrawerPanel from "./DrawerPanel"

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Login, Logout } from '@mui/icons-material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import QueueIcon from '@mui/icons-material/Queue';

export default async function TopMenu(){

    const session = await getServerSession(authOptions)

    return(
        <div className=" flex flex-row flex-nowrap justify-end h-16 w-full bg-gray-950 text-gray-100 gap-x-4 pl-4 pr-4 border-b-[3px] border-b-gray-600">
            <Hidden smUp>
                <DrawerPanel>
                    {
                        session
                            ?   <Link href={"/api/auth/signout"} className="w-full h-fit p-2 pl-3 pr-3 mt-auto mb-auto text-center text-gray-100
                                    text-3xl hover:bg-slate-800 " underline="none">
                                    <div className="text-gray-100"> <Logout fontSize="medium"/> &nbsp;Sign-Out</div>
                                </Link>
                            :   <div className="flex flex-col justify-center items-center w-full h-full gap-y-5">
                                    <Link href={"/api/auth/signin"} className="w-full h-fit p-2 pl-3 pr-3 mt-auto mb-auto text-center text-gray-100
                                    text-3xl hover:bg-slate-800 " underline="none">
                                        <div className="text-gray-100"> <Login fontSize="medium" /> &nbsp;Sign-In</div>
                                    </Link>
                                    <Link href={"/api/auth/register"} className="w-full h-fit p-2 pl-3 pr-3 mt-auto mb-auto text-center text-gray-100
                                    text-3xl hover:bg-slate-800 " underline="none">
                                        <div className="text-gray-100"> <AssignmentIndIcon fontSize="medium" /> &nbsp;Register</div>
                                    </Link>
                                </div>
                    }

                    <Link href="/mybooking" underline="none" className="w-full text-center p-2 pl-3 pr-3 text-3xl hover:bg-slate-800 text-gray-100">
                        <div className="text-gray-100"> <AutoStoriesIcon fontSize="medium" /> &nbsp;&nbsp;My Booking</div>
                    </Link>

                    <Link href="/booking" underline="none" className="w-full text-center p-2 pl-3 pr-3 text-3xl hover:bg-slate-800 text-gray-100">
                        <div className="text-gray-100"> <QueueIcon fontSize="medium" /> &nbsp;&nbsp;Booking</div>
                    </Link>

                </DrawerPanel>
            </Hidden>

            <Hidden smDown>
                {
                    session
                        ?   <div className="flex justify-end mb-auto mt-auto"><TopMenuItem title={"Sign-Out"} pageRef="/api/auth/signout"/></div>
                        :   <div className="flex justify-end mb-auto mt-auto">
                                <TopMenuItem title={"Sign-In"} pageRef="/api/auth/signin"/>
                                <TopMenuItem title={"Register"} pageRef="/api/auth/register"/>
                            </div>
                }

                <div className="flex justify-end mb-auto mt-auto"><TopMenuItem title={"My Booking"} pageRef="/mybooking"/></div>
                <TopMenuItem title={"Booking"} pageRef="/booking"/>
            </Hidden>
            
            <Link href={"/"}>
                <Image src={"/img/logo.png"} width={512} height={512} alt="logo"
                    className=" size-16 p-1"
                />
            </Link>
        </div> 
    )
}