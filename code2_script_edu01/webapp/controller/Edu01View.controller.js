/* eslint-disable no-console -- 콘솔 출력으로 결과를 확인하는 실습 파일 */
sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code2.script.edu01.code2scriptedu01.controller.Edu01View", {
        onInit() 
        {   
            let aValue = ['A', 'B', 'C', 'D'] ;
            
            console.log("init aValue : " + aValue);
            console.log("----------------");

            aValue.push('E', 2);
            console.log("aValue.push('E', 2) : " + aValue);
            console.log("----------------");

            let popValue = aValue.pop();
            console.log("aValue.pop(); : " + popValue);
            console.log("aValue : " + aValue );
            console.log("----------------");

            for (const vIndex in aValue) {
                console.log(" vIndex , aValue[vIndex] = " + vIndex + " , " + aValue[vIndex]);
            }
            console.log("----------------");

            for (const vData of aValue) {
                console.log(" vData : " + vData );
            }
            console.log("----------------");
            console.log("--------Multi Array--------");

            let multiArray = [
                [1, 2, 3, 4],
                [5, 6, 7, 8]
            ];

            console.log("multiArray : " +multiArray);
            console.log("multiArray.length : " + multiArray.length);

            console.log("----------------");

            for( let vOutIndex in multiArray )
            {
                console.log("multiArray[ " +vOutIndex + " ] 번 째 값은 " + multiArray[vOutIndex] + "입니다.");
                
                for ( let vInIndex in multiArray[vOutIndex] )
                {
                    console.log( "multiArray[" + vOutIndex + "][" + vInIndex + "] 번 째 값은 " + multiArray[vOutIndex][vInIndex] + "입니다. " );
                }
            }

            console.log("---------------------");
            console.log("---------------------");
            console.log("------ Multi Array 실습 -------");
            console.log("---------------------");
            console.log("---------------------");
            
            // 실습
            let aTeam = [
                ['KT',   'RANK1'],
                ['삼성',  'RNAK2'],
                ['KIA',  'RANK3'],
                ['LG',   'RANK4'],
                ['두산',  'RNAK5'],
                ['SSG',   'RANK6'],
                ['롯데',   'RANK7'],
                ['NC',    'RNAK8'],
                ['한화',   'RANK9'],
                ['키움',   'RANK10']
            ];



            console.log("----------Index 출력 -----------");

            for (const i in aTeam) 
            {
                    console.log( aTeam[i][0] + " : " + aTeam[i][1]);
            }

            console.log("---------for in 2중 출력 ------------");

            for (const i in aTeam) 
            {
                for (const j in aTeam[i])
                {
                    console.log ( aTeam[i][j] );
                }
            }

            console.log("-------- 거꾸로 출력하기 -------------");
            
            let vNum = aTeam.length; // 10
            for ( vNum ; vNum >= 1 ; vNum-- )
            {
                // console.log(aTeam[vNum-1]);
                for ( var j = 1 ; j >= 0 ; j--)
                {
                    console.log(aTeam[vNum-1][j]);
                }
            }

            console.log("---------for of 출력 ------------");
            
            for ( const aVirtaulArray of aTeam )
            {
                // console.log(aVirualArray);
                
                for ( const aRankArray of aVirtaulArray )
                {
                    console.log(aRankArray);
                }
            }

            // JSON.
            // Script 에서 만들 때에는 key 에 "" 필요없지만, JOSN으로 만들 때 key에 "" 필요.

            console.log("---------------------");
            console.log("---------JSON ------------");
            console.log("---------------------");

            let oModel = {
                            Lecture : "Code 2",
                            Class   : "CL1",
                            Number : 1, 
                        };
            
            console.log("oModel.Lecture : "  + oModel.Lecture + " , oModel.Class :  " + oModel.Class);
            console.log("Number Type: " + typeof(oModel.Number) + ",  Number Value : " + oModel.Number );

            console.log("---------JSON 식별키로 가져오기. ------------");            
            
            console.log(
                "oModel[Lecture] : " + oModel["Lecture"] +  
                " /  oModel[Class] : " + oModel["Class"] + 
                " /  oModel[Number] : " + oModel.Number
            );


            // 실습
            let oData = {
                            Team : "두산",
                            Area : "서울",
                            Mascot: "Bear",
                            Stadium: "잠실구장",
            };

            console.log(
                'oData["Team"] : ' + oData["Team"] +
                ' / oData["Area"] : ' + oData["Area"] +
                ' / oData["Mascot"] : ' + oData["Mascot"] +
                ' / oData["Stadium"] : ' + oData["Stadium"]
            );

            console.log(
                'oData.Team : ' + oData.Team +
                ' / oData.Area : ' + oData.Area +
                ' / oData.Mascot : ' + oData.Mascot +
                ' / oData.Stadium: ' + oData.Stadium
            );


             console.log("---------JSON + For Loop. ------------");            

            for (const key in oData) {
                console.log( "key : "  + key );        
            }

            console.log("---------- oData.key 는 접근이 안되지만 oData[key] 로는 접근 가능 ---------");
            for (const key in oData) {
                console.log( "oData[ " + key + " ] : " + oData[key] );                                    
            }

            // 다음 시간에 JSON + Array. 
            // 최종적으로는 ABAP의 internal Table을 배우고자 함.
        }
    });
});