import schema from "./schema/schema.js";
import user from "./schema/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import path from "path"
import fs from "fs";


const {sign} = jwt;

export async function login(req,res){
    console.log(req.body);
    let {username,password} = req.body
    let userdata = await user.findOne({username:username})
    console.log(userdata);
    if(userdata){
        let result = await bcrypt.compare(password,userdata.password)
        if(result){
            console.log(result);
            let token = await sign({username:userdata.username,id:userdata._id},process.env.SCRET_KEY,{expiresIn:"24h"})
            console.log(token);
           return res.json({token})
        }
    }
    res.json("data")
}

export async function userdata(req,res){
    let {username,email,phone,password} = req.body
    let hashed = await bcrypt.hash(password,10)
    let result = await user.create({
        username,
        email,
        phone,
        password:hashed
    })
}

export async function add_item(req,res){
    try {
        let {name,language,year,rating,vote,category,Duration} = req.body
        let images = req.files
        let result = await schema.create({
            name,
            language,
            year,
            rating,
            vote,
            category,
            Duration,
            images,
        })
        res.json("data")
    } catch (error) {
        console.log(error);
    }
}

export async function get_data(req,res){
    let result = await schema.find()
    res.json(result)
}

export function get_file(req,res){
    let {file} = req.params
    return res.sendFile(path.resolve(`./images/${file}`))
}

export async function get_movie(req,res){
    let {id} = req.params
    let result = await schema.findOne({_id:id})
    res.json(result)

}


export async function edit_data(req,res){
    let {id} = req.params;
    let result = await schema.findOne({_id:id})
    res.json(result);
}

export async function del_item(req,res){
    let {id} = req.params;
    let result = await schema.deleteOne({_id:id})
    res.json("data")
}