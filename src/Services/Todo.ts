import pool from "../Configs/database";
import logger from "../Loaders/logger";
import { ITodo } from "../Tools/Interfaces";
import { ADD_TODO, CHECK_TODO, DEL_TODO, TODOS } from "../Tools/Query";
import { TTodo } from "../Tools/Types";
import Repository from "./Repository";

class Todo extends Repository implements ITodo{
    constructor() {
        super();
    }

    public async getData({id, cur_date} : TTodo) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                const [row] = await this.dbConn.query(`${TODOS}`,[id, cur_date]);
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

    public async addTodo({id, cur_date, todo} : TTodo) : Promise<void>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                await this.dbConn.query(`${ADD_TODO}`,[id, cur_date, todo]);
                await this.dbConn.release();
            }catch(e){
                await this.dbConn.release();
                logger.error(`addTodo error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }

    public async delTodo({id, cur_date, todo} : TTodo) : Promise<void>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                await this.dbConn.query(`${DEL_TODO}`,[id, cur_date, todo]);
                await this.dbConn.release();
            }catch(e){
                await this.dbConn.release();
                logger.error(`Delodo error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }

    public async checkTodo({id ,cur_date,todo} : TTodo) : Promise<void>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                await this.dbConn.query(`${CHECK_TODO}`,[id, todo, cur_date]);
                await this.dbConn.release();
            }catch(e){
                await this.dbConn.release();
                logger.error(`CheckTodo error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }
};

export default Todo;