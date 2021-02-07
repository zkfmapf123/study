import {Request, Response} from "express";
import Statistc from "../../Services/Statistc";
import { IStatistic } from "../../Tools/Interfaces";

let staticsticItem : IStatistic;
const statisticArr : Statistc = new Statistc(); 

const statistic = async(req: Request, res : Response) =>{
    try{
        staticsticItem = req.body;
        const {chart} = await statisticArr.getData({id : staticsticItem.id, prevDate : staticsticItem.prevDate, nextDate : staticsticItem.nextDate});

        return res.status(200).json({
            barChart : chart[0],
            pieChart : chart[1],
            list : chart[2]
        });

    }catch(e){
        console.error(e);
    }
};

export default{
    statistic
};
