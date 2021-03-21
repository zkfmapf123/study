import pool from "../Configs/database";
import logger from "../Loaders/logger";
import { IAdmin, IReview } from "../Tools/Interfaces";
import { ADMIN_REIVEW } from "../Tools/Query";
import { TadminReview, TReview } from "../Tools/Types";
import Repository from "./Repository";

class Admin extends Repository implements IAdmin{
    constructor(){
        super();
    }
    
    async writeReview({ id, review, content }: TadminReview): Promise<boolean> {
        try{
            this.dbConn = await pool.getConnection();
            await this.dbConn.query(`${ADMIN_REIVEW}`,
            [id, review, content]);

            return true;
        }catch(e){
            logger.error(`write review error :${e}`);
            return false;
        }finally{
            await this.dbConn.release();
        }
    }
    
};

export default Admin;