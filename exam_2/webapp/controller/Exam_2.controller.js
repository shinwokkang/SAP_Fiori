sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code2.fiori.exam.exam2.controller.Exam_2", {
        onInit() 
        {
            
            /**
             * 13번 문제 onInit 에 Json 객체 선언.
             */
            var aArray = {
                            gt_aArray :  [
                                            { Team : "기아 타이거즈", Area : "광주" },
                                            { Team : "삼성 라이온즈", Area : "대구" },
                                            { Team : "NC 다이노스",  Area : "창원" },
                                            { Team : "두산 베어스",   Area : "서울" },
                                            { Team : "LG 트윈스",    Area : "서울" },
                                         ]
                        },
                oModel = new JSONModel(aArray);
            
            this.getView().setModel(oModel, "Baseball");


            /**
             * 14번 문제 /ball/Base.json의 json 객체 불러오기.
             */
            let oBaseModel = new JSONModel("/ball/Base.json");
                this.getView().setModel(oBaseModel, "Base");


            /**
             * 15번 Json 객체 선언.
             */
            var oData = {
                            popul : [
                                        { Year : 2018, home : 20199543 },
                                        { Year : 2019, home : 20891348 },
                                        { Year : 2020, home : 21484785 },
                                        { Year : 2021, home : 22022753 },
                                        { Year : 2022, home : 22383187 },
                                    ],

                            born : [
                                        { Year : 2018, Birth : 326822 },
                                        { Year : 2019, Birth : 302676 },
                                        { Year : 2020, Birth : 272337 },
                                        { Year : 2021, Birth : 260562 },
                                        { Year : 2022, Birth : 249186 },
                                   ]
            };

                this.getView().setModel(new JSONModel(oData), "populBorn");
            

            /**
             * 16번 JSOn 객체
             */
            
            var oData = {
                GridSet : [
                            { Bukrs: "1000", Gjahr : "2024", Anln1 : 48952 },
                            { Bukrs: "2000", Gjahr : "2024", Anln1 : 5031 },
                            { Bukrs: "3000", Gjahr : "2024", Anln1 : 47189 },
                            { Bukrs: "4000", Gjahr : "2024", Anln1 : 19147 },
                            { Bukrs: "5000", Gjahr : "2024", Anln1 : 1421 }
                          ]
            }
            this.getView().setModel(new JSONModel(oData), "companyGridSet");

            
        },

        /**
         * 11번 문제. 구구단 입력 받은 값 제외 구구단 출력.
         */
        onPrintGugudan : function()
        {
            let lv_PassDan = parseInt(this.getView().byId("iPassDan").getValue()),      // 입력 값을 읽고 parseInt로 형변환을 한다.
                lt_GuguDan = [2, 3, 4, 5, 6, 7, 8, 9];       // 문제에서 2단부터 9단만 출력하므로, 배열에 미리 담아두었습니다.
            
            for (const lv_Gugudan of lt_GuguDan) {      // for of 문을 통해서 앞서 선언한 배열에서 값을 하나씩 불러들인다.
                if ( lv_Gugudan == lv_PassDan ){        // 2~9단 값과 사용자의 입력이 일치하는 지 판단한 후 일치한다면 console 을 부르지 않고 continue로 넘긴다.
                    continue;
                }
                for ( let vNum = 1 ; vNum <= 9 ; vNum ++)   // 값이 일치하지 않는다면 console로 찍는다.
                {
                    console.log( lv_Gugudan + " * " + vNum + " = " + lv_Gugudan * vNum );
                }
            }
        },

        /**
         * 12번 문제. 구구단을 출력하되 짝수단만 출력할 것.
         */
        onTwinGuguDan : function ()
        {
            for ( let Dan = 2; Dan <= 9; Dan++ )    // 2단부터 9단까지 for 문을 돌린다.
            {
                let lb_Twin = Dan % 2;              // Dan % 2를 하여 lb_Twin 값이 0 이라면 짝수를 1 이라면 홀수임을 나타낸다.
                for ( let vNum = 1 ; vNum <= 9 ; vNum ++ ) 
                {
                    if ( !lb_Twin )                         // lb_Twin 값이 0 == false == 짝수이고, 1 == true == 홀수이므로 !lb_Twin을 조건식으로 건다.
                    {
                        console.log( Dan + " * " + vNum + " = " + Dan * vNum);
                    } else{                                 // lb_Twin이 1 == 홀수 라면 출력하지 않고 continue 한다.
                        continue;
                    }
                }
            }
        },


        /**
         * 13번 문제. for 구문을 이용하여 aArray를 console.log 로 출력한다.
         */
        onPrintBaseballTeam : function ()
        {
            // 16-27 줄에 선언한 JSON 을 가져와서 .oData.gt_aArray로 배열을 가져온다.
            let lt_Baseball = this.getView().getModel("Baseball").oData.gt_aArray; 

            for (const ls_Baseball of lt_Baseball) {    // 배열에서 for-of 를 통해서 각각의 JSON 형식 {} 객체를 가져온다.
                console.log(ls_Baseball);               // 배열 내 JSon객체들을 for 문으로 출력한다.
            }
        },


        /**
         * 14번 문제. 필터링 검색 조건
         */
        onSearchBaseballTeams : function ()
        {
            let oBinding = this.getView().byId("baseballTable").getBinding(),   // 바인딩 객체를 하나 선언하다.
                oFilter  = null,    // Filter 조건 객체담기 위해 oFilter를 선언한다.
                aFilter  = [],      // Filter 조건이 2개이므로, 배열을 선언하여 조건을 담는다.
                vYear    = this.getView().byId("iYear").getValue(), // 사용자로부터 입력받은 연도를 가져온다.
                vArea    = this.getView().byId("iArea").getValue(); // 사용자로부터 입력받은 연고지를 가져온다.
            
            // 연도 입력이 있을 때만 포함 조건을 만든다.
            if (vYear != "")
            {
                oFilter = new Filter({      // Filter와 FilterOperator 클래스를 사용하기 위해 4-6 번째 줄에 모듈을 불러온다.
                    path: "Year",           // Year Column 과 비교한다.
                    operator : FilterOperator.Contains, // FilterOperator 클래스의 Containes 를 사용하여 같은 지 확인한다.
                    value1 : vYear          // 사용자가 입력한 vYear과 "Year" Column의 값을 확인한다.
                });

                aFilter.push(oFilter); // 위에서 건 필터 조건을 aFilter 배열에 넣는다. 이 때 null 은 넣지 않는다.
            }
            
            // 연고지 입력이 있을 때만 포함 조건을 만든다.
            if (vArea != "")
            {
                oFilter = new Filter({
                    path: "Area",
                    operator : FilterOperator.Contains,
                    value1 : vArea
                });
                 aFilter.push(oFilter);
            }
            
            
            oBinding.filter(aFilter);   // 조건 배열을 표의 Binding에 적용한다.
            this.getView().byId("iYear").setValue("");  // 클릭 후에 input의 value를 ""로 만들어준다.
            this.getView().byId("iArea").setValue("");
            },
    });
});
