  interface HotelJson{
    success: boolean,
    count: number,
    pagination: Object,
    data: HotelItem[]
  }

  interface HotelItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    region:string,
    id: string
  }
  
  interface BookingItem {
    name: string;
    surname: string;
    id: string;
    hospital: string;
    bookDate: string;
  }