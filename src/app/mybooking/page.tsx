import BookingList from "@/components/BookingList"
import getBookings from "@/libs/booking/getBookings"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { populatedBookingItem } from "../../../interface";
import { revalidateTag } from "next/cache";

export default async function myBookingPage() {

    const session = await getServerSession(authOptions);
    var myBookingData:populatedBookingItem[];
    if(!session) myBookingData=[];
    else{
        const myBooking = await getBookings(session!.user.token);
        myBookingData=myBooking.data;
    }
    revalidateTag('bookingData');

    return (
        <main>
            <BookingList myBookingData={myBookingData}></BookingList>
        </main>
    )
}