import { Router } from "express";
import * as fun from "./route_handler.js"
import multer from "multer";

const storage = multer.diskStorage({
    destination:"./images",
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const uploder = multer({storage:storage})

const router = Router()

router.route("/api").post(uploder.any(),fun.add_item);
router.route("/api").get(fun.get_data)

router.route("/get_file/:file").get(fun.get_file);
router.route("/get_movie/:id").get(fun.get_movie);
export default router;