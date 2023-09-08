const { expressApp } = require("./deletroute");



const cookieParser=require("cookie-parser")

require('dotenv').config({ debug: true })

const { default: mongoose } = require("mongoose");
const { app } = require("../app")
const NAMEVar= process.env.MONGOUSERNAME
const COLLECTIONNAME = process.env.COLLECTIONNAME
mongoose.connect("mongodb+srv://"+ process.env.MONGOUSERNAME +":"+process.env.MONGOPASSWORD +"@cluster0.hkh2k.mongodb.net/"+ COLLECTIONNAME+"?retryWrites=true&w=majority",()=>console.log("mongoose connected"));
const names=expressApp()


const namesOfContractors = new mongoose.Schema({

   
name:"string",


})
  const contractors = mongoose.model("contractors",namesOfContractors)
  const namesOfStores = new mongoose.Schema({

   
    name:"string",
    
    
    })
      const stores = mongoose.model("stores",namesOfStores)
    
    
      const nameOfPlaces = new mongoose.Schema({

   
        name:"string",
        
        
        })
          const places = mongoose.model("places",nameOfPlaces)
        
        
    

      
    


names.post("/namesofcontractors",async(req,res)=>{


try {
    const data= new contractors({name:req.body.name})

const saver = await data.save()
  res.send(saver)
} catch (error) {
    res.send("error")
}
  


})
names.get("/listofnames",async (req,res)=>{
try {

    const finder =await contractors.find({})

    res.send(finder)
} catch (error) {
    console.log("error")
}
    


}

)


names.post("/namesofstores",async(req,res)=>{


    try {
        const data= new stores({name:req.body.name})
    
    const saver = await data.save()
      
    } catch (error) {
        res.send("error")
    }
      
    
    
    })
    names.get("/listofstores",async (req,res)=>{
    try {
        const finder = await stores.find({})
    
        res.send(finder)
    } catch (error) {
        res.send("error")
    }
        
    
    
    }
    
    )









    names.get("/listofnames",async (req,res)=>{
        try {
        
            const finder =await contractors.find({})
        
            res.send(finder)
        } catch (error) {
            console.log("error")
        }
            
        
        
        }
        
        )
        
        
        names.post("/listofplaces",async(req,res)=>{
        
        
            try {
                const data= new places({name:req.body.name})
            
            const saver = await data.save()
              
            } catch (error) {
                res.send("error")
            }
              
            
            
            })
            names.get("/listofplaces",async (req,res)=>{
            try {
                const finder = await places.find({})
            
                res.send(finder)
            } catch (error) {
                res.send("error")
            }
                
            
            
            }
            
            )
        
        
        
        
        

module.exports.name=names;