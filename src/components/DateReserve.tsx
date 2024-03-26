'use client'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { Dayjs } from 'dayjs';


export default function DateReserve({onDateChange}:{onDateChange:Function}) {

    const [reserveDate, setReserveDate] = useState<Dayjs|null>(null);

    return (
        <div className='rounded-lg w-fit p-3 flex flex-row justify-center'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className='bg-white'
                value={reserveDate}
                disablePast
                onChange={(value) => {setReserveDate(value); onDateChange(value)}}/>
            </LocalizationProvider>
        </div>
    );
}
