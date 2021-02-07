import {Request, Response} from "express";
import Today from "../../Services/Today";
import Todo from "../../Services/Todo";
import {IHome, ITodayReaction, ITodoReaction} from "../../Tools/Interfaces";

let homeItem : IHome;
let todoItem : ITodoReaction;
let todayItem : ITodayReaction;
const todos : Todo = new Todo();
const todays : Today = new Today(); 

const home = async(req : Request, res :Response) =>{
    try{
        homeItem = req.body;
        const todoAarr = await todos.getData({id : homeItem.id, cur_date : homeItem.cur_date});
        const todayArr = await todays.getData({id : homeItem.id, cur_date : homeItem.cur_date});

        return res.status(200).json({
            todo : todoAarr,
            today : todayArr
        });
    }catch(e){
        console.error(e);
    }
};

const todo = async(req : Request, res : Response) =>{
    try{
        todoItem = req.body;
        if(todoItem.method === "add"){
            await todos.addTodo({id : todoItem.id, cur_date : todoItem.cur_date, todo : todoItem.todo});
        }else if(todoItem.method === "check"){  
            await todos.checkTodo({id : todoItem.id, cur_date : todoItem.cur_date, todo : todoItem.todo});
        }else{
            await todos.delTodo({id : todoItem.id, cur_date : todoItem.cur_date, todo : todoItem.todo});
        }

        return res.status(200).json({});
    }catch(e){
        console.error(e);
    }
};


const today = async(req : Request, res :Response) =>{
    try{
        todayItem = req.body;
        if(todayItem.method === "add"){
            await todays.addToday({id : todayItem.id, cur_date : todayItem.cur_date, today : todayItem.today, today_time : todayItem.today_time});
        }else{
            await todays.delToday({id : todayItem.id, cur_date : todayItem.cur_date, today : todayItem.today, today_time : todayItem.today_time});
        }

        return res.status(200).json({});
    }catch(e){

    }
};

export default {
    home,
    todo,
    today
};
