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
    todoId ?: string;
    cur_date ?: string;
    todos ?: string;
}

export type TToday={
    id : string;
    todayId ?: string;
    cur_date ?: string;
    today ?: string;
    today_time ?: string;
}

export type TStudy = {
    id : string;
    studyId ?: string;
    cur_date ?: string;
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
    studyId ?: string;
    cur_date ?: string;
    time ?: any;
}

export type TadminReview = {
    id : string;
    review : TReview;
    content : string;
}

export type TReview = "아이디어/공유" | "평가/리뷰" | "하고싶은 말";
export type THomeGiveMethod = "entire" | "todo" | "today";
export type TTodoGiveMethod = "add" | "check" | "delete";
export type TTodayGiveMethod = "add" | "delete";
export type TSubject = "국어" | "영어" | "수학" | "한국사" | "사회/과학/직업탐구" | "한문/제2외국어" | "기타";
