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
           try{
                let [row] = await this.dbConn.query(`${STUDIES}`,[id, cur_date]);
                let times = await this.dbConn.query(`${TIME_TOTAL}`,[id, cur_date]);

                await this.dbConn.release();
                if(this.isEmpty(row)){
                    row = [];
                    times = 0;
                }else{
                    row = row[0];
                    times = times[0][0];
                }  
                
                return {row, times};
           }catch(e){
                await this.dbConn.release();
                logger.error(`study getData error : ${e}`);
                console.error(e);
           }     
        }catch(e){
            console.error(e);
        }
    }

    public async addStudy({id , cur_date, standard, todo} : TStudy) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                await this.dbConn.query(`${STUDY_REGISTER}`,[id, cur_date, standard, todo]);
                await this.dbConn.release();
                //새로고침을 누른다.
            }catch(e){
                await this.dbConn.release();
                logger.error(`addStudy error : ${e}`);
            }
        }catch(e){
            console.error(e);
        }
    }

    public async deleteStudy({id , studyId,cur_date} : TStudy) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                await this.dbConn.query(`${STUDY_DELETE}`,[id, studyId]);
                await this.dbConn.release();

                const {row,times} = await this.getData({id : id, cur_date : cur_date});
                return {row,times};
            }catch(e){
                await this.dbConn.release();
                logger.error(`delete study error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }

    public async addTime({id,studyId,cur_date, time} : TTime) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                await this.dbConn.query(`${TIME_ADD}`,[time, id, studyId]);
                await this.dbConn.release();
            }catch(e){
                await this.dbConn.release();
                logger.error(`addTime error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }

    public async history({id, prevDate, nextDate} : TStatistic) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                const curTotal = await this.dbConn.query(`${TIME_TOTAL}`,[id, nextDate]);
                const yesTotal = await this.dbConn.query(`${TIME_TOTAL}`,[id, prevDate]);
                const curArr = curTotal[0][0];
                const yesArr = yesTotal[0][0];
                await this.dbConn.release();
                return {curArr, yesArr};

            }catch(e){
                await this.dbConn.release();
                logger.error(`history Error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }
};

export default Study;