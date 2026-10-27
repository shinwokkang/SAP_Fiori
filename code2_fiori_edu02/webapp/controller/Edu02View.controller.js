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
                                Description : "Name Input Field",
                            }, 
                           },


                  oSModel = new JSONModel(oData),
                  oPModel = new JSONModel(oProp);

             this.getView().setModel(oSModel);
             this.getView().setModel(oPModel, "Prop");
             /**
              * 덮어써지지 않도록 this.getView().setModeL(oPModel)을 하는 방법.
              * -> , "Prop"
              * 접근 하는 방법 : Prop>/Input/Width
              */






        }
    });
});