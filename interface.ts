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

  export interface SingleHotelJson {
    success: boolean,
    pagination: Object,
    data: HotelItem
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


  export interface userProfile{
    success:true,
    data:{
      name:string,
      role:string,
      email:string,
      tel:string,
      createdAt:Date,
    }

  }