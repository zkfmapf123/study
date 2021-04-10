# Study_Server

## Description
```
   nodejs + TDD(mocha)를 사용하여 안전하고 유연한 서버를 기획하였다.
   유저 - 데이터간의 관계가 중요하다고 생각하여 mysql를 도입하였으며 직접 Query를 작성하기로 하여,
   orm은 사용하지 않았다. 또한 서버 운영은 aws ec2서버내에서 nginx와 pm2를 이용하여 운영할 계획이다.
```

## 1. Architecture
![servd](https://user-images.githubusercontent.com/47292546/114265133-16fe4a80-9a2a-11eb-8e19-d3102c534fc4.PNG)

## 2. nodejs
<a href="https://blog.naver.com/zkfmapf123/222146785347">왜? nodejs를 사용하였나?(네이버 블로그)</a>

## 3. TDD를 이용한 개발
<a href="https://blog.naver.com/zkfmapf123/222146785347">왜? tdd를 도입하였나?(네이버 블로그)</a>

![ghdnljs](https://user-images.githubusercontent.com/47292546/114265185-647ab780-9a2a-11eb-96cf-17836b338280.PNG)


## 4. Business로직의 분리
![folder](https://user-images.githubusercontent.com/47292546/114265214-85dba380-9a2a-11eb-937e-6d86cf658288.PNG)


## 5. Log처리를 이용한 유지보수 및 어플리케이션 관리

```
직접 앱을 한달간 운영을 해보면서,
기존에 개발할 때와는 달리 error를 찾기가 힘들었다.
그렇기 때문에 logger를 이용한 로그처리로 인하여 app문제에 있어 좀더 유연하게 대처 할 수 있었다

import * as winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

const logDir = "./logs"
const {combine, timestamp, printf} = winston.format;

const logFormat = printf(info =>{
    return `${info.timestamp} (${info.level}) => ${info.message}`;
});

/*
    log level
    error : 0
    warn : 1
    info : 2
    http : 3
    verbose : 4
    debug : 5
    silly : 6
*/

const logger = winston.createLogger({
    format : combine(
        timestamp({
            format:"YYYY-MM-DD HH:mm:ss",
        }),
        logFormat
    ),

    transports:[
        //info
        new winstonDaily({
            level : "info",
            datePattern : "YYYY-MM-DD",
            dirname : logDir,
            filename : "info.log",
            maxFiles : 10, //10일치 
            zippedArchive : true
        }),

        //error
        new winstonDaily({
            level : "error",
            datePattern : "YYYY-MM-DD",
            dirname : logDir,
            filename : "Error.log",
            maxFiles : 10,
            zippedArchive : true
        })
    ]
});

export default logger;
```

```
// log처리를 도입한 /service/statistic.ts

public async getData({id, prevDate, nextDate} : TStatistic) : Promise<any>{
            try{
                this.dbConn = await pool.getConnection();
                let chart : Array<any> = new Array<any>(3);
                chart[0] = await this.dbConn.query(`${STATISTICS_BARCHART}`,[id, prevDate, nextDate]);
                chart[1] = await this.dbConn.query(`${STATISTICS_PIECHART}`,[id, prevDate, nextDate]);
                chart[2] = await this.dbConn.query(`${STATISTICS_LIST}`,[id, prevDate, nextDate]);

                for(let i in chart){
                    if(this.isEmpty(chart[i][0][0])) chart[i] = 0;
                    else chart[i] = chart[i][0][0];
                }

                return {chart};
            }catch(e){
                logger.error(`statistic getData error : ${e}`);
            }finally{
                await this.dbConn.release();
            }
    }
```


## 6. pm2를 이용한 운영

## 7. Trouble Shooting
