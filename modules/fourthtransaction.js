const express = require("express");
const jwt =require("jsonwebtoken")
const { default: mongoose } = require("mongoose");
const { app } = require("../app");
const { mongoosetransaction, previewStoreSchema } = require("./storepreview");

appFourthTransction = express();
const refunder = mongoosetransaction.model("refund",new mongoosetransaction.Schema({
    transactionType:"string",
    receiptno:"string",
    contractor:{type:"string",required:true},
    date:"string",
    destination:{type:"string",required:true},
    items:{type:"string",required:true},
    quantity:{type:"string",required:true},
    type:{type:"string",required:true},
    user:"string"
    
        }))
    
    
        appFourthTransction.post("/refund",async (req,res)=>{
          
    // const [contractor,setContractor] = useState("")
    // const [destination,setDestination] = useState("")
    // const [items,setItems] = useState("")
    // const [quantity,setQuantity]=useState("")
    // const [type,setType]=useState("")
    try {
    
        
        const saver = new refunder({
            transactionType:"مرتجع",
            contractor:req.body.contractor,
            destination:req.body.destination,
            items:req.body.items,
            date:req.body.date,
            receiptno:req.body.receiptno,
            quantity:req.body.quantity,
            type:req.body.type
            
            
                })
    
    
    
    const findByI = await previewStoreSchema.findOne({store:saver.destination,
                    items:saver.items
                    })
                    // ||  findByI.items < 1 || (findByI.quantity - saver.quantity) < 0
    if(  !findByI  ) return res.send("error")                ;
    const saveNewData = await  saver.save();
    
    
    switch (saver.transactionType) {
      case "مرتجع":
          
      if (!findByI.unit !== saveNewData.type  ) 
      {await refunder.findByIdAndDelete(saveNewData._id) 
     
         return  res.send("error")}
          const updatedInc = await previewStoreSchema.findByIdAndUpdate(findByI._id,{"$inc":{quantity:+ saveNewData.quantity}})
          res.send ("not false")
  
          
          break;
  
      default:
          break;
  }
  
  
  
  
   
    
    } catch (error) {
      res.send("error")
    }
    
  
})





appFourthTransction.get("/refunds",async(req,res)=>{
    try {
    
        // const sender = req.cookies.token
        
        // const decoder = jwt.verify(sender,process.env.MYSECRET)
    
        

      
        const finder = await refunder.find()
        res.send(finder)
    
       
      
      } catch (error) {
        res.send("not authenticated")
      }
  

})


appFourthTransction.get("/deletrefund/:id",async(req,res)=>{

    const id =req.params.id;
    
  await refunder.findByIdAndDelete(id)
    
    res.send("delet")
    



})




module.exports.appFourthTransction=appFourthTransction