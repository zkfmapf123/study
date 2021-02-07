import * as mysql2 from "mysql2/promise";
import config from "../Configs/index";

const dbConfig = {
    host : config.db_host,
    user : config.db_user,
    password : config.db_password,
    database : "st",
    port : +config.db_port,
    connectionLimit : 10,
    waitForConnections : true
};

const pool = mysql2.createPool(dbConfig);
export default pool;

