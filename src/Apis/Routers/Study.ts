import {Router} from "express";
import studyController from "../Controllers/Study";

const route = Router();

export default(app : Router) =>{
    app.use("/study",route);

    route.get("/",(req,res)=>{
        res.send("/api/study")
    });

    route.post("/",studyController.study);
    route.put("/register",studyController.studyRegister);
    route.delete("/delete",studyController.studyDelete);
    route.put("/timeAdd",studyController.timeAdd);
}