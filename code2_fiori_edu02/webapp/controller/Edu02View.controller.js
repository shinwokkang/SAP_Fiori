sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code2.fiori.edu02.code2fioriedu02.controller.Edu02View", {
        onInit() 
        {
            const oData = {
                            Study : { Lecture : "Code2",  Class  : "CL1", Width : "10em" },
                            Infor : { Name    : "강신욱",  Number : 1    , Design : "Bold"},
                            },

                  oProp = {
                            Input : { 
                                Width        : "20em", 
                                ShowClearIcon: true,
                                PlaceHolder  : "Input your Text",
                                Description  : "Name Input Field",
                            }, 
                           },

                  oTextInfor = {
                                    Width : "20em",
                               },        
                
                  oInputInfor = {
                                    Width       : "20em",
                                    PlaceHolder : "바꿀 문자열"
                                },


                  oSModel = new JSONModel(oData),
                  oPModel = new JSONModel(oProp),
                  oTModel = new JSONModel(oTextInfor),
                  oIModel = new JSONModel(oInputInfor);

             this.getView().setModel(oSModel);
             this.getView().setModel(oPModel, "Prop");
             this.getView().setModel(oTModel, "Text");
             this.getView().setModel(oIModel, "Input");


             /**
              * 덮어써지지 않도록 this.getView().setModeL(oPModel)을 하는 방법.
              * -> , "Prop"
              * 접근 하는 방법 : Prop>/Input/Width
              */


        },


        onPressBegin : function ()
        {
            let oText = this.getView().byId("TxT1");
            oText.setTextAlign(sap.ui.core.TextAlign.Begin);
        },

        onPressCenter : function ()
        {
            let oText = this.getView().byId("TxT1"); // this.getView.byId("TxT1") = Text 라는 태그 = Text Class. 이것을 받은 oText는 Class를 받은 isntance
            oText.setTextAlign(sap.ui.core.TextAlign.Center);
        },

        onPressRight : function ()
        {
            let oText = this.getView().byId("TxT1");
            oText.setTextAlign(sap.ui.core.TextAlign.Right);
        },

        /**
         * View에서 함수 하나로 합치기.
         */
        setTextAlign : function (pAlign) 
        {  
            // let oText = this.getView().byId("TxT1");
            // oText.setTextAlign(pAlign);
            
            // 실습
            // pAlign 에 따라서 setTextALign 메소드에
            // sap.ui.core.TextAlign.Right 이런 식으로 값을 넣을 수 있는 로직을 코딩해보기.
            
            
            // 첫 번째 방법.
            
            // /**
            //  * @param {"Begin" | "Center" | "Right"}
            //  */
            
            // switch (pAlign)
            // {
            //     case "Begin":
            //         vAlign = TextAlign.Begin; // 이것도 변수니까, v prefix 사용함.
            //         break;
            //    case "Center":
            //         console.log(pAlign);
            //         vAlign = TextAlign.Center;
            //         break;
            //     case "Right":
            //         vAlign = TextAlign.Right;
            //         break;
            // }

            // this.getView().byId("TxT1").setTextAlign(vAlign);
            
            
            // 2번 째 방법.            
            const oText = this.getView().byId("TxT1");
            const TextAlign = sap.ui.core.TextAlign;
            
            const oData = {
                Begin  : TextAlign.Begin,
                Center : TextAlign.Center,
                Right  : TextAlign.Right
            };
            
            // ✏️ 고침(10/28): 점(.) 뒤의 pAlign은 "pAlign"이라는 이름의 키를 찾아서 undefined → 대괄호로 변수 값을 키로 써요
            // oText.setTextAlign(oData.pAlign);   ← 내 코드
            oText.setTextAlign(oData[pAlign]);

            // oText.setTextAlign(pAlign);
            
            
        },

        onPressChagneText : function ()
        {
            // let sValue = onLiveChange(oEvent);
            let oLabel = this.getView().byId("Lab1");
            let oInput = this.getView().byId("Inp1");
            oLabel.setText(oInput.getValue());
        },

        onLiveChange : function (oEvent)
        {
            let sValue  = oEvent.getParameters("value").value;
            // eslint-disable-next-line no-console
            console.log(sValue);
            let oView = this.getView().byId("Inp1");
            oView.setValue(sValue);
        },


        onChangeValue : function ()
        {
            let oTag = this.getView();
            
            let getValue = oTag.byId("Inp1").getValue();
            oTag.byId("Lab1").setText(getValue);
        },

    });
});


/**
 * 어떤 class는 일반 class 어떤 class 는 component.?
 * 어느 주제에 국한되는 Class.
 * Text Class - 국한되지 않음. (상관 없이 사용할 수 있는 Class = Component)
 * Component 와 Class와 같지만 다른 개념. (Component Ex. <Text> , <Label>, <Button>)
 * 
 * Text를 움직이고 싶음.
 * -> 특정 기능을 찾아야함.
 * -> API 공식문서에 가서 method를 찾아야함.
 * 
 * * 앞으로 변수명 및 함수명에 대해서도 의미있게 작성할 것.
 * 
 * 실습 할 때.
 * 큰 그림을 그리는 것도 좋지만, 어떻게 만들어야하는 지 절차적으로 생각해볼 것.
 * 
 * Button에 어떤 Event가 필요하다?
 * 1. 공식문서에서 Button의 Event 확인
 * 2. press가 있다고 확인.
 * 3-1. View에 press = "함수명" 으로 만들고
 * 3-2. Controller에 함수를 선언.
 * 4. Event를 했을 때 무엇을 변경할 것인지를 확인하고 태그를 변경해야 한다면 해당 태그에 id를 준다.
 *  4-1. Controller에서 해당 View의 태그를 가져옴 - this.getView().byId("Txt1");
 *  4-2. 태그에서 무엇을 바꿀 것인지에 대해서 찾으려고 API 공식문서에서 Text Class의 기능에 대한 것을 찾아봄.
 *  4-3. 특정 기능을 수행해야하므로, Text의 Method를 찾아본다.
 *  4-4. Text Class 공식문서의 Methods 에서 Align을 바꾸는 것이 무엇이지 ? -> setTextAlign이구나 라고 찾아봄.
 *  4-5. controller에 적용. this.getView().byId("TxT1").setTextAlign("Begin"); -> 이런 식의 코드 방식은 추후에 업데이트때 변경되면 유지보수가 힘듦. 따라서 아래의 방법을 지향할 것.
 *          또는
 *       controller에 적용. this.getView().byId("TxT1").setTextAlign(sap.ui.core.TextAlign.Begin); -> 이러한 방식을 지향해서 코딩할 것.
 * 
 * JS + 배열.
 * Grid + Micro Chart BG Frame.
 * View 왔다갔다. View 사이에 Parameter 던지기. ( routing. )
 */