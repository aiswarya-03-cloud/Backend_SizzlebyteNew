import foodModel from "../models/FoodModel.js";
import fs from 'fs'

// Add food item 

const addFood = async (req,res) => {

     let imageName = '';
    if (req.file) {
        imageName = req.file.filename;
    } else {
        // Handle the case where no file was uploaded
        // You might want to set a default image or send an error response
        console.error('No file was uploaded');
    }

    ////////
try{
 console.log("ReqFile--",req.file)

    let image_filename = `${req.file.filename}`
    console.log("Img_fileName:",image_filename)

   

    

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image: image_filename   
    })

    try{
        await food.save();
        res.json({success:true,message: "Food Added"})

    } catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}
catch(error){
    console.log(error)
    res.json({success:false,message:"Error"})
}
}

// All food List
const listfood = async(req,res)=>{

    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})


    }catch(error){
         console.log(error);
         res.json({success:false,message:"Error"})
    }

}

// Remove Food 
const removeFood = async(req,res)=>{
   try{

   const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{}) 

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food Removed"})

   }catch(error){
      console.log(error);
      res.json({success:false,mesage:"Error"})

   }

}



export {addFood,listfood,removeFood}