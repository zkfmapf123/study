import supertest from "supertest";
import {expect} from "chai";
import {SERVER_API, TEST_CUR_DATE, TEST_USER_ID} from "../src/Tools/Const";

describe("study 화면",()=>{

    it("study화면에 날짜에 해당하는 데이터가 나온다",(done)=>{
        supertest(SERVER_API).post("/api/study")
        .send({
            id : TEST_USER_ID,
            cur_date : TEST_CUR_DATE,
        })
        .end((err, res)=>{
            console.log(res.body);
            expect(res.status).to.be.eql(200);
            done();
        })
    });

    // it("study를 적용한다",(done)=>{
    //     supertest(SERVER_API).put("/api/study/register")
    //     .send({
    //         id : TEST_USER_ID,
    //         standard : "수학",
    //         todo : "쎈수학풀기"
    //     })
    //     .end((err, res)=>{
    //         expect(res.status).to.be.eql(200);
    //         done();
    //     })
    // });

    // it("study를 지운다",(done)=>{
    //     supertest(SERVER_API).delete("/api/study/delete")
    //     .send({
    //         id : TEST_USER_ID,
    //         studyId : 1
    //     })
    //     .end((err ,res)=>{
    //         expect(res.status).to.be.eql(200);
    //         done();
    //     })
    // });

    it("time을 업데이트 한다",(done)=>{
        supertest(SERVER_API).put("/api/study/timeAdd")
        .send({
            id : TEST_USER_ID,
            studyId : 5,
            time : 1000
        })
        .end((err, res)=>{
            expect(res.status).to.be.eql(200);
            done();
        })
    })
})