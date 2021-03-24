import pool from "../Configs/database";
import logger from "../Loaders/logger";
import { IToday } from "../Tools/Interfaces";
import { DEL_TODAY, TODAYS, ADD_TODAY} from "../Tools/Query";
import { TToday } from "../Tools/Types";
import Repository from "./Repository";
import Todo from "./Todo";

class Today extends Repository implements IToday{
    
    constructor() {
        super();
    }

    public async getData({id, cur_date} : TToday) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            const [row] = await this.dbConn.query(`${TODAYS}`,[id, cur_date]);
                
            if(this.isEmpty(row)) return [];
            else return row[0];
        }catch(e){
            logger.error(`todo getData error : ${e}`);
            return [];
        }finally{
            await this.dbConn.release();
        }
    }

    public async addToday({id , cur_date, today, today_time} : TToday) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            await this.dbConn.query(`${ADD_TODAY}`,[id, cur_date, today, today_time]);

            const [row] = await this.dbConn.query(`${TODAYS}`,[id, cur_date]);
            return row[0];
        }catch(e){
            logger.error(`addToday error : ${e}`);
        }finally{
            await this.dbConn.release();
        }
    };

    public async delToday({id, cur_date, todayId} : TToday) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            await this.dbConn.query(`${DEL_TODAY}`,[id, todayId]);
              
            const [row] = await this.dbConn.query(`${TODAYS}`,[id, cur_date]);
            return row[0];
        }catch(e){
            logger.error(`delToday error : ${e}`);
        }finally{
            await this.dbConn.release();
        }
    }
};

export default Today;