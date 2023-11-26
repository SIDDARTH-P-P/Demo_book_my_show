import jwt from "jsonwebtoken";

const {verify} = jwt;

export default async function auth(req,res,next){
    try {
        let token = req.headers.authorization.split(" ")[1];
        let user = await verify(token,process.env.SCRET_KEY);
        if(user){
            req.user = user
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(404).json("Unauthorization access")
    }
}