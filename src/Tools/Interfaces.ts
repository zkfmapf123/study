import { TRegisterUser, TValidUser, THomeGiveMethod, TTodoGiveMethod, TTodayGiveMethod, TTodo, TToday, TSubject, TStudy, TTime, TStatistic } from "./Types";

export interface IUsers{
    email ?: string;
    name ?: string;
    password ?: string;
    passwordCheck ?: string;
}

export interface IHome{
    id : string;
    cur_date : string;
}

export interface ITodoReaction{
    id : string;
    cur_date : string;
    todo : string;
    method : TTodoGiveMethod;
}

export interface ITodayReaction{
    id : string;
    cur_date : string;
    today : string;
    today_time : string;
    method : TTodayGiveMethod;
}

export interface IStudy{
    id : string;
    cur_date : string;
    standard ?: TSubject;
    todo ?: string;
}

export interface ITime{
    id : string;
    cur_date : string;
    standard : TSubject;
    todo : string;
    time : any;
}

export interface IStatistic{
    id : string;
    prevDate : string;
    nextDate : string;
}

export interface IUsersFunc{
    authValid({email , password} : TValidUser) : Promise<boolean>;
    authRegister({email , name, password} : TRegisterUser) : Promise<boolean>;
    validEmail(email : string) : Promise<any>;
    bcryptFunc(password : string) : Promise<any>;
};

export interface ITodo{
    getData({id, cur_date} : TTodo) : Promise<any>;
    addTodo({id, cur_date, todo} : TTodo) : Promise<void>;
    checkTodo({id, cur_date, todo} : TTodo) : Promise<void>;
    delTodo({id, cur_date, todo} : TTodo) : Promise<void>;
}

export interface IToday{
    getData({id, cur_date} : TToday) : Promise<any>;
    addToday({id, cur_date, today, today_time} : TToday) : Promise<void>;
    delToday({id, cur_date, today, today_time} : TToday) : Promise<void>;
}

export interface IStudyFunc{
    getData({id, cur_date} : TStudy) : Promise<any>;
    addStudy({id , cur_date, standard, todo} : TStudy) : Promise<void>;
    deleteStudy({id ,cur_date, standard, todo} : TStudy) : Promise<void>;
    addTime({id, cur_date, standard, todo, time} : TTime) : Promise<void>;
}

export interface IStatisticFunc{
    getData({id , prevDate, nextDate} : TStatistic) : Promise<any>;
}


