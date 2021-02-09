import pool from "../Configs/database";
import logger from "../Loaders/logger";
import { IStudyFunc } from "../Tools/Interfaces";
import { STUDIES, STUDY_DELETE, STUDY_REGISTER, TIME_ADD } from "../Tools/Query";
import { TStudy, TTime } from "../Tools/Types";
import Repository from "./Repository";

class Study extends Repository implements IStudyFunc{
    constructor() {
        super();
    }

    public async getData({id, cur_date} : TStudy) : Promise<any>{
        try{
           this.dbConn = await pool.getConnection();
           try{
                const [row] = await this.dbConn.query(`${STUDIES}`,[id, cur_date]);
                await this.dbConn.release();
                if(this.isEmpty(row)) return [];
                else return row[0];
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
            
                const response = await this.getData({id : id, cur_date : cur_date});
                return response;

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

                const response = await this.getData({id : id, cur_date : cur_date});
                return response;
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

                const response = await this.getData({id : id, cur_date : cur_date});
                return response;
            }catch(e){
                await this.dbConn.release();
                logger.error(`addTime error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }
};

export default Study;