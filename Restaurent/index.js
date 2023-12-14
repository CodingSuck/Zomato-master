import {RestaurentModel} from "../../database/allModel";
const  Router =express.Router();


Router.get("/",async(req,res)=>{

    try{

        const {city}=req.query;
        const restaurents=await RestaurentModel.find()


    }catch(error){

        return res.status(500).json({error:error.message});
    }
})

Router.get("/",async(req,res)=>{

    try{
        const {_id}=req.params;
        const restaurents=await RestaurentModel.findOne(_id)


        if(!restauremt)
        return res.status(404).json({error:"Restaurent not found"});

        return res.json({restaurent});


    }catch(error){

        return res.status(500).json({error:error.message});

        
    }
})



Router.get("/search",async(req,res)=>{
    try{
        const {searchString}=req.body;

        const restaurents=await RestaurentModel.find({
            name:{$regex:searchString,$option:"i"}
        })
    }
        catch(error){

            return res.status(500).json({error:error.message});
        }

    
});



Router.get("/r/category",async(req,res)=>{
    try{
        const {category}=req.params;

        const food=await foodModel.find({
            name:{$regex: category,$option:"i"}
        });

        return res.json({foods});
    }
        catch(error){

            return res.status(500).json({error:error.message});
        }

    
});



export default Router;