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
    name: string;
    surname: string;
    id: string;
    hotel: string;
    bookDate: string;
  }