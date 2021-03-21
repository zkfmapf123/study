import {Router} from 'express';
import adminController from "../Controllers/Admin";

const route = Router();

export default (app: Router)=>{
    app.use('/admin',route);

    route.get('/',(req,res)=>res.send("admin"));
    route.post('/review',adminController.adminReview);
}