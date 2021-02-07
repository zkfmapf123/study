import supertest from "supertest";
import {expect} from "chai";
import {SERVER_API, TEST_CUR_DATE, TEST_USER_ID} from "../src/Tools/Const";

describe("statistic View",()=>{
    
    it("statistic 데이터를 보여준다",(done)=>{
        supertest(SERVER_API).post("/api/statistic")
        .send({
            id : 1,
            prevDate : "0",
            nextDate : "1"
        })
        .end((err, res)=>{
            console.log(res.body);
            expect(res.status).to.be.eql(200);
            done();
        })
    })
});

