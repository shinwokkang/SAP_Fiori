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

                  oTextProp = {
                                Width : "20em",
                             },        
                
                  oInputProp = {
                                Width       : "20em",
                                PlaceHolder : "바꿀 문자열"
                  },


                  oSModel = new JSONModel(oData),
                  oPModel = new JSONModel(oProp),
                  oTModel = new JSONModel(oTextProp),
                  oIModel = new JSONModel(oInputProp);

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
            let oView = this.getView().byId("TxT1");
            oView.setTextAlign("Begin");
        },

        onPressCenter : function ()
        {
            let oView = this.getView().byId("TxT1");
            oView.setTextAlign("Center");
        },

        onPressRight : function ()
        {
            let oView = this.getView().byId("TxT1");
            oView.setTextAlign("Right");
        },

        onPressChagneText : function ()
        {
            // let sValue = onLiveChange(oEvent);
            let oView = this.getView().byId("Lab1");
            let oView2 = this.getView().byId("Inp1");
            oView.setText(oView2.getValue());
        },

        onLiveChange : function (oEvent)
        {
            let sValue  = oEvent.getParameters("value").value;
            // eslint-disable-next-line no-console
            console.log(sValue);
            let oView = this.getView().byId("Inp1");
            oView.setValue(sValue);
        },

    });
});