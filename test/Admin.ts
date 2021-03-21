import supertest from "supertest";
import {expect} from "chai";
import { TEST_SERVER } from "../../SpeakEars/src/Tools/CONST";
import { TEST_USER_ID } from "../src/Tools/Const";

describe('admin 화면 테스팅',()=>{

    it('리뷰를 쓴다',(done)=>{
        supertest(TEST_SERVER).post('/admin/review')
        .send({
            id: TEST_USER_ID,
            separate: "아이디어",
            content: "너무 좋아영"
        })
        .end((err,res)=>{
            console.log(res.body);
            expect(res.status).to.be.eql(200);
            done();
        })
    })

    it('어드민 페이지를 들어간다',()=>{

    });

});