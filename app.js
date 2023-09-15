const express = require('express');
const mongoose = require('mongoose');

const mysql = require("mysql")
const jwt = require("jsonwebtoken")
const cookieSession = require('cookie-session')
const cors = require('cors');
const session = require("express-session")
const { body, check } = require('express-validator');
// const session = require('express-session');
const cookieParser = require("cookie-parser");
const { my } = require('./getdatafromMysql');
// const { appregister } = require('./userregisterroute');
const helmet = require('helmet');
const path = require("path")
const { appLogin } = require('./modules/login');
const { preview, previewStoreSchema, mongoosetransaction } = require('./modules/storepreview');
require('dotenv').config()

const morgan = require('morgan');
// const { appDelete } = require('./modules/deletroute');
const { appPostNewDataTostore } = require('./modules/postNewDatas');
const { transactRoute } = require('./modules/transactionroute');
const { appSecondTransaction } = require('./modules/secondTransaction');
const { appThirdTransaction } = require('./modules/thirdTransaction');
const { appSpecific } = require('./modules/specific');
const { appFourthTransction } = require('./modules/fourthtransaction');
// const { userList, sockets } = require('./modules/users');
// const { appRegisterNew } = require('./modules/registeruser');
const app = express();
app.use(cookieParser())  
app.use(express.json())
// app.use(cors());
// app.use(function(req,res,next){
//   // res.header("Access-Control-Allow-Origin", "exp://192.168.8.180:8081");
//   // res.header({"Access-Control-Allow-Credentials": true});
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override,Content-Type, Accept');
//   res.header("Access-Control-Max-Age", 24*60*60*1000);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
// res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//   res.header("Set-Cookie", "sid=14A52; max-age=3600;samesite=None;sameSite=none ;SameSite=None ;Secure ")
//   res.cookie("token","jwter"
// ,{
//     maxAge: 1000000000 , sameSite : "None",SameSite:"None" ,
//     samesite : "None",SameSite:"none" ,
//     sameSite : "None",SameSite:"None" 
// }
// );


// next()    



// })
// const allowCrossDomain = function(req, res, next) {
//   res.set({"Access-Control-Allow-Origin": "*"});
//   res.set({"Access-Control-Allow-Credential": true});
//   // res.set({"content-type": "application/json"});
//   next();
// }
// app.use(allowCrossDomain);
  
app.use(session({resave:false,secret:'session',cookie:{maxAge:1000*60*60,sameSite:"none",secure:true}}))
const { createProxyMiddleware } = require('http-proxy-middleware');
const { name } = require('./modules/postnames');
  
//   app.use('/*', createProxyMiddleware({ 
//     target: '*', //original url
//     changeOrigin: true, 
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//        proxyRes.headers['Access-Control-Allow-Methods'] = ['GET','POST','HEAD','PUT','PATCH','DELETE'];
//     }
// }));



// function MiddleWareFunctionForLogin(req,res,next){
// if(req.method ==="GET"){

//   try {
    
//     var pairs = req.headers.cookie.split(';')
  
//     var cookies = {};
//     for (var i = 0; i < pairs.length; i++) {
//        var nameValue = pairs[i].split('=');
//        cookies[nameValue[0].trim()] = nameValue[1];
//     }
    
    
//     const sender = cookies.token
//     const decoder = jwt.verify(sender,process.env.MYSECRET)
//     if(decoder) next()
 
  
//   } catch (error) {
//     res.send("not authenticated")
//   }
  
  
//   }else{
// next()


//   }
//   }
  
// app.use(MiddleWareFunctionForLogin)
// app.use(userList)
var http = require('http').createServer(app)



// app.use(morgan("tiny"))
// app.use(appDelete)
app.use(appSpecific)
// // app.use(appregister)
app.use(transactRoute)
app.use(appPostNewDataTostore)
app.use(appSecondTransaction)

app.use(appFourthTransction)
// app.use(helmet())
app.use(appThirdTransaction)

app.use(appLogin)
app.use(name)
// app.use(appRegisterNew)

app.use(preview)



const schema = new mongoose.Schema({
  store :"string",
  items:"string",
date: {type:"string",default:Date.now()}})
const mYmodel = mongoose.model("mainstore",schema)

app.get('/', async (req, res) => {
  // const find =  await mYmodel.find() ;
  
  // console.log(req.session);
  // res.cookie('name', 'geeksfossrgeeks')
  res.send(req.headers)
    // console.log(req);

})

    
    //some other code


// app.options('/login', cors()) 

  
app.post("/datapost",async(req,res)=>

{
console.log(req.cookies);


const data = new mYmodel({store :req.body.store,
  items:req.body.items,
})

// const findToValidateSonething = await mYmodel.findOne({store:data.store})
// if(findToValidateSonething) return res.send("previously registered")
const saver = await data.save()
res.header('etssssag',"hesham").send(req.session.name)

// console.log(saver);
}

)








module.exports.app=app
module.exports.appEx=express


app.listen(3000,()=> console.log("hi from listening"))
// const PORT = 3000;

// http.listen(process.env.PORT || 3000, () => {
//   console.log(process.env.PORT || 3000);
// });
