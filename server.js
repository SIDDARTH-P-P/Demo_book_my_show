import express from "express";
import router from "./router.js";
import connect_db from "./connection.js";
import dotenv from "dotenv";


dotenv.config()
const app = express();

app.use(express.json({limit:"25mb"}))
app.use("/",router)
app.use(express.static("./template"))



connect_db().then(()=>{
    app.listen(3000,(error=>{
        if(error){
            console.log(error);
        }
        console.log("server start");
    }))
})
.catch((error)=>{
    console.log(error);
})