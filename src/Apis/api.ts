import {Router} from "express";
import home from "./Routers/home";
import auth from "./Routers/Auth";
import study from "./Routers/Study";
import statistic from "./Routers/Statistic";
import Admin from "./Routers/Admin";

export default ()=>{
    const app = Router();
    auth(app);
    home(app);
    study(app);
    statistic(app);
    Admin(app);
    

    return app;
}