  export interface HotelJson{
    success: boolean,
    count: number,
    pagination: Object,
    data: HotelItem[]
  }

  export interface HotelItem {
    _id: string,
    name: string,
    address: string,
    tel: string,
    id: string
  }
  
  export interface BookingItem {
    _id:string
    user: string;
    hotel: string;
    bookDate: string;
  }

  export interface populatedBookingItem{
    _id:string
    user: string;
    bookDate: string;
    hotel:HotelItem
  }