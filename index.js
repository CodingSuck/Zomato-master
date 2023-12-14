require ("dotenv").config();

import express from  "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import googleAuthconfig from "./config/google.config"

import ConnectDb from "./Database/User/connections"
import Auth from "./API/Auth"
import Restaurent from "./API/Restaurent"
import Food from "./API/Food"

const zomato=express();
zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));

zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configration
googleAuthconfig(passport);

zomato.use("/auth",Auth);
zomato.use("/restaurent",Restaurent);
zomato.use("/food",Food);




zomato.get("/",(req,res)=> res.json({message:"Setup Success Yay!!"}));
zomato.listen(4000, ()=>
ConnectDb().then(()=>console.log("Server is up and running")));
