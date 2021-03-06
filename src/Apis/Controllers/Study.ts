import {Request, Response} from "express";
import Study from "../../Services/Study";
import { IStatistic, IStudy, ITime } from "../../Tools/Interfaces";

let studyItem : IStudy;
let historyItem : IStatistic;
let timeItem : ITime;
const studies : Study = new Study();

const study = async(req: Request, res : Response) =>{
    try{
        studyItem = req.body;
        const {row, times} = await studies.getData({id : studyItem.id, cur_date : studyItem.cur_date});
        
        return res.status(200).json({
            study :row,
            timeTotal : times
        });
    }catch(e){
        console.error(e);
    }
}

const studyRegister= async(req: Request, res : Response) =>{
    try{
        studyItem = req.body;

        await studies.addStudy({id : studyItem.id, cur_date : studyItem.cur_date, standard : studyItem.standard, todo : studyItem.todo});
        return res.status(200).json({});
    }catch(e){
        console.error(e);
    }
}

const studyDelete = async(req: Request, res : Response) =>{
    try{
        studyItem = req.body;
        const {row, times} = await studies.deleteStudy({id : studyItem.id, studyId : studyItem.studyId, cur_date : studyItem.cur_date});
        
        return res.status(200).json({
            study : row,
            timeTotal : times
        });
    }catch(e){
        console.error(e);
    }
}

const timeAdd = async(req: Request, res : Response) =>{
    try{
        timeItem = req.body;
        await studies.addTime({id : timeItem.id, 
                               cur_date : timeItem.cur_date, 
                               time : timeItem.time, 
                               studyId: timeItem.studyId});

        return res.status(200).json({});
    }catch(e){
        console.error(e);
    }
}

const history = async(req : Request, res : Response) =>{
    try{
        historyItem = req.body;
        const {curArr, yesArr} = await studies.history({id : historyItem.id,
                                                prevDate: historyItem.prevDate,
                                                nextDate : historyItem.nextDate});
        return res.status(200).json({
            curTotal : curArr,
            yesTotal : yesArr
        });
    }catch(e){
        console.error(e);
    }
}

export default{
    study,
    studyRegister,
    studyDelete,
    timeAdd,
    history
}