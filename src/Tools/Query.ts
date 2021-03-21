//auth
export const AUTH_VALID = "select salt, password from Users where email = ?";
export const AUTH_REGISTER = "insert into Users(email, nickName, password, salt) values(?,?,?,?)";

//home
export const TODOS = "call proc_todo(?,?)";
export const TODO_RATIO = "call proc_todo_ratio(?,?)";
export const TODAYS ="call proc_today(?,?)";
export const ADD_TODO = "insert into User_todo_list(users_id, cur_date, todo) values(?,?,?)";
export const CHECK_TODO = "update User_todo_list set isChecked = !isChecked where users_id = ? and id = ?";
export const DEL_TODO = "delete from User_todo_list where users_id = ? and id = ?";

export const ADD_TODAY = "insert into User_today(users_id, cur_date, todo, today_time) values(?,?,?,?)";
export const DEL_TODAY = "delete from User_today where users_id = ? and id = ?";

//study
export const STUDIES = "call proc_study(?,?)";
export const STUDY_REGISTER = "insert into User_study(users_id, cur_date, standard, todo) values(?,?,?,?)";
export const STUDY_DELETE = "delete from User_study where users_id = ? and id = ?";
export const TIME_ADD = "update User_study set study_time = ? where users_id = ? and id = ?";
export const TIME_TOTAL = "call proc_study_total(?,?)";

//statistic
export const STATISTICS_BARCHART = "call proc_statistic_barChart(?,?,?)";
export const STATISTICS_PIECHART = "call proc_statistic_pieChart(?,?,?)";
export const STATISTICS_LIST = "call proc_statistic_list(?,?,?)";

//admin
export const ADMIN_REIVEW = "insert into Admin(userId, separate, content) values(?,?,?)";