import {Request, Response} from "express";
import Login from "../../Services/Login";
import { IUsers } from "../../Tools/Interfaces";

let user : IUsers;
const login : Login = new Login();

const authValid = async(req : Request, res : Response) =>{
    try{
        user = req.body;
        if(await login.authValid({email : user.email, password : user.password})){
            res.status(200).json({})
        }else{
            //유효한 이메일이 존재하지 않는다.
            res.status(202).json({})
        }
    }catch(e){
        console.error(e);
    }  
};

const authRegister = async(req : Request, res : Response) =>{
    try{
        user = req.body;
        if(await login.authRegister({email : user.email,
                                     name : user.name,
                                     password : user.password})){
                                         res.status(200).json({});
                                     }else{
                                         //중복된 이메일이다.
                                         res.status(202).json({});
                                     }
    }catch(e){
        console.error(e);
    }
};

export default{
    authValid,
    authRegister
};

