"use client"
import DateReserve from '@/components/DateReserve';
import { addBooking } from '@/redux/features/bookSlice';
import { AppDispatch } from '@/redux/store';
import { TextField, Select, MenuItem } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Home() {
  
  const [name, setName] = useState<string|null>(null);
  const [lastName, setLastName] = useState<string|null>(null);
  const [cid, setCid] = useState<string|null>(null);
  const [hospital, setHospital] = useState<string|null>(null);
  const [bookDate, setBookDate] = useState<Dayjs|null>(null);

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

  return (
    <main className="flex justify-center items-center h-screen">

        <div className="w-full max-w-[40%] bg-gray-100 rounded-lg">
        
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
              
            <Select id='hospital' variant='standard' className="w-[100%]"
            onChange={(e) => setHospital(e.target.value as string)}>
            
                <MenuItem value={"Chula"}>Chulalongkorn Hospital</MenuItem>
                <MenuItem value={"Rajavithi"}>Rajavithi Hospital</MenuItem>
                <MenuItem value={"Thammasat"}>Thammasat University Hospital</MenuItem>
                
            </Select>

            <DateReserve onDateChange={(value:Dayjs)=>{setBookDate(value)}}/>
          
            <button
            name='Book Vaccine' 
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100%]'
            onClick={makeBooking}>
                Book Hotel
            </button>
        </div>
      </div>
    </main>
  )
}
