const express = require("express")
const cookieParser=require("cookie-parser")
const jwt = require("jsonwebtoken")
require('dotenv').config({ debug: true })
appPreview= express()
appPreview.use(cookieParser())
const { default: mongoose } = require("mongoose");
const { app } = require("../app")
const NAMEVar= process.env.MONGOUSERNAME
const COLLECTIONNAME = process.env.COLLECTIONNAME
mongoose.connect("mongodb+srv://"+ process.env.MONGOUSERNAME +":"+process.env.MONGOPASSWORD +"@cluster0.hkh2k.mongodb.net/"+ COLLECTIONNAME+"?retryWrites=true&w=majority",()=>console.log("mongoose connected"));


const schema = new mongoose.Schema({

    store :{type:"string",required:true},
    items:{type:"string",required:true},
    type:{type:"string",required:true},
  date: {type:"string",default:new Date(Date.now()).toDateString()}
,
quantity:{type:"number",required:true}})
  const mYmodel = mongoose.model("mainwarhouses",schema)



  appPreview.get("/preview",async(req,res)=>{
    try {
      console.log("preview")
      
      
    
  
    const finder = await mYmodel.find();


    res.send(finder)
      
 
  


    } catch (error) {
      
    }
    
  })



    module.exports.preview=appPreview
  module.exports.previewStoreSchema=mYmodel
  module.exports.mongoosetransaction= mongoose
