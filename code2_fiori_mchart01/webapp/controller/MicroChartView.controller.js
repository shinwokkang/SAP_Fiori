sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code2.fiori.mchart.code2fiorimchart01.controller.MicroChartView", {
        
        onInit() 
        {
            let oChartData = {
                                 code2Set : [
                                                { Class : "CL1", StdCount: 28 },
                                                { Class : "CL2", StdCount: 29 },
                                                { Class : "CL3", StdCount: 15 },
                                                { Class : "CL4", StdCount: 10 },
                                                { Class : "CL5", StdCount: 19 },
                                                { Class : "CL6", StdCount: 23 },
                                                { Class : "CL7", StdCount: 30 }
                                            ]
                             };

            this.getView().setModel(new JSONModel(oChartData));
        },

    });
});