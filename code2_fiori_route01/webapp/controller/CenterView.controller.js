sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code2.fiori.route01.code2fioriroute01.controller.CenterView", {
        onInit() 
        {
            
        },

        onLeft : function ()
        {
            this.getRouter().navTo("RouteLeftView");
        },
        
        onRight : function ()
        {
            this.getRouter().navTo("RouteRightView");
        },

        getRouter : function ()
        {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }
    });
});