import supertest from "supertest";
import {expect} from "chai";
import {SERVER_API, TEST_CUR_DATE, TEST_USER_ID} from "../src/Tools/Const";
import { TEST_SERVER } from "../../SpeakEars/src/Tools/CONST";

describe("main화면 테스팅",()=>{
    
    it("메인화면에서 날짜에 맞는 정보를 전달한다.",(done)=>{
        supertest(TEST_SERVER).post("/api/")
        .send({
            id : TEST_USER_ID,
            cur_date : TEST_CUR_DATE,
        })
        .end((err,res)=>{
            console.log(res.body);
            expect(res.status).to.be.eql(200);
            done();
        })
    });
    
    
    //할일목록도 중복되는 것은 프론트에서 자른다.
    // it("할일목록을 추가시킨다.",(done)=>{
    //     supertest(TEST_SERVER).put("/api/todo")
    //     .send({
    //         id : TEST_USER_ID,
    //         cur_date : TEST_CUR_DATE,
    //         todo : "밥먹기",
    //         method : "add"
    //     })
    //     .end((err, res)=>{
    //         expect(res.status).to.be.eql(200);
    //         done();
    //     })
    // });

    // it("할일목록을 삭제시킨다",(done)=>{
    //     supertest(TEST_SERVER).put("/api/todo")
    //     .send({
    //         id : TEST_USER_ID,
    //         cur_date: "00",
    //         todoId : 1,
    //         method : "delete"
    //     })
    //     .end((err, res)=>{
    //         expect(res.status).to.be.eql(200);
    //         done();
    //     })
    // });

    it("할일목록을 체크표시한다",(done)=>{
        supertest(TEST_SERVER).put("/api/todo")
        .send({
            id : TEST_USER_ID,
            cur_date: "00",
            todoId : 1,
            method : "check"
        })
        .end((err, res)=>{
            expect(res.status).to.be.eql(200);
            done();
        })
    });

    //오늘의 목록에서 중복되는 시간은 프론트에서 자른다.
    // it("오늘의 목록을 추가시킨다",(done)=>{
    //     supertest(TEST_SERVER).put("/api/today")
    //     .send({
    //         id : TEST_USER_ID,
    //         cur_date : TEST_CUR_DATE,
    //         today : "아침먹스",
    //         today_time : "0613",
    //         method : "add"
    //     })
    //     .end((err, res)=>{
    //         expect(res.status).to.be.eql(200);
    //         done();
    //     })
    // });

    it("오늘의 목록을 삭제시킨다",(done)=>{
        supertest(TEST_SERVER).put("/api/today")
        .send({
            id : TEST_USER_ID,
            todayId : 1,
            method : "delete"
        })
        .end((err, res)=>{
            expect(res.status).to.be.eql(200);
            done();
        })
    });

})