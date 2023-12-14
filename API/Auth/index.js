import express from "express";
import bcrypt from "bcryptjs/dist/bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../Database/User/Index";

const Router =express.Router();

/*

Route       /signup
Descrip     signup with email and pass
params      None
Access      public 
method      post
*/

Router.post("/signup", async(req,res)=>{

    try{
        const{email,password,fullname,phonenumber}=req.body.credentials;
        // const checkUserByEmail=await UserModel.findone({email});
        // const checkUserByPhone=await UserModel.findone({phoneNumber});
        if(checkUserByEmail || checkUserByPhone){
            return res.json({error:"User already exits"});
        }

        await UserModel.findEmailAndPhone(email,phoneNumber);
        const bcryptSalt=await bcrypt.genSalt(8);
        const hashedpassword =await bcrypt.hash(password,bcryptSalt);
        await UserModel.create({
            ...req.body.credentials,
            password:hashedpassword

        });

        const newUser=await UserModel.create(req.body.credentials);
        const token=newUser.generateJwtToken();
        return res.status(200).json({token});
    }


    catch(error){

        return res.status(500).json({error:error.message});
    }
});

/*

Route       /signin
Descrip     signin with email and pass
params      None
Access      public 
method      post
*/




Router.post("/signin", async(req,res)=>{

    try{

        const doesUserExist=await UserModel.findEmailAndPassword(
            req.body.credentials
        );
        
        // const checkUserByEmail=await UserModel.findone({email});
        // const checkUserByPhone=await UserModel.findone({phoneNumber});
        if(checkUserByEmail || checkUserByPhone){
            return res.json({error:"User already exits"});
        }

        await UserModel.findEmailAndPhone(email,phoneNumber);
        const bcryptSalt=await bcrypt.genSalt(8);
        const hashedpassword =await bcrypt.hash(password,bcryptSalt);
        await UserModel.create({
            ...req.body.credentials,
            password:hashedpassword

        });

        const user=await UserModel.create(req.body.credentials);
        const token=user.generateJwtToken();
        return res.status(200).json({token,status:"Success" });
    }


    catch(error){

        return res.status(500).json({error:error.message});
    }
});

/*

Route       /google    
Descrip     signin Google

params      None
Access      public 
method      get
*/
Router.get("/google",passport.authenticate("google",{
    scope:[
        "http://www.googleapis.com/auth/userinfo.profile",
        "http://www.googleapis.com/auth/userinfo.email",
        ""
    ]
}))



/*

Route       /google/callback 
Descrip     signin Google callback

params      None
Access      public 
method      get
*/
Router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/"}),
(req,res) =>{
    return res.json({token:req.session.passport.user.token})
}
   
);

 
export default Router;