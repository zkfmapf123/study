import dotenv from "dotenv";

dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
    port : process.env.PORT,
    
    //mysql
    db_host : process.env.MYSQL_HOST,
    db_user : process.env.MYSQL_USER,
    db_password : process.env.MYSQL_PW,
    db_port : process.env.MYSQL_PORT,

    //그 외 나머지
    hash_round : process.env.HASH_ROUND,
}