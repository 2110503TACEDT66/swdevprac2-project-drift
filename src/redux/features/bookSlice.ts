import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interface";

type BookState = {
    bookItems: BookingItem[]
}

const initialState:BookState = { bookItems:[] } // empty array

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBooking: (state, action:PayloadAction<BookingItem>) => {
            const existingBookingIndex = state.bookItems.findIndex(item => item.id === action.payload.id);

            if (existingBookingIndex !== -1) {
                // If already booked, replace the old booking with the new one
                state.bookItems[existingBookingIndex] = action.payload;
            } else {
                // If not booked, add the new booking
                state.bookItems.push(action.payload);
            }
        },
        removeBooking: (state, action:PayloadAction<BookingItem>) => {
            const remainItems = state.bookItems.filter(obj => {
                return obj.id !== action.payload
            })

            state.bookItems = remainItems;
        },
    },
})

export const { addBooking, removeBooking } = bookSlice.actions
export default bookSlice.reducer