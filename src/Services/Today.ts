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
            try{
                const [row] = await this.dbConn.query(`${TODAYS}`,[id, cur_date]);
                await this.dbConn.release();
                if(this.isEmpty(row)) return [];
                else return row[0];
            }catch(e){
                await this.dbConn.release();
                logger.error(`todo getData error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }

    public async addToday({id , cur_date, today, today_time} : TToday) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                await this.dbConn.query(`${ADD_TODAY}`,[id, cur_date, today, today_time]);
                await this.dbConn.release();
                const [row] = await this.dbConn.query(`${TODAYS}`,[id, cur_date]);
                return row[0];
            }catch(e){
                await this.dbConn.release();
                logger.error(`addToday error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    };

    public async delToday({id, cur_date, todayId} : TToday) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                await this.dbConn.query(`${DEL_TODAY}`,[id, todayId]);
                await this.dbConn.release();
                const [row] = await this.dbConn.query(`${TODAYS}`,[id, cur_date]);
                return row[0];
            }catch(e){
                await this.dbConn.release();
                logger.error(`delToday error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }
};

export default Today;