sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Text",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, Text, MessageToast, JSONModel) => { // 배열 안에 Controller - Text 순서니까 매개변수는 Controller - Text 순서로 작성할 것.
    "use strict";

    
    
    
    return Controller.extend("code2.fiori.edu01.code2fioriedu01.controller.Edu01View", {
        // onInit은 View가 나타나기 전에 자동으로 호출이 됨.

        onInit() 
        {
            // alert("UI5 is Ready");            

            // new Text ({
            //     text : "Hello World"
            // }).placeAt("content");

            // new sap.m.Text({ text : "Hello World" }); <= 이렇게 사용해봐도 됨.   
            
            
            /**
             * ----------     "sap.ui.model.json.JSONModel" 실습 ------------
             * https://ui5.sap.com/1.120.52/#/topic/70ef981d350a495b940640801701c409
            */
             // set data model on view
             const oJson = {
                                Lecture: "Code2",
                                Class  : "CL1"    
                            };
                    
             const oStudent = {
                                Name  : "강신욱",
                                Number: 1
                               };

            const oModel = new JSONModel(oJson); // class 를 사용하기 위해서는 반드시 new를 붙여줘야한다.
            const oModel2 = new JSONModel(oStudent);

            let oView = this.getView(); // View를 대신하는 instance를 만듦. (instance를 만들어서 사용하고자 함.) 얘는 new를 사용하지 않아도 되는 이유가 어떻게돼?    
                oView.setModel(oModel); // instance를 생성해서 사용하는 방법.
            
                oView.setModel(oModel2); // 이렇게 setModel(oModel2) 를 하게 된다면, setModel(oModel)은 덮어쓰여진다. 즉, Lecture와 Class는 사용하지 못하게 됨.

            /**
             * instance 생성 없이 사용법.
                this.getView().setModel(oModel); // getView로 View를 가져오고, setModel라는 Method로 oModel (JSON형태)을 View에게 알려줌.
             */
        
        
        },

        // JSON 끼리의 데이터는 다음 키를 쓰기 위해서 구분자가 콤마.
        // JSON이라 (콜론) : 이 필요함.
        // JSON 형식이므로 _textRight 는 key 값임. Value는 그냥 함수가 실행되는 것임.

        _textRight: function ()
        {
            // let vTxt = document.getElementById("TxT1")
            // console.log(vTxt); => null 이 나옴.

            // vTxt.style.textAlign = "Right";

            // -> 위에처럼 혼자 해봤는데 실행이 안됐음.

            /**
             * 1. Text 의 Method 에서 어떤 것으로 TextAlign의 속성을 가져올 수 있는 지 확인한다.
             * 2. https://ui5.sap.com/1.120.52/#/api/sap.m.Text%23methods/setTextAlign
             * 3. 화면에 있는 element를 가져오는 방법.
             *  -> document.getElementById
             * 4. 우리가 지금 보는 화면은 HTML이 아닌 View 에서 보고 있음.
             *  -> HTML = document 이지만, View = this 
             * 5. this가 View를 가지고 오라함.
             *  -> this.getView() // 여기서 getView()는 method임. HTML에서 document 객체를 얻어온 것과 동일하다고 설명하심.
             * 
             */

            // let A = this.getView();
            // console.log(A);

            /**
             * this.getView() 어떤 View인가? Edu01View.view.xml에서 controllName 에 연결됨을 확인할 수 있고
             * 연결되어 있는 View를 통째로 가져옴
             * 
             * .byId("TxT1") -> TxT1 이라는 이름을 가지고 있는 것을 가져와.
             * 따라서 oText1이 <Text id = "TxT1" > 태그와 동일하다. 라고 이해하라고 하는데, console.log를 찍었을 때에는 그렇게 안나오긴함..ㅠㅠ
             * 
             * 여기에서 oText1.setTextAlign 을 호출해서
             * 매개변수에 "Right" 를 준다.
             */
            let oText1 =  this.getView().byId("TxT1"); // document.getElementById(" "), 신기하게 . 누를 때 관련 함수들이 안나오네 .. 또한 이 문장의 의미는 View의 <Text id = "TxT1"> 을 부른 것과 동일
            // eslint-disable-next-line no-console -- byId가 돌려주는 컨트롤 객체 확인용
            // console.log(oText1);

            oText1.setTextAlign(sap.ui.core.TextAlign.Right); // 원래는 이렇게 사용하는 것이 맞다고 하심.
            // oText1.setTextAlign("Right"); // 이렇게 써도 되긴함.
            // 왜 동일하게 먹히는가 ?
            // 변수와 상수가 가지는 것. 변수 Right가 가지는 값이 "Right" 이었기 때문에 가능했던 것임.
            
            
            let msg = "Text를 우측으로 정렬합니다.";
            
            MessageToast.show(msg, {
                duration: 2,
                width: "30rem",
                animationDuration: 1000
            });
        },


        _textCenter : function()
        {
            let oText2 = this.getView().byId("TxT1");
            oText2.setTextAlign(sap.ui.core.TextAlign.Center);
        
            let msg = "Text를 가운데로 정렬합니다.";
            
            MessageToast.show(msg, {
                duration: 2,
                width: "30rem",
                animationDuration: 1000
            });
        
        },

        _textLeft : function()
        {
            let oText3 = this.getView().byId("TxT1");
            oText3.setTextAlign(sap.ui.core.TextAlign.Left);

            let msg = "Text를 좌측으로 정렬합니다.";
            
            MessageToast.show(msg, {
                duration: 2,
                width: "30rem",
                animationDuration: 1000
            });
        },

        onShowHello : function ()
        {
            let msg = "Hello\n World";
            MessageToast.show(msg, {
                duration    : 2,
                width       : "10em",
                animationDuration   : 1000,
                animationTimingFunction: "linear",

                my:""
            });
        }

    });
});