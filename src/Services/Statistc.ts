import Repository from "./Repository";
import {IStatisticFunc} from "../Tools/Interfaces";
import { TStatistic } from "../Tools/Types";
import pool from "../Configs/database";
import logger from "../Loaders/logger";
import { STATISTICS_BARCHART, STATISTICS_LIST, STATISTICS_PIECHART } from "../Tools/Query";

class Statistc extends Repository implements IStatisticFunc{
    
    constructor() {
        super();
    }

    public async getData({id, prevDate, nextDate} : TStatistic) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                let chart : Array<any> = new Array<any>(3);
                chart[0] = await this.dbConn.query(`${STATISTICS_BARCHART}`,[id, prevDate, nextDate]);
                chart[1] = await this.dbConn.query(`${STATISTICS_PIECHART}`,[id, prevDate, nextDate]);
                chart[2] = await this.dbConn.query(`${STATISTICS_LIST}`,[id, prevDate, nextDate]);

                await this.dbConn.release();
                for(let i in chart){
                    if(this.isEmpty(chart[i][0][0])) chart[i] = 0;
                    else chart[i] = chart[i][0][0];
                }

                return {chart};
            }catch(e){
                await this.dbConn.release();
                logger.error(`statistic getData error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }
};

export default Statistc;