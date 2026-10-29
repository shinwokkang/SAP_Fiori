sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code2.fiori.edu03.code2fioriedu03.controller.Edu03View", {
        onInit() 
        {
            let oData = {
                            TextInfor : { 
                                Text   : "다음주 화욜이 회식",
                                width : "20em",
                            }
                        },

                oModel     = new JSONModel(oData),
                oModelFile = new JSONModel("/jsondata/data.json");

            this.getView().setModel(oModel);
            this.getView().setModel(oModelFile, "import");
        }
    });
});

/**
 *                 oModelFile = new JSONModel("/")
 * 여기에서 경로 찾기. 외부에서 JOSN 가져오기임.
 * / -> 최상위 폴더가 webapp
 * 외부 파일에는 key에 "" 를 사용한다.
 * 값이 int 라면 "" 없이 사용
 * 외부에서의 JSON과 controller에서 JSON 의 차이를 알 것!! 
 */