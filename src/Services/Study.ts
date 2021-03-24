import pool from "../Configs/database";
import logger from "../Loaders/logger";
import { IStudyFunc } from "../Tools/Interfaces";
import { STUDIES, STUDY_DELETE, STUDY_REGISTER, TIME_ADD, TIME_TOTAL } from "../Tools/Query";
import { TStatistic, TStudy, TTime } from "../Tools/Types";
import Repository from "./Repository";

class Study extends Repository implements IStudyFunc{
    constructor() {
        super();
    }

    public async getData({id, cur_date} : TStudy) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            let [row] = await this.dbConn.query(`${STUDIES}`,[id, cur_date]);
            let times = await this.dbConn.query(`${TIME_TOTAL}`,[id, cur_date]);

            if(this.isEmpty(row)){
                row = [];
                times = 0;
            }else{
                row = row[0];
                times = times[0][0];
            }  
                
            return {row, times};   
        }catch(e){
            logger.error(`study getData error : ${e}`);
            console.error(e);
        }finally{
            await this.dbConn.release();
        }
    }

    public async addStudy({id , cur_date, standard, todo} : TStudy) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            await this.dbConn.query(`${STUDY_REGISTER}`,[id, cur_date, standard, todo]);
        }catch(e){
            logger.error(`addStudy error : ${e}`);
        }finally{
            await this.dbConn.release();
        }
    }

    public async deleteStudy({id , studyId,cur_date} : TStudy) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            await this.dbConn.query(`${STUDY_DELETE}`,[id, studyId]);

            const {row,times} = await this.getData({id : id, cur_date : cur_date});
            return {row,times};
        }catch(e){
            logger.error(`delete study error : ${e}`);
        }finally{
            await this.dbConn.release();
        }
    }

    public async addTime({id,studyId,cur_date, time} : TTime) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            await this.dbConn.query(`${TIME_ADD}`,[time, id, studyId]);
        }catch(e){
            logger.error(`addTime error : ${e}`);
        }finally{
            await this.dbConn.release();
        }
    }

    public async history({id, prevDate, nextDate} : TStatistic) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            const curTotal = await this.dbConn.query(`${TIME_TOTAL}`,[id, nextDate]);
            const yesTotal = await this.dbConn.query(`${TIME_TOTAL}`,[id, prevDate]);
            const curArr = curTotal[0][0];
            const yesArr = yesTotal[0][0];
            return {curArr, yesArr};
        }catch(e){
            await this.dbConn.release();
            logger.error(`history Error : ${e}`);
            console.error(e);
        }finally{
            await this.dbConn.release();
        }
    }
};

export default Study;