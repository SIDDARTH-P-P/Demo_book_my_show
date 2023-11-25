import schema from "./schema/schema.js";
import path from "path"

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