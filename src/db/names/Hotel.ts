import mongoose, { mongo } from "mongoose"

const HotelSchema = new mongoose.Schema({

    name: {
        type: String,
        require: [true,'Please add a name'],
        unique: true,
        trim: true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
    address:{
        type: String,
        require:[true,'Please add an address']
    },
    district:{
        type: String,
        require:[true,'Please add an district']
    },
    province:{
        type: String,
        require:[true,'Please add an province']
    },
    postalcode:{
        type: String,
        require:[true,'Please add an postalcode'],
        maxlength:[5,'Postal Code can not be more than 5 digits']
    },
    tel:{
        type: String
    },
    region:{
        type: String,
        require:[true,'Please add a region']
    }
    

    
},

{toJSON:{virtuals:true},toObject:{virtuals:true} , versionKey:false}

);

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema)
export default Hotel