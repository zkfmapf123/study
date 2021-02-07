import {Router, Request, Response} from "express";
import homeController from "../Controllers/Home";

const route = Router();

export default(app : Router) =>{
    app.use("/",route);
    
    route.get("/",(req,res)=>{
        res.send("home")
    });

    route.post("/",homeController.home);
    route.put("/todo",homeController.todo);
    route.put("/today",homeController.today);
}