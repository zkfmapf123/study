import * as dotenv from "dotenv";
import * as supertest from "supertest";
import {expect} from "chai";

dotenv.config();

describe("test1",()=>{
    
    it("1+2는 귀요미",(done)=>{
        expect(1+2).to.be.eql(3);
        done();
    });

    it("2+2는 귀요미",(done)=>{
        expect(2+2).to.be.eql(4);
        done();
    });

    it("3+3는 귀요미",(done)=>{
        expect(3+3).to.be.eql(6);
        done();
    });

    it("4+4는 귀요미",(done)=>{
        expect(4+4).to.be.eql(8);
        done();
    });
});

