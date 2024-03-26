"use client"
import { populatedBookingItem } from "../../interface"
import deleteBooking from "@/libs/booking/deleteBooking"
import { useSession } from "next-auth/react"
import { useRef } from "react"
import { useEffect } from "react"
import Loading from "@/app/booking/loading"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Select, MenuItem } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { HotelItem } from "../../interface"
import { useState } from "react";
import updateBooking from "@/libs/booking/updateBooking"
import DateReserve from "./DateReserve"

export default function BookingList({ myBookingData }: { myBookingData: populatedBookingItem[] }) {
    const { data: session, status } = useSession();
    const errorBox = useRef<HTMLDivElement>(null);
    const popupBox = useRef<HTMLDivElement>(null);

    const [bookings, setBookings] = useState<populatedBookingItem[]>(myBookingData);

    const removeBooking = async (bookingId: string) => {

        if (errorBox.current) {
            errorBox.current.innerText = "";
        }
        try {
            await deleteBooking(bookingId, session!.user.token);
            setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
            if (popupBox.current) {
                popupBox.current.style.display = "flex";
            }
        } catch (error) {
            if (errorBox.current) {
                errorBox.current.innerText = "Cannot delete booking. Please try again.";
            }
            console.log(error);
        }
        
    }

    const [editState, setEditState] = useState<{ editing: boolean, bookingId: string | null }>({ editing: false, bookingId: null });
    const [editedBooking, setEditedBooking] = useState<populatedBookingItem | null>(null);

    const[hotelData, setHotelData] = useState<HotelItem[]>([]);
    const[isLoading, setLoading] = useState(true);

    useEffect(()=>{
        fetch("https://swd-hotel-backend.vercel.app/api/v1/hotels")
          .then(res => res.json())
          .then(data =>{
            setHotelData(data.data);
            setLoading(false);
          });
      },[])
      if(isLoading) return <Loading/>
      if(hotelData.length==0) setHotelData([])
    

    const editBooking = (bookingId: string) => {
        const bookingToEdit = bookings.find(booking => booking._id === bookingId);
        if (bookingToEdit) {
            setEditedBooking(bookingToEdit); // Current booking to edit
            setEditState({ editing: true, bookingId });
        }
    }

    const cancelEdit = () => {
        setEditedBooking(null);
        setEditState({ editing: false, bookingId: null });
    }

    
    const updateBookingDetails = async () => {
        try {
            if (editState.bookingId) {
                // Update the booking on the backend
                await updateBooking(editState.bookingId, session!.user.token, editedBooking!.hotel, editedBooking!.bookDate);
                
                // Update the local state with the edited booking data
                setBookings(prevBookings => prevBookings.map(booking => {
                    if (booking._id === editState.bookingId) {
                        return editedBooking!;
                    }
                    return booking;
                }));
    
                // Reset the edit state
                setEditedBooking(null);
                setEditState({ editing: false, bookingId: null });
            }
        } catch (error) {
            console.error("Error updating booking:", error);
        }
    }
    

    const updateBookingDate = (newDate: Dayjs) => {
        setEditedBooking(prevState => ({
            ...prevState!,
            bookDate: dayjs(newDate).format("YYYY/MM/DD")
        }));
    }

    const updateBookingHotel = (newHotel: string) => {
        const findHotel = hotelData.find(h => h._id === newHotel)

        console.log(findHotel)
        if (!findHotel) {
            return
        }
        
        setEditedBooking(prevState => ({
            ...prevState!,
            hotel: findHotel
        }))
    }

    return (
        <div>
            {
                session?.user.role === "admin"
                ?   <div className="text-slate-100 text-xl mt-5 px-5 md:text-2xl">
                        Total bookings are {bookings.length}
                    </div>
                :   <div className="text-slate-100 text-xl mt-5 px-5 md:text-2xl">
                        You have {bookings.length} bookings
                    </div>
            }
            <div className="w-full flex flex-col justify-center items-center">
                {bookings.length > 0 ? (
                    bookings.map((bookingItem: populatedBookingItem) => (
                        <div className="bg-slate-200 rounded m-5 p-3 w-[95%] md:max-w-[600px] flex flex-col items-end" key={bookingItem._id}>
                            <table className="mx-auto border-separate border-spacing-2 rounded-md min-w-[40%]">
                                <tbody>
                                    <tr>
                                        <td className="text-sm md:text-xl break-all">Booking ID</td>
                                        <td className="text-sm md:text-xl break-all">{bookingItem._id}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-sm md:text-xl break-all">User ID</td>
                                        <td className="text-sm md:text-xl break-all">{bookingItem.user}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-sm md:text-xl break-all">Hotel</td>
                                        <td className="text-sm md:text-xl break-all">
                                        {
                                            editState.editing && editState.bookingId === bookingItem._id ? (
                                                // Render editable field if currently editing this booking
                                                <div className="w-[80%] p-3">
                                                <div className='self-start pl-1 font-light text-gray-500'>Select hotel</div>
                                                    <Select id="hotel" variant='standard' className="w-[100%]" onChange={(e)=>updateBookingHotel(e.target.value as string)}>
                                                      {
                                                          hotelData.map((elem,_)=>(
                                                              <MenuItem key={elem.id} value={elem.id}>
                                                                  {elem.name}
                                                              </MenuItem>
                                                          ))
                                                      }
                                                    </Select>
                                                </div>
                                            ) : (
                                                // Render non-editable field if not editing this booking
                                                <Button className="bg-indigo-200 text-black hover:bg-indigo-300 shadow-md p-1 pl-2 pr-2 text-sm  md:text-base font-kanit rounded-sm transition-colors"
                                                    href={`/hotel/${bookingItem.hotel.id}`}>    
                                                    {bookingItem.hotel.name}
                                                </Button>
                                            )
                                        }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-sm md:text-xl break-all">Book for</td>
                                        <td className="text-sm md:text-xl break-all">
                                        {
                                            editState.editing && editState.bookingId === bookingItem._id ? (
                                            // Render editable field if currently editing this booking
                                            <DateReserve onDateChange={(value:Dayjs) => updateBookingDate(value)} />
                                        ) : (
                                            // Render non-editable field if not editing this booking
                                            dayjs(bookingItem.bookDate).format('DD/MM/YYYY')
                                        )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="flex flex-row gap-2">
                                {
                                    editState.editing && editState.bookingId === bookingItem._id ? (
                                        // Render save and cancel buttons if currently editing this booking
                                        <>
                                            <Button variant="contained" color="success" className="bg-green-700 font-bold rounded w-fit" onClick={updateBookingDetails}>Save</Button>
                                            <Button variant="contained" className="bg-blue-500 font-bold rounded w-fit" onClick={cancelEdit}>Cancel</Button>
                                        </>
                                    ) : (
                                        // Render edit button if not editing this booking
                                        <Button variant="contained" className="bg-blue-500 font-bold rounded w-fit" onClick={() => editBooking(bookingItem._id)}>Edit</Button>
                                    )
                                }
                                <Button
                                    variant="contained"
                                    color="error"
                                    className='bg-red-500 font-bold rounded w-fit'
                                    onClick={() => removeBooking(bookingItem._id)}>
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full text-center text-white mt-4 text-2xl">
                        You have no booking reservations
                    </div>
                )}
            </div>
            {
          <div className='absolute top-0 left-0 z-[9999] hidden items-center w-full h-full bg-black/30' ref={popupBox}>
            <div className="relative flex flex-col gap-y-3 mx-auto p-2 justify-center text-center
                            rounded-lg text-orange-600 text-2xl bg-slate-50 
                            border-2 border-slate-400 w-[450px] h-[250px]">
              <button className='absolute top-3 right-3'
                onClick={()=>popupBox.current!.style.display = "none"}>
                <CloseIcon fontSize="large" className=' text-slate-400 hover:text-slate-600'/>
              </button>
              <CheckCircleOutlineIcon fontSize="large" className='self-center' color="warning" />
              <div>YOUR BOOKING HAS BEEN DELETED !</div>
            </div>
          
          </div>
        }
        </div>
    )
}