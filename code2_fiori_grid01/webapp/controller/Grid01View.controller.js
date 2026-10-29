sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code2.fiori.grid01.code2fiorigrid01.controller.Grid01View", {
        onInit() 
        {
            let oGrid = {
                            airSet: [
                                { Carrid  : "AA",   Carrname : "America Airline",   Price    : 234,     Currency : "USD" },
                                { Carrid  : "KO",   Carrname : "Korea Air",         Price    : 85000,   Currency : "KRW" },
                                { Carrid  : "LF",   Carrname : "Luft Hansa",        Price    : 278,     Currency : "EUR"},
                                { Carrid  : "VA",    Carrname : "Vietnam Air",       Price    : 25400,   Currency : "VND" },
                                { Carrid  : "UA",  Carrname : "United States",     Price    : 265,     Currency : "USD" }
                            ]
            }

            this.getView().setModel(new JSONModel(oGrid));
        }
    });
});


/**
 *  *  * 두번 째 할 일.
 * 이제 View 에서 목록을 보여주도록 하는 방법.
 * Gird List 와 Grid Table의 차이.
 * 
 * https://ui5.sap.com/1.120.52/#/entity/sap.ui.table.Table
 * -> sap.ui.table.Table : Table이라는 Class를 쓰겠다.
 * Table 에서 Sample에 18개가 나옴 (Basic, Selection 등등..)
 * 
 * 이제 여기서 Sample에서 찾아서 Source 가져와서 내가 수정해서 사용하고자 함.
 * 
 * Basic을 사용함.
 * https://ui5.sap.com/1.120.52/#/entity/sap.ui.table.Table/sample/sap.ui.table.sample.Basic
 * 
 * 
 * 여기에서의 네이밍 (airSet) 같은 경우에도
 * 추후에 GateWay를 할 때 이름을 자동으로 만들어주는 데, 이러한 형식과 같다고 하심.
 * 어떻게 되는 지 알고 싶은데, 조금 자세하게 풀어서 노션에 정리해줄 것.
 * 
 * 
 * 
 */