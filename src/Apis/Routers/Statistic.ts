import {Router} from "express";
import statisticController from "../Controllers/Statistic";

const route = Router();

export default(app : Router) =>{
    app.use("/statistic",route);

    route.get("/",(req,res)=>{
        res.send("/api/statistic")
    });

    route.post("/",statisticController.statistic);
}