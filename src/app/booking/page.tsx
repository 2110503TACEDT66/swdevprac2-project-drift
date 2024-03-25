"use client"
import DateReserve from '@/components/DateReserve';
import { TextField, Select, MenuItem, Autocomplete, CircularProgress} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BookingItem } from '../../../interface';
import { HotelItem } from '../../../interface';
import Loading from './loading';
import createBooking from '@/libs/booking/createBooking';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';


export default function Home() {

  const {data:session,status} = useSession();

  //set selected hotel if user come from hotelCatalog
  const urlParams = useSearchParams();
  const hid = urlParams.get('id');

  //controlled state of input field
  const [hotel, setHotel] = useState<string|null>(hid);
  const [bookDate, setBookDate] = useState<Dayjs|null>(null);


  const[isCreating, setIsCreating] = useState(false);
  const errorBox = useRef<HTMLDivElement>(null);
  const popupBox = useRef<HTMLDivElement>(null);

  const makeBooking = async () => {
    
    errorBox.current!.innerText = "";

    if ( hotel && session!.user._id && bookDate) {
      
      setIsCreating(true);

      try {
         await createBooking(hotel , dayjs(bookDate).format("YYYY/MM/DD") , session!.user.token);
         popupBox.current!.style.display = "flex";
      } 
      catch (error) {
        const errorMsg = String(error)
        errorBox.current!.innerText = errorMsg.substring(6);
      }
      
      setIsCreating(false);
    }
    else errorBox.current!.innerText = "field cannot empty"
  }



  //fetch hotels list to use in <Select>
  const[isLoading, setLoading] = useState(true);
  const[hotelData, setHotelData] = useState<HotelItem[]>([]);
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



  return (
    <main className="flex justify-center items-center h-fit mt-10">

        <div className="relative w-[90%] max-w-[600px] bg-gray-100 rounded-lg">
        
        {
          isCreating
              ? <div className="absolute top-0 left-0 flex flex-col gap-y-3 justify-center items-center rounded-lg text-slate-50 w-full h-full bg-black/30 z-[9999]">
                  <CircularProgress thickness={6}/>
                  <div>creating booking...</div>
                </div>
              :''
        }

        {
          <div className='absolute top-0 left-0 z-[9999] hidden items-center w-full h-full bg-black/30' ref={popupBox}>
            <div className="relative flex flex-col gap-y-3 mx-auto p-2 justify-center text-center
                            rounded-lg text-green-500 text-2xl bg-slate-50 
                            border-2 border-slate-400 w-[450px] h-[250px]">
              <button className='absolute top-3 right-3'
                onClick={()=>popupBox.current!.style.display = "none"}>
                <CloseIcon fontSize="large" className=' text-slate-400 hover:text-slate-600'/>
              </button>
              <CheckCircleOutlineIcon fontSize="large" className='self-center'/>
              <div>YOUR BOOKING HAS BEEN CREATED !</div>
            </div>
          
          </div>
        }

            <div className="bg-slate-100 rounded-lg p-5 flex flex-col items-center space-y-6">

              <div className="text-2xl mb-2 font-bold text-center">New Booking</div>
              
              <div className="w-[80%] p-3">
                <div className='self-start pl-1 font-light text-gray-500'>Select hotel</div>
                <Select id="hotel" defaultValue={hid} variant='standard' className="w-[100%]" onChange={(e)=>setHotel(e.target.value as string)}>
                  {
                      hotelData.map((elem,_)=>(
                          <MenuItem key={elem.id } value={elem.id}>
                              {elem.name}
                          </MenuItem>
                      ))
                  }
                </Select>
              </div>

              {/* <Autocomplete
                id="combo-box-demo"
                options={hotelData}
                sx={{ width: 300 }}
                onChange={(e,value:string)=>setHotel(value)}
                renderInput={(params) => <TextField {...params} label="Hospital" />}
              /> */}
              
              <DateReserve onDateChange={(value:Dayjs)=>{setBookDate(value)}}/>
              
              <div className='w-full min-h-7 text-xl text-center text-red-700' ref={errorBox}>
              </div>

              <button
                name='Book Vaccine' 
                className='max-w-[500px] bg-blue-500 hover:bg-blue-700 text-xl text-white font-bold py-2 px-4 rounded w-[100%] transition-all'
                onClick={makeBooking}
              >
                  Book Hotel
              </button>
            </div>
      </div>
    </main>
  )
}
