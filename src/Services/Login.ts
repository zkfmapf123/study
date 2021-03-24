import {IUsersFunc} from "../Tools/Interfaces";
import Repository from "./Repository";
import pool from "../Configs/database";
import { TRegisterUser, TValidUser } from "../Tools/Types";
import logger from "../Loaders/logger";
import {AUTH_REGISTER, AUTH_VALID} from "../Tools/Query";
import * as bcrypt from "bcrypt";
import config from "../Configs/index";

class Login extends Repository implements IUsersFunc{
    
    constructor() {
        super();
    }

    private async findUserId(email : string) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            const [row] = await this.dbConn.query(`select id,nickName from Users where email = ?`,[email]);
            return row[0];
        }catch(e){
            logger.error(`findUserId error : ${e}`);
            return [];
        }finally{
            await this.dbConn.release();
        }
    }

    public async authValid ({email, password}:TValidUser): Promise<any>{
        try{   
            const response = await this.validEmail(email);
            if(response !== true)
                if(await bcrypt.compare(password, response.password))
                    return await this.findUserId(email);
                    
            //유효한 이메일이 아니거나, 비밀번호가 맞지 않는다.
            return false;
        }catch(e){
            console.error(e);
        }
    }

    public async validEmail(email : string) : Promise<any>{
        try{
            this.dbConn = await pool.getConnection();
            const [row] = await this.dbConn.query(`${AUTH_VALID}`,[email]);
            
            if(this.isEmpty(row)) return true;
            else return row[0];
        }catch(e){
            logger.error(`validEamil error : ${e}`);
            return [];
        }finally{
            await this.dbConn.release();
        }
    }

    public async authRegister({email, name,password}:TRegisterUser) : Promise<boolean>{
        try{
            if(await this.validEmail(email)){
                this.dbConn = await pool.getConnection();
                const {hash, salt} = await this.bcryptFunc(password);
                await this.dbConn.query(`${AUTH_REGISTER}`,[email, name, hash, salt]);
                await this.dbConn.release();
                return true;
            }else return false;

        }catch(e){
            await this.dbConn.release();
            logger.error(`authRegister error :${e}`);
            return false;
        }finally{
            await this.dbConn.release();
        }
    }

    public async bcryptFunc(password : string) : Promise<any>{
        try{
            const salt = await bcrypt.genSalt(+config.hash_round);
            const hash = await bcrypt.hash(password, salt);
            
            return {hash, salt};
        }catch(e){
            logger.error(`bcrypt erorr : ${e}`);
            console.error(e);
        }
    }
};

export default Login;