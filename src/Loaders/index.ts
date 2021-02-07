import {Request, Response} from "express";
import * as express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "./logger";
import api from "../Apis/api";

class index{
    private app : express.Application;
    private port : number;

    constructor(app : express.Application, port : number){
        this.app = app;
        this.port= port;
        this.endpoint();
        this.defaultSetting();
        this.setting();
        this.app.use("/api",api());
        this.errorHandling();
    }

    //default Setting
    private defaultSetting() : void{
        console.log("appDefaultSetting Complete");
        this.app.use((req,res,next): void=>{
            res.header("Access-Control-Allow-Origin","*");                                               //cors 에러가 나니까 모든곳에서 허용한다. 보안 취약
            res.header("Access-Control-Allow-Headers","X-Requested-With, Content-Type, Authorization")   //대신 header를 저 3곳에서만 허용
            res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,PATCH");                      //RestFul api를 5개에서만 받겠따.
            next();
        });
    }

    //endpoint
    private endpoint(){
        console.log("endpoint");

        this.app.get("/status",(req, res)=>{
            res.status(200).end();
        });

        this.app.head("/status",(req, res)=>{
            res.status(200).end();
        })
    }

    //setting
    private setting(){
        console.log("setting");

        this.app.enable("trust proxy");
        this.app.use(cors());
        this.app.use(require("method-override")());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended : false}));
    }

    //errorhandling
    private errorHandling(){
        //그외 다른 url에 들어갔을때 400 || 500 이뜨게 되는데 이때 
        console.log("error handling");
        
        this.app.use(((req : Request, res : Response, next : express.NextFunction) =>{
            const err = new Error("Not Found");
            err['status'] = 400;
            next(err);
        }));

        //error handling
        this.app.use((err , req, res, next)=>{
            if(err.name === "UnauthorizedError"){
                return res  
                    .status(err.status)
                    .send({ message : err.message})
                    .end();
            }
            return next(err);
        });

        this.app.use((err ,req , res ,next)=>{
            //이 화면이 나오게 된다.
            res.status(err.status || 500);
            res.json({
                errors:{
                    message :`안녕자기 : ${err}`
                }
            });
        });
    };

    public async start(){
        try{
            this.app.listen(this.port,()=>{
                logger.info(`app running http://localhost:${this.port}`);
            }).on("error",err=>{
                logger.error(err);
                process.exit(1);
            })
        }catch(e){
            logger.error("app start error");
        }
    }
};

export default index;

