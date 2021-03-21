import { TRegisterUser, TValidUser, THomeGiveMethod, TTodoGiveMethod, TTodayGiveMethod, TTodo, TToday, TSubject, TStudy, TTime, TStatistic, TadminReview, TReview } from "./Types";

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
    todoId ?: string;
    cur_date ?: string;
    todo ?: string;
    method ?: TTodoGiveMethod;
}

export interface ITodayReaction{
    id : string;
    todayId ?: string;
    cur_date ?: string;
    today ?: string;
    today_time ?: string;
    method ?: TTodayGiveMethod;
}

export interface IStudy{
    id : string;
    studyId ?: string;
    cur_date ?: string;
    standard ?: TSubject;
    todo ?: string;
}

export interface ITime{
    id : string;
    studyId ?: string;
    cur_date ?: string;
    time ?: any;
}

export interface IStatistic{
    id : string;
    prevDate : string;
    nextDate : string;
}

export interface IReview{
    id : string;
    separate : TReview;
    content:  string;
}

export interface IUsersFunc{
    authValid({email , password} : TValidUser) : Promise<boolean>;
    authRegister({email , name, password} : TRegisterUser) : Promise<boolean>;
    validEmail(email : string) : Promise<any>;
    bcryptFunc(password : string) : Promise<any>;
};

export interface ITodo{
    getData({id, cur_date} : TTodo) : Promise<any>;
    addTodo({id, cur_date, todos} : TTodo) : Promise<any>;
    checkTodo({id, todoId} : TTodo) : Promise<any>;
    delTodo({id, todoId} : TTodo) : Promise<any>;
}

export interface IToday{
    getData({id, cur_date} : TToday) : Promise<any>;
    addToday({id, cur_date, today, today_time} : TToday) : Promise<any>;
    delToday({id, todayId} : TToday) : Promise<any>;
}

export interface IStudyFunc{
    getData({id, cur_date} : TStudy) : Promise<any>;
    addStudy({id , cur_date, standard, todo} : TStudy) : Promise<any>;
    deleteStudy({id ,studyId} : TStudy) : Promise<any>;
    addTime({id, studyId, time} : TTime) : Promise<any>;
}

export interface IStatisticFunc{
    getData({id , prevDate, nextDate} : TStatistic) : Promise<any>;
}

export interface IAdmin{
    writeReview({id, review, content} : TadminReview): Promise<boolean>;
}


