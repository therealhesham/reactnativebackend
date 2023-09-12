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
    destination:{type:"string",required:true},
    items:{type:"string",required:true},
    quantity:{type:"string",required:true},
    type:{type:"string",required:true},
    user:"string"
    
        }))
    
    
        appFourthTransction.post("/refund",(req,res,next)=>{
          res.header("Access-Control-Allow-Origin", "https://my-amac-react-app.vercel.app");
          res.header({"Access-Control-Allow-Credentials": true});
          res.header("Access-Control-Max-Age", 24*60*60*1000);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
      
          const sender = req.cookies.token
        // console.log(sender)
        if(!sender) return res.send("not authenticated");
        const decoder =  jwt.verify(sender,process.env.MYSECRET)
        
      if(!decoder) return res.send("not authenticated");
      next()}
      
      ,async (req,res)=>{
          
    // const [contractor,setContractor] = useState("")
    // const [destination,setDestination] = useState("")
    // const [items,setItems] = useState("")
    // const [quantity,setQuantity]=useState("")
    // const [type,setType]=useState("")
    try {
    
        // var pairs = req.headers.cookie.split(';')
      
        // var cookies = {};
        // for (var i = 0; i < pairs.length; i++) {
        //    var nameValue = pairs[i].split('=');
        //    cookies[nameValue[0].trim()] = nameValue[1];
        // }
        
        
        const sender = req.cookies.token
        const decoder = jwt.verify(sender,process.env.MYSECRET)
        const saver = new refunder({
            transactionType:"مرتجع",
            contractor:req.body.contractor,
            destination:req.body.destination,
            items:req.body.items,
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
            
            // if (!findByID) return res.send(false)
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