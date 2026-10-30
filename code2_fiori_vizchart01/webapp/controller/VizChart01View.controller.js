sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code2.fiori.vizchart01.code2fiorivizchart01.controller.VizChart01View", {
        onInit() 
        {
            let ovizData = {
                            matSet : [
                                            { Matnr : "ABL_100",   Netpr : 1200,  Dmbtr : 3500 },
                                            { Matnr : "ALM_BAR",   Netpr : 2000,  Dmbtr : 3500 },
                                            { Matnr : "STN_R10",   Netpr : 5000,  Dmbtr : 7500 },
                                            { Matnr : "RTX0010",   Netpr : 10000, Dmbtr : 15000},
                                            { Matnr : "CARBON1",   Netpr : 12000, Dmbtr : 17000},
                                            { Matnr : "BOND001",   Netpr : 8000,  Dmbtr : 10000},
                                            { Matnr : "DEMP100",   Netpr : 15000, Dmbtr : 25000},
                                        ]   
                            };
                            
                this.getView().setModel(new JSONModel(ovizData));            
        }
    });
});