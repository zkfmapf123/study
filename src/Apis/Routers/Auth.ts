import {Router, Request, Response} from "express";
import authController from "../Controllers/Auth";

const route = Router();

export default(app : Router)=>{
    app.use("/auth",route);

    route.get("/",(req,res)=>{
        res.send("/api/auth");
    });
    
    route.post("/valid",authController.authValid);
    route.post("/Register",authController.authRegister);
}