import pool from "../Configs/database";
import logger from "../Loaders/logger";
import { ITodo } from "../Tools/Interfaces";
import { ADD_TODO, CHECK_TODO, DEL_TODO, TODOS, TODO_RATIO } from "../Tools/Query";
import { TTodo } from "../Tools/Types";
import Repository from "./Repository";

class Todo extends Repository implements ITodo{
    constructor() {
        super();
    }

    public async getData({id, cur_date} : TTodo) : Promise<any>{
        let todo : any;
        let ratio : any;
        try{
            this.dbConn = await pool.getConnection();
            let [row] = await this.dbConn.query(`${TODOS}`,[id, cur_date]);
            todo = row;
            if(this.isEmpty(row)){
                return [];
            }else{
                let [row] = await this.dbConn.query(`${TODO_RATIO}`,[id,cur_date]);
                ratio = row;
                return {todo, ratio};
            }
        }catch(e){
            logger.error(`todo getData error : ${e}`);
        }finally{
            await this.dbConn.release();
        }
    }

    public async addTodo({id, cur_date, todos} : TTodo) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            await this.dbConn.query(`${ADD_TODO}`,[id, cur_date, todos]);

            let {todo, ratio} =  await this.getData({id:id, cur_date : cur_date});
            todo = todo[0];
            ratio = ratio[0];

            return {todo, ratio};
        }catch(e){
                logger.error(`addTodo error : ${e}`);
        }finally{
            await this.dbConn.release();
        }
    }

    public async delTodo({id, cur_date, todoId} : TTodo) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            await this.dbConn.query(`${DEL_TODO}`,[id,todoId]);
                
            let {todo, ratio} =  await this.getData({id:id, cur_date : cur_date});
            todo = todo[0];
            ratio = ratio[0];

            return {todo, ratio};
        }catch(e){
            logger.error(`Delodo error : ${e}`);
        }finally{
            await this.dbConn.release();
        }
    }

    public async checkTodo({id ,cur_date,todoId} : TTodo) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            await this.dbConn.query(`${CHECK_TODO}`,[id,todoId]);

            let {todo, ratio} =  await this.getData({id:id, cur_date : cur_date});
            todo = todo[0];
            ratio = ratio[0];

            return {todo, ratio};
        }catch(e){
            logger.error(`CheckTodo error : ${e}`);
        }finally{
            await this.dbConn.release();
        }
    }
};

export default Todo;