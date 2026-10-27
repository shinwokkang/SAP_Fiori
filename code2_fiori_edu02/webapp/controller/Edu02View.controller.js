sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code2.fiori.edu02.code2fioriedu02.controller.Edu02View", {
        onInit() 
        {
            const oData = {
                            Study : { Lecture : "Code2",  Class  : "CL1" },
                            Infor : { Name    : "강신욱",  Number : 1 },
                            },


                  oSModel = new JSONModel(oData);

             this.getView().setModel(oSModel);






        }
    });
});