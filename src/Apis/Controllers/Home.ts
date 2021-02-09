import {Request, Response} from "express";
import Today from "../../Services/Today";
import Todo from "../../Services/Todo";
import {IHome, ITodayReaction, ITodoReaction} from "../../Tools/Interfaces";

let homeItem : IHome;
let todoItem : ITodoReaction;
let todayItem : ITodayReaction;
const TodayTodo : Todo = new Todo();
const TodayToday : Today = new Today(); 

const home = async(req : Request, res :Response) =>{
    try{
        homeItem = req.body;
        const {todo, ratio} = await TodayTodo.getData({id : homeItem.id, cur_date : homeItem.cur_date});
        const todayArr = await TodayToday.getData({id : homeItem.id, cur_date : homeItem.cur_date});

        return res.status(200).json({
            todo : todo[0],
            ratio : ratio[0],
            today : todayArr
        });
    }catch(e){
        console.error(e);
    }
};

const todo = async(req : Request, res : Response) =>{
    let todos : any;
    let ratios : any;
    try{
        todoItem = req.body;
        if(todoItem.method === "add"){
            const {todo, ratio} = await TodayTodo.addTodo({id : todoItem.id, cur_date : todoItem.cur_date, todos : todoItem.todo});
            todos = todo;
            ratios = ratio;
        }else if(todoItem.method === "check"){  
            const {todo, ratio} = await TodayTodo.checkTodo({id : todoItem.id, cur_date : todoItem.cur_date, todos : todoItem.todo});
            todos = todo;
            ratios = ratio;
        }else{
            const {todo, ratio} = await TodayTodo.delTodo({id : todoItem.id, cur_date : todoItem.cur_date, todos : todoItem.todo});
            todos = todo;
            ratios = ratio;
        }

        return res.status(200).json({
            todo : todos,
            ratio : ratios
        });
    }catch(e){
        console.error(e);
    }
};


const today = async(req : Request, res :Response) =>{
    let response : any;
    try{
        todayItem = req.body;
        if(todayItem.method === "add"){
            response = await TodayToday.addToday({id : todayItem.id, cur_date : todayItem.cur_date, today : todayItem.today, today_time : todayItem.today_time});
        }else{
            response = await TodayToday.delToday({id : todayItem.id, cur_date : todayItem.cur_date, today : todayItem.today, today_time : todayItem.today_time});
        }

        return res.status(200).json({
            today : response
        });
    }catch(e){

    }
};

export default {
    home,
    todo,
    today
};
