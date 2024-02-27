import mongoose from "mongoose";
const bookingsSchema=new mongoose.Schema({
    movie:{
        type:String,
        required:true,

    },
    date:{
        type:Date,
        required:true
    },
    seatNumber:{
        type:Number,
        required:true,
    },
    user:{
        type:String,
        required:true,
    },

});
export default mongoose.model("Bookings",bookingsSchema);
