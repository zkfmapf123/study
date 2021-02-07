class Repository{
    protected dbConn : any;

    constructor() {
        
    }

    protected isEmpty(value) : boolean{
        if(value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)){
            return true;
        }else{
            return false;
        }
    }
};

export default Repository;