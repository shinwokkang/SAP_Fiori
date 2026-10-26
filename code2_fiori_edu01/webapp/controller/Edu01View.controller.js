sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Text"
], (Controller, Text) => { // 배열 안에 Controller - Text 순서니까 매개변수는 Controller - Text 순서로 작성할 것.
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
            let oText1 =  this.getView().byId("TxT1") // document.getElementById(" "), 신기하게 . 누를 때 관련 함수들이 안나오네 .. 또한 이 문장의 의미는 View의 <Text id = "TxT1"> 을 부른 것과 동일
            console.log(oText1);

            oText1.setTextAlign(sap.ui.core.TextAlign.Right); // 원래는 이렇게 사용하는 것이 맞다고 하심.
            // oText1.setTextAlign("Right"); // 이렇게 써도 되긴함.
            // 왜 동일하게 먹히는가 ?
            // 변수와 상수가 가지는 것. 변수 Right가 가지는 값이 "Right" 이었기 때문에 가능했던 것임.

        },


        _textCenter : function()
        {
            let oText2 = this.getView().byId("TxT1");
            oText2.setTextAlign(sap.ui.core.TextAlign.Center);
        },

        _textLeft : function()
        {
            let oText3 = this.getView().byId("TxT1");
            oText3.setTextAlign(sap.ui.core.TextAlign.Left);
        }
    });
});