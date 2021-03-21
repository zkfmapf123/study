import {Request, Response} from 'express';
import { IReview } from '../../Tools/Interfaces';
import Admin from "../../Services/Admin";

const admin : Admin = new Admin();

const adminReview = async(req: Request, res : Response) =>{
    try{
        const user : IReview = req.body;

        return (await admin.writeReview({
            id : user.id,
            review: user.review,
            content: user.content
        })) ? 
        res.status(200).json({}) : res.status(202).json({});
    }catch(e){
        console.error(e);
    }
};

export default {
    adminReview
}