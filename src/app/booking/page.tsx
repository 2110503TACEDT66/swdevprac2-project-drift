"use client"
import DateReserve from '@/components/DateReserve';
import { addBooking } from '@/redux/features/bookSlice';
import { AppDispatch } from '@/redux/store';
import { TextField, Select, MenuItem} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { getSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';



export default function Home() {

  const user = getSession();
  console.log(user);

  //set selected hotel if user come from hotelCatalog
  const urlParams = useSearchParams();
  const hid = urlParams.get('id');
  const hotelName = urlParams.get('name')

  //controlled state of input field
  const [name, setName] = useState<string|null>(null);
  const [lastName, setLastName] = useState<string|null>(null);
  const [cid, setCid] = useState<string|null>(null);
  const [hospital, setHospital] = useState<string|null>(null);
  const [bookDate, setBookDate] = useState<Dayjs|null>(null);

  //keep booking in the store
  const dispatch = useDispatch<AppDispatch>()
  const makeBooking = () => {
    if (name && lastName && hospital && cid && bookDate) {
      const item:BookingItem = {
        name: name,
        surname: lastName,
        id: cid,
        hospital: hospital,
        bookDate: dayjs(bookDate).format("YYYY/MM/DD")
      }
      dispatch(addBooking(item))
    }
  }


  //fetch hotels list to use in <Select>
  const[isLoading, setLoading] = useState(true);
  const[hotelData, setHotelData] = useState<HotelItem[]>([]);
  useEffect(()=>{
    fetch("https://swd-hotel-backend.vercel.app/api/v1/hotels")
      .then(res => res.json())
      .then(data => {
        setHotelData(data.data);
        setLoading(false);
      });
  },[])
  if(isLoading) return <p className='text-slate-100 mx-auto w-fit h-fit font-light text-4xl'>Loading...</p>
  if(hotelData.length==0) setHotelData([])



  return (
    <main className="flex justify-center items-center h-fit mt-10">

        <div className="w-[90%] sm:w-[600px] bg-gray-100 rounded-lg">
        
            <div className="text-2xl mt-3 font-bold text-center">New Booking</div>
            <div
                className="bg-slate-100 rounded-lg p-5 flex flex-col items-center space-y-6"
            >

            <TextField 
              name='Name' 
              label='Name' 
              variant='standard' 
              className="w-[100%]"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField 
              name='Lastname' 
              label='Lastname' 
              variant='standard' 
              className="w-[100%]" 
              value={lastName || ''}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField 
              name='Citizen ID' 
              label='Citizen ID' 
              variant='standard' 
              className="w-[100%]" 
              value={cid || ''}
              onChange={(e) => setCid(e.target.value)}
            />

            <div className='self-start pl-1 font-light text-gray-500'>select hotel : {hotelName}</div>
           <Select id="hospital" defaultValue={hid} variant='standard' className="w-[100%]" onChange={(e)=>setHospital(e.target.value as string)}>
              <MenuItem disabled>Select the hotel</MenuItem>
              {
                  hotelData.map((elem,_)=>(
                      <MenuItem key={elem.id } value={elem.id}>
                          {elem.name}
                      </MenuItem>
                  ))
              }
            </Select>
          
            <DateReserve onDateChange={(value:Dayjs)=>{setBookDate(value)}}/>
            
            <button
            name='Book Vaccine' 
            className='max-w-[500px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100%] transition-all'
            onClick={makeBooking}>
                Book Hotel
            </button>
        </div>
      </div>
    </main>
  )
}
