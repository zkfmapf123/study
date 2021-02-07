export type TValidUser={
    email : string;
    password : string;
}

export type TRegisterUser={
    email : string;
    name : string;
    password : string;
}

export type TTodo={
    id : string;
    cur_date : string;
    todo ?: string;
}

export type TToday={
    id : string;
    cur_date : string;
    today ?: string;
    today_time ?: string;
}

export type TStudy = {
    id : string;
    cur_date : string;
    standard ?: TSubject
    todo ?: string;
}

export type THome={
     id : string;
     cur_date : string;
}

export type TStatistic={
    id : string;
    prevDate : string;
    nextDate : string;
}

export type TTime={
    id : string;
    cur_date : string;
    standard : TSubject;
    todo : string;
    time : any;
}

export type THomeGiveMethod = "entire" | "todo" | "today";
export type TTodoGiveMethod = "add" | "check" | "delete";
export type TTodayGiveMethod = "add" | "delete";
export type TSubject = "국어" | "영어" | "수학" | "한국사" | "사/과/직" | "제2외국어/한문" | "기타";
