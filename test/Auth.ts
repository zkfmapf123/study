import supertest from "supertest";
import {expect} from "chai";
import {SERVER_API} from "../src/Tools/Const";

const email = "zkfmapf123@naver.com";
const name = "이동규";
const password = "123";

describe("auth화면 테스팅",()=>{
    
    it("회원가입을 진행한다",(done)=>{
        supertest(SERVER_API).post("/api/auth/register")
        .send({
            email: email,
            name : name,
            password : password
        })
        .end((err, res)=>{
            console.log(res.body);
            expect(res.status).to.be.eql(200);
            done();
        })
    });
    
    it("로그인을 진행한다",(done)=>{
        supertest(SERVER_API).post("/api/auth/valid")
        .send({
            email : email,
            password : password
        })
        .end((err, res)=>{
            expect(res.status).to.be.eql(200);
            done();
        })
    });
})