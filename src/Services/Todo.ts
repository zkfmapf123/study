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
            try{
                let [row] = await this.dbConn.query(`${TODOS}`,[id, cur_date]);
                todo = row;
                if(this.isEmpty(row)){
                    await this.dbConn.release();
                    return [];
                }else{
                    let [row] = await this.dbConn.query(`${TODO_RATIO}`,[id,cur_date]);
                    ratio = row;
                    await this.dbConn.release();
                    return {todo, ratio};
                }
            }catch(e){
                await this.dbConn.release();
                logger.error(`todo getData error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }

    public async addTodo({id, cur_date, todos} : TTodo) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                await this.dbConn.query(`${ADD_TODO}`,[id, cur_date, todos]);
                await this.dbConn.release();
                let {todo, ratio} =  await this.getData({id:id, cur_date : cur_date});
                todo = todo[0];
                ratio = ratio[0];

                return {todo, ratio};
            }catch(e){
                await this.dbConn.release();
                logger.error(`addTodo error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }

    public async delTodo({id, cur_date, todos} : TTodo) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                await this.dbConn.query(`${DEL_TODO}`,[id, cur_date, todos]);
                await this.dbConn.release();
                let {todo, ratio} =  await this.getData({id:id, cur_date : cur_date});
                todo = todo[0];
                ratio = ratio[0];

                return {todo, ratio};
            }catch(e){
                await this.dbConn.release();
                logger.error(`Delodo error : ${e}`);
                console.error(e);
            }
        }catch(e){
            console.error(e);
        }
    }

    public async checkTodo({id ,cur_date,todos} : TTodo) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            try{
                await this.dbConn.query(`${CHECK_TODO}`,[id, todos, cur_date]);
                await this.dbConn.release();
                let {todo, ratio} =  await this.getData({id:id, cur_date : cur_date});
                todo = todo[0];
                ratio = ratio[0];

                return {todo, ratio};
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