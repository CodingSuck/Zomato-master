import { Express  } from "express";
import AWS from "aws-sdk";
import multer from "multer";

import { ImageModel } from "../../Database/allModels";

const Router =express.Router();


const s3Bucket =new AWS. S3({

    // accessKeyid:process.env.,
    // secretAccessKey:process.eve,
    // region:"ap-south-1"
});

const s3Upload=(options=>{

    return new Promise((resolve,reject)=>{

        s3Bucket.upload(option,(error,data)=>{

            if(error) return  reject (error);
            return resolve(data);

        })
    })
});

const uploadImage=await s3Upload(bucketOptions);

Router.get("/",upload.single("file"),async(req,res)=>{

    try{
        const file=req.file;
        
        const bucketOptions={

            Bucket:"",
            Key:file.orignalname,
            Body:file.buffer,
            ContentType:file.mimetype,
            ACL:"public-read"
        };

        
       


    }catch(error){

        return res.status(500).json({error:error.message});
    }
})

export default Router;