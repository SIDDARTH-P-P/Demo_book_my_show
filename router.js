import { Router } from "express";
import * as fun from "./route_handler.js"
import multer from "multer";
import auth from "./auth.js";

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

router.route("/user").post(fun.userdata);
router.route("/login").post(fun.login);

router.route("/auth").get(auth,fun.auth);

router.route("/get_file/:file").get(fun.get_file);
router.route("/get_movie/:id").get(fun.get_movie);
router.route("/edit/:id").get(fun.get_edit_data);
router.route("/edit/:id").post(fun.edit_data);

router.route("/del_item/:id").get(fun.del_item);
export default router;