sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code2.fiori.exam.exam1.controller.exam_1", {
        onInit() {
            
             /**
             * 1번 문제.
             * 각 JSONModel 객체를 선언한다.
             * Fiori1Set => 피오리 입력창 Input     JS 객체
             * Fiori2Set => RTX1253C 입력창 Input  JS 객체
             * LabelSet  => Without SCRIM 라벨     JS 객체
             */

            const Fiori1Set = {
                                input : { width : "50rem", value: "피오리 입력창" }
                              },

                  Fiori2Set = {
                                input : { width : "100px", value: "RTX1253C" }
                              },

                   LabelSet = {
                                text : "Without SCRIM"
                              },
            
                    oModel1 = new JSONModel(Fiori1Set),
                    oModel2 = new JSONModel(Fiori2Set),
                    oModel3 = new JSONModel(LabelSet);
            
                this.getView().setModel(oModel1, "Fi1");
                this.getView().setModel(oModel2, "Fi2");
                this.getView().setModel(oModel3, "Label");


            /**
             * 2번 문제
             * 각 JS 객체를 선언한다.
             * Fiori1Set => 피오리 입력창 Input Css    JS 객체
             * Fiori2Set => RTX1253C 입력창 Input Css JS 객체
             * LabelSet  => Without SCRIM 라벨 Css    JS 객체
             */
            
            let oModel4 = new JSONModel("/fiori_text/fiori_text.json");
                this.getView().setModel(oModel4, "Label2");    



            /**
             * 3번 문제.
             * msg 폴더 내의 msg.json에서 JSON 을 불러와서 Model에 "Msg"라는 방에 넣는다.
             */

            const oJson = {
                            TextInfor  : { text : "CODE2 First Test of ShinwookKang", textAlign: "Center" },
                            LabelInfor : { text: "ShinwookKang Fiori 시험중"}
                          };
            
                this.getView().setModel(new JSONModel(oJson), "Info");
                this.getView().setModel(new JSONModel("/msg/msg.json"), "Msg");
            



            /**
             * 5번 문제.
             */
            let oButtonJson =   {
                                    ConfirmInfor : {text: "Confirm", width: "150px", icon: "sap-icon://accept"},
                                    CheckInfor   : {text: "Check",   width: "200px", enabled: false}
                                };
                this.getView().setModel(new JSONModel(oButtonJson), "ButtonInfo");



            /**
             * 6번 문제.
             */
            let oInputJson = {
                                FirstInputInfor :  { description: "Input field",    maxLength: 20, width: "300px", value: "입력필드"},
                                SecondInputInfor : { description: "컨트롤러에서 세팅", maxLength: 10, width: "300px"}
                            };
                this.getView().setModel(new JSONModel(oInputJson), "InputInfo");
        },
        

        /**
         * 7번 문제.
         */
        onTriCal : function ()
        {
            let vBase      = this.getView().byId("iBase").getValue(),    // 밑변 값 가져오기.
                vWidth     = this.getView().byId("iWidth").getValue(),   // 높이 값 가져오기.
                vResult = ( parseInt(vBase) * parseInt(vWidth) ) / 2 ;     // 형변환 후 계산하기.

                this.getView().byId("iResult").setValue(vResult);
        },

        /**
         * 8번 문제.
         */
        onRateToPrice : function ()
        {
            let vProductPrice  = parseInt(this.getView().byId("iProductPrice").getValue()),  // 사용자가 입력한 원 가격 가져온 후 형변환
                vDiscountPrice = parseInt(this.getView().byId("iDiscountPrice").getValue()), // 사용자가 입력한 할인된 가격 가져온 후 형변환
                vDiscountRate  = 100 - ( vDiscountPrice / vProductPrice  * 100 );              // 할인율 = 100 - ((할인된 가격 / 원 가격) * 100 ) 적용.
        
                this.getView().byId("iDiscountRate").setValue(vDiscountRate);                // id="iDiscountRate" 인 Input 태그에 Value로 넣는다.
        },


        /**
         * switch 구문의 각 case에 아래의 국가들을 하나씩 배치
         */
        onCheckCountry : function ()
        {
            let lt_country         = ["Korea", "America", "Israel", "Thailand", "Russia", "Poland", "Germany", "England"],
                lt_countryToKorean = ["한국",   "미국",    "이스라엘", "태국",     "러시아",  "폴란드",   "독일",     "영국"],  // 각 나라의 한글 배열
                inputCountry       = this.getView().byId("iCountry").getValue(),    // 사용자가 입력한 나라 값을 받는다.
                lb_check           = false,         // 일치하는 지 여부를 판단하기 위한 변수. (사용자가 일치하지 않는 것을 입력했을 때 알아차리기 위함.)
                vmsg                = null;         // MessageToast에 나타낼 메시지 변수

            for (const lv_countryIndex in lt_country) {     // for-of 로 각 나라를 순회하면서 인덱스을 가져온다.
                switch (inputCountry)                       // 사용자의 입력 값을 조건문으로 받는다.
                {
                    case lt_country[lv_countryIndex]:       // 사용자의 입력 값과 배열의 값이 같다면.
                        lb_check = true;                    // 일치함을 나타냄으로 true로 바꿔준다.
                        vmsg = lt_countryToKorean[lv_countryIndex];  // 앞서 선언한 각 나라의 한글 배열을 메시지로 담는다.
                        sap.m.MessageToast.show(vmsg);      // 해당 메시지를 담아서 MessageToast로 나타낸다.
                        break;
                }
            }

            if ( !lb_check ){                   // 순회를 다 마쳤는데에도 lb_check 변수가 false라면, 일치하지 않음을 나타낸다.
                vmsg = "No Match"               // 일치하지 않는다면 msg를 "No Match"로 두고 MessageToast를 나타낸다.
                sap.m.MessageToast.show(vmsg);
            }
        },


        ongugudanUseFor : function ()
        {
            for ( let vDan = 2; vDan <= 9 ; vDan ++ )       // 2단부터 9단까지 
            {
                for ( let vNum = 1 ; vNum <= 9 ; vNum++ )
                {
                    console.log(vDan +" * " + vNum + " = " + vDan*vNum);
                }
            }
        },

        ongugudanUseWhile : function()
        {
            let vDan = 2;
            while ( vDan <= 9 )
            {
                let vNum = 1;
                while ( vNum <= 9 )
                {
                    console.log(vDan +" * " + vNum + " = " + vDan*vNum);
                    vNum++;
                }
                vDan++;
            }
        },

        ongugudanUseForWhile : function ()
        {
            for ( let vDan = 2; vDan <= 9 ; vDan ++ )
            {
                let vNum = 1;
                while ( vNum <= 9 )
                {
                    console.log(vDan +" * " + vNum + " = " + vDan*vNum);
                    vNum++;
                }
            }
        },

        // onGugudan : function ( vinput )
        // {
        //     const aArray      = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
        //           aArrayDan   = [ 2, 3, 4, 5, 6, 7, 8, 9 ],
        //           vNumLength  = aArray.length,
        //           vDanLength  = aArrayDan.length;
            
        //     switch (vinput)
        //     {
        //         case "for":
        //             {
        //                 for (const vDan of aArrayDan) {
        //             for (const vNum of aArray) {
        //             console.log(vDan +" * " + vNum + " = " + vDan*vNum);                
        //                 }
        //             }
        //         }
        //         case "while":
        //             {
                        
        //             }
        //         case "forWhile":
        //             {
        //                 for (const vDan of aArrayDan) {
        //                     vNumLength = aArrayDan.length;
        //                     while ( vNumLength < 0 ){
        //                         console.log(vDan +" * " + vNum + " = " + vDan * vNumLength);                
        //                         vNumLength --;
        //                     }               
        //                 }
        //             }
        //     }
        // }

    });
});