import {Request, Response} from "express";
import Study from "../../Services/Study";
import { IStudy, ITime } from "../../Tools/Interfaces";

let studyItem : IStudy;
let timeItem : ITime;
const studies : Study = new Study();

const study = async(req: Request, res : Response) =>{
    try{
        studyItem = req.body;
        const response = await studies.getData({id : studyItem.id, cur_date : studyItem.cur_date});
        
        return res.status(200).json({
            study : response
        });
    }catch(e){
        console.error(e);
    }
}

const studyRegister= async(req: Request, res : Response) =>{
    try{
        studyItem = req.body;

        const response = await studies.addStudy({id : studyItem.id, cur_date : studyItem.cur_date, standard : studyItem.standard, todo : studyItem.todo});
        return res.status(200).json({
            study : response
        });
    }catch(e){
        console.error(e);
    }
}

const studyDelete = async(req: Request, res : Response) =>{
    try{
        studyItem = req.body;
        const response = await studies.deleteStudy({id : studyItem.id, studyId : studyItem.studyId, cur_date : studyItem.cur_date});

        return res.status(200).json({
            study : response
        });
    }catch(e){
        console.error(e);
    }
}

const timeAdd = async(req: Request, res : Response) =>{
    try{
        timeItem = req.body;
        const response = await studies.addTime({id : timeItem.id, 
                               cur_date : timeItem.cur_date, 
                               time : timeItem.time, 
                               studyId: timeItem.studyId});

        return res.status(200).json({
            study : response
        });
    }catch(e){
        console.error(e);
    }
}

export default{
    study,
    studyRegister,
    studyDelete,
    timeAdd
}