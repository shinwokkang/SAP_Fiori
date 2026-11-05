sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code2.fiori.route01.code2fioriroute01.controller.RightView", {
        onInit() 
        {
        },

        onLeft : function ()
        {
            this.getRouter().navTo("RouteLeftView");
        },

        onCenter : function ()
        {
            this.getRouter().navTo("RouteCenterView");
        },

        getRouter : function ()
        {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }
    });
});