import mongoose, { Mongoose, Schema } from "mongoose";
const FoodSchema =new mongoose.Schema({
    name: {type: String, required:true },
    descript: {type: String, required:true },
    isVeg:{type:Boolean,required:true},
    isContainsEgg:{type:Boolean,required:true},
    category: {type: String, required:true },
    photo:{
        type:mongoose.Types.ObjectId,
        ref: "Images"
    },
    price:{type:Number, default:150, required:true},
    addOns:[{
        type: mongoose.Types.ObjectId,
        ref:"Foods"
    }
    ],
    restaurent:{
        type:mongoose.Types.ObjectId,
        ref: "Restaurents",
        required:true
    }
    },
    {
        timestamps:true
    
    
        }

);
export const FoodModel=mongoose.model("Foods",FoodSchema);