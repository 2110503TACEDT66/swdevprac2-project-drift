import TopMenuItem from "./TopMenuItem"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Link, Hidden } from "@mui/material"
import DrawerPanel from "./DrawerPanel"
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import { Login, Logout } from '@mui/icons-material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export default async function TopMenu(){

    const session = await getServerSession(authOptions)

    return(
        <div className=" flex flex-row flex-nowrap h-16 w-full justify-end bg-gray-950 text-gray-100 gap-x-4 pl-4 pr-4 border-b-[3px] border-b-gray-600">
            <Hidden smUp>
                <DrawerPanel>
                    {
                        session
                            ?   <Link href={"/api/auth/signout"} className="w-full h-fit p-2 pl-3 pr-3 mt-auto mb-auto text-center text-gray-100
                                    text-3xl hover:bg-slate-700 " underline="none">
                                    <div> <Logout fontSize="medium"/> Sign-Out</div>
                                </Link>
                            :   <div className="flex flex-col justify-center items-center w-full h-full">
                                    <Link href={"/api/auth/signin"} className="w-full h-fit p-1 pl-3 pr-3 mt-auto mb-auto text-center text-gray-100
                                    text-3xl hover:bg-slate-700 " underline="none">
                                        <div> <Login fontSize="medium"/> Sign-In</div>
                                    </Link>
                                    <Link href={"/api/auth/register"} className="w-full h-fit p-2 pl-3 pr-3 mt-auto mb-auto text-center text-gray-100
                                    text-3xl hover:bg-slate-700 " underline="none">
                                        <div> <AssignmentIndIcon fontSize="medium" /> Register</div>
                                    </Link>
                                </div>
                    }
                    
                    <Link href="/booking" className="w-full text-center p-2 pl-3 pr-3 text-3xl no-underline hover:bg-slate-700 text-gray-100">
                        <AutoStoriesIcon fontSize="medium" /> &nbsp;&nbsp;Booking
                    </Link>
                </DrawerPanel>
            </Hidden>

            <Hidden smDown>
                {
                    session
                        ?   <Link href={"/api/auth/signout"} className="w-fit h-fi p-2 pl-3 pr-3 mt-auto mb-auto text-gray-100
                            text-2xl font-bold hover:bg-slate-700 hover:rounded-2xl " underline="none">
                                <div>Sign-Out</div>
                            </Link>
                        :   <div className="flex flex-row justify-center items-center w-fit h-full">
                                <Link href={"/api/auth/signin"} className="w-fit h-fit p-1 pl-3 pr-3 mt-auto mb-auto text-gray-100
                                text-2xl font-bold hover:bg-slate-700 hover:rounded-2xl " underline="none">
                                    <div>Sign-In</div>
                                </Link>
                                <Link href={"/api/auth/register"} className="w-fit h-fit p-2 pl-3 pr-3 mt-auto mb-auto text-gray-100
                                text-2xl font-bold hover:bg-slate-700 hover:rounded-2xl " underline="none">
                                    <div>Register</div>
                                </Link>
                            </div>
                }
                
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