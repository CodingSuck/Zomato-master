import mongoose from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt";
import jwt from "jsonwebtoken";

const UserSchema =new mongoose.Schema({

    fullname:{type: String, required:true },
    email:{type: String, required:true },
    password:{type: String},
    address:[{detail:{type:String}, for:{type: String}}],
    phonenumber:[{type:number}]
},
{
    timestamps:true


    }

);

UserSchema.methods.generateJwtToken=function(){
    return jwt.sign({user:{fullname,email}}, "ZomatoApp");
}

UserSchema.statics.findEmailAndPhone=async(email,phoneNumber)=>{

    const checkUserByEmail=await UserModel.findOne({email});

    const checkUserByPhone=await UserModel.findOne({phoneNumber});
    if(checkUserByEmail || checkUserByPhone){
        throw new  Error("User already exits");
    }
    return false;
};


UserSchema.statics.findByEmailAndPassword=async(email,password)=>{

    const user=await UserModel.findOne({email});
    if(!user) throw new Error("User Doesnt exist");
    //compare password

    const doesPasswordMatch=await bcrypt.compare(password,user.password);
    if(!doesPasswordMatch){
        throw new  Error("Invalid password");
    }
    return user;
};


UserSchema.pre("save",function(next){
    const user=this;
    if(!user.isModified("password")) return next();
    bcrypt.genSalt(8,(error,salt)=>{

        if(error) return next(error);
        bcrypt.hash(user.password,salt,(error,halt)=>{

            if(error) return next(error);

            user.password=hash;
            return next();

        })
    });

});

export const UserModel=mongoose.model("Users",UserSchema);