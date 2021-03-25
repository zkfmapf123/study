import {Request, Response} from 'express';
import { IReview } from '../../Tools/Interfaces';
import Admin from "../../Services/Admin";

const admin : Admin = new Admin();

const adminReview = async(req: Request, res : Response) =>{
    try{
        const {id, separate, content} : IReview = req.body;

        return (await admin.writeReview({
            id : id,
            review: separate,
            content: content
        })) ? 
        res.status(200).json({}) : res.status(202).json({});
    }catch(e){
        console.error(e);
    }
};

export default {
    adminReview
}