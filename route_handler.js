import schema from "./schema/schema.js";
import user from "./schema/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import path from "path"
import fs from "fs"


const { sign } = jwt;

//Add user data
export async function userdata(req, res) {
    try {
        let { username, email, phone, password } = req.body
        let check = await user.findOne({ username: username })
        if (check) {
            return res.json("Username Already Exists Use other name ! ")
        }
        let hashed = await bcrypt.hash(password, 10)
        let result = await user.create({
            username,
            email,
            phone,
            password: hashed
        })
        if (result) {
            return res.json("Account Successfully Created");
        }
        return res.json("Error to create account !")
    } catch (error) {
        console.log(error);
    }
}

//Login user
export async function login(req, res) {
    try {
        let { username, password } = req.body
        let userdata = await user.findOne({ username: username })
        if (!userdata) {
            return res.status(404).json("User Not Found !")
        }
        if (userdata) {
            let result = await bcrypt.compare(password, userdata.password)
            if (result) {
                let token = await sign({ username: userdata.username, id: userdata._id }, process.env.SCRET_KEY, { expiresIn: "1h" })
                return res.json({ msg: "Successfully login", token })
            }
            res.status(401).json("Invalid username or password")
        }
        res.json("Error to login")
    } catch (error) {
        console.log(error);
    }
}


//Add movies
export async function add_item(req, res) {
    try {
        let { name, language, year, rating, vote, category, Duration } = req.body
        let images = req.files
        let check = await schema.findOne({ name: name })
        if (check) {
            return res.json("Film Already Exists !")
        }
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
        if (result) {
            return res.json("Film Successfully addded")
        }
        return res.json("Error add movie !")
    } catch (error) {
        console.log(error);
    }
}

//Delete movies
export async function del_item(req, res) {
    try {
        let { id } = req.params;
        let result = await schema.findOne({ _id: id })
        if (result) {
            result.images.map((item) => {
                console.log(item.filename);
                fs.rm(`./images/${item.filename}`, (error) => {
                    console.log(error);
                })
            })
            let deletedata = await schema.deleteOne({ _id: id })
            if (deletedata) {
                return res.json("Successfully deleted")
            }
        }
        res.json("Error to delete data");
    } catch (error) {
        console.log(error);
    }
}




export async function get_data(req, res) {
    let result = await schema.find()
    res.json(result)
}

export function get_file(req, res) {
    let { file } = req.params
    return res.sendFile(path.resolve(`./images/${file}`))
}

export async function get_movie(req, res) {
    let { id } = req.params
    let result = await schema.findOne({ _id: id })
    res.json(result)

}


export async function get_edit_data(req, res) {
    let { id } = req.params;
    let result = await schema.findOne({ _id: id })
    res.json(result);
}

export async function edit_data(req, res) {
    let { id } = req.params;
    let { name, language, year, rating, vote, category, Duration } = req.body
    let update = await schema.updateOne({ _id: id }, { $set: { name, language, year, rating, vote, category, Duration } })
    if (update) {
        return res.json("Successfully Updated")
    }
    res.status(400).json("Error to Update");
}


export function auth(req, res) {
    res.status(200).json("login")
}