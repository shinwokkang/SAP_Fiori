sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
    "use strict";

    return Controller.extend("code2.fiori.exam.emamproject.controller.ExamView", {
        onInit() 
        {   
            
            /**
             * 1번 문제.
             * 각 JS 객체를 선언한다.
             * Fiori1Set => 피오리 입력창 Input Css    JS 객체
             * Fiori2Set => RTX1253C 입력창 Input Css JS 객체
             * LabelSet  => Without SCRIM 라벨 Css    JS 객체
             */
            let Fiori1Set = {
                    inputCss : {
                                    width : "50rem", 
                                    placeholder: "피오리 입력창"
                                }
                            },

                    Fiori2Set = {
                        inputCss : {
                                        width : "100px", 
                                        placeholder: "RTX1253C"
                                    }
                                },

                    LabelSet = {
                        LabelCss : {
                                        text : "Without SCRIM"
                                    }
                                    
                                },
            
                    oModel1 = new JSONModel(Fiori1Set),
                    oModel2 = new JSONModel(Fiori2Set),
                    // oModel3 = new JSONModel(LabelSet);
                    oModel3 = new JSONModel("/fiori_text/fiori_text.json", LabelSet);
            
                this.getView().setModel(oModel1, "Fi1");
                this.getView().setModel(oModel2, "Fi2");
                this.getView().setModel(oModel3, "Label");




                const oMsgModel = new JSONModel("/msg/msg.json");
                this.getView().setModel(oMsgModel, "Msg");
        },
        
        onTriCal : function (oEvent)
        {
            let Base      = this.getView().byId("iBase").getValue(),
                Width     = this.getView().byId("iWidth").getValue(),
                Result = ( parseInt(Base) * parseInt(Width) ) / 2 ;

            this.getView().byId("iResult").setValue(Result);
        },

        onRateToPrice : function ()
        {
            let ProductPrice  = parseInt(this.getView().byId("iProductPrice").getValue()),
                DiscountPrice = parseInt(this.getView().byId("iDiscountPrice").getValue()),
                DiscountRate  = 100 - ( DiscountPrice / ProductPrice  * 100 );
        
            this.getView().byId("iDiscountRate").setValue(DiscountRate);  
        },


        /**
         * switch 구문의 각 case에 아래의 국가들을 하나씩 배치
         */
        onCheckCountry : function ()
        {
            let lt_country         = ["Korea", "America", "Israel", "Thailand", "Russia", "Poland", "Germany", "England"],
                lt_countryToKorean = ["한국", "미국", "이스라엘", "태국", "러시아", "폴란드", "독일", "영국"],
                inputCountry       = this.getView().byId("iCountry").getValue(),
                lb_check           = false,
                msg                = null;

            for (const lv_countryIndex in lt_country) {
                switch (inputCountry)
                {
                    case lt_country[lv_countryIndex]:
                        lb_check = true;
                        msg = lt_countryToKorean[lv_countryIndex];
                        MessageToast.show(msg, {
                            duration: 2,
                            width: "30rem",
                            animationDuration: 1000
                        });
                        break;
                }
            }

            if ( !lb_check ){
                msg = "No Match";
                MessageToast.show(msg, {
                    duration: 2,
                    width: "30rem",
                    animationDuration: 1000
                });
            }
        },


        ongugudanUseFor : function ()
        {
            for ( let i = 2; i <= 9 ; i ++ )
            {
                for ( let j = 1 ; j <= 9 ; j++ )
                {
                    // eslint-disable-next-line no-console
                    console.log(i +" * " + j + " = " + i*j);
                }
            }
        },

        ongugudanUseWhile : function()
        {
            let i = 2;
            while ( i <= 9 )
            {
                let j = 1;
                while ( j <= 9 )
                {
                    // eslint-disable-next-line no-console
                    console.log(i +" * " + j + " = " + i*j);
                    j++;
                }
                i++;
            }
        },

        ongugudanUseForWhile : function ()
        {
            for ( let i = 2; i <= 9 ; i ++ )
            {
                let j = 1;
                while ( j <= 9 )
                {
                    // eslint-disable-next-line no-console
                    console.log(i +" * " + j + " = " + i*j);
                    j++;
                }
            }
        },

        onguguDan : function ( Number )
        {
            let dan = 2;

            // ✏️ 고침(11/5): 같은 controller의 함수는 this.로 불러야 해요 (없으면 'ongugudanUseFor is not defined' 오류).
            //    View가 .onguguDan(1)처럼 숫자를 넘겨서 case도 숫자 1로 맞췄고, 다음 case로 흘러가지 않게 break를 넣었어요.
            //    내 코드: case "1": ongugudanUseFor();  case 2: ongugudanUseWhile();  case 3: ongugudanUseForWhile();  (break 없음)
            switch (Number)
            {
                case 1:
                    this.ongugudanUseFor();
                    break;
                case 2:
                    this.ongugudanUseWhile();
                    break;
                case 3:
                    this.ongugudanUseForWhile();
                    break;
            }
        }



    });
});